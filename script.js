let bons = [];

window.onload = function() {
    const saved = localStorage.getItem('bons');
    if (saved) {
        bons = JSON.parse(saved);
        loadBonInputs();
        generateButtons();
    }
};

function addBon(name = '', price = '') {
    const container = document.getElementById('bon-list');
    const div = document.createElement('div');
    div.innerHTML = `Name: <input class='name' value='${name}'> Preis (€): <input class='price' type='number' step='0.01' value='${price}'>`;
    container.appendChild(div);
}

function loadBonInputs() {
    bons.forEach(b => addBon(b.name, b.price));
}

function saveBons() {
    const names = document.getElementsByClassName('name');
    const prices = document.getElementsByClassName('price');
    bons = [];
    for (let i = 0; i < names.length; i++) {
        if (names[i].value && prices[i].value) {
            bons.push({ name: names[i].value, price: parseFloat(prices[i].value) });
        }
    }
    localStorage.setItem('bons', JSON.stringify(bons));
    generateButtons();
}

function generateButtons() {
    const buttonDiv = document.getElementById('buttons');
    buttonDiv.innerHTML = '';
    bons.forEach(b => {
        const btn = document.createElement('button');
        btn.textContent = `${b.name} (${b.price.toFixed(2)}€)`;
        btn.onclick = () => addToTotal(b.price);
        buttonDiv.appendChild(btn);
    });
}

let total = 0;

function addToTotal(price) {
    total += price;
    document.getElementById('total').textContent = total.toFixed(2);
    calcChange();
}

function calcChange() {
    const received = parseFloat(document.getElementById('received').value) || 0;
    const change = received - total;
    document.getElementById('change').textContent = change.toFixed(2);
}
