// MateLive UI Blueprint v3 — shared app shell.
// Each screen declares window.SCREEN = { active, search, spec: { num, title, tags, phase, notes } }
// and puts its page body inside <main id="content" class="content">…</main>.
// This script wraps it with the one canonical sidebar + topbar, adds the PDF spec strip,
// fills platform marks and renders lucide icons.
(function () {
  const NAV = [
    ['Điều hành'],
    ['dashboard', 'house', 'Tổng quan'],
    ['schedule', 'calendar-days', 'Lịch phát sóng'],
    ['analytics', 'chart-column', 'Phân tích & Báo cáo'],
    ['Chuẩn bị nội dung'],
    ['accounts', 'link-2', 'Kênh & tài khoản'],
    ['products', 'shopping-bag', 'Sản phẩm & Affiliate'],
    ['character', 'user-round', 'AI nhân vật'],
    ['voice', 'audio-lines', 'AI giọng nói'],
    ['script', 'scroll-text', 'Kịch bản AI'],
    ['scene', 'image', 'Background & Scene'],
    ['Vận hành live'],
    ['create', 'square-plus', 'Tạo phiên live'],
    ['control', 'monitor-play', 'Control Room'],
    ['comments', 'messages-square', 'Bình luận', { count: 12 }],
    ['rules', 'bot', 'Quy tắc trả lời'],
    ['Hệ thống'],
    ['obs', 'cast', 'Kết nối OBS'],
    ['policy', 'shield-check', 'Chính sách & Tuân thủ'],
    ['settings', 'settings', 'Cài đặt'],
  ];

  const S = window.SCREEN || {};
  const img = (name) => `../../assets/img/${name}.jpg`;

  function sidebar() {
    const items = NAV.map((n) => {
      if (n.length === 1) return `<div class="nav-group">${n[0]}</div>`;
      const [key, icon, label, extra = {}] = n;
      const badge = extra.count ? `<span class="count">${extra.count}</span>` : '';
      return `<div class="nav-item${key === S.active ? ' active' : ''}"><i data-lucide="${icon}"></i><span>${label}</span>${badge}</div>`;
    }).join('');
    return `
      <aside class="sidebar">
        <div class="logo"><div class="logo-mark">M</div><div><div class="logo-name">MateLive</div><div class="logo-sub">AI LIVE COMMERCE</div></div></div>
        ${items}
        <div class="plan-card">
          <div class="row"><div class="icon-box ib-amber" style="width:34px;height:34px;border-radius:10px"><i data-lucide="crown"></i></div>
          <div><div class="semi" style="font-size:13px">Gói Professional</div><div class="tiny muted">Còn 23 ngày · 4/5 kênh</div></div></div>
          <div class="bar"><i></i></div>
          <div class="btn soft sm" style="width:100%;justify-content:space-between">Nâng cấp gói <i data-lucide="arrow-right"></i></div>
        </div>
      </aside>`;
  }

  function topbar() {
    return `
      <header class="topbar">
        <div class="ws"><i data-lucide="building-2"></i>POW AI Workspace<i data-lucide="chevron-down"></i></div>
        <div class="search"><i data-lucide="search"></i>${S.search || 'Tìm sản phẩm, phiên live, nhân vật, kênh…'}<kbd>⌘ K</kbd></div>
        <div class="top-right">
          <div class="sys-ok"><span class="dot"></span>Hệ thống ổn định</div>
          <div class="bell"><i data-lucide="bell"></i><b>3</b></div>
          <div class="me"><img src="${img('user-avatar')}" alt=""><div><div class="n">${S.user || 'Nguyễn Minh Anh'}</div><div class="r">${S.role || 'Quản trị viên'}</div></div><i data-lucide="chevron-down" style="color:var(--muted)"></i></div>
        </div>
      </header>`;
  }

  function spec() {
    const sp = S.spec;
    if (!sp) return '';
    const tags = (sp.tags || []).map(([cls, t]) => `<span class="tag ${cls}">${t}</span>`).join('');
    const notes = (sp.notes || []).map((t, i) => `<div class="note"><b>${i + 1}</b><span>${t}</span></div>`).join('');
    return `
      <footer class="spec">
        <div class="num">${sp.num}</div>
        <div><div class="ttl">${sp.title}</div><div class="meta">${tags}${sp.phase ? `<span class="tag">Code ở ${sp.phase}</span>` : ''}</div></div>
        <div class="notes">${notes}</div>
      </footer>`;
  }

  const content = document.getElementById('content');
  if (content) {
    const app = document.createElement('div');
    app.className = 'app';
    app.innerHTML = sidebar() + `<div class="main">${topbar()}</div>`;
    document.body.prepend(app);
    app.querySelector('.main').appendChild(content);
  }
  document.body.insertAdjacentHTML('beforeend', spec());

  // Platform marks: <span class="plat fb"></span> etc.
  const glyph = {
    fb: 'f',
    yt: '<svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" fill="#fff"/></svg>',
    tt: '<i data-lucide="music-2" style="width:62%;height:62%;stroke-width:3"></i>',
    sp: '<i data-lucide="shopping-bag" style="width:62%;height:62%;stroke-width:2.6"></i>',
  };
  document.querySelectorAll('.plat').forEach((el) => {
    if (el.innerHTML.trim()) return;
    const k = ['fb', 'yt', 'tt', 'sp'].find((c) => el.classList.contains(c));
    if (k) el.innerHTML = glyph[k];
  });

  if (window.lucide) window.lucide.createIcons();
  document.querySelectorAll('.plat svg.lucide').forEach((s) => { s.style.width = '62%'; s.style.height = '62%'; });
  document.documentElement.dataset.ready = '1';
})();
