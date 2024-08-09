// TODO: Pulire il codice. Per favore.




var content = document.getElementById("main-content");
let navbar = document.querySelectorAll(".button");
let content_inner = "";

function button_click(event){

    replaceMainContent(event.target.getAttribute("any"));
    loadCards();


}

navbar.forEach(

    (button) => {

        button.addEventListener("click", button_click)


    }



)



function replaceMainContent(url){
    let req = new XMLHttpRequest();

    req.onloadend = async() => {

        content.innerHTML = req.responseText;

        
    };
    req.open('GET',url, false);
    req.send();
}
replaceMainContent("about-me.html");



const handleOnMouseMove = e => {

    const {currentTarget: target} = e;
    const rect = target.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;
        target.style.setProperty("--mouse-x", `${x}px`);
        target.style.setProperty("--mouse-y", `${y}px`);

}


function loadCards(){

const xhr = new XMLHttpRequest();
const url = "https://api.github.com/users/ReiettoAyanami/repos"
var repos = [];
let card_container = document.querySelector('.project-cards-container');

xhr.open('GET', url, true);
xhr.onload = 
function(){

const data = JSON.parse(this.response);

for(d of data){
    repos.push({name: d['name'], url: d['html_url']});

    let card = document.createElement("a");
        card.setAttribute("class", "card");
    let title = document.createElement("a");
        title.setAttribute("class", "card-title");
        title.innerText = d['name'];
        card.appendChild(title);
        card.href =  d['html_url'];
        card.onmousemove = e => handleOnMouseMove(e);
        card_container.appendChild(card);

    }
};



xhr.send();

}


loadCards();

