// Money Image (Using a more "banded" looking stock icon)
const moneyImg = "https://cdn-icons-png.flaticon.com/512/2150/2150150.png"; 
const canvas = document.getElementById('money-canvas');

function createBill(x, y) {
    const bill = document.createElement('img');
    bill.src = moneyImg;
    bill.className = 'money-bill';
    
    const startX = x + (Math.random() * 60 - 30);
    const duration = Math.random() * 2 + 1.5;
    const size = Math.random() * 40 + 40; 

    bill.style.left = startX + 'px';
    bill.style.top = y + 'px';
    bill.style.width = size + 'px';
    bill.style.animationDuration = duration + 's';
    
    canvas.appendChild(bill);
    setTimeout(() => bill.remove(), duration * 1000);
}

// Cursor Trail
let lastX = 0;
document.addEventListener('mousemove', (e) => {
    if (Math.abs(e.clientX - lastX) > 60) {
        createBill(e.clientX, e.clientY);
        lastX = e.clientX;
    }
});

// "Make it Rain" on Click
document.addEventListener('mousedown', (e) => {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createBill(e.clientX + (Math.random() * 300 - 150), e.clientY + (Math.random() * 100 - 50));
        }, i * 20);
    }
});

// Hover rain for CTA
const trigger = document.querySelector('.money-trigger');
let rainInterval;
trigger.addEventListener('mouseenter', () => {
    rainInterval = setInterval(() => {
        const rect = trigger.getBoundingClientRect();
        createBill(rect.left + Math.random() * rect.width, rect.top);
    }, 80);
});
trigger.addEventListener('mouseleave', () => clearInterval(rainInterval));