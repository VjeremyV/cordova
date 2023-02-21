document.addEventListener("deviceready", onDeviceReady);

function onDeviceReady() {
  const pizzasTag = document.querySelector("#pizzas-list");
  const btCreatePizza = document.querySelector("#bt-create-pizza");
  const ingredients = ['fromage', "tomate","oignons","poulet","origan","oeuf","jambon"]
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
        alert.inputs = [
          {
            type: 'radio',
            label : "base tomate",
            value : "base tomate",
            name : "base tomate"
          },
          {
            type: 'radio',
            label : "base creme",
            value : "base creme",
            name : "base creme"
          },
       
        ];
      } else {
        alert.header = "Renseignez les ingrédients";
        alert.buttons = [{
            text: 'Envoyer',
            handler: (value) => { createPizza(nom, base , value)}
        }];
        alert.inputs = createInput();
      }
    }
  

    document.body.appendChild(alert);
    await alert.present();
    
  }

  /**
   * créer un affichage pour une pizza à partir des resultats de l'alert
   * @param {object} pizzaObject 
   */
  function createPizza(name, base, ingredients) {
    console.log(base)
    console.log(ingredients)
    ingredients = ingredients.join(" ")
    const ionItem = document.createElement("ion-item");
    ionItem.innerHTML = `
    <ion-label>
    <h1>${capitalizeFisrtLetter(name)}</h1>
    <h3>${capitalizeFisrtLetter(base)}</h3>
    <h3>${formatIngredients(ingredients)}</h3>

    </ion-label>
    `;
    pizzasTag.insertBefore(ionItem, pizzasTag.firstElementChild);
  }

  /**
   * créer le tableau d'inputs en fonction de la valeur de la constante ingrédients pour libérer du code
   * @returns {array}
   */
  function createInput() {
    let inputs = [];
    ingredients.forEach((element)=>{
      inputs.push({
        type: 'checkbox',
        label : element,
        name : element,
        value : element
      })
    })
    return inputs
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
