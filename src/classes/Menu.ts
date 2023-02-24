import Bdd from './Bdd';

export default class Menu {
  static itemsContent: Array<object> = [];

  constructor() {}

  /**
   * construit les différentes vues liées aux différentes entrées du menu
   */
  menuViewConstruct() {

    //on ajoute la vue pour l'accueil
    this.addItemMenu('accueil', `<ion-content>
    <main>
      <h1>Bienvenue sur l'application d'inventaire</h1>
      <p>Réalisez de nouveaux inventaires ou consultez les stocks</p>
    </main>
  </ion-content>`);

  //on ajoute la vue pour la page de listing d'inventaire
  this.addItemMenu('stocks', ` <ion-content>
    <main>
      <h1>Consulter vos stocks</h1>
      <ion-item id="message-boxContainer"> 
        <ion-label id="message-box"></ion-label>
      </ion-item>
      <div class="data-container"></div>
    </main>
  </ion-content>`);

// on ajoute un menu pour l'ajout de nouveaux produits à l'inventaire'
  this.addItemMenu('inventaire', ` 
    <ion-content>
      <main id="mainAddContainer">
        <h1>Ajouter les produits à votre inventaire</h1>
        <div class="addFormContainer">
          <ion-item class='addIonItem'>
            <ion-input id="productName" placeholder="Nom du produit"></ion-input>
          </ion-item>
          <ion-item class='addIonItem'>
            <ion-input id="quantity" type="number" placeholder="Quantité"></ion-input>
          </ion-item>
          <ion-button id="productPicture">Prendre une photo du produit</ion-button>
        </div>
        <ion-button id="add-item">Ajouter</ion-button>

        <ion-item lines='none' id="message-boxContainer">
        <ion-label id="message-box"></ion-label>
      </ion-item>
      </main>
    </ion-content>`);
    this.displayContent()
  }

/**
 * affiche les différentes vue en fonction des clicks sur les différents éléments du menu
 */
  private displayContent(): void {
    Menu.itemsContent.forEach((element) => {
      element["tag"].addEventListener("click", () => {
        document.getElementById("main-content-container").innerHTML =
          element["content"];
        document.getElementById("page-title").innerHTML = element["name"];
        this.WhatPageForm(element["name"]);
      });
    });
  }

  /**
   * Associe les bons événements aux bons formulaires en fonctions de la vue choisie
   * @param pageName 
   */
  private WhatPageForm(pageName : string){
    let image :string;
    switch (pageName) {
      case "Inventaire":
        document.getElementById('productPicture').addEventListener('click', () => {
          (navigator as any).camera.getPicture((imageData: string) => {
                image = "data:image/jpeg;base64," + imageData;
            }); 
        })
        document.getElementById("add-item").addEventListener("click", () => {
            this.AddItemInventory(image);
          });
      case "Stocks":
        this.displayProductsData();
    }
  }
  
  /**
   * affiche le listing des produits de la bdd
   */
  private displayProductsData(){
    let container :HTMLBodyElement = document.querySelector('.data-container');
  
    let request = new Bdd();
    request.getData(container);

  }
  private addItemMenu(Menutag: string, content: string): void {
    Menu.itemsContent.push({
      name: this.capitalizeFirstLetter(Menutag),
      tag: document.getElementById(`${Menutag}`),
      content: content,
    });
  }


  private capitalizeFirstLetter(value: string): string {
    return value.trim().slice(0, 1).toUpperCase() + value.trim().slice(1);
  }

  /**
   * Ajoute un produit à l'inventaire
   * @param image 
   */
  private AddItemInventory(image : string) {
    let quantity: HTMLInputElement = document.getElementById("quantity") as any;
    let productName: HTMLInputElement = document.getElementById("productName") as any; 
    

          let inputsData : object = { 
            "Nom Produit" : productName.value,
            "quantité" : quantity.value
          }

        if(image){
          inputsData['img'] = image;
        }
        let request = new Bdd();
          request.postData(inputsData, [quantity, productName])    
  }
}
