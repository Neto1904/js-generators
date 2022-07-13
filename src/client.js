/**
 -> data enrichment - data processing

 1. read data from database
 2. get more detailed information from second API
 3. submit data to another API
 */

const fakeDB = async () => Array.from({
    length: 1000
}, (element, index) => `${index}-laptop`)

const PRODUCTS_API = `http://localhost:3000/products`
const CART_API = `http://localhost:4000/cart`

async function processDBData() {
    const products = await fakeDB()
    const responses = []

    for (const product of products) {
        const productInfo = await (await fetch(`${PRODUCTS_API}?name=${product}`)).text()
        const cartInfo = await (await fetch(CART_API,
            {
                method: 'POST',
                body: productInfo
            }
        )).json()

        responses.push(cartInfo)
    }

    return responses
}

// console.table(await processDBData())

async function* processDBDataGen() {
    const products = await fakeDB()

    for (const product of products) {
        const productInfo = await (await fetch(`${PRODUCTS_API}?name=${product}`)).text()
        const cartInfo = await (await fetch(CART_API,
            {
                method: 'POST',
                body: productInfo
            }
        )).json()

        yield cartInfo
    }


}


for await (const data of processDBDataGen()) {
    console.log(data)
}