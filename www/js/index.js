import {createPizza, createInput, isValid, formatIngredients, capitalizeFisrtLetter} from './function.js'
document.addEventListener("deviceready", onDeviceReady);
const pizzasTag = document.querySelector("#pizzas-list");
const btCreatePizza = document.querySelector("#bt-create-pizza");
const ingredients = ['fromage', "tomate","oignons","poulet","origan","oeuf","jambon"];
const bases = ['base tomate', "base creme"];

function onDeviceReady() {

  btCreatePizza.addEventListener("click", () => {
    presentAlert();
  });

  const homeNav = document.querySelector("#home-nav");
  const homePage = document.querySelector("#home-page");
  homeNav.root = homePage;

  const pizzasNav = document.querySelector("#pizzas-nav");
  const pizzasPage = document.querySelector("#pizzas-page");
  pizzasNav.root = pizzasPage;

/**
 * créer une alert et renvoie les données via une fontion callback au click sur le bouton "créer"
 */
  async function presentAlert(nom = null, base=null) {
    const alert = document.createElement("ion-alert");
    if(!nom){
      alert.header = "Renseignez les données de la pizza";
      alert.buttons = [{
          text: 'Créer',
          handler: ({nom}) => { presentAlert(nom)}
      }];
      alert.inputs = [
        {
          type: 'text',
          placeholder : "Nom de la pizza",
          name : "nom"
        },
     
      ];
    } else {
      if(!base){
        alert.header = "Choisissez votre base";
        alert.buttons = [{
            text: 'Créer',
            handler: (value) => { presentAlert(nom, value)}
        }];
        alert.inputs = createInput(bases, 'radio');
      } else {
        alert.header = "Renseignez les ingrédients";
        alert.buttons = [{
            text: 'Envoyer',
            handler: (value) => { createPizza(nom, base, value, pizzasTag)}
        }];
        alert.inputs = createInput(ingredients, 'checkbox');
      }
    }
    document.body.appendChild(alert);
    await alert.present();
  }

 
}
