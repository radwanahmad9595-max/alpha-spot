// ── SAVE WEBSITE LEADS TO SUPABASE ──
// Runs alongside the existing WhatsApp flow — if this fails (e.g. offline),
// the WhatsApp message still goes out, so no inquiry is silently lost.
const LEADS_SUPABASE_URL = 'https://jkmpfpkdqbszjkzgqllo.supabase.co';
const LEADS_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprbXBmcGtkcWJzempremdxbGxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQzMDY1MDksImV4cCI6MjA5OTg4MjUwOX0.v3GvlHJuSJ00Tv-qLY50U5oOXq_hZlMlEe8oBziiB0o';
const leadsClient = supabase.createClient(LEADS_SUPABASE_URL, LEADS_SUPABASE_ANON_KEY);

async function saveLead(lead) {
  try {
    const { error } = await leadsClient.from('leads').insert({
      source:   lead.source,
      name:     lead.name || null,
      email:    lead.email || null,
      phone:    lead.phone || null,
      services: lead.services || null,
      budget:   lead.budget || null,
      message:  lead.message || null,
    });
    if (error) console.error('saveLead error:', error);
  } catch (err) {
    console.error('saveLead failed:', err);
  }
}
