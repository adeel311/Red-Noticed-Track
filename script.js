document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Mobile Menu Toggle ---
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');

    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Toggle icon between bars and X
        const icon = mobileToggle.querySelector('i');
        if(navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // --- 2. Services Tabs Logic (Hover Impact) ---
    const serviceTabs = document.querySelectorAll('.service-tab');

    serviceTabs.forEach(tab => {
        tab.addEventListener('mouseenter', () => {
            // Remove active class from all
            serviceTabs.forEach(t => t.classList.remove('active'));
            // Remove arrow from all
            serviceTabs.forEach(t => {
                const arrow = t.querySelector('.tab-arrow');
                if(arrow) arrow.remove();
            });

            // Add active to hovered
            tab.classList.add('active');
            
            // Add arrow to hovered
            const arrowHtml = `<a href="#" class="tab-arrow"><i class="fa-solid fa-arrow-right"></i></a>`;
            tab.insertAdjacentHTML('beforeend', arrowHtml);
        });
    });

    // --- 3. Initialize Lenis (Smooth Scroll) ---
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // --- 4. GSAP Animations ---
    gsap.registerPlugin(ScrollTrigger);

    // Initial Hero Sequence
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    heroTl.to('.gs-reveal-left', { x: 0, opacity: 1, duration: 1, delay: 0.2 })
          .to('.gs-draw-frame', { opacity: 1, duration: 0.5 }, "-=0.5")
          .to('.gs-reveal-fade', { opacity: 1, duration: 1 }, "-=0.5")
          .to('.gs-reveal-up', { y: 0, opacity: 1, duration: 1 }, "-=0.7")
          .to('.gs-reveal-pop', { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' }, "-=0.5")
          .to('.gs-reveal-right', { x: 0, opacity: 1, duration: 1 }, "-=1");

    // Scroll Animations: Fade Up Elements
    gsap.utils.toArray('.gs-fade-up').forEach(el => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%'
            },
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Scroll Animations: Stagger Tabs
    gsap.to('.gs-stagger-tab', {
        scrollTrigger: {
            trigger: '.services-right',
            start: 'top 80%'
        },
        x: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power2.out'
    });

    // Scroll Animations: Stagger Cards
    gsap.to('.gs-stagger-card', {
        scrollTrigger: {
            trigger: '.notices-grid',
            start: 'top 80%'
        },
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out'
    });

});
