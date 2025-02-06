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