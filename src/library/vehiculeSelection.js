import { addTransport } from "./pathManager"

let trajet;
function initVehiculeSelection(startNode) {

  startNode.onclick = () => {
    trajet = startNode.dataset.trajet
    startNode.classList.add('add--active');
    document.querySelector('.transportSelection').classList.remove('transportSelection--hidden')
    document.addEventListener('click', closeSelection)
  }

  const transportTypes = document.querySelectorAll('#transportType > div:not(.dummyShadow)')

  transportTypes.forEach(node => {
    node.firstElementChild.onclick = (e) => handleTypeSelection(e, node)
    node.querySelectorAll('.transportIcon').forEach(type => type.onclick = (e) => handleVehiculeSelection(e, node));
    node.querySelector('.check').onclick = () => select(node)
  })

  document.querySelectorAll('input[type="range"]').forEach(input => input.oninput = (e) => document.querySelector('.percentageValue').innerHTML = `${input.value}% du trajet`)
  
  function handleTypeSelection(e, selectedNode) {
    hidePercentageInputs()
    hideTransportIcons()
    cleanTransportType()
    cleanTransportVehicule()

    selectTransportType(e)
    expandTransportIcons(selectedNode)
  }

  function select(selectedNode) {
    let percentage = selectedNode.querySelector('input[type="range"]').value
    let vehicule = selectedNode.querySelector('.transportIcon--selected').dataset.vehicule
    const transport = { vehicule, percentage }
    console.log(trajet)
    global.userInfo[trajet].push(transport)
    closeSelection()
    addTransport(transport, trajet)
  }

  function closeSelection(e) {
    if(
      e
      && (e.path.includes(document.querySelector('.transportSelection')) 
      || e.path.includes(document.querySelector('.addContainer')))
      ) { return }
    hidePercentageInputs()
    hideTransportIcons()
    cleanTransportType()
    cleanTransportVehicule()
    hidePercentageInputs()

    startNode.classList.remove('add--active');
    document.querySelector('.transportSelection').classList.add('transportSelection--hidden')
    document.removeEventListener('click', closeSelection)
  }

  function handleVehiculeSelection(e, selectedNode) {
    hidePercentageInputs()
    cleanTransportVehicule()

    selectTransportVehicule(e)
    expandPercentageInputs(selectedNode)
  }

  // hiding functions
  function hideTransportIcons() { // hide vehicules icons container
    document.querySelectorAll('.transportVehicule')
      .forEach(node => node.classList.add('transportVehicule--hidden'))
  }

  function hidePercentageInputs() { // hide range input
    document.querySelectorAll('.percentageInput')
      .forEach(node => node.classList.add('percentageInput--hidden'))
  }

  // expand functions
  function expandTransportIcons(selectedNode) {
    let transportContainer = selectedNode.querySelector('.transportVehicule');
    transportContainer.classList.remove('transportVehicule--hidden');
    transportContainer.style.width = `${42 * transportContainer.querySelectorAll('.transportIcon').length}px`
  }

  function expandPercentageInputs(selectedNode) {
    selectedNode.querySelector('.percentageInput').classList.remove('percentageInput--hidden')
  } 

  // select functions
  function selectTransportType(e) {
    e.target.classList.add('transportTypeItem--selected')
  }

  function selectTransportVehicule(e) {
    e.target.classList.add('transportIcon--selected')
  }

  // deselect function
  function cleanTransportVehicule() { // deselect all vehicule icons
    document.querySelectorAll('.transportIcon')
      .forEach(node => node.classList.remove('transportIcon--selected'))
  }

  function cleanTransportType() { // deselect all transport type
    document.querySelectorAll('.transportTypeItem')
      .forEach(node => node.classList.remove('transportTypeItem--selected'))
  }
}


export default initVehiculeSelection