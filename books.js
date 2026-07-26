
(function () {
  // -------------------------------------------------------------
  // 1️⃣ Month → PDF mapping
  // -------------------------------------------------------------
  const mapping = [
    { months: [1, 2],  file: 'jan-feb.pdf', label: 'на январь–февраль' },
    { months: [3, 4],  file: 'mar-apr.pdf', label: 'на март–апрель' },
    { months: [5, 6],  file: 'may-jun.pdf', label: 'на май–июнь' },
    { months: [7, 8],  file: 'jul-aug.pdf', label: 'на июль–август' },
    { months: [9,10],  file: 'sep-oct.pdf', label: 'на сентябрь–октябрь' },
    { months: [11,12], file: 'nov-dec.pdf', label: 'на ноябрь–декабрь' }
  ];

  const month = new Date().getMonth() + 1;
  const entry = mapping.find(m => m.months.includes(month)) || mapping[0];
  const file   = entry.file;
  const label  = entry.label;

  // -------------------------------------------------------------
  // 2️⃣ URLs (served from Flask static folder)
  // -------------------------------------------------------------
  const pdfUrl    = `books/${encodeURIComponent(file)}`;
  const viewerUrl = `pdfjs/web/viewer.html?file=${encodeURIComponent(pdfUrl)}`;

  // -------------------------------------------------------------
  // 3️⃣ Inject responsive CSS (no external stylesheet needed)
  // -------------------------------------------------------------
  const style = document.createElement('style');
  style.textContent = `
    #pdf-overlay {
      position:fixed; top:0; left:0; right:0; height:70vh;
      background:rgba(0,0,0,0.6); display:none; z-index:10000;
      align-items:flex-start; justify-content:center;
      padding-top:1rem; box-sizing:border-box;
    }
    #pdf-overlay > div {
      width:90%; height:100%; background:#fff;
      border-radius:6px; overflow:hidden;
      box-shadow:0 6px 30px rgba(0,0,0,0.4);
    }
    @media (max-width:768px) {
      #pdf-overlay { height:100vh; padding-top:0; }
      #pdf-overlay > div { width:100%; border-radius:0; }
    }
  `;
  document.head.appendChild(style);

  // -------------------------------------------------------------
  // 4️⃣ Create the “Читать — …” button
  // -------------------------------------------------------------
  const btn = document.createElement('button');
  btn.textContent = `Читать — ${label}`;
  btn.id = 'open-pdf-btn';
  btn.style.cursor = 'pointer';
  document.getElementById('link-container').appendChild(btn);

  // -------------------------------------------------------------
  // 5️⃣ Build overlay + panel + header bar
  // -------------------------------------------------------------
  const overlay = document.createElement('div');
  overlay.id = 'pdf-overlay';

  const panel = document.createElement('div');

  const bar = document.createElement('div');
  Object.assign(bar.style, {
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 8px',
    background: '#f5f5f5',
    borderBottom: '1px solid #ddd',
    boxSizing: 'border-box'
  });

  const title = document.createElement('div');
  title.textContent = file;
  title.style.fontSize = '14px';

  const closeBtn = document.createElement('button');
  closeBtn.textContent = '× Закрыть';
  closeBtn.style.cursor = 'pointer';

  bar.appendChild(title);
  bar.appendChild(closeBtn);

  // -------------------------------------------------------------
  // 6️⃣ PDF.js viewer iframe (full‑featured viewer)
  // -------------------------------------------------------------
  const iframe = document.createElement('iframe');
  iframe.src = viewerUrl;               // local PDF.js viewer
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.border = '0';

  // Assemble overlay
  panel.appendChild(bar);
  panel.appendChild(iframe);
  overlay.appendChild(panel);
  document.body.appendChild(overlay);

  // -------------------------------------------------------------
  // 7️⃣ Open / close logic
  // -------------------------------------------------------------
  btn.addEventListener('click', () => {
    overlay.style.display = 'flex';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    window.scrollTo({ top: 0, behavior: 'auto' });
  });

  function closeOverlay() {
    overlay.style.display = 'none';
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeOverlay);
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeOverlay();
  });

  // -------------------------------------------------------------
  // 8️⃣ Verify PDF exists (HEAD request) – graceful fallback
  // -------------------------------------------------------------
  fetch(pdfUrl, { method: 'HEAD' })
    .then(resp => {
      if (!resp.ok) {
        btn.textContent = `Файл ${file} не найден`;
        btn.disabled = true;
        btn.style.opacity = '0.6';
      }
    })
    .catch(() => {
      btn.textContent = `Ошибка загрузки`;
      btn.disabled = true;
      btn.style.opacity = '0.6';
    });
})();
