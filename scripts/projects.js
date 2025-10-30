async function loadProjects() {
    try {
        const container = document.getElementById('projects-container');
        const projectJSONFile = container.dataset.json;
        const response = await fetch(projectJSONFile);
        if (!response.ok) throw new Error('Failed to load ' + projectJSONFile);
        const projects = await response.json();

        container.classList.add('bg-white', 'border', 'max-w-7xl', 'mx-auto'); // global accordion border and background
        container.innerHTML = '';

        projects.forEach((project, index) => {
            const projectDiv = document.createElement('div');
            projectDiv.className = index < projects.length - 1 ? 'border-b border-gray-400' : '';

            // Create accordion header button
            const header = document.createElement('button');
            header.className = 'accordion-header w-full text-left px-4 py-4 flex justify-between items-center hover:bg-sky-50 transition-colors';
            header.innerHTML = `
        <div class="flex-1">
          <h3 class="font-semibold text-gray-800 text-base">${project.title}</h3>
          <div class="flex flex-wrap gap-2 mt-2">
            ${project.tags.map(tag => `
              <span class="text-xs text-gray-800 py-1 rounded-full">${tag}</span>
            `).join('|')}
          </div>
        </div>
        <span class="accordion-icon text-gray-600 text-xl ml-4 transition-transform duration-100 select-none">+</span>
      `;

            // Create accordion content
            const content = document.createElement('div');
            content.className = 'accordion-content max-h-0 overflow-hidden transition-all duration-300 ease-in-out';

            const contentInner = document.createElement('div');
            contentInner.className = 'px-4 py-4';

            // Add description
            const description = document.createElement('p');
            description.className = 'text-gray-600 mb-4';
            description.innerHTML = project.description;
            contentInner.appendChild(description);

            // Add links if they exist
            if (project.link && Object.keys(project.link).length > 0) {
                const linksList = document.createElement('ul');
                linksList.className = 'list-none list-inside mb-4 text-blue-600';

                // Loop through each entry in the map
                for (const [name, url] of Object.entries(project.link)) {
                    const li = document.createElement('li');
                    const a = document.createElement('a');
                    a.href = url;
                    a.target = '_blank';
                    a.rel = 'noopener noreferrer';
                    a.textContent = url;
                    li.appendChild(a);
                    linksList.appendChild(li);
                }

                contentInner.appendChild(linksList);
            }

            // Add images if they exist
            if (project.images && project.images.length > 0) {
                const imagesContainer = document.createElement('div');
                imagesContainer.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4';

                project.images.forEach(imagePath => {
                    const imgWrapper = document.createElement('div');
                    imgWrapper.className = 'relative';

                    const img = document.createElement('img');
                    img.src = imagePath;
                    img.alt = `${project.title} image`;
                    img.className = 'w-full h-48 object-cover';

                    img.onerror = () => {
                        console.warn('Image not found, skipping:', imagePath);
                        imgWrapper.remove(); // remove the wrapper from DOM
                    };

                    imgWrapper.appendChild(img);
                    imagesContainer.appendChild(imgWrapper);
                });

                contentInner.appendChild(imagesContainer);
            }

            content.appendChild(contentInner);

            // Add click event listener
            header.addEventListener('click', function () {
                const icon = this.querySelector('.accordion-icon');
                const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';

                // Close all accordion items
                document.querySelectorAll('.accordion-content').forEach(item => item.style.maxHeight = '0px');
                document.querySelectorAll('.accordion-icon').forEach(ic => ic.textContent = '+');

                // Toggle current one
                if (!isOpen) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    icon.textContent = '–';
                }
            });

            projectDiv.appendChild(header);
            projectDiv.appendChild(content);
            container.appendChild(projectDiv);
        });
    } catch (err) {
        console.error(err);
        const container = document.getElementById('projects-container');
        container.innerHTML = `<div class="text-red-600 p-4">Error loading projects: ${err.message}</div>`;
    }
}

document.addEventListener('DOMContentLoaded', loadProjects);