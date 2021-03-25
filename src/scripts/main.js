//---------------IMPORTS-------------------//

import {
    getUsers, getPosts, usePostCollection, getLoggedInUser, createPost,
    deletePost, getSinglePost, updatePost,
    logoutUser, setLoggedInUser, loginUser, registerUser, getMyPosts, postLike
} from "./data/Datamanager.js"
import { PostList } from "./feed/PostList.js"
import { NavBar } from "./nav/NavBar.js"
import { Footer } from "./footer.js"
import { PostEntry } from "./feed/PostEntry.js"
import { PostEdit } from "./feed/PostEdit.js"
import { LoginForm } from "./auth/LoginForm.js"
import { RegisterForm } from "./auth/RegisterForm.js"

//global variable for where to place the post list on the DOM
const postElement = document.querySelector(".postList");

//-----------FUNCTIONS TO START THE SITE---------------------//

//function to show the navbar
const showNavBar = () => {
    // Get a reference to the location on the DOM where the nav will display
    const navElement = document.querySelector("nav");
    navElement.innerHTML = NavBar();
}

//function to show the form to create a new post
const showPostEntry = () => {
    //Get a reference to the location on the DOM where the nav will display
    const entryElement = document.querySelector(".entryForm");
    entryElement.innerHTML = PostEntry()
}

//function to show a list of all posts from newest to oldest
const showPostList = () => {
    getPosts().then((allPosts) => {
        postElement.innerHTML = PostList(allPosts.reverse());
    })
}

//function to show the footer
const showFooter = () => {
    // Get a reference to the location on the DOM where the footer will display
    const footerElement = document.querySelector("footer");
    footerElement.innerHTML = Footer();
}

//function that returns all the users in the db
getUsers();

//function to check to see if there is a logged in user
const checkForUser = () => {
    if (sessionStorage.getItem("user")) {
        setLoggedInUser(JSON.parse(sessionStorage.getItem("user")));
        startGiffyGram();
    } else {
        //show login/register
        showLoginRegister();
    }
}

//function to boot the site
const startGiffyGram = () => {
    showNavBar();
    showPostEntry();
    showPostList();
    showFooter();
}

//function to boot up the site while checking for a logged in user
checkForUser();

//-----------OTHER FUNCTIONS----------------//

//function to show filtered posts based on year from the footer dropdown
const showFilteredPosts = (year) => {
    // get a copy of the post collection
    const epoch = Date.parse(`01/01/${year}`);
    // filter the data
    const filteredData = usePostCollection().filter(singlePost => {
        if (singlePost.timestamp >= epoch) {
            return singlePost
        }
    })
    postElement.innerHTML = PostList(filteredData);
}

//function to show the edit form 
const showEdit = (postObj) => {
    const entryElement = document.querySelector(".entryForm");
    entryElement.innerHTML = PostEdit(postObj);
}


//----------EVENT LISTENERS-------------------//

//global variable for use in event listeners
const applicationElement = document.querySelector(".giffygram");

//function to show the login & register forms
const showLoginRegister = () => {
    showNavBar();
    const entryElement = document.querySelector(".entryForm");
    //template strings can be used here too
    entryElement.innerHTML = `${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
    //make sure the post list is cleared out too
    postElement.innerHTML = "";
}

//event listener for registering a user
applicationElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id === "register__submit") {
        //collect all the details into an object
        const userObject = {
            name: document.querySelector("input[name='registerName']").value,
            email: document.querySelector("input[name='registerEmail']").value
        }
        registerUser(userObject)
        .then(dbUserObj => {
            sessionStorage.setItem("user", JSON.stringify(dbUserObj));
            startGiffyGram();
        })
    }
})

//event listener for logging in a user
applicationElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id === "login__submit") {
        //collect all the details into an object
        const userObject = {
            name: document.querySelector("input[name='name']").value,
            email: document.querySelector("input[name='email']").value
        }
        loginUser(userObject)
        .then(dbUserObj => {
            if (dbUserObj) {
                sessionStorage.setItem("user", JSON.stringify(dbUserObj));
                startGiffyGram();
            } else {
                //got a false value - no user
                const entryElement = document.querySelector(".entryForm");
                entryElement.innerHTML = `<p class="center">That user does not exist. Please try again or register for your free account.</p> ${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
            }
        })
    }
})

//event listener for My Grams button
applicationElement.addEventListener("click", event => {
    
    if (event.target.id === "myPosts") {
        getMyPosts().then((allPosts) => {
            postElement.innerHTML = PostList(allPosts.reverse());
        })
    }
})

//event listener to logout
applicationElement.addEventListener("click", event => {
    if (event.target.id === "logout") {
        logoutUser();
        console.log(getLoggedInUser());
    }
})

//event listener to clear the form when the cancel button is pressed
applicationElement.addEventListener("click", event => {
    if (event.target.id === "newPost__cancel") {
        //clear the input fields
    }
})

//event listener to add a new post to the database when the submit button is clicked
applicationElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id === "newPost__submit") {
        //collect the input values into an object to post to the DB
        const title = document.querySelector("input[name='postTitle']")
        const url = document.querySelector("input[name='postURL']")
        const description = document.querySelector("textarea[name='postDescription']")
        //we have not created a user yet - for now, we will hard code `1`.
        //we can add the current time as well
        const postObject = {
            title: title.value,
            imageURL: url.value,
            description: description.value,
            userId: getLoggedInUser().id,
            timestamp: Date.now()
        }
        
        // be sure to import from the DataManager
        createPost(postObject)
        .then(response => {
            showPostList();
        })
        .then(document.getElementById("newPost").reset())
    }
})

//event listener to delete a post
applicationElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id.startsWith("delete")) {
        const postId = event.target.id.split("__")[1];
        deletePost(postId)
        .then(response => {
            showPostList();
        })
    }
})

//event listener for editing a post
applicationElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id.startsWith("edit")) {
        const postId = event.target.id.split("__")[1];
        getSinglePost(postId)
        .then(response => {
            showEdit(response);
        })
    }
})

//event listener for updating a post
applicationElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id.startsWith("updatePost")) {
        const postId = event.target.id.split("__")[1];
        //collect all the details into an object
        const title = document.querySelector("input[name='postTitle']").value
        const url = document.querySelector("input[name='postURL']").value
        const description = document.querySelector("textarea[name='postDescription']").value
        const timestamp = document.querySelector("input[name='postTime']").value
        
        const postObject = {
            title: title,
            imageURL: url,
            description: description,
            userId: getLoggedInUser().id,
            timestamp: parseInt(timestamp),
            id: parseInt(postId)
        }
        
        updatePost(postObject)
        .then(response => {
            showPostList();
        })
        .then(showPostEntry())
    }
})

//event listener for logging out
applicationElement.addEventListener("click", event => {
    if (event.target.id === "logout") {
        logoutUser();
        console.log(getLoggedInUser());
        sessionStorage.clear();
        checkForUser();
    }
})

//event listener for like button
applicationElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id.startsWith("like")) {
        const likeObject = {
            postId: event.target.id.split("__")[1],
            userId: getLoggedInUser().id
        }
        postLike(likeObject)
        .then(response => {
            showPostList();
        })
    }
})

//event listener to filter by the year in the footer
applicationElement.addEventListener("change", event => {
    if (event.target.id === "yearSelection") {
        const yearAsNumber = parseInt(event.target.value)
        console.log(`User wants to see posts since ${yearAsNumber}`)
        // invoke a filter function passing the year as an argument
        showFilteredPosts(yearAsNumber);
    }
})

//event listener to message another user
//***no functionality yet***
applicationElement.addEventListener("click", event => {
    if (event.target.id === "directMessageIcon") {
        alert("Compose a direct message?")
    }
})

//event listener to go back to the home screen when the logo is clicked
//***no functionality yet***
applicationElement.addEventListener("click", event => {
    if (event.target.id === "homeIcon") {
        alert("Are you sure you want to go home?")
    }
})