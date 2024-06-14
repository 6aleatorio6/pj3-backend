import puppeteer from "puppeteer";

const formatarTimestampParaData = () => {
    const timestamp = Date.now()
    const data = new Date(timestamp);
    const novaData = data.toLocaleDateString()
    return novaData;
};

const headerTemplate = `<div style="font-size: 12px; text-align: center; width: 100%; border-bottom: 1px solid #ddd; padding: 10px 0;">
                            <div style="font-size: 20px">Parque Natural Municipal do Juqueriquerê</div>
                            <div>Relatório de Visitas</div>
                            <div>${formatarTimestampParaData()}</div>
                        </div>`;
const footerTemplate = '<div style="font-size: 12px; text-align: center; width: 100%; border-top: 1px solid #ddd; padding: 10px 0;">Página <span class="pageNumber"></span> de <span class="totalPages"></span></div>';

const generatePDF = async (content) => {
    try {
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();

        await page.setContent(content);

        const margins = {
            top: '100px',      // Ajustando a margem para pixels
            left: '40px',
            right: '40px',
            bottom: '100px'    // Ajustando a margem para pixels
        };

        const pdf = await page.pdf({
            format: 'A4',
            printBackground: true,
            displayHeaderFooter: true,
            headerTemplate: headerTemplate,
            footerTemplate: footerTemplate,
            margin: margins
        });

        await browser.close();

        return pdf;
    } catch (error) {
        throw new Error(error);
    }
}

export default generatePDF;