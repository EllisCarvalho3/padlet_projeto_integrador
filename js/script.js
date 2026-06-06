window.addEventListener("scroll", () => {

    const header =
        document.getElementById("header");

    if (window.scrollY > 50) {

        header.style.boxShadow =
            "0 10px 30px rgba(0,0,0,.08)";

    }

    else {

        header.style.boxShadow = "none";

    }

});

// Função para expandir/recolher as caixas de mídia profunda de cada estação
function toggleStation(stationElement) {
    // Fecha todas as outras estações abertas para organizar a visualização
    const allStations = document.querySelectorAll('.station');
    allStations.forEach(st => {
        if (st !== stationElement) {
            st.classList.remove('active');
        }
    });

    // Alterna o estado da estação atual clicada
    stationElement.classList.toggle('active');
}