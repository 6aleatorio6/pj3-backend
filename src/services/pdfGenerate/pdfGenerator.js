import puppeteer from "puppeteer";

const generatePDF = async (content) => {
    try {

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.setContent(content)

        const pdf = await page.pdf({
            format: 'A4',
            printBackground: true
        })

        await browser.close();

        return pdf
    } catch (error) {
        throw new Error(error);
    }
}

export default generatePDF