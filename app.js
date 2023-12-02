let ListaDeNumerosSorteados = [];
let NumeroLimite = 50;
let NumeroSecreto = gerarNumeroAleatorio ();
let Tentativas = 1;

function exibirTextoNaTela (tag, texto) {
    let campo = document.querySelector (tag);
    campo.innerHTML = texto;
    responsiveVoice.speak (texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial (){
    exibirTextoNaTela ('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela ('p', 'Escolha um número entre 1 e 50!');
}

exibirMensagemInicial ();

function verificarChute () {
    let Chute = document.querySelector ('input').value;
    
    if (Chute == NumeroSecreto){
        exibirTextoNaTela ('h1', 'Acertou!');
        let PalavraTentativa = Tentativas > 1 ? 'tentativas' : 'tentativa';
        let MensagemTentativas = (`Você descobriu o Número Secreto com ${Tentativas} ${PalavraTentativa}!`);
        exibirTextoNaTela ('p', MensagemTentativas);
        document.getElementById ('reiniciar').removeAttribute ('disabled');
    } else {
        if (Chute > NumeroSecreto) {
            exibirTextoNaTela ('p', `O Número Secreto é menor que ${Chute}!`);
        } else {
            exibirTextoNaTela ('p', `O Número Secreto é maior que ${Chute}!`);
        }
        Tentativas++;
        LimparCampo();
    }
}

function gerarNumeroAleatorio () {
    let NumeroEscolhido = parseInt(Math.random () * NumeroLimite + 1);
    let QuantidadeDeElementosNaLista = ListaDeNumerosSorteados.length;

    if (QuantidadeDeElementosNaLista == NumeroLimite) {
        ListaDeNumerosSorteados = [];
    }

    if (ListaDeNumerosSorteados.includes(NumeroEscolhido)) {
        return gerarNumeroAleatorio ();
    } else {
        ListaDeNumerosSorteados.push (NumeroEscolhido);
        console.log (ListaDeNumerosSorteados);
        return NumeroEscolhido; 
    }
}

function LimparCampo () {
    Chute = document.querySelector ('input');
    Chute.value = '';
}

function ReiniciarJogo () {
    NumeroSecreto = gerarNumeroAleatorio ();
    LimparCampo ();
    Tentativas = 1;
    exibirMensagemInicial ();
    document.getElementById ('reiniciar').setAttribute ('disabled', true);
}