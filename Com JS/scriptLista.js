let listaLigada = new ListaLigada();
let valorControlo = 0;
const svg = document.getElementById('linkedListSVG');
const boxWidth = 50;
const boxHeight = 50;
const margin = 20;

document.getElementById('addButton').addEventListener('click', adicionarElemento);
document.getElementById('removeButton').addEventListener('click', removerElemento);
document.getElementById('removeSpecific').addEventListener('click', removerElementoEspecifico)

function adicionarElemento() {
    const novoValor = ++valorControlo;
    listaLigada.adicionarNoFinal(novoValor);
    let topo = listaLigada.topo
    desenharListaLigada(topo);
}

function removerElemento() {
    if (listaLigada.tamanho > 0) {
        listaLigada.removerDoInicio();
        let topo = listaLigada.topo;
        desenharListaLigada(topo);
    }
}

function removerElementoEspecifico() {
    let elementoEspecifico = Number(prompt("Qual elemento pretendes remover: "))
    listaLigada.removerElementoEspecifico(elementoEspecifico);
    desenharListaLigada(listaLigada.topo)
}

function desenharListaLigada(lista, index = 0) {

    if(index == 0) {
        limparSVG();
    }

    if (lista === null) {
        return;
    }

    desenhar(lista, index)
    

}

function desenhar(item, index) {
    let valor = item.valor

    const x = index * (boxWidth + margin);
    // Desenhar o retangulo
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", x);
    rect.setAttribute("y", 50);
    rect.setAttribute("width", boxWidth);
    rect.setAttribute("height", boxHeight);
    rect.setAttribute("fill", "lightblue");
    rect.setAttribute("stroke", "black");

    // Desenhar o texto
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", x + boxWidth / 2);
    text.setAttribute("y", 75);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("alignment-baseline", "middle");
    text.textContent = valor;

    // Desenhar a linha de ligação se houver elementos anteriores
    if (index > 0) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", x - margin);
        line.setAttribute("y1", 75);
        line.setAttribute("x2", x);
        line.setAttribute("y2", 75);
        line.setAttribute("stroke", "black");
        svg.appendChild(line);
    }

    svg.appendChild(rect);
    svg.appendChild(text);

    desenharListaLigada(item.proximo, index + 1);


}


function limparSVG() {
    // Clear the SVG
    svg.innerHTML = '';
}
