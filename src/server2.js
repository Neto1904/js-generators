// curl -X POST "localhost:4000/cart" --data '{"id": "123"}'
import { createServer } from 'http'
import { once } from 'events'

const PORT = 4000

async function handler(req, res) {
    if (
        req.method === 'POST' &&
        req.url.includes('cart')
    ) {
        const data = await once(req, 'data')
        const item = JSON.parse(data)

        console.log(item)

        return res.end(JSON.stringify(item))
    }

    return res.end(`hey!`)
}

createServer(handler)
    .listen(PORT)
    .on('listening', () => {
        console.log(`cart API is running on ${PORT}`)
    })

//curl "localhost:4000/products"