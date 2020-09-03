import Pokemon from './pokemon.js';
import random from './utils.js';

const player1 = new Pokemon({
  name: 'Pikachu',
  type: 'electric',
  hp: 500,
  selectors: 'character',
});

const player2 = new Pokemon({
  name: 'Charmander',
  type: 'fire',
  hp: 550,
  selectors: 'enemy',
});

const $btn = document.getElementById('btn-kick');
const $superBtn = document.getElementById('btn-kick-superpower');
const $btnCounter = document.querySelector('.btn-counter');
const $superBtnCounter = document.querySelector('.super-btn-counter');

function counter(count = 0) {
  return function() {
    count++;
    return count;
  }
}

const mainAttackCounter = counter();
const superPowerCounter = counter();
const newRoundCounter = counter();

$btn.addEventListener('click', function () {
  player1.changeHp(random(100, 40), player1, fightLog)
  if (player1.hp.current > 0) {
    player2.changeHp(random(100, 40), player2, fightLog);
  }
  let count = mainAttackCounter();
  if (count === 10) {
    this.disabled = true;
  }
  $btnCounter.innerText = 10 - count;
});

$superBtn.addEventListener('click', function () {
  player1.hasSuperPower = false;
  player2.changeHp(random(200, 100), player2, fightLog);
  $superBtn.disabled = true;
  let count = superPowerCounter();
  if (count === 1) {
    this.disabled = true;
  }
  $superBtnCounter.innerText = 1 - count;
});

function init() {
  console.log('Start game!');
  player1.renderHp();
  player2.renderHp();
  $superBtn.disabled = true;
}

function fightLog(count, player) {
  const $logs = document.querySelector('.logs');
  const $p = document.createElement('p');
  let log;
  
  if (player.hp.current === 0) {
    $btn.disabled = true;
    $superBtn.disabled = true;
    log = player === player2
      ? `&#127752;Round ${newRoundCounter()}<hr>${generateLog(player, player1, count)}<br>&#129308;&#129307;The fight is over!<br>${player.name}&#128128; проиграл!`
      : `${generateLog(player, player2, count)}<br>&#129308;&#129307;The fight is over!<br>${player.name}&#128128; проиграл!<hr>`;
  } else if (player === player1 && player1.hp.current < 250 && player1.hasSuperPower) {
    console.log(player1.name + ' может использовать супер-удар!')
    $superBtn.disabled = false;
    log = player === player2
      ? `&#127752;Round ${newRoundCounter()}<hr>${generateLog(player, player1, count)}`
      : `${generateLog(player, player2, count)}<hr>`;
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

init();