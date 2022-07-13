import { createServer } from 'http'
import { parse } from 'url'
import { randomUUID } from 'crypto'

const PORT = 3000

async function handler(req, res) {
    if (
        req.method === 'GET' &&
        req.url.includes('products')
    ) {
        const { query: { name } } = parse(req.url, true)
        console.log(name)
        const item = {
            product: name,
            id: randomUUID()
        }
        return res.end(JSON.stringify(item))
    }

    return res.end(`hello`)
}

createServer(handler)
    .listen(PORT)
    .on('listening', () => {
        console.log(`products API is running on ${PORT}`)
    })

//curl "localhost:3000/products"