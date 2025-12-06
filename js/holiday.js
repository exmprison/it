document.addEventListener('DOMContentLoaded', () => {
    const snowContainer = document.createElement('div');
    snowContainer.id = 'snow-container';
    document.body.appendChild(snowContainer);

    function createSnowflake(layer) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        
        let size, opacity, animationDuration;

        switch(layer) {
            case 1: // Back layer
                size = Math.random() * 2 + 1;
                opacity = Math.random() * 0.4 + 0.2;
                animationDuration = Math.random() * 10 + 10;
                break;
            case 2: // Middle layer
                size = Math.random() * 3 + 2;
                opacity = Math.random() * 0.4 + 0.4;
                animationDuration = Math.random() * 8 + 8;
                break;
            case 3: // Front layer
                size = Math.random() * 4 + 3;
                opacity = Math.random() * 0.4 + 0.6;
                animationDuration = Math.random() * 6 + 6;
                break;
        }

        snowflake.style.left = `${Math.random() * 100}vw`;
        snowflake.style.animationDuration = `${animationDuration}s`;
        snowflake.style.width = `${size}px`;
        snowflake.style.height = snowflake.style.width;
        snowflake.style.opacity = opacity;
        
        snowContainer.appendChild(snowflake);

        setTimeout(() => {
            snowflake.remove();
        }, animationDuration * 1000);
    }

    setInterval(() => createSnowflake(1), 150);
    setInterval(() => createSnowflake(2), 100);
    setInterval(() => createSnowflake(3), 50);
});