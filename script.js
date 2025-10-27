// Seleciona os elementos do HTML
const mario = document.querySelector('.mario'); // imagem do Mario
const pipe = document.querySelector('.pipe');   // imagem do cano
const scoreElement = document.querySelector('.score'); // área onde mostraremos a pontuação

const bgMusic = document.getElementById('music');

document.addEventListener('keydown', () => {
    if (!isGameOver && bgMusic.paused) {
        bgMusic.play();
    }
});

let score = 0;           // variável que guarda a pontuação
let isGameOver = false;  // controle para saber se o jogo acabou

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

        mario.src = 'game-over.png'; // troca a imagem do Mario
        mario.style.width = '100px';
        mario.style.marginLeft = '50px';

        isGameOver = true; // marca que o jogo acabou
        clearInterval(loop); // para o loop principal

        const gameOverImage = document.querySelector('.game-over');

        gameOverImage.style.display = 'block';
        
        // Mostra mensagem de fim de jogo
        scoreElement.textContent = `Score final: ${score}`;

        bgMusic.pause();
        bgMusic.currentTime = 0;

        document.addEventListener('keydown', () => location.reload()); // reinicia o jogo ao pressionar qualquer tecla
    } else if (!isGameOver) {
        // Se o jogo ainda estiver ativo, aumenta a pontuação
        score += 1;
        updateScore(); // atualiza o texto na tela

    }
     
}, 10);


function addEventListener(func) {
    document.addEventListener('keydown', (event) => {
        if (event.code === "Space") {
            func();
        }
    });
    document.addEventListener('touchstart', func);
    document.addEventListener('touchbegan', func);
}

addEventListener(jump);
