window.addEventListener("DOMContentLoaded", () => {
    addEventListeners()
})

// let user = {}

// add event listeners 
function addEventListeners() {
    let form = document.getElementsByClassName("navbar-form navbar-left")[0]
    console.log(form)
    let login = document.getElementById('login')
    let signup = document.getElementById('signup')

    login.addEventListener("click", () => getUser(form))
    signup.addEventListener("click", () => postUser(form))
}

// post the user on signup 
function postUser(form) {
    fetch('http://127.0.0.1:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accepts':'application/json'
        },
        body: JSON.stringify({username: form.name.value})
    })
    .then(resp => resp.json())
    .then(obj => signedIn(obj))
}

// get the user on login
function getUser(form) {
    username = form.name.value
    fetch(`http://127.0.0.1:3000/login/${username}`)
    .then(resp => resp.json())
    .then(obj => {
        console.log(obj)
        if (obj['message']) {
            let alert = document.createElement("div")
            alert.className="alert alert-danger"
            alert.textContent = obj['message']

            let body = document.querySelector('body')
            setTimeout(() => {body.appendChild(alert)}, 500)
        }else {
            console.log(obj)
            signedIn(obj)
        }
    })
}

// render the welcome page
function renderWelcome() {

}

// called when the user logs in
function signedIn(user) {
    document.getElementById('login').textContent = 'Logout'
    document.getElementById('signup').style.visibility = "hidden"
    renderCreateRound(user)
}

// renders the create round form 
function renderCreateRound(user) {
    let main = document.getElementById('main')
    main.childNodes.forEach((child) => child.remove() )

    let header = document.createElement('h2')
    header.textContent = "Create a New Golf Round"

    let form = document.createElement('form')
    let nameLabel = document.createElement('h4')
    nameLabel.textContent = "Round Name:"
    let nameInput = document.createElement('input')
    nameInput.type = "text"

    

    form.append(header, nameLabel, nameInput)
    main.append(form)

}