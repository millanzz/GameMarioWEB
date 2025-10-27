// Seleciona os elementos do HTML
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const scoreElement = document.querySelector('.score');
const bgMusic = document.getElementById('music');
const gameOverImage = document.querySelector('.game-over');

let score = 0;
let isGameOver = false;

// Controle de velocidade do cano
let pipeSpeed = 1.5; 
const pipeSpeedMin = 0.9;

// Aplica a velocidade inicial da animação
pipe.style.animation = `pipe_animation ${pipeSpeed}s linear infinite`;

//  Toca a música de fundo ao pressionar tecla ou tocar na tela
addGameControls(() => {
    if (!isGameOver && bgMusic.paused) bgMusic.play();
});

// Função de pulo
const jump = () => {
    if (isGameOver) return;
    mario.classList.add('jump');
    setTimeout(() => mario.classList.remove('jump'), 500);
};

// Atualiza o placar
const updateScore = () => {
    scoreElement.textContent = `Score: ${score}`;
};

// Loop principal — detecta colisão e pontuação
const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    // Detecta colisão
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        // Para animação
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.src = './imagens/game-over.png';
        mario.style.width = '100px';
        mario.style.marginLeft = '50px';

        isGameOver = true;
        clearInterval(loop);

        // Mostra imagem de Game Over
        gameOverImage.style.display = 'block';
        scoreElement.textContent = `Score final: ${score}`;

        // Para música
        bgMusic.pause();
        bgMusic.currentTime = 0;

        // Permite reiniciar o jogo
        addGameControls(() => location.reload());
    } 
    else if (!isGameOver) {
        // Aumenta a pontuação
        score++;
        updateScore();
        
    }
}, 10);



//  Função que adiciona controles do jogador
function addGameControls(func) {
    document.addEventListener('keydown', (event) => {
        if (event.code === "Space") func();
    });
    document.addEventListener('touchstart', func);
    document.addEventListener('touchbegan', func);
}

addGameControls(jump);
