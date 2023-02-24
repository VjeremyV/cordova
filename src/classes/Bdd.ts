import Alert from "./Alert";
export default class Bdd {
  static options: object = {
    method: "",
    headers: {
      "content-type": "application/json",
    },
  };

  /**
   * Ajout d'un produit
   * @param inputsData 
   * @param inputs 
   */
  postData(inputsData: object, inputs: Array<HTMLInputElement>) {
    Bdd.options["method"] = "POST";
    try {
      fetch("http://localhost:3000/inventaire", {
        ...Bdd.options,
        body: JSON.stringify(inputsData),
      }).then((res) => {
       
        this.setMessageBox(`le produit a bien été ajouté à l'inventaire`, 'goodMessage');
        inputs.forEach((input) => {
          input.value = "";
        });
      });
    } catch (error) {
        this.setMessageBox(`Un problème est survenu lors de l'ajout du produit`, 'badNews');
      console.error("fetch erro perso: " + error);
    }
  }

  /**
   * Récupération de la list produit
   * @param container 
   */
  getData(container: HTMLBodyElement) {
    Bdd.options["method"] = "GET";

    try {
      fetch("http://localhost:3000/inventaire", {
        ...Bdd.options,
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          let hmtlDatastructure = data
            .map(
              (element) =>
                `
                <ion-item class="ionItemsStocks">
                <div class='products-info'>
                <img src='${element["img"]}' />
                <div>
                <h3>Produit : ${element["Nom Produit"]}</h3>
                <p>Quantité en stock : ${element["quantité"]}</p>
                </div>
                </div>
                <div class='products-btn'>
                <ion-button color="warning" class="update-btn" data-id="${element.id}" data-name="${element["Nom Produit"]}" data-quantity="${element["quantité"]}"><ion-icon name="trash-bin-outline"></ion-icon></ion-button>
                <ion-button color="danger" class="trash-btn" data-id="${element.id}" data-name="${element["Nom Produit"]}"><ion-icon name="trash-bin-outline"></ion-icon></ion-button>
                </div>
                </ion-item>
                `
            )
            .join("");
          container.innerHTML = hmtlDatastructure;

          let trashButton: Array<HTMLElement> = document.querySelectorAll(".trash-btn") as any;
          let updateButton: Array<HTMLElement> = document.querySelectorAll(".update-btn") as any;

          trashButton.forEach((element) => {
            element.addEventListener("click", () => {
              let alert = new Alert();
              alert.deleteAlert(
                parseInt(element.dataset.id),
                element.dataset.name
              );
            });
          });

          updateButton.forEach((element) => {
            element.addEventListener("click", () => {
              let alert = new Alert();
              alert.updateAlert(
                parseInt(element.dataset.id),
                element.dataset.name,
                parseInt(element.dataset.quantity)
              );
            });
          });
        });
    } catch (error) {

        this.setMessageBox(`Un problème est survenu lors de l'ajout du produit`, 'badNews');
      console.error("fetch erro perso: " + error);
    }
  }

  /**
   * suppression d'un produit
   * @param productID 
   */
  deleteData(productID: number) {
    let container: HTMLBodyElement = document.querySelector(".data-container");
    Bdd.options["method"] = "DELETE";
    try {
      fetch("http://localhost:3000/inventaire/" + productID, {
        ...Bdd.options,
      }).then((res) => {
        this.setMessageBox(`le produit a bien été supprimé`, 'goodMessage');
        this.getData(container);
      });
    } catch (error) {
        this.setMessageBox(`Un problème est survenu lors de la supression du produit`, 'badNews');
      console.error("fetch erro perso: " + error);
    }
  }

  /**
   * mise à jour d'un produit
   * @param data 
   * @param productID 
   */
  updateData(data: object, productID: number) {
    let container: HTMLBodyElement = document.querySelector(".data-container");
    Bdd.options["method"] = "PATCH";
    try {
      fetch("http://localhost:3000/inventaire/" + productID, {
        ...Bdd.options,
        body: JSON.stringify(data),
      }).then((res) => {
        this.setMessageBox(`les informations du produits on bien été mise à jour`, 'goodMessage');
        this.getData(container);
      });
    } catch (error) {
        this.setMessageBox(`Un problème est survenu lors de la mise à jour du produit`, 'badNews');
      console.error("fetch erro perso: " + error);
    }
  }

  /**
   * pour afficher les messages d'erreur et de succès
   * @param message 
   * @param cssClass 
   */
  setMessageBox(message : string, cssClass : string) :void{
    let messageBox :HTMLElement = document.getElementById("message-box");
    messageBox.classList.add(cssClass)
    messageBox.innerHTML = message;
    setTimeout(()=> {
        messageBox.classList.remove(cssClass)
        messageBox.innerHTML = "";
    }, 3500)
  }
}
