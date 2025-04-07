// Updated JavaScript to handle form submission with backend
document.addEventListener('DOMContentLoaded', function() {
    // Contact form submission with backend integration
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            let valid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            const company = document.getElementById('company');
            const service = document.getElementById('service');
            
            if (!name.value.trim()) {
                showError(name, 'Name is required');
                valid = false;
            } else {
                removeError(name);
            }
            
            if (!email.value.trim()) {
                showError(email, 'Email is required');
                valid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email');
                valid = false;
            } else {
                removeError(email);
            }
            
            if (!message.value.trim()) {
                showError(message, 'Message is required');
                valid = false;
            } else {
                removeError(message);
            }
            
            if (valid) {
                // Prepare form data for submission
                const formData = {
                    name: name.value.trim(),
                    email: email.value.trim(),
                    message: message.value.trim(),
                    company: company ? company.value.trim() : '',
                    service: service ? service.value : ''
                };
                
                // Update UI to show loading state
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
                
                // Remove any existing form messages
                const existingMessage = contactForm.querySelector('.form-message');
                if (existingMessage) {
                    existingMessage.remove();
                }
                
                // Send data to backend
                fetch('process-form.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                .then(response => response.json())
                .then(data => {
                    // Reset form on success
                    if (data.success) {
                        contactForm.reset();
                        
                        // Show success message
                        const formMessage = document.createElement('div');
                        formMessage.className = 'form-message success';
                        formMessage.textContent = data.message || 'Your message has been sent successfully!';
                        contactForm.appendChild(formMessage);
                    } else {
                        // Show validation errors if any
                        if (data.errors) {
                            Object.keys(data.errors).forEach(field => {
                                const inputField = document.getElementById(field);
                                if (inputField) {
                                    showError(inputField, data.errors[field]);
                                }
                            });
                        }
                        
                        // Show general error message
                        const formMessage = document.createElement('div');
                        formMessage.className = 'form-message error';
                        formMessage.textContent = data.message || 'There was an error sending your message. Please try again.';
                        contactForm.appendChild(formMessage);
                    }
                })
                .catch(error => {
                    // Show error message
                    console.error('Error:', error);
                    const formMessage = document.createElement('div');
                    formMessage.className = 'form-message error';
                    formMessage.textContent = 'There was an error sending your message. Please try again.';
                    contactForm.appendChild(formMessage);
                })
                .finally(() => {
                    // Reset button state
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                    
                    // Remove message after 5 seconds
                    setTimeout(() => {
                        const formMessage = contactForm.querySelector('.form-message');
                        if (formMessage) {
                            formMessage.remove();
                        }
                    }, 5000);
                });
            }
        });
    }
    
    // Helper functions for form validation
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
        
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorElement);
        }
        
        input.classList.add('error');
    }
    
    function removeError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.remove();
        }
        
        input.classList.remove('error');
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});
