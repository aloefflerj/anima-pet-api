var fs = require('fs')

module.exports =  {
    writeToJson: async (filename, data) => {
        var json = JSON.stringify(data, null, 4)

        await fs.writeFileSync(`../api/data/${filename}.json`, json, 'utf-8', () => console.log('ok'))
    }
}