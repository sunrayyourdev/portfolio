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

// Modal functionality for JewelRE
const jewelreBtn = document.getElementById('jewelreBtn');
const jewelreModal = document.getElementById('jewelreModal');
const closeBtn = jewelreModal.querySelector('.close');

jewelreBtn.addEventListener('click', () => {
    jewelreModal.style.display = 'flex'; // Display as flex to center modal
    // Dynamically size the iframe to fit within the modal-content
    const modalContent = jewelreModal.querySelector('.modal-content');
    const iframe = modalContent.querySelector('iframe');
    const desiredWidth = modalContent.clientWidth*0.9;
    const desiredHeight = desiredWidth * (9 / 16); // 16:9 aspect ratio
    iframe.style.width = desiredWidth + 'px';
    iframe.style.height = desiredHeight + 'px';
});

closeBtn.addEventListener('click', () => {
    jewelreModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === jewelreModal) {
        jewelreModal.style.display = 'none';
    }
});

// Update iframe size on window resize when modal is visible
window.addEventListener('resize', () => {
    if (jewelreModal.style.display !== 'none') {
        const modalContent = jewelreModal.querySelector('.modal-content');
        const iframe = modalContent.querySelector('iframe');
        const desiredWidth = modalContent.clientWidth*0.9;
        const desiredHeight = desiredWidth * (9 / 16);
        iframe.style.width = desiredWidth + 'px';
        iframe.style.height = desiredHeight + 'px';
    }
});

window.addEventListener('load', () => {
    handleResize();
});