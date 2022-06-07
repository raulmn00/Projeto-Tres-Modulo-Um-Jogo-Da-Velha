const prompt = require("prompt-sync")();
console.clear();

let jogoDaVelha = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
let vencedor;
let jogada = "X";
let qtdVitoriasX = 0;
let qtdVitoriasO = 0;
let qtdPartidas = +prompt("Digite a quantidade de rodadas a serem jogadas: ");
// Enquanto o jogo da velha estiver rodando, toda lógica acontecerá dentro do while(true){}
while (qtdPartidas != 0) {
  // Atualização das jogadas
  console.log(`É a vez do jogador ${jogada}!`);
  const linhaDesejada = +prompt("Digite a linha desejada: ");
  const colunaDesejada = +prompt("Digite a coluna desejada: ");

  if (jogoDaVelha[linhaDesejada][colunaDesejada]) {
    console.log("Essa jogada já está preenchida.");
    continue;
  }

  jogoDaVelha[linhaDesejada][colunaDesejada] = jogada;
  if (jogada === "X") {
    jogada = "O";
  } else {
    jogada = "X";
  }
  for (const valor of jogoDaVelha) {
    console.log(valor);
  }
  // Checagem das coordenadas vazias (verifica se o jogo acabou);
  let coordenadasVazias = 0;
  for (let linhaAtual = 0; linhaAtual < jogoDaVelha.length; linhaAtual++) {
    const linha = jogoDaVelha[linhaAtual];

    for (let coluna = 0; coluna < linha.length; coluna++) {
      const jogadaAtual = linha[coluna];
      //console.log({ jogadaAtual });
      if (!jogadaAtual) {
        coordenadasVazias++;
      }
    }
  }

  if (coordenadasVazias === 0) {
    break;
  }
  // Condições de vitória/;
  // Quais condições definem um vencedor?

  // Mapeamento de todos os elementos do jogo da velha em forma de números
  const condicoesVitoria = [
    //condições de vitoria nas colunas
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // condições de vitória nas linhas
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //condições de vitória nas diagonais
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Esse for verifica todas as condições de vitórias existentes;
  for (const condicaoVitoria of condicoesVitoria) {
    //console.log("Checagem da condição de vitória: ", condicaoVitoria);

    let qtdValoresIguais = 0;
    let ultimoValor;
    // Esse for pega cada valor das condições de vitoria e relaciona com qual posição do jogo da velha estamos lidando;
    for (const valor of condicaoVitoria) {
      const linhaDoValor = parseInt(valor / 3);
      const colunaDoValor = valor % 3;

      const jogadaDaPosicao = jogoDaVelha[linhaDoValor][colunaDoValor];
      //console.log({ jogadaDaPosicao });

      // Verifica se a jogada da posição é 0, se for, ele desconsidera e, se o ultimo valor existe ou se ele é igual a jogada da posição;
      if (
        jogadaDaPosicao &&
        (!ultimoValor || jogadaDaPosicao === ultimoValor)
      ) {
        qtdValoresIguais++;
      }
      ultimoValor = jogadaDaPosicao;
    }

    // Se tivermos 3 valores iguais em relação as condições de vitória, podemos assumir que algum jogador venceu e paramos o programa;
    if (qtdValoresIguais === 3) {
      vitoria = true;
      vencedor = ultimoValor;
      if (vencedor === "X") {
        qtdVitoriasX++;
        jogoDaVelha = [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
        ];
      } else if (vencedor === "O") {
        qtdVitoriasO++;
        jogoDaVelha = [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
        ];
      }
      qtdPartidas--;
    }
    //console.log({ qtdValoresIguais });
    //console.log();
  }
}

// Exibindo resultados finais;
if (qtdVitoriasO > qtdVitoriasX) {
  console.log(`O jogador O foi o grande campeão com ${qtdVitoriasO} vitórias!`);
} else if (qtdVitoriasO < qtdVitoriasX) {
  console.log(`O jogador X foi o grande campeão com ${qtdVitoriasX} vitórias!`);
} else {
  console.log(
    `Os dois jogadores X e O empataram, com ${qtdVitoriasO} vitórias cada!`
  );
}
