
const commentsSection = document.getElementById('comments');
const commentsFormElemnt = document.querySelector("#comments-form form")
const commentsTitle = document.getElementById('title')
const commentsText = document.getElementById('text')
const commentButton = document.getElementById('commentsbutton')

console.log(commentButton,commentsSection,commentsFormElemnt,commentsTitle,commentsText)

function commentsList(fetch) {
    const commentsListElement = document.createElement('ol')
    for (const data of fetch) {
        const commentElement = document.createElement('li')
        commentElement.innerHTML = `<article class="comment-item">
        <h2>${data.title}</h2>
        <p>${data.text}</p>
        </article>`
        commentsListElement.append(commentElement)
    }
    return commentsListElement
}

async function commentsViewer() {
    const postId = commentButton.dataset.id
    const fetchedData = await fetch(`/posts/${postId}/comments`);
    const responseData = await fetchedData.json()
    try {
        if (!fetchedData.ok) {
            alert("Fetching comments Failed")
            return
        }
        if (responseData && responseData.length > 0) {
            const commentListElements = commentsList(responseData)
            commentsSection.innerHTML = ''
            commentsSection.append(commentListElements)
        } else {
            commentsSection.textContent = "We could not find any comments.Maybe Create one"
        }
    } catch (error) {
        alert("Fetching Error")
    }
}

async function saveComment(event) {
    event.preventDefault();
    const postId = commentButton.dataset.id
    const enteredTitle = commentsTitle.value;
    const enteredText = commentsText.value
    const comments = {title:enteredTitle,text:enteredText}
    console.log(postId)
    try{
        const response = await fetch(`/posts/${postId}/comments`,{
            method:'post',
            body:JSON.stringify(comments),
            headers:{
                "Content-Type": "application/json"
            }
        })
        if(response.ok) {
           commentsViewer()
        } else {
            alert("Comment is not sent")
        }
    } catch(err) {
       alert("the page is offline")
    }
}

commentButton.addEventListener('click',commentsViewer)
commentsFormElemnt.addEventListener('submit',saveComment)