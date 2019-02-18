const PORT = process.env.PORT || 5000

let http = require('http')

http.createServer((req, res) => {
    res.writeHead(200, { "content-type": "text/html" })
    res.write('Hello World')
    res.end()
}).listen(PORT, () => console.log(`Listening on ${ PORT }`))