document.addEventListener("DOMContentLoaded", () => {
  const stations = document.querySelectorAll(".journey-map .station");
  const modals = document.querySelectorAll(".modal");
  const closes = document.querySelectorAll(".modal .close");
  let elementoAnterior = null;

  function fecharTodosOsModais() {
    modals.forEach(modal => {
      modal.style.display = "none";
      modal.setAttribute("aria-hidden", "true");
    });
    document.body.style.overflow = "auto";
  }

  function abrirModal(modal, station = null) {
    if (!modal) return;
    elementoAnterior = station;
    fecharTodosOsModais();
    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    modal.querySelector(".close")?.focus();
  }

  function fecharModal() {
    fecharTodosOsModais();
    history.pushState(null, "", window.location.pathname + window.location.search);
    elementoAnterior?.focus();
  }

  function sincronizarModaisComUrl() {
    fecharTodosOsModais();
    const modal = document.getElementById(window.location.hash.substring(1));
    if (modal) abrirModal(modal);
  }

  stations.forEach(station => {
    station.addEventListener("click", event => {
      event.preventDefault();
      const href = station.getAttribute("href");
      const modal = document.getElementById(href?.substring(1));
      if (!modal) return;
      history.pushState(null, "", href);
      abrirModal(modal, station);
    });

    station.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        station.click();
      }
    });
  });

  closes.forEach(botaoFechar => {
    botaoFechar.addEventListener("click", event => {
      event.preventDefault();
      fecharModal();
    });
  });

  window.addEventListener("click", event => {
    modals.forEach(modal => {
      if (event.target === modal && modal.getAttribute("aria-hidden") === "false") {
        fecharModal();
      }
    });
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && document.querySelector('.modal[aria-hidden="false"]')) {
      fecharModal();
    }
  });

  window.addEventListener("popstate", sincronizarModaisComUrl);
  window.addEventListener("hashchange", sincronizarModaisComUrl);
  sincronizarModaisComUrl();
});
