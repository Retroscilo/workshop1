import initVehiculeSelection from "./vehiculeSelection";

let add = document.querySelector('.addContainer')
console.log(add)

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
    if(document.querySelectorAll('.pathTransport').length === 1) addSelection()
  })

  container.append(icon)
  container.append(percentage)
  container.append(remove)

  let rod = createRod()

  return [container, rod]
}

function createRod () {
  const rod = document.createElement('div')
  rod.className = "rod"

  return rod
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
  let rods = [...document.querySelectorAll('.rod')].reverse()
  console.log(rods[0].previousElementSibling)
  document.querySelector('.path').insertBefore(add, rods[0])
  document.querySelector('.path').insertBefore(createRod(), add)
}

export { addTransport }