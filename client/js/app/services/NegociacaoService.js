class NegociacaoService {
  constructor() {
    this._http = new HttpService();
  }

  obterNegociacoesDaSemana() {
    return this._http
      .get('negociacoes/semana')
      .then((negociacoes) =>
        negociacoes.map(
          (objeto) =>
            new Negociacao(
              new Date(objeto.data),
              objeto.quantidade,
              objeto.valor
            )
        )
      )
      .catch((erro) => {
        console.log(erro);
        throw new Error('Não foi possível obter as negociações da semana');
      });
  }

  obterNegociacoesDaAnterior() {
    return this._http
      .get('negociacoes/anterior')
      .then((negociacoes) =>
        negociacoes.map(
          (objeto) =>
            new Negociacao(
              new Date(objeto.data),
              objeto.quantidade,
              objeto.valor
            )
        )
      )
      .catch((erro) => {
        console.log(erro);
        throw new Error(
          'Não foi possível obter as negociações da semana anterior'
        );
      });
  }

  obterNegociacoesDaRetrasada() {
    return this._http
      .get('negociacoes/retrasada')
      .then((negociacoes) =>
        negociacoes.map(
          (objeto) =>
            new Negociacao(
              new Date(objeto.data),
              objeto.quantidade,
              objeto.valor
            )
        )
      )
      .catch((erro) => {
        console.log(erro);
        throw new Error(
          'Não foi possível obter as negociações da semana retrasada'
        );
      });
  }

  obterNegociacoes() {
    return Promise.all([
      this.obterNegociacoesDaSemana(),
      this.obterNegociacoesDaAnterior(),
      this.obterNegociacoesDaRetrasada(),
    ])
      .then((peridos) => {
        let negociacoes = peridos.reduce(
          (arrayAchatado, array) => arrayAchatado.concat(array),
          []
        );
        return negociacoes;
      })
      .catch((erro) => {
        throw new Error(erro);
      });
  }
}
