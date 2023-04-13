document.addEventListener('DOMContentLoaded', () => {

const codeElement = document.getElementById('editor');
const hljs = window.hljs;

const codeExamples = {
    'section-1': section_1,
    'section-2': section_2,
};

const updateCode = (sectionId, tabId) => {
    if (codeExamples[sectionId]) {
        const codeElement = document.querySelector(`#editor${tabId}`);
        codeElement.textContent = codeExamples[sectionId];
        hljs.highlightElement(codeElement);
    }
};

const findVisibleSection = () => {
    const halfScreenHeight = window.innerHeight * .25;
    const updaters = document.querySelectorAll('h2');
    let visibleSection = null;
    let maxTop = -Infinity;

    updaters.forEach((updater) => {
        const rect = updater.getBoundingClientRect();
        if (rect.top < halfScreenHeight && rect.top > maxTop) {
            maxTop = rect.top;
            visibleSection = updater;
        }
    });

    return visibleSection;
};

const onScroll = () => {
    const visibleSection = findVisibleSection();
    if (visibleSection) {
        updateCode(visibleSection.id, visibleSection.dataset.tab);
        switchTab(visibleSection.dataset.tab);
    }
};

document.querySelectorAll('pre code').forEach((el) => {
    hljs.highlightElement(el);
});

document.querySelector('.tutorial').addEventListener('scroll', onScroll);

// Initialize the code editor with the first section
updateCode('section-1', '1');
});
