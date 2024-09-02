// Seletores dos elementos
const mario = document.getElementById('mario');
const obstacles = document.querySelectorAll('.obstacle');
const flowers = document.querySelectorAll('.flower');
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const gameArea = document.getElementById('game'); 

let gameInterval;
let marioPosition = 50;
let collectedFlowers = 0;
let gameStarted = false;

function jump() {
    if (!mario || mario.classList.contains('jump')) return;

    mario.classList.add('jump');
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 1000);
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
    restartButton.style.display = 'none';
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
            alert(`Você gosta de vencer! Entregou ${collectedFlowers} cachorros-quentes para sua amada!`);
            if (restartButton) restartButton.style.display = 'block';
        }
    }, 20);
}

function resetGame() {
    if (!mario || !startButton || !restartButton) return;

    marioPosition = 50;
    collectedFlowers = 0;
    gameStarted = false;

    if (mario) mario.style.left = marioPosition + 'px';
    obstacles.forEach(obstacle => obstacle.style.display = 'block');
    flowers.forEach(flower => flower.style.display = 'block');

    restartButton.style.display = 'none';
    startButton.style.display = 'block';
}

document.addEventListener('keydown', (event) => {
    if ((event.code === 'KeyW' || event.code === 'ArrowUp') && gameStarted) {
        jump();
    }
});

gameArea.addEventListener('click', () => {
    if (gameStarted) {
        jump();
    }
});

if (startButton) startButton.addEventListener('click', startGame);
if (restartButton) restartButton.addEventListener('click', resetGame);
