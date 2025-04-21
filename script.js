const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');

const jump = () => {
 mario.classList.add('jump');

 setTimeout(() =>{
    mario.classList.remove('jump');
 }, 500);
}

const loop = setInterval(() => {

    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if(pipePosition <= 120 && pipePosition > 0 && marioPosition < 80){
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        pipe.style.animation = 'none';
        pipe.style.buttom = `${marioPosition}px`;

        mario.src = './imagens/game-over.png';
        mario.style.width = '100px'
        mario.style.marginLeft = '50px'
        mario.classList.add('jump');
        
        clearInterval(loop);
    }
   
},10);

document.addEventListener('keydown', jump);
