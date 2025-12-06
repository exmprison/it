// Easter Eggs

document.addEventListener('DOMContentLoaded', () => {
    let easterEggCount = 0;
    const easterEggCounter = document.createElement('div');
    easterEggCounter.style.position = 'fixed';
    easterEggCounter.style.top = '10px';
    easterEggCounter.style.right = '10px';
    easterEggCounter.style.fontSize = '16px';
    easterEggCounter.style.color = 'white';
    easterEggCounter.textContent = 'Easter Eggs Found: 0';
    document.body.appendChild(easterEggCounter);

    function foundEasterEgg() {
        easterEggCount++;
        easterEggCounter.textContent = `Easter Eggs Found: ${easterEggCount}`;
    }

    // 1. Konami Code
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                konamiIndex = 0;
                alert('Konami Code Activated!');
                document.body.style.filter = document.body.style.filter === 'invert(1)' ? 'invert(0)' : 'invert(1)';
                foundEasterEgg();
                // Placeholder for sound
                // const audio = new Audio('assets/success.mp3');
                // audio.play();
            }
        } else {
            konamiIndex = 0;
        }
    });

    // 2. Clickable Logo
    const logo = document.querySelector('.logo h2');
    let clickCount = 0;
    logo.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 10) {
            alert('You found an easter egg! The logo is happy!');
            clickCount = 0;
            foundEasterEgg();
        }
    });

    // 3. Console Log Message
    console.log('%cHappy Holidays from my website to you! 🎄', 'color: #ff6b6b; font-size: 20px;');
    foundEasterEgg();


    // 4. Holiday-themed Cursor
    // document.body.style.cursor = 'url(assets/candy-cane.png), auto'; // This can be annoying, so commented out

    // 5. Change background on keypress
    const backgrounds = [
        'url(assets/bg1.jpg)',
        'url(assets/bg2.jpg)',
        'url(assets/bg3.jpg)'
    ];
    let bgIndex = 0;
    document.addEventListener('keydown', (e) => {
        if (e.key === 'h') {
            bgIndex = (bgIndex + 1) % backgrounds.length;
            document.body.style.backgroundImage = backgrounds[bgIndex];
            foundEasterEgg();
        }
    });

    // 6. Hidden Mini-Game
    let gameSequence = '';
    document.addEventListener('keydown', (e) => {
        gameSequence += e.key;
        if (gameSequence.includes('game')) {
            gameSequence = '';
            alert('Catch the falling presents! (Game not implemented yet)');
            foundEasterEgg();
        }
    });

    // 7. Festive sounds on button click
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Placeholder for sound
            // const audio = new Audio('assets/jingle-bell.mp3');
            // audio.play();
        });
    });

    // 8. Change image on hover
    const heroBanner = document.querySelector('.hero-banner');
    if (heroBanner) {
        const originalSrc = heroBanner.src;
        heroBanner.addEventListener('mouseenter', () => {
            heroBanner.src = 'assets/winter-scene.jpg'; // Placeholder
            foundEasterEgg();
        });
        heroBanner.addEventListener('mouseleave', () => {
            heroBanner.src = originalSrc;
        });
    }

    // 9. Naughty or Nice button
    function naughtyOrNice() {
        const naughtyNiceBtn = document.createElement('button');
        naughtyNiceBtn.textContent = 'Am I on the naughty list?';
        naughtyNiceBtn.style.position = 'fixed';
        naughtyNiceBtn.style.bottom = `${Math.random() * 80 + 10}%`;
        naughtyNiceBtn.style.left = `${Math.random() * 80 + 10}%`;
        naughtyNiceBtn.classList.add('btn', 'primary');
        document.body.appendChild(naughtyNiceBtn);

        naughtyNiceBtn.addEventListener('click', () => {
            const isNaughty = Math.random() > 0.5;
            alert(isNaughty ? 'You are on the naughty list! 😈' : 'You are on the nice list! 😇');
            naughtyNiceBtn.remove();
            foundEasterEgg();
        });

        setTimeout(() => {
            naughtyNiceBtn.remove();
        }, 5000);
    }
    setInterval(naughtyOrNice, 30000);

    // 10. Draggable Snowman
    const snowman = document.createElement('div');
    snowman.textContent = '⛄';
    snowman.style.position = 'fixed';
    snowman.style.fontSize = '50px';
    snowman.style.cursor = 'grab';
    snowman.style.bottom = '20px';
    snowman.style.right = '20px';
    document.body.appendChild(snowman);

    let isDragging = false;
    snowman.addEventListener('mousedown', () => {
        isDragging = true;
        snowman.style.cursor = 'grabbing';
        foundEasterEgg();
    });
    document.addEventListener('mouseup', () => {
        isDragging = false;
        snowman.style.cursor = 'grab';
    });
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            snowman.style.left = `${e.clientX - 25}px`;
            snowman.style.top = `${e.clientY - 25}px`;
        }
    });

    // 11. Secret color theme
    const themeButton = document.createElement('button');
    themeButton.textContent = '🕎';
    themeButton.style.position = 'fixed';
    themeButton.style.bottom = '20px';
    themeButton.style.left = '20px';
    themeButton.classList.add('btn', 'secondary');
    document.body.appendChild(themeButton);
    themeButton.addEventListener('click', () => {
        document.documentElement.style.setProperty('--primary-dark', '#001f3f');
        document.documentElement.style.setProperty('--secondary-dark', '#0074D9');
        document.documentElement.style.setProperty('--accent-color', '#7FDBFF');
        document.documentElement.style.setProperty('--accent-light', '#B2EBF2');
        document.documentElement.style.setProperty('--accent-bright', '#FFFFFF');
        foundEasterEgg();
    });

    // 12. Gift on specific date
    const today = new Date();
    if (today.getMonth() === 11 && today.getDate() === 25) {
        const gift = document.createElement('div');
        gift.textContent = '🎁';
        gift.style.position = 'fixed';
        gift.style.bottom = '100px';
        gift.style.right = '20px';
        gift.style.fontSize = '50px';
        gift.style.cursor = 'pointer';
        document.body.appendChild(gift);
        gift.addEventListener('click', () => {
            alert('Merry Christmas! You get a virtual cookie! 🍪');
            foundEasterEgg();
        });
    }

    // 13. Recipe for hot chocolate
    let coldSequence = '';
    document.addEventListener('keydown', (e) => {
        coldSequence += e.key;
        if (coldSequence.includes('cold')) {
            coldSequence = '';
            alert('Hot Chocolate Recipe:\n\n- 1 cup milk\n- 2 tbsp cocoa powder\n- 2 tbsp sugar\n- 1/4 tsp vanilla extract\n\nEnjoy!');
            foundEasterEgg();
        }
    });

    // 14. Link to a classic holiday movie trailer
    const movieButton = document.createElement('button');
    movieButton.textContent = '🎬';
    movieButton.style.position = 'fixed';
    movieButton.style.bottom = '100px';
    movieButton.style.left = '20px';
    movieButton.classList.add('btn', 'secondary');
    document.body.appendChild(movieButton);
    movieButton.addEventListener('click', () => {
        window.open('https://www.youtube.com/watch?v=s3_z8D3K_4o', '_blank');
        foundEasterEgg();
    });

    // 15. Easter egg counter is at the top
    
    // 16. Lights on/off switch
    const lightsContainer = document.querySelector('.holiday-lights');
    for(let i = 0; i < 20; i++) {
        const light = document.createElement('div');
        light.classList.add('light');
        lightsContainer.appendChild(light);
    }
    const lightSwitch = document.createElement('button');
    lightSwitch.textContent = 'Lights Off';
    lightSwitch.style.position = 'fixed';
    lightSwitch.style.top = '50px';
    lightSwitch.style.right = '10px';
    lightSwitch.classList.add('btn', 'primary');
    document.body.appendChild(lightSwitch);
    lightSwitch.addEventListener('click', () => {
        lightsContainer.classList.toggle('off');
        lightSwitch.textContent = lightsContainer.classList.contains('off') ? 'Lights On' : 'Lights Off';
        foundEasterEgg();
    });

    // 17. Clickable cookie
    const cookie = document.createElement('div');
    cookie.textContent = '🍪';
    cookie.style.position = 'fixed';
    cookie.style.bottom = '180px';
    cookie.style.right = '20px';
    cookie.style.fontSize = '50px';
    cookie.style.cursor = 'pointer';
    document.body.appendChild(cookie);
    cookie.addEventListener('click', () => {
        cookie.remove();
        foundEasterEgg();
    });

    // 18. Secret message is in the HTML source code

    // 19. Singing snowman
    snowman.addEventListener('click', () => {
        // Placeholder for sound
        // const audio = new Audio('assets/snowman-singing.mp3');
        // audio.play();
        alert('Snowman is singing! (Sound not implemented yet)');
        foundEasterEgg();
    });

    // 20. Snowball fight mode
    let snowballMode = false;
    const snowballCanvas = document.createElement('canvas');
    snowballCanvas.style.position = 'fixed';
    snowballCanvas.style.top = '0';
    snowballCanvas.style.left = '0';
    snowballCanvas.style.pointerEvents = 'none';
    snowballCanvas.width = window.innerWidth;
    snowballCanvas.height = window.innerHeight;
    document.body.appendChild(snowballCanvas);
    const snowballCtx = snowballCanvas.getContext('2d');
    let snowballs = [];

    document.addEventListener('keydown', (e) => {
        if(e.key === 's') {
            snowballMode = !snowballMode;
            snowballCanvas.style.pointerEvents = snowballMode ? 'auto' : 'none';
            alert(`Snowball fight mode ${snowballMode ? 'activated' : 'deactivated'}!`);
            foundEasterEgg();
        }
    });

    snowballCanvas.addEventListener('click', (e) => {
        if(snowballMode) {
            snowballs.push({
                x: e.clientX,
                y: e.clientY,
                radius: 10,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                alpha: 1
            });
        }
    });

    function updateSnowballs() {
        snowballCtx.clearRect(0, 0, snowballCanvas.width, snowballCanvas.height);
        snowballs.forEach((snowball, index) => {
            snowball.x += snowball.vx;
            snowball.y += snowball.vy;
            snowball.alpha -= 0.01;
            if (snowball.alpha <= 0) {
                snowballs.splice(index, 1);
            }
            snowballCtx.fillStyle = `rgba(255, 255, 255, ${snowball.alpha})`;
            snowballCtx.beginPath();
            snowballCtx.arc(snowball.x, snowball.y, snowball.radius, 0, Math.PI * 2);
            snowballCtx.fill();
        });
        requestAnimationFrame(updateSnowballs);
    }
    updateSnowballs();
});
