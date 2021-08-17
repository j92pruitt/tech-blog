const newCommentHandler = async (event) => {
    event.preventDefault();

    const BlogId = document.getElementById('blog').getAttribute('data-id');
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

document.getElementById('new-comment').addEventListener('submit', newCommentHandler)