export default class Pizza {
  static pizzasTag = document.querySelector("#pizzas-list");
  static ingredients = [
    "chèvre",
    "jambon",
    "emmental",
    "olives",
    "anchois",
    "reblochon",
  ];

  constructor(name, ingredients, isTomatoBase = true, image = null) {
    this.name = name;
    this.ingredients = ingredients;
    this.isTomatoBase = isTomatoBase;
    this.image = image;
  }

  createItemList() {
    const ionItem = document.createElement("ion-item");
    ionItem.classList.add(this.isTomatoBase ? "tomato-base" : "cream-base");
    ionItem.classList.add("pizza-item");
    if (this.image != null) {
      ionItem.innerHTML = `
      <img src="data:image/jpeg;base64,${this.image}">
      <ion-label">
        <div>
          <h1>${this.name}</h1>
          <h3>(${this.ingredients})</h3>
        </div>
      </ion-label>
    `;
    } else {
      ionItem.innerHTML = `
      <ion-label>
        <h1>${this.name}</h1>
        <h3>(${this.ingredients})</h3>
      </ion-label>
    `;
    }

    Pizza.pizzasTag.insertBefore(ionItem, Pizza.pizzasTag.firstElementChild);
  }

  async promptPizza(title = "Choisissez vos ingrédients", firstLaunch = true) {
    const alert = document.createElement("ion-alert");
    alert.header = title;

    if (firstLaunch) {
      alert.backdropDismiss = false;
      alert.inputs = Pizza.ingredients.map((ingredient) => ({
        label: capitalizeFirstLetter(ingredient),
        type: "checkbox",
        value: ingredient,
      }));
      alert.buttons = [
        {
          text: "Ok",
          handler: (ingredientsSelected) => {
            this.ingredients = formatIngredients(ingredientsSelected);
            return !!ingredientsSelected.length;
          },
        },
      ];
    } else {
      alert.inputs = [
        {
          type: "text",
          name: "pizzaName",
          placeholder: "Nouvelle pizza",
          attibutes: {
            maxlength: 50,
          },
        },
      ];
      alert.buttons = [
        {
          text: "Base Tomate",
          cssClass: "alert-bt-base",
          handler: () => {
            this.isTomatoBase = !this.isTomatoBase;
            return false;
          },
        },
        {
          text: 'Créer avec une photo',
          cssClass: 'pictureBtn',
          handler: async ({ pizzaName }) => {
            if (!isValid(pizzaName)) return false;
            navigator.camera.getPicture((data)=> {
              this.image= data;
              (this.name = capitalizeFirstLetter(pizzaName)),
              this.createItemList();
            })
            
            
          }
        },
        {
          text: "Créer sans photo",
          handler: ({ pizzaName }) => {
            if (!isValid(pizzaName)) return false;
            (this.name = capitalizeFirstLetter(pizzaName)),
              this.createItemList();
          },
        },
      ];
    }

    document.body.appendChild(alert);
    await alert.present();

    const btAlertBase = document.querySelector(".alert-bt-base");
    if (btAlertBase) {
      btAlertBase.addEventListener("click", () => {
        if (!this.isTomatoBase) btAlertBase.classList.add("is-cream");
        else btAlertBase.classList.remove("is-cream");
      });
    }

    if (firstLaunch) {
      alert
        .onDidDismiss()
        .then(() => this.promptPizza("Créer une pizza", false));
    }

    function capitalizeFirstLetter(value) {
      return value.trim().slice(0, 1).toUpperCase() + value.trim().slice(1);
    }
    function formatIngredients(value) {
      return value.join(" ").trim().replaceAll(" ", ", ");
    }
    function isValid(value) {
      return value && value.length > 2 && value.length < 50;
    }
  }
}
