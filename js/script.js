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

document.addEventListener("DOMContentLoaded", () => {
    const modals = document.querySelectorAll(".modal");
    const closes = document.querySelectorAll(".close");
    const stations = document.querySelectorAll(".journey-map .station");

    function checarUrlEGerenciarModais() {
        const hashAtual = window.location.hash;

        modals.forEach(modal => {
            modal.style.display = "none";
        });
        document.body.style.overflow = "auto"; 

        
        if (hashAtual) {
          
            const idDoModal = hashAtual.substring(1); 
            const modalParaAbrir = document.getElementById(idDoModal);
            
            if (modalParaAbrir) {
                modalParaAbrir.style.display = "flex";
                document.body.style.overflow = "hidden"; 
            }
        }
    }

 
    stations.forEach(station => {
        station.addEventListener("click", (event) => {
          
            event.preventDefault(); 
            
            const linkAlvo = station.getAttribute("href");
            if (linkAlvo) {
                history.pushState(null, null, linkAlvo);
                checarUrlEGerenciarModais();
            }
        });
    });

    closes.forEach(botaoFechar => {
        botaoFechar.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            
            history.pushState(null, null, window.location.pathname + window.location.search);
            checarUrlEGerenciarModais();
        });
    });

    window.addEventListener("click", (event) => {
        modals.forEach(modal => {
            if (event.target === modal) {
                history.pushState(null, null, window.location.pathname + window.location.search);
                checarUrlEGerenciarModais();
            }
        });
    });

   
    window.addEventListener("hashchange", checarUrlEGerenciarModais);
    checarUrlEGerenciarModais();
});