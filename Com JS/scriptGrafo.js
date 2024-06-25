const grafo = new Grafo();
const svg = document.getElementById('graphSVG');
const nodeRadius = 20;

let GuardarPosicao = {}

document.getElementById('addNodeButton').addEventListener('click', adicionarNodo);
document.getElementById('addEdgeButton').addEventListener('click', adicionarAresta);
document.getElementById('removeNodeButton').addEventListener('click', removerNodo);
document.getElementById('removeEdgeButton').addEventListener('click', removerAresta);
//document.getElementById('runBFSButton').addEventListener('click', executarBFS);
//document.getElementById('runDFSButton').addEventListener('click', executarDFS);

let draggingNode = null;
let offsetX, offsetY;

function adicionarNodo() {
    const valor = prompt('Insira o valor do nó:');
    if (valor) {
        grafo.adicionarNodo(valor);
        desenharGrafo();
    }
}

function removerNodo() {
    const valor = prompt('Insira o valor do nó a remover:');
    if (valor) {
        grafo.removerNodo(valor);
        desenharGrafo();
    }
}

function adicionarAresta() {
    const origem = prompt('Insira o valor do nó de origem:');
    const destino = prompt('Insira o valor do nó de destino:');
    if (origem && destino) {
        grafo.adicionarAresta(origem, destino);
        desenharGrafo(false);
    }
}

function removerAresta() {
    const origem = prompt('Insira o valor do nó de origem:');
    const destino = prompt('Insira o valor do nó de destino:');
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

function desenharGrafo(limpa = true) {
    if(limpa) {
        svg.innerHTML = '';
    }
    const nodos = Array.from(grafo.nodos.values());
    const nodoMap = new Map();

      
        nodos.forEach((nodo, index) => {
            // Mudar aqui
            const x = 100 + (index % 10) * 70;
            const y = 100 + Math.floor(index / 10) * 70;

            if(GuardarPosicao[nodo.valor] != null) {
                nodoMap.set(nodo.valor, {x: GuardarPosicao[nodo.valor].x, y: GuardarPosicao[nodo.valor].y})
            }
            else {
                nodoMap.set(nodo.valor, { x, y });
            }
            
            desenharNodo(nodo, x, y, limpa);
        });
  

    nodos.forEach(nodo => {
        nodo.arestas.forEach(vizinho => {
            desenharAresta(nodoMap.get(nodo.valor), nodoMap.get(vizinho));
        });
    });
}

function desenharNodo(nodo, x, y, limpa = true) {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', x);
    circle.setAttribute('cy', y);
    circle.setAttribute('r', nodeRadius);
    circle.setAttribute('fill', 'lightblue');
    circle.setAttribute('stroke', 'black');
    circle.setAttribute('data-value', nodo.valor);

    circle.addEventListener('mousedown', (event) => {
        draggingNode = circle;
        offsetX = event.offsetX - circle.getAttribute('cx');
        offsetY = event.offsetY - circle.getAttribute('cy');

        console.log(offsetX, offsetY);
    });

    // GuardarPosicoes 
    GuardarPosicao[`${nodo.valor}`] = {x: x, y: y}

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', x);
    text.setAttribute('y', y + 5);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('data-value', nodo.valor);
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

svg.addEventListener('mousemove', (event) => {
    if (draggingNode) {
        const newX = event.offsetX - offsetX;
        const newY = event.offsetY - offsetY;
        draggingNode.setAttribute('cx', newX);
        draggingNode.setAttribute('cy', newY);

        GuardarPosicao[draggingNode.getAttribute("data-value")] = {x: newX, y: newY}


        debugger
        // Update text position
        const text = svg.querySelector(`text[data-value='${draggingNode.getAttribute('data-value')}']`);
        if (text) {
            text.setAttribute('x', newX);
            text.setAttribute('y', newY + 5);
        }

        // Redraw the graph to update edges
        //desenharGrafo();
    }
});

svg.addEventListener('mouseup', () => {
    if (draggingNode) {
        draggingNode = null;
    }
});

window.onload = () => {
    desenharGrafo();
};
