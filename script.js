function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

function handleResize() {
    const projectContainer = document.querySelector('.project-container');
    if (window.innerWidth < 768) {
        projectContainer.style.flexDirection = 'column';
    } else {
        projectContainer.style.flexDirection = 'row';
    }
}

function setGitHubPageFontSize() {
    const githubLinks = document.querySelectorAll('a[href*="github.com"]');
    githubLinks.forEach(link => {
        link.style.fontSize = '1rem'; // Reverted to match original base font size
    });
}

// Modal functionality for JewelRE
const jewelreBtn = document.getElementById('jewelreBtn');
const jewelreModal = document.getElementById('jewelreModal');
const closeBtn = jewelreModal.querySelector('.close');

jewelreBtn.addEventListener('click', () => {
    jewelreModal.style.display = 'flex'; // Display as flex to center modal
});

closeBtn.addEventListener('click', () => {
    jewelreModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === jewelreModal) {
        jewelreModal.style.display = 'none';
    }
});

window.addEventListener('load', () => {
    handleResize();
    setGitHubPageFontSize(); // Call the function on load
});