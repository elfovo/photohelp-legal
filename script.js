document.addEventListener('DOMContentLoaded', function() {
    const lastUpdate = document.getElementById('last-update');
    const date = new Date();
    lastUpdate.textContent = date.toLocaleDateString();

    const features = document.querySelectorAll('.feature-card');
    const demo = document.querySelector('.demo-animation');
    
    let currentStep = 0;
    const steps = ['photo', 'ai', 'result'];
    
    function animateDemo() {
        features.forEach(f => f.classList.remove('active'));
        const currentFeature = document.querySelector(`[data-feature="${steps[currentStep]}"]`);
        currentFeature.classList.add('active');
        
        demo.innerHTML = `<div class="${steps[currentStep]}-animation active"></div>`;
        
        currentStep = (currentStep + 1) % steps.length;
    }
    
    setInterval(animateDemo, 3000);
    animateDemo();

    // Ajouter la classe animate après un court délai
    setTimeout(() => {
        document.querySelectorAll('.terms-section').forEach(section => {
            section.classList.add('animate');
        });
    }, 100);

    // Observer pour les sections
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observer toutes les sections
    document.querySelectorAll('.terms-section').forEach(section => {
        observer.observe(section);
    });

    // Navigation fluide avec offset
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 60, // Ajustez cette valeur selon la hauteur de votre header
                behavior: 'smooth'
            });
        });
    });

    // Bouton retour en haut
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Gestion du mode sombre
    // Ajout du bouton de thème
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(themeToggle);

    // Gestion du changement de thème
    themeToggle.addEventListener('click', () => {
        document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
        themeToggle.innerHTML = document.body.dataset.theme === 'dark' ? 
            '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', document.body.dataset.theme);
    });

    // Restauration du thème préféré
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.dataset.theme = savedTheme;
        themeToggle.innerHTML = savedTheme === 'dark' ? 
            '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }

    // Menu responsive
    const navToggle = document.createElement('button');
    navToggle.className = 'nav-toggle';
    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('header').prepend(navToggle);

    navToggle.addEventListener('click', () => {
        const nav = document.querySelector('nav ul');
        nav.classList.toggle('active');
        navToggle.innerHTML = nav.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Animation des sections au défilement
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.terms-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        observer.observe(section);
    });
}); 