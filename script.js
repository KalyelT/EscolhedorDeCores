// Gera um hex aleatório
function randomHex() {
    return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0');
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
    const squares = document.querySelectorAll('.quadrado');

    function applyRandomColors() {
        squares.forEach(sq => {
            const hex = randomHex();
            sq.style.backgroundColor = hex;
            sq.textContent = hex;
            sq.style.color = textColorForBackground(hex);
        });
    }

    btn.addEventListener('click', applyRandomColors);

    // copia hex ao clicar no quadrado
    squares.forEach(sq => {
        sq.addEventListener('click', async () => {
            const txt = sq.textContent.trim();
            try {
                await navigator.clipboard.writeText(txt);
                // feedback rápido
                const prev = sq.textContent;
                sq.textContent = 'Copiado!';
                setTimeout(() => sq.textContent = prev, 900);
            } catch {
                // não bloqueia se não suportar clipboard
            }
        });
    });

    // aplicar cores iniciais
    applyRandomColors();
});