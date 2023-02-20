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
                  <p>${addName.value}</p>
                  <p>${addIngredients.value}</p>
              </div>`;
  
      pizzaList.appendChild(newPizza);
    });
}

