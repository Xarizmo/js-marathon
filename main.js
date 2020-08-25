const $btn = document.getElementById('btn-kick');
const $superBtn = document.getElementById('btn-kick-superpower');

const character = {
  name: 'Pikachu',
  defaultHp: 100,
  damageHp: 100,
  elHp: document.getElementById('health-character'),
  elProgressbar: document.getElementById('progressbar-character'),
  superPower: 'on',
  changeHp: changeHp,
  renderHp: renderHp,
  renderHpLife: renderHpLife,
  renderProgressbarHp: renderProgressbarHp,
};

const enemy = {
  name: 'Charmander',
  defaultHp: 100,
  damageHp: 100,
  elHp: document.getElementById('health-enemy'),
  elProgressbar: document.getElementById('progressbar-enemy'),
  changeHp: changeHp,
  renderHp: renderHp,
  renderHpLife: renderHpLife,
  renderProgressbarHp: renderProgressbarHp,
};

$btn.addEventListener('click', function () {
  character.changeHp(random(20));
  enemy.changeHp(random(20));
});

$superBtn.addEventListener('click', function () {
  character.superPower = 'off';
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
  console.log('##### renderHp', this);
  renderHpLife.call(this);
  renderProgressbarHp.call(this);
}

function renderHpLife() {
  console.log('##### renderHpLife', this);
  this.elHp.innerText = this.damageHp + ' /' + this.defaultHp;
}

function renderProgressbarHp() {
  console.log('##### renderProgressbarHp', this);
  this.elProgressbar.style.width = this.damageHp + '%';
}

function changeHp(count) {
  superPower();
  if (this.damageHp <= count) {
    this.damageHp = 0;
    alert('Неудачник ' + this.name + ' проиграл!');
    $btn.disabled = true;
  } else {
    this.damageHp -= count;
  }
  renderHp();
}

function random(num) {
  return Math.ceil(Math.random() * num);
}

function superPower() {
  if (character.damageHp < 30) {
    if (character.superPower === 'on') {
      alert('Pikachu может использовать супер-удар!')
      $superBtn.disabled = false;
    }
  }
}

init();