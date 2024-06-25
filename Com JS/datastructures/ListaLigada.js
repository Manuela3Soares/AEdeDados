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

    removerElementoEspecifico(elementoEspecifico, topo = null, newLista = null) {
        debugger
        if(topo == null) 
            topo = this.topo; // Clonagem

        if(topo !== null) {
            if(topo.valor == elementoEspecifico) {
                topo = topo.proximo;
                this._novaEstrutura(elementoEspecifico, topo);
                this.reduzirTamanho();
            } else if(topo.proximo !== null) {
                topo = topo.proximo;
                this.removerElementoEspecifico(elementoEspecifico, topo, this.topo)
            }
        }

    }

    _novaEstrutura(v, link) {
        let current = this.topo;
        if(current.valor == v) {
            this.topo = link;
            return
        }
        let old = null;

        while (current.proximo !== null) {
            current = current.proximo;
            if(current.valor == v) {
                current.valor = link.valor
                current.proximo = link.proximo
                return
            }

            old = current;
        }

        if(current.valor == v)
            old.proximo = null;


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