import Bdd from "./Bdd";
export default class Alert{
  /**
   * Alert de suppression
   * @param productId 
   * @param productName 
   */
    async deleteAlert(productId : number, productName : string) {
        const alert = document.createElement('ion-alert') as any;

        alert.header = 'Êtes vous sûr de vouloir supprimer '+productName;
        alert.buttons = [
          {
            text: 'Annuler',
            role: 'cancel',
          },
          {
            text: 'Oui',
            role: 'confirm',
            handler: () => {
            let request = new Bdd();
            request.deleteData(productId);
            }
          }
        ];
    
        document.body.appendChild(alert);
        await alert.present();
          }

          /**
           * Alert de modification
           * @param productId 
           * @param productName 
           * @param productQuantity 
           */
    async updateAlert(productId : number, productName : string, productQuantity : number) {
        const alert  = document.createElement('ion-alert') as any;
        let image :string;
        alert.header = 'Modification de '+productName;
        alert.buttons = [
          {
            text: 'Annuler',
            role: 'cancel',
          },
          {
            text: 'prendre une photo du produit',
            handler: () => {
                (navigator as any).camera.getPicture(
                    (imageData: string) => {
                        image = "data:image/jpeg;base64," + imageData;
                    });
                  return false;
                }
          },
          {
            text: 'Oui',
            role: 'confirm',
            handler: (result : object) => {
            let request = new Bdd();
            result['img'] = image;
            request.updateData(result, productId);
            }
          }
        ];
        alert.inputs = [
            {
              placeholder: productName,
              value : productName,
              name: 'Nom Produit'
            },
            {
              placeholder: productQuantity,
              value : productQuantity,
             type: 'number',
             name: 'quantité'
            },
          ];
        document.body.appendChild(alert);
        await alert.present();
          }

    
}