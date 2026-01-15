const el = document.querySelector('.welcome__sem');

if (el) {
    el.addEventListener('animationend', () => {
        el.classList.add('levitation');
    });
}

// slider
const cards = document.querySelectorAll('.card');
const dots = document.querySelectorAll('.dot');
let current = 0;
let isAnimating = false;

function showSlide(index) {
    if (index === current || isAnimating) return;
    isAnimating = true;

    const prevCard = cards[current];
    prevCard.classList.remove('active');
    prevCard.classList.add('exit');

    setTimeout(() => {
        prevCard.classList.remove('exit');
        isAnimating = false;
    }, 600);

    current = (index + cards.length) % cards.length;
    cards[current].classList.add('active');

    dots.forEach(dot => dot.classList.remove('active'));
    dots[current].classList.add('active');
}

document.querySelector('.arrow.next').addEventListener('click', () => {
    showSlide(current + 1);
});

document.querySelector('.arrow.prev').addEventListener('click', () => {
    showSlide(current - 1);
});

let startX = 0;
let endX = 0;

document.querySelector('.slider').addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

document.querySelector('.slider').addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    const diff = endX - startX;
    if (Math.abs(diff) > 50) {
        if (diff < 0) {
            showSlide(current + 1); // swipe left
        } else {
            showSlide(current - 1); // swipe right
        }
    }
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

