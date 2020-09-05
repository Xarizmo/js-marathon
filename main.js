import Pokemon from './pokemon.js';
import random from './utils.js';
import { pokemons } from './pokemons.js';

const $control = document.querySelector('.control');
const $logs = document.querySelector('.logs');
let player1, player2;

function renderStartBtn(name) {
  $control.innerHTML = '';
  const $startBtn = document.createElement('button');
  $startBtn.classList.add('button');
  $startBtn.innerText = name;
  $startBtn.addEventListener('click', startGame);
  $control.appendChild($startBtn);
}

renderStartBtn('Start game');

function startGame() {
  $control.innerHTML = '';
  $logs.innerHTML = '';
  renderPlayers();
  renderAttackBtns();
}

function renderPlayers() {
  const randomPokemonPlayer1 = pokemons[random(pokemons.length - 1)];
  const filteredPokemons = pokemons.filter(i => i !== randomPokemonPlayer1);
  const randomPokemonPlayer2 = filteredPokemons[random(filteredPokemons.length - 1)];
  
  player1 = new Pokemon({
    ...randomPokemonPlayer1,
    selectors: 'player1',
  });
  
  player2 = new Pokemon({
    ...randomPokemonPlayer2,
    selectors: 'player2',
  });
  
  player1.renderPlayer();
  player2.renderPlayer();
}

function renderAttackBtns() {
  player1.attacks.forEach(i => {
    const $btn = document.createElement('button');
    $btn.classList.add('button');
    $control.appendChild($btn);
    $btn.innerText = i.name;
    
    const btnCount = countBtn(i.maxCount, $btn);
    
    $btn.addEventListener('click', () => {
      btnCount();
      player1.changeHp(random(40, 20), player1, fightLog);
      player2.changeHp(random(i.maxDamage, i.minDamage), player2, fightLog);
    })
    $control.appendChild($btn);
  })
}

function counter(count = 0) {
  return function () {
    count++;
    return count;
  }
}

const newRoundCounter = counter();

function countBtn(count = 10, el) {
  const innerText = el.innerText;
  el.innerText = `${innerText} [${count}]`;
  
  return function () {
    count--;
    if (count === 0) {
      el.disabled = true;
    }
    el.innerText = `${innerText} [${count}]`;
    return count;
  }
}

function fightLog(count, player) {
  const $p = document.createElement('p');
  let log;
  // let $buttons = document.querySelectorAll('.button');
  
  if (player.hp.current === 0) {
    // $buttons.forEach(i => i.disabled = true);
    renderStartBtn('Restart game');
    log = player === player2
      ? `&#127752;Round ${newRoundCounter()}<hr>${generateLog(player, player1, count)}<br>&#129308;&#129307;The fight is over!<br>${player.name}&#128128; проиграл!`
      : `${generateLog(player, player2, count)}<br>&#129308;&#129307;The fight is over!<br>${player.name}&#128128; проиграл!<hr>`;
  } else {
    log = player === player2
      ? `&#127752;Round ${newRoundCounter()}<hr>${generateLog(player, player1, count)}`
      : `${generateLog(player, player2, count)}<hr>`;
  }
  
  $p.innerHTML = `${log}`;
  $logs.insertBefore($p, $logs.children[0]);
}

function generateLog(firstPerson, secondPerson, count) {
  const { name: firstPersonName, hp: { current: firstPersonHp } } = firstPerson;
  const { name: secondPersonName } = secondPerson;
  const logs = [
    `${firstPersonName} вспомнил что-то важное, но неожиданно ${secondPersonName}, не помня себя от испуга, ударил в предплечье врага. <br>Нанёс урон: &#9889;${count}. Осталось HP: &#128148;${firstPersonHp}`,
    `${firstPersonName} поперхнулся, и за это ${secondPersonName} с испугу приложил прямой удар коленом в лоб врага. <br>Нанёс урон: &#9889;${count}. Осталось HP: &#128148;${firstPersonHp}`,
    `${firstPersonName} забылся, но в это время наглый ${secondPersonName}, приняв волевое решение, неслышно подойдя сзади, ударил. <br>Нанёс урон: &#9889;${count}. Осталось HP: &#128148;${firstPersonHp}`,
    `${firstPersonName} пришел в себя, но неожиданно ${secondPersonName} случайно нанес мощнейший удар. <br>Нанёс урон: &#9889;${count}. Осталось HP: &#128148;${firstPersonHp}`,
    `${firstPersonName} поперхнулся, но в это время ${secondPersonName} нехотя раздробил кулаком черепушку противника. <br>Нанёс урон: &#9889;${count}. Осталось HP: &#128148;${firstPersonHp}`,
    `${firstPersonName} удивился, а ${secondPersonName} пошатнувшись влепил подлый удар. <br>Нанёс урон: &#9889;${count}. Осталось HP: &#128148;${firstPersonHp}`,
    `${firstPersonName} высморкался, но неожиданно ${secondPersonName} провел дробящий удар. <br>Нанёс урон: &#9889;${count}. Осталось HP: &#128148;${firstPersonHp}`,
    `${firstPersonName} пошатнулся, и внезапно наглый ${secondPersonName} беспричинно ударил в ногу противника <br>Нанёс урон: &#9889;${count}. Осталось HP: &#128148;${firstPersonHp}`,
    `${firstPersonName} расстроился, как вдруг, неожиданно ${secondPersonName} случайно влепил стопой в живот соперника. <br>Нанёс урон: &#9889;${count}. Осталось HP: &#128148;${firstPersonHp}`,
    `${firstPersonName} пытался что-то сказать, но вдруг, неожиданно ${secondPersonName} со скуки, разбил бровь сопернику. <br>Нанёс урон: &#9889;${count}. Осталось HP: &#128148;${firstPersonHp}`
  ];
  
  return logs[random(logs.length) - 1];
}