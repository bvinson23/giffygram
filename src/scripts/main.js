import { getUsers, getPosts, usePostCollection, getLoggedInUser, createPost, deletePost, getSinglePost, updatePost } from "./data/Datamanager.js"
import { PostList } from "./feed/PostList.js"
import { NavBar } from "./nav/NavBar.js"
import { Footer } from "./footer.js"
import { PostEntry } from "./feed/PostEntry.js"
import { PostEdit } from "./feed/PostEdit.js"

const showPostList = () => {
    const postElement = document.querySelector(".postList");
    getPosts().then((allPosts) => {
        postElement.innerHTML = PostList(allPosts.reverse());
    })
}

const showNavBar = () => {
    // Get a reference to the location on the DOM where the nav will display
    const navElement = document.querySelector("nav");
    navElement.innerHTML = NavBar();
}

const startGiffyGram = () => {
    showNavBar();
    showPostEntry();
    showPostList();
    showFooter();
}

const showFooter = () => {
    // Get a reference to the location on the DOM where the footer will display
    const footerElement = document.querySelector("footer");
    footerElement.innerHTML = Footer();
}

const showPostEntry = () => {
    //Get a reference to the location on the DOM where the nav will display
    const entryElement = document.querySelector(".entryForm");
    entryElement.innerHTML = PostEntry()
}

getUsers();

const applicationElement = document.querySelector(".giffygram");

applicationElement.addEventListener("click", event => {
    if (event.target.id === "logout") {
        console.log("You clicked on logout")
    }
})

applicationElement.addEventListener("click", event => {
    if (event.target.id === "directMessageIcon") {
        alert("Compose a direct message?")
    }
})

applicationElement.addEventListener("click", event => {
    if (event.target.id === "homeIcon") {
        alert("Are you sure you want to go home?")
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

applicationElement.addEventListener("click", event => {
    if (event.target.id === "newPost__cancel") {
        //clear the input fields
    }
})

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

const showEdit = (postObj) => {
    const entryElement = document.querySelector(".entryForm");
    entryElement.innerHTML = PostEdit(postObj);
}

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

startGiffyGram();