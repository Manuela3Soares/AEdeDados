class ListaLigada {
    constructor(tamanho = 0) {
        this.topo = null;
        this.tamanho = tamanho
    }

    adicionar(value) {
        this.adicionarNoFinal(value);
    }

    remover() {
        this.removerDoInicio();
    }

    adicionarNoInicio(value) {
        const novoNo = new NoLista(value);
        novoNo.proximo = this.topo;
        this.topo = novoNo;
        this.aumentarTamanho();
    }

    removerDoInicio() {
        if (this.topo !== null) {
            this.topo = this.topo.proximo;
            this.reduzirTamanho();
        }
    }

    adicionarNoFinal(value) {
        const novoNo = new NoLista(value);
        if (this.topo === null) {
            this.topo = novoNo;
            this.aumentarTamanho();
        } else {
            let current = this.topo;
            while (current.proximo !== null) {  
                current = current.proximo;
            }
            current.proximo = novoNo;
            this.aumentarTamanho();
        }
    }

    removerNoFinal() {
        if (this.topo !== null) {
            if (this.topo.proximo === null) {
                this.topo = null;
                this.reduzirTamanho();
            } else {
                let current = this.topo;
                while (current.proximo.proximo !== null) {
                    current = current.proximo;
                }
                current.proximo = null;
                this.reduzirTamanho();
            }
        }
    }

    reduzirTamanho() {
        if(this.tamanho > 0) {        
            this.tamanho--;
        }
    }

    aumentarTamanho() {
        this.tamanho++;
    }
    
}