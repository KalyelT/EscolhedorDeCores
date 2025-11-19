// Gera um hex aleatório
function randomHex() {
    return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0').toUpperCase();
}

function textColorForBackground(hex) {
    const r = parseInt(hex.slice(1,3),16);
    const g = parseInt(hex.slice(3,5),16);
    const b = parseInt(hex.slice(5,7),16);
    const luminance = (0.299*r + 0.587*g + 0.114*b) / 255;
    return luminance > 0.6 ? '#000' : '#fff';
}

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('botao');
    const squares = Array.from(document.querySelectorAll('.quadrado'));

    function applyRandomColors() {
        squares.forEach(sq => {
            const hex = randomHex();
            sq.style.backgroundColor = hex;
            sq.textContent = hex;
            sq.style.color = textColorForBackground(hex);
        });
    }

    btn.addEventListener('click', applyRandomColors);

    // copiar hex ao clicar ou pressionar Enter/Espaço
    squares.forEach(sq => {
        const copy = async () => {
            const txt = sq.textContent.trim();
            try {
                await navigator.clipboard.writeText(txt);
                const prev = sq.textContent;
                sq.textContent = 'Copiado!';
                setTimeout(() => sq.textContent = prev, 900);
            } catch (err) {
                console.error('Clipboard error', err);
            }
        };

        sq.addEventListener('click', copy);
        sq.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                copy();
            }
        });
    });

    applyRandomColors();
});