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