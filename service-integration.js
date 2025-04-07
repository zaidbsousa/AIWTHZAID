// AI With Zed - Service Integration Script
document.addEventListener('DOMContentLoaded', function() {
    // Service details toggle functionality
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        const learnMoreBtn = card.querySelector('.btn');
        if (learnMoreBtn) {
            learnMoreBtn.addEventListener('click', function(e) {
                // Smooth scroll is already handled by the main.js script
                // This is just for additional functionality if needed
                
                // Add active class to highlight the current service in navigation
                const targetId = this.getAttribute('href').substring(1);
                const serviceLinks = document.querySelectorAll('.footer-links a[href^="#"]');
                
                serviceLinks.forEach(link => {
                    if (link.getAttribute('href').substring(1) === targetId) {
                        link.classList.add('active-service');
                    } else {
                        link.classList.remove('active-service');
                    }
                });
            });
        }
    });
    
    // Dynamic service content loading (for future use with real backend)
    function loadServiceDetails(serviceId) {
        // This function would typically fetch service details from a backend API
        // For now, we're using static content in the HTML
        console.log(`Service details requested for: ${serviceId}`);
        
        // Example of how this would work with a real backend:
        /*
        fetch(`api/services/${serviceId}`)
            .then(response => response.json())
            .then(data => {
                const serviceSection = document.getElementById(serviceId);
                if (serviceSection) {
                    const contentContainer = serviceSection.querySelector('.service-detail-content');
                    if (contentContainer) {
                        // Update content dynamically
                        contentContainer.innerHTML = `
                            <h2 class="section-title">${data.title}</h2>
                            <p>${data.description}</p>
                            <h3>Key Benefits:</h3>
                            <ul class="service-detail-list">
                                ${data.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                            </ul>
                            <a href="#contact" class="btn btn-accent">Get Started</a>
                        `;
                    }
                }
            })
            .catch(error => console.error('Error loading service details:', error));
        */
    }
    
    // Initialize service information
    const services = [
        {
            id: 'instagram-service',
            name: 'Instagram DM Automation',
            icon: 'instagram',
            shortDescription: 'Automate your Instagram Direct Messages with our AI-powered solution.',
            benefits: [
                '24/7 instant responses to customer inquiries',
                'Personalized interactions based on your brand voice',
                'Automatic handling of common questions and requests',
                'Seamless escalation to human agents when needed',
                'Detailed analytics on customer conversations',
                'Continuous learning and improvement over time'
            ]
        },
        {
            id: 'facebook-service',
            name: 'Facebook Messenger Automation',
            icon: 'facebook-f',
            shortDescription: 'Transform your Facebook Messenger into a powerful customer service tool with our AI automation.',
            benefits: [
                'Instant response to customer messages at any time',
                'Intelligent lead qualification and nurturing',
                'Automated appointment scheduling and reminders',
                'Product recommendations based on customer preferences',
                'Integration with your existing CRM systems',
                'Detailed conversation analytics and insights'
            ]
        },
        {
            id: 'whatsapp-service',
            name: 'WhatsApp Business Automation',
            icon: 'whatsapp',
            shortDescription: 'Leverage WhatsApp Business for customer communication with our intelligent automation solution.',
            benefits: [
                'Automated responses on the world\'s most popular messaging platform',
                'Rich media support for sharing images, videos, and documents',
                'Multilingual support for global customer base',
                'Secure and encrypted conversations',
                'Business verification for enhanced credibility',
                'Integration with your business systems and workflows'
            ]
        }
    ];
    
    // This function could be used to dynamically update service content
    function updateServiceContent() {
        services.forEach(service => {
            const serviceSection = document.getElementById(service.id);
            if (serviceSection) {
                // Service is already in the HTML, but we could update it if needed
                // For now, we'll just initialize any dynamic elements
                
                // Example: Add event listeners to service-specific CTAs
                const ctaButton = serviceSection.querySelector('.btn-accent');
                if (ctaButton) {
                    ctaButton.addEventListener('click', function() {
                        // Pre-select the corresponding service in the contact form
                        const serviceSelect = document.getElementById('service');
                        if (serviceSelect) {
                            // Extract service type from ID (e.g., 'instagram-service' -> 'instagram')
                            const serviceType = service.id.split('-')[0];
                            
                            // Find and select the option
                            for (let i = 0; i < serviceSelect.options.length; i++) {
                                if (serviceSelect.options[i].value === serviceType) {
                                    serviceSelect.selectedIndex = i;
                                    break;
                                }
                            }
                        }
                    });
                }
            }
        });
    }
    
    // Initialize service content
    updateServiceContent();
    
    // Add animation to service sections when they come into view
    const serviceDetailSections = document.querySelectorAll('.service-detail');
    
    function animateServiceSections() {
        const triggerBottom = window.innerHeight * 0.8;
        
        serviceDetailSections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            
            if (sectionTop < triggerBottom) {
                section.classList.add('visible');
                
                // Animate children with delay
                const animatedElements = section.querySelectorAll('.animate');
                animatedElements.forEach((element, index) => {
                    setTimeout(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }, index * 200);
                });
            }
        });
    }
    
    // Initial check for animations
    animateServiceSections();
    
    // Check for animations on scroll
    window.addEventListener('scroll', animateServiceSections);
    
    // Add CSS class for service detail sections
    const style = document.createElement('style');
    style.textContent = `
        .service-detail {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .service-detail.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .active-service {
            color: var(--accent-color) !important;
            font-weight: bold;
        }
    `;
    document.head.appendChild(style);
});
