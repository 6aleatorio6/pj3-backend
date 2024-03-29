import fs from 'fs'
import hbs from 'handlebars'
import path from 'path'

const compileTemplate = async (template, data) => {
    const filePath = path.join(__dirname, `${template}.hbs`)
    const html = await fs.readFile(filePath, 'utf-8')
    return hbs.compile(html)(data)
}

export default compileTemplate