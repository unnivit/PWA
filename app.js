if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./serviceworker.js', { scope: './' })
    .then(function(registration) {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch(function(error) {
      console.log('Service Worker registration failed:', error);
    });
  }

  // Accordion functionality
  document.addEventListener('DOMContentLoaded', () => {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            // Close all sections first
            accordionHeaders.forEach(h => {
                h.classList.remove('active');
                const content = h.nextElementSibling;
                content.style.maxHeight = null;
            });
            
            // Open the clicked section
            const content = header.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                header.classList.add('active'); // Toggle the active class
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
});
