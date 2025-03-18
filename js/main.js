document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Toggle hamburger menu animation
            const spans = this.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
        });
    }
    
    // Testimonial slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.testimonial-controls .prev');
    const nextBtn = document.querySelector('.testimonial-controls .next');
    
    if (testimonials.length > 0 && prevBtn && nextBtn) {
        let currentTestimonial = 0;
        
        // Hide all testimonials except the first one
        testimonials.forEach((testimonial, index) => {
            if (index !== 0) {
                testimonial.style.display = 'none';
            }
        });
        
        // Show next testimonial
        nextBtn.addEventListener('click', function() {
            testimonials[currentTestimonial].style.display = 'none';
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            testimonials[currentTestimonial].style.display = 'block';
        });
        
        // Show previous testimonial
        prevBtn.addEventListener('click', function() {
            testimonials[currentTestimonial].style.display = 'none';
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            testimonials[currentTestimonial].style.display = 'block';
        });
        
        // Auto-rotate testimonials every 5 seconds
        setInterval(function() {
            testimonials[currentTestimonial].style.display = 'none';
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            testimonials[currentTestimonial].style.display = 'block';
        }, 5000);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Membership form - show family members section when family membership is selected
    const membershipTypeSelect = document.getElementById('membershipType');
    const familyMembersSection = document.getElementById('familyMembersSection');
    
    if (membershipTypeSelect && familyMembersSection) {
        membershipTypeSelect.addEventListener('change', function() {
            if (this.value === 'family') {
                familyMembersSection.style.display = 'block';
            } else {
                familyMembersSection.style.display = 'none';
            }
        });
    }
    
    // Add family member button
    const addFamilyMemberBtn = document.getElementById('addFamilyMember');
    const familyMemberInputs = document.querySelector('.family-member-inputs');
    
    if (addFamilyMemberBtn && familyMemberInputs) {
        let familyMemberCount = 2;
        
        addFamilyMemberBtn.addEventListener('click', function() {
            if (familyMemberCount < 5) {
                familyMemberCount++;
                
                const newFamilyMember = document.createElement('div');
                newFamilyMember.className = 'family-member';
                newFamilyMember.innerHTML = `<input type="text" name="familyMember${familyMemberCount}" placeholder="Family Member ${familyMemberCount} (Name & Age)">`;
                
                familyMemberInputs.insertBefore(newFamilyMember, addFamilyMemberBtn);
                
                if (familyMemberCount === 5) {
                    addFamilyMemberBtn.style.display = 'none';
                }
            }
        });
    }
    
    // Tab functionality for games page
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length > 0 && tabContents.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to current button and content
                this.classList.add('active');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
    
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
});
