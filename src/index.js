// index.js


// Callbacks

// create a callback function called handleClick() that displays the details for a specific chosen ramen
const handleClick = (ramen) => {
    const detailImageElement = document.querySelector('.detail-image')
    detailImageElement.src = ramen.image
    // ^^ get the image property to show up

    const nameElement = document.querySelector('.name')
    nameElement.textContent = ramen.name
    // ^^ get the ramen name property to show up

    const restaurantElement = document.querySelector('.restaurant')
    restaurantElement.textContent = ramen.restaurant
    // ^^ get the restaurant name property to show up

    const ratingElement = document.getElementById('rating-display')
    ratingElement.textContent = ramen.rating
    // ^^ get the rating property to show up

    const commentElement = document.getElementById('comment-display')
    commentElement.textContent = ramen.comment
    // get the comment property to show up

    
}


// DELIV #3: so the user can add a new ramen, create a submit form and listener
const addSubmitListener = () => {
  // store the new form in a variable
  const addNewRamenForm = document.getElementById('new-ramen')
  // add a submit listener to the form
  addNewRamenForm.addEventListener('submit', (event) => {
      event.preventDefault() // prevents the page from refreshing after submit so the new ramen can be viewed in the menu
      
      // collect/store the data from the user's input to variables
      const newName = document.getElementById('new-name')
      const newRestaurant = document.getElementById('new-restaurant')
      const newImage = document.getElementById('new-image')
      const newRating = document.getElementById('new-rating')
      const newComment = document.getElementById('new-comment')

      // create a new object to have the same ramens array keys pairs
      const newRamen = {
        name: newName.value,
        restaurant: newRestaurant.value,
        image: newImage.value,
        rating: newRating.value,
        comment: newComment.value
      }

      // add the new ramen input to the menu using the callback function
      addToRamenMenu(newRamen)
      // use .reset() function to clear the input within the form after submitted
      addNewRamenForm.reset() 
  })
}

// create a function that adds image elements to the menu header and creates a click event for them
function addToRamenMenu(ramen) {
    // store the menu header element in a variable
    const ramenMenu = document.getElementById('ramen-menu')
    const imageElement = document.createElement('img')  // create an image element
    imageElement.src = ramen.image                      // select the image property and assign it to the image element
    ramenMenu.appendChild(imageElement)                 // append the image to the ramen menu

    // create a click event on the images from the menu header: 
    imageElement.addEventListener('click', () => {
      handleClick(ramen)
    })
    // ^^ DELIV #2: Click on an image from the #ramen-menu div and fire a callback called handleClick to see all the info about that ramen displayed.

    // ADV DELIV #2: Delete a ramen >>>

    // create a div element
    const divElement = document.createElement('div')

    // create a button element
    const deleteButton = document.createElement('button') 

    // Set the textContent attribute for the button so it has value of "X"
    deleteButton.textContent = "X" 

    // append the ramen image from the menu --> to the div element
    divElement.appendChild(imageElement)

    // append the delete button --> to the div element
    divElement.appendChild(deleteButton)

    // append the div element --> to the menu header
    ramenMenu.appendChild(divElement)
    
    // finally, add a click event listener for the button to execute the .remove() function
    deleteButton.addEventListener('click', () => {
      divElement.remove()
    })
}


// DELIV #1: When the page loads, fire a function called displayRamens that requests the data from the server to get all the ramen objects.
function displayRamens() {
  // now we must request the data from the server to get all the ramen objects
  fetch ('http://localhost:3000/ramens')
  .then(response => response.json())
  .then(ramens => { 
    ramens.forEach(ramen => addToRamenMenu(ramen))
    handleClick(ramens[0]) // <-- ADV DELIV #1: See the details for the first ramen as soon as the page loads (without clicking on an image)
  })
}

const main = () => {
  document.addEventListener('DOMContentLoaded', () => {
      // Invoke displayRamens here
      displayRamens()
      // Invoke addSubmitListener here
      addSubmitListener()
  })
}
/* ^^^^ DELIV #4: 
Your program should have a main() function that invokes displayRamens 
and addSubmitListener after the DOM has fully loaded and start the program logic.
*/

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
