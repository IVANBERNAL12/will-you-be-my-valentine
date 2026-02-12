document.addEventListener("DOMContentLoaded", () => {

    const countdownEl = document.getElementById("countdown");
    const openBtn = document.getElementById("openBtn");
    const questionBox = document.getElementById("questionBox");
    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");
    const sadGif = document.getElementById("sadGif");
    const pleadingText = document.getElementById("pleadingText");
    const canvas = document.getElementById("fireworks");
    const ctx = canvas.getContext("2d");
    const mainPage = document.getElementById("mainPage");
    const yesPage = document.getElementById("yesPage");
    const backBtn = document.getElementById("backBtn");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Add cat paw prints decoration
    function addPawPrints() {
        for (let i = 0; i < 5; i++) {
            const paw = document.createElement('div');
            paw.className = 'paw-print';
            paw.textContent = '🐾';
            paw.style.left = Math.random() * 100 + '%';
            paw.style.top = Math.random() * 100 + '%';
            document.body.appendChild(paw);
        }
    }
    addPawPrints();

    /* COUNTDOWN - PHILIPPINES TIMEZONE (PHT = UTC+8) */
    function updateCountdown() {
        const now = new Date();
        
        // Convert to Philippines time
        const phtOffset = 8 * 60; // UTC+8 in minutes
        const localOffset = now.getTimezoneOffset();
        const phtTime = new Date(now.getTime() + (phtOffset + localOffset) * 60000);
        
        let year = phtTime.getFullYear();
        let target = new Date(year, 1, 14, 0, 0, 0); // February 14 at midnight PHT

        if (phtTime > target) target = new Date(year + 1, 1, 14, 0, 0, 0);

        const diff = target - phtTime;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const mins = Math.floor((diff / (1000 * 60)) % 60);
        const secs = Math.floor((diff / 1000) % 60);

        countdownEl.textContent =
            `⏰ Valentine's Day Countdown: ${days}d ${hours}h ${mins}m ${secs}s 💕`;
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    /* SLIDESHOW */
    const images = [
        "assets/images/us1.jpg",
        "assets/images/us2.jpg",
        "assets/images/us3.jpg"
    ];

    let currentSlide = 0;
    const slideImage = document.getElementById("slideImage");

    setInterval(() => {
        currentSlide = (currentSlide + 1) % images.length;
        slideImage.style.opacity = 0;
        setTimeout(() => {
            slideImage.src = images[currentSlide];
            slideImage.style.opacity = 1;
        }, 300);
    }, 3000);

    /* AUDIO - Play on first interaction (MOBILE FRIENDLY) */
    const bgMusic = document.getElementById("bgMusic");
    bgMusic.volume = 0.1;
    
    let musicStarted = false;

    function startMusic() {
        if (!musicStarted) {
            bgMusic.play().catch(err => console.log("Audio play prevented"));
            musicStarted = true;
        }
    }

    // Try to start music on ANY user interaction (mobile and desktop)
    document.body.addEventListener('click', startMusic);
    document.body.addEventListener('touchstart', startMusic);
    openBtn.addEventListener('click', startMusic);

    /* MUSIC TOGGLE BUTTON */
    const musicToggle = document.getElementById("musicToggle");

    musicToggle.addEventListener("click", () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.textContent = "🔊 Music ON";
            musicToggle.style.background = "#4CAF50";
            musicStarted = true;
        } else {
            bgMusic.pause();
            musicToggle.textContent = "🔇 Music OFF";
            musicToggle.style.background = "#ff69b4";
        }
    });

    // Update button when music plays/pauses
    bgMusic.addEventListener('play', () => {
        musicToggle.textContent = "🔊 Music ON";
        musicToggle.style.background = "#4CAF50";
    });

    bgMusic.addEventListener('pause', () => {
        musicToggle.textContent = "🔇 Music OFF";
        musicToggle.style.background = "#ff69b4";
    });

    /* OPEN BUTTON */
    openBtn.addEventListener("click", () => {
        questionBox.classList.remove("hidden");
        openBtn.style.display = "none";
        launchFireworks();
    });

    /* YES BUTTON - Transport to new page */
    yesBtn.addEventListener("click", () => {
        startMusic(); // Ensure music plays
        launchBigFireworks();
        
        // Confetti rain
        for(let i = 0; i < 100; i++) {
            setTimeout(() => createConfetti(), i * 30);
        }
        
        // Transition to YES page after short delay
        setTimeout(() => {
            mainPage.classList.add("hidden");
            yesPage.classList.remove("hidden");
            window.scrollTo(0, 0);
        }, 2000);
    });

    /* NO BUTTON - Enhanced interactions with cat memes */
    const catMemeGifs = [
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnJoYnNqdTR3MXd0eGltOHhjOHNjY3R6Z2RiczJmMjJkeGdpYTBjNSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/fFa05KbZowXiEIyRse/giphy.gif",
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnJoYnNqdTR3MXd0eGltOHhjOHNjY3R6Z2RiczJmMjJkeGdpYTBjNSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/7AzEXdIb1wyCTWJntb/giphy.gif",
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnJoYnNqdTR3MXd0eGltOHhjOHNjY3R6Z2RiczJmMjJkeGdpYTBjNSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/TZBED1pP5m8N2/giphy.gif",
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnJoYnNqdTR3MXd0eGltOHhjOHNjY3R6Z2RiczJmMjJkeGdpYTBjNSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ruyS8Zw9sBqE5UjOnY/giphy.gif",
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnJoYnNqdTR3MXd0eGltOHhjOHNjY3R6Z2RiczJmMjJkeGdpYTBjNSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/mi4ec226vjAkehSLk0/giphy.gif",
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZHQweDU5ZjZseGljYzJpd3h6Z2thMjgxZTBmenUxdjJsem83cXU1cSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/901mxGLGQN2PyCQpoc/giphy.gif",
    ];

    const pleadingMessages = [
        "Pleeease? 🥺",
        "Are you sure? I'll be so sad! 😿",
        "But... but... I love you! 💔",
        "You're breaking my heart! 😭",
        "Just one chance? Pretty please? 🙏",
        "I'll do anything! Don't say no! 😢",
        "My heart can't take this! 💔💔",
        "You're killing me! Please say yes! 😭",
        "I'm begging you! 🙏🙏🙏",
        "NOOOOO! Change your mind! 🥺😿"
    ];

    let noClicks = 0;

    noBtn.addEventListener("click", () => {
        startMusic(); // Ensure music plays
        noClicks++;
        
        // Show sad cat gif
        sadGif.classList.remove("hidden");
        sadGif.src = catMemeGifs[noClicks % catMemeGifs.length];

        // Show pleading text
        if (noClicks <= pleadingMessages.length) {
            pleadingText.textContent = pleadingMessages[noClicks - 1];
        }

        // Shrink NO button more aggressively
        const newScale = Math.max(0.2, 1 - noClicks * 0.12);
        noBtn.style.transform = `scale(${newScale})`;

        // Move NO button away from YES button after 2nd click
        if (noClicks >= 2) {
            noBtn.style.position = "absolute";
            
            // Get positions of both buttons
            const yesRect = yesBtn.getBoundingClientRect();
            const questionRect = questionBox.getBoundingClientRect();
            
            // Calculate center of YES button relative to question box
            const yesCenterX = yesRect.left + yesRect.width / 2 - questionRect.left;
            const yesCenterY = yesRect.top + yesRect.height / 2 - questionRect.top;
            
            // Calculate distance and angle to move away from YES button
            const angle = Math.random() * Math.PI * 2; // Random angle
            const distance = 150 + (noClicks * 20); // Increase distance with each click
            
            // Calculate new position moving away from YES button
            let newX = yesCenterX + Math.cos(angle) * distance;
            let newY = yesCenterY + Math.sin(angle) * distance;
            
            // Keep button within bounds (with some padding)
            const maxX = questionRect.width - 80;
            const maxY = questionRect.height - 60;
            
            newX = Math.max(10, Math.min(newX, maxX));
            newY = Math.max(10, Math.min(newY, maxY));
            
            noBtn.style.left = newX + "px";
            noBtn.style.top = newY + "px";
        }

        // Grow YES button significantly
        yesBtn.style.transform = `scale(${1 + noClicks * 0.25})`;

        // Shake the screen
        document.body.style.animation = "shake 0.5s";
        setTimeout(() => {
            document.body.style.animation = "";
        }, 500);

        // Add more dramatic effects every 3 clicks
        if (noClicks % 3 === 0) {
            createSadEmojis();
        }

        // After 5 clicks, make YES button HUGE and irresistible
        if (noClicks >= 5) {
            yesBtn.style.fontSize = "24px";
            yesBtn.style.padding = "25px 50px";
            pleadingText.innerHTML = "PLEASE JUST CLICK YES! 😭😭😭<br>I CAN'T LIVE WITHOUT YOU!";
        }
    });

    // Shake animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
        }
    `;
    document.head.appendChild(style);

    /* BACK BUTTON */
    backBtn.addEventListener("click", () => {
        yesPage.classList.add("hidden");
        mainPage.classList.remove("hidden");
        window.scrollTo(0, 0);
    });

    /* MEMORY SLIDESHOW ON YES PAGE */
    const memoryImages = [
        { src: "assets/images/first.jpg", caption: "Our first date at the Skyranch 💕" },
        { src: "assets/images/fav.jpg", caption: "My favorite picture of you 💕" },
        { src: "assets/images/smile.jpg", caption: "Our first cake monthsary 🍽️" },
        { src: "assets/images/miming.jpg", caption: "Our first miming together 🌅" },
        { src: "assets/images/flower.jpg", caption: "My first flower pic of you 🤳" },
        { src: "assets/images/christmas.jpg", caption: "Our Christmas together 🎄" }
    ];

    let currentMemory = 0;
    const memoryImage = document.getElementById("memoryImage");
    const memoryCaption = document.getElementById("memoryCaption");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const dotsContainer = document.getElementById("dotsContainer");

    // Create dots
    memoryImages.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToMemory(index));
        dotsContainer.appendChild(dot);
    });

    function updateMemory() {
        memoryImage.style.opacity = 0;
        setTimeout(() => {
            memoryImage.src = memoryImages[currentMemory].src;
            memoryCaption.textContent = memoryImages[currentMemory].caption;
            memoryImage.style.opacity = 1;
            
            // Update dots
            document.querySelectorAll('.dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === currentMemory);
            });
        }, 300);
    }

    function goToMemory(index) {
        currentMemory = index;
        updateMemory();
    }

    prevBtn.addEventListener('click', () => {
        currentMemory = (currentMemory - 1 + memoryImages.length) % memoryImages.length;
        updateMemory();
    });

    nextBtn.addEventListener('click', () => {
        currentMemory = (currentMemory + 1) % memoryImages.length;
        updateMemory();
    });

    // Auto-advance memory slideshow every 5 seconds
    setInterval(() => {
        if (!yesPage.classList.contains('hidden')) {
            currentMemory = (currentMemory + 1) % memoryImages.length;
            updateMemory();
        }
    }, 5000);

    /* SAD EMOJIS FALLING */
    function createSadEmojis() {
        const emojis = ['😭', '💔', '😢', '😿', '🥺'];
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const emoji = document.createElement('div');
                emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                emoji.style.position = 'fixed';
                emoji.style.left = Math.random() * 100 + '%';
                emoji.style.top = '-50px';
                emoji.style.fontSize = '40px';
                emoji.style.zIndex = '9999';
                emoji.style.pointerEvents = 'none';
                document.body.appendChild(emoji);

                let pos = -50;
                const fall = setInterval(() => {
                    pos += 5;
                    emoji.style.top = pos + 'px';
                    if (pos > window.innerHeight) {
                        clearInterval(fall);
                        emoji.remove();
                    }
                }, 20);
            }, i * 50);
        }
    }

    /* FIREWORKS */
    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.vx = (Math.random() - 0.5) * 8;
            this.vy = (Math.random() - 0.5) * 8;
            this.alpha = 1;
            this.color = `hsl(${Math.random() * 60 + 300}, 100%, 70%)`; // Pink hues
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += 0.1; // gravity
            this.alpha -= 0.01;
        }

        draw() {
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    let particles = [];

    function launchFireworks() {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height * 0.5;
                for (let j = 0; j < 30; j++) {
                    particles.push(new Particle(x, y));
                }
            }, i * 200);
        }
    }

    function launchBigFireworks() {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height * 0.5;
                for (let j = 0; j < 50; j++) {
                    particles.push(new Particle(x, y));
                }
            }, i * 100);
        }
    }

    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.textContent = ['💕', '💗', '💖', '✨', '🐱', '❤️', '💝'][Math.floor(Math.random() * 7)];
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-50px';
        confetti.style.fontSize = '30px';
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        document.body.appendChild(confetti);

        let pos = -50;
        const fall = setInterval(() => {
            pos += 5;
            confetti.style.top = pos + 'px';
            confetti.style.transform = `rotate(${pos}deg)`;
            if (pos > window.innerHeight) {
                clearInterval(fall);
                confetti.remove();
            }
        }, 20);
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles = particles.filter(p => p.alpha > 0);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();

    // Resize canvas
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

});