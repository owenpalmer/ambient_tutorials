document.addEventListener('DOMContentLoaded', () => {

const codeElement = document.getElementById('editor');
const hljs = window.hljs;

const codeExamples = {
    'new_server': new_server,
    'new_client': new_client,
    'cube_instead': cube_instead,
    'assign_cube_to_variable': assign_cube_to_variable,
    'add_frame_event': add_frame_event,
};

const updateCode = (sectionId, tabId) => {
    if (codeExamples[sectionId]) {
        const codeElement = document.querySelector(`#editor${tabId}`);
        codeElement.textContent = codeExamples[sectionId];
        hljs.highlightElement(codeElement);
    }
};

const findVisibleSection = () => {
    const halfScreenHeight = window.innerHeight * .9;
    const updaters = document.querySelectorAll('code.updater');
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
updateCode('new_server', '1');
updateCode('new_client', '2');
});
