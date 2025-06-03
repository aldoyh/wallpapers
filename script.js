document.addEventListener('DOMContentLoaded', () => {
    const photoWall = document.getElementById('photo-wall');

    fetch('image_urls.json')
        .then(response => response.json())
        .then(imageUrls => {
            imageUrls.forEach(url => {
                const img = document.createElement('img');
                img.src = url;
                photoWall.appendChild(img);
            });
        })
        .catch(error => console.error('Error loading images:', error));
});
