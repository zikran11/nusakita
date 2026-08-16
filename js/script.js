document.addEventListener("DOMContentLoaded", () => {
// === LANGUAGE SWITCHING ===

let translations = {};
let currentLanguage =
    localStorage.getItem('selectedLanguage') || 'en';

let currentRegion = 'sumatra';


// =========================================
// LOAD TRANSLATIONS
// =========================================

fetch('./js/translations.json')
    .then(response => {

        if (!response.ok) {
            throw new Error(
                `HTTP error! status: ${response.status}`
            );
        }

        return response.json();

    })
    .then(data => {

        translations = data;

        // Apply saved language
        setLanguage(currentLanguage);

        // Update language button
        updateLanguageButton();

    })
    .catch(err => {

        console.error(
            'Error loading translations:',
            err
        );

    });


// =========================================
// LANGUAGE DROPDOWN
// =========================================

const languageSelector =
    document.getElementById('languageSelector');

const langToggle =
    document.getElementById('langToggle');

const mobileLangToggle =
    document.getElementById('mobileLangToggle');

const languageOptions =
    document.querySelectorAll('.language-option');


// =========================================
// OPEN / CLOSE DROPDOWN
// =========================================

if (langToggle && languageSelector) {

    langToggle.addEventListener('click', (e) => {

        e.stopPropagation();

        languageSelector.classList.toggle('open');

    });

}

if (mobileLangToggle) {
    mobileLangToggle.addEventListener('click', (e) => {
        e.stopPropagation();

        currentLanguage = currentLanguage === 'en' ? 'id' : 'en';
        localStorage.setItem('selectedLanguage', currentLanguage);
        setLanguage(currentLanguage);
        updateLanguageButton();
    });
}


// =========================================
// SELECT LANGUAGE
// =========================================

languageOptions.forEach(option => {

    option.addEventListener('click', (e) => {

        e.stopPropagation();

        const selectedLanguage =
            option.dataset.lang;

        // Make sure language exists
        if (
            !translations[selectedLanguage]
        ) {

            console.error(
                `Translation for "${selectedLanguage}" not found.`
            );

            return;

        }


        // Update current language
        currentLanguage =
            selectedLanguage;


        // Save language
        localStorage.setItem(
            'selectedLanguage',
            currentLanguage
        );


        // Apply language
        setLanguage(currentLanguage);


        // Update button
        updateLanguageButton();


        // Update active dropdown item
        languageOptions.forEach(item => {

            item.classList.toggle(
                'active',
                item.dataset.lang === currentLanguage
            );

        });


        // Close dropdown
        if (languageSelector) {

            languageSelector.classList.remove(
                'open'
            );

        }

    });

});


// =========================================
// CLOSE DROPDOWN WHEN CLICKING OUTSIDE
// =========================================

document.addEventListener('click', (e) => {

    if (
        languageSelector &&
        !languageSelector.contains(e.target)
    ) {

        languageSelector.classList.remove(
            'open'
        );

    }

});


// =========================================
// UPDATE LANGUAGE BUTTON
// =========================================

function updateLanguageButton() {

    const langFlag =
        document.getElementById('currentLangFlag');

    const mobileLangToggle =
        document.getElementById('mobileLangToggle');

    const languageOptions =
        document.querySelectorAll(
            '.language-option'
        );

    const flagMap = {
        en: {
            src: './assets/inggris.png',
            alt: 'English'
        },
        id: {
            src: './assets/bendera.png',
            alt: 'Indonesia'
        }
    };

    const selectedFlag = flagMap[currentLanguage] || flagMap.en;

    if (langFlag) {
        langFlag.src = selectedFlag.src;
        langFlag.alt = selectedFlag.alt;
    }

    if (mobileLangToggle) {
        mobileLangToggle.innerHTML = `
            <img src="${selectedFlag.src}" alt="${selectedFlag.alt}" class="mobile-lang-flag" />
        `;
    }


    // Update active option
    languageOptions.forEach(option => {

        option.classList.toggle(
            'active',
            option.dataset.lang === currentLanguage
        );

    });

}


// =========================================
// SET LANGUAGE
// =========================================

function setLanguage(lang) {

    // Make sure translations exist
    if (
        !translations ||
        !translations[lang]
    ) {

        console.error(
            `Language "${lang}" is not available.`
        );

        return;

    }


    document.documentElement.lang = lang;


    // =========================================
    // NAVIGATION
    // =========================================

    const navLinks = {

        story:
            document.querySelector(
                'a[href="#story"]'
            ),

        journey:
            document.querySelector(
                'a[href="#journey"]'
            ),

        menu:
            document.querySelector(
                'a[href="#menu"]'
            ),

        gallery:
            document.querySelector(
                'a[href="#gallery"]'
            ),

        contact:
            document.querySelector(
                'a[href="#contact"]'
            )

    };


    if (
        navLinks.story &&
        translations[lang].nav?.story
    ) {

        navLinks.story.textContent =
            translations[lang].nav.story;

    }


    if (
        navLinks.journey &&
        translations[lang].nav?.journey
    ) {

        navLinks.journey.textContent =
            translations[lang].nav.journey;

    }


    if (
        navLinks.menu &&
        translations[lang].nav?.menu
    ) {

        navLinks.menu.textContent =
            translations[lang].nav.menu;

    }


    if (
        navLinks.gallery &&
        translations[lang].nav?.gallery
    ) {

        navLinks.gallery.textContent =
            translations[lang].nav.gallery;

    }


    if (
        navLinks.contact &&
        translations[lang].nav?.contact
    ) {

        navLinks.contact.textContent =
            translations[lang].nav.contact;

    }


    // =========================================
    // MOBILE NAVIGATION
    // =========================================

    const mobileLinks = {

        story:
            document.querySelector(
                '.mobile-menu a[href="#story"]'
            ),

        journey:
            document.querySelector(
                '.mobile-menu a[href="#journey"]'
            ),

        menu:
            document.querySelector(
                '.mobile-menu a[href="#menu"]'
            ),

        gallery:
            document.querySelector(
                '.mobile-menu a[href="#gallery"]'
            ),

        contact:
            document.querySelector(
                '.mobile-menu a[href="#contact"]'
            )

    };


    if (
        mobileLinks.story &&
        translations[lang].nav?.story
    ) {

        mobileLinks.story.textContent =
            translations[lang].nav.story;

    }


    if (
        mobileLinks.journey &&
        translations[lang].nav?.journey
    ) {

        mobileLinks.journey.textContent =
            translations[lang].nav.journey;

    }


    if (
        mobileLinks.menu &&
        translations[lang].nav?.menu
    ) {

        mobileLinks.menu.textContent =
            translations[lang].nav.menu;

    }


    if (
        mobileLinks.gallery &&
        translations[lang].nav?.gallery
    ) {

        mobileLinks.gallery.textContent =
            translations[lang].nav.gallery;

    }


    if (
        mobileLinks.contact &&
        translations[lang].nav?.contact
    ) {

        mobileLinks.contact.textContent =
            translations[lang].nav.contact;

    }


    // =========================================
    // NAV CTA
    // =========================================

    const orderNowBtns =
        document.querySelectorAll(
            '.nav-cta'
        );


    orderNowBtns.forEach(btn => {

        if (
            translations[lang].nav?.orderNow
        ) {

            const svg =
                btn.querySelector('svg');

            btn.textContent =
                translations[lang].nav.orderNow + ' ';

            if (svg) {
                btn.appendChild(svg);
            }

        }

    });


    // =========================================
    // HERO
    // =========================================

    const heroTitleLines =
        document.querySelectorAll(
            '.hero-title .line span'
        );

    const heroSubtitle =
        document.querySelector(
            '.hero-sub'
        );

    const heroCoordinate =
        document.querySelector(
            '.hero-coordinate'
        );


    if (
        heroTitleLines.length >= 3 &&
        translations[lang].hero?.title
    ) {

        const titleData =
            translations[lang].hero.title;

        const line1 =
            typeof titleData === 'string'
                ? titleData.split(', ')[0]
                : titleData.line1;

        const line2 =
            typeof titleData === 'string'
                ? titleData.split(', ')[1] || 'Indonesia,'
                : titleData.line2;

        const line3 =
            typeof titleData === 'string'
                ? titleData.split(', ')[2] || 'Reimagined.'
                : titleData.line3;

        heroTitleLines[0].textContent = line1;
        heroTitleLines[1].textContent = line2;
        heroTitleLines[2].innerHTML = `<em>${line3}</em>`;

    }


    if (
        heroSubtitle &&
        translations[lang].hero?.subtitle
    ) {

        heroSubtitle.textContent =
            translations[lang]
                .hero
                .subtitle;

    }


    if (
        heroCoordinate &&
        translations[lang].hero?.coordinate
    ) {

        heroCoordinate.textContent =
            translations[lang]
                .hero
                .coordinate;

    }


    // =========================================
    // HERO BUTTONS
    // =========================================

    const exploreBtns =
        document.querySelectorAll(
            '.hero-ctas .btn-primary, .hero-ctas .btn-secondary'
        );


    if (
        exploreBtns[0] &&
        translations[lang].hero?.btnExplore
    ) {

        const svg =
            exploreBtns[0].querySelector('svg');

        exploreBtns[0].textContent =
            translations[lang]
                .hero
                .btnExplore + ' ';

        if (svg) {
            exploreBtns[0].appendChild(svg);
        }

    }


    if (
        exploreBtns[1] &&
        translations[lang].hero?.btnStory
    ) {

        exploreBtns[1].textContent =
            translations[lang]
                .hero
                .btnStory;

    }


    // =========================================
    // STORY
    // =========================================

    const storyEyebrow =
        document.querySelector(
            '.story-eyebrow'
        );

    const storyTitle =
        document.querySelector(
            '.story-title'
        );

    const storyBodies =
        document.querySelectorAll(
            '.story-body'
        );

    const storyLabels =
        document.querySelectorAll(
            '.story-meta-label'
        );


    if (
        storyEyebrow &&
        translations[lang].story?.eyebrow
    ) {

        storyEyebrow.textContent =
            translations[lang]
                .story
                .eyebrow;

    }


    if (
        storyTitle &&
        translations[lang].story?.title
    ) {

        storyTitle.innerHTML =
            translations[lang]
                .story
                .title;

    }


    if (
        storyBodies[0] &&
        translations[lang].story?.body1
    ) {

        storyBodies[0].textContent =
            translations[lang]
                .story
                .body1;

    }


    if (
        storyBodies[1] &&
        translations[lang].story?.body2
    ) {

        storyBodies[1].textContent =
            translations[lang]
                .story
                .body2;

    }


    if (
        storyLabels[0] &&
        translations[lang].story?.established
    ) {

        storyLabels[0].textContent =
            translations[lang]
                .story
                .established;

    }


    if (
        storyLabels[1] &&
        translations[lang].story?.regions
    ) {

        storyLabels[1].textContent =
            translations[lang]
                .story
                .regions;

    }


    if (
        storyLabels[2] &&
        translations[lang].story?.dishes
    ) {

        storyLabels[2].textContent =
            translations[lang]
                .story
                .dishes;

    }


    // =========================================
    // JOURNEY
    // =========================================

    const journeyEyebrow =
        document.querySelector(
            '.journey-eyebrow'
        );

    const journeyTitle =
        document.querySelector(
            '.journey-title'
        );


    if (
        journeyEyebrow &&
        translations[lang].journey?.eyebrow
    ) {

        journeyEyebrow.textContent =
            translations[lang]
                .journey
                .eyebrow;

    }


    if (
        journeyTitle &&
        translations[lang].journey?.title
    ) {

        journeyTitle.innerHTML =
            translations[lang]
                .journey
                .title;

    }


    // =========================================
    // JOURNEY INFO
    // =========================================

    const infoRegion =
        document.getElementById(
            'infoRegion'
        );

    const infoDish =
        document.getElementById(
            'infoDish'
        );

    const infoStory =
        document.getElementById(
            'infoStory'
        );


    if (
        infoRegion &&
        translations[lang].journey?.info
    ) {

        infoRegion.textContent =
            translations[lang]
                .journey
                .info;

    }


    if (
        infoDish &&
        translations[lang].journey?.dish
    ) {

        infoDish.textContent =
            translations[lang]
                .journey
                .dish;

    }


    if (
        infoStory &&
        translations[lang].journey?.story
    ) {

        infoStory.textContent =
            translations[lang]
                .journey
                .story;

    }


    // =========================================
    // SIGNATURE
    // =========================================

    const signatureEyebrow =
        document.querySelector(
            '.signature-eyebrow'
        );

    const signatureTitle =
        document.querySelector(
            '.signature-title'
        );


    if (
        signatureEyebrow &&
        translations[lang].signature?.eyebrow
    ) {

        signatureEyebrow.textContent =
            translations[lang]
                .signature
                .eyebrow;

    }


    if (
        signatureTitle &&
        translations[lang].signature?.title
    ) {

        signatureTitle.innerHTML =
            translations[lang]
                .signature
                .title;

    }


    // =========================================
    // SIGNATURE SLIDES
    // =========================================

    const signatureSlides =
        document.querySelectorAll(
            '.signature-slide'
        );


    signatureSlides.forEach(
        (slide, index) => {

            const dishKey =
                `dish${index + 1}`;

            const dishData =
                translations[lang]
                    .signature?.[dishKey];


            if (!dishData) {
                return;
            }


            const region =
                slide.querySelector(
                    '.signature-slide-region'
                );

            const name =
                slide.querySelector(
                    '.signature-slide-name'
                );

            const desc =
                slide.querySelector(
                    '.signature-slide-desc'
                );

            const priceLabel =
                slide.querySelector(
                    '.signature-slide-price-label'
                );

            const price =
                slide.querySelector(
                    '.signature-slide-price'
                );

            const discoverBtn =
                slide.querySelector(
                    '.btn-primary'
                );


            if (region) {
                region.textContent =
                    dishData.region;
            }


            if (name) {
                name.textContent =
                    dishData.name;
            }


            if (desc) {
                desc.textContent =
                    dishData.desc;
            }


            if (priceLabel) {
                priceLabel.textContent =
                    lang === 'id'
                        ? 'Harga'
                        : 'Price';
            }


            if (price) {
                price.textContent =
                    dishData.price;
            }


            if (
                discoverBtn &&
                translations[lang]
                    .signature
                    ?.btnDiscover
            ) {

                const svg =
                    discoverBtn.querySelector(
                        'svg'
                    );

                discoverBtn.textContent =
                    translations[lang]
                        .signature
                        .btnDiscover + ' ';

                if (svg) {
                    discoverBtn.appendChild(svg);
                }

            }

        }
    );


    // =========================================
    // CULINARY JOURNEY
    // =========================================

    const culinaryEyebrow =
        document.querySelector(
            '.culinary-journey-header .journey-eyebrow'
        );

    const culinaryTitle =
        document.querySelector(
            '.culinary-journey-header .journey-title'
        );

    const culinaryIntro =
        document.querySelector(
            '.journey-intro'
        );


    if (
        culinaryEyebrow &&
        translations[lang].culinary?.eyebrow
    ) {

        culinaryEyebrow.textContent =
            translations[lang]
                .culinary
                .eyebrow;

    }


    if (
        culinaryTitle &&
        translations[lang].culinary?.title
    ) {

        culinaryTitle.innerHTML =
            translations[lang]
                .culinary
                .title;

    }


    if (
        culinaryIntro &&
        translations[lang].culinary?.intro
    ) {

        culinaryIntro.textContent =
            translations[lang]
                .culinary
                .intro;

    }


    // =========================================
    // JOURNEY STEPS
    // =========================================

    const journeySteps =
        document.querySelectorAll(
            '.journey-step'
        );


    const culinary =
        translations[lang].culinary;


    if (culinary) {

        const steps = [

            {
                num: culinary.step1,
                title: culinary.gather,
                desc: culinary.gatherDesc
            },

            {
                num: culinary.step2,
                title: culinary.transform,
                desc: culinary.transformDesc
            },

            {
                num: culinary.step3,
                title: culinary.share,
                desc: culinary.shareDesc
            }

        ];


        journeySteps.forEach(
            (step, index) => {

                if (!steps[index]) {
                    return;
                }


                const numEl =
                    step.querySelector(
                        '.journey-content span'
                    );

                const titleEl =
                    step.querySelector(
                        '.journey-content h3'
                    );

                const descEl =
                    step.querySelector(
                        '.journey-content p'
                    );


                if (numEl) {
                    numEl.textContent =
                        steps[index].num;
                }


                if (titleEl) {
                    titleEl.textContent =
                        steps[index].title;
                }


                if (descEl) {
                    descEl.textContent =
                        steps[index].desc;
                }

            }
        );

    }


    // =========================================
    // COLLECTION
    // =========================================

    const collectionEyebrow =
        document.querySelector(
            '.collection-eyebrow'
        );

    const collectionTitle =
        document.querySelector(
            '.collection-title'
        );

    const filterButtons =
        document.querySelectorAll(
            '.filter-btn'
        );

    if (
        collectionEyebrow &&
        translations[lang].collection?.eyebrow
    ) {
        collectionEyebrow.textContent =
            translations[lang].collection.eyebrow;
    }

    if (
        collectionTitle &&
        translations[lang].collection?.title
    ) {
        collectionTitle.innerHTML =
            translations[lang].collection.title;
    }

    filterButtons.forEach((button) => {
        const filterKey = button.dataset.filter;
        const text = translations[lang].collection?.filters?.[filterKey];

        if (text) {
            button.textContent = text;
        }
    });

    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        const item = translations[lang].collection?.items?.[index];

        if (!item) return;

        const region = card.querySelector('.product-region');
        const desc = card.querySelector('.product-desc');
        const order = card.querySelector('.product-order');

        if (region) region.textContent = item.region;
        if (desc) desc.textContent = item.desc;
        if (order && translations[lang].collection?.order) {
            order.textContent = translations[lang].collection.order;
        }
    });


    // =========================================
    // TESTIMONIALS
    // =========================================

    const testimonialsEyebrow =
        document.querySelector(
            '.testimonials-eyebrow'
        );

    const testimonialsTitle =
        document.querySelector(
            '.testimonials-title'
        );

    const testimonialCards =
        document.querySelectorAll(
            '.testimonial-card'
        );

    if (
        testimonialsEyebrow &&
        translations[lang].testimonials?.eyebrow
    ) {
        testimonialsEyebrow.textContent =
            translations[lang].testimonials.eyebrow;
    }

    if (
        testimonialsTitle &&
        translations[lang].testimonials?.title
    ) {
        testimonialsTitle.innerHTML =
            translations[lang].testimonials.title;
    }

    testimonialCards.forEach((card, index) => {
        const item = translations[lang].testimonials?.cards?.[index];

        if (!item) return;

        const text = card.querySelector('.testimonial-text');
        const name = card.querySelector('.testimonial-name');
        const location = card.querySelector('.testimonial-location');

        if (text) text.textContent = item.text;
        if (name) name.textContent = item.name;
        if (location) location.textContent = item.location;
    });


    // =========================================
    // GALLERY
    // =========================================

    const galleryEyebrow =
        document.querySelector(
            '.gallery-eyebrow'
        );

    const galleryTitle =
        document.querySelector(
            '.gallery-title'
        );

    const galleryLabels =
        document.querySelectorAll(
            '.gallery-item-label'
        );

    if (
        galleryEyebrow &&
        translations[lang].gallery?.eyebrow
    ) {
        galleryEyebrow.textContent =
            translations[lang].gallery.eyebrow;
    }

    if (
        galleryTitle &&
        translations[lang].gallery?.title
    ) {
        galleryTitle.innerHTML =
            translations[lang].gallery.title;
    }

    galleryLabels.forEach((label, index) => {
        const item = translations[lang].gallery?.labels?.[index];
        if (item) label.textContent = item;
    });


    // =========================================
    // FINAL CTA
    // =========================================

    const ctaEyebrow =
        document.querySelector(
            '.final-cta-eyebrow'
        );

    const ctaTitle =
        document.querySelector(
            '.final-cta-title'
        );

    const ctaSub =
        document.querySelector(
            '.final-cta-sub'
        );

    if (ctaEyebrow && translations[lang].cta?.eyebrow) {
        ctaEyebrow.textContent = translations[lang].cta.eyebrow;
    }

    if (ctaTitle && translations[lang].cta?.title) {
        ctaTitle.innerHTML = translations[lang].cta.title;
    }

    if (ctaSub && translations[lang].cta?.sub) {
        ctaSub.textContent = translations[lang].cta.sub;
    }

    const ctaButtons = document.querySelectorAll('.final-cta-buttons a');
    ctaButtons.forEach((button, index) => {
        const key = index === 0 ? 'explore' : 'order';
        const text = translations[lang].cta?.[key];

        if (!text) return;

        const svg = button.querySelector('svg');
        button.textContent = text + (svg ? ' ' : '');

        if (svg) {
            button.appendChild(svg);
        }
    });


    // =========================================
    // FOOTER
    // =========================================

    const footerTitles = document.querySelectorAll('.footer-col-title');
    const footerLinks = document.querySelectorAll('.footer-link');

    if (footerTitles[0] && translations[lang].footer?.explore) {
        footerTitles[0].textContent = translations[lang].footer.explore;
    }

    if (footerTitles[1] && translations[lang].footer?.regions) {
        footerTitles[1].textContent = translations[lang].footer.regions;
    }

    if (footerTitles[2] && translations[lang].footer?.connect) {
        footerTitles[2].textContent = translations[lang].footer.connect;
    }

    const footerMap = [
        { href: '#story', text: 'ourStory' },
        { href: '#journey', text: 'theJourney' },
        { href: '#menu', text: 'menu' },
        { href: '#gallery', text: 'gallery' },
        { href: '#', text: 'sumatra' },
        { href: '#', text: 'java' },
        { href: '#', text: 'sulawesi' },
        { href: '#', text: 'eastern' },
        { href: 'https://wa.me/6281317100120', text: 'whatsapp' },
        { href: '#', text: 'instagram' },
        { href: '#', text: 'tiktok' },
        { href: '#', text: 'email' }
    ];

    footerLinks.forEach((link, index) => {
        const textKey = footerMap[index]?.text;
        const value = textKey ? translations[lang].footer?.[textKey] : null;

        if (value) {
            link.textContent = value;
        }
    });

    // Update region data with new language
    if (typeof updateRegion === 'function') {
        updateRegion(currentRegion);
    }

}
    // === NAVIGATION LOGIC ===
    const nav = document.getElementById('nav');
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const toggleMenu = (isOpen) => {
        menuToggle.classList.toggle('active', isOpen);
        mobileMenu.classList.toggle('open', isOpen);
        nav.classList.toggle('menu-open', isOpen);
    };

    menuToggle.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.contains('open');
        toggleMenu(!isOpen);
    });

    closeMenuBtn.addEventListener('click', () => toggleMenu(false));

    mobileLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const targetId = link.getAttribute('href');

            toggleMenu(false);

            setTimeout(() => {
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }, 300);
        });
    });

    window.addEventListener('scroll', () => {

        if (!mobileMenu.classList.contains('open')) {
            nav.classList.toggle(
                'scrolled',
                window.scrollY > 50
            );
        }

        const progress =
            window.scrollY /
            (document.documentElement.scrollHeight -
                window.innerHeight);

        const progressEl =
            document.getElementById('scrollProgress');

        if (progressEl) {
            progressEl.style.transform =
                `scaleX(${progress})`;
        }
    });


    // === CEK APAKAH GSAP TERLOAD ===
    if (
        typeof gsap !== 'undefined' &&
        typeof ScrollTrigger !== 'undefined'
    ) {

        gsap.registerPlugin(ScrollTrigger);

        const prefersReducedMotion =
            window.matchMedia(
                '(prefers-reduced-motion: reduce)'
            ).matches;


        if (!prefersReducedMotion) {

            // =========================================
            // HERO ANIMATION
            // =========================================

            const heroTl = gsap.timeline({
                defaults: {
                    ease: 'power3.out'
                }
            });

            heroTl
                .from('.hero-eyebrow', {
                    opacity: 0,
                    y: 20,
                    duration: 0.6
                })

                .from('.hero-title .line span', {
                    opacity: 0,
                    y: 100,
                    duration: 1,
                    stagger: 0.12
                }, '-=0.3')

                .from('.hero-sub', {
                    opacity: 0,
                    y: 20,
                    duration: 0.7
                }, '-=0.5')

                .from('.hero-ctas > *', {
                    opacity: 0,
                    y: 20,
                    duration: 0.6,
                    stagger: 0.1
                }, '-=0.4')

                .from('.hero-image-main', {
                    scale: 0.85,
                    opacity: 0,
                    duration: 1.2,
                    ease: 'power2.out'
                }, '-=1')

                .from('.hero-image-secondary', {
                    opacity: 0,
                    x: -30,
                    duration: 0.8
                }, '-=0.6')

                .from('.hero-tag', {
                    opacity: 0,
                    x: 30,
                    duration: 0.6
                }, '-=0.5')

                .from('.hero-coordinate', {
                    opacity: 0,
                    duration: 0.6
                }, '-=0.4')

                .from('.ingredient-float', {
                    opacity: 0,
                    scale: 0,
                    duration: 0.6,
                    stagger: 0.1
                }, '-=0.4')

                .from('.hero-scroll-cue', {
                    opacity: 0,
                    duration: 0.6
                }, '-=0.3');


            gsap.to('.hero-image-main', {
                scale: 1.1,
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1
                }
            });


            gsap.to('#heroBgText', {
                x: -100,
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 2
                }
            });


            gsap.utils
                .toArray('.ingredient-float')
                .forEach((el, i) => {

                    gsap.to(el, {
                        y: i % 2 === 0 ? -15 : 15,
                        duration: 2.5 + i * 0.5,
                        repeat: -1,
                        yoyo: true,
                        ease: 'sine.inOut'
                    });

                });


            // =========================================
            // STORY
            // =========================================

            gsap.fromTo(
                '#storyImage',
                {
                    clipPath: 'inset(0 100% 0 0)'
                },
                {
                    clipPath: 'inset(0 0% 0 0)',
                    duration: 1.5,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.story',
                        start: 'top 60%'
                    }
                }
            );


            gsap.fromTo(
                '.story-bg-num',
                {
                    x: 100
                },
                {
                    x: 0,
                    scrollTrigger: {
                        trigger: '.story',
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1
                    }
                }
            );


            // =========================================
            // FINAL CTA
            // =========================================

            gsap.to('.final-cta-bg', {
                y: 60,
                scrollTrigger: {
                    trigger: '.final-cta',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                }
            });


            gsap.from('.final-cta-content > *', {
                opacity: 0,
                y: 40,
                duration: 0.8,
                stagger: 0.15,
                scrollTrigger: {
                    trigger: '.final-cta',
                    start: 'top 70%'
                }
            });


            // =========================================
            // SIGNATURE
            // =========================================

            const sigSlides =
                document.querySelectorAll('.signature-slide');

            const sigDots =
                document.querySelectorAll('.signature-dot');

            const mm = gsap.matchMedia();


            // =========================================
            // SIGNATURE - DESKTOP
            // =========================================

            mm.add("(min-width: 1025px)", () => {

                gsap.timeline({

                    scrollTrigger: {

                        trigger: '.signature-pin',

                        start: 'top top',

                        end:
                            '+=' +
                            (sigSlides.length * 100) +
                            '%',

                        pin: true,

                        scrub: 1,

                        onUpdate: (self) => {

                            const activeIndex =
                                Math.min(
                                    Math.floor(
                                        self.progress *
                                        sigSlides.length
                                    ),
                                    sigSlides.length - 1
                                );


                            sigSlides.forEach(
                                (slide, i) => {

                                    slide.classList.toggle(
                                        'active',
                                        i === activeIndex
                                    );

                                }
                            );


                            sigDots.forEach(
                                (dot, i) => {

                                    dot.classList.toggle(
                                        'active',
                                        i === activeIndex
                                    );

                                }
                            );

                        }

                    }

                });

            });


            // =========================================
            // SIGNATURE - MOBILE
            // =========================================

            mm.add("(max-width: 1024px)", () => {

                const signatureObserver =
                    new IntersectionObserver(

                        (entries) => {

                            entries.forEach((entry) => {

                                if (
                                    entry.isIntersecting
                                ) {

                                    entry.target.classList.add(
                                        'is-visible'
                                    );


                                    const index =
                                        [...sigSlides]
                                            .indexOf(
                                                entry.target
                                            );


                                    sigDots.forEach(
                                        (dot, i) => {

                                            dot.classList.toggle(
                                                'active',
                                                i === index
                                            );

                                        }
                                    );

                                }

                            });

                        },

                        {
                            threshold: 0.2
                        }

                    );


                sigSlides.forEach((slide) => {

                    signatureObserver.observe(
                        slide
                    );

                });

            });


            // =========================================
            // PROCESS
            // =========================================

            const processTrack =
                document.getElementById(
                    'processTrack'
                );

            const trackWidth =
                3 * (480 + 64) -
                (window.innerWidth - 200);


            gsap.timeline({

                scrollTrigger: {

                    trigger: '#processPin',

                    start: 'top top',

                    end:
                        '+=' +
                        trackWidth,

                    pin: true,

                    scrub: 1,

                    onUpdate: (self) => {

                        const processFill =
                            document.getElementById(
                                'processFill'
                            );

                        if (processFill) {

                            processFill.style.width =
                                (self.progress * 100) +
                                '%';

                        }

                    }

                }

            }).to(
                processTrack,
                {
                    x: -trackWidth,
                    ease: 'none'
                }
            );


            // =========================================
            // REVEAL ON SCROLL
            // =========================================

            const revealEls =
                document.querySelectorAll('.reveal');


            const revealObserver =
                new IntersectionObserver(

                    (entries) => {

                        entries.forEach(entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    'visible'
                                );

                                revealObserver.unobserve(
                                    entry.target
                                );

                            }

                        });

                    },

                    {
                        threshold: 0.15
                    }

                );


            revealEls.forEach(el => {

                revealObserver.observe(el);

            });


            // =========================================
            // INTERACTIVE MAP
            // =========================================

            function updateRegion(region) {

                if (!translations[currentLanguage]?.regions?.[region]) {
                    console.error(`Region data not found for ${region}`);
                    return;
                }

                const data = translations[currentLanguage].regions[region];
                const info = document.getElementById('journeyInfo');

                if (typeof gsap !== 'undefined') {

                    gsap.to(info, {

                        opacity: 0,
                        y: 10,
                        duration: 0.3,

                        onComplete: () => {

                            updateMapInfo(data, region);

                            gsap.to(info, {

                                opacity: 1,
                                y: 0,
                                duration: 0.5

                            });

                        }

                    });

                } else {

                    info.style.opacity = '0';

                    setTimeout(() => {

                        updateMapInfo(data, region);

                        info.style.opacity = '1';

                        info.style.transition = 'opacity 0.5s';

                    }, 300);

                }

            }


            const journeySteps =
                document.querySelectorAll(
                    '.journey-step'
                );


            const journeyObserver =
                new IntersectionObserver(

                    (entries) => {

                        entries.forEach((entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    'is-visible'
                                );

                                journeyObserver.unobserve(
                                    entry.target
                                );

                            }

                        });

                    },

                    {
                        threshold: 0.2,
                        rootMargin:
                            '0px 0px -80px 0px'
                    }

                );


            journeySteps.forEach((step) => {

                journeyObserver.observe(
                    step
                );

            });


            function updateMapInfo(
                data,
                region
            ) {

                // Map region to image file
                const imageMap = {
                    sumatra: 'assets/rendang.jpeg',
                    java: 'assets/gudeg.jpg',
                    kalimantan: 'assets/bubur.jpg',
                    sulawesi: 'assets/coto.jpeg',
                    bali: 'assets/babi.jpg',
                    eastern: 'assets/ikan.jpg'
                };

                document.getElementById(
                    'infoRegion'
                ).textContent = data.region;


                document.getElementById(
                    'infoDish'
                ).textContent = data.dish;


                document.getElementById(
                    'infoImage'
                ).style.backgroundImage =
                    `url('${imageMap[region]}')`;


                document.getElementById(
                    'infoStory'
                ).textContent =
                    data.story;


                document.getElementById(
                    'infoFlavor'
                ).innerHTML =
                    data.flavors
                        .map(
                            f =>
                                `<span class="flavor-tag">${f}</span>`
                        )
                        .join('');


                document
                    .querySelectorAll('.map-region')
                    .forEach(el =>
                        el.classList.remove(
                            'active'
                        )
                    );


                document
                    .querySelectorAll(
                        `.map-region[data-region="${region}"]`
                    )
                    .forEach(el =>
                        el.classList.add(
                            'active'
                        )
                    );


                document
                    .querySelectorAll('.map-label')
                    .forEach(el =>
                        el.classList.remove(
                            'active'
                        )
                    );


                document
                    .querySelectorAll(
                        `.map-label[data-region="${region}"]`
                    )
                    .forEach(el =>
                        el.classList.add(
                            'active'
                        )
                    );


                document
                    .querySelectorAll('.region-btn')
                    .forEach(btn =>
                        btn.classList.toggle(
                            'active',
                            btn.dataset.region === region
                        )
                    );

            }


            document
                .querySelectorAll('.map-region')
                .forEach(el =>

                    el.addEventListener(
                        'click',
                        () => {
                            currentRegion = el.dataset.region;
                            updateRegion(
                                el.dataset.region
                            );
                        }
                    )

                );


            document
                .querySelectorAll('.region-btn')
                .forEach(btn =>

                    btn.addEventListener(
                        'click',
                        () => {
                            currentRegion = btn.dataset.region;
                            updateRegion(
                                btn.dataset.region
                            );
                        }
                    )

                );


            updateRegion('sumatra');


            // =========================================
            // FILTERS
            // =========================================

 // =========================================
// COLLECTION FILTERS
// =========================================

const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {

    btn.addEventListener('click', () => {

        const filter = btn.dataset.filter;

        filterBtns.forEach(b => {
            b.classList.remove('active');
        });

        btn.classList.add('active');

        productCards.forEach(card => {

            const matches =
                filter === 'all' ||
                card.dataset.category === filter;

            if (matches) {
                card.style.display = '';
                card.style.opacity = '1';
                card.style.pointerEvents = 'auto';
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
                card.style.pointerEvents = 'none';
            }

        });

    });

});


            // =========================================
            // TESTIMONIALS DRAG
            // =========================================

            const testimonialsTrack =
                document.getElementById(
                    'testimonialsTrack'
                );

            let isDown = false;
            let startX;
            let scrollLeft;


            if (testimonialsTrack) {

                testimonialsTrack.addEventListener(
                    'mousedown',
                    (e) => {

                        isDown = true;

                        startX =
                            e.pageX -
                            testimonialsTrack.offsetLeft;

                        scrollLeft =
                            testimonialsTrack.scrollLeft;

                    }
                );


                testimonialsTrack.addEventListener(
                    'mouseleave',
                    () => {
                        isDown = false;
                    }
                );


                testimonialsTrack.addEventListener(
                    'mouseup',
                    () => {
                        isDown = false;
                    }
                );


                testimonialsTrack.addEventListener(
                    'mousemove',
                    (e) => {

                        if (!isDown) return;

                        e.preventDefault();

                        const x =
                            e.pageX -
                            testimonialsTrack.offsetLeft;

                        testimonialsTrack.scrollLeft =
                            scrollLeft -
                            (x - startX) * 1.5;

                    }
                );

            }

        }

        // =========================================
        // REFRESH SCROLLTRIGGER
        // =========================================

        if (
            typeof ScrollTrigger !== 'undefined'
        ) {

            window.addEventListener(
                'load',
                () => {
                    ScrollTrigger.refresh();
                }
            );

        }

    }

});