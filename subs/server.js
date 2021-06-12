const http = require('http');
const crypto = require('crypto');
const fnCrypt = require('./crypt');
const port = 6500;

const handles = function (req, res) {
        const { url , method } = req;

        if (url === '/encrypt' && method === 'POST') {
            let data = ''

            req.on('data', function (chunk) {
                data += chunk.toString()
            })

            req.on('end', function () {
                
                fnCrypt.encrypt(JSON.parse(data), crypto)
                .then(message => {
                    res.end(JSON.stringify(message))
                })
                .catch(err => {
                    res.end(JSON.stringify(err))
                })
            })
        }

        if (url === '/decrypt' && method === 'POST') {
            let data = ''

            req.on('data', function (chunk) {
                data += chunk.toString()
            })

            req.on('end', function () {
                
                fnCrypt.decrypt(data, crypto)
                .then(message => {
                    res.end(JSON.stringify(message))
                })
                .catch(err => {
                    res.end(JSON.stringify(err))
                })
            })
        }
}


const server = http.createServer(handles)

server.listen(port, function () {
    console.log(`LMCU Bank. Server Running on ${port} port`)
})