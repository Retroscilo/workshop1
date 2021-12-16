global.userInfo = {
  id: 1,
  "adresse_domicile": "1 rue Jean macé 95170 Deuil-la-barre",
  "adresse_campus": "8 bis rue de la fontaine aux rois 75018 Paris",
  "adresse_entreprise": "1 rue de la poire 75012 Paris",
  "transport_campus": [{ 
    vehicule: "velo", 
    percentage: 65 
  }],
  "transport_entreprise": []
};

// Import all plugins
import * as bootstrap from 'bootstrap';
import autoCompletion from './library/autoCompletion';
import initVehiculeSelection from "./library/vehiculeSelection"
import * as pathManager from "./library/pathManager"

(function() {
  initVehiculeSelection(document.querySelector('.add'))

  document.querySelector('.domicile').innerHTML = '&nbsp; ' + global.userInfo.adresse_domicile
  document.querySelector('.campus').innerHTML = ' ' + global.userInfo.adresse_campus
  document.querySelector('.travail').innerHTML = ' ' + global.userInfo.adresse_entreprise

  global.userInfo.transport_campus.forEach(transport => {
    pathManager.addTransport(transport)
  })
  
  
  
  
  
  
  
  
  // modal handling
  var myModal = new bootstrap.Modal(document.getElementById('modal'))
  var modalContent = document.getElementById('modal').querySelector('#template')
  
  let addressFormTemplate = document.getElementById('modal_addressForm').content.firstElementChild
  
  document.getElementById('modal').addEventListener('hidden.bs.modal', () => {
    document.getElementById('addressInput').value = "";
    document.querySelector('.options').innerHTML = "";
    modalContent.innerHTML = "";
  })
  
  document.getElementById('changeAddress').onclick = e => {
    e.preventDefault()
    modalContent.appendChild(addressFormTemplate, true)
    autoCompletion(document.getElementById('addressInput'), addressFormTemplate.querySelector('.options'))
    myModal.toggle()
  }
})()

