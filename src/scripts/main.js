import { getUsers, getPosts } from "./data/Datamanager.js"
import { PostList } from "./feed/PostList.js"
import { NavBar } from "./NavBar.js"
/**
 * Main logic module for what should happen on initial page load for Giffygram
 */


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
/*
    This function performs one, specific task.

    1. Can you explain what that task is?
    2. Are you defining the function here or invoking it?
*/
// Are you defining the function here or invoking it?
startGiffyGram(showNavBar());
getUsers();

