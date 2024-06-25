class Grafo {
    constructor() {
        this.nodos = new Map();
    }

    adicionarNodo(valor) {
        if (!this.nodos.has(valor)) {
            const nodo = new NoGrafo(valor);
            this.nodos.set(valor, nodo);
        }
    }

    removerNodo(valor) {
        if (this.nodos.has(valor)) {
            this.nodos.delete(valor);
            this.nodos.forEach(nodo => {
                nodo.arestas = nodo.arestas.filter(aresta => aresta !== valor);
            });
        }
    }

    adicionarAresta(origem, destino) {
        if (this.nodos.has(origem) && this.nodos.has(destino)) {
            this.nodos.get(origem).arestas.push(destino);
            this.nodos.get(destino).arestas.push(origem);
        }
    }

    removerAresta(origem, destino) {
        if (this.nodos.has(origem) && this.nodos.has(destino)) {
            this.nodos.get(origem).arestas = this.nodos.get(origem).arestas.filter(aresta => aresta !== destino);
            this.nodos.get(destino).arestas = this.nodos.get(destino).arestas.filter(aresta => aresta !== origem);
        }
    }

    bfs(inicio) {
        const visitados = new Set();
        const fila = [inicio];
        const ordem = [];

        while (fila.length > 0) {
            const nodo = fila.shift();
            if (!visitados.has(nodo)) {
                visitados.add(nodo);
                ordem.push(nodo);
                this.nodos.get(nodo).arestas.forEach(vizinho => {
                    if (!visitados.has(vizinho)) {
                        fila.push(vizinho);
                    }
                });
            }
        }

        return ordem;
    }

    dfs(inicio) {
        const visitados = new Set();
        const pilha = [inicio];
        const ordem = [];

        while (pilha.length > 0) {
            const nodo = pilha.pop();
            if (!visitados.has(nodo)) {
                visitados.add(nodo);
                ordem.push(nodo);
                this.nodos.get(nodo).arestas.forEach(vizinho => {
                    if (!visitados.has(vizinho)) {
                        pilha.push(vizinho);
                    }
                });
            }
        }

        return ordem;
    }
}
