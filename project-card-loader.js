// TODO: Pulire il codice. Per favore.


class PageLoader{

    constructor(content, navbar){
        
        this.content = content;
        this.navbar = navbar;

        this.navbar.forEach(

            (button) => {
        
                button.addEventListener("click", 

                    (e) => {
                        let url = e.target.getAttribute("any");
                        this.replaceContent(url);

                        // No per favore
                        if(url == "about-me.html")
                            loadCards();


                    }


                )
        
        
            }
        
        
        
        )

    }




    replaceContent(url) {
        
        let req = new XMLHttpRequest();

        req.onloadend = async() => {

        this.content.innerHTML = req.responseText;

        
        };
        req.open('GET',url, false);
        req.send();

    }

};





var content = document.getElementById("main-content");
let navbar = document.querySelectorAll(".button");
let content_inner = "";
let replacer = new PageLoader(content, navbar);

replacer.replaceContent('about-me.html');


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

