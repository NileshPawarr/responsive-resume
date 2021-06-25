/* PROFILE */
function getExperience() {
    let dateString = "01/06/2014",
        now = new Date(),
        today = new Date(now.getYear(), now.getMonth(), now.getDate()),
        yearNow = now.getYear(),
        monthNow = now.getMonth(),
        dateNow = now.getDate(),
        dob = new Date(
            dateString.substring(6, 10),
            dateString.substring(0, 2) - 1,
            dateString.substring(3, 5)
        ),
        yearDob = dob.getYear(),
        monthDob = dob.getMonth(),
        dateDob = dob.getDate(),
        age = {},
        ageString = "",
        yearString = "",
        monthString = "",
        yearAge = yearNow - yearDob;

    if (monthNow >= monthDob) var monthAge = monthNow - monthDob;
    else {
        yearAge--;
        var monthAge = 12 + monthNow - monthDob;
    }

    if (dateNow >= dateDob) var dateAge = dateNow - dateDob;
    else {
        monthAge--;
        var dateAge = 31 + dateNow - dateDob;

        if (monthAge < 0) {
            monthAge = 11;
            yearAge--;
        }
    }

    age = {
        years: yearAge,
        months: monthAge,
        days: dateAge,
    };

    if (age.years > 1) yearString = " years";
    else yearString = " year";
    if (age.months > 1) monthString = " months";
    else monthString = " month";

    if (age.years > 0 && age.months > 0)
        ageString = age.years + yearString + " and " + age.months + monthString;
    /* else if (age.years > 0 && age.months == 0 && age.days == 0)
        ageString = age.years + yearString + " Happy Work Anniversary to ME!!"; */
    else if (age.years > 0 && age.months == 0)
        ageString = age.years + yearString;

    return ageString;
};

document.getElementById('total-experience').innerText = getExperience();

/* SHOW MENU */
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId);

    /* Validate that variables exist */
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            /* We add the show-menu class to the div tag with the nav__menu class */
            nav.classList.toggle('show-menu');
        });
    }
};
showMenu('nav-toggle', 'nav-menu');

/* REMOVE MENU MOBILE */
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    /* When we click on each nav__link, we remove the show-menu class */
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/* SCROLL SECTIONS ACTIVE LINK */
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);

/* SHOW SCROLL TOP */
function scrollTop() {
    const scrollTop = document.getElementById('scroll-top');
    /* When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class */
    scrollTop && ((this.scrollY >= 200) ? scrollTop.classList.add('show-scroll') : scrollTop.classList.remove('show-scroll'));
}
window.addEventListener('scroll', scrollTop);

/* DARK LIGHT THEME */
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'bx-sun';

/* Previously selected topic (if user selected) */
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

/* We obtain the current theme that the interface has by validating the dark-theme class */
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun';

/* We validate if the user previously chose a topic */
if (selectedTheme) {
    /* If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark */
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme);
}

/* Activate / deactivate the theme manually with the button */
themeButton.addEventListener('click', () => {
    /* Add or remove the dark / icon theme */
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    /* We save the theme and the current icon that the user chose */
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
});

/* REDUCE THE SIZE AND PRINT ON AN A4 SHEET */
function scaleCv() {
    document.body.classList.add('scale-cv');
}

/* REMOVE THE SIZE WHEN THE CV IS DOWNLOADED */
function removeScale() {
    document.body.classList.remove('scale-cv');
}

/* GENERATE PDF */

/* PDF generated area */
let areaCv = document.getElementById('area-cv');

let resumeButton = document.getElementById('resume-button');

/* Html2pdf options */
let opt = {
    margin: 0,
    filename: 'Nilesh-Pawar-Resume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 4 },
    jsPDF: { format: 'a4', orientation: 'portrait' }
};

/* Function to call areaCv and Html2Pdf options */
function generateResume() {
    html2pdf(areaCv, opt);
}

/* When the button is clicked, it executes the three functions */
resumeButton.addEventListener('click', () => {

    /* 1. The class .scale-cv is added to the body, where it reduces the size of the elements */
    scaleCv();

    /* 2. The PDF is generated */
    generateResume();

    /* 3. The .scale-cv class is removed from the body after 5 seconds to return to normal size. */
    setTimeout(removeScale, 5000);
});