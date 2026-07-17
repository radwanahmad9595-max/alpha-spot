// ── PROJECT DATA ──
const projects = [
  {
    en: { title: "Luxury Brand Identity",      cat: "Branding",    desc: "A complete visual identity package for a luxury brand including logo design, color palette, typography, brand guidelines booklet, and all brand applications across digital and print media." },
    ar: { title: "هوية بصرية فاخرة",           cat: "الهوية البصرية", desc: "حزمة هوية بصرية متكاملة لعلامة تجارية فاخرة تشمل تصميم الشعار ولوحة الألوان والخطوط ودليل الهوية وجميع تطبيقات العلامة على الوسائط الرقمية والمطبوعة." },
    tags: ["Logo Design", "Brand Guide", "Typography", "Color Palette"],
    icon: "✨", bg: "linear-gradient(135deg,#1a0a2e,#3d1a6e)"
  },
  {
    en: { title: "Restaurant Social Campaign",  cat: "Social Media", desc: "A 3-month comprehensive social media management campaign for a premium restaurant including content strategy, post design, community management, and monthly performance reports with 200% engagement increase." },
    ar: { title: "حملة سوشيال لمطعم",          cat: "سوشيال ميديا", desc: "حملة إدارة سوشيال ميديا شاملة لمدة 3 أشهر لمطعم فاخر تشمل استراتيجية المحتوى وتصميم البوستات وإدارة المجتمع وتقارير الأداء الشهرية مع زيادة تفاعل 200%." },
    tags: ["Content Strategy", "Post Design", "Community Management", "Analytics"],
    icon: "📱", bg: "linear-gradient(135deg,#0d2137,#1a4a7a)"
  },
  {
    en: { title: "Fashion Brand Reels",         cat: "Reels",       desc: "A series of 12 high-impact short video reels for a fashion brand, covering product showcases, behind-the-scenes, and lifestyle content. Achieved over 1 million combined views across platforms." },
    ar: { title: "ريلز علامة أزياء",           cat: "ريلز",        desc: "سلسلة من 12 ريلز فيديو قصيرة عالية التأثير لعلامة أزياء، تغطي عروض المنتجات وخلف الكواليس ومحتوى الأسلوب. حققت أكثر من مليون مشاهدة مجمعة عبر المنصات." },
    tags: ["Video Editing", "Script Writing", "Filming", "Color Grading"],
    icon: "🎬", bg: "linear-gradient(135deg,#1a0f0a,#5c2a0e)"
  },
  {
    en: { title: "Product Photography",         cat: "Photography", desc: "Premium product photography session for an e-commerce brand featuring 50+ high-resolution images with professional lighting, styling, and post-processing for website and social media use." },
    ar: { title: "تصوير منتجات",               cat: "تصوير",       desc: "جلسة تصوير منتجات احترافية لعلامة تجارة إلكترونية تضم أكثر من 50 صورة عالية الدقة مع إضاءة ومعالجة احترافية للاستخدام على الموقع والسوشيال ميديا." },
    tags: ["Product Shots", "Lifestyle", "White Background", "Post-Processing"],
    icon: "📷", bg: "linear-gradient(135deg,#0a1a0a,#1a4a1a)"
  },
  {
    en: { title: "Animated Brand Ad",           cat: "Motion",      desc: "A dynamic 30-second animated brand advertisement featuring custom motion graphics, smooth transitions, and professional sound design, optimized for social media ad campaigns." },
    ar: { title: "إعلان موشن متحرك",           cat: "موشن",        desc: "إعلان علامة تجارية متحرك مدته 30 ثانية يتضمن موشن جرافيك مخصصاً وانتقالات سلسة وتصميم صوتي احترافي، محسّن لحملات الإعلانات على السوشيال ميديا." },
    tags: ["2D Animation", "Motion Graphics", "Sound Design", "Social Ads"],
    icon: "⚡", bg: "linear-gradient(135deg,#1a1a0a,#4a4a0a)"
  },
  {
    en: { title: "Tech Startup Identity",       cat: "Branding",    desc: "Modern minimalist brand identity for a technology startup including logo design, UI color system, icon set, presentation templates, and digital asset kit." },
    ar: { title: "هوية شركة تقنية",            cat: "هوية",        desc: "هوية بصرية عصرية مينيمال لشركة تقنية ناشئة تشمل تصميم الشعار ونظام الألوان ومجموعة الأيقونات وقوالب العروض التقديمية وحزمة الأصول الرقمية." },
    tags: ["Logo", "UI Colors", "Icon Set", "Presentation"],
    icon: "🎨", bg: "linear-gradient(135deg,#1a0a1a,#5c1a5c)"
  },
  {
    en: { title: "Real Estate Campaign",        cat: "Social Media", desc: "Full social media strategy and content production for a real estate company covering property showcases, market insights, and client testimonials across Instagram, Facebook, and LinkedIn." },
    ar: { title: "حملة عقارات",                cat: "سوشيال ميديا", desc: "استراتيجية سوشيال ميديا ومحتوى متكامل لشركة عقارات يغطي عروض العقارات ورؤى السوق وشهادات العملاء عبر إنستجرام وفيسبوك ولينكدإن." },
    tags: ["Strategy", "Content", "Design", "Multi-Platform"],
    icon: "📊", bg: "linear-gradient(135deg,#0a1a1a,#0a4a4a)"
  },
  {
    en: { title: "Gym Promo Reels",             cat: "Reels",       desc: "Series of high-energy promotional reels for a fitness brand showcasing training sessions, transformation stories, and trainer spotlights with dynamic editing and energetic music." },
    ar: { title: "ريلز ترويجية لصالة",         cat: "ريلز",        desc: "سلسلة ريلز ترويجية عالية الطاقة لعلامة لياقة بدنية تعرض جلسات التدريب وقصص التحول وأبرز المدربين مع مونتاج ديناميكي وموسيقى حماسية." },
    tags: ["Sports Video", "Dynamic Edit", "Music Sync", "Transformation"],
    icon: "🏋️", bg: "linear-gradient(135deg,#1a0808,#6e1a1a)"
  },
  {
    en: { title: "Food Photography",            cat: "Photography", desc: "Mouth-watering professional food photography for a premium restaurant including plated dishes, ingredient shots, ambiance photography, and chef portraits optimized for menu and social media." },
    ar: { title: "تصوير طعام",                  cat: "تصوير",       desc: "تصوير طعام احترافي يفتح الشهية لمطعم فاخر يشمل الأطباق المقدمة وصور المكونات وتصوير الأجواء وصور الطاهي محسّن للمنيو والسوشيال ميديا." },
    tags: ["Food Styling", "Plated Shots", "Ambiance", "Menu Ready"],
    icon: "🍽️", bg: "linear-gradient(135deg,#0f0a1a,#2a1a4a)"
  }
];

// ── MODAL ──
function openModal(index) {
  const p    = projects[index];
  const lang = typeof currentLang !== 'undefined' ? currentLang : 'en';
  const data = p[lang] || p.en;

  document.getElementById('modalTitle').textContent = data.title;
  document.getElementById('modalCat').textContent   = data.cat;
  document.getElementById('modalDesc').textContent  = data.desc;
  document.getElementById('modalTags').innerHTML    = p.tags.map(t => `<span>${t}</span>`).join('');
  document.getElementById('modalImg').innerHTML     = `<div class="modal-img-placeholder" style="background:${p.bg}">${p.icon}</div>`;

  document.getElementById('portModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('portModal').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ── FILTER ──
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    const items  = document.querySelectorAll('.port-item');
    let visible  = 0;

    items.forEach(item => {
      const show = filter === 'all' || item.dataset.cat === filter;
      item.classList.toggle('hidden', !show);
      if (show) visible++;
    });

    document.getElementById('portEmpty').style.display = visible === 0 ? 'block' : 'none';
  });
});

// ── SCROLL ANIMATIONS ──
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
