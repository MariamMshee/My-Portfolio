document.addEventListener('DOMContentLoaded', function() {
    // CV download functionality
    const downloadBtn = document.getElementById('downloadBtn');
    const cvUrl = 'MariamMsheeResume.pdf'; // Make sure to replace with your actual CV URL
    
    downloadBtn.addEventListener('click', function() {
        fetch(cvUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.blob();
            })
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'MariamMsheeResume.pdf';
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            })
            .catch(error => {
                console.error('There was a problem downloading the CV:', error);
                alert('Sorry, there was an error downloading your CV. Please try again later.');
            });
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Validation (simple check)
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For demo purposes, just show an alert
            alert(`Thank you for your message, ${name}!\nI'll get back to you soon at ${email}`);
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Skill level animations
    const skillLevels = document.querySelectorAll('.skill-level');
    
    function animateSkills() {
        skillLevels.forEach(skill => {
            const targetWidth = skill.style.width;
            skill.style.width = '0';
            setTimeout(() => {
                skill.style.transition = 'width 1s ease';
                skill.style.width = targetWidth;
            }, 300);
        });
    }
    
    // Animate skills when they come into view
    const skillsSection = document.querySelector('.skills-section');
    
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(skillsSection);
    }
    
    // Navigation highlighting
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}.html`) {
                link.classList.add('active');
            }
        });
    });
});