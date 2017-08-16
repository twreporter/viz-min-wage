var connect = require('connect'),
    serveStatic = require('serve-static')

var app = connect()

app.use(serveStatic("./out/"))
app.listen(3000)

console.log('Listening on port 3000.')
