let currentIndex = 0;

function moveSlide(direction) {
    const slides = document.querySelector('.carousel-slide');
    const totalSlides = slides.children.length;

    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = totalSlides - 1;
    } else if (currentIndex >= totalSlides) {
        currentIndex = 0;
    }

    const translateX = -currentIndex * 100;
    slides.style.transform = `translateX(${translateX}%)`;
}

// Função para mudar o slide automaticamente a cada 1 segundo
setInterval(() => {
    moveSlide(1);
}, 1000);
