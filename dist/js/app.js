document.body.classList.add('preload');

window.addEventListener('DOMContentLoaded', function() {
    function initWebp() {
        function testWebP(callback) {
            var webP = new Image();
            webP.onload = webP.onerror = function () {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
    
        testWebP(function (support) {
            if (support == true) {
                document.querySelector('body').classList.add('webp');
            } else{
                document.querySelector('body').classList.add('no-webp');
            }
        });
    }

    function initMenu() {
        const $html = document.querySelector('html');
        const $header = document.querySelector('.header');
        const $headerMenu = document.querySelector('.header__menu');
        const $headerBtn = document.querySelector('.header__burger');
        const $headerCloseBtn = document.querySelector('.header__close');
        const $headerOverlay = document.querySelector('.header__overlay');
        const $listLinks = document.querySelectorAll('.navigation__list-title');
        const TRANSITION_DELAY = 400; 
    
        let isInit = false;
    
        const checkScreenWidth = () => {
            const MOBILE_MENU_BREAKPOINT = 1024;

            if (window.innerWidth > MOBILE_MENU_BREAKPOINT && $header.classList.contains('active')) {
                closeMenu();
            }
            // Активируем меню только на экранах <= 1024
            if (window.innerWidth <= MOBILE_MENU_BREAKPOINT && !isInit) {
                isInit = true;
                $headerBtn.addEventListener('click', openMenu)
                $headerCloseBtn.addEventListener('click', closeMenu)
                $headerOverlay.addEventListener('click', closeMenu);
                // Открытие вложенных списков
                $listLinks.forEach(item => {
                    item.addEventListener('click', function(e) {
                        e.preventDefault();

                        item.parentNode.classList.toggle('active');
                    })
                })
            } else {
                window.addEventListener('resize', checkScreenWidth);
            }
        }
    
        checkScreenWidth();

        if (window.pageYOffset > 100) {
            $header.classList.add('fixed');
        }
        
        window.addEventListener('scroll', function(e) {
            if (window.pageYOffset > 100) {
                $header.classList.add('fixed');
            } else {
                $header.classList.remove('fixed');
            }
        })
    
        function openMenu() {
            $headerOverlay.style.display = 'block';
            $headerMenu.style.display = 'flex';
            $html.classList.add('overflow-hidden');
    
            setTimeout(function() {
                $headerOverlay.classList.add('active');
                $header.classList.add('active');
            }, 50)
        }
    
        function closeMenu() {
            $headerOverlay.classList.remove('active');
            $header.classList.remove('active');
            $html.classList.remove('overflow-hidden');
            
            setTimeout(function() {
                $headerOverlay.style.display = '';
                $headerMenu.style.display = '';
            }, TRANSITION_DELAY)

            // Закрываем все вложенные списки
            $listLinks.forEach(item => {
                item.parentNode.classList.remove('active');
            })
        }
    }

    function initModals() {
        const $modals = document.querySelectorAll('.modal');
        const $modalsTriggers = document.querySelectorAll('[data-micromodal-trigger]');
        const $reviewsBtns = document.querySelectorAll('.reviews__btn');

        if ($modalsTriggers.length > 0) {
            $modalsTriggers.forEach(item => {
                item.addEventListener('click', (e) => e.preventDefault());
            })
        } 
    
        if ($modals.length > 0) {
            MicroModal.init({
                onShow: (modal) => {
                    // Custom events
                },
                onClose: (modal) => {
                    // Custom events
                },
                disableFocus: true,
                openClass: 'is-open', 
                awaitOpenAnimation: true, 
                awaitCloseAnimation: true, 
                disableScroll: true
            });
        }

        // Reviews modals dynamic popup
        if ($reviewsBtns.length > 0) {
            $reviewsBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const $reviewContent = btn.closest('.reviews__item');
                    const $modalReview = document.querySelector('.modal-review .reviews__item');

                    $modalReview.innerHTML = $reviewContent.innerHTML;
                })
            })
        }
    }

    function initAccordions() {
        const $triggers = document.querySelectorAll('[data-accordion-trigger]');
    
        if ($triggers.length > 0) {
            $triggers.forEach(item => {
                item.addEventListener('click', function() {
                    item.closest('[data-accordion]').classList.toggle('active');
                })
            })
        }
    }

    function disableTransitionBeforeLoad() {
        document.body.classList.remove('preload');
    }

    function initTabs() {
        const $tabs = document.querySelectorAll('[data-tab-button]');
        const $container = document.querySelector('[data-tab-container]');
        const $howTabsButtons = document.querySelectorAll('.how-tabs__btn');
        const $integrationsTabs = document.querySelector('.integrations-tabs');
        const $questionsTabs = document.querySelector('.questions__tabs-buttons');

        // На моб. табы превращаются в аккордеон
        if ($howTabsButtons.length > 0 && window.innerWidth <= 768) initHowAccordion();
        else if ($integrationsTabs) initIntegrationsTabs();
        else if ($questionsTabs) initQuestionsTabs();
        else if ($container) initDefaultTabs();

        function initHowAccordion() {
            $howTabsButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    btn.classList.toggle('active');
                    btn.nextElementSibling.classList.toggle('active');
                })
            })
        }
        function initIntegrationsTabs() {
            const $integrationButtons = document.querySelectorAll('.integrations-tabs__buttons .tabs-buttons__item');

            $integrationButtons.forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
    
                    const activeTab = document.querySelector('[data-tab-button].active');
                    const items = document.querySelectorAll('[data-tab-content]');
                    const id = btn.getAttribute('data-tab');
                    activeTab.classList.remove('active');
                    if (id === 'all') {
                        items.forEach(item => {
                            item.classList.add('active');
                        })
                    } else {
                        items.forEach(item => {
                            item.classList.remove('active');
                        })
                    }
                    
                    items.forEach(item => {
                        if (item.dataset.tab === id) item.classList.add('active');
                    })
                    btn.classList.add('active');
                })
            })
        }
        function initQuestionsTabs() {
            const $questionsButtons = document.querySelectorAll('.questions__tabs-buttons .tabs-buttons__item');
            const $questionsBtn = document.querySelector('.questions__btn');
            const $wrapper = document.querySelector('.questions__list--max');

            let $items = document.querySelectorAll('.questions__item');
            
            if ($wrapper.classList.contains('active')) {
                $items.forEach(item => item.classList.add('active'));
            }

            let $activeItems = document.querySelectorAll('.questions__item.active');
            
            if ($activeItems.length > 6) {
                $questionsBtn.style.display = 'block';
                $activeItems.forEach((item, i) => {
                    if (i > 5) {
                        item.style.display = 'none';
                    } else {
                        item.style.display = '';
                    }
                })
            }

            $questionsButtons.forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
    
                    const activeTab = document.querySelector('[data-tab-button].active');
                    const items = document.querySelectorAll('[data-tab-content]');
                    const id = btn.getAttribute('data-tab');
                    activeTab.classList.remove('active');

                    if (id === 'all') {
                        items.forEach(item => {
                            item.classList.add('active');
                        })
                    } else {
                        items.forEach(item => {
                            item.classList.remove('active');
                        })
                    }
                    
                    items.forEach(item => {
                        item.style.border = '';
                        if (item.dataset.tab === id) item.classList.add('active');
                    })
                    btn.classList.add('active');

                    const $firstActiveItem = document.querySelector('.questions__item.active');
                    $firstActiveItem.style.border = 'none';

                    $activeItems = document.querySelectorAll('.questions__item.active');

                    if ($activeItems.length > 6) {
                        $questionsBtn.style.display = 'block';
                        showLess();
                        $activeItems.forEach((item, i) => {
                            if (i > 5) {
                                $activeItems[i].style.display = 'none';
                            } else {
                                $activeItems[i].style.display = '';
                            }
                        })
                    } else {
                        $questionsBtn.style.display = '';
                        $activeItems.forEach(item => item.style.display = '')
                    }
                })
            })

            initMoreQuestions();

            const textMore = $questionsBtn.dataset.textMore;
            const textLess = $questionsBtn.dataset.textLess;

            function initMoreQuestions() {
                if ($questionsBtn) {

                    $questionsBtn.addEventListener('click', function(e) {
                        if ($wrapper.classList.contains('all')) {
                            showLess();
                        } else {
                            showMore();
                        }
                    })
                }
            }
            
            function showMore() {
                $wrapper.classList.add('all');
                $questionsBtn.textContent = textLess;
                $activeItems.forEach(item => {
                    item.style.display = '';
                })
            }
            function showLess() {
                $wrapper.classList.remove('all');
                $questionsBtn.textContent = textMore;
                if ($activeItems.length > 6) {
                    $activeItems.forEach((item, i) => {
                        if (i > 5) {
                            item.style.display = 'none';
                        } else {
                            item.style.display = '';
                        }
                    })
                } else if ($wrapper.classList.contains('active')) {
                    $items.forEach((item, i) => {
                        if (i > 5) {
                            item.style.display = 'none';
                        } else {
                            item.style.display = '';
                        }
                    })
                }
            }
        }
        function initDefaultTabs() {
            $tabs.forEach(tab => {
                tab.addEventListener('click', function(e) {
                    e.preventDefault();
    
                    const activeTab = document.querySelector('[data-tab-button].active');
                    const activeContent = document.querySelector('[data-tab-content].active');
                    const id = tab.getAttribute('data-tab');
            
                    if (activeTab) {
                        activeTab.classList.remove('active');
                        activeContent.classList.remove('active');
                    }

                    const content = document.querySelector('[data-tab-content][data-tab="'+id+'"]');

                    // More features
                    const allItems = document.querySelector('[data-tab-content].all');

                    if (allItems && id !== 'all') {
                        allItems.classList.remove('all');
                        
                        const $btn = document.querySelector('.features__more-btn');
                        $btn.textContent = $btn.dataset.textMore;
                    }
                    // /More features
                    
                    tab.classList.add('active');
                    content.classList.add('active');
                })
            })
        }
    }

    function initMasks() {
        const $phones = document.querySelectorAll('.phone-mask');

        if ($phones.length > 0) {
            $phones.forEach(item => {
                IMask(item, {
                    mask: '+380000000000' 
                });
            })
        }
        
    }

    function initIntegrationsSlider() {
        if (document.querySelector('.integrations__slider')) {
            const swiper = new Swiper('.integrations__slider', {
                loop: true,
                spaceBetween: 20,
                slidesPerView: 4,
                pagination: {
                    el: '.integrations__pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.integrations__slider-next',
                    prevEl: '.integrations__slider-prev',
                },
                breakpoints: {
                    320: {
                        slidesPerView: 1.8,
                        spaceBetween: 10,
                    },
                    450: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    600: {
                        slidesPerView: 3,
                    },
                    768: {
                        slidesPerView: 4,
                    },
                },
            });
            
        }
    }

    function initReviewsSlider() {
        if (document.querySelector('.reviews__slider')) {
            const swiper = new Swiper('.reviews__slider', {
                loop: true,
                pagination: {
                    el: '.reviews__pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.reviews__slider-next',
                    prevEl: '.reviews__slider-prev',
                },
                breakpoints: {
                    320: {
                        slidesPerView: 1.1,
                        spaceBetween: 12,
                    },
                    500: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    },
                },
            });
            
        }
    }
    
    function initStepsSlider() {
        if (document.querySelector('.steps__slider')) {
            const current = document.querySelector(".steps__num--big");
            const count = document.querySelector(".steps__num--small");
            const slides = document.querySelectorAll(".steps__slider .swiper-slide");
            const slideCount = slides.length;

            let prefixCount;
            let prefixCurrent;

            const swiper = new Swiper('.steps__slider', {
                pagination: {
                    el: '.steps__pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.steps__btn--next',
                    prevEl: '.steps__btn--prev',
                },
                breakpoints: {
                    320: {
                        autoHeight: true
                    },
                    768: {
                        autoHeight: false
                    },
                },
                on: {
                    slideChange: setFraction
                }
            });

            function setFraction() {
                prefixCurrent = swiper.realIndex + 1 < 10 ? '0' : ''; 
                prefixCount = slideCount < 10 ? '0' : ''; 
                current.textContent = `${prefixCurrent}${swiper.realIndex + 1}`;
                count.textContent = `/${prefixCount}${slideCount}`;
            }
            setFraction();
        }
    }

    function initSeoBox() {
        const $btn = document.querySelector('.seo-box__btn');
        const $hiddenItems = document.querySelector('.seo-box__hidden');

        if ($btn && $hiddenItems) {
            const textMore = $btn.dataset.textMore;
            const textLess = $btn.dataset.textLess;

            $btn.addEventListener('click', function(e) {

                if ($hiddenItems.classList.contains('active')) {
                    $hiddenItems.classList.remove('active');
                    $btn.querySelector('span').textContent = textMore;
                } else {
                    $hiddenItems.classList.add('active');
                    $btn.querySelector('span').textContent = textLess;
                }
            })
        }
    }

    function initMoreFeatures() {
        const $btn = document.querySelector('.features__more-btn');
        const $wrapper = document.querySelector('.features__content');

        if ($btn) {
            const textMore = $btn.dataset.textMore;
            const textLess = $btn.dataset.textLess;

            $btn.addEventListener('click', function(e) {
                if ($wrapper.classList.contains('all')) {
                    $wrapper.classList.remove('all');
                    $btn.textContent = textMore;
                } else {
                    $wrapper.classList.add('all');
                    $btn.textContent = textLess;
                }
            })
        }
    }

    function initDynamicAdapt() {
        const da = new DynamicAdapt("max");  
        da.init();
    }

    function initHints() {
        const $hintButtons = document.querySelectorAll('.plan__key svg');

        if ($hintButtons.length > 0) {
            $hintButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    const activeHint = document.querySelector('.plan__key.active');
                    if (activeHint) activeHint.classList.remove('active');

                    btn.closest('.plan__key').classList.add('active');
                })
            })
            document.body.addEventListener('click', function(e) {
                if (!e.target.closest('.plan__key-inner') || e.target.closest('.plan__hint>img')) {
                    const activeHint = document.querySelector('.plan__key.active');
                    if (activeHint) activeHint.classList.remove('active');
                }
            })
        }
    }

    function initPricingCalculator() {
            const $slider = document.querySelector('.pricing-calc__slider-field')
            const min = 0;
            const max = 100000;
    
            if ($slider) {
                const slider = noUiSlider.create($slider, {
                    start: [max / 2],
                    step: 1,
                    connect: [true, false],
                    range: {
                        'min': min,
                        'max': max
                    }
                });
        
                slider.on('update', function (values, handle) {
                    // console.log(values[0]);
                });
            }
        
    }

    function initArticlePage() {
        function initCopyButtons() {
            const $items = document.querySelectorAll('.article__socials-copy a');
    
            if ($items.length > 0) {
                $items.forEach(item => {
                    item.addEventListener('click', function(e) {
                        e.preventDefault();
                        navigator.clipboard.writeText(item.href);
                    })
                })
            }
        }

        function initSocialsMenu() {
            const $socialsBtn = document.querySelector('.article__socials-btn');

            if ($socialsBtn) {
                $socialsBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    if ($socialsBtn.classList.contains('active')) {
                        $socialsBtn.closest('.article__socials-menu').classList.remove('active');
                    }
                    else {
                        $socialsBtn.closest('.article__socials-menu').classList.add('active');
                    }
                })
                document.body.addEventListener('click', function(e) {
                    if (!e.target.closest('.article__socials-btn') || e.target.closest('.article__socials-btn.active')) {
                        $socialsBtn.closest('.article__socials-menu').classList.remove('active');
                    }
                })
            }
        }

        initCopyButtons();
        initSocialsMenu();
    }

    function initMoreReviews() {
        const $btn = document.querySelector('.reviews__more-btn');
        const $wrapper = document.querySelector('.reviews-page__items');

        if ($btn) {
            const textMore = $btn.dataset.textMore;
            const textLess = $btn.dataset.textLess;

            $btn.addEventListener('click', function(e) {
                if ($wrapper.classList.contains('all')) {
                    $wrapper.classList.remove('all');
                    $btn.textContent = textMore;
                } else {
                    $wrapper.classList.add('all');
                    $btn.textContent = textLess;
                }
            })
        }
    }

    function initStarsRating() {
        const $starsItems = document.querySelectorAll('.star-rating');

        if ($starsItems.length > 0) {
            $starsItems.forEach(item => {
                var starRatingControl = new StarRating(item, {
                    maxStars: 5,
                    tooltip: null
                });
            })
        }
    }

    initWebp();
    disableTransitionBeforeLoad();
    initDynamicAdapt();
    initMenu();
    initModals();
    initAccordions();
    initMasks();
    initTabs();
    initIntegrationsSlider();
    initReviewsSlider();
    initSeoBox();
    initMoreFeatures();
    initStepsSlider();
    initPricingCalculator();
    initArticlePage();
    initMoreReviews();
    initStarsRating();
    initHints();
})