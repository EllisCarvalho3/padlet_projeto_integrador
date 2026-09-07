document.addEventListener("DOMContentLoaded", () => {

    const stations =
        document.querySelectorAll(
            ".journey-map .station"
        );

    const modals =
        document.querySelectorAll(".modal");

    const closes =
        document.querySelectorAll(".modal .close");


    let elementoAnterior = null;


    /* =====================================================
       FECHAR TODOS OS MODAIS
       ===================================================== */

    function fecharTodosOsModais() {

        modals.forEach((modal) => {

            modal.style.display = "none";

            modal.setAttribute(
                "aria-hidden",
                "true"
            );

        });

        document.body.style.overflow = "auto";
    }


    /* =====================================================
       ABRIR MODAL
       ===================================================== */

    function abrirModal(modal, station = null) {

        if (!modal) {
            return;
        }


        elementoAnterior = station;


        fecharTodosOsModais();


        modal.style.display = "flex";

        modal.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.style.overflow =
            "hidden";


        const botaoFechar =
            modal.querySelector(".close");


        if (botaoFechar) {

            setTimeout(() => {

                botaoFechar.focus();

            }, 50);

        }

    }


    /* =====================================================
       FECHAR MODAL
       ===================================================== */

    function fecharModal() {

        const modalAberto =
            document.querySelector(
                '.modal[aria-hidden="false"]'
            );


        fecharTodosOsModais();


        history.pushState(
            null,
            "",
            window.location.pathname +
            window.location.search
        );


        if (elementoAnterior) {

            setTimeout(() => {

                elementoAnterior.focus();

            }, 50);

        }
    }


    /* =====================================================
       VERIFICAR HASH DA URL
       ===================================================== */

    function sincronizarModaisComUrl() {

        fecharTodosOsModais();


        const hashAtual =
            window.location.hash;


        if (!hashAtual) {
            return;
        }


        const idDoModal =
            hashAtual.substring(1);


        const modal =
            document.getElementById(
                idDoModal
            );


        if (modal) {

            abrirModal(modal);

        }

    }


    /* =====================================================
       ESTAÇÕES
       ===================================================== */

    stations.forEach((station) => {

        station.addEventListener(
            "click",
            (event) => {

                event.preventDefault();


                const linkAlvo =
                    station.getAttribute(
                        "href"
                    );


                if (!linkAlvo) {
                    return;
                }


                const idDoModal =
                    linkAlvo.substring(1);


                const modal =
                    document.getElementById(
                        idDoModal
                    );


                if (!modal) {
                    return;
                }


                history.pushState(
                    null,
                    "",
                    linkAlvo
                );


                abrirModal(
                    modal,
                    station
                );

            }
        );


        /* =============================================
           ACESSIBILIDADE POR TECLADO
           ============================================= */

        station.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    station.click();

                }

            }
        );

    });


    /* =====================================================
       BOTÕES DE FECHAR
       ===================================================== */

    closes.forEach((botaoFechar) => {

        botaoFechar.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                event.stopPropagation();

                fecharModal();

            }
        );

    });


    /* =====================================================
       FECHAR CLICANDO FORA DO MODAL
       ===================================================== */

    window.addEventListener(
        "click",
        (event) => {

            modals.forEach((modal) => {

                if (
                    event.target === modal &&
                    modal.getAttribute(
                        "aria-hidden"
                    ) === "false"
                ) {

                    fecharModal();

                }

            });

        }
    );


    /* =====================================================
       ESC FECHA O MODAL
       ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key !== "Escape") {
                return;
            }


            const modalAberto =
                document.querySelector(
                    '.modal[aria-hidden="false"]'
                );


            if (modalAberto) {

                fecharModal();

            }

        }
    );


    /* =====================================================
       NAVEGAÇÃO PELO HISTÓRICO
       ===================================================== */

    window.addEventListener(
        "popstate",
        sincronizarModaisComUrl
    );


    window.addEventListener(
        "hashchange",
        sincronizarModaisComUrl
    );


    /* =====================================================
       ESTADO INICIAL
       ===================================================== */

    fecharTodosOsModais();

    sincronizarModaisComUrl();

});