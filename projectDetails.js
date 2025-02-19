document.addEventListener("DOMContentLoaded", () => {
    const projectDetails = document.getElementById("project-details");
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');

    if (!projectId) {
        projectDetails.innerHTML = '<div class="error">Project not found</div>';
        return;
    }

    fetch("./projects.json")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(projects => {
            const project = projects.find(p => p.id === projectId);

            if (!project) {
                projectDetails.innerHTML = '<div class="error">Project not found</div>';
                return;
            }

            document.title = `${project.name} - Project Details`;

            projectDetails.innerHTML = `
                <div class="project-full">
                    <a href="index.html" class="back-button">← Back to Projects</a>
                    <h1>${project.name}</h1>
                    ${project.category ? `
                        <div class="project-category-header">
                            <span class="project-category ${project.category.toLowerCase()}">
                                ${project.category}
                                ${project.category === 'Internship' && project.company ?
                        ` - ${project.company}` : ''}
                            </span>
                        </div>
                    ` : ''}
                    <div class="project-info">
                        <div class="project-metadata">
                            <span class="semester">${project.semester}</span>
                            ${project.technologies ? `
                                <div class="technologies">
                                    ${project.technologies.map(tech => `
                                        <span class="tech-tag">${tech}</span>
                                    `).join('')}
                                </div>
                            ` : ''}
                        </div>
                        <div class="project-description">
                            ${project.fullDescription || project.description}
                        </div>
                        ${project.features ? `
                            <div class="project-features">
                                <h2>Key Features</h2>
                                <ul>
                                    ${project.features.map(feature => `
                                        <li>${feature}</li>
                                    `).join('')}
                                </ul>
                            </div>
                        ` : ''}
                        ${project.link ? `
                            <a href="${project.link}" target="_blank" class="button">Project Link</a>
                        ` : ''}
                    </div>
                    <div class="project-media-gallery">
                        ${createMediaContent(project)}
                    </div>
                </div>
            `;

            // Initialize carousels after content is loaded
            initializeCarousels();
        })
        .catch(error => {
            projectDetails.innerHTML = `
                <div class="error">
                    Unable to load project details. Please try again later.
                </div>
            `;
            console.error("Error loading project details:", error);
        });
});

// Reuse the createMediaContent function from LandingPage.JS
function createMediaContent(project) {
    let mediaContent = '';

    // Handle videos first
    if (project.video || (project.videos && project.videos.length > 0)) {
        const videos = project.videos || [project.video];
        mediaContent += `
            <div class="video-grid">
                ${videos.map(video => `
                    <video controls class="project-media">
                        <source src="${video}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                `).join('')}
            </div>`;
    }

    // Handle images in a masonry layout
    if (project.images && Array.isArray(project.images)) {
        mediaContent += `
            <div class="masonry-grid">
                ${project.images.map(image => ` 
                    <div class="masonry-item">
                        <img src="${image}" alt="${project.name}" loading="lazy">
                    </div>
                `).join('')}
            </div>`;
    }

    return mediaContent;
}

// Add carousel functionality
function initializeCarousels() {
    document.querySelectorAll('.image-carousel').forEach(carousel => {
        const images = carousel.querySelectorAll('img');
        const prevBtn = carousel.querySelector('.prev');
        const nextBtn = carousel.querySelector('.next');

        if (images.length === 0) return;

        let currentIndex = 0;

        function showImage(index) {
            images.forEach(img => img.classList.remove('active'));
            images[index].classList.add('active');
        }

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        });

        // Ensure first image is shown
        showImage(0);
    });
} 