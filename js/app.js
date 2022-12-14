//The following code is a dynamic way to recruit the number of navbar cards required to navigate the page
const nodeList = document.querySelectorAll("section");
const navbarList = document.querySelector("#navbar__list");
for (let i = 1; i <= nodeList.length; i++) {
    navbarList.innerHTML += '<li><a href = "#" onclick = "event.preventDefault()">Section '+ i + '</a></li>';
    //I used event.preventDefault() to avoid the screen jumping back to the top when a li is clicked
} //I could've also used .appendChild() in this loop, but felt that less code is better, simpler code

//The next lines of code use "Event Delegation" to sense a click event and then
// auto scroll to the desired section of the DOM
let navbarMenu = navbarList.children;
function scrollOnClick(event) {
    let temp;
    if (event.target.nodeName = 'li') {
        for (let i = 0; i < navbarMenu.length; i++) { //This for loop filters out which index of the navbar was clicked
            if (event.target.innerText == navbarMenu[i].innerText) {
                temp = i;
                break;
            }
        }
        //The temp variable is used to find the navbar's corresponding node
        nodeList[temp].scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest"
        })
    }
}


//Scroll upon selection
navbarList.addEventListener('click', scrollOnClick);


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
//Also found some info on optional chaining at: https://www.freecodecamp.org/news/how-the-question-mark-works-in-javascript/
function inViewport (section) {
    const rect = section?.getBoundingClientRect();
    const rectHalf = (rect?.height/2)
    return (rect?.top >= (-1 * rectHalf) && rect?.bottom <= (window.innerHeight + rectHalf));
    //when the DOMrect is halfway scrolled past, it is no longer active
}
let counter = 0; //section in viewport correlated to navbar display
function update() {
    for (let i = 0; i < nodeList.length; i++) {
        let section = nodeList[i];
        if (inViewport(section)) {
            if (!section.classList.contains("your-active-class")) {
                counter = i;
                section.classList.add("your-active-class");
            }
        } else {
            section?.classList.remove("your-active-class");
        }
    }
    if (!navbarMenu[counter].classList.contains("display")) {
        navbarMenu[counter].classList.add("display");
        for (let j = 0; j < navbarMenu.length; j++) {
            if(navbarMenu[j] != navbarMenu[counter]) {
                navbarMenu[j].classList.remove("display");
            }
        }
    }
}
document.addEventListener("scroll", update);
update();