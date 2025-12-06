document.addEventListener('DOMContentLoaded', () => {
    const blogGrid = document.getElementById('blog-grid');
    const sortBy = document.getElementById('sort-by');
    const filterInput = document.getElementById('filter-input');
    let posts = [];

    // Fetch blog posts from the JSON file
    fetch('blog/posts.json')
        .then(response => response.json())
        .then(data => {
            posts = data;
            renderPosts(posts);
        })
        .catch(error => console.error('Error fetching blog posts:', error));

    // Render posts to the DOM
    function renderPosts(postsToRender) {
        blogGrid.innerHTML = '';
        postsToRender.forEach(post => {
            const postCard = document.createElement('div');
            postCard.classList.add('blog-card');

            const postImage = document.createElement('div');
            postImage.classList.add('blog-image');
            if (post.coverImage) {
                const img = document.createElement('img');
                img.src = post.coverImage;
                img.alt = post.title;
                postImage.appendChild(img);
            } else {
                const placeholder = document.createElement('div');
                placeholder.classList.add('placeholder-image');
                const icon = document.createElement('i');
                icon.classList.add('fas', 'fa-newspaper');
                placeholder.appendChild(icon);
                postImage.appendChild(placeholder);
            }

            const postContent = document.createElement('div');
            postContent.classList.add('blog-content');

            const title = document.createElement('h3');
            title.classList.add('blog-title');
            title.textContent = post.title;

            const excerpt = document.createElement('p');
            excerpt.classList.add('blog-excerpt');
            
            const meta = document.createElement('div');
            meta.classList.add('blog-meta');

            const date = document.createElement('span');
            date.classList.add('blog-date');
            date.textContent = new Date(post.date).toLocaleDateString();

            if (post.tags && post.tags.length > 0) {
                const tagsSpan = document.createElement('span');
                tagsSpan.classList.add('blog-tags');
                post.tags.forEach(tag => {
                    const tagSpan = document.createElement('span');
                    tagSpan.classList.add('tech-tag');
                    tagSpan.textContent = tag;
                    tagsSpan.appendChild(tagSpan);
                });
                meta.appendChild(tagsSpan);
            }
            
            const readMoreLink = document.createElement('a');
            readMoreLink.href = `blog/${post.fileName}`;
            readMoreLink.classList.add('btn', 'primary');
            readMoreLink.textContent = 'Read More';

            postContent.appendChild(title);
            postContent.appendChild(meta);
            meta.appendChild(date);
            postContent.appendChild(readMoreLink);
            
            postCard.appendChild(postImage);
            postCard.appendChild(postContent);

            blogGrid.appendChild(postCard);
        });
    }

    // Sort posts
    sortBy.addEventListener('change', () => {
        const sortValue = sortBy.value;
        let sortedPosts = [...posts];

        if (sortValue === 'newest') {
            sortedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (sortValue === 'oldest') {
            sortedPosts.sort((a, b) => new Date(a.date) - new Date(b.date));
        } else if (sortValue === 'title') {
            sortedPosts.sort((a, b) => a.title.localeCompare(b.title));
        }

        renderPosts(sortedPosts);
    });

    // Filter posts
    filterInput.addEventListener('keyup', () => {
        const filterValue = filterInput.value.toLowerCase();
        const filteredPosts = posts.filter(post => {
            const titleMatch = post.title.toLowerCase().includes(filterValue);
            const tagMatch = post.tags && post.tags.some(tag => tag.toLowerCase().includes(filterValue));
            return titleMatch || tagMatch;
        });
        renderPosts(filteredPosts);
    });
});