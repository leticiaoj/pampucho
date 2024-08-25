const gameArea = document.getElementById('gameArea');
const spaceship = document.getElementById('spaceship');
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
const gameMessage = document.getElementById('gameMessage');
const spaceshipSpeed = 10;
const bulletSpeed = 10; // Velocidade da bala
const maxZombies = 20; // Número total de zumbis a serem criados
let zombies = [];
let bullets = [];
let zombieCount = 0; // Contador de zumbis criados
let gameStarted = false; // Verifica se o jogo foi iniciado

// Função para iniciar o jogo
function startGame() {
    startButton.style.display = 'none';
    gameMessage.textContent = '';
    gameStarted = true;
    zombieCount = 0; // Reinicia o contador de zumbis
    zombies.forEach(zombie => zombie.remove());
    bullets.forEach(bullet => bullet.remove());
    zombies = [];
    bullets = [];
    createInitialZombies();
    setInterval(createZombie, 2000);
    setInterval(moveObjects, 20);
    document.addEventListener('keydown', handleKeyDown); // Reativa o listener de teclas
}

// Função para criar os primeiros zumbis
function createInitialZombies() {
    for (let i = 0; i < 5; i++) { // Inicialmente criar 5 zumbis para começar
        createZombie();
    }
}

// Função para criar e atirar um projétil
function shoot() {
    if (!gameStarted) return; // Ignorar se o jogo não foi iniciado
    const bullet = document.createElement('div');
    bullet.classList.add('bullet');
    // Posicionar a bala na posição inicial correta
    bullet.style.left = `${spaceship.offsetLeft + spaceship.offsetWidth / 2 - 2.5}px`;
    bullet.style.bottom = `${gameArea.offsetHeight - (spaceship.offsetTop + spaceship.offsetHeight + 20)}px`; // Ajusta a posição vertical
    gameArea.appendChild(bullet);
    bullets.push(bullet);
}

// Função para criar zumbis
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

// Função para mover os projéteis e zumbis
function moveObjects() {
    bullets.forEach((bullet, bulletIndex) => {
        // Mover a bala para cima
        const currentBottom = parseFloat(window.getComputedStyle(bullet).bottom);
        bullet.style.bottom = `${currentBottom + bulletSpeed}px`;

        // Remover o projétil se sair da tela
        if (currentBottom > gameArea.offsetHeight) {
            bullet.remove();
            bullets.splice(bulletIndex, 1);
        }

        // Verificar colisão com zumbis
        zombies.forEach((zombie, zombieIndex) => {
            if (isCollision(bullet, zombie)) {
                zombie.remove();
                bullet.remove();
                bullets.splice(bulletIndex, 1);
                zombies.splice(zombieIndex, 1);
                checkGameOver(); // Verifica se o jogo terminou
            }
        });
    });

    zombies.forEach((zombie, zombieIndex) => {
        const currentTop = parseFloat(window.getComputedStyle(zombie).top);
        zombie.style.top = `${currentTop + 1}px`;

        // Remover o zumbi se sair da tela
        if (currentTop > gameArea.offsetHeight) {
            zombie.remove();
            zombies.splice(zombieIndex, 1);
            checkGameOver(); // Verifica se o jogo terminou
        }
    });
}

// Função para detectar colisão
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

// Função para verificar se o jogo terminou
function checkGameOver() {
    if (zombies.length === 0) {
        gameOver('Parabéns! Você derrotou todos os nóias e salvou a sua mulher!');
    }
}

// Função para exibir a mensagem de fim de jogo
function gameOver(message) {
    const gameOverMessage = document.createElement('div');
    gameOverMessage.classList.add('game-over');
    gameOverMessage.textContent = message;
    gameMessage.appendChild(gameOverMessage);
    restartButton.style.display = 'block'; // Exibir o botão de reinício
    
    // Desabilitar movimentos e tiros
    document.removeEventListener('keydown', handleKeyDown);
}

// Função para reiniciar o jogo
function restartGame() {
    gameMessage.textContent = '';
    restartButton.style.display = 'none';
    startGame(); // Reiniciar o jogo
}

// Função para lidar com eventos de tecla
function handleKeyDown(e) {
    const spaceshipLeft = spaceship.offsetLeft;

    if ((e.code === 'ArrowLeft' || e.code === 'KeyA') && spaceshipLeft > 0) {
        spaceship.style.left = `${spaceshipLeft - spaceshipSpeed}px`;
    } else if ((e.code === 'ArrowRight' || e.code === 'KeyD') && spaceshipLeft < gameArea.offsetWidth - spaceship.offsetWidth) {
        spaceship.style.left = `${spaceshipLeft + spaceshipSpeed}px`;
    }

    // Atirar
    if ((e.code === 'Space' || e.code === 'KeyW' || e.code === 'ArrowUp')) {
        shoot();
    }
}

// Adiciona eventos aos botões
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);
