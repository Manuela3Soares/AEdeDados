
const grafo = new Grafo();
const svg = document.getElementById('graphSVG');
const nodeRadius = 20;

document.getElementById('addNodeButton').addEventListener('click', adicionarNodo);
document.getElementById('addEdgeButton').addEventListener('click', adicionarAresta);
document.getElementById('removeNodeButton').addEventListener('click', removerNodo);
document.getElementById('removeEdgeButton').addEventListener('click', removerAresta);
document.getElementById('runBFSButton').addEventListener('click', executarBFS);
document.getElementById('runDFSButton').addEventListener('click', executarDFS);

function adicionarNodo() {
    const valor = prompt('Enter node value:');
    if (valor) {
        grafo.adicionarNodo(valor);
        desenharGrafo();
    }
}

function removerNodo() {
    const valor = prompt('Enter node value to remove:');
    if (valor) {
        grafo.removerNodo(valor);
        desenharGrafo();
    }
}

function adicionarAresta() {
    const origem = prompt('Enter origin node value:');
    const destino = prompt('Enter destination node value:');
    if (origem && destino) {
        grafo.adicionarAresta(origem, destino);
        desenharGrafo();
    }
}

function removerAresta() {
    const origem = prompt('Enter origin node value:');
    const destino = prompt('Enter destination node value:');
    if (origem && destino) {
        grafo.removerAresta(origem, destino);
        desenharGrafo();
    }
}

function executarBFS() {
    const inicio = prompt('Enter start node for BFS:');
    if (inicio) {
        const ordem = grafo.bfs(inicio);
        alert('BFS Order: ' + ordem.join(', '));
    }
}

function executarDFS() {
    const inicio = prompt('Enter start node for DFS:');
    if (inicio) {
        const ordem = grafo.dfs(inicio);
        alert('DFS Order: ' + ordem.join(', '));
    }
}

function desenharGrafo() {
    svg.innerHTML = '';
    const nodos = Array.from(grafo.nodos.values());
    const nodoMap = new Map();

    nodos.forEach((nodo, index) => {
        const x = 100 + (index % 10) * 70;
        const y = 100 + Math.floor(index / 10) * 70;
        nodoMap.set(nodo.valor, { x, y });
        desenharNodo(nodo, x, y);
    });

    nodos.forEach(nodo => {
        nodo.arestas.forEach(vizinho => {
            desenharAresta(nodoMap.get(nodo.valor), nodoMap.get(vizinho));
        });
    });
}

function desenharNodo(nodo, x, y) {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', x);
    circle.setAttribute('cy', y);
    circle.setAttribute('r', nodeRadius);
    circle.setAttribute('fill', 'lightblue');
    circle.setAttribute('stroke', 'black');

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', x);
    text.setAttribute('y', y + 5);
    text.setAttribute('text-anchor', 'middle');
    text.textContent = nodo.valor;

    svg.appendChild(circle);
    svg.appendChild(text);
}

function desenharAresta(origem, destino) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', origem.x);
    line.setAttribute('y1', origem.y);
    line.setAttribute('x2', destino.x);
    line.setAttribute('y2', destino.y);
    line.setAttribute('stroke', 'black');
    svg.appendChild(line);
}



window.onload = () => {
    desenharGrafo();
};
