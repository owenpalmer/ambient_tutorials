document.addEventListener('DOMContentLoaded', () => {

const codeElement = document.getElementById('editor');
const hljs = window.hljs;

const codeExamples = {
    'section-1': `hello :)`,
    'section-2': `
    fn main() {\n    print_message("Hello, world!");\n}\n\nfn print_message(message: &str) {\n    println!("{}", message);\n}
    `,
    'section-3': 'fn main() {\n    print_message("Welcome to the tutorial!");\n}\n\nfn print_message(message: &str) {\n    println!("{}", message);\n}',
    'section-4': `spawn_query(player()).bind(move |players| {
        for _ in players {
            Entity::new()
                .with_merge(make_transformable())
                .spawn();
        }
    });`,
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
    const headers = document.querySelectorAll('h2');
    let visibleSection = null;
    let maxTop = -Infinity;

    headers.forEach((header) => {
        const rect = header.getBoundingClientRect();
        if (rect.top < halfScreenHeight && rect.top > maxTop) {
            maxTop = rect.top;
            visibleSection = header;
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
