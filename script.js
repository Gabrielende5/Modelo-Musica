// Declaração de Variáveis:
const player = document.querySelector("#player");
const musicName = document.querySelector("#musicName");
const playPauseButton = document.querySelector("#playPauseButton");
const prevButton = document.querySelector("#prevButton");
const nextButton = document.querySelector("#nextButton");
const currentTime = document.querySelector("#currentTime");
const duration = document.querySelector("#duration");
const progressBar = document.querySelector(".progress-bar");
const progress = document.querySelector(".progress");
//

import songs from "./songs.js";

const textButtonPlay = "<i class='bx bx-caret-right'></i>";
  // mostra o visual o botão de play
const textButtonPause = "<i class='bx bx-pause'></i>";
  // mostra o visual do botão de pause

let index = 0;
  // Variável para a musica inicial

prevButton.onclick = () => prevNextMusic("prev");
  // Ou seja, chama a função (prevNextMusic) ao clicar o prevButton ou nextButton, sendo que a função passa prev (voltar) quando o prevButton for clicado ou passa next (padrão da função) quando o prevButton for clicado
nextButton.onclick = () => prevNextMusic();

playPauseButton.onclick = () => playPause();
  // Dá função para o botão de pause 
//

const playPause = () => {
  if (player.paused) {// Se estiver pausada a musica:
    player.play(); // o botão de playPause terá a função de iniciar/voltar a musica
    playPauseButton.innerHTML = textButtonPause; // o botão de playPause terá o icone de play

  } else {// Se estiver rodando a musica
    player.pause(); // o botão de playPause terá a função de pausar a musica
    playPauseButton.innerHTML = textButtonPlay;  //o botão de playPause terá o icone de pause 
  }
};

player.ontimeupdate = () => updateTime();

const updateTime = () => {
  const currentMinutes = Math.floor(player.currentTime / 60);
    // Resumidamente ele pega o tempo atual (player.currentTime) e divide ele por 60, o resultado será arredondado pelo Math.floor, dando assim o currentMinutes
  const currentSeconds = Math.floor(player.currentTime % 60);
    // Mesma coisa, porém em segundos e em porcentagem
  currentTime.textContent = currentMinutes + ":" + formatZero(currentSeconds);
    // Pega os resultados dos calculos acima e junta eles com base na formula pedida (currentMinutes + ...)

  const durationFormatted = isNaN(player.duration) ? 0 : player.duration;
    // Formata a duração da musica, se n for um numero será 0 e se for um número será player.duration
  const durationMinutes = Math.floor(durationFormatted / 60);
  const durationSeconds = Math.floor(durationFormatted % 60);
  duration.textContent = durationMinutes + ":" + formatZero(durationSeconds);

  const progressWidth = durationFormatted
    ? (player.currentTime / durationFormatted) * 100 : 0; // Constante para o tamanho do progresso, sendo que se haver algum numero no progresso irá fazer o calculo (player.currentTime/duration....), se n (:) tiver número será zero  

  progress.style.width = progressWidth + "%"; // Estiliza o tamanho do progresso
};

const formatZero = (n) => (n < 10 ? "0" + n : n);
  // Ou seja, quando receber 1, 2, 3 ..., irá transforma em 01, 02, 03 ...

progressBar.onclick = (e) => { // Faz com que seja possível clicar em um progresso do aúdio e ir direto para ele
  const newTime = (e.offsetX / progressBar.offsetWidth) * player.duration; // Pega a posição na horizontal, divide pelo progresso e multiplica pela duração para dar o novo tempo de aúdio
  player.currentTime = newTime;
};

const prevNextMusic = (type = "next") => {  //função que volta ou passa a musica, por padrão essa função vai passar (next)
  if ((type == "next" && index + 1 === songs.length) || type === "init") {
    index = 0; // Caso seja a primeira musica ou caso seja a ultima musica (ou seja, o index será o tamanho da playlist - songs.length) e a pessoa clique para ir para a proxima musica, a playlist irá voltar para a primeira (index = 0)
  } else if (type == "prev" && index === 0) {
    index = songs.length; // Caso seja a primeira musica e a pessoa clique para ir à ultima musica, irá para a ultima musica
  } else {
    index = type === "prev" && index ? index - 1 : index + 1;
  }

  player.src = songs[index].src; //A tag de aúdio (player.src) vai pegar da biblioteca (song) a indentificação (src) da música selecionada (index)
  musicName.innerHTML = songs[index].name; //Mesma ideia do player.src, porém, em vez de pegar sua identificação, irá pegar o nome da música
  if (type !== "init") playPause(); //ou seja, se for diferente da musica inicial irá rodar a função playPause

  updateTime(); // Chamando a função updateTime
};

prevNextMusic("init");
  //Além de voltar ou passar a musica, ela terá a função de carregar a primeira musica, ou seja, init
//