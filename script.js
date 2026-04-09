const classes = [
    "", "10TO", "10TI", "10LI", "10HO", "10SI", "10VA", "10SU", "10DI", "10TA1", "10TA2",
    "11TO", "11TI", "11LI", "11HO", "11SI", "11VA", "11SU", "11DI", "11TA",
    "12TO", "12TI", "12LI", "12HO", "12SI", "12VA", "12SD", "12TA"
];

let selectedClassIndex = 1;
let w = 30;                           // <---------------------------------------------------------
const N = classes.length - 1;

function normalizeWeek(week) {
    return ((week - 1) % N + N) % N + 1;
}

function initializeScrollList() {
    const scrollList = document.getElementById('scrollList');
    scrollList.innerHTML = '';
    classes.slice(1).forEach((className, index) => {
        const item = document.createElement('div');
        item.className = 'scroll-item';
        item.innerText = className;
        if (index + 1 === selectedClassIndex) item.classList.add('active');
        scrollList.appendChild(item);
    });
    updateScroll();
    document.getElementById('weekValue').innerText = w;         // UI
    // let effectiveW = normalizeWeek(w);                          // for cal
}

function updateScroll() {
    const scrollList = document.getElementById('scrollList');
    const items = scrollList.getElementsByClassName('scroll-item');
    Array.from(items).forEach((item, index) => {
        item.classList.remove('active', 'previous', 'next', 'outer-previous', 'outer-next');
        if (index === selectedClassIndex - 1) item.classList.add('active');
        else if (index === selectedClassIndex - 2) item.classList.add('previous');
        else if (index === selectedClassIndex) item.classList.add('next');
        else if (index === selectedClassIndex - 3) item.classList.add('outer-previous');
        else if (index === selectedClassIndex + 1) item.classList.add('outer-next');
    });
    scrollList.style.transform = `translateY(${70 - (selectedClassIndex - 1) * 30}px)`;
}

function scroll(direction) {
    selectedClassIndex = Math.max(1, Math.min(N, selectedClassIndex + direction));
    updateScroll();
}

function processClass() {
    const resultContainer = document.getElementById('result');
    const class1 = classes[selectedClassIndex];

    let shift = w;
    // let shift = w + 1;

    let skip = Math.floor((shift - 1) / (N - 1));

    let nextIndex = ((selectedClassIndex - 1 + shift + skip) % N) + 1;

    const class2 = classes[nextIndex];

    resultContainer.innerHTML = `${class1} chấm ${class2}`;
    document.getElementById("myModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

document.getElementById('scrollSelector').addEventListener('wheel', (event) => {
    event.preventDefault();
    scroll(event.deltaY > 0 ? 1 : -1);
});

let startY;
document.getElementById('scrollSelector').addEventListener('touchstart', (event) => {
    startY = event.touches[0].clientY;
});

document.getElementById('scrollSelector').addEventListener('touchmove', (event) => {
    event.preventDefault();
    const deltaY = event.touches[0].clientY - startY;
    if (Math.abs(deltaY) > 20) {
        scroll(deltaY > 0 ? -1 : 1);
        startY = event.touches[0].clientY;
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') scroll(-1);
    else if (event.key === 'ArrowDown') scroll(1);
});

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('scroll-item')) {
        const items = Array.from(document.getElementsByClassName('scroll-item'));
        const newIndex = items.indexOf(event.target) + 1;
        if (newIndex !== selectedClassIndex) {
            selectedClassIndex = newIndex;
            updateScroll();
        }
    }
});

window.onload = function () {
    initializeScrollList();
    document.querySelector('.container').style.opacity = '0';
    document.querySelector('.container').style.transition = 'opacity 0.5s ease';
    setTimeout(() => { document.querySelector('.container').style.opacity = '1'; }, 100);
};
