document.addEventListener("DOMContentLoaded", function(e) {
    let logo_elem = document.getElementById("logo");
    let menu_icon_elem = document.getElementById("menu_icon");
    let menu_elem = document.getElementById("menu");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 20) {
            logo_elem.classList.add("logo_small");
            menu_elem.classList.add("open_small");
        } else {
            logo_elem.classList.remove("logo_small");
            menu_elem.classList.remove("open_small");
        }
    }, false);

    menu_icon_elem.addEventListener("click", function () {
        menu_elem.classList.toggle("open");
    }, false);
});
