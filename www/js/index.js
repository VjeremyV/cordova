document.addEventListener("deviceready", onDeviceReady);

function onDeviceReady() {
  const pizzasTag = document.querySelector("#pizzas-list");
  const btCreatePizza = document.querySelector("#bt-create-pizza");

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
  async function presentAlert(nom = null) {
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
      alert.header = "Renseignez les ingrédients";
      alert.buttons = [{
          text: 'Créer',
          handler: (value) => { createPizza(nom, value)}
      }];
      alert.inputs = [
        {
          type: 'checkbox',
          label : "fromage",
          name : "fromage",
          value : "fromage"
        },
        {
          type: 'checkbox',
          label : "tomate",
          name : "tomate",
          value : "tomate"
        },
        {
          type: 'checkbox',
          label : "oignons",
          name : "oignons",
          value : "oignons"
        },
     
      ];
    }
  

    document.body.appendChild(alert);
    await alert.present();
    
  }

  /**
   * créer un affichage pour une pizza à partir des resultats de l'alert
   * @param {object} pizzaObject 
   */
  function createPizza(name, ingredients) {
    console.log(name)
    console.log(ingredients)
    ingredients = ingredients.join(" ")
    const ionItem = document.createElement("ion-item");
    ionItem.innerHTML = `
    <ion-label>
    <h1>${capitalizeFisrtLetter(name)}</h1>
    <h3>${formatIngredients(ingredients)}</h3>

    </ion-label>
    `;
    pizzasTag.insertBefore(ionItem, pizzasTag.firstElementChild);
  }

  function resetInput(input) {
    input.value = "";
  }
  function isValid(value) {
    return value && value.length > 2 && value.length < 50;
  }

  function formatIngredients(value) {
    return "(" + value.trim().replaceAll(" ", ", ") + ")";
  }
  function capitalizeFisrtLetter(value) {
    return value.trim().slice(0, 1).toUpperCase() + value.trim().slice(1);
  }
}
