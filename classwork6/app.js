const loadBtn = document.getElementById("loadBtn")
const 

loadBtn.addEventListener("click", loadProducts)

async function loadProducts(){
    try{
    productBlock.innerHTML = "<p>загрузка товаров...</p>"
    const response = await fetch("https://dummyjson.com/products")
    

    const data = await response.json()
    data.products.forEach((product) => {
        console.log(product.title)
        console.log(product.price)
        console.log(product.description)
    })
    }catch(error{
        productBlock.innerHTML = `
            <p>Ошибка: ${error.massage}</p>
        `
    })

    console.log(data)
    console.log(data.products)
}

function.forEach((product) => {
    productBlock.innerHTML += `
    <div>
        <h3>${product.title}</h3>
        <img src ="${product.thunbnail}" width ="150">
        <p>${product.description}</p>
        <p>Цена: ${product.price}</p>
    </div>
    `
})