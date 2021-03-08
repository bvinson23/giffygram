import { getUsers, getPosts } from "./data/Datamanager.js"
import { PostList } from "./feed/PostList.js"
import { NavBar } from "./NavBar.js"
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
      showPostList();
  }

const showFooter = () => {
    // Get a reference to the location on the DOM where the nav will display
    const footerElement = document.querySelector("footer");
    footerElement.innerHTML = Footer();
}
startGiffyGram(showNavBar(), showFooter());
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