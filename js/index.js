// index.js
document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('backgroundVideo');
    const section = document.querySelector('.section');
    const overlay = document.querySelector('.overlay');

    function updateVideoSource() {
        if (window.innerWidth <= 768) {
            video.src = 'assets/videos/vertical.mp4';
        } else {
            video.src = 'assets/videos/horizontal.mp4';
        }
    }

    function adjustSectionHeight() {
        section.style.height = video.offsetHeight + 'px';
        overlay.style.height = video.offsetHeight + 'px';
    }

    updateVideoSource();
    adjustSectionHeight();

    window.addEventListener('resize', () => {
        updateVideoSource();
        adjustSectionHeight();
    });
});
