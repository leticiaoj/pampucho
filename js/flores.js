// Seletores dos elementos
const mario = document.getElementById('mario');
const obstacles = document.querySelectorAll('.obstacle');
const flowers = document.querySelectorAll('.flower');
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const gameArea = document.getElementById('game'); // Seleciona a área do jogo

// Variáveis do jogo
let gameInterval;
let marioPosition = 50; // Posição inicial de Mario
let collectedFlowers = 0;
let gameStarted = false;

function jump() {
    if (!mario || mario.classList.contains('jump')) return;

    mario.classList.add('jump');
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 1000); // Duração do pulo
}

function checkCollision(mario, object) {
    if (!mario || !object) return false;

    const marioRect = mario.getBoundingClientRect();
    const objectRect = object.getBoundingClientRect();

    return (
        marioRect.left < objectRect.left + objectRect.width &&
        marioRect.left + marioRect.width > objectRect.left &&
        marioRect.top < objectRect.top + objectRect.height &&
        marioRect.top + marioRect.height > objectRect.top
    );
}

function startGame() {
    if (!startButton || !restartButton) return;

    gameStarted = true;
    startButton.style.display = 'none';
    restartButton.style.display = 'none'; // Esconde o botão de reiniciar ao iniciar o jogo
    gameInterval = setInterval(() => {
        marioPosition += 2;
        if (mario) mario.style.left = marioPosition + 'px';

        obstacles.forEach(obstacle => {
            if (checkCollision(mario, obstacle) && !mario.classList.contains('jump')) {
                alert('Chapou, veinho! Você tropeçou em um pombo e ele comeu todas as migalhas de cachorro-quente. Tente novamente, sua namorada está com fome!');
                clearInterval(gameInterval);
                if (restartButton) restartButton.style.display = 'block';
            }
        });

        flowers.forEach(flower => {
            if (checkCollision(mario, flower)) {
                flower.style.display = 'none';
                collectedFlowers++;
            }
        });

        if (marioPosition > window.innerWidth - 100) {
            clearInterval(gameInterval);
            alert(`Você venceu! Entregou ${collectedFlowers} cachorros-quentes para sua amada!`);
            if (restartButton) restartButton.style.display = 'block';
        }
    }, 20);
}

function resetGame() {
    if (!mario || !startButton || !restartButton) return;

    // Redefinir as variáveis do jogo
    marioPosition = 50;
    collectedFlowers = 0;
    gameStarted = false;

    // Redefinir a posição e visibilidade dos elementos
    if (mario) mario.style.left = marioPosition + 'px';
    obstacles.forEach(obstacle => obstacle.style.display = 'block');
    flowers.forEach(flower => flower.style.display = 'block');

    // Ajustar botões de controle
    restartButton.style.display = 'none';
    startButton.style.display = 'block';
}

// Evento de teclado para o pulo
document.addEventListener('keydown', (event) => {
    if ((event.code === 'KeyW' || event.code === 'ArrowUp') && gameStarted) {
        jump();
    }
});

// Evento de clique para pular (para dispositivos móveis)
gameArea.addEventListener('click', () => {
    if (gameStarted) {
        jump();
    }
});

// Adiciona eventos aos botões de início e reinício
if (startButton) startButton.addEventListener('click', startGame);
if (restartButton) restartButton.addEventListener('click', resetGame);
