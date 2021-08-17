const BlogId = document.getElementById('blog').getAttribute('data-id');

const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();
  
    if (title && content) {
      const response = await fetch(`/api/blogs/${BlogId}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace(`/blogs/${BlogId}`);
      } else {
        alert('Failed to create project');
      }
    }
};

document
  .querySelector('.new-blog-post-form')
  .addEventListener('submit', newFormHandler);