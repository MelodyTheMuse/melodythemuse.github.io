const projectList = document.getElementById('project-list');
const skillsList = document.getElementById('skills-list');
const activeFilters = document.getElementById('active-filters');
let selectedFilters = new Set();

// Function to create media content (images, video, carousel)
function createMediaContent(project) {
    if (project.video) {
        return `
            <video class="project-media" controls>
                <source src="${project.video}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;
    } else if (project.images && project.images.length > 1) {
        const images = project.images.map((img, index) => `
            <img src="${img}" alt="Project image ${index + 1}" class="project-media ${index === 0 ? 'active' : ''}">`
        ).join('');
        
        return `
            <div class="image-carousel">
                ${images}
                <button class="carousel-btn prev" onclick="prevImage(this)">❮</button>
                <button class="carousel-btn next" onclick="nextImage(this)">❯</button>
            </div>
        `;
    } else if (project.images && project.images.length === 1) {
        return `<img src="${project.images[0]}" alt="Project image" class="project-media">`;
    }
    return '';
}

// Load projects from JSON
fetch("./projects.json")
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(projects => {
        projectList.innerHTML = "";

        // Find highlighted project and other projects
        const highlightedProject = projects.find(project => project.highlighted);
        const otherProjects = projects.filter(project => !project.highlighted);

        // Create container for all projects
        const projectsContainer = document.createElement('div');
        projectsContainer.classList.add('projects-grid');

        // Add highlighted project if it exists
        if (highlightedProject) {
            const highlightedDiv = document.createElement("div");
            highlightedDiv.classList.add("project", "highlighted", highlightedProject.prideLevel || 'satisfied');
            highlightedDiv.setAttribute('data-technologies', JSON.stringify(highlightedProject.technologies));

            // Create banner for highlighted project
            const highlightedBanner = document.createElement("div");
            highlightedBanner.classList.add("background-banner");
            
            if (highlightedProject.images && highlightedProject.images.length > 0) {
                highlightedBanner.style.backgroundImage = `url(${highlightedProject.images[0]})`;
            }

            highlightedDiv.innerHTML = `
                <div class="project-content">
                    ${createMediaContent(highlightedProject)}
                    <h3>${highlightedProject.name}</h3>
                    ${highlightedProject.category ? `
                        <span class="project-category ${highlightedProject.category.toLowerCase().replace(/\s+/g, '-')}">
                            ${highlightedProject.category}
                            ${highlightedProject.category === 'Internship' && highlightedProject.company ?
                            ` - ${highlightedProject.company}` : ''}
                        </span>
                    ` : ''}
                    <p>${highlightedProject.description}</p>
                    <a href="project.html?id=${encodeURIComponent(highlightedProject.id)}" class="view-project">View Details</a>
                    ${highlightedProject.link ? `<a href="${highlightedProject.link}" target="_blank" class="external-link">Project Link</a>` : ''}
                </div>
            `;

            projectsContainer.appendChild(highlightedDiv);
            projectsContainer.appendChild(highlightedBanner);
        }

        // Add remaining projects
        otherProjects.forEach(project => {
            const projectDiv = document.createElement("div");
            projectDiv.classList.add("project", project.prideLevel || 'satisfied');
            projectDiv.setAttribute('data-technologies', JSON.stringify(project.technologies));

            // Create the background banner
            const bannerDiv = document.createElement("div");
            bannerDiv.classList.add("background-banner");
            
            if (project.images && project.images.length > 0) {
                bannerDiv.style.backgroundImage = `url(${project.images[0]})`;
            } else if (project.video) {
                const videoPath = project.video;
                const thumbnailPath = videoPath.replace('.mp4', '.jpg');
                bannerDiv.style.backgroundImage = `url(${thumbnailPath})`;
            }

            projectDiv.innerHTML = `
                <div class="project-content">
                    ${createMediaContent(project)}
                    <h3>${project.name}</h3>
                    ${project.category ? `
                        <span class="project-category ${project.category.toLowerCase().replace(/\s+/g, '-')}">
                            ${project.category}
                            ${project.category === 'Internship' && project.company ?
                            ` - ${project.company}` : ''}
                        </span>
                    ` : ''}
                    <p>${project.description}</p>
                    <a href="project.html?id=${encodeURIComponent(project.id)}" class="view-project">View Details</a>
                    ${project.link ? `<a href="${project.link}" target="_blank" class="external-link">Project Link</a>` : ''}
                </div>
            `;

            projectsContainer.appendChild(projectDiv);
            projectsContainer.appendChild(bannerDiv);
        });

        projectList.appendChild(projectsContainer);
    })
    .catch(error => {
        projectList.innerHTML = `<div class="error">Error loading projects: ${error.message}</div>`;
    });

// Carousel navigation functions
function nextImage(button) {
    const carousel = button.closest('.image-carousel');
    const images = carousel.getElementsByTagName('img');
    let activeIndex = Array.from(images).findIndex(img => img.classList.contains('active'));
    
    images[activeIndex].classList.remove('active');
    activeIndex = (activeIndex + 1) % images.length;
    images[activeIndex].classList.add('active');
}

function prevImage(button) {
    const carousel = button.closest('.image-carousel');
    const images = carousel.getElementsByTagName('img');
    let activeIndex = Array.from(images).findIndex(img => img.classList.contains('active'));
    
    images[activeIndex].classList.remove('active');
    activeIndex = (activeIndex - 1 + images.length) % images.length;
    images[activeIndex].classList.add('active');
}

// Filter functionality
function updateProjectVisibility() {
    const projects = document.querySelectorAll('.project');
    
    projects.forEach(project => {
        if (selectedFilters.size === 0) {
            project.classList.remove('hidden');
            return;
        }

        const technologies = JSON.parse(project.getAttribute('data-technologies'));
        const hasAllFilters = Array.from(selectedFilters).every(filter => 
            technologies.includes(filter)
        );
        
        if (hasAllFilters) {
            project.classList.remove('hidden');
        } else {
            project.classList.add('hidden');
        }
    });
}

function toggleFilter(filter) {
    const filterElement = document.querySelector(`[data-filter="${filter}"]`);
    
    if (selectedFilters.has(filter)) {
        selectedFilters.delete(filter);
        filterElement.classList.remove('active');
        removeFilterTag(filter);
    } else {
        selectedFilters.add(filter);
        filterElement.classList.add('active');
        addFilterTag(filter);
    }
    
    updateProjectVisibility();
}

function addFilterTag(filter) {
    const tag = document.createElement('span');
    tag.classList.add('active-filter');
    tag.innerHTML = `
        ${filter}
        <span class="remove-filter" onclick="toggleFilter('${filter}')">&times;</span>
    `;
    activeFilters.appendChild(tag);
}

function removeFilterTag(filter) {
    const tags = activeFilters.getElementsByClassName('active-filter');
    for (let tag of tags) {
        if (tag.textContent.trim().includes(filter)) {
            tag.remove();
            break;
        }
    }
}

// Add click event listeners to skill items
skillsList.addEventListener('click', (e) => {
    const item = e.target;
    if (item.hasAttribute('data-filter')) {
        toggleFilter(item.getAttribute('data-filter'));
    }
});