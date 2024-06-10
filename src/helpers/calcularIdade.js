import moment from 'moment';

// Função para calcular a idade
const calcularIdade = (dataNascimento) => {
    // Cria um objeto moment para a data de nascimento
    const nascimento = moment(dataNascimento, 'YYYY-MM-DD');

    // Verifica se a data de nascimento é válida
    if (!nascimento.isValid()) {
        return null; // Retorna null se a data de nascimento não for válida
    }

    // Calcula a diferença em anos entre a data atual e a data de nascimento
    const idade = moment().diff(nascimento, 'years');
    return idade;
};


export default calcularIdade