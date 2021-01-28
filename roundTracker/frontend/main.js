window.addEventListener("DOMContentLoaded", () => {
    addEventListeners();
    renderWelcome();
})

// let user = {}

// add event listeners 
function addEventListeners() {
    let form = document.getElementsByClassName("navbar-form navbar-left")[0];
    let login = document.getElementById('login');
    let signup = document.getElementById('signup');
    let welcome = document.getElementById('welcome');
    let newRound = document.getElementById('new-round');
    let rounds = document.getElementById('rounds');
    let analytics = document.getElementById('analytics')

    login.addEventListener("click", (e) => getUser(e, form));
    signup.addEventListener("click", (e) => postUser(e, form));
    welcome.addEventListener("click", () => renderWelcome());
    newRound.addEventListener("click", () => renderCreateRound(localStorage.user))
    rounds.addEventListener("click", () => fetchPrevRounds())
    analytics.addEventListener("click", () => renderAnalytics())

}

function alertMessage(message) {
    let alert = document.createElement("div");
    alert.className="alert alert-danger";
    alert.textContent = message;
        
    let body = document.querySelector('body');
    body.appendChild(alert);
        
    setTimeout(() => {body.removeChild(alert)}, 2000);
}

// post the user on signup 
function postUser(e, form) {
    e.preventDefault()
    fetch('http://127.0.0.1:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accepts':'application/json'
        },
        body: JSON.stringify({username: form.name.value})
    })
    .then(resp => resp.json())
    .then(obj => {
        document.getElementById('login').textContent = 'Logout'
        localStorage.setItem('user', obj.username);
        document.getElementById('signup').style.visibility = "hidden"
        document.getElementsByClassName('form-control')[0].style.visibility = "hidden"
        renderCreateRound(localStorage.user)
    })
}

// get the user on login
function getUser(e, form) {
    e.preventDefault();
    let login = document.getElementById("login");
    let signup = document.getElementById('signup');
    let username = form.name.value;
    if(login.textContent === "Login"){
        fetch(`http://127.0.0.1:3000/login/${username}`)
        .then(resp => resp.json())
        .then(obj => {
            console.log(obj);
            if (obj['message']) {
                alertMessage(obj['message'])
            }else {
                localStorage.setItem('user', obj.username);
                login.textContent = 'Logout';
                signup.style.visibility = "hidden";
                document.getElementsByClassName('form-control')[0].style.visibility = "hidden";
                alertMessage('You have signed in Succesfully!!')
                //renderCreateRound(localStorage.user)
                renderCreateRound(localStorage.user);
            }
            form.name.value = "";
        })
    }else {
        localStorage.removeItem('user');
        form.name.value = "";
        form.name.style.visibility = 'visible';
        login.textContent = "Login";
        signup.style.visibility = "visible";
        alertMessage("You have been signed out!!")
        // render the welcome page 
        renderWelcome();
    };
};

// render the welcome page
function renderWelcome() {
    clearMain();

    let header = document.createElement('h2');
    let lilheader = document.createElement('h4');
    let img = document.createElement('img');
    let p = document.createElement('p');
    let br = document.createElement('br');

    img.src = "https://blog-assets.lightspeedhq.com/img/2020/04/6f706b67-golf-scorecard.jpg";
    img.style.width = "600px";
    img.style.height = "314px";
    header.textContent = "Welcome to the Round Tracker";
    lilheader.textContent = "Where your golf dreams come to life... or shatter";
    p.textContent = "This application was designed for you to check out how good your golf game really is. The first step is to signup with a username. Once you signup you will be able to create a round, as long as you follow the form and input your scores you will be able to access analytics. Once you complete your round it will take you to a page with all your previous rounds. From there you can edit or delete a round. You can also see your analytics by clicking the analytics tab. Good luck and hit it in the hole!"
    main.append(header, lilheader, img, p);
}

// called when the user logs in
// function signedIn(user) {
//     document.getElementById('login').textContent = 'Logout'
//     document.getElementById('signup').style.visibility = "hidden"
//     renderCreateRound(user)
// }

// renders the create round form 
function renderCreateRound(user) {
    if(typeof user === 'undefined'){
        renderWelcome();
        return
    }

    clearMain();

    let courseLengths = ['9 holes', '18 holes'];
    let header = document.createElement('h2');
    header.textContent = "Create a New Golf Round";
    
    let form = document.createElement('form');
    let nameLabel = document.createElement('h5');
    let nameInput = document.createElement('input');
    let courseLabel = document.createElement('h5');
    let courseDropDown = document.createElement('select');
    let lengthLabel = document.createElement('h5');
    let lengthDropDown = document.createElement('select');
    let createRound = document.createElement('button');
    let br = document.createElement('br');
    let br2 = document.createElement('br');
    
    // placeholder for holes
    // let holes = [
    //     {par:4, distance: 400},
    //     {par:3, distance: 180}
    // ]
    // placeholder for course names
    let courses = []
    fetch('http://localhost:3000/courses')
    .then(resp => resp.json())
    .then(courses => {
        console.log(courses)
        for(course of courses) {
            let option = document.createElement('option');
            option.value = course.id;
            option.textContent = course.name;
            courseDropDown.appendChild(option);
        };
    })

    courseDropDown.name = 'course';
    courseDropDown.id = 'course';
    
    
    for(length of courseLengths) {
        let option = document.createElement('option');
        option.value = length;
        option.textContent = length;
        lengthDropDown.appendChild(option);
    };
    
    courseDropDown.name = "coursename"
    lengthDropDown.name = "length"
    nameLabel.textContent = "Round Name:";
    nameInput.type = "text";
    nameInput.name = "name"
    courseLabel.textContent = "Course Name: ";
    lengthLabel.textContent = "Length of Course: ";
    createRound.textContent = "Start Round";
    createRound.type = "submit"
    form.addEventListener('submit', (e) => startRound(e));

    form.append(header, nameLabel, nameInput, lengthLabel, lengthDropDown, courseLabel, courseDropDown, br, br2, createRound);
    main.append(form);
};

function startRound(e) {
    e.preventDefault()
    let length = 0
    if(e.target.length.value === "9 holes") {
        length = 9
    }else {
        length = 18
    }
    let round = {
        name: e.target.name.value,
        length: length,
        username: localStorage.user,
        hole_rounds: []
    }
    let id= e.target.coursename.value
    fetch(`http://localhost:3000/courses/${id}`)
    .then(resp => resp.json())
    .then(course => {
        console.log(course)
        round.course = course
        renderHole(round, 1)
    })
}

function renderHole(round, index) {
    clearMain()
    // if (index < 1) {
    //     alertMessage('There is no previous hole...')
    //     renderHole(round, index+1)
    //     return
    // }else if(index > round.length){
    //     alertMessage("This is the last hole!!!")
    //     renderHole(round, round.length)
    //     return
    // }

    let header = document.createElement('h2')
    let parLabel = document.createElement('h5')
    let distLabel = document.createElement('h5')
    let next = document.createElement('button')
    let previous = document.createElement('button')
    let finish = document.createElement('button')
    let scoreLabel = document.createElement('h5')
    let scoreInput = document.createElement('input')
    let br = document.createElement('br')
    
    header.textContent = `Hole: ${index}`
    parLabel.textContent = `Par: ${round.course.holes[index].par}`
    distLabel.textContent = `Distance: ${round.course.holes[index].distance} yards`
    next.textContent = "Next Hole"
    previous.textContent = "Previous Hole"
    finish.textContent = "Finish Round"
    scoreLabel.textContent = "Strokes: "
    scoreInput.type = "text"
    scoreInput.placeholder = "Hole Score"

    next.addEventListener('click', () => {
        if(scoreInput.value === ""){
            alertMessage("You need to add a score!!")
            renderHole(round, index)
            return
        }else if(index + 1 > round.length){
            alertMessage("This is the last hole!!")
            renderHole(round, index)
            return
        }
        round.hole_rounds.push({score: parseInt(scoreInput.value), course_id: round.course.id, user: localStorage.user, hole_id: round.course.holes[index - 1].id})
        renderHole(round, index + 1)
    })
    previous.addEventListener('click', () => {
        if(scoreInput.value === ""){
            alertMessage("You need to add a score!!")
            renderHole(round, index)
            return
        }else if(index - 1 < 1) {
            alertMessage('There is no previous hole...')
            renderHole(round,index)
            return
        }
        round.hole_rounds.push({score: parseInt(scoreInput.value), course_id: round.course.id, user: localStorage.user, hole_id: round.course.holes[index - 1].id})
        renderHole(round, index - 1)
    })
    finish.addEventListener('click', () => {
        if(scoreInput.value === ""){
            alertMessage("You need to add a score!!")
            renderHole(round, index)
            return
        }
        round.hole_rounds.push({score: parseInt(scoreInput.value), course_id: round.course.id, user: localStorage.user, hole_id: round.course.holes[index - 1].id})
        finishRound(round)
    })
    
    main.append(header, parLabel, distLabel, scoreLabel, scoreInput, br, previous, next, finish)
}

function finishRound(round) {
    clearMain()
    fetch(`http://localhost:3000/new_round`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accepts": "application/json"
        },
        body: JSON.stringify(round)
    })
    .then(resp => resp.json())
    .then((round) => renderRound(round))
    //let main = document.querySelector('main')
    
}

function clearMain() {
    let main = document.getElementById('main')
    while(main.firstChild) {
        main.removeChild(main.firstChild)
    }
    //main.childNodes.forEach((child) => main.removeChild(child))
}

function fetchPrevRounds() {
    username = localStorage.user
    if(typeof username === 'undefined'){
        renderWelcome();
        return
    }
    fetch(`http://localhost:3000/user_rounds/${username}`)
    .then(resp => resp.json())
    .then(rounds => {
        console.log(rounds)
        clearMain()
        rounds.forEach(round => renderRound(round))
    })
    .catch(error => console.log(error.message))
}

function renderRound(round) {
    console.log("made it to render round")
    let holeRounds = round.hole_rounds
    let main = document.getElementById('main')
    let card = document.createElement('div')
    let cardBody = document.createElement('div')
    let cardForm = document.createElement('form')
    let titleLabel = document.createElement('h5')
    let titleInput = document.createElement('input')
    let lengthLabel = document.createElement('h5')
    let courseLabel = document.createElement('h5')
    let parLabel = document.createElement('h5')
    let scoreLabel = document.createElement('h5')
    let scoreInput = document.createElement('input')
    let del = document.createElement('button')
    let upd = document.createElement('button')
    let br = document.createElement('br')

    card.className = 'card'
    card.id = round.id
    cardBody.className = 'card-body'
    titleLabel.textContent = "Round Name:"
    titleInput.value = round.name
    titleInput.name = "name"
    titleLabel.style.position = "inline"
    lengthLabel.textContent = `Round Length: ${round.length} holes`
    courseLabel.textContent = `Course Name: ${round.course.name}`
    parLabel.textContent = `Course Par: ${round.course.par}`
    scoreLabel.textContent = "Round Score:"
    scoreInput.value = calculateScore(holeRounds)
    scoreInput.name = "score"
    del.textContent = "Delete"
    del.addEventListener('click', (e) => deleteRound(e, round.id))
    upd.textContent = "Update"
    upd.addEventListener('click', (e) => updateRound(e, cardForm, round.id))
    cardForm.append(titleLabel, titleInput, lengthLabel, courseLabel, parLabel, scoreLabel, scoreInput, br, del, upd)
    cardBody.appendChild(cardForm)
    card.appendChild(cardBody)
    main.appendChild(card)
}

function deleteRound(e, id) {
    e.preventDefault()
    // debugger
    fetch(`http://localhost:3000/rounds/${id}`, {
        method: "DELETE"
    })
    .then(() => {
        fetchPrevRounds()
        alertMessage("Round deleted succesfully, next time swing better.")
    })
}

function updateRound(e, form, id) {
    e.preventDefault()
    let roundName = {name: form.name.value}
    fetch(`http://localhost:3000/rounds/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accepts": "application/json"
        },
        body: JSON.stringify(roundName)
    })
    .then(resp => resp.json())
    .then((obj) => {
        fetchPrevRounds()
        alertMessage("Round updated succesfully!!")
        
    })
}

function calculateScore(holeRounds) {
    let sum = 0;
    holeRounds.forEach(hole => {
        sum += hole.score
    })
    return sum 
}

function renderAnalytics() {
    clearMain()
    let main = document.getElementById('main')
    let userAn = document.createElement('button')

    userAn.textContent = "User Analytics"
    userAn.addEventListener('click', () => renderUserAnalytics())
    main.append(userAn)
}

function renderUserAnalytics() {
    let main = document.getElementById('main')
    let anlabel1 = document.createElement('h5')
    let anlabel2 = document.createElement('h5')
    let anlabel3 = document.createElement('h5')
    let anlabel4 = document.createElement('h5')
    let anlabel5 = document.createElement('h5')
    let anlabel6 = document.createElement('h5')


    anlabel1.textContent = "Lifetime Eagles: "
    anlabel2.textContent = "Lifetime Birdies: "
    anlabel3.textContent = "Lifetime Pars: "
    anlabel4.textContent = "Lifetime Bogey's: "
    anlabel5.textContent = "Lifetime Double Bogey's: "
    anlabel6.textContent = "Lifetime Triple Bogey's: "

    main.append(anlabel1, anlabel2, anlabel3, anlabel4, anlabel5, anlabel6)

}