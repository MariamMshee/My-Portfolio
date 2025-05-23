// Navigation Toggle
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('toggle');
    
    // Animate burger icon
    const lines = document.querySelectorAll('.burger div');
    lines.forEach(line => {
        line.style.transition = 'all 0.3s ease';
    });
    
    if (navLinks.classList.contains('active')) {
        lines[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        lines[1].style.opacity = '0';
        lines[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
    } else {
        lines[0].style.transform = 'rotate(0) translate(0, 0)';
        lines[1].style.opacity = '1';
        lines[2].style.transform = 'rotate(0) translate(0, 0)';
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add active class to current page
const currentPage = window.location.pathname.split('/').pop();
const navItems = document.querySelectorAll('.nav-links a');

navItems.forEach(item => {
    if (item.getAttribute('href') === currentPage) {
        item.classList.add('active');
    }
});

// Intersection Observer for animations
const fadeElements = document.querySelectorAll('.card, .skill-card, .certification-card, .reference-card, .contact-card');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

fadeElements.forEach(element => {
    element.classList.add('hidden');
    fadeObserver.observe(element);
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .hidden {
        opacity: 0;
        transform: translateY(20px);
    }
    
    .visible {
        opacity: 1;
        transform: translateY(0);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
`;
document.head.appendChild(style);

// Add to js/script.js

// Intersection Observer for animations on projects page
const projectCards = document.querySelectorAll('.project-card');

const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

projectCards.forEach(card => {
    card.classList.add('hidden');
    projectObserver.observe(card);
});