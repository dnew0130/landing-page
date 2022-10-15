//The following code is a dynamic way to recruit the number of navbar cards required to navigate the page
const nodeList = document.querySelectorAll(".landing__container");
const navbarList = document.querySelector("#navbar__list");
for (let i = 1; i <= nodeList.length; i++) {
    navbarList.innerHTML += '<li><a href = "#" onclick = "event.preventDefault()">Section '+ i + '</a></li>';
    //I used event.preventDefault() to avoid the screen jumping back to the top when a li is clicked
} //I could've also used .appendChild() in this loop, but felt that less code is better, simpler code


let temp = 0; //This is a globally accessible variable that determines which section and button are active

//The next lines of code use "Event Delegation" to sense a click event and then
// auto scroll to the desired section of the DOM
let navbarMenu = navbarList.children;
function scrollOnClick(event) {
    if (event.target.nodeName = 'li') {
        for (let i = 0; i < navbarMenu.length; i++) { //This for loop filters out which index of the navbar was clicked
            if (event.target.innerText == navbarMenu[i].innerText) {
                temp = i;
                break;
            }
        }
        //The temp variable is used to find the navbar's corresponding node
        myActiveClass();
        nodeList[temp].scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest"
        })
    }
}


//Scroll upon selection
navbarList.addEventListener('click', scrollOnClick);



//Function for active status for article sections
function myActiveClass() {
    let currentActiveClass = document.querySelector(".your-active-class");
    let newActiveClass = nodeList[temp];
    if (newActiveClass != currentActiveClass) {
        currentActiveClass.classList.remove("your-active-class");
        newActiveClass.parentNode.classList.add("your-active-class");
        //.parentNode because nodeList is a list of the landing containers
    }
}

//Active status for toggling button and section cards
const button = document.querySelector(".button");

        //any time the button or a list item is clicked, the list disappears/appears in mobile mode
function toggleButton() {
    navbarList.classList.toggle("active");
}

button.addEventListener("click", toggleButton);
navbarList.addEventListener("click", toggleButton);



//Active status when mouse hovers over specific landing container
//Watched tutorial for .getBoundingClientRect() here: https://www.youtube.com/watch?v=MKpZadkuT-0

function inViewport (section) {
    const bounding = section.getBoundingClientRect();
    return (bounding.top >= 0 && bounding.bottom <= document.documentElement.clientHeight); //A section is in the viewport when the DOMRect top is =< 0, and when the bottom is less than or equal to a user's viewport height
}
function update() {
    for (let i = 1; i <= nodeList.length; i++) {
        let section = nodeList[i].parentNode;
        if (inViewport(section)) {
            if (!section.classList.contains("your-active-class")) {
                section.classList.add("your-active-class");
            }
        } else {
            section.classList.remove("your-active-class");
        }
    }
}
document.addEventListener("scroll", update);