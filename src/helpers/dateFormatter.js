import moment from "moment";

const dateFormatter = (data) => {
    // Tenta formatar a data em diferentes formatos aceitos
    const formatos = ['YYYY-MM-DD', 'DD-MM-YYYY', 'YYYY/MM/DD', 'DD/MM/YYYY'];

    for (const formato of formatos) {
        const dataFormatada = moment(data, formato, true);
        if (dataFormatada.isValid()) {
            return dataFormatada.toISOString();
        }
    }
    return null; // Caso nenhum formato seja válido
};

export default dateFormatter