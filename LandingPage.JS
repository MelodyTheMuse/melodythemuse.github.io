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

			// Find the highlighted project
			const highlightedProject = projects.find(project => project.highlighted);
			const otherProjects = projects.filter(project => !project.highlighted);
			
			// Shuffle the non-highlighted projects
			const shuffledProjects = otherProjects.sort(() => Math.random() - 0.5);

			const projectsContainer = document.createElement('div');
			projectsContainer.classList.add('projects-grid');

			// Add highlighted project if it exists
			if (highlightedProject) {
				const highlightedDiv = document.createElement("div");
				highlightedDiv.classList.add("project", "highlighted", highlightedProject.prideLevel || 'satisfied');
				highlightedDiv.setAttribute('data-technologies', JSON.stringify(highlightedProject.technologies));

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
			}

			// Add remaining projects
			shuffledProjects.forEach(project => {
				const projectDiv = document.createElement("div");
				projectDiv.classList.add("project", project.prideLevel || 'satisfied');
				projectDiv.setAttribute('data-technologies', JSON.stringify(project.technologies));

				// Create the background banner
				const bannerDiv = document.createElement("div");
				bannerDiv.classList.add("background-banner");
				
				// Set the banner background image with error handling
				if (project.images && project.images.length > 0) {
					// Create a temporary image to verify the image loads
					const img = new Image();
					img.onload = () => {
						bannerDiv.style.backgroundImage = `url(${project.images[0]})`;
					};
					img.onerror = () => {
						console.log(`Failed to load image for ${project.name}`);
						// Try to use video thumbnail if available
						if (project.video) {
							bannerDiv.style.backgroundImage = `url(${project.video.replace('.mp4', '.jpg')})`;
						}
					};
					img.src = project.images[0];
				} else if (project.video) {
					// If no images but has video, try to use video thumbnail
					bannerDiv.style.backgroundImage = `url(${project.video.replace('.mp4', '.jpg')})`;
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

				// Add both the project and its banner to the container
				projectsContainer.appendChild(projectDiv);
				projectsContainer.appendChild(bannerDiv);
			});

			projectList.appendChild(projectsContainer);

			// Add a function to preload images
			function preloadProjectImages(projects) {
				projects.forEach(project => {
					if (project.images && project.images.length > 0) {
						project.images.forEach(imgSrc => {
							const img = new Image();
							img.src = imgSrc;
						});
					}
				});
			}

			// Call preload function after loading projects
			preloadProjectImages(projects);
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