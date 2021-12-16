const spinner = document.createElement('div')
spinner.className = "spinner-border spinner-border-sm m-5"
spinner.role = "status"

const aria = document.createElement('div')
aria.className = "visually hidden"
aria.innerText = "Loading..."

export default spinner