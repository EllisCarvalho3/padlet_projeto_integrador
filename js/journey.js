const stations =
document.querySelectorAll(".station");

const modals =
document.querySelectorAll(".modal");

const closes =
document.querySelectorAll(".close");

stations.forEach(station => {

    station.addEventListener("click", () => {

        const target =
        station.dataset.target;

        document
        .getElementById(target)
        .style.display = "flex";

    });

});

closes.forEach(btn => {

    btn.addEventListener("click", () => {

        btn.closest(".modal")
        .style.display = "none";

    });

});

window.addEventListener("click", (e) => {

    modals.forEach(modal => {

        if(e.target === modal){

            modal.style.display = "none";

        }

    });

});