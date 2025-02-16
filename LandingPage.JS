document.addEventListener("DOMContentLoaded", () => {
	const projectList = document.getElementById("project-list");
	projectList.innerHTML = '<div class="loading">Loading projects...</div>';

	fetch("./projects.json")
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then(projects => {
			projectList.innerHTML = ""; // Clear loading message

			// Group projects by semester
			const projectsBySemester = {};
			projects.forEach(project => {
				if (!project.name || !project.description || !project.semester) {
					console.warn('Project missing required fields:', project);
					return;
				}

				if (!projectsBySemester[project.semester]) {
					projectsBySemester[project.semester] = [];
				}
				projectsBySemester[project.semester].push(project);
			});

			// Sort semesters chronologically (oldest to newest)
			const sortedSemesters = Object.keys(projectsBySemester).sort((a, b) => {
				const yearA = parseInt(a.split(' ')[1]);
				const yearB = parseInt(b.split(' ')[1]);
				const seasonA = a.split(' ')[0];
				const seasonB = b.split(' ')[0];

				// First compare years
				if (yearA !== yearB) {
					return yearA - yearB;
				}

				// If years are equal, compare seasons
				const seasonOrder = {
					'Spring': 0,
					'Summer': 1,
					'Fall': 2,
					'Winter': 3
				};

				return seasonOrder[seasonA] - seasonOrder[seasonB];
			});

			// Create sections for each semester
			sortedSemesters.forEach(semester => {
				const semesterSection = document.createElement('div');
				semesterSection.classList.add('semester-section');
				semesterSection.innerHTML = `<h2 class="semester-title">${semester}</h2>`;

				const semesterProjects = document.createElement('div');
				semesterProjects.classList.add('semester-projects');

				projectsBySemester[semester].forEach(project => {
					const projectDiv = document.createElement("div");
					projectDiv.classList.add("project");
					projectDiv.innerHTML = `
						<div class="project-content">
							${createMediaContent(project)}
							<h3>${project.name}</h3>
							<p>${project.description}</p>
							<a href="project.html?id=${encodeURIComponent(project.id)}" class="view-project">View Details</a>
							${project.link ? `<a href="${project.link}" target="_blank" class="external-link">Live Demo</a>` : ''}
						</div>
					`;
					semesterProjects.appendChild(projectDiv);
				});

				semesterSection.appendChild(semesterProjects);
				projectList.appendChild(semesterSection);
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