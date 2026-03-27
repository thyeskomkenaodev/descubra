const letter = document.getElementById('letter');
const celebrationOverlay = document.getElementById('celebrationOverlay');
const cakeContainer = document.getElementById('cakeContainer');
const flame = document.getElementById('flame');
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');

let fireworks = [];
let particles = [];
let isCelebrating = false;

// 1. Starry Background (Simplified for brevity)
function createStars() {
    const container = document.getElementById('starsContainer');
    for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 3;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.backgroundColor = 'white';
        star.style.position = 'absolute';
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.borderRadius = '50%';
        star.style.opacity = Math.random();
        star.style.animation = `twinkle ${2 + Math.random() * 3}s infinite alternate`;
        container.appendChild(star);
    }
}

// Add twinkle animation to CSS dynamically
const style = document.createElement('style');
style.innerHTML = `
    @keyframes twinkle {
        from { opacity: 0.2; transform: scale(0.8); }
        to { opacity: 1; transform: scale(1.2); }
    }
`;
document.head.appendChild(style);

createStars();

// 2. Interaction Logic & Scene Sequence
const characterContainer = document.getElementById('characterContainer');
const giftWrapper = document.getElementById('giftWrapper');
const music = document.getElementById('birthdayMusic');
const musicToggle = document.getElementById('musicToggle');
const musicIcon = document.getElementById('musicIcon');

let isMusicPlaying = false;

musicToggle.addEventListener('click', () => {
    if (isMusicPlaying) {
        music.pause();
        musicIcon.src = 'https://img.icons8.com/ios-filled/50/ffffff/mute--v1.png';
        musicToggle.classList.add('muted');
    } else {
        music.play();
        musicIcon.src = 'https://img.icons8.com/ios-filled/50/ffffff/high-volume--v1.png';
        musicToggle.classList.remove('muted');
    }
    isMusicPlaying = !isMusicPlaying;
});

function startIntroduction() {
    // 1. Initial state (off-screen)
    characterContainer.style.left = '-150px';
    
    // 2. Start flying
    setTimeout(() => {
        characterContainer.classList.add('flying');
        characterContainer.style.left = '40%'; // Focus point
    }, 100);

    // 3. Arrive and reveal gift with magic
    setTimeout(() => {
        characterContainer.classList.remove('flying');
        characterContainer.classList.add('arrived');
        
        setTimeout(() => {
            giftWrapper.classList.remove('hidden');
            giftWrapper.classList.add('visible');
            document.querySelector('.instruction').style.opacity = '1';
            
            // 5. Let the butterfly fly freely after a short stay
            setTimeout(() => {
                characterContainer.classList.remove('arrived');
                characterContainer.classList.add('free');
            }, 2000);
        }, 800);
    }, 4000); 
}

startIntroduction();

giftWrapper.addEventListener('click', () => {
    if (!giftWrapper.classList.contains('open')) {
        giftWrapper.classList.add('open');
        
        // Start Music on first interaction
        if (!isMusicPlaying) {
            music.play().catch(e => console.log("Erro ao tocar música:", e));
            isMusicPlaying = true;
        }

        // Surprise: Floating Hearts
        createHearts();

        // Trigger number transition after letter appears
        setTimeout(() => {
            document.querySelector('.number-wrapper').style.transform = 'translateY(-60px)';
        }, 1000);

        // Show celebration overlay after a short delay
        setTimeout(() => {
            giftWrapper.style.transition = 'opacity 1s ease, transform 1s ease';
            giftWrapper.style.opacity = '0.1';
            giftWrapper.style.transform = 'translateY(100px) scale(0.8)';
            celebrationOverlay.style.display = 'flex';
            
            // Trigger status bar animation
            setTimeout(() => {
                celebrationOverlay.classList.add('active');
                document.getElementById('progressFill').style.width = '100%';
                
                // Final state: Hide 40 and bar, show prominent 41
                setTimeout(() => {
                    document.getElementById('statusContainer').classList.add('finished');
                    // Create the flower forest and butterflies when the age transition is done
                    createFlowerForest();
                    createButterflyForest();
                }, 2500);
            }, 500);
        }, 10000); 
    }
});

function createFlowerForest() {
    const forest = document.getElementById('flowerForest');
    const flowerImages = [
        'https://img.icons8.com/matisse/100/sakura.png',
        'https://img.icons8.com/3d-fluency/94/sakura.png'
    ];

    for (let i = 0; i < 40; i++) {
        setTimeout(() => {
            const flower = document.createElement('div');
            flower.className = 'flower-item';
            const img = document.createElement('img');
            img.src = flowerImages[Math.floor(Math.random() * flowerImages.length)];
            
            const size = Math.random() * 40 + 30;
            img.style.width = `${size}px`;
            
            // Focus on extreme sides: -10% to 25% or 75% to 110%
            const side = Math.random() > 0.5 ? 'left' : 'right';
            let leftPos;
            if (side === 'left') {
                leftPos = Math.random() * 35 - 10; // -10% to 25%
            } else {
                leftPos = Math.random() * 35 + 75; // 75% to 110%
            }
            
            flower.style.left = `${leftPos}%`;
            flower.style.bottom = `${Math.random() * 20 - 5}px`;
            flower.style.zIndex = Math.floor(Math.random() * 5);
            
            flower.appendChild(img);
            forest.appendChild(flower);
            
            setTimeout(() => flower.classList.add('visible'), 50);
        }, i * 100);
    }
}

function createButterflyForest() {
    const forest = document.getElementById('butterflyForest');
    const butterflyImages = [
        'https://img.icons8.com/doodle/48/butterfly.png',
        'https://img.icons8.com/color/48/butterfly.png'
    ];

    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const butterfly = document.createElement('div');
            butterfly.className = 'butterfly-item';
            const img = document.createElement('img');
            img.src = butterflyImages[Math.floor(Math.random() * butterflyImages.length)];
            
            // Focus on sides for butterflies too
            const side = Math.random() > 0.5 ? 'left' : 'right';
            let leftPos;
            if (side === 'left') {
                leftPos = Math.random() * 25 + 5; // 5% to 30%
            } else {
                leftPos = Math.random() * 25 + 70; // 70% to 95%
            }
            
            butterfly.style.left = `${leftPos}%`;
            butterfly.style.top = `${Math.random() * 60 + 10}%`;
            
            butterfly.appendChild(img);
            forest.appendChild(butterfly);
            
            setTimeout(() => {
                butterfly.classList.add('visible');
                butterfly.classList.add('orbiting');
                butterfly.style.animationDuration = `${parseFloat(Math.random() * 5 + 8)}s`;
                butterfly.style.animationDelay = `-${Math.random() * 10}s`;
            }, 50);
        }, i * 300);
    }
}

function createHearts() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.innerHTML = '❤️';
            heart.style.left = `${Math.random() * 100}vw`;
            heart.style.top = '100vh';
            heart.style.fontSize = `${Math.random() * 20 + 20}px`;
            heart.style.animationDuration = `${Math.random() * 2 + 3}s`;
            document.body.appendChild(heart);
            
            // Remove heart after animation
            setTimeout(() => heart.remove(), 5000);
        }, i * 200);
    }
}

cakeContainer.addEventListener('click', () => {
    if (!isCelebrating) {
        flame.style.display = 'none';
        isCelebrating = true;
        document.querySelector('.cake-instruction').innerText = 'Parabéns, Lucimara!';
        startFireworks();
    }
});

// 3. Fireworks System
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Firework {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        this.sx = Math.random() * 3 - 1.5;
        this.sy = Math.random() * -3 - 7;
        this.size = 2;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    }
    update() {
        this.x += this.sx;
        this.y += this.sy;
        this.sy += 0.05; // gravity
        if (this.sy >= -1) {
            this.explode();
            return false;
        }
        return true;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
    explode() {
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle(this.x, this.y, this.color));
        }
    }
}

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.sx = Math.random() * 6 - 3;
        this.sy = Math.random() * 6 - 3;
        this.size = Math.random() * 3 + 1;
        this.life = 100;
        this.color = color;
    }
    update() {
        this.x += this.sx;
        this.y += this.sy;
        this.sy += 0.05;
        this.life -= 1.5;
        return this.life > 0;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.life / 100;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

function startFireworks() {
    function animate() {
        ctx.fillStyle = 'rgba(0,0,0,0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        if (Math.random() < 0.05) {
            fireworks.push(new Firework());
        }
        
        fireworks = fireworks.filter(f => {
            const alive = f.update();
            if (alive) f.draw();
            return alive;
        });
        
        particles = particles.filter(p => {
            const alive = p.update();
            if (alive) p.draw();
            return alive;
        });
        
        requestAnimationFrame(animate);
    }
    animate();
}
