document.addEventListener('DOMContentLoaded', function() {
    const lastUpdate = document.getElementById('last-update');
    const today = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    lastUpdate.textContent = today.toLocaleDateString('fr-FR', options);

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
}); 