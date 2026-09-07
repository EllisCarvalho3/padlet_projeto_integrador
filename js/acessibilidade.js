document.addEventListener("DOMContentLoaded", () => {
  const accessibilityBar = document.createElement("div");
  accessibilityBar.className = "accessibility-bar";
  accessibilityBar.setAttribute("role", "region");
  accessibilityBar.setAttribute("aria-label", "Opções de acessibilidade");

  accessibilityBar.innerHTML = `
    <button type="button" id="increase-text" aria-label="Aumentar tamanho do texto" title="Aumentar tamanho do texto">A+</button>
    <button type="button" id="decrease-text" aria-label="Diminuir tamanho do texto" title="Diminuir tamanho do texto">A−</button>
    <button type="button" id="contrast-toggle" aria-label="Ativar ou desativar alto contraste" title="Alto contraste">Contraste</button>
    <button type="button" id="motion-toggle" aria-label="Ativar ou desativar animações" title="Reduzir animações">Animações</button>
  `;

  document.body.appendChild(accessibilityBar);

  const html = document.documentElement;
  const increaseText = document.getElementById("increase-text");
  const decreaseText = document.getElementById("decrease-text");
  const contrastToggle = document.getElementById("contrast-toggle");
  const motionToggle = document.getElementById("motion-toggle");

  increaseText.addEventListener("click", () => {
    if (!html.classList.contains("accessibility-large-text")) {
      html.classList.add("accessibility-large-text");
    } else {
      html.classList.remove("accessibility-large-text");
      html.classList.add("accessibility-extra-large-text");
    }
    anunciar("Tamanho do texto aumentado.");
  });

  decreaseText.addEventListener("click", () => {
    if (html.classList.contains("accessibility-extra-large-text")) {
      html.classList.remove("accessibility-extra-large-text");
    } else {
      html.classList.remove("accessibility-large-text");
    }
    anunciar("Tamanho do texto reduzido.");
  });

  contrastToggle.addEventListener("click", () => {
    html.classList.toggle("accessibility-high-contrast");
    const ativo = html.classList.contains("accessibility-high-contrast");
    contrastToggle.setAttribute("aria-pressed", ativo);
    anunciar(ativo ? "Alto contraste ativado." : "Alto contraste desativado.");
  });

  motionToggle.addEventListener("click", () => {
    html.classList.toggle("accessibility-reduced-motion");
    const ativo = html.classList.contains("accessibility-reduced-motion");
    motionToggle.setAttribute("aria-pressed", ativo);
    anunciar(ativo ? "Animações reduzidas." : "Animações normais ativadas.");
  });

  const accessibilityStatus = document.createElement("div");
  accessibilityStatus.className = "sr-only";
  accessibilityStatus.setAttribute("aria-live", "polite");
  accessibilityStatus.setAttribute("id", "accessibility-status");
  document.body.appendChild(accessibilityStatus);

  function anunciar(mensagem) {
    accessibilityStatus.textContent = "";
    setTimeout(() => {
      accessibilityStatus.textContent = mensagem;
    }, 50);
  }
});