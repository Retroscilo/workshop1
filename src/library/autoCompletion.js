import spinner from "./Spinner"

let prevValue;
let timeout = false;

// la logique du timeout n'est pas la plus opti, on devrait déclencher à la dernière frappe seulement
const autoCompletion = async (input, container) => {
  input.addEventListener('keyup', async (e) => {
    let value = e.target.value
    if (value === prevValue || timeout) return
  
    container.innerHTML = ""
    if (value.length > 4) {

      setTimeout(() => { timeout = false }, 600)
      timeout = true
      prevValue = value

      container.appendChild(spinner)
      const addresses = await fetchAdresses(value)
      container.innerHTML = ""
      if (input.value.length < 5) return
      addresses.features.forEach(feat => {
        const label = createLabel(feat.properties.label)
        container.appendChild(label)
      })
    }
  })
  
  const createLabel = (label) => {
    const a = document.createElement('a')
    a.className = "dropdown-item"
    a.href = "#"
    a.innerText = label
    a.onclick = () => {
      input.value = label
      container.innerHTML = ""
    }
    return a
  }
}

async function fetchAdresses(value) {
  const res = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${value}&type=housenumber&autocomplete=1&limit=7`)
  const json = await res.json()
  return json;
}


export default autoCompletion