let Container = require("./container");
let container = new Container("products.txt");

(async ()=> {
    let new_id = await container.save({
        "title": "Mastering the Art of War",
        "price": 2651,
        "img": "url"
    })
    
    let response = await container.getById(new_id)
    console.log(response);
})();