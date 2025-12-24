 document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Here you can add code to send the form data to a server
            console.log('Form submitted with data:', formData);
            
            // Show success message
            alert('Form submitted successfully!');
            
            // Reset form
            this.reset();
        });