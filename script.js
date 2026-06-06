document.addEventListener('DOMContentLoaded', () => {
    // Services Tabs Logic
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
});
