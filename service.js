const validarCPF = (strCPF) => {
   let soma;
   let resto;
   soma = 0;
   if (strCPF == "00000000000") return false;

   for (i=1; i<=9; i++) soma = soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
   resto = (soma * 10) % 11;

   if ((resto == 10) || (resto == 11))  resto = 0;
   if (resto != parseInt(strCPF.substring(9, 10)) ) return false;

   soma = 0;
   for (i = 1; i <= 10; i++) soma = soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
   resto = (soma * 10) % 11;

   if ((resto == 10) || (resto == 11))  resto = 0;
   if (resto != parseInt(strCPF.substring(10, 11) ) ) return false;
   return true;
}

const validarEntradaDeDados = (lancamento) => {
   const { cpf, valor } = lancamento;

   if (isNaN(cpf)) return "CPF deve conter apenas caracteres numéricos.";

   if (!validarCPF(cpf)) return "Os dígitos verificadores do CPF devem ser válido.";

   if (typeof valor !== "number") return "Valor deve ser numérico.";

   if (valor > 15000) return "Valor não pode ser superior a 15000,00.";

   if (valor < -2000) return "Valor não pode ser inferior a -2000,00.";
   return null;
}

teste = []
teste.push({cpf:'74914372061',valor:1234.78})
teste.push({cpf:'74914372061',valor:-123.56})
teste.push({cpf:'74914372061',valor:-865.00})
teste.push({cpf:'41421980096',valor:-987})
teste.push({cpf:'41421980096',valor:123})
teste.push({cpf:'41421980096',valor:-1225.9})
teste.push({cpf:'05987701007',valor:1267.39})
teste.push({cpf:'05987701007',valor:143.9})
teste.push({cpf:'05987701007',valor:23.4})
teste.push({cpf:'93975495022',valor:1943})
teste.push({cpf:'93975495022',valor:8000.21})
teste.push({cpf:'93975495022',valor:546.78})

const callbackReduceSaldo = (acumulador, iterado) => {
   if (iterado.cpf in acumulador) {
      acumulador[iterado.cpf] += iterado.valor;
   } else {
      acumulador[iterado.cpf] = iterado.valor;
   }
   return acumulador;
}

const recuperarSaldosPorConta = (lancamentos) => {
   cpfEValor = lancamentos.reduce(callbackReduceSaldo ,{});
   saldosPorConta = [];

   Object.keys(cpfEValor).forEach((cpf, index) => {
      saldosPorConta.push({
         cpf,
         valor: Object.values(cpfEValor)[index].toFixed(2)
      });
   });
   return saldosPorConta;
}

const recuperarMaiorMenorLancamentos = (cpf, lancamentos) => {
   valoresDoCpf = lancamentos.filter((lancamento) => lancamento.cpf === cpf);
   valoresDoCpf.sort((a, b) => a.valor < b.valor ? -1 : true);
   return [valoresDoCpf[0], valoresDoCpf.at(-1)]
}

console.log(recuperarMaiorMenorLancamentos("93975495022", teste));

const recuperarMaioresSaldos = (lancamentos) => {
   return []
}

const recuperarMaioresMedias = (lancamentos) => {
    return []
}