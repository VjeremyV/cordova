import './style.scss';
import Menu from './classes/Menu'
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    let newMenu = new Menu();
    newMenu.menuViewConstruct();
  
}
