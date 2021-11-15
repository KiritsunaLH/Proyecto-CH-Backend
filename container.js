let fs = require("fs")
let path = require("path")

class Container {
    constructor(url) {
        this.url = url
    }

    async save(product) {
        try {
            let products = await this.getAll();
            let new_product_id = await this.getNewId(products);
            let new_product = {
                id: new_product_id,
                ...product                
            }
            products.push(new_product);
            let content = JSON.stringify(products, null, 2);
            await fs.promises.writeFile(`${this.url}`, content);
            return new_product_id;
        } catch (error) {
            console.log(error)
        }
    }

    async getNewId(products){
        let restemporal = products.reduce((prev, actual) => {
            if(actual.id < prev){
                return prev;
            }else {
                return actual.id;
            }
        }, 0);
        return restemporal +1;
    }

    async getById(id) {
        try {
            let response = null;
            let products = await this.getAll();
            console.log(products);
            if (products.length > 0) {
                products.forEach(elem => {
                    if(elem.id == id) {
                        response = elem;
                    }
                });
            }
            return response;
        } catch (error) {
            console.log(error)
        }
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
            let res = [];
            let products = await this.getAll();
            for (const key in products) {
                if(products[key].id == id) {
                    products.splice(key, 1);
                }
            }
            let content = JSON.stringify(products, null, 2);
            await fs.promises.writeFile(`${this.url}`, content);
            return res;
        } catch (error) {
            console.log(error)
        }
    }
    
    async deleteAll() {
        try {
            await fs.promises.writeFile(`${this.url}`, '[]');
            return 0;
        } catch (error) {
            console.log(error)
        }
    };
};
;
module.exports = Container;