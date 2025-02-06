function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

document.getElementById('resume').addEventListener('click', function() {
    window.open('/path/to/resume.pdf', '_blank');
});

function handleResize() {
    const projectContainer = document.querySelector('.project-container');
    if (window.innerWidth < 768) {
        projectContainer.style.flexDirection = 'column';
    } else {
        projectContainer.style.flexDirection = 'row';
    }
}

function setBaseFontSize() {
    document.documentElement.style.fontSize = '16px'; // Set base font size to 16px
}

function setGitHubPageFontSize() {
    const githubLinks = document.querySelectorAll('a[href*="github.com"]');
    githubLinks.forEach(link => {
        link.style.fontSize = '1rem'; // Match the base font size
    });
}

window.addEventListener('resize', handleResize);
window.addEventListener('load', () => {
    handleResize();
    setBaseFontSize();
    setGitHubPageFontSize(); // Call the function on load
});
