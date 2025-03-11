// Variables globales
let score = 0;
let money = 0;
let dynamites = 0; // Contador de dinamitas

const scoreDisplay = document.getElementById('score');
const moneyDisplay = document.getElementById('money');
const dynamiteDisplay = document.getElementById('dynamite-count');
const blockContainer = document.getElementById('block-container');
const buyDynamiteButton = document.getElementById('buy-dynamite');

// Función para generar el bloque grande (20x5)
function generateBlockGrid() {
    blockContainer.innerHTML = ""; // Limpiar el contenedor

    for (let i = 0; i < 100; i++) { // 20 x 5 = 100 bloques
        const block = document.createElement('div');
        block.classList.add('block');

        // Determinar tipo de bloque (tierra, piedra o oro)
        const randomType = Math.random();
        if (randomType < 0.7) {
            block.classList.add('earth'); // Tierra
        } else if (randomType < 0.9) {
            block.classList.add('stone'); // Piedra
        } else {
            block.classList.add('gold'); // Mineral dorado
        }

        // Agregar evento de clic para minar
        block.addEventListener('click', () => mineBlock(block));

        blockContainer.appendChild(block);
    }
}

// Función para minar un bloque
function mineBlock(block) {
    if (block.classList.contains('stone')) {
        if (dynamites > 0) {
            dynamites--; // Gastar dinamita
            dynamiteDisplay.textContent = dynamites;
        } else {
            alert('¡Necesitas dinamita para destruir las piedras!');
            return;
        }
    }

    if (block.classList.contains('gold')) {
        money += 50; // Los minerales dorados dan dinero
        moneyDisplay.textContent = money;
    }

    block.classList.add('mined');
    block.style.backgroundColor = 'black'; // Simular que se minó

    // Verificar si todos los bloques han sido minados
    checkAllBlocksMined();
}

// Función para verificar si todos los bloques han sido minados
function checkAllBlocksMined() {
    const allMined = [...blockContainer.children].every(block => block.classList.contains('mined'));

    if (allMined) {
        score += 10; // Aumentar la profundidad
        scoreDisplay.textContent = score;

        if (score >= 100) {
            document.body.style.backgroundImage = "url('cave.jpg')"; // Cambiar fondo a cueva
        }

        alert(`¡Descendiste más profundo! Nueva profundidad: ${score} metros`);
        generateBlockGrid(); // Generar nueva capa de bloques
    }
}

// Función para comprar dinamita
buyDynamiteButton.addEventListener('click', () => {
    if (money >= 20) { // Precio reducido a 20 monedas
        dynamites++;
        money -= 20;
        moneyDisplay.textContent = money;
        dynamiteDisplay.textContent = dynamites;
    } else {
        alert('No tienes suficientes monedas para comprar dinamita.');
    }
});

// Iniciar el juego
generateBlockGrid();
