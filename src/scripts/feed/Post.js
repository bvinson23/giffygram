import { getLoggedInUser } from "../data/Datamanager.js"

export const Post = (postObject) => {
    if (postObject.user.id === getLoggedInUser().id) {
      return `
          <section class="post">
            <header>
                <h2 class="post__title">${postObject.title}</h2>
            </header>
            <img class="post__image" src="${postObject.imageURL}" />
            <p>${postObject.description}</p>
            <p>${postObject.user.name} Grammed at ${postObject.timestamp}</p>
            <button id="edit__${postObject.id}">Edit</button>
            <button id="delete__${postObject.id}">Delete</button>
          </section>
        `
    }else {
      return `
          <section class="post">
            <header>
                <h2 class="post__title">${postObject.title}</h2>
            </header>
            <img class="post__image" src="${postObject.imageURL}" />
            <p>${postObject.description}</p>
            <p>${postObject.user.name} Grammed at ${postObject.timestamp}</p>
          </section>
        `
    }
  }