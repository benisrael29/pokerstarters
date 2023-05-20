
// This file contains the code for the search bar and the popup

//Document components 
const listItems = document.querySelectorAll("#list li");
const popup = document.getElementById("popup");
const popupContent = document.getElementById("popup-content");
const closePopup = document.getElementById("close-popup");
const overlay = document.getElementById("popup-overlay");
const popupTerm = document.getElementById("popup-term");


function search_term() {
    let input = document.getElementById('searchbar').value
    input=input.toLowerCase();
    let x = document.getElementsByClassName('term');
      
    for (i = 0; i < x.length; i++) { 
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display="none";
        }
        else {
            x[i].style.display="list-item";                 
        }
    }
}


  

listItems.forEach((item) => {
  item.addEventListener("click", () => {
    //Get defintion and add it to popup
    const content = item.getAttribute("data-content");
    const term = item.textContent;

    popupContent.textContent = content;
    popupTerm.textContent = term;

    //Display popup
    overlay.classList.remove("hidden");
    popup.classList.remove("hidden");

    
    //Add listener for pressing of close button
    const closeButton = popup.querySelector('.close-popup');
    closeButton.onclick = () => { 
        popup.classList.add("hidden") 
        overlay.classList.add("hidden")};
    
    //Add lsitener for pressing of non popup area
    window.onclick = (event) => {
      if (event.target === popup) {
        popup.classList.add("hidden")
        overlay.classList.add("hidden")
      }
    };
  });


});


