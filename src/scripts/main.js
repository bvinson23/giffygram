import { getUsers, getPosts, usePostCollection } from "./data/Datamanager.js"
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
    // Get a reference to the location on the DOM where the footer will display
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

// applicationElement.addEventListener("change", event => {
//     if(event.target.id === "yearSelection") {
//         const yearAsNumber = parseInt(event.target.value)

//         console.log(`User wants to see posts since ${yearAsNumber}`)
//     }
// })

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

applicationElement.addEventListener("click", event => {
    if(event.target.id.startsWith("edit")){
        console.log("post clicked", event.target.id.split("--"))
        console.log("the id is", event.target.id.split("--")[1])
    }
})

applicationElement.addEventListener("change", event => {
    if (event.target.id === "yearSelection") {
        const yearAsNumber = parseInt(event.target.value)
        console.log(`User wants to see posts since ${yearAsNumber}`)
        // invoke a filter function passing the year as an argument
        showFilteredPosts(yearAsNumber);
    }
})

const showFilteredPosts = (year) => {
    // get a copy of the post collection
    const epoch = Date.parse(`01/01/${year}`);
    // filter the data
    const filteredData = usePostCollection().filter(singlePost => {
        if (singlePost.timestamp >= epoch) {
            return singlePost
        }
    })
    const postElement = document.querySelector(".postList");
    postElement.innerHTML = PostList(filteredData);
}
