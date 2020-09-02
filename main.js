import Pokemon from './pokemon.js';

const player1 = new Pokemon({
  name: 'Pikachu',
  type: 'electric',
  hp: 500,
  selectors: 'character',
})

console.log(player1);

const $btn = document.getElementById('btn-kick');
const $superBtn = document.getElementById('btn-kick-superpower');
const $btnCounter = document.querySelector('.btn-counter');
const $superBtnCounter = document.querySelector('.super-btn-counter');

const character = {
  name: 'Pikachu',
  defaultHp: 100,
  currentHp: 100,
  elHp: document.getElementById('health-character'),
  elProgressbar: document.getElementById('progressbar-character'),
  changeHp: changeHp,
  renderHP: renderHP,
  hasSuperPower: true,
};

const enemy = {
  name: 'Charmander',
  defaultHp: 100,
  currentHp: 100,
  elHp: document.getElementById('health-enemy'),
  elProgressbar: document.getElementById('progressbar-enemy'),
  changeHp: changeHp,
  renderHp: renderHp,
};

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
  enemy.changeHp(random(10));
  let count = mainAttackCounter();
  if (count === 6) {
    this.disabled = true;
  }
  $btnCounter.innerText = 6 - count;
});

$superBtn.addEventListener('click', function () {
  enemy.changeHp(random(40));
  $superBtn.disabled = true;
  let count = superPowerCounter();
  if (count === 1) {
    this.disabled = true;
  }
  $superBtnCounter.innerText = 1 - count;
});

function init() {
  console.log('Start game!');
  character.renderHp();
  enemy.renderHp();
  $superBtn.disabled = true;
}

function random(num) {
  return Math.ceil(Math.random() * num);
}

function generateLog(firstPerson, secondPerson, count) {
  const { name: firstPersonName, currentHp: firstPersonHp } = firstPerson;
  const { name: secondPersonName } = secondPerson;
  const logs = [
    `${firstPersonName} вспомнил что-то важное, но неожиданно ${secondPersonName}, не помня себя от испуга, ударил в предплечье врага. <br>Нанёс урон: &#9889;${count}. Осталось HP: &#128148;${firstPersonHp}`,
    `${firstPersonName} поперхнулся, и за это ${secondPersonName} с испугу приложил прямой удар коленом в лоб врага. <br>Нанёс урон: &#9889;${count}. Осталось HP: &#128148;${firstPersonHp}`,
    `${firstPersonName} забылся, но в это время наглый ${secondPersonName}, приняв волевое решение, неслышно подойдя сзади, ударил. <br>Нанёс урон: &#9889;${count}. Осталось HP: &#128148;${firstPersonHp}`,
    `${firstPersonName} пришел в себя, но неожиданно ${secondPersonName} случайно нанес мощнейший удар. <br>Нанёс урон: &#9889;${count}. Осталось HP: &#128148;${firstPersonHp}`,
    `${firstPersonName}></firstPersonName> поперхнулся, но в это время ${secondPersonName}></secondPersonName> нехотя раздробил кулаком \<вырезанно цензурой\> противника. <br>Нанёс урон: &#9889;${count}. Осталось HP: &#128148;${firstPersonHp}`,
    `${firstPersonName} удивился, а ${secondPersonName} пошатнувшись влепил подлый удар. <br>Нанёс урон: &#9889;${count}. Осталось HP: &#128148;${firstPersonHp}`,
    `${firstPersonName} высморкался, но неожиданно ${secondPersonName} провел дробящий удар. <br>Нанёс урон: &#9889;${count}. Осталось HP: &#128148;${firstPersonHp}`,
    `${firstPersonName} пошатнулся, и внезапно наглый ${secondPersonName} беспричинно ударил в ногу противника <br>Нанёс урон: &#9889;${count}. Осталось HP: &#128148;${firstPersonHp}`,
    `${firstPersonName} расстроился, как вдруг, неожиданно ${secondPersonName} случайно влепил стопой в живот соперника. <br>Нанёс урон: &#9889;${count}. Осталось HP: &#128148;${firstPersonHp}`,
    `${firstPersonName} пытался что-то сказать, но вдруг, неожиданно ${secondPersonName} со скуки, разбил бровь сопернику. <br>Нанёс урон: &#9889;${count}. Осталось HP: &#128148;${firstPersonHp}`
  ];
  
  return logs[random(logs.length) - 1];
}

function fightLogging(log) {
  const $logs = document.querySelector('.logs');
  const $p = document.createElement('p');
  
  $p.innerHTML = `${log}`;
  $logs.insertBefore($p, $logs.children[0]);
}

init();