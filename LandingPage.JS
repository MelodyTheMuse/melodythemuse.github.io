document.addEventListener("DOMContentLoaded", () => {
	const projectList = document.getElementById("project-list");
	const skillsList = document.getElementById('skills-list');

	projectList.innerHTML = '<div class="loading">Loading projects...</div>';

	// Add click handlers to skills
	if (skillsList) {
		const skillItems = skillsList.querySelectorAll('li');
		skillItems.forEach(skill => {
			skill.addEventListener('click', () => {
				skill.classList.toggle('active');
				updateFilters();
			});
		});
	}

	fetch("./projects.json")
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then(projects => {
			projectList.innerHTML = "";

			// Group projects by semester
			const projectsBySemester = {};
			projects.forEach(project => {
				if (!projectsBySemester[project.semester]) {
					projectsBySemester[project.semester] = [];
				}
				projectsBySemester[project.semester].push(project);
			});

			// Sort semesters numerically
			const sortedSemesters = Object.keys(projectsBySemester).sort((a, b) => {
				const semesterA = parseInt(a.split(' ')[1]);
				const semesterB = parseInt(b.split(' ')[1]);
				return semesterA - semesterB;
			});

			sortedSemesters.forEach(semester => {
				const semesterSection = document.createElement('div');
				semesterSection.classList.add('semester-section');
				semesterSection.innerHTML = `<h2 class="semester-title">${semester}</h2>`;

				const semesterProjects = document.createElement('div');
				semesterProjects.classList.add('semester-projects');

				projectsBySemester[semester].forEach(project => {
					const projectDiv = document.createElement("div");
					projectDiv.classList.add("project");
					projectDiv.setAttribute('data-technologies', JSON.stringify(project.technologies));

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

					semesterProjects.appendChild(projectDiv);
				});

				semesterSection.appendChild(semesterProjects);
				projectList.appendChild(semesterSection);
			});
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

function updateFilters() {
	const activeFiltersContainer = document.getElementById('active-filters');
	const activeFilters = new Set(Array.from(document.querySelectorAll('#skills-list li.active'))
		.map(li => li.dataset.filter));

	// Clear active filters display
	activeFiltersContainer.innerHTML = '';

	// Add filter tags
	activeFilters.forEach(filter => {
		const filterTag = document.createElement('span');
		filterTag.className = 'active-filter';
		filterTag.innerHTML = `
			${filter}
			<span class="remove-filter" data-filter="${filter}">×</span>
		`;
		activeFiltersContainer.appendChild(filterTag);
	});

	// Filter projects
	const projects = document.querySelectorAll('.project');
	projects.forEach(project => {
		if (activeFilters.size === 0) {
			project.classList.remove('hidden');
			return;
		}

		const technologies = JSON.parse(project.dataset.technologies || '[]')
			.map(tech => tech.toLowerCase());

		const hasAllFilters = Array.from(activeFilters)
			.every(filter => technologies.includes(filter.toLowerCase()));

		project.classList.toggle('hidden', !hasAllFilters);
	});
}