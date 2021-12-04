var fs = require('fs')

module.exports =  {
    writeToJson: (filename, data) => {
        var json = JSON.stringify(data, null, 4)

        fs.writeFile(`../api/data/${filename}.json`, json, 'utf-8', () => console.log('ok'))
    }
}