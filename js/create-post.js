function initializeEditor() {
    const easyMDE = new EasyMDE({
        element: document.getElementById('markdown-editor'),
        spellChecker: false,
        toolbar: ["bold", "italic", "heading", "|", "quote", "unordered-list", "ordered-list", "|", "link", "image", "|", "preview", "side-by-side", "fullscreen", "|", "guide"]
    });

    const addElementBtn = document.getElementById('add-element-btn');
    addElementBtn.addEventListener('click', () => {
        // Simple prompt for adding a link for now.
        // A more advanced implementation would use a modal.
        const url = prompt("Enter the URL for the link or button:");
        if (url) {
            const text = prompt("Enter the text for the link or button:", "Click here");
            const isButton = confirm("Is this a button?");
            
            let markdown;
            if (isButton) {
                markdown = `<a href="${url}" class="btn primary">${text}</a>`;
            } else {
                markdown = `[${text}](${url})`;
            }
            
            const cm = easyMDE.codemirror;
            const doc = cm.getDoc();
            const cursor = doc.getCursor();
            doc.replaceRange(markdown, cursor);
        }
    });

    const publishBtn = document.getElementById('publish-btn');
    publishBtn.addEventListener('click', () => {
        const title = document.getElementById('post-title').value;
        const tags = document.getElementById('post-tags').value.split(',').map(tag => tag.trim());
        const coverImage = document.getElementById('post-cover-image').value;
        const content = easyMDE.value();

        if (title.trim() === '' || content.trim() === '') {
            alert('Please enter a title and some content for your post.');
            return;
        }

        const postFileName = title.toLowerCase().replace(/\s+/g, '-') + '.html';
        const htmlContent = marked(content);

        const post = {
            title,
            tags,
            coverImage,
            content: htmlContent,
            date: new Date().toISOString(),
            fileName: postFileName
        };

        // Create the content for the new blog post HTML file
        const postHtmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${post.title}</title>
    <link rel="stylesheet" href="../css/style.css">
</head>
<body>
    <div class="container">
        <article class="blog-post">
            <header class="blog-post-header">
                <h1 class="blog-post-title">${post.title}</h1>
                <div class="blog-post-meta">
                    <span class="blog-post-date">${new Date(post.date).toLocaleDateString()}</span>
                    <div class="share-options">
                        <span>Share:</span>
                        <a href="https://www.facebook.com/sharer/sharer.php?u=" target="_blank" class="share-link">Facebook</a>
                        <a href="https://twitter.com/intent/tweet?url=" target="_blank" class="share-link">Twitter</a>
                        <a href="https://www.linkedin.com/shareArticle?mini=true&url=" target="_blank" class="share-link">LinkedIn</a>
                    </div>
                </div>
            </header>
            
            <div class="blog-post-cover">
                <img src="${post.coverImage}" alt="${post.title}">
            </div>

            <div class="blog-post-content">
                ${post.content}
            </div>

            <div class="read-aloud">
                <button id="read-aloud-btn">Read Aloud</button>
            </div>
        </article>

        <div class="recommended-articles">
            <h2>Recommended Articles</h2>
            <div class="blog-grid" id="recommended-grid">
                <!-- Recommended articles will be inserted here -->
            </div>
        </div>

        <a href="../blog.html">Back to Blog</a>
    </div>

    <script src="../js/post.js"></script>
</body>
</html>`;

        // Create a blob with the HTML content
        const blob = new Blob([postHtmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);

        // Create a link to download the new post file
        const a = document.createElement('a');
        a.href = url;
        a.download = postFileName;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        alert('Your new blog post HTML file has been generated and downloaded. Please move it to the "blog" folder.');

        // Now, update the posts.json file
        fetch('blog/posts.json')
            .then(response => response.json())
            .then(posts => {
                posts.push({
                    title: post.title,
                    date: post.date,
                    tags: post.tags,
                    fileName: post.fileName,
                    coverImage: post.coverImage
                });

                const updatedPostsJson = JSON.stringify(posts, null, 2);
                const jsonBlob = new Blob([updatedPostsJson], { type: 'application/json' });
                const jsonUrl = URL.createObjectURL(jsonBlob);

                const jsonLink = document.createElement('a');
                jsonLink.href = jsonUrl;
                jsonLink.download = 'posts.json';
                jsonLink.style.display = 'none';
                document.body.appendChild(jsonLink);
                jsonLink.click();
                document.body.removeChild(jsonLink);
                URL.revokeObjectURL(jsonUrl);

                alert('The "posts.json" file has been updated and downloaded. Please replace the existing "posts.json" file in the "blog" folder with this new one.');
            })
            .catch(error => {
                console.error('Error updating posts.json:', error);
                alert('There was an error updating the posts.json file. Please check the console for details.');
            });
    });
}