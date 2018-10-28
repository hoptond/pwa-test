window.addEventListener('online', updateStatus)
window.addEventListener('offline', updateStatus)
document.addEventListener('DOMContentLoaded', updateStatus)

function updateStatus() {
    if(navigator.onLine) {
        document.querySelector('#search').classList.remove('hidden')
        document.querySelector('#offline').classList.add('hidden')
    } else {
        document.querySelector('#offline').classList.remove('hidden')
        document.querySelector('#search').classList.add('hidden')
    }
}