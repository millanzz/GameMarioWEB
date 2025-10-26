// Seleciona os elementos do HTML
const mario = document.querySelector('.mario'); // imagem do Mario
const pipe = document.querySelector('.pipe');   // imagem do cano
const scoreElement = document.querySelector('.score'); // área onde mostraremos a pontuação

const bgMusic = document.getElementById('music'); // música de fundo

addEventListener(() => { // inicia a música ao pressionar qualquer tecla
    if (!isGameOver && bgMusic.paused) {
        bgMusic.play();
    }
});

let score = 0;           // variável que guarda a pontuação
let isGameOver = false;  // controle para saber se o jogo acabou

let pipeSpeed = 1.5; // velocidade inicial do cano
const pipeSpeedMin = 0.9; // velocidade minima do cano

pipe.style.animation = `pipe_animation ${pipeSpeed}s linear infinite`; // aplica a velocidade inicial ao cano

// Função responsável por fazer o Mario "pular"
const jump = () => {
    if (isGameOver) return; // impede o pulo se o jogo acabou

    mario.classList.add('jump'); // adiciona a classe que aplica a animação de pulo

    // remove a classe depois de 500ms (tempo do pulo)
    setTimeout(() => {
        mario.classList.remove('jump');
        }, 500);
    };

// Função para atualizar o placar
    const updateScore = () => {
    // Atualiza o texto do placar
      scoreElement.textContent = `Score: ${score}`;
    };

// Cria um loop que roda a cada 10ms (para verificar colisão e atualizar pontuação)
    const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft; // posição do cano no eixo X
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', ''); // posição vertical do Mario

    // Detecta colisão: quando o cano está perto e o Mario está baixo
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        pipe.style.animation = 'none'; // para a animação do cano
        pipe.style.left = `${pipePosition}px`; // congela o cano na posição atual

        mario.src = './imagens/game-over.png'; // troca a imagem do Mario
        mario.style.width = '100px';
        mario.style.marginLeft = '50px';

        isGameOver = true; // marca que o jogo acabou
        clearInterval(loop); // para o loop principal

        const gameOverImage = document.querySelector('.game-over'); // seleciona a imagem de game over

        gameOverImage.style.display = 'block'; // mostra a imagem de game over

        // Mostra mensagem de fim de jogo
        scoreElement.textContent = `Score final: ${score}`;

        bgMusic.pause(); // pausa a música de fundo
        bgMusic.currentTime = 0; // reinicia a música

        addEventListener(() => location.reload()); // reinicia o jogo ao pressionar qualquer tecla
    } else if (!isGameOver) {
        // Se o jogo ainda estiver ativo, aumenta a pontuação
        score += 1;
        updateScore(); // atualiza o texto na tela

        if (score % 1000 === 0 && pipeSpeed > pipeSpeedMin) { // a cada 1000 pontos, aumenta a velocidade do cano
            pipeSpeed -= 0.05; // acelera um pouco
            pipe.style.animationDuration = `${pipeSpeed}s`;
        }
    }
     
}, 10);

// Aumenta a valocidade do jogo ao longo do tempo
const difficultyIncrease = setInterval(() => {
    if (!isGameOver && pipeSpeed > pipeSpeedMin) {
        pipeSpeed -= 0.01; // aceleração mais suave com o tempo
        pipe.style.animationDuration = `${pipeSpeed}s`;
    } else if (isGameOver) {
        clearInterval(difficultyIncrease); // para a aceleração se o jogo acabou
    }
}, 7000); // a cada 7 segundos, aumenta um pouco a dificuldade


function addEventListener(func) {
    document.addEventListener('keydown', func);
    document.addEventListener('touchstart', func);
    document.addEventListener('touchbegan', func);
}

addEventListener(jump);

