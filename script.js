document.addEventListener('DOMContentLoaded', () => {
    const photoWall = document.getElementById('photo-wall');

    fetch('image_urls.json')
        .then(response => response.json())
        .then(imageUrls => {
            imageUrls.forEach(url => {
                const frame = document.createElement('div');
                frame.className = 'frame';

                const img = document.createElement('img');
                img.src = url;
                frame.appendChild(img);

                const x = Math.random() * (window.innerWidth - 200);
                const y = Math.random() * (window.innerHeight - 200);
                frame.style.transform = `translate(${x}px, ${y}px)`;

                photoWall.appendChild(frame);
            });
        })
        .catch(error => console.error('Error loading images:', error));
});
