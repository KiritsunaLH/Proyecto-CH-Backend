const fs = require('fs')

class Container {
    constructor(url) {
        this.url = url
        this.products = []
    }

    async save(product) {
        try {
            const id = this.product.length + 1
            this.products.push({...product, id})
            await fs.promises.writeFile( this.path, JSON.stringify(this.products, null, 2))
            return id
        } catch (error) {
            console.log("Error from save", error)
        }
    }

    async readFileContainer() {
        try {
            const file = await fs.promises.readFile(this.url, 'utf-8')
            if (file != "")
                return JSON.parse(file)
            else 
                return []
        } catch (error) {
            console.log("Error from readFileContainer", error)
        }
    }

    async getById(id) {
        const product = this.product.filter( prod => prod.id === id ? prod: null)
        return product.length !== 0 ? product [0] : null
    }

    async getAll() {
        try {
            let products = await fs.promises.readFile(`${this.url}`, 'utf-8');
            return JSON.parse(products)
        } catch (error) {
            console.log(error)
        }
    }

    async deleteById(id) {
        try {
            const curProducts = this.products.filter( prod => prod.id !== id)
            this.products = curProducts
            await fs.promises.writeFile(this.url, JSON.stringify(this.products, null, 2))
        } catch (error) {
            console.log("error from deleteById", error)
        }
    }
    
    async deleteAll() {
        try {
            await fs.promises.writeFile(`${this.url}`, '[]');
            this.products = []
        } catch (error) {
            console.log("error from deleteAll", error)
        }
    }
}

module.exports = {
    Container
}