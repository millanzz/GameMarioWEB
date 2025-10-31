// Seleciona os elementos do HTML
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const scoreElement = document.querySelector('.score');
const gameOverImage = document.querySelector('.game-over');
const bgMusic = document.getElementById('music');
const deathSound = document.getElementById('deathSound');

// Botão de iniciar/reiniciar o jogo
const startBtn = document.getElementById('start-btn');

let score = 0;
let isGameOver = false;
let gameStarted = false; // controla se o jogo já começou


// Toca a música apenas depois do jogo iniciar
addGameControls(() => {
    if (gameStarted && !isGameOver && bgMusic.paused) bgMusic.play();
});


// Inicia ou reinicia o jogo
function startGame() {
    gameStarted = true;  // habilita o início
    isGameOver = false;  // limpa estado de game over
    score = 0;           
    scoreElement.textContent = "Score: 0";

    // limpa tela de game over
    gameOverImage.style.display = 'none';

    // reseta pipe
    pipe.style.animation = 'pipe_animation 1.5s linear infinite';
    pipe.style.left = ''; 
    pipe.style.display = 'block'; // mostra o pipe

    // reseta mario
    mario.src = 'mario.gif';
    mario.style.width = '150px';
    mario.style.marginLeft = '0';

    // reinicia música
    bgMusic.currentTime = 0;
    bgMusic.play();
    deathSound.pause();
    deathSound.currentTime = 0;

    // remove botão
    startBtn.style.display = 'none';
}


// Função de pulo
const jump = () => {
    if (!gameStarted || isGameOver) return; // bloqueia antes do start
    mario.classList.add('jump');
    setTimeout(() => mario.classList.remove('jump'), 500);
};


// Atualiza texto do score
const updateScore = () => {
    scoreElement.textContent = `Score: ${score}`;
};


// Loop principal (roda o jogo)
const loop = setInterval(() => {

    if (!gameStarted) return; // só roda depois do start
    if (isGameOver) return;   // para tudo ao perder

    if (!gameStarted) {
        pipe.style.animation = 'none'; // impede animação antes do start
        return;
    }

    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    // Verifica colisão
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.src = 'game-over.png';
        mario.style.width = '100px';
        mario.style.marginLeft = '50px';

        isGameOver = true;

        // mostra tela de game over
        gameOverImage.style.display = 'block';
        scoreElement.textContent = `Score final: ${score}`;

        bgMusic.pause();
        bgMusic.currentTime = 0;

        deathSound.currentTime = 0.8;
        deathSound.play();

        // mostra botão de reset
        startBtn.textContent = "🔁 Reset";
        startBtn.style.top = '60%';
        startBtn.style.display = "block";

    } else if (!isGameOver) {
        score++;    // aumenta pontuação
        updateScore();
    }

}, 10);


// Adiciona controles (espaço ou toque para pular)
function addGameControls(func) {
    document.addEventListener('keydown', (event) => {
        if (event.code === "Space") func();
    });
    document.addEventListener('touchstart', func);
    document.addEventListener('touchbegan', func);
}

addGameControls(jump);


// Clique do botão de Start / Reset
startBtn.addEventListener('click', startGame);


