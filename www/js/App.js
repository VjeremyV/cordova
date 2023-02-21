import Pizza from './function.js';

export default class App {
  constructor() {
    document.addEventListener('deviceready', this.onDeviceReady);
  }

  onDeviceReady() {
    const homeNav = document.querySelector('#home-nav');
    const homePage = document.querySelector('#home-page');
    homeNav.root = homePage;

    const pizzasNav = document.querySelector('#pizzas-nav');
    const pizzasPage = document.querySelector('#pizzas-page');
    pizzasNav.root = pizzasPage;
    
    const btCreatePizza = document.querySelector('#bt-create-pizza');
    navigator.camera.DestinationType = {DATA_URL: 1, FILE_URI: 0}
   
    btCreatePizza.addEventListener('click', () => {
      const newPizza = new Pizza();
      newPizza.promptPizza();
    });
  }
}