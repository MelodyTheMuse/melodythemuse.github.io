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
                    <div class="project-media-gallery">
                        ${createMediaContent(project)}
                    </div>
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

    // Handle video if present
    if (project.video) {
        mediaContent += `<video src="${project.video}" controls class="project-media"></video>`;
    }

    // Handle multiple images
    if (project.images && Array.isArray(project.images)) {
        if (project.images.length === 1) {
            mediaContent += `<img src="${project.images[0]}" alt="${project.name}" class="project-media">`;
        } else if (project.images.length > 1) {
            mediaContent += `
                <div class="image-carousel">
                    ${project.images.map((image, index) => `
                        <img src="${image}" 
                             alt="${project.name} - View ${index + 1}" 
                             class="project-media ${index === 0 ? 'active' : ''}"
                             data-index="${index}">
                    `).join('')}
                    <button class="carousel-btn prev">&lt;</button>
                    <button class="carousel-btn next">&gt;</button>
                </div>
            `;
        }
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