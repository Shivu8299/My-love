document.addEventListener('DOMContentLoaded', () => {

    // ===================================================================
    // == ✅ YOUR PERSONAL CONTENT HAS BEEN ADDED BELOW               ==
    // ===================================================================

    const letterDetails = {
        to: "Dear Bhavya,",
        body: "Sometimes words aren't enough to say how much you mean to me. You're my brightest star and my best friend. This is just a little something to show you how much I care.",
        from: "Yours always, Shivshant"
    };

    const galleryImages = [
        { src: "https://i.ibb.co/L09GZ6g/image.png", caption: "Every moment with you is my favorite 💕" },
        { src: "https://i.ibb.co/Fbfdvv7/image.png", caption: "The perfect partner in crime 😊" },
        { src: "https://i.ibb.co/yQj9d9h/image.png", caption: "You make my world so colorful ✨" }
    ];
    
    const notesContent = [
        { front: "Are you a magician? ✨", back: "Because whenever I look at you, everyone else disappears." },
        { front: "Just a reminder... 🥰", back: "You're the best thing that ever happened to me." },
        { front: "If I had one wish... ☀️", back: "It would be to make you happy every single day." }
    ];

    const playlistSongs = [
        { title: "Kesariya", artist: "Arijit Singh", src: "https://files.catbox.moe/r9pltd.mp3", img: "https://i.ibb.co/L09GZ6g/image.png" },
        { title: "Maan Meri Jaan", artist: "King", src: "https://files.catbox.moe/quqfx4.mp3", img: "https://i.ibb.co/Fbfdvv7/image.png" },
        { title: "Apna Bana Le", artist: "Arijit Singh", src: "https://files.catbox.moe/m5qdp0.mp3", img: "https://i.ibb.co/yQj9d9h/image.png" }
    ];
    
    const gameWinMessage = "You are the best my lovely Bhavya";

    // ===================================================================
    // == END OF PERSONAL CONTENT SECTION                             ==
    // ===================================================================


    // --- Envelope Animation ---
    const openBtn = document.getElementById('open-btn');
    const envelopeWrapper = document.querySelector('.envelope-wrapper');
    const mainContent = document.getElementById('main-content');
    
    openBtn.addEventListener('click', () => {
        envelopeWrapper.classList.add('open');
        setTimeout(() => {
            document.getElementById('envelope-container').classList.add('hidden');
            mainContent.classList.remove('hidden');
        }, 1500);
    });

    // --- Letter Modal ---
    const readLetterBtn = document.getElementById('read-letter-btn');
    const letterModal = document.getElementById('letter-modal');
    const closeLetterBtn = document.getElementById('close-letter-btn');
    const letterContent = document.getElementById('letter-content');
    
    letterContent.innerHTML = `<h2>${letterDetails.to}</h2><p>${letterDetails.body}</p><h3>${letterDetails.from}</h3>`;
    readLetterBtn.addEventListener('click', () => letterModal.classList.remove('hidden'));
    closeLetterBtn.addEventListener('click', () => letterModal.classList.add('hidden'));

    // --- Gallery Swiper ---
    const galleryWrapper = document.querySelector('#gallery-swiper .swiper-wrapper');
    galleryImages.forEach(img => {
        galleryWrapper.innerHTML += `<div class="swiper-slide"><img src="${img.src}" alt="Gallery Image"><p>${img.caption}</p></div>`;
    });
    new Swiper('#gallery-swiper', { loop: true });

    // --- Little Notes ---
    const notesGrid = document.querySelector('.notes-grid');
    notesContent.forEach((note, index) => {
        const noteEl = document.createElement('div');
        noteEl.classList.add('note', `note${(index % 3) + 1}`);
        noteEl.innerHTML = `<div class="front">${note.front}</div><div class="back">${note.back}</div>`;
        noteEl.addEventListener('click', () => noteEl.classList.toggle('flipped'));
        notesGrid.appendChild(noteEl);
    });

    // --- Playlist Swiper & Logic ---
    const playlistWrapper = document.querySelector('#playlist-swiper .swiper-wrapper');
    const audioPlayer = document.getElementById('audio-player');
    
    playlistSongs.forEach(song => {
        playlistWrapper.innerHTML += `
            <div class="swiper-slide playlist-slide">
                <img src="${song.img}" alt="Album Art">
                <h4>${song.title}</h4>
                <p>${song.artist}</p>
                <button class="play-song-btn" data-src="${song.src}">Play</button>
            </div>`;
    });
    new Swiper('#playlist-swiper', { slidesPerView: 'auto', spaceBetween: 15, centeredSlides: true });
    
    playlistWrapper.addEventListener('click', (e) => {
        if (e.target.classList.contains('play-song-btn')) {
            const songSrc = e.target.dataset.src;
            if (audioPlayer.src === songSrc && !audioPlayer.paused) {
                audioPlayer.pause();
                e.target.textContent = 'Play';
            } else {
                audioPlayer.src = songSrc;
                audioPlayer.play();
                document.querySelectorAll('.play-song-btn').forEach(btn => btn.textContent = 'Play');
                e.target.textContent = 'Now Playing...';
            }
        }
    });

    // --- Game Logic ---
    const playGameBtn = document.getElementById('play-game-btn');
    const gameModal = document.getElementById('game-modal');
    const gameIntro = document.getElementById('game-intro');
    const gameAreaWrapper = document.getElementById('game-area-wrapper');
    const gameComplete = document.getElementById('game-complete');
    const closeGameBtns = document.querySelectorAll('#close-game-btn, #end-game-btn');
    const startGameBtn = document.getElementById('start-game-btn');
    const gameArea = document.getElementById('game-area');
    const scoreEl = document.getElementById('score');
    const timeEl = document.getElementById('time');
    
    let score = 0, timer = 30, gameInterval;

    playGameBtn.addEventListener('click', () => gameModal.classList.remove('hidden'));
    closeGameBtns.forEach(btn => btn.addEventListener('click', () => {
        gameModal.classList.add('hidden');
        clearInterval(gameInterval);
        gameIntro.classList.remove('hidden');
        gameAreaWrapper.classList.add('hidden');
        gameComplete.classList.add('hidden');
    }));
    
    startGameBtn.addEventListener('click', () => {
        gameIntro.classList.add('hidden');
        gameAreaWrapper.classList.remove('hidden');
        startGame();
    });

    function startGame() {
        score = 0; timer = 30;
        scoreEl.textContent = score; timeEl.textContent = timer;
        gameArea.innerHTML = '';
        
        gameInterval = setInterval(() => {
            timer--;
            timeEl.textContent = timer;
            if (timer <= 0) endGame();
            
            if (Math.random() > 0.1) {
                createGameItem('heart');
            } else {
                createGameItem('kitty');
            }

        }, 800);
    }

    function createGameItem(type) {
        const item = document.createElement('div');
        item.classList.add('game-item');
        item.innerHTML = `<img src="${type === 'heart' ? 'https://i.ibb.co/Wv5p02p/heart-icon.png' : 'https://i.ibb.co/dG7p5hV/hello-kitty-peek.png'}">`;
        item.style.left = `${Math.random() * 85}%`;
        item.style.animationDuration = `${(Math.random() * 2) + 3}s`;
        
        item.addEventListener('click', () => {
            item.remove();
            if (type === 'heart') {
                score++;
            } else { 
                score += 3;
                timer += 5;
            }
            scoreEl.textContent = score;
            if (score >= 15) endGame();
        });
        
        gameArea.appendChild(item);
        setTimeout(() => { if(item) item.remove() }, 5000);
    }
    
    function endGame() {
        clearInterval(gameInterval);
        gameAreaWrapper.classList.add('hidden');
        gameComplete.classList.remove('hidden');
        document.getElementById('game-result-message').textContent = score >= 15 ? gameWinMessage : "Oh no, time's up! Try again!";
    }
});
