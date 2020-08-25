const $btn = document.getElementById('btn-kick');
const $superBtn = document.getElementById('btn-kick-superpower');

const character = {
  name: 'Pikachu',
  defaultHp: 100,
  damageHp: 100,
  elHp: document.getElementById('health-character'),
  elProgressbar: document.getElementById('progressbar-character'),
  changeHp: changeHp,
  renderHp: renderHp,
  superPower: superPower,
  hasSuperPower: true,
};

const enemy = {
  name: 'Charmander',
  defaultHp: 100,
  damageHp: 100,
  elHp: document.getElementById('health-enemy'),
  elProgressbar: document.getElementById('progressbar-enemy'),
  changeHp: changeHp,
  renderHp: renderHp,
};

$btn.addEventListener('click', function () {
  character.changeHp(random(20));
  enemy.changeHp(random(20));
});

$superBtn.addEventListener('click', function () {
  character.hasSuperPower = false;
  enemy.changeHp(random(40));
  $superBtn.disabled = true;
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
  this.elHp.innerText = this.damageHp + ' /' + this.defaultHp;
}

function renderProgressbarHp() {
  this.elProgressbar.style.width = this.damageHp + '%';
}

function changeHp(count) {
  character.superPower();
  if (this.damageHp <= count) {
    this.damageHp = 0;
    alert('Неудачник ' + this.name + ' проиграл!');
    $btn.disabled = true;
  } else {
    this.damageHp -= count;
  }
  this.renderHp();
}

function random(num) {
  return Math.ceil(Math.random() * num);
}

function superPower() {
  if (this.damageHp < 30) {
    if (this.hasSuperPower) {
      alert(this.name + ' может использовать супер-удар!')
      $superBtn.disabled = false;
    }
  }
}

init();