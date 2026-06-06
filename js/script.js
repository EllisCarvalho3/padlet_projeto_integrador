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

    // --- FUNÇÃO PAI: Sincroniza a tela com o que está escrito na URL ---
    function checarUrlEGerenciarModais() {
        const hashAtual = window.location.hash; // Captura exatamente o '#modal-estacao-X'

        // 1. Esconde rigorosamente todos os modais da tela
        modals.forEach(modal => {
            modal.style.display = "none";
        });
        document.body.style.overflow = "auto"; // Libera a rolagem da página

        // 2. Se a URL contiver o ID de um modal, exibe apenas ele
        if (hashAtual) {
            // Remove o caractere '#' para encontrar o ID puro do elemento HTML
            const idDoModal = hashAtual.substring(1); 
            const modalParaAbrir = document.getElementById(idDoModal);
            
            if (modalParaAbrir) {
                modalParaAbrir.style.display = "flex";
                document.body.style.overflow = "hidden"; // Bloqueia a rolagem ao fundo
            }
        }
    }

    // --- ESCUTADORES DE EVENTO (INTERAÇÃO DO USUÁRIO) ---

    // Configura o clique em cada estação do mapa
    stations.forEach(station => {
        station.addEventListener("click", (event) => {
            // Evita que a página dê saltos bruscos na tela
            event.preventDefault(); 
            
            const linkAlvo = station.getAttribute("href");
            if (linkAlvo) {
                // Modifica o histórico da URL atual. Isso disparará o evento 'hashchange' automaticamente
                history.pushState(null, null, linkAlvo);
                checarUrlEGerenciarModais();
            }
        });
    });

    // Configura o botão "X" para fechar a janela
    closes.forEach(botaoFechar => {
        botaoFechar.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            
            // Remove o hash limpando a URL de volta para o estado normal
            history.pushState(null, null, window.location.pathname + window.location.search);
            checarUrlEGerenciarModais();
        });
    });

    // Configura o clique na região escura/desfocada fora do modal para fechar
    window.addEventListener("click", (event) => {
        modals.forEach(modal => {
            if (event.target === modal) {
                history.pushState(null, null, window.location.pathname + window.location.search);
                checarUrlEGerenciarModais();
            }
        });
    });

    // --- DISPARADORES AUTOMÁTICOS DO NAVEGADOR ---

    // Monitora se a URL mudar a qualquer momento (botões de avançar/voltar ou cliques)
    window.addEventListener("hashchange", checarUrlEGerenciarModais);

    // Executa imediatamente na inicialização para permitir links diretos compartilháveis
    checarUrlEGerenciarModais();
});