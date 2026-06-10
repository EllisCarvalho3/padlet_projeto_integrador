document.addEventListener("DOMContentLoaded", () => {
    const stations = document.querySelectorAll(".journey-map .station");
    const modals = document.querySelectorAll(".modal");
    const closes = document.querySelectorAll(".close");

    function sincronizarModaisComUrl() {
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
                sincronizarModaisComUrl();
            }
        });
    });

   
    closes.forEach(botaoFechar => {
        botaoFechar.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation(); 
            
           
            history.pushState(null, null, window.location.pathname + window.location.search);
            sincronizarModaisComUrl();
        });
    });

    
    window.addEventListener("click", (event) => {
        modals.forEach(modal => {
            if (event.target === modal) {
                history.pushState(null, null, window.location.pathname + window.location.search);
                sincronizarModaisComUrl();
            }
        });
    });

   

    window.addEventListener("hashchange", sincronizarModaisComUrl);

    sincronizarModaisComUrl();
});