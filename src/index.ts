import "./style.scss";
import Carre from './Carre';

document.body.addEventListener("click", () => {
  let carre= new Carre();
  document.body.appendChild(carre.createSquare());
});



