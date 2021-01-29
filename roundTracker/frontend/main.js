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
        
    setTimeout(() => {body.removeChild(alert)}, 3000);
}

// post the user on signup 
function postUser(e, form) {
    e.preventDefault()
    let signup = document.getElementById('signup');
    if(signup.textContent === "Signup") {
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
            signup.textContent = "Delete User"
            document.getElementsByClassName('form-control')[0].style.visibility = "hidden"
            renderCreateRound(localStorage.user)
        })
    }else if (signup.textContent === "Delete User"){
        deleteUser()
    }
}

function deleteUser() {
    username = localStorage.user
    fetch(`http://localhost:3000/users/${username}`, {
        method: "DELETE"
    })
    .then(() => {
        let login = document.getElementById('login')
        let input = document.getElementById('userinput')
        alertMessage("Your profile has been deleted...")
        signup.textContent = "Signup"
        login.textContent = "login"
        localStorage.removeItem("user")
        input.style.visibility = 'visible';
        input.value = ""
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
            if (obj['message']) {
                alertMessage(obj['message'])
            }else {
                localStorage.setItem('user', obj.username);
                login.textContent = 'Logout';
                signup.textContent = "Delete User"
                document.getElementsByClassName('form-control')[0].style.visibility = "hidden";
                alertMessage('You have signed in Succesfully!!')
                renderCreateRound(localStorage.user);
            }
            form.name.value = "";
        })
    }else {
        localStorage.removeItem('user');
        form.name.value = "";
        form.name.style.visibility = 'visible';
        login.textContent = "Login";
        signup.textContent = "Signup";
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
    let br2 = document.createElement('br');
    let br3 = document.createElement('br');
    let br4 = document.createElement('br');



    img.src = "https://blog-assets.lightspeedhq.com/img/2020/04/6f706b67-golf-scorecard.jpg";
    img.style.width = "600px";
    img.style.height = "314px";
    header.textContent = "Welcome to the Round Tracker";
    lilheader.textContent = "Where your golf dreams come to life... or shatter";
    p.textContent = "This application was designed for you to check out how good your golf game really is. The first step is to signup with a username. Once you signup you will be able to create a round, as long as you follow the form and input your scores you will be able to access analytics. Once you complete your round it will take you to a page with all your previous rounds. From there you can edit or delete a round. You can also see your analytics by clicking the analytics tab. Good luck and hit it in the hole!"
    main.append(br, header, lilheader, br2, img, p, br4);
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
    let br3 = document.createElement('br');

    
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

    form.append(br3, header, nameLabel, nameInput, lengthLabel, lengthDropDown, courseLabel, courseDropDown, br, br2, createRound);
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
        round.course = course
        renderHole(round, 1)
    })
}

function renderHole(round, index) {
    clearMain()
    
    console.log(round)
    let header = document.createElement('h2')
    let parLabel = document.createElement('h5')
    let distLabel = document.createElement('h5')
    let next = document.createElement('button')
    let previous = document.createElement('button')
    let finish = document.createElement('button')
    let scoreLabel = document.createElement('h5')
    let scoreInput = document.createElement('input')
    let img = document.createElement('img')
    let br = document.createElement('br')
    let br1 = document.createElement('br')
    let br2 = document.createElement('br')

    img.src = round.course.holes[index - 1].image
    img.id = "renderhole"
    header.textContent = `Hole: ${index}`
    parLabel.textContent = `Par: ${round.course.holes[index - 1].par}`
    distLabel.textContent = `Distance: ${round.course.holes[index - 1].distance} yards`
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
        }
        if(index + 1 > round.length){
            alertMessage("This is the last hole!!")
            renderHole(round, round.length)
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
    
    main.append(br2, header, img, parLabel, distLabel, scoreLabel, scoreInput, br, br1, previous, next, finish)
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
        clearMain()
        if(rounds.length == 0) {
            alertMessage("You need to create a round first!")
            return
        }
        rounds.forEach(round => renderRound(round))
    })
    .catch(error => console.log(error.message))
}

function renderRound(round) {
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
    //let scoreInput = document.createElement('input')
    let del = document.createElement('button')
    let upd = document.createElement('button')
    let br = document.createElement('br')
    let br1 = document.createElement('br')
    let br2 = document.createElement('br')
    let br3 = document.createElement('br')
    let br4 = document.createElement('br')


    let par = 0
    if(round.length == 18) {
        par = round.course.par
    }else {
        par = (round.course.par/2)
    }

    card.className = 'card'
    card.id = round.id
    cardBody.className = 'card-body'
    titleLabel.textContent = "Round Name:"
    titleLabel.style.fontWeight = "bold"
    titleInput.value = round.name
    titleInput.name = "name"
    titleLabel.style.position = "inline"
    lengthLabel.innerHTML = `<b>Round Length:</b> ${round.length} holes`
    courseLabel.innerHTML = `<b>Course Name:</b> ${round.course.name}`
    parLabel.innerHTML = `<b>Course Par:</b> ${par}`
    scoreLabel.innerHTML = `<b>Round Score:</b> ${calculateScore(holeRounds)}`
    //scoreInput.value = calculateScore(holeRounds)
    //scoreInput.name = "score"
    del.textContent = "Delete"
    del.addEventListener('click', (e) => deleteRound(e, round.id))
    upd.textContent = "Update"
    upd.addEventListener('click', (e) => updateRound(e, cardForm, round.id))
    cardForm.append(titleLabel, titleInput, lengthLabel, courseLabel, parLabel, scoreLabel, br, br3, del, upd)
    cardBody.appendChild(cardForm)
    card.append(cardBody, br1)
    main.append(br2, card, br4)
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
    user = localStorage.user
    if(typeof user === 'undefined'){
        renderWelcome();
        return
    }
    clearMain()
    let main = document.getElementById('main')
    let header = document.createElement('h2')
    let userAn = document.createElement('button')
    let roundAn = document.createElement('button')
    let courseAn = document.createElement('button')
    let br = document.createElement('br')
    let br2 = document.createElement('br')

    header.textContent = "Analytics"
    userAn.textContent = "User Analytics"
    roundAn.textContent = "Round Analytics"
    courseAn.textContent = "Course Analytics"
    userAn.addEventListener('click', () => fetchUserAnalytics())
    roundAn.addEventListener('click', () => fetchUserRounds())
    courseAn.addEventListener('click', () => fetchCourses())
    main.append(br, header, br2, courseAn, userAn, roundAn)
}

function fetchCourses() {
    clearMain()
    renderAnalytics()
    fetch(`http://localhost:3000/courses`)
    .then(resp => resp.json())
    .then(courses => courseAnalytics(courses))
}

function courseAnalytics(courses, value = null) {
    let courseDD = document.createElement('select');
    let label = document.createElement('h4')
    let main = document.getElementById('main')
    let button = document.createElement('button')
    for(course of courses){
        let option = document.createElement('option')
        option.value = course.id
        option.textContent = course.name
        courseDD.appendChild(option)
    }
    if(value != null) {
        courseDD.value = value
    }
    courseDD.name = "dropDown"
    button.textContent = "See Course Analytics"
    button.addEventListener('click', (e) => fetchCourseAnalytics(e, courses))
    label.textContent = "Course: "
    main.append(label, courseDD, button)
}

function fetchCourseAnalytics(e, courses) {
    id = e.target.parentNode.querySelector('select').value 
    clearMain()
    renderAnalytics()
    courseAnalytics(courses, id)
    fetch(`http://localhost:3000/courses/analytics/${id}`)
    .then(resp => resp.json())
    .then(data => renderAllCourseAnalytics(data))
}

function renderAllCourseAnalytics(data) {
    let main = document.getElementById('main')
    let courseLabel = document.createElement('h2')
    let analytics = document.createElement('div')
    let anlabel1 = document.createElement('h5')
    let anlabel2 = document.createElement('h5')
    let anlabel3 = document.createElement('h5')
    let anlabel4 = document.createElement('h5')
    let anlabel5 = document.createElement('h5')
    let anlabel6 = document.createElement('h5')
    let br = document.createElement('br');

    analytics.id = 'analytics'
    anlabel1.textContent = `Eagles: ${data.eagles} of ${data.holes} holes`
    anlabel2.textContent = `Birdies: ${data.birdies} of ${data.holes} holes`
    anlabel3.textContent = `Pars: ${data.pars} of ${data.holes} holes`
    anlabel4.textContent = `Bogey's: ${data.bogey} of ${data.holes} holes`
    anlabel5.textContent = `Double Bogey's: ${data.db} of ${data.holes} holes`
    courseLabel.textContent = `Course: ${data.name}`

    analytics.append(courseLabel, br, anlabel1, anlabel2, anlabel3, anlabel4, anlabel5, anlabel6)
    main.append(analytics)
}

function fetchUserAnalytics() {
    username = localStorage.user
    fetch(`http://localhost:3000/analytics/${username}`)
    .then(resp => resp.json())
    .then(data => renderUserAnalytics(data))
    .catch(() => {
        alertMessage("You do not have any analytics to see.")
    })
}


function renderUserAnalytics(data, rounds = null) {
    let main = document.getElementById('main')
    let dropDown = main.querySelector('select')
    let value = dropDown.value
    clearMain()
    renderAnalytics()
    if(rounds != null) {
        renderFirstRoundAnalytics(rounds, value)
    }
    let analytics = document.createElement('div')
    let anlabel1 = document.createElement('h5')
    let anlabel2 = document.createElement('h5')
    let anlabel3 = document.createElement('h5')
    let anlabel4 = document.createElement('h5')
    let anlabel5 = document.createElement('h5')
    let anlabel6 = document.createElement('h5')
    let br = document.createElement('br');

    analytics.id = 'analytics'
    anlabel1.textContent = `Eagles: ${data.eagles} of ${data.holes} holes`
    anlabel2.textContent = `Birdies: ${data.birdies} of ${data.holes} holes`
    anlabel3.textContent = `Pars: ${data.pars} of ${data.holes} holes`
    anlabel4.textContent = `Bogey's: ${data.bogey} of ${data.holes} holes`
    anlabel5.textContent = `Double Bogey's: ${data.db} of ${data.holes} holes`

    analytics.append(anlabel1, anlabel2, anlabel3, anlabel4, anlabel5, anlabel6, br)
    main.append(analytics, br)

}

function renderFirstRoundAnalytics(rounds, value = null) {
    let roundDD = document.createElement('select');
    let label = document.createElement('h4')
    let main = document.getElementById('main')
    let button = document.createElement('button')
    for(round of rounds){
        let option = document.createElement('option')
        option.value = round.id
        option.textContent = round.name
        roundDD.appendChild(option)
    }
    if(value != null) {
        roundDD.value = value
    }
    roundDD.name = "dropDown"
    button.textContent = "See Round Analytics"
    button.addEventListener('click', (e) => fetchRoundAnalytics(e,rounds))
    label.textContent = "Round: "
    main.append(label, roundDD, button)
}

function fetchUserRounds() {
    let main = document.getElementById('main')
    let dropDown = main.querySelector('select')
    let value = null
    if(dropDown) {
        value = dropDown.value
    }
    clearMain()
    renderAnalytics()
    fetch(`http://localhost:3000/users/rounds/${localStorage.user}`)
    .then(resp => resp.json())
    //.then(rounds => console.log(rounds))
    .then(rounds => renderFirstRoundAnalytics(rounds, value))
}

function fetchRoundAnalytics(e, rounds) {
    id = e.target.parentNode.querySelector('select').value 
    fetch(`http://localhost:3000/users/${localStorage.user}/${id}`)
    .then(resp => resp.json())
    .then(round => renderUserAnalytics(round, rounds))
}

// function renderSecondRoundAnalytics(round) {
//     let main = document.getElementById('main')
//     let 
// }