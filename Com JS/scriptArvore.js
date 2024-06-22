
const arvore = new ArvoreBinaria();
const svg = document.getElementById('svgArvoreBinaria');
const raioNo = 20;
const espacoVertical = 50;
const espacoHorizontal = 30;

document.getElementById('adicionarBotao').addEventListener('click', adicionarNo);

function adicionarNo() {
    const novoValor = parseInt(prompt('Digite um valor para adicionar:'));
    if (!isNaN(novoValor)) {
        arvore.adicionar(novoValor);
        desenharArvore();
    }
}

function desenharArvore() {
    // Limpar o SVG
    svg.innerHTML = '';
    if (arvore.raiz !== null) {
        desenharNo(arvore.raiz, svg.clientWidth / 2, 30, svg.clientWidth / 4);
    }
}

function desenharNo(no, x, y, deslocamento) {
    if (no.esquerda !== null) {
        desenharLinha(x, y, x - deslocamento, y + espacoVertical);
        desenharNo(no.esquerda, x - deslocamento, y + espacoVertical, deslocamento / 2);
    }

    if (no.direita !== null) {
        desenharLinha(x, y, x + deslocamento, y + espacoVertical);
        desenharNo(no.direita, x + deslocamento, y + espacoVertical, deslocamento / 2);
    }

    desenharCirculo(x, y, no.valor);
}

function desenharCirculo(x, y, valor) {
    const circulo = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circulo.setAttribute('cx', x);
    circulo.setAttribute('cy', y);
    circulo.setAttribute('r', raioNo);
    circulo.setAttribute('fill', 'lightgreen');
    circulo.setAttribute('stroke', 'black');

    const texto = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    texto.setAttribute('x', x);
    texto.setAttribute('y', y + 5);
    texto.setAttribute('text-anchor', 'middle');
    texto.setAttribute('font-size', '12px');
    texto.textContent = valor;

    svg.appendChild(circulo);
    svg.appendChild(texto);
}

function desenharLinha(x1, y1, x2, y2) {
    const linha = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    linha.setAttribute('x1', x1);
    linha.setAttribute('y1', y1);
    linha.setAttribute('x2', x2);
    linha.setAttribute('y2', y2);
    linha.setAttribute('stroke', 'black');
    svg.appendChild(linha);
}

window.onload = () => {
    desenharArvore();
};
