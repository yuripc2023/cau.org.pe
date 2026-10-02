(function () {
  "use strict";

  const currentPage = document.body.dataset.page || "";

  const navItem = (href, label, key) => {
    const active = currentPage === key ? " active" : "";
    return `<li><a class="nav-link${active}" href="${href}">${label}</a></li>`;
  };

  const dropdown = (label, key, links) => {
    const active = links.some((link) => link.key === currentPage) ? " active" : "";
    return `
      <li class="nav-item${active}">
        <button class="dropdown-toggle" type="button" aria-expanded="false">${label}</button>
        <ul class="dropdown-menu">
          ${links.map((link) => `<li><a${link.highlight ? ' class="dropdown-link-highlight"' : ""} href="${link.href}">${link.label}</a></li>`).join("")}
        </ul>
      </li>`;
  };

  const header = document.querySelector("[data-site-header]");
  if (header) {
    header.innerHTML = `
      <a class="skip-link" href="#main-content">Ir al contenido</a>
      <header class="site-header" id="site-header">
        <div class="container header-inner">
          <a class="brand" href="index.html" aria-label="Inicio - Colegio de Abogados de Ucayali">
            <img src="assets/img/cau/logo.png" alt="" width="62" height="62">
            <span>Ilustre Colegio de<br>Abogados de Ucayali</span>
          </a>
          <button class="nav-toggle" type="button" aria-label="Abrir menú" aria-expanded="false">
            <span></span>
          </button>
          <nav class="main-nav" aria-label="Navegación principal">
            <ul class="nav-list">
              ${navItem("index.html", "Inicio", "inicio")}
              ${dropdown("Institucional", "institucional", [
                { href: "quienes-somos.html", label: "Quiénes somos", key: "quienes-somos" },
                { href: "junta-directiva.html", label: "Junta directiva", key: "junta-directiva" }
              ])}
              ${dropdown("Colegiatura", "colegiatura", [
                { href: "requisitos-para-colegiarse.html", label: "Requisitos para colegiarse", key: "requisitos-colegiatura" },
                { href: "requisitos-para-fondos-intangibles.html", label: "Fondos intangibles", key: "fondos-intangibles" }
              ])}
              ${navItem("publicaciones.html", "Publicaciones", "publicaciones")}
              ${dropdown("Enlaces", "enlaces", [
                { href: "enlaces.html", label: "Enlaces de interés", key: "enlaces" },
                { href: "https://aplicativo.cau.org.pe/login", label: "Mesa de partes", key: "", highlight: true },
                { href: "https://aplicativo.cau.org.pe/", label: "Sistema", key: "" },
                { href: "https://aplicativo.cau.org.pe/consulta-habilidad/20199186290", label: "Consulta de Habilidad", key: "" },
                { href: "#", label: "Biblioteca", key: "" },
                { href: "#", label: "Aula virtual", key: "" }
              ])}
              ${navItem("contactenos.html", "Contacto", "contacto")}
            </ul>
          </nav>
          <a class="button header-cta" href="centro-de-arbitraje.html">Centro de arbitraje</a>
        </div>
      </header>`;
  }

  const footer = document.querySelector("[data-site-footer]");
  if (footer) {
    footer.innerHTML = `
      <footer class="site-footer">
        <div class="container footer-main${footer.hasAttribute("data-footer-iso") ? " footer-main-with-iso" : ""}">
          <div class="footer-brand">
            <img src="assets/img/cau/logo.png" alt="Emblema del Colegio de Abogados de Ucayali" width="120" height="120" loading="lazy">
            <p>Institución profesional autónoma al servicio de sus agremiados y de la sociedad ucayalina.</p>
          </div>
          <div>
            <h2>Ubicación</h2>
            <p>Jr. Progreso N. 174<br>Callería, Coronel Portillo<br>Pucallpa, Ucayali</p>
            <a href="contactenos.html">Ver información de contacto</a>
          </div>
          <div>
            <h2>Horarios</h2>
            <ul>
              <li><strong>Caja</strong></li>
              <li>Lunes a viernes</li>
              <li>08:00-13:00</li>
              <li>14:00-17:45</li>
              <li><strong>Secretaría y arbitraje</strong></li>
              <li>08:00-13:00 y 14:00-18:00</li>
            </ul>
          </div>
          <div>
            <h2>Contacto</h2>
            <ul>
              <li><a href="tel:+51920558904">Caja: 920 558 904</a></li>
              <li><a href="tel:+51972927907">Secretaría: 972 927 907</a></li>
              <li><a href="tel:+51995304792">Arbitraje: 995 304 792</a></li>
              <li><a href="mailto:secretaria@cau.org.pe">secretaria@cau.org.pe</a></li>
              <li><a href="mailto:centrodearbitraje@cau.org.pe">centrodearbitraje@cau.org.pe</a></li>
            </ul>
          </div>
          ${footer.hasAttribute("data-footer-iso") ? `
            <div>
              <h2>ISOS</h2>
              <div class="footer-iso" role="group" aria-label="Sellos ISO">
                <img src="assets/img/cau/ISO-CAU-27001.png" alt="ISO 27001" loading="lazy">
                <img src="assets/img/cau/iso-CAU-90012015.webp" alt="ISO 9001:2015" loading="lazy">
                <img src="assets/img/cau/iso-CAU-370012016.webp" alt="ISO 37001:2016" loading="lazy">
              </div>
            </div>` : ""}
        </div>
        <div class="footer-bottom">
          <div class="container">© <span data-current-year></span> Ilustre Colegio de Abogados de Ucayali</div>
        </div>
      </footer>
      <button class="scroll-top" type="button" aria-label="Volver arriba">↑</button>`;
  }

  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  const navToggle = document.querySelector(".nav-toggle");
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      const open = document.body.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    });
  }

  document.querySelectorAll(".dropdown-toggle").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const item = toggle.closest(".nav-item");
      const open = item.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  });

  document.querySelectorAll(".main-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("nav-open");
      navToggle?.setAttribute("aria-expanded", "false");
    });
  });

  const scrollTop = document.querySelector(".scroll-top");
  if (scrollTop) {
    const updateScrollTop = () => {
      scrollTop.classList.toggle("visible", window.scrollY > 500);
    };
    window.addEventListener("scroll", updateScrollTop, { passive: true });
    updateScrollTop();
    scrollTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  const contactForm = document.querySelector("[data-contact-form]");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(contactForm);
      const subject = encodeURIComponent(data.get("subject") || "Consulta desde el sitio web");
      const body = encodeURIComponent(
        `Nombre: ${data.get("name")}\nTeléfono: ${data.get("phone") || "No indicado"}\nCorreo: ${data.get("email")}\n\n${data.get("message")}`
      );
      window.location.href = `mailto:secretaria@cau.org.pe?subject=${subject}&body=${body}`;
      const message = contactForm.querySelector(".form-message");
      if (message) message.textContent = "Se abrió su aplicación de correo para completar el envío.";
    });
  }

  const tariffModal = document.querySelector("#tariff-modal");
  const tariffOpen = document.querySelector("[data-tariff-modal-open]");
  const tariffClose = document.querySelector("[data-tariff-modal-close]");
  if (tariffModal && tariffOpen && tariffClose) {
    tariffOpen.addEventListener("click", () => tariffModal.showModal());
    tariffClose.addEventListener("click", () => tariffModal.close());
    tariffModal.addEventListener("click", (event) => {
      if (event.target === tariffModal) tariffModal.close();
    });
  }

  const calculator = document.querySelector("[data-arbitration-calculator]");
  const calculatorResult = document.querySelector("[data-calculator-result-body]");
  const calculatorDownload = document.querySelector("[data-download-calculation]");
  if (calculator && calculatorResult && calculatorDownload) {
    let lastCalculation;
    let calculatorLogoData = null;
    const calculatorLogo = new Image();
    calculatorLogo.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = calculatorLogo.naturalWidth;
      canvas.height = calculatorLogo.naturalHeight;
      canvas.getContext("2d").drawImage(calculatorLogo, 0, 0);
      calculatorLogoData = canvas.toDataURL("image/png");
    };
    calculatorLogo.src = new URL("assets/img/cau/logo.png", window.location.href).href;
    const formatMoney = (amount, currencyCode) => new Intl.NumberFormat("es-PE", { style: "currency", currency: currencyCode, minimumFractionDigits: 2 }).format(amount);
    const bracketFee = (amount, brackets) => {
      const bracket = brackets.find((item) => amount <= item.max) || brackets[brackets.length - 1];
      return { fee: Math.min(bracket.base + (amount - bracket.min) * bracket.rate, bracket.cap), label: bracket.label };
    };
    const singleBrackets = [
      { min: 0, max: 36000, base: 4151, rate: 0, cap: 4151, label: "Escala A" },
      { min: 36000, max: 72000, base: 4551, rate: 0.0272, cap: 5530.2, label: "Escala B" },
      { min: 72000, max: 108000, base: 5129, rate: 0.0314, cap: 6259.4, label: "Escala C" },
      { min: 108000, max: 180000, base: 6260, rate: 0.0199, cap: 7692.8, label: "Escala D" },
      { min: 180000, max: 360000, base: 7696, rate: 0.0087, cap: 9262, label: "Escala E" },
      { min: 360000, max: 1800000, base: 9259, rate: 0.009, cap: 22219, label: "Escala F" },
      { min: 1800000, max: 3600000, base: 15478, rate: 0.0098, cap: 33118, label: "Escala G" },
      { min: 3600000, max: Infinity, base: 32778, rate: 0.0025, cap: 221156, label: "Escala H" }
    ];
    const panelBrackets = [
      { min: 0, max: 36000, base: 6760, rate: 0, cap: 6760, label: "Escala A" },
      { min: 36000, max: 72000, base: 6760, rate: 0.1061, cap: 10579.6, label: "Escala B" },
      { min: 72000, max: 108000, base: 10580, rate: 0.071, cap: 13136, label: "Escala C" },
      { min: 108000, max: 180000, base: 13134, rate: 0.0484, cap: 16618.8, label: "Escala D" },
      { min: 180000, max: 360000, base: 16613, rate: 0.027, cap: 21473, label: "Escala E" },
      { min: 360000, max: 1800000, base: 19665, rate: 0.0185, cap: 46305, label: "Escala F" },
      { min: 1800000, max: 3600000, base: 47049, rate: 0.0118, cap: 68289, label: "Escala G" },
      { min: 3600000, max: Infinity, base: 67666, rate: 0.0058, cap: 623014, label: "Escala H" }
    ];
    const emergencyBrackets = [
      [1000000, 8000], [5000000, 12000], [10000000, 18000], [15000000, 22500], [20000000, 30000], [25000000, 37500], [30000000, 45000], [35000000, 52500], [40000000, 60000], [45000000, 67500], [50000000, 75101], [55000000, 82500], [60000000, 90123], [65000000, 97500], [70000000, 105146.25], [100000000, 150000], [Infinity, 170000]
    ];
    const calculationType = calculator.elements.calculationType;
    const calculatorTabs = document.querySelectorAll("[data-calculator-tab]");
    const costsOnly = calculator.querySelectorAll("[data-costs-only]");
    const submitButton = calculator.querySelector('[type="submit"]');
    calculatorTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const emergencyMode = tab.dataset.calculatorTab === "emergency";
        calculationType.value = emergencyMode ? "emergency" : "costs";
        calculatorTabs.forEach((item) => { const active = item === tab; item.classList.toggle("is-active", active); item.setAttribute("aria-selected", String(active)); });
        costsOnly.forEach((field) => { field.hidden = emergencyMode; });
        submitButton.textContent = emergencyMode ? "Calcular arbitraje de emergencia" : "Calcular costos";
        calculatorDownload.hidden = true;
        calculatorResult.innerHTML = `<p class="eyebrow">Resultado</p><h2>${emergencyMode ? "Árbitro de Emergencia" : "Ingrese una cuantía"}</h2><p>${emergencyMode ? "Ingrese la cuantía de la pretensión cautelar para estimar los importes." : "Seleccione el tipo de arbitraje e ingrese el monto de la pretensión para ver una estimación."}</p>`;
      });
    });
    calculator.addEventListener("submit", (event) => {
      event.preventDefault();
      const service = calculator.elements.service.value;
      const inputAmount = Number(calculator.elements.amount.value);
      const currencyCode = calculator.elements.currency.value;
      const exchangeRate = Number(calculator.elements.exchangeRate.value);
      if (!Number.isFinite(inputAmount) || inputAmount < 0 || !Number.isFinite(exchangeRate) || exchangeRate <= 0) return;
      const amount = currencyCode === "USD" ? inputAmount * exchangeRate : inputAmount;
      const display = (value) => formatMoney(currencyCode === "USD" ? value / exchangeRate : value, currencyCode);
      const penDisplay = (value) => formatMoney(value, "PEN");
      let fee; let title; let detail; let breakdown = ""; let items = [];
      if (calculationType.value === "emergency") { const row = emergencyBrackets.find(([max]) => amount <= max); fee = row[1] * 2; title = "Árbitro de Emergencia"; detail = "Honorario del árbitro y servicio de arbitraje de emergencia"; items = [["Árbitro de emergencia", row[1]], ["Servicio de arbitraje de emergencia", row[1]]]; }
      if (calculationType.value === "costs" && service === "single") { const result = bracketFee(amount, singleBrackets); fee = result.fee; title = "Árbitro Único"; detail = result.label; items = [["Honorario arbitral", fee]]; }
      if (calculationType.value === "costs" && service === "panel") { const result = bracketFee(amount, panelBrackets); fee = result.fee; title = "Tribunal Arbitral Colegiado"; detail = result.label; items = [["Honorarios del tribunal", fee]]; }
      if (calculationType.value === "costs" && service.startsWith("accelerated-")) { const accelerated = amount <= 20000 ? [5800, 5800, 17550, "Escala A"] : amount <= 50000 ? [7800, 7800, 23400, "Escala B"] : null; if (!accelerated) { calculatorDownload.hidden = true; calculatorResult.innerHTML = '<p class="eyebrow">Resultado</p><h2>Cuantía fuera de rango</h2><p>La tabla de Arbitraje Acelerado publicada cubre cuantías de hasta S/ 50,000.00.</p>'; return; } const arbitratorService = service === "accelerated-panel" ? accelerated[2] : accelerated[1]; fee = accelerated[0] + arbitratorService; title = service === "accelerated-panel" ? "Arbitraje Acelerado — 3 Árbitros" : "Arbitraje Acelerado — 1 Árbitro"; detail = accelerated[3]; items = [["Gastos administrativos", accelerated[0]], ["Servicio de arbitraje", arbitratorService]]; }
      breakdown = items.map(([label, value]) => `<p><strong>${label}:</strong> ${display(value)}</p>`).join("");
      lastCalculation = { title, detail, inputAmount, amount, currencyCode, exchangeRate, fee, items };
      calculatorResult.innerHTML = `<p class="eyebrow">Resultado referencial</p><h2>${title}</h2><p class="calculator-result__amount">${display(fee)}</p><p>Total estimado sin IGV</p><div class="calculator-result__detail"><p><strong>Cuantía:</strong> ${formatMoney(inputAmount, currencyCode)}</p><p><strong>Aplicación:</strong> ${detail}</p>${breakdown}${currencyCode === "USD" ? `<p><strong>Equivalente:</strong> ${penDisplay(fee)}</p>` : ""}</div>`;
      calculatorDownload.hidden = false;
    });
    calculatorDownload.addEventListener("click", () => {
      if (!lastCalculation) return;
      const { title, detail, inputAmount, currencyCode, exchangeRate, fee, items } = lastCalculation;
      const printable = (value) => formatMoney(currencyCode === "USD" ? value / exchangeRate : value, currencyCode);
      const totalWithTax = fee * 1.18;
      if (!window.jspdf?.jsPDF) {
        calculatorResult.innerHTML = '<p class="eyebrow">No se pudo generar el PDF</p><h2>Intente nuevamente</h2><p>Recargue la página y vuelva a calcular antes de descargar.</p>';
        return;
      }
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4", compress: true });
      const navy = [13, 54, 95]; const gold = [185, 150, 80]; const pale = [245, 240, 229];
      if (calculatorLogoData) doc.addImage(calculatorLogoData, "PNG", 22, 18, 25, 25);
      doc.setDrawColor(...gold); doc.setLineWidth(0.7); doc.line(20, 48, 190, 48);
      doc.setTextColor(...navy); doc.setFont("helvetica", "bold"); doc.setFontSize(16); doc.text(["Centro de Arbitraje del", "Colegio de Abogados de Ucayali"], 54, 27);
      doc.setTextColor(...gold); doc.setFontSize(9); doc.text("RESULTADO REFERENCIAL", 20, 66);
      doc.setTextColor(...navy); doc.setFont("times", "bold"); doc.setFontSize(25); doc.text("Calculadora de Costos Arbitrales", 20, 78);
      doc.setFont("helvetica", "bold"); doc.setFontSize(16); doc.text(`Para ${title}`, 20, 91);
      doc.setFont("helvetica", "normal"); doc.setFontSize(12); doc.text(`Monto de la cuantía: ${formatMoney(inputAmount, currencyCode)}`, 20, 104);
      let y = 119; doc.setFillColor(...navy); doc.rect(20, y, 170, 12, "F"); doc.setTextColor(255, 255, 255); doc.setFont("helvetica", "bold"); doc.setFontSize(11); doc.text(`Detalle de costos — ${detail}`, 25, y + 8); y += 12;
      items.forEach(([label, value]) => { doc.setTextColor(22, 34, 56); doc.setFont("helvetica", "normal"); doc.setFontSize(11); doc.text(label, 25, y + 9); doc.setFont("helvetica", "bold"); doc.text(printable(value), 185, y + 9, { align: "right" }); doc.setDrawColor(217, 224, 231); doc.line(20, y + 13, 190, y + 13); y += 13; });
      doc.setFillColor(...pale); doc.rect(20, y, 170, 13, "F"); doc.setTextColor(...navy); doc.setFont("helvetica", "bold"); doc.text(`TOTAL (${currencyCode})`, 25, y + 9); doc.text(printable(fee), 185, y + 9, { align: "right" }); y += 13;
      doc.setDrawColor(...gold); doc.rect(20, y, 170, 13); doc.text(`Total con IGV (${currencyCode})`, 25, y + 9); doc.text(printable(totalWithTax), 185, y + 9, { align: "right" });
      y += 35; doc.setFillColor(245, 247, 250); doc.rect(20, y, 170, 39, "F"); doc.setDrawColor(...gold); doc.setLineWidth(1); doc.line(20, y, 20, y + 39); doc.setTextColor(...navy); doc.setFontSize(16); doc.text("Cada parte deberá asumir el 50%", 26, y + 12); doc.setFont("helvetica", "normal"); doc.setFontSize(10.5); doc.text(doc.splitTextToSize("Con relación a los honorarios arbitrales y los servicios de administración, cada parte deberá asumir el 50% de los costos arbitrales, salvo disposición distinta aplicable al caso.", 155), 26, y + 21);
      doc.setDrawColor(217, 224, 231); doc.setLineWidth(0.3); doc.line(20, 278, 190, 278); doc.setTextColor(85, 112, 135); doc.setFontSize(8.5); doc.text(`Centro de Arbitraje del Colegio de Abogados de Ucayali · Generado el ${new Date().toLocaleDateString("es-PE")}`, 105, 284, { align: "center" });
      doc.save(`costos-arbitrales-cau-${new Date().toISOString().slice(0, 10)}.pdf`);
      return;
      const rows = items.map(([label, value]) => `<tr><td>${label}</td><td>${printable(value)}</td></tr>`).join("");
      const logoUrl = new URL("assets/img/cau/logo.png", window.location.href).href;
      const report = window.open("", "_blank", "width=900,height=900");
      if (!report) return;
      report.document.write(`<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Calculadora de Costos Arbitrales - CAU</title><style>@page{size:A4;margin:0}*{box-sizing:border-box}body{margin:0;color:#162238;font-family:Arial,sans-serif}.sheet{min-height:297mm;padding:28mm 22mm 23mm;position:relative}.header{display:flex;align-items:center;gap:18px;padding-bottom:22px;border-bottom:3px solid #b99650}.header img{width:86px;height:86px;object-fit:contain}.institution{color:#0d365f;font-size:22px;font-weight:700;line-height:1.25}.kicker{margin:45px 0 9px;color:#b0802d;font-size:11px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase}h1{margin:0;color:#0d365f;font-family:Georgia,serif;font-size:31px}h2{margin:28px 0 14px;color:#162238;font-size:20px}.amount{font-size:18px}.box{margin-top:32px;border:1px solid #b99650}.box-title{padding:14px 16px;color:#fff;background:#0d365f;font-size:17px;font-weight:700}table{width:100%;border-collapse:collapse}td{padding:15px 16px;border-top:1px solid #d9e0e7;font-size:15px}td:last-child{text-align:right;font-weight:700}.total{background:#f5f0e5;color:#0d365f;font-size:17px}.tax{color:#0d365f}.note{margin-top:46px;padding:20px 22px;background:#f5f7fa;border-left:4px solid #b99650}.note h3{margin:0 0 9px;color:#0d365f;font-size:21px}.note p{margin:0;line-height:1.55}.footer{position:absolute;right:22mm;bottom:13mm;left:22mm;padding-top:11px;border-top:1px solid #d9e0e7;color:#557087;font-size:10px;text-align:center}</style></head><body><main class="sheet"><header class="header"><img src="${logoUrl}" alt="Logo del Colegio de Abogados de Ucayali"><div class="institution">Centro de Arbitraje<br>del Colegio de Abogados de Ucayali</div></header><p class="kicker">Resultado referencial</p><h1>Calculadora de Costos Arbitrales</h1><h2>Para ${title}</h2><p class="amount"><strong>Monto de la cuantía:</strong> ${formatMoney(inputAmount, currencyCode)}</p><section class="box"><div class="box-title">Detalle de costos — ${detail}</div><table><tbody>${rows}<tr class="total"><td>TOTAL (${currencyCode})</td><td>${printable(fee)}</td></tr><tr class="tax"><td>Total con IGV (${currencyCode})</td><td>${printable(totalWithTax)}</td></tr></tbody></table></section><section class="note"><h3>Cada parte deberá asumir el 50%</h3><p>Con relación a los honorarios arbitrales y los servicios de administración, cada parte deberá asumir el 50% de los costos arbitrales, salvo disposición distinta aplicable al caso.</p></section><footer class="footer">Centro de Arbitraje del Colegio de Abogados de Ucayali · Resultado generado el ${new Date().toLocaleDateString("es-PE")}</footer></main><script>window.onload=()=>{window.print();}</script></body></html>`);
      report.document.close();
    });
  }
})();
