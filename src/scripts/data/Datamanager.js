export const getUsers = () => {
    return fetch("http://localhost:8088/users")
    .then(response => response.json())
}

export const getPosts = () => {
    return fetch("http://localhost:8088/posts")
    .then(response => response.json())
    .then(parsedResponse => {
        postCollection = parsedResponse
        return parsedResponse;
    })
}
let postCollection = [];

export const usePostCollection = () => {
    // Best practice: we don't want to alter the original state, so
    // make a copy of it and then return it
    // The spread operator makes this quick work
    postCollectionCopy = [...postData]
    return postCollectionCopy;
}

const loggedInUser = {
    id: 1,
	name: "Bryan",
	email: "bryan@bn.com"
}

export const getLoggedInUser = () => {
	return loggedInUser;
}