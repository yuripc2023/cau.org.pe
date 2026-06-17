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
          ${links.map((link) => `<li><a href="${link.href}">${link.label}</a></li>`).join("")}
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
                { href: "https://cau-ucayali.org.pe/intranet/login.php", label: "Intranet", key: "" },
                { href: "https://cau-ucayali.org.pe/biblioteca/", label: "Biblioteca", key: "" },
                { href: "https://cau-ucayali.org.pe/aula/login/index.php", label: "Aula virtual", key: "" }
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
        <div class="container footer-main">
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
})();
