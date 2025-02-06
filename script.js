function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

document.getElementById('resume').addEventListener('click', function() {
    window.open('/path/to/resume.pdf', '_blank');
});
