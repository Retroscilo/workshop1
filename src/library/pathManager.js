import initVehiculeSelection from "./vehiculeSelection";

let add = document.querySelector('add')

function createVehiculeIcon(data) {
  const container = document.createElement('div')
  container.className = "pathTransport"
  
  const icon = document.createElement('div')
  icon.className = "pathTransport__icon"
  icon.dataset.vehicule = data.vehicule

  const percentage = document.createElement('p')
  percentage.innerText = data.percentage + '%'

  const remove = document.createElement('div')
  remove.className = "pathTransport__remove"
  remove.addEventListener('click', () => {
    container.previousElementSibling.remove()
    container.remove()
  })

  container.append(icon)
  container.append(percentage)
  container.append(remove)

  const rod = document.createElement('div')
  rod.className = "rod"

  return [container, rod]
}

function addTransport(data) {
  const [ container, rod ] = createVehiculeIcon(data)
  document.querySelector('.path').insertBefore(container, document.querySelector('.addContainer'))
  document.querySelector('.path').insertBefore(rod, document.querySelector('.addContainer'))

  if(document.querySelectorAll('.pathTransport').length >= 2) {
    document.querySelector('.addContainer').remove()
    let lastRod = [...document.querySelectorAll('.rod')].reverse()[0]
    lastRod.remove()
  }
}

function addSelection() {
  document.querySelector('.path')
}

export { addTransport }