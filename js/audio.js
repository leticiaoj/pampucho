document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('audio');
    const musicSelector = document.getElementById('musicSelector');

    audio.src = musicSelector.value;

    musicSelector.addEventListener('change', function() {
        audio.src = this.value;
        audio.play();
    });
});
