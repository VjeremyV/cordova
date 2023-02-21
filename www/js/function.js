/**
   * créer un affichage pour une pizza à partir des resultats de l'alert
   * @param {object} pizzaObject 
   */
function createPizza(name, base, ingredients, noeud) {
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
    noeud.insertBefore(ionItem, noeud.firstElementChild);
  }

  /**
   * créer le tableau d'inputs en fonction de la valeur de la constante ingrédients pour libérer du code
   * @returns {array}
   */
  function createInput(array, input) {
    let inputs = [];
    array.forEach((element)=>{
      inputs.push({
        type: input,
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

  export {createPizza, createInput, isValid, formatIngredients, capitalizeFisrtLetter}