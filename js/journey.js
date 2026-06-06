// Aguarda o documento carregar completamente antes de rodar os eventos
document.addEventListener("DOMContentLoaded", () => {
    const stations = document.querySelectorAll(".station");
    const modals = document.querySelectorAll(".modal");
    const closes = document.querySelectorAll(".close");

    // Abrir o modal correspondente ao card clicado
    stations.forEach(station => {
        station.addEventListener("click", () => {
            const targetId = station.getAttribute("data-target");
            const targetModal = document.getElementById(targetId);
            
            if (targetModal) {
                targetModal.style.display = "flex";
                document.body.style.overflow = "hidden"; // Bloqueia o scroll da página ao fundo
            }
        });
    });

    // Fechar ao clicar no botão "X"
    closes.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation(); // Evita conflitos de clique
            const activeModal = btn.closest(".modal");
            if (activeModal) {
                activeModal.style.display = "none";
                document.body.style.overflow = "auto"; // Devolve o scroll da página
            }
        });
    });

    // Fechar ao clicar fora da caixa branca (no fundo escurecido)
    window.addEventListener("click", (e) => {
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = "none";
                document.body.style.overflow = "auto";
            }
        });
    });
});