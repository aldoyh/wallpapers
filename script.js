document.addEventListener('DOMContentLoaded', () => {
    const photoWall = document.getElementById('photo-wall');
    const frameWidth = 220 * 1.3; // Increased by 30%
    const frameHeight = 220 * 1.3; // Increased by 30%
    const gap = 50 * 1.5; // Increased by 50%

    fetch('image_urls.json')
        .then(response => response.json())
        .then(imageUrls => {
            const wall = document.querySelector('.gallery-wall');
            // Predefined layout for the first 4 images (like the reference)
            const layout = [
                {x: 80,  y: 120,  w: 220*1.3, h: 340*1.3, style: 0}, // Tall left
                {x: 340*1.3, y: 60,   w: 140*1.3, h: 200*1.3, style: 1}, // Top center
                {x: 700*1.3, y: 100,  w: 260*1.3, h: 340*1.3, style: 2}, // Tall right
                {x: 400*1.3, y: 320*1.3,  w: 260*1.3, h: 160*1.3, style: 3}, // Bottom center
            ];
            const frameStyles = [
                '12px solid #b6ad90', // beige
                '10px solid #b6ad90', // beige thin
                '14px solid #7a5c2e', // brown
                '8px solid #444',     // dark gray
                '12px solid #a67c52', // wood
                '10px solid #d2b48c', // tan
            ];
            // Place the first 4 images as in the reference
            imageUrls.slice(0, 4).forEach((url, i) => {
                const frame = document.createElement('div');
                frame.className = 'frame';
                frame.style.left = layout[i].x + 'px';
                frame.style.top = layout[i].y + 'px';
                frame.style.width = layout[i].w + 'px';
                frame.style.height = layout[i].h + 'px';
                frame.style.border = frameStyles[layout[i].style % frameStyles.length];
                const wire = document.createElement('div');
                wire.className = 'frame-wire';
                const hook = document.createElement('div');
                hook.className = 'frame-hook';
                const img = document.createElement('img');
                img.src = url;
                const saveButton = document.createElement('button');
                saveButton.innerText = 'Save';
                saveButton.className = 'save-button';
                saveButton.onclick = () => {
                    window.electron.saveImage(url);
                };
                frame.appendChild(wire);
                frame.appendChild(hook);
                frame.appendChild(img);
                frame.appendChild(saveButton);
                wall.appendChild(frame);
            });
            // Distribute the rest in a non-overlapping, gallery style grid
            let x = 1000*1.3, y = 80*1.3, maxY = 0;
            let col = 0;
            imageUrls.slice(4, 30).forEach((url, idx) => {
                const w = (140 + Math.random() * 100) * 1.3;
                const h = (140 + Math.random() * 120) * 1.3;
                const frame = document.createElement('div');
                frame.className = 'frame';
                frame.style.left = x + 'px';
                frame.style.top = y + 'px';
                frame.style.width = w + 'px';
                frame.style.height = h + 'px';
                frame.style.border = frameStyles[(idx+4) % frameStyles.length];
                const wire = document.createElement('div');
                wire.className = 'frame-wire';
                const hook = document.createElement('div');
                hook.className = 'frame-hook';
                const img = document.createElement('img');
                img.src = url;
                const saveButton = document.createElement('button');
                saveButton.innerText = 'Save';
                saveButton.className = 'save-button';
                saveButton.onclick = () => {
                    window.electron.saveImage(url);
                };
                frame.appendChild(wire);
                frame.appendChild(hook);
                frame.appendChild(img);
                frame.appendChild(saveButton);
                wall.appendChild(frame);
                y += h + gap; // Use increased gap
                maxY = Math.max(maxY, y);
                col++;
                if (y + 200 > 1600 || col > 4) {
                    x += w + gap + Math.random()*60; // Use increased gap and more random
                    y = 80*1.3 + Math.random()*60;
                    col = 0;
                }
            });
        })
        .catch(error => console.error('Error loading images:', error));
});

// Simple horizontal panning animation for the gallery wall
window.addEventListener('DOMContentLoaded', () => {
  const wall = document.querySelector('.gallery-wall');
  let offset = 0;
  let direction = 1;
  let baseSpeed = 1.2 * 1.5; // 50% faster
  setInterval(() => {
    // Add random speed factor (±25%)
    let speed = baseSpeed * (1 + (Math.random() - 0.5));
    offset += direction * speed;
    if (offset > 3200) direction = -1;
    if (offset < 0) direction = 1;
    wall.style.transform = `translateX(${-offset}px)`;
  }, 30);
});
