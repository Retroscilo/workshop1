let add = document.querySelector('.addContainer')

function createVehiculeIcon(data, trajet) {
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
    if(document.querySelectorAll(`.path[data-trajet=${trajet}] .pathTransport`).length === 1) addSelection(trajet)
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

function addTransport(data, trajet) {
  const [ container, rod ] = createVehiculeIcon(data, trajet)
  document.querySelector(`.path[data-trajet=${trajet}]`).insertBefore(container, document.querySelector('.addContainer'))
  document.querySelector(`.path[data-trajet=${trajet}]`).insertBefore(rod, document.querySelector('.addContainer'))

  if(document.querySelectorAll(`.path[data-trajet=${trajet}] .pathTransport`).length >= 2) {
    document.querySelector(`.path[data-trajet=${trajet}] .addContainer`).remove()
    let lastRod = [...document.querySelectorAll(`.path[data-trajet=${trajet}] .rod`)].reverse()[0]
    lastRod.remove()
  }
}

function addSelection(trajet) {
  let rods = [...document.querySelectorAll(`.path[data-trajet=${trajet}] .rod`)].reverse()
  document.querySelector(`.path[data-trajet=${trajet}]`).insertBefore(add, rods[0])
  document.querySelector(`.path[data-trajet=${trajet}]`).insertBefore(createRod(), add)
}

export { addTransport }