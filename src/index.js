global.userInfo = {
  id: 1,
  "adresse_domicile": "1 rue Jean macé 95170 Deuil-la-barre",
  "adresse_campus": "8 bis rue de la fontaine aux rois 75018 Paris",
  "adresse_entreprise": "1 rue de la poire 75012 Paris",
  "transport_campus": [],
  "transport_entreprise": []
};

// Import all plugins
import * as bootstrap from 'bootstrap';
import autoCompletion from './library/autoCompletion';
import initVehiculeSelection from "./library/vehiculeSelection"
import * as pathManager from "./library/pathManager"

(function() {
  initVehiculeSelection(document.querySelector('.add[data-trajet="transport_campus"]'), "transport_campus")
  initVehiculeSelection(document.querySelector('.add[data-trajet="transport_entreprise"]'), "transport_entreprise")

  document.querySelector('.domicile').innerHTML = '&nbsp;' + global.userInfo.adresse_domicile
  document.querySelector('.campus').innerHTML = ' ' + global.userInfo.adresse_campus
  document.querySelector('.travail').innerHTML = ' ' + global.userInfo.adresse_entreprise

  global.userInfo.transport_campus.forEach(transport => {
    pathManager.addTransport(transport, "transport_campus")
  })
  
  global.userInfo.transport_entreprise.forEach(transport => {
    pathManager.addTransport(transport, "transport_entreprise")
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
    document.getElementById('saveAndCloseModal').onclick = () => {
      document.querySelector('.domicile').innerHTML = '&nbsp;' + document.getElementById('addressInput').value
      global.userInfo.adresse_domicile = document.getElementById('addressInput').value
      console.log(global.userInfo)
      myModal.hide()
    }
    myModal.toggle()
  }

  document.getElementById('changeEntreprise').onclick = e => {
    e.preventDefault()
    modalContent.appendChild(addressFormTemplate, true)
    autoCompletion(document.getElementById('addressInput'), addressFormTemplate.querySelector('.options'))
    document.getElementById('saveAndCloseModal').onclick = () => {
      document.querySelector('.travail').innerHTML = '&nbsp;' + document.getElementById('addressInput').value
      global.userInfo.adresse_entreprise = document.getElementById('addressInput').value
      myModal.hide()
    }

    myModal.toggle()
  }

  document.getElementById('confirm').onclick = (e) => {
    e.preventDefault()
    console.log(JSON.stringify(global.userInfo))
  }
})()

