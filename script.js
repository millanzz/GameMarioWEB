// === Seleção dos elementos ===
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const scoreElement = document.querySelector('.score');
const bgMusic = document.getElementById('music');
const gameOverImage = document.querySelector('.game-over');
const startBtn = document.getElementById('start-btn');

// === Variáveis de controle ===
let score = 0;
let isGameOver = false;
let gameStarted = false;
let loop;

// === Velocidade inicial do cano ===
let pipeSpeed = 1.5; 
const pipeSpeedMin = 0.9;
pipe.style.animation = `pipe_animation ${pipeSpeed}s linear infinite`;

// === Inicia ou reinicia o jogo ===
function startGame() {
    score = 0;
    isGameOver = false;
    gameStarted = true;
    pipeSpeed = 1.5;

    scoreElement.textContent = "Score: 0";
    gameOverImage.style.display = 'none';
    pipe.style.animation = `pipe_animation ${pipeSpeed}s linear infinite`;

    // Reseta posições
    pipe.style.left = '';
    mario.src = 'mario.gif';
    mario.style.width = '150px';
    mario.style.marginLeft = '0';

    startBtn.style.display = 'none';

    bgMusic.currentTime = 0;
    bgMusic.play();

    clearInterval(loop);


    startLoops();
}

// === Pulo do Mario ===
const jump = () => {
    if (!gameStarted || isGameOver) return;
    mario.classList.add('jump');
    setTimeout(() => mario.classList.remove('jump'), 500);
};

// === Atualiza o placar ===
const updateScore = () => {
    scoreElement.textContent = `Score: ${score}`;
};

// === Loop principal e de colisão ===
function startLoops() {
    loop = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

        // Colisão
        if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;

            mario.src = 'game-over.png';
            mario.style.width = '100px';
            mario.style.marginLeft = '50px';

            isGameOver = true;
            clearInterval(loop);

            gameOverImage.style.display = 'block';
            startBtn.style.top = "60%";
            startBtn.textContent = "🔁 Reset";
            startBtn.style.display = 'block';

            bgMusic.pause();
            bgMusic.currentTime = 0;
        } 
        // Pontuação e aceleração
        else if (!isGameOver) {
            score++;
            updateScore();

        
        }
    }, 10);

}

// === Controles do jogador ===
function addGameControls(func) {
    document.addEventListener('keydown', (event) => {
        if (event.code === "Space") func();
    });
    document.addEventListener('touchstart', func);
    document.addEventListener('touchbegan', func);
}

addGameControls(jump);

// === Botão Iniciar / Reiniciar ===
startBtn.addEventListener('click', startGame);
