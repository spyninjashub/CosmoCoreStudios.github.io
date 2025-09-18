document.addEventListener('DOMContentLoaded', () => {
    const tosContent = document.querySelector('.tos-content');
    const tocNav = document.getElementById('toc');
    const headers = tosContent.querySelectorAll('.section-title');

    // Dynamically build the Table of Contents
    headers.forEach((header, index) => {
        const id = header.textContent.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        header.parentElement.id = id;
        
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${id}`;
        a.textContent = header.textContent;
        li.appendChild(a);
        tocNav.appendChild(li);
    });

    const tocLinks = tocNav.querySelectorAll('a');

    // Add active class to TOC link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        headers.forEach(header => {
            const sectionTop = header.parentElement.offsetTop;
            if (window.scrollY >= sectionTop - 100) {
                current = header.parentElement.id;
            }
        });

        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.href.includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scroll for TOC links
    tocNav.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            const targetId = e.target.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
