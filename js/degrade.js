window.addEventListener('scroll', function() {
    const scrollPercentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight));
    const startColor = [76, 0, 255]; // #4c00ff
    const midColor = [119, 0, 255];  // #7700ff
    const endColor = [153, 0, 255];  // #9900ff

    let newColor;

    if (scrollPercentage <= 0.5) {
        const ratio = scrollPercentage / 0.5;
        newColor = startColor.map((start, index) => Math.round(start + (midColor[index] - start) * ratio));
    } else {
        const ratio = (scrollPercentage - 0.5) / 0.5;
        newColor = midColor.map((mid, index) => Math.round(mid + (endColor[index] - mid) * ratio));
    }

    document.body.style.background = `rgb(${newColor[0]}, ${newColor[1]}, ${newColor[2]})`;
});
