const PORT = process.env.PORT || 5000

let http = require('http')
let fs = require('fs')

http.createServer((req, res) => {
    fs.readFile('index.html', (err, data) => {
        res.writeHead(200, { "content-type": "text/html" })
        res.write(data)
        res.end()
    })

}).listen(PORT, () => console.log(`Listening on ${ PORT }`))