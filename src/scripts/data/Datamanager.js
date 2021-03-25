//----------global variables----------------//

let loggedInUser = {}
let postCollection = [];

//----------functions----------------------//

//function to return the logged in user
export const getLoggedInUser = () => {
    return { ...loggedInUser };
}

//function to set the logged in user based on the sessionStorage
export const setLoggedInUser = (userObj) => {
    loggedInUser = userObj
}

//function to go back to the login screen once you logout
export const logoutUser = () => {
    loggedInUser = {}
}

//function to show the number of likes of a post
export const getNumberOfLikes = (postId) => {
    getLikes(postId)
    .then(response => {
        document.querySelector(`#likes__${postId}`).innerHTML = `👍 ${response.length}`;
    })
}

//function used to manipulate the post collection
export const usePostCollection = () => {
    // Best practice: we don't want to alter the original state, so
    // make a copy of it and then return it
    // The spread operator makes this quick work
    return [...postCollection]
}

//--------all fetch calls----------------------------------------------------//

//fetch call to get all the users
export const getUsers = () => {
    return fetch("http://localhost:8088/users")
        .then(response => response.json())
}

//fetch call to get all the posts
export const getPosts = () => {
    const userId = getLoggedInUser().id
    return fetch(`http://localhost:8088/posts?_expand=user`)
        .then(response => response.json())
        .then(parsedResponse => {
            console.log("data with user", parsedResponse)
            postCollection = parsedResponse
            return parsedResponse;
        })
}

//fetch call to get the posts of the logged in user
export const getMyPosts = () => {
    const userId = getLoggedInUser().id
    return fetch(`http://localhost:8088/posts?userId=${userId}&_expand=user`)
    .then(response => response.json())
    .then(parsedResponse => {
        console.log("data with user", parsedResponse)
        postCollection = parsedResponse
        return parsedResponse;
    })
}

//fetch call to create a post
export const createPost = postObj => {
    return fetch("http://localhost:8088/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postObj)

    })
        .then(response => response.json())
}

//fetch call to delete a post
export const deletePost = postId => {
    return fetch(`http://localhost:8088/posts/${postId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }

    })
        .then(response => response.json())
        .then(getPosts)
}

//fetch call to get a single post to edit that post
export const getSinglePost = (postId) => {
    return fetch(`http://localhost:8088/posts/${postId}`)
        .then(response => response.json())
}

//fetch call to update a post once it has been edited
export const updatePost = postObj => {
    return fetch(`http://localhost:8088/posts/${postObj.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postObj)
    })
        .then(response => response.json())
        .then(getPosts)
}

//fetch call to login a user
export const loginUser = (userObj) => {
    return fetch(`http://localhost:8088/users?name=${userObj.name}&email=${userObj.email}`)
        .then(response => response.json())
        .then(parsedUser => {
            //is there a user?
            console.log("parsedUser", parsedUser) //data is returned as an array
            if (parsedUser.length > 0) {
                setLoggedInUser(parsedUser[0]);
                return getLoggedInUser();
            } else {
                //no user
                return false;
            }
        })
}

//fetch call to add a new user
export const registerUser = (userObj) => {
    return fetch(`http://localhost:8088/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userObj)
    })
        .then(response => response.json())
        .then(parsedUser => {
            setLoggedInUser(parsedUser);
            return getLoggedInUser();
        })
}

//fetch call to get the number of likes on a post
export const getLikes = (postId) => {
    return fetch(`http://localhost:8088/userLikes?postId=${postId}`)
    .then(response => response.json())
}

//fetch call when adding a like to a post
export const postLike = likeObject => {
    return fetch(`http://localhost:8088/userLikes/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(likeObject)
    })
        .then(response => response.json())
        .then(getPosts)
  }
