/* =========================================
   THEME
========================================= */

const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

const root = document.documentElement;


function updateThemeIcon() {

    const currentTheme =
        root.getAttribute("data-theme");

    if (currentTheme === "dark") {

        themeIcon.textContent = "☀";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to light mode"
        );

    } else {

        themeIcon.textContent = "☾";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );

    }

}


updateThemeIcon();


themeToggle.addEventListener("click", () => {

    const currentTheme =
        root.getAttribute("data-theme");


    if (currentTheme === "dark") {

        root.setAttribute(
            "data-theme",
            "light"
        );

        localStorage.setItem(
            "theme",
            "light"
        );

    } else {

        root.setAttribute(
            "data-theme",
            "dark"
        );

        localStorage.setItem(
            "theme",
            "dark"
        );

    }


    updateThemeIcon();

});


/* =========================================
   MOBILE MENU
========================================= */

const menuButton =
    document.getElementById("menu-button");

const navigation =
    document.getElementById("navigation");


menuButton.addEventListener("click", () => {

    const isOpen =
        navigation.classList.toggle("open");


    menuButton.setAttribute(
        "aria-expanded",
        isOpen
    );

});


/* Close mobile menu after clicking a link */

const navigationLinks =
    navigation.querySelectorAll("a");


navigationLinks.forEach((link) => {

    link.addEventListener("click", () => {

        navigation.classList.remove("open");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});


/* =========================================
   REVEAL ANIMATIONS
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* =========================================
   SYSTEM THEME CHANGES
========================================= */

const systemTheme =
    window.matchMedia(
        "(prefers-color-scheme: dark)"
    );


systemTheme.addEventListener(
    "change",
    (event) => {

        const savedTheme =
            localStorage.getItem("theme");


        if (savedTheme) {
            return;
        }


        if (event.matches) {

            root.setAttribute(
                "data-theme",
                "dark"
            );

        } else {

            root.setAttribute(
                "data-theme",
                "light"
            );

        }


        updateThemeIcon();

    }
);