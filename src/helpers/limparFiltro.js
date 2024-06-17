const limparFiltro = (filtro) => {
    for (const prop in filtro) {
        if (filtro[prop] === null || filtro[prop] === "" || filtro[prop] === undefined) {
            delete filtro[prop];
        }
    }
    return filtro;
};

export default limparFiltro