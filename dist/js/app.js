document.body.classList.add('preload');

window.addEventListener('DOMContentLoaded', function() {
    function isWebp() {
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
        const TRANSITION_DELAY = 400; 
    
        let isInit = false;
    
        const checkScreenWidth = () => {
            const MOBILE_MENU_BREAKPOINT = 768;

            if (window.innerWidth > MOBILE_MENU_BREAKPOINT && $header.classList.contains('active')) {
                closeMenu();
            }
            // Активируем меню только на экранах <= 768
            if (window.innerWidth <= MOBILE_MENU_BREAKPOINT && !isInit) {
                isInit = true;
                $headerBtn.addEventListener('click', openMenu)
                $headerCloseBtn.addEventListener('click', closeMenu)
                $headerOverlay.addEventListener('click', closeMenu);
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
            $headerMenu.style.display = 'block';
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
        }
    }

    function initModals() {
        const $modals = document.querySelectorAll('.modal');
        const $modalsTriggers = document.querySelectorAll('[data-micromodal-trigger]');
    
        $modalsTriggers.forEach(item => {
            item.addEventListener('click', (e) => e.preventDefault());
        })
    
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
    
        if (document.querySelector('[data-tab-container]')) {
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
            });
            
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

    isWebp();
    disableTransitionBeforeLoad();
    initMenu();
    initModals();
    initAccordions();
    initMasks();
    initTabs();
    initIntegrationsSlider();
    initReviewsSlider();
    initSeoBox();
})