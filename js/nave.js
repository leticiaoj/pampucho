const gameArea = document.getElementById('gameArea');
const spaceship = document.getElementById('spaceship');
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
const gameMessage = document.getElementById('gameMessage');
const leftButton = document.getElementById('leftButton');
const rightButton = document.getElementById('rightButton');
const shootButton = document.getElementById('shootButton');
const spaceshipSpeed = 10;
const bulletSpeed = 10;
const maxZombies = 20;
let zombies = [];
let bullets = [];
let zombieCount = 0; 
let gameStarted = false; 


function startGame() {
    startButton.style.display = 'none';
    restartButton.style.display = 'none';
    gameMessage.textContent = '';
    gameStarted = true;
    zombieCount = 0;
    zombies.forEach(zombie => zombie.remove());
    bullets.forEach(bullet => bullet.remove());
    zombies = [];
    bullets = [];
    createInitialZombies();
    setInterval(createZombie, 2000);
    setInterval(moveObjects, 20);
    document.addEventListener('keydown', handleKeyDown); 
}


function createInitialZombies() {
    for (let i = 0; i < 10; i++) { 
        createZombie();
    }
}

function shoot() {
    if (!gameStarted) return;
    const bullet = document.createElement('div');
    bullet.classList.add('bullet');
    bullet.style.left = `${spaceship.offsetLeft + spaceship.offsetWidth / 2 - 2.5}px`;
    bullet.style.bottom = `${gameArea.offsetHeight - (spaceship.offsetTop + spaceship.offsetHeight + 20)}px`; // Ajusta a posição vertical
    gameArea.appendChild(bullet);
    bullets.push(bullet);
}


function createZombie() {
    if (zombieCount < maxZombies) {
        const zombie = document.createElement('div');
        zombie.classList.add('zombie');
        zombie.style.left = `${Math.random() * (gameArea.offsetWidth - 60)}px`;
        zombie.style.top = '0px';
        gameArea.appendChild(zombie);
        zombies.push(zombie);
        zombieCount++;
    }
}

function moveObjects() {
    bullets.forEach((bullet, bulletIndex) => {

        const currentBottom = parseFloat(window.getComputedStyle(bullet).bottom);
        bullet.style.bottom = `${currentBottom + bulletSpeed}px`;

        if (currentBottom > gameArea.offsetHeight) {
            bullet.remove();
            bullets.splice(bulletIndex, 1);
        }

        zombies.forEach((zombie, zombieIndex) => {
            if (isCollision(bullet, zombie)) {
                zombie.remove();
                bullet.remove();
                bullets.splice(bulletIndex, 1);
                zombies.splice(zombieIndex, 1);
                checkGameOver();
            }
        });
    });

    zombies.forEach(zombie => {
        const currentTop = parseFloat(window.getComputedStyle(zombie).top);
        zombie.style.top = `${currentTop + 1}px`;

        if (currentTop > gameArea.offsetHeight) {
            zombie.remove();
            zombies = zombies.filter(z => z !== zombie);
            zombieCount--;
            checkGameOver();
        }
    });
}

function isCollision(bullet, zombie) {
    const bulletRect = bullet.getBoundingClientRect();
    const zombieRect = zombie.getBoundingClientRect();
    return (
        bulletRect.left < zombieRect.right &&
        bulletRect.right > zombieRect.left &&
        bulletRect.top < zombieRect.bottom &&
        bulletRect.bottom > zombieRect.top
    );
}

function checkGameOver() {
    if (zombies.length === 0) {
        gameOver('Você gosta de vencer! Você derrotou os nóias e salvou a sua mulher!');
    }
}

function gameOver(message) {
    const gameOverMessage = document.createElement('div');
    gameOverMessage.classList.add('game-over');
    gameOverMessage.textContent = message;
    gameMessage.appendChild(gameOverMessage);
    restartButton.style.display = 'block'; 
    gameStarted = false;
    document.removeEventListener('keydown', handleKeyDown);
}


function restartGame() {
    gameMessage.textContent = '';
    restartButton.style.display = 'none';
    startGame(); 
}

function handleKeyDown(e) {
    const spaceshipLeft = spaceship.offsetLeft;

    if ((e.code === 'ArrowLeft' || e.code === 'KeyA') && spaceshipLeft > 0) {
        spaceship.style.left = `${spaceshipLeft - spaceshipSpeed}px`;
    } else if ((e.code === 'ArrowRight' || e.code === 'KeyD') && spaceshipLeft < gameArea.offsetWidth - spaceship.offsetWidth) {
        spaceship.style.left = `${spaceshipLeft + spaceshipSpeed}px`;
    }

    if ((e.code === 'Space' || e.code === 'KeyW' || e.code === 'ArrowUp')) {
        shoot();
    }
}


function handleTouchStart(e) {
    const touch = e.touches[0];
    const touchX = touch.clientX;

    if (touchX < window.innerWidth / 3) {
        moveLeft();
    } else if (touchX > window.innerWidth * 2 / 3) {
        moveRight();
    } else {
        shoot();
    }
}

function moveLeft() {
    const spaceshipLeft = spaceship.offsetLeft;
    if (spaceshipLeft > 0) {
        spaceship.style.left = `${spaceshipLeft - spaceshipSpeed}px`;
    }
}

function moveRight() {
    const spaceshipLeft = spaceship.offsetLeft;
    if (spaceshipLeft < gameArea.offsetWidth - spaceship.offsetWidth) {
        spaceship.style.left = `${spaceshipLeft + spaceshipSpeed}px`;
    }
}

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);

document.addEventListener('touchstart', handleTouchStart);

leftButton.addEventListener('click', moveLeft);
rightButton.addEventListener('click', moveRight);
shootButton.addEventListener('click', shoot);

function handleClickAnywhere(e) {
    if (!gameStarted) {
        startGame();
        document.removeEventListener('click', handleClickAnywhere);
    }
}

document.addEventListener('click', handleClickAnywhere);
