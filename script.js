document.addEventListener('DOMContentLoaded', () => {
    const photoWall = document.getElementById('photo-wall');
    const frameWidth = 220; // Width of the frame including padding and border
    const frameHeight = 220; // Height of the frame including padding and border
    const gap = 50; // Increased gap between frames

    fetch('image_urls.json')
        .then(response => response.json())
        .then(imageUrls => {
            let x = gap;
            let y = gap;

            imageUrls.forEach((url, index) => {
                const frame = document.createElement('div');
                frame.className = 'frame';

                const img = document.createElement('img');
                img.src = url;
                frame.appendChild(img);

                // Randomize positions slightly to make it look more natural
                const randomX = x + (Math.random() - 0.5) * 20;
                const randomY = y + (Math.random() - 0.5) * 20;
                const z = Math.random() * 1000 - 500; // Add a 3D effect
                frame.style.transform = `translate3d(${randomX}px, ${randomY}px, ${z}px)`;

                // Adjust the size of the frames to make them look more like paintings
                const width = 150 + Math.random() * 100;
                const height = 150 + Math.random() * 100;
                frame.style.width = `${width}px`;
                frame.style.height = `${height}px`;

                photoWall.appendChild(frame);

                x += width + gap;

                // If the next frame would go off the screen, move to the next row
                if (x + width + gap > window.innerWidth) {
                    x = gap;
                    y += height + gap;
                }
            });

            // Adjust the height of the photo wall to fit all frames
            photoWall.style.height = `${y + frameHeight + gap}px`;
        })
        .catch(error => console.error('Error loading images:', error));
});
