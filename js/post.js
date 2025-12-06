document.addEventListener('DOMContentLoaded', () => {
    // Read Aloud functionality
    const readAloudBtn = document.getElementById('read-aloud-btn');
    if (readAloudBtn) {
        readAloudBtn.addEventListener('click', () => {
            const articleContent = document.querySelector('.blog-post-content');
            if (articleContent && 'speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(articleContent.textContent);
                window.speechSynthesis.speak(utterance);
            } else {
                alert('Sorry, your browser does not support the Read Aloud feature.');
            }
        });
    }

    // Recommended Articles functionality
    const recommendedGrid = document.getElementById('recommended-grid');
    if (recommendedGrid) {
        // Get the current post's tags from the page
        const currentPostTags = Array.from(document.querySelectorAll('.tech-tag')).map(tag => tag.textContent);

        fetch('../blog/posts.json')
            .then(response => response.json())
            .then(allPosts => {
                const recommendedPosts = allPosts.filter(post => {
                    // Exclude the current post
                    if (post.title === document.title) {
                        return false;
                    }
                    // Find posts with at least one common tag
                    return post.tags.some(tag => currentPostTags.includes(tag));
                });

                // Take the first 3 recommended posts
                const postsToDisplay = recommendedPosts.slice(0, 3);
                renderRecommendedPosts(postsToDisplay);
            })
            .catch(error => console.error('Error fetching recommended posts:', error));
    }

    function renderRecommendedPosts(posts) {
        recommendedGrid.innerHTML = '';
        posts.forEach(post => {
            const postCard = document.createElement('div');
            postCard.classList.add('blog-card');

            const postImage = document.createElement('div');
            postImage.classList.add('blog-image');
            if (post.coverImage) {
                const img = document.createElement('img');
                img.src = `../${post.coverImage}`;
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
            
            const readMoreLink = document.createElement('a');
            readMoreLink.href = `../blog/${post.fileName}`;
            readMoreLink.classList.add('btn', 'primary');
            readMoreLink.textContent = 'Read More';

            postContent.appendChild(title);
            postContent.appendChild(readMoreLink);
            
            postCard.appendChild(postImage);
            postCard.appendChild(postContent);

            recommendedGrid.appendChild(postCard);
        });
    }
});