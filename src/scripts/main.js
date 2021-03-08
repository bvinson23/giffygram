import { getUsers, getPosts } from "./data/Datamanager.js"
import { PostList } from "./feed/PostList.js"
import { NavBar } from "./nav/NavBar.js"
import { Footer } from "./footer.js"

const showPostList = () => {
    const postElement = document.querySelector(".postList");
      getPosts().then((allPosts) => {
          postElement.innerHTML = PostList(allPosts);
      })
  }
  
const showNavBar = () => {
    // Get a reference to the location on the DOM where the nav will display
    const navElement = document.querySelector("nav");
    navElement.innerHTML = NavBar();
}
  
  const startGiffyGram = () => {
        showNavBar();
        showPostList();
        showFooter();
  }

const showFooter = () => {
    // Get a reference to the location on the DOM where the nav will display
    const footerElement = document.querySelector("footer");
    footerElement.innerHTML = Footer();
}
startGiffyGram();
getUsers();

const applicationElement = document.querySelector(".giffygram");

applicationElement.addEventListener("click", event => {
    if(event.target.id === "logout"){
        console.log("You clicked on logout")
    }
})

applicationElement.addEventListener("change", event => {
    if(event.target.id === "yearSelection") {
        const yearAsNumber = parseInt(event.target.value)

        console.log(`User wants to see posts since ${yearAsNumber}`)
    }
})

applicationElement.addEventListener("click", event => {
    if(event.target.id === "directMessageIcon"){
        alert("Compose a direct message?")
    }
})

applicationElement.addEventListener("click", event => {
    if(event.target.id === "homeIcon"){
        alert("Are you sure you want to go home?")
    }
})