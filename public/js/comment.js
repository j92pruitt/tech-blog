const BlogId = document.getElementById('blog').getAttribute('data-id');

const newCommentHandler = async (event) => {
    event.preventDefault();

    const content = document.getElementById('content').value.trim();

    if (content && BlogId) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({content, BlogId}),
            headers: {'Content-Type': 'application/json'}
        });

        if (response.ok) {
            document.location.reload()
        } else {
            alert('Failed to create new comment')
        }
    }
}

const delButtonHandler = async (event) => {

    const response = await fetch(`/api/blogs/${BlogId}`, {
    method: 'DELETE',
    });

    if (response.ok) {
    document.location.replace('/dashboard');
    } else {
    alert('Failed to delete project');
    }

  };

document.getElementById('new-comment').addEventListener('submit', newCommentHandler)
document.getElementById('delete-btn').addEventListener('click', delButtonHandler)