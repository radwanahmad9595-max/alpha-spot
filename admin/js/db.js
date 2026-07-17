// ── SUPABASE CLIENT ──
const SUPABASE_URL = 'https://jkmpfpkdqbszjkzgqllo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprbXBmcGtkcWJzempremdxbGxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQzMDY1MDksImV4cCI6MjA5OTg4MjUwOX0.v3GvlHJuSJ00Tv-qLY50U5oOXq_hZlMlEe8oBziiB0o';
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ── ROW <-> APP OBJECT MAPPING (clients) ──
function clientFromRow(r) {
  return {
    id: r.id, name: r.name, company: r.company, phone: r.phone, email: r.email,
    instagram: r.instagram, website: r.website, package: r.package,
    referredBy: r.referred_by, commissionPct: r.commission_pct, billing: r.billing,
    startDate: r.start_date, endDate: r.end_date, totalAmount: r.total_amount,
    amountPaid: r.amount_paid, paymentStatus: r.payment_status, paymentMethod: r.payment_method,
    services: r.services || [], notes: r.notes || [], payments: r.payments || [], activity: r.activity || [],
    createdAt: r.created_at, updatedAt: r.updated_at,
  };
}

function clientToRow(c) {
  const row = {};
  const map = {
    name:'name', company:'company', phone:'phone', email:'email', instagram:'instagram',
    website:'website', package:'package', billing:'billing', services:'services',
    notes:'notes', payments:'payments', activity:'activity',
  };
  Object.entries(map).forEach(([k, col]) => { if (k in c) row[col] = c[k]; });
  if ('referredBy'     in c) row.referred_by     = c.referredBy || null;
  if ('commissionPct'  in c) row.commission_pct   = c.commissionPct;
  if ('startDate'      in c) row.start_date       = c.startDate;
  if ('endDate'        in c) row.end_date         = c.endDate;
  if ('totalAmount'    in c) row.total_amount      = c.totalAmount;
  if ('amountPaid'     in c) row.amount_paid       = c.amountPaid;
  if ('paymentStatus'  in c) row.payment_status    = c.paymentStatus;
  if ('paymentMethod'  in c) row.payment_method    = c.paymentMethod;
  return row;
}

// ── CLIENTS ──
async function getClients() {
  const { data, error } = await sb.from('clients').select('*').order('created_at', { ascending: false });
  if (error) { console.error('getClients', error); return []; }
  return data.map(clientFromRow);
}

async function getClient(id) {
  const { data, error } = await sb.from('clients').select('*').eq('id', id).maybeSingle();
  if (error || !data) return null;
  return clientFromRow(data);
}

async function addClient(client) {
  const row = clientToRow(client);
  row.notes = [];
  row.payments = [];
  row.activity = [{ text: 'Client created', date: new Date().toISOString(), type: 'gold' }];
  const { data, error } = await sb.from('clients').insert(row).select().single();
  if (error) { console.error('addClient', error); throw error; }
  return clientFromRow(data);
}

async function updateClient(id, data) {
  const row = clientToRow(data);
  row.updated_at = new Date().toISOString();
  const { error } = await sb.from('clients').update(row).eq('id', id);
  if (error) console.error('updateClient', error);
}

async function deleteClient(id) {
  const { error } = await sb.from('clients').delete().eq('id', id);
  if (error) console.error('deleteClient', error);
}

async function addPayment(clientId, payment) {
  const client = await getClient(clientId);
  if (!client) return;
  payment.id   = 'p_' + Date.now();
  payment.date = new Date().toISOString();
  const payments = [payment, ...(client.payments || [])];
  const activity = [{ text: `Payment of $${payment.amount} recorded`, date: new Date().toISOString(), type: 'green' }, ...(client.activity || [])];
  await updateClient(clientId, { payments, activity });
}

async function addNote(clientId, text) {
  const client = await getClient(clientId);
  if (!client) return;
  const notes    = [{ id: 'n_' + Date.now(), text, date: new Date().toISOString() }, ...(client.notes || [])];
  const activity = [{ text: 'Note added', date: new Date().toISOString(), type: 'blue' }, ...(client.activity || [])];
  await updateClient(clientId, { notes, activity });
}

async function deleteNote(clientId, noteId) {
  const client = await getClient(clientId);
  if (!client) return;
  const notes = (client.notes || []).filter(n => n.id !== noteId);
  await updateClient(clientId, { notes });
}

// ── HELPERS ──
function daysUntil(dateStr) {
  const today = new Date(); today.setHours(0,0,0,0);
  const end   = new Date(dateStr); end.setHours(0,0,0,0);
  return Math.ceil((end - today) / 86400000);
}

function getSubStatus(endDate) {
  const d = daysUntil(endDate);
  if (d < 0)  return 'expired';
  if (d <= 7) return 'soon';
  return 'active';
}

function subProgress(startDate, endDate) {
  const start = new Date(startDate).getTime();
  const end   = new Date(endDate).getTime();
  const now   = Date.now();
  if (now >= end)   return 100;
  if (now <= start) return 0;
  return Math.round(((now - start) / (end - start)) * 100);
}

function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' });
}

function formatDateTime(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('en-GB', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' });
}

function initials(name) {
  if (!name) return '?';
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0,2);
}

function guardAuth() {
  if (!localStorage.getItem('as_loggedIn')) {
    window.location.href = 'login.html';
  }
}

// ── TEAM MEMBERS ──
function teamFromRow(r) {
  return {
    id: r.id, name: r.name, role: r.role, phone: r.phone, email: r.email,
    defaultCommission: r.default_commission, status: r.status, avatar: r.avatar,
    createdAt: r.created_at,
  };
}

function teamToRow(m) {
  const row = {};
  if ('name'   in m) row.name   = m.name;
  if ('role'   in m) row.role   = m.role;
  if ('phone'  in m) row.phone  = m.phone;
  if ('email'  in m) row.email  = m.email;
  if ('status' in m) row.status = m.status;
  if ('avatar' in m) row.avatar = m.avatar;
  if ('defaultCommission' in m) row.default_commission = m.defaultCommission;
  return row;
}

async function getTeam() {
  const { data, error } = await sb.from('team_members').select('*').order('created_at', { ascending: true });
  if (error) { console.error('getTeam', error); return []; }
  return data.map(teamFromRow);
}

async function getTeamMember(id) {
  const { data, error } = await sb.from('team_members').select('*').eq('id', id).maybeSingle();
  if (error || !data) return null;
  return teamFromRow(data);
}

async function addTeamMember(member) {
  const row = teamToRow(member);
  const { data, error } = await sb.from('team_members').insert(row).select().single();
  if (error) { console.error('addTeamMember', error); throw error; }
  return teamFromRow(data);
}

async function updateTeamMember(id, data) {
  const row = teamToRow(data);
  const { error } = await sb.from('team_members').update(row).eq('id', id);
  if (error) console.error('updateTeamMember', error);
}

async function deleteTeamMember(id) {
  const { error } = await sb.from('team_members').delete().eq('id', id);
  if (error) console.error('deleteTeamMember', error);
}

// ── TEAM CHARACTER AVATARS ──
// Members store just the avatar KEY (e.g. "radwan"), not a fixed path.
const TEAM_AVATAR_KEYS = ['radwan','anas','mohammed','omar','sameha','shahed'];

function avatarBaseName(avatar) {
  if (!avatar) return '';
  const last = String(avatar).split('/').pop();
  return last.replace(/\.png$/i, '');
}

async function seedTeamAvatars() {
  const team = await getTeam();
  for (const key of TEAM_AVATAR_KEYS) {
    const existing = team.find(m => (m.name || '').toLowerCase().includes(key));
    if (existing) {
      if (avatarBaseName(existing.avatar) !== key) await updateTeamMember(existing.id, { avatar: key });
    } else if (!team.some(m => avatarBaseName(m.avatar) === key)) {
      await addTeamMember({
        name: key.charAt(0).toUpperCase() + key.slice(1),
        role: 'Team Member', phone: '', email: '',
        defaultCommission: 10, status: 'active', avatar: key,
      });
    }
  }
}

// Images are embedded as base64 in team-avatars-data.js (TEAM_AVATAR_DATA) —
// this avoids any file-path / serving-root issues entirely.
function avatarTag(avatar, name, size, extraStyle) {
  extraStyle = extraStyle || '';
  const key = avatarBaseName(avatar);
  const data = key && typeof TEAM_AVATAR_DATA !== 'undefined' ? TEAM_AVATAR_DATA[key] : null;
  if (!data) {
    return `<div style="width:${size}px;height:${size}px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--gold2));display:flex;align-items:center;justify-content:center;font-size:${size>50?22:12}px;font-weight:800;color:var(--navy);${extraStyle}">${initials(name)}</div>`;
  }
  return `<img src="${data}" style="width:${size}px;height:${size}px;border-radius:50%;object-fit:cover;object-position:top;${extraStyle}"/>`;
}

async function getTeamCommissions() {
  const [clients, team] = await Promise.all([getClients(), getTeam()]);
  return team.map(member => {
    const myClients = clients.filter(c => c.referredBy === member.id);
    const totalRevenue = myClients.reduce((sum, c) => sum + Number(c.amountPaid || 0), 0);
    const commission   = myClients.reduce((sum, c) => {
      const pct = Number(c.commissionPct || member.defaultCommission || 0);
      return sum + (Number(c.amountPaid || 0) * pct / 100);
    }, 0);
    return { ...member, clientCount: myClients.length, totalRevenue, commission, clients: myClients };
  });
}
