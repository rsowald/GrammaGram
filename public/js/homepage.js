

const newCommentFormHandler = async (event) => {
    event.preventDefault();

    const content = document.querySelector('#comment').value.trim();

    if (!content) {
        alert('Please add comment text');
        return;
    }

    const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ post_id: currentPostId, content }),
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert('Failed to add comment');
    }
};

$('#close-button').on('click', newCommentFormHandler);

//Tracking which post we're leaving comments on
let currentPostId = null;
const setCurrentPostId = function () {
    currentPostId = $(this).attr('post-id');
};

$('.modal-trigger').on('click', setCurrentPostId);