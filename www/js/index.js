document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    let addForm = document.getElementById("add-pizza");
    let pizzaList = document.querySelector(".pizzas");
    let addName = document.getElementById("nomPizza");
    let addIngredients = document.getElementById("ingredients");
  
    addForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (isValid(addName.value) && isValid(addIngredients.value)) {
          let newPizza = document.createElement('div');
          newPizza.classList.add('pizza');
          newPizza.innerHTML = `
          <div class="pizza">
          <p>${capitalizeFisrtLetter(addName.value)}</p>
          <p>${formatIngredients(addIngredients.value)}</p>
          </div>`;
          
          pizzaList.appendChild(newPizza);
         resetInput(addName);
         resetInput(addIngredients);
      } else {
          let errorContainer = document.getElementById('errorContainer');
          errorContainer.textContent = "la saisie n'est pas valide";
          setTimeout(() => errorContainer.textContent = '', 2000);
      }
        
    });

    function resetInput(input){
        input.value= "";
    }
    function isValid(value) {
        return value && value.length > 2 && value.length < 50;
    }

    function formatIngredients(value){
        return "("+ value.trim().replaceAll(" ", ", ")+")"
    }
    function capitalizeFisrtLetter(value){
        return value.trim().slice(0, 1).toUpperCase() + value.trim().slice(1);
    }
}

