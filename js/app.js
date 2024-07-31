//Add new Section - Section 4
const newSection = document.createElement('section');
newSection.id = 'section4';

// Add the new "data-nav" attribute for the new section
newSection.setAttribute('data-nav', 'Section 4');

// Create new content for the new section
newSection.innerHTML = `
        <div class="landing__container">
            <h2>Section 4</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>
            <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
        </div>
    `;

// Add the new section after section 3
const sect3 = document.getElementById('section3');
sect3.insertAdjacentElement('afterend', newSection);

/**
 * Define Global Variables
*/
const navList = document.querySelector('#navbar__list');
const sections = document.querySelectorAll('section');
const fragNav = document.createDocumentFragment();
const buttonScroll = document.createElement('button');
let count = 1;
const header = document.querySelector('header')
let isScrolling = false;
let scrollTimeOut;

// build the nav
sections.forEach(section => {
    const direct = document.createElement('a');
    const item = document.createElement('li');
    direct.textContent = `Section ${count}`;
    direct.classList.add('menu__link');
    count = count + 1;
    direct.href = `#${section.id}`;
    item.appendChild(direct);
    fragNav.appendChild(item);
});
navList.appendChild(fragNav);


// Add class 'active' to section when near top of viewport
const value = 150;
const links = document.querySelectorAll('.menu__link');
let curLink;
function makeActive() {
    sections.forEach((section) => {
        const box = section.getBoundingClientRect();

        if (box.top <= value && box.bottom >= value) {
            section.classList.add('active');
            links.forEach((link) => {
                const linkStr = link.getAttribute('href').substring(1);
                if (linkStr === section.id) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            })
        } else {
            section.classList.remove('active');
        }
    })
    if (window.scrollY > window.innerHeight) {
        buttonScroll.style.display = 'block';
    } else {
        buttonScroll.style.display = 'none';
    }
}


//Hide the NavBar when not scrolling
function hidingNavBar() {
    if (!isScrolling) {
        navList.classList.remove('hidden');
        isScrolling = true;
    }
    clearTimeout(scrollTimeOut);
    scrollTimeOut = setTimeout(() => {
        isScrolling = false;
        navList.classList.add('hidden');
    }, 2000)
}

// Scroll to anchor ID using scrollTO event
function scrollFunc(event) {
    const target = event.target;
    if (target.nodeName === 'A') {
        event.preventDefault();
        let scrollId = target.getAttribute('href');
        let scrollEle = document.querySelector(`${scrollId}`);
        scrollEle.scrollIntoView({ behavior: 'smooth' })
    }
}

navList.addEventListener('click', scrollFunc);



document.addEventListener('scroll', () => {
    hidingNavBar();
    makeActive();
})


// Scroll to section on link click
const fragButton = document.createDocumentFragment();
buttonScroll.classList.add('buttonScroll');
fragButton.appendChild(buttonScroll);
buttonScroll.textContent = '↑';
document.body.appendChild(fragButton);
buttonScroll.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
})



