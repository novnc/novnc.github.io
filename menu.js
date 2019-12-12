// HTML INCLUDE FUNCTIONS

document.addEventListener("DOMContentLoaded", function(e) {
    includeHTML();
});

function includeFinished() {
    try {
        // Call all normal functions here
        setupMenuHandlers();
    } catch (e) {
        if (e instanceof TypeError) {
            // Something is missing - the required include will come later,
            // let's wait for next call to includeFinished()
            return;
        } else {
            throw e;
        }
    }
}

function includeHTML() {
    // Loop through all HTML elements
    let elements = document.getElementsByTagName("*");

    for (let i = 0; i < elements.length; i++) {
        let elem = elements[i];

        // search for elements with a the right attribute
        let include_file = elem.getAttribute("include-html");
        if (include_file) {

            // Make a HTTP request using the attribute value as the file name
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    // Since this isn't synchronous, double-check
                    // if the attribute is still there
                    if (this.status == 200 &&
                        elem.getAttribute("include-html") !== null) {

                        elem.innerHTML = this.responseText + elem.innerHTML;
                    }

                    if (this.status == 404) {
                        elem.innerHTML = "Page not found.";
                    }

                    includeFinished();

                    /* Remove the attribute, and call this function once more: */
                    elem.removeAttribute("include-html");
                    includeHTML();
                }
            }

            xhttp.open("GET", include_file, true);
            xhttp.send();

            /* Exit the function: */
            return;
        }
    }
}

// NORMAL FUNCTIONS

function setupMenuHandlers() {
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
}
