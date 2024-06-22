class ArvoreBinaria {
    constructor() {
        this.raiz = null;
    }

    adicionar(valor) {
        const novoNo = new NoArvore(valor);
        if (this.raiz === null) {
            this.raiz = novoNo;
        } else {
            this._adicionarNo(this.raiz, novoNo);
        }
    }

    _adicionarNo(atual, novoNo) {
        if (novoNo.valor < atual.valor) {
            if (atual.esquerda === null) {
                atual.esquerda = novoNo;
            } else {
                this._adicionarNo(atual.esquerda, novoNo);
            }
        } else {
            if (atual.direita === null) {
                atual.direita = novoNo;
            } else {
                this._adicionarNo(atual.direita, novoNo);
            }
        }
    }

    paraArray() {
        const resultado = [];
        this._travessiaEmOrdem(this.raiz, resultado);
        return resultado;
    }

    _travessiaEmOrdem(no, resultado) {
        if (no !== null) {
            this._travessiaEmOrdem(no.esquerda, resultado);
            resultado.push(no.valor);
            this._travessiaEmOrdem(no.direita, resultado);
        }
    }
}