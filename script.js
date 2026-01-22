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

// Ensure all project cards have equal height, including those hidden initially
function equalizeProjectCardHeights() {
    const cards = Array.from(document.querySelectorAll('.project-preview'));
    if (!cards.length) return;

    // Reset heights to natural before measuring
    cards.forEach(card => {
        card.style.height = 'auto';
    });

    let maxHeight = 0;
    const temporarilyShown = [];

    // Measure each card; temporarily reveal hidden ones off-screen
    cards.forEach(card => {
        const wasHidden = card.classList.contains('hidden');
        if (wasHidden) {
            card.classList.remove('hidden');
            // Keep it from flashing by hiding and removing from flow
            card.style.visibility = 'hidden';
            card.style.position = 'absolute';
            card.style.left = '-9999px';
            temporarilyShown.push(card);
        }

        const rect = card.getBoundingClientRect();
        const height = rect.height;
        if (height > maxHeight) maxHeight = height;
    });

    // Apply the maximum height to all cards
    cards.forEach(card => {
        card.style.height = `${maxHeight}px`;
    });

    // Re-hide any cards we temporarily revealed
    temporarilyShown.forEach(card => {
        card.style.visibility = '';
        card.style.position = '';
        card.style.left = '';
        card.classList.add('hidden');
    });
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

window.addEventListener('load', () => {
    handleResize();
    // Wait a frame to ensure fonts/layout settle, then equalize
    requestAnimationFrame(() => equalizeProjectCardHeights());

    // Populate date tags from data-date attributes if provided
    const cards = document.querySelectorAll('.project-preview');
    cards.forEach(card => {
        const raw = card.getAttribute('data-date');
        const tag = card.querySelector('.date-tag');
        if (!tag) return;
        if (!raw) return; // keep placeholder if no date
        const formatted = formatDateBadge(raw);
        if (formatted) {
            tag.textContent = formatted;
            tag.setAttribute('aria-label', `Project date: ${formatted}`);
        }
    });
});

// Accepts ISO-like strings (YYYY, YYYY-MM, YYYY-MM-DD)
function formatDateBadge(input) {
    try {
        const parts = input.split('-');
        if (parts.length === 1 && /^\d{4}$/.test(parts[0])) {
            return parts[0];
        }
        if (parts.length >= 2) {
            const year = parts[0];
            const month = parts[1];
            const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            const mIndex = parseInt(month, 10) - 1;
            if (!isNaN(mIndex) && mIndex >= 0 && mIndex < 12) {
                return `${monthNames[mIndex]} ${year}`;
            }
            return year; // fallback
        }
    } catch (_) {
        return null;
    }
    return null;
}

document.getElementById('currentYear').textContent = new Date().getFullYear();

// View more button toggles the 4th project card
const viewMoreBtn = document.getElementById('viewMoreBtn');
const project4 = document.getElementById('project4');

if (viewMoreBtn && project4) {
    viewMoreBtn.addEventListener('click', () => {
        const isHidden = project4.classList.contains('hidden');
        if (isHidden) {
            project4.classList.remove('hidden');
            viewMoreBtn.textContent = 'View less';
            viewMoreBtn.setAttribute('aria-expanded', 'true');
            // Scroll into view if on small screens so users notice the reveal
            if (window.innerWidth < 768) {
                project4.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            // Re-equalize after revealing
            requestAnimationFrame(() => equalizeProjectCardHeights());
        } else {
            project4.classList.add('hidden');
            viewMoreBtn.textContent = 'View more';
            viewMoreBtn.setAttribute('aria-expanded', 'false');
            // Re-equalize after hiding
            requestAnimationFrame(() => equalizeProjectCardHeights());
        }
    });
}

// Recompute equal heights on resize
window.addEventListener('resize', () => {
    handleResize();
    requestAnimationFrame(() => equalizeProjectCardHeights());
});