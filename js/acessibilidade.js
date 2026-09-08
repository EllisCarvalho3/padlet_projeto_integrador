document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;
  const status = document.createElement("div");
  const storageKey = "tutoria-acessibilidade";
  if (!document.getElementById("increase-font") && !document.getElementById("increase-text")) {
    const painel = document.createElement("div");
    painel.className = "accessibility-panel";
    painel.setAttribute("role", "region");
    painel.setAttribute("aria-label", "Opções de acessibilidade");
    painel.innerHTML = `
      <button type="button" id="increase-font" aria-label="Aumentar tamanho do texto">A+</button>
      <button type="button" id="decrease-font" aria-label="Diminuir tamanho do texto">A-</button>
      <button type="button" id="reset-font" aria-label="Restaurar tamanho original do texto">A</button>
      <button type="button" id="toggle-contrast" aria-label="Ativar ou desativar alto contraste">Contraste</button>
      <button type="button" id="toggle-motion" aria-label="Reduzir animações da página">Reduzir animações</button>
    `;
    document.body.appendChild(painel);
  }
  const controles = {
    aumentar: document.getElementById("increase-font") || document.getElementById("increase-text"),
    diminuir: document.getElementById("decrease-font") || document.getElementById("decrease-text"),
    restaurar: document.getElementById("reset-font"),
    contraste: document.getElementById("toggle-contrast") || document.getElementById("contrast-toggle"),
    movimento: document.getElementById("toggle-motion") || document.getElementById("motion-toggle")
  };

  status.className = "sr-only";
  status.id = "accessibility-status";
  status.setAttribute("aria-live", "polite");
  document.body.appendChild(status);

  function anunciar(mensagem) {
    status.textContent = "";
    window.setTimeout(() => { status.textContent = mensagem; }, 50);
  }

  function salvarPreferencias() {
    localStorage.setItem(storageKey, JSON.stringify({
      texto: html.classList.contains("accessibility-extra-large-text") ? "extra" : html.classList.contains("accessibility-large-text") ? "grande" : "normal",
      contraste: html.classList.contains("accessibility-high-contrast"),
      movimento: html.classList.contains("accessibility-reduced-motion")
    }));
  }

  function atualizarEstado() {
    const contrasteAtivo = html.classList.contains("accessibility-high-contrast");
    const movimentoAtivo = html.classList.contains("accessibility-reduced-motion");
    if (controles.contraste) controles.contraste.setAttribute("aria-pressed", String(contrasteAtivo));
    if (controles.movimento) controles.movimento.setAttribute("aria-pressed", String(movimentoAtivo));
  }

  function restaurarPreferencias() {
    try {
      const preferencias = JSON.parse(localStorage.getItem(storageKey));
      if (!preferencias) return;
      html.classList.toggle("accessibility-large-text", preferencias.texto === "grande");
      html.classList.toggle("accessibility-extra-large-text", preferencias.texto === "extra");
      html.classList.toggle("accessibility-high-contrast", preferencias.contraste === true);
      html.classList.toggle("accessibility-reduced-motion", preferencias.movimento === true);
    } catch (erro) {
      localStorage.removeItem(storageKey);
    }
  }

  controles.aumentar?.addEventListener("click", () => {
    if (html.classList.contains("accessibility-large-text")) {
      html.classList.remove("accessibility-large-text");
      html.classList.add("accessibility-extra-large-text");
    } else {
      html.classList.add("accessibility-large-text");
    }
    salvarPreferencias();
    anunciar("Tamanho do texto aumentado.");
  });

  controles.diminuir?.addEventListener("click", () => {
    if (html.classList.contains("accessibility-extra-large-text")) {
      html.classList.remove("accessibility-extra-large-text");
      html.classList.add("accessibility-large-text");
    } else {
      html.classList.remove("accessibility-large-text");
    }
    salvarPreferencias();
    anunciar("Tamanho do texto reduzido.");
  });

  controles.restaurar?.addEventListener("click", () => {
    html.classList.remove("accessibility-large-text", "accessibility-extra-large-text");
    salvarPreferencias();
    anunciar("Tamanho original do texto restaurado.");
  });

  controles.contraste?.addEventListener("click", () => {
    html.classList.toggle("accessibility-high-contrast");
    salvarPreferencias();
    atualizarEstado();
    anunciar(html.classList.contains("accessibility-high-contrast") ? "Alto contraste ativado." : "Alto contraste desativado.");
  });

  controles.movimento?.addEventListener("click", () => {
    html.classList.toggle("accessibility-reduced-motion");
    salvarPreferencias();
    atualizarEstado();
    anunciar(html.classList.contains("accessibility-reduced-motion") ? "Animações reduzidas." : "Animações normais ativadas.");
  });

  const menu = document.getElementById("mobile-menu");
  const nav = document.querySelector("header nav");
  menu?.addEventListener("click", () => {
    const aberto = nav?.classList.toggle("is-open") === true;
    menu.setAttribute("aria-expanded", String(aberto));
    menu.setAttribute("aria-label", aberto ? "Fechar menu de navegação" : "Abrir menu de navegação");
  });

  restaurarPreferencias();
  atualizarEstado();
});