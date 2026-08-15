document.addEventListener("DOMContentLoaded", () => {

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

            const regionData = {

                sumatra: {
                    region: 'West Sumatra',
                    dish: 'Rendang',
                    image: 'assets/rendang.jpeg',
                    story: '"Slow-cooked, rich, and deeply rooted in Minangkabau culinary tradition."',
                    flavors: [
                        'Rich',
                        'Spiced',
                        'Savory'
                    ]
                },

                java: {
                    region: 'Yogyakarta, Java',
                    dish: 'Gudeg',
                    image: 'assets/gudeg.jpg',
                    story: '"Sweet, savory jackfruit stewed for hours — a Javanese royal tradition."',
                    flavors: [
                        'Sweet',
                        'Savory',
                        'Tender'
                    ]
                },

                kalimantan: {
                    region: 'Pontianak, Kalimantan',
                    dish: 'Bubur Pedas',
                    image: 'assets/bubur.jpg',
                    story: '"Aromatic spiced porridge reflecting the crossroads of Borneo\'s trading heritage."',
                    flavors: [
                        'Aromatic',
                        'Spiced',
                        'Hearty'
                    ]
                },

                sulawesi: {
                    region: 'South Sulawesi',
                    dish: 'Coto Makassar',
                    image: 'assets/coto.jpeg',
                    story: '"Rich beef soup with ground peanuts and fragrant galangal from Bugis tradition."',
                    flavors: [
                        'Rich',
                        'Nutty',
                        'Aromatic'
                    ]
                },

                bali: {
                    region: 'Bali',
                    dish: 'Babi Guling',
                    image: 'assets/babi.jpg',
                    story: '"Ceremonial spit-roast seasoned with turmeric, lemongrass, and Balinese spice paste."',
                    flavors: [
                        'Bold',
                        'Herbal',
                        'Smoky'
                    ]
                },

                eastern: {
                    region: 'Maluku, Eastern Indonesia',
                    dish: 'Ikan Bumbu Bali',
                    image: 'assets/ikan.jpg',
                    story: '"The spice islands\' gift to the world — fish bathed in chili, tomato, and lime."',
                    flavors: [
                        'Spicy',
                        'Tangy',
                        'Fresh'
                    ]
                }

            };


            function updateRegion(region) {

                const data =
                    regionData[region];

                if (!data) return;


                const info =
                    document.getElementById(
                        'journeyInfo'
                    );


                if (typeof gsap !== 'undefined') {

                    gsap.to(info, {

                        opacity: 0,
                        y: 10,
                        duration: 0.3,

                        onComplete: () => {

                            updateMapInfo(
                                data,
                                region
                            );

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

                        updateMapInfo(
                            data,
                            region
                        );

                        info.style.opacity = '1';

                        info.style.transition =
                            'opacity 0.5s';

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

                document.getElementById(
                    'infoRegion'
                ).textContent = data.region;


                document.getElementById(
                    'infoDish'
                ).textContent = data.dish;


                document.getElementById(
                    'infoImage'
                ).style.backgroundImage =
                    `url('${data.image}')`;


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
                        () =>
                            updateRegion(
                                el.dataset.region
                            )
                    )

                );


            document
                .querySelectorAll('.region-btn')
                .forEach(btn =>

                    btn.addEventListener(
                        'click',
                        () =>
                            updateRegion(
                                btn.dataset.region
                            )
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