const $btn = document.getElementById('btn-kick');
const $superBtn = document.getElementById('btn-kick-superpower');

const character = {
  name: 'Pikachu',
  defaultHp: 100,
  currentHp: 100,
  elHp: document.getElementById('health-character'),
  elProgressbar: document.getElementById('progressbar-character'),
  changeHp: changeHp,
  renderHp: renderHp,
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

let round = 1;

$btn.addEventListener('click', function () {
  character.changeHp(random(20));
  enemy.changeHp(random(20));
  round++;
});

$superBtn.addEventListener('click', function () {
  character.hasSuperPower = false;
  enemy.changeHp(random(40));
  $superBtn.disabled = true;
  round++;
});

function init() {
  console.log('Start game!');
  character.renderHp();
  enemy.renderHp();
  $superBtn.disabled = true;
}

function renderHp() {
  renderHpLife.call(this);
  renderProgressbarHp.call(this);
}

function renderHpLife() {
  this.elHp.innerText = this.currentHp + ' /' + this.defaultHp;
}

function renderProgressbarHp() {
  this.elProgressbar.style.width = this.currentHp + '%';
}

function changeHp(count) {
  this.currentHp -= count;
  
  if (this.currentHp <= count) {
    const log = `&#129308;&#129307;The fight is over!<br>${this.name}&#128128; проиграл!`;
    this.currentHp = 0;
    $btn.disabled = true;
    fightLogging(log);
  } else if (character.currentHp < 30) {
    if (character.hasSuperPower) {
      alert(character.name + ' может использовать супер-удар!')
      $superBtn.disabled = false;
    }
  } else {
    const log = this === enemy
      ? `&#127752;Round ${round}<hr>${generateLog(this, character, count)}`
      : `${generateLog(this, enemy, count)}<hr>`;
    fightLogging(log);
  }
  
  this.renderHp();
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