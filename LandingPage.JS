document.addEventListener("DOMContentLoaded", () => {
	const projectList = document.getElementById("project-list");
	projectList.innerHTML = '<div class="loading">Loading projects...</div>';

	fetch("projects.json")
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then(projects => {
			projectList.innerHTML = ""; // Clear loading message

			projects.forEach(project => {
				if (!project.name || !project.description) {
					console.warn('Project missing required fields:', project);
					return;
				}

				const projectDiv = document.createElement("div");
				projectDiv.classList.add("project");
				projectDiv.innerHTML = `
                    <div class="project-content">
                        ${createMediaContent(project)}
                        <h3>${project.name}</h3>
                        <p>${project.description}</p>
                        ${project.link ? `<a href="${project.link}" target="_blank">View Project</a>` : ''}
                    </div>
                `;

				projectList.appendChild(projectDiv);
			});
			initializeCarousels(); // Initialize after adding all projects
		})
		.catch(error => {
			projectList.innerHTML = `
                <div class="error">
                    Unable to load projects. Please try again later.
                </div>
            `;
			console.error("Error loading projects:", error);
		});
});

function createMediaContent(project) {
	let mediaContent = '';

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

	// Handle video if present
	if (project.video) {
		mediaContent += `<video src="${project.video}" autoplay loop muted class="project-media"></video>`;
	}
	return mediaContent;
}

// Add carousel functionality
function initializeCarousels() {
	document.querySelectorAll('.image-carousel').forEach(carousel => {
		const images = carousel.querySelectorAll('img');
		const prevBtn = carousel.querySelector('.prev');
		const nextBtn = carousel.querySelector('.next');

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
	});
}