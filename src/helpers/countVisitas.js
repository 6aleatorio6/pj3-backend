const visitasCadastradas = (visitas) => {
    visitas.forEach(visita => {
        visita.usuario
    });
}

const visitasCadastradas2 = (visitas) => {
    const cadastrados = visitas.filter(visitas => visitas.usuario.email)
    return cadastrados
}

const array = [1, 2 , 3]

const maioresQueTres = numeros.filter(numero => numero == 3);