// FUNÇÕES UTILITÁRIAS:
// SITE DE ONDE A FUNÇÃO FOI OBTIDA: https://www.devmedia.com.br/validar-cpf-com-javascript/23916
const validarCPF = (strCPF) => {
  let soma;
  let resto;
  soma = 0;
  if (strCPF === '00000000000') return false;

  for (let i = 1; i <= 9; i++)
    soma = soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) resto = 0;
  if (resto != parseInt(strCPF.substring(9, 10))) return false;

  soma = 0;
  for (i = 1; i <= 10; i++)
    soma = soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) resto = 0;
  if (resto != parseInt(strCPF.substring(10, 11))) return false;
  return true;
};

const recuperarLancamentosPorCpf = (lancamentos) =>
  lancamentos.reduce((acc, curr) => {
    if (!acc[curr.cpf]) acc[curr.cpf] = [];

    acc[curr.cpf].push(curr.valor);
    return acc;
  }, {});

// FUNÇÕES PRINCIPAIS:
const validarEntradaDeDados = (lancamento) => {
  const { cpf, valor } = lancamento;

  // CPF deve conter apenas caracteres numéricos.
  if (isNaN(cpf)) return 'CPF deve conter apenas caracteres numéricos.';

  // Os dígitos verificadores do CPF devem ser válido.
  if (!validarCPF(cpf))
    return 'Os dígitos verificadores do CPF devem ser válido.';

  // Valor deve ser numérico.
  if (typeof valor !== 'number') return 'Valor deve ser numérico.';

  // Valor não pode ser superior a 15000,00.
  if (valor > 15000) return 'Valor não pode ser superior a 15000,00.';

  // Valor não pode ser inferior a -2000,00.
  if (valor < -2000) return 'Valor não pode ser inferior a -2000,00.';
  return null;
};

const recuperarSaldosPorConta = (lancamentos) => {
  cpfEValores = recuperarLancamentosPorCpf(lancamentos);
  saldosPorConta = [];

  Object.keys(cpfEValores).forEach((cpf, index) => {
    valor = Object.values(cpfEValores)
      [index].reduce((acc, curr) => acc + curr)
      .toFixed(2);
    saldosPorConta.push({
      cpf,
      valor,
    });
  });
  return saldosPorConta;
};

const recuperarMaiorMenorLancamentos = (cpf, lancamentos) => {
  valoresDoCpf = lancamentos.filter((lancamento) => lancamento.cpf === cpf);
  valoresDoCpf.sort((a, b) => a.valor - b.valor);
  return valoresDoCpf.length < 1
    ? valoresDoCpf
    : [valoresDoCpf[0], valoresDoCpf.at(-1)];
};

const recuperarMaioresSaldos = (lancamentos) => {
  saldosPorConta = recuperarSaldosPorConta(lancamentos);
  saldosPorConta.sort((a, b) => b.valor - a.valor);
  return saldosPorConta.slice(0, 3);
};

const recuperarMaioresMedias = (lancamentos) => {
  cpfEValores = recuperarLancamentosPorCpf(lancamentos);
  maioresMedias = [];

  Object.keys(cpfEValores).forEach((cpf, index) => {
    valoresIterados = Object.values(cpfEValores)[index];
    valor = (
      valoresIterados.reduce((acc, curr) => acc + curr) / valoresIterados.length
    ).toFixed(2);
    maioresMedias.push({
      cpf,
      valor,
    });
  });
  return maioresMedias.sort((a, b) => b.valor - a.valor).slice(0, 3);
};
