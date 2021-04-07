
const newPostFormHandler = async (event) => {
    // event.preventDefault();

    const content = document.querySelector('#post-content').value.trim();
    const image_link = document.querySelector('#image-link').value.trim()

    console.log('imnage link: ' + image_link);
    // console.log('image exist: ' + );

    if (image_link != "") {
        console.log('image exists');
        data_ = {
            text: content,
            hasImage: true,
            imageLink: image_link
        }
    }
    else {
        console.log('no image');
        data_ = {text: content,
            imageLink: 'noimage.com'
        }
    }

    if (content) {
        const response = await fetch(`/api/posts`, {
            method: 'POST',
            body: JSON.stringify(data_),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } 
        else if (response.status == 401) {
            alert('Invalid url, try again...')
        } else {
            alert('Failed to post');
            
        }
    }
};


const updateButtonHandler = async (event) => {
    const form = $(event.currentTarget).closest('form');
    const content = form.find('.post-content').val().trim();
    const id = form.attr('post-id');

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify(content),
        headers: {
            'Content-type': 'application/json',
        },
    });

    if (response.ok) {
        document.location.replace('/profile');
    } else {
        alert('Failed to update post');
    }
};


const delButtonHandler = async (event) => {
    const form = $(event.currentTarget).closest('form');
    const id = form.attr('post-id');

    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        document.location.replace('/profile');
    } else {
        alert('Failed to delete post');
    }
};

// $('#new-post-form form').on('submit', newPostFormHandler);
$('#submit-button').on('click', newPostFormHandler);


$('.updatePost').on('click', updateButtonHandler);

$('.deletePost').on('click', delButtonHandler);

$('#newPost').click(() => {
    $('#new-post-form').removeClass('d-none');
});

$('.showPost').click(e => {
    $(e.currentTarget).prev().removeClass('d-none');
});
