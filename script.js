document.addEventListener('DOMContentLoaded', () => {
    const photoWall = document.getElementById('photo-wall');
    const frameWidth = 220; // Width of the frame including padding and border
    const frameHeight = 220; // Height of the frame including padding and border
    const gap = 20; // Gap between frames

    fetch('image_urls.json')
        .then(response => response.json())
        .then(imageUrls => {
            let x = gap;
            let y = gap;

            imageUrls.forEach(url => {
                const frame = document.createElement('div');
                frame.className = 'frame';

                const img = document.createElement('img');
                img.src = url;
                frame.appendChild(img);

                frame.style.transform = `translate(${x}px, ${y}px)`;

                photoWall.appendChild(frame);

                x += frameWidth + gap;

                // If the next frame would go off the screen, move to the next row
                if (x + frameWidth + gap > window.innerWidth) {
                    x = gap;
                    y += frameHeight + gap;
                }
            });

            // Adjust the height of the photo wall to fit all frames
            photoWall.style.height = `${y + frameHeight + gap}px`;
        })
        .catch(error => console.error('Error loading images:', error));
});
