document.addEventListener('DOMContentLoaded', function() {
    // Gallery filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to current button
                this.classList.add('active');
                // Show/hide gallery items based on filter
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.classList.contains(filter)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    // Gallery modal functionality
    const galleryModal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDate = document.getElementById('modalDate');
    const modalClose = document.querySelector('.modal-close');
    const modalPrev = document.querySelector('.modal-prev');
    const modalNext = document.querySelector('.modal-next');
    if (galleryModal && modalImage && modalTitle && modalDate && modalClose && modalPrev && modalNext) {
        let currentImageIndex = 0;
        const visibleGalleryItems = () => Array.from(galleryItems).filter(item => item.style.display !== 'none');
        // Open modal when clicking on gallery item
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').getAttribute('src');
                const title = this.getAttribute('data-event');
                const date = this.querySelector('.gallery-caption p').textContent;
                modalImage.setAttribute('src', imgSrc);
                modalTitle.textContent = title;
                modalDate.textContent = date;
                galleryModal.style.display = 'block';
                // Set current image index
                currentImageIndex = visibleGalleryItems().indexOf(this);
            });
        });
        // Close modal
        modalClose.addEventListener('click', function() {
            galleryModal.style.display = 'none';
        });
        // Close modal when clicking outside the content
        galleryModal.addEventListener('click', function(e) {
            if (e.target === galleryModal) {
                galleryModal.style.display = 'none';
            }
        });
        // Previous image
        modalPrev.addEventListener('click', function() {
            const visibleItems = visibleGalleryItems();
            currentImageIndex = (currentImageIndex - 1 + visibleItems.length) % visibleItems.length;
            const item = visibleItems[currentImageIndex];
            const imgSrc = item.querySelector('img').getAttribute('src');
            const title = item.getAttribute('data-event');
            const date = item.querySelector('.gallery-caption p').textContent;
            modalImage.setAttribute('src', imgSrc);
            modalTitle.textContent = title;
            modalDate.textContent = date;
        });
        // Next image
        modalNext.addEventListener('click', function() {
            const visibleItems = visibleGalleryItems();
            currentImageIndex = (currentImageIndex + 1) % visibleItems.length;
            const item = visibleItems[currentImageIndex];
            const imgSrc = item.querySelector('img').getAttribute('src');
            const title = item.getAttribute('data-event');
            const date = item.querySelector('.gallery-caption p').textContent;
            modalImage.setAttribute('src', imgSrc);
            modalTitle.textContent = title;
            modalDate.textContent = date;
        });
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (galleryModal.style.display === 'block') {
                if (e.key === 'Escape') {
                    galleryModal.style.display = 'none';
                } else if (e.key === 'ArrowLeft') {
                    modalPrev.click();
                } else if (e.key === 'ArrowRight') {
                    modalNext.click();
                }
            }
        });
    }
    // Event proposal form validation
    const eventProposalForm = document.getElementById('eventProposalForm');
    if (eventProposalForm) {
        eventProposalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Basic validation
            let isValid = true;
            // Required fields
            const requiredFields = this.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            // Email validation
            const emailField = this.querySelector('input[type="email"]');
            if (emailField && emailField.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailField.value.trim())) {
                    isValid = false;
                    emailField.classList.add('error');
                } else {
                    emailField.classList.remove('error');
                }
            }
            // If valid, show success message
            if (isValid) {
                alert('Thank you for your event proposal! We will review it and get back to you soon.');
                this.reset();
            } else {
                alert('Please fill in all required fields correctly.');
            }
        });
    }
 });