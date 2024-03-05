const alert = document.querySelector(".alert");

export function getNotify(message) {
    alert.innerHTML = message;
    alert.classList.add("alert-hidden");
    setTimeout(()=> {
        alert.classList.remove("alert-hidden")
    }, 1500)
}