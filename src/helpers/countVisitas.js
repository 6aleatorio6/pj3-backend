const visitasCadastradas = (visitas) => {
    const cadastrados = visitas.filter(visitas => visitas.usuario.email)
    const incadastrados = visitas.filter(visitas => !visitas.usuario.email)

    return [cadastrados.length, incadastrados.length]
}

const visitasTiposSexo = (visitas) => {
    const SexosO = visitas.filter(visitas => visitas.usuario.sexo =="O")
    const SexosM = visitas.filter(visitas => visitas.usuario.sexo =="M")
    const SexosF = visitas.filter(visitas => visitas.usuario.sexo =="F")

    return [SexosM.length, SexosF.length, SexosO.length]
}

export default {visitasCadastradas, visitasTiposSexo}

