class Selectors {
  constructor(name) {
    this.elHp = document.getElementById(`health-${name}`);
    this.elProgressbar = document.getElementById(`progressbar-${name}`);
  }
}

class Pokemon extends Selectors {
  constructor({ name, hp, type, selectors }) {
    super(selectors);
    
    this.name = name;
    this.hp = {
      default: hp,
      current: hp,
    };
    this.type = type;
    
    this.renderHp();
    this.hasSuperPower = true;
  }
  
  changeHp = (count, player, cb) => {
    this.hp.current -= count;
    if (player.hp.current <= 0) {
      player.hp.current = 0;
    }
    this.renderHp();
    cb && cb(count, player);
  }
  
  renderHp = () => {
    this.renderHpLife();
    this.renderProgressbarHp();
  }
  
  renderHpLife = () => {
    this.elHp.innerText = `${this.hp.current}/${this.hp.default}`;
  }
  
  renderProgressbarHp = () => {
    this.elProgressbar.style.width = `${(this.hp.current / this.hp.default) * 100}%`;
  }
}

export default Pokemon;