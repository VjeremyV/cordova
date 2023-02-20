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


  async function presentAlert() {
    const alert = document.createElement("ion-alert");
    alert.header = "Renseignez les données de la pizza";
    alert.buttons = [{
        text: 'Créer',
        handler: (value) => { createPizza(value)}
    }];
    alert.inputs = [
      {
        name: "nom",
        placeholder: "Nom",
      },
      {
        name: "ingredients",
        placeholder: "Ingrédients",
      },
    ];

    document.body.appendChild(alert);
    await alert.present();
    
  }

  function createPizza(pizzaObject) {
    const ionItem = document.createElement("ion-item");
    ionItem.innerHTML = `
    <ion-label>
    <h1>${capitalizeFisrtLetter(pizzaObject.nom)}</h1>
    <h3>${formatIngredients(pizzaObject.ingredients)}</h3>
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
