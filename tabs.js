const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

const switchTab = (targetTab) => {
    tabButtons.forEach((button) => {
        if (button.dataset.tab === targetTab) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });

    tabContents.forEach((content) => {
        if (content.dataset.tab === targetTab) {
            content.classList.add('visible');
        } else {
            content.classList.remove('visible');
        }
    });
};

tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
        switchTab(button.dataset.tab);
    });
});
