document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    let addForm = document.getElementById("add-pizza");
    let pizzaList = document.querySelector(".pizzas");
    let addName = document.getElementById("nomPizza");
    let addIngredients = document.getElementById("ingredients");
  
    addForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let newPizza = document.createElement('div');
      newPizza.classList.add('pizza');
      newPizza.innerHTML = `
              <div class="pizza">
                  <p>${capitalizeFisrtLetter(addName.value)}</p>
                  <p>${formatIngredients(addIngredients.value)}</p>
              </div>`;
  
      pizzaList.appendChild(newPizza);
    });

    function isValid(value) {
        return value && value.lenght > 2 && value.lenght < 50;
    }

    function formatIngredients(value){
        return "("+ value.replaceAll(" ", ", ")+")"
    }
    function capitalizeFisrtLetter(value){
        return value.slice(0, 1).toUpperCase() + value.slice(1);
    }
}

