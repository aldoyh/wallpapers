document.addEventListener('DOMContentLoaded', () => {
    const photoWall = document.getElementById('photo-wall');

    fetch('image_urls.json')
        .then(response => response.json())
        .then(imageUrls => {
            imageUrls.forEach(url => {
                const img = document.createElement('img');
                img.src = url;
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                const z = Math.random() * 1000 - 500;
                img.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
                photoWall.appendChild(img);
            });
        })
        .catch(error => console.error('Error loading images:', error));
});
