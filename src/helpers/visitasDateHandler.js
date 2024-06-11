import moment from "moment";
import dateFormatter from "./dateFormatter.js";

const visitasDateHandler = (filtro, totalMonths = 1) => {

    try {
        if (!filtro.dataDaVisitaMin && !filtro.dataDaVisitaMax) {

            filtro.dataDaVisitaMin = moment().subtract(totalMonths, 'months').toISOString();
            filtro.dataDaVisitaMax = moment().toISOString();
    
        } else if (!filtro.dataDaVisitaMin) {
    
            const dataMax = dateFormatter(filtro.dataDaVisitaMax);
            filtro.dataDaVisitaMin = dataMax.subtract(totalMonths, 'months').toISOString();
    
        } else if (!filtro.dataDaVisitaMax) {
    
            const dataMin = dateFormatter(filtro.dataDaVisitaMin);
            filtro.dataDaVisitaMax = dataMin.add(totalMonths, 'months').toISOString();
            
        } else {
            const dataMin = dateFormatter(filtro.dataDaVisitaMin);
            const dataMax = dateFormatter(filtro.dataDaVisitaMax);
            filtro.dataDaVisitaMin = dataMin
            filtro.dataDaVisitaMax = dataMax
        }
    
        return filtro;
        
    } catch (error) {
        console.log(error);
    }
};

export default visitasDateHandler;