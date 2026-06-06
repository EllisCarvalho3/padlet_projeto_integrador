// Aguarda o documento carregar completamente antes de rodar os eventos
document.addEventListener("DOMContentLoaded", () => {
    const stations = document.querySelectorAll(".journey-map .station");
    const modals = document.querySelectorAll(".modal");
    const closes = document.querySelectorAll(".close");

    // --- FUNÇÃO PAI: Sincroniza a tela com o link atual na URL ---
    function sincronizarModaisComUrl() {
        const hashAtual = window.location.hash; // Captura o '#modal-estacao-X'

        // 1. Esconde rigorosamente todos os modais da tela para limpar o estado anterior
        modals.forEach(modal => {
            modal.style.display = "none";
        });
        document.body.style.overflow = "auto"; // Libera a rolagem da página padrão

        // 2. Se a URL contiver o ID de um modal válido, exibe apenas ele
        if (hashAtual) {
            // Remove o caractere '#' para encontrar o ID puro do elemento HTML (ex: 'modal-estacao-1')
            const idDoModal = hashAtual.substring(1); 
            const modalParaAbrir = document.getElementById(idDoModal);
            
            if (modalParaAbrir) {
                modalParaAbrir.style.display = "flex";
                document.body.style.overflow = "hidden"; // Bloqueia a rolagem ao fundo para focar no conteúdo
            }
        }
    }

    // --- ESCUTADORES DE EVENTO (INTERAÇÃO DO USUÁRIO) ---

    // Configura o clique em cada estação do mapa
    stations.forEach(station => {
        station.addEventListener("click", (event) => {
            // Impede o salto abrupto de rolagem nativo do HTML para manter a abertura suave
            event.preventDefault(); 
            
            const linkAlvo = station.getAttribute("href"); // Obtém o valor do href (ex: #modal-estacao-1)
            if (linkAlvo) {
                // Altera a barra de endereços gerando a URL própria do modal sem recarregar a página
                history.pushState(null, null, linkAlvo);
                sincronizarModaisComUrl();
            }
        });
    });

    // Configura o botão "X" para fechar a janela
    closes.forEach(botaoFechar => {
        botaoFechar.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation(); // Evita bolhas de eventos indesejados
            
            // Remove o hash limpando a URL de volta para o estado normal sem o #
            history.pushState(null, null, window.location.pathname + window.location.search);
            sincronizarModaisComUrl();
        });
    });

    // Configura o clique na região escura/desfocada fora da caixinha branca para fechar
    window.addEventListener("click", (event) => {
        modals.forEach(modal => {
            if (event.target === modal) {
                history.pushState(null, null, window.location.pathname + window.location.search);
                sincronizarModaisComUrl();
            }
        });
    });

    // --- DISPARADORES AUTOMÁTICOS DO NAVEGADOR ---

    // Monitora se a URL mudar a qualquer momento (como botões de avançar/voltar do próprio navegador)
    window.addEventListener("hashchange", sincronizarModaisComUrl);

    // Executa imediatamente no carregamento inicial (Garante que links diretos compartilhados funcionem)
    sincronizarModaisComUrl();
});