const productos = []
let carrito = JSON.parse(localStorage.getItem("carrito")) ? JSON.parse(localStorage.getItem("carrito")) : []

//precios random
function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
    }

//constructor de productos y asignador de funcion desplegar
class Producto {
    constructor(nombre,desc,img,precio,id){
        this.id       = Number(id)
        this.nombre   = nombre
        this.precio   = Number(precio)
        this.img      = img
        this.desc     = desc
    }
//desplegar productos en el DOM
    desplegarProductos(){
        const contenedor = document.getElementById("menu_tarjetas")
        const li = document.createElement("div")
        li.innerHTML= 
        `
                <img src="${this.img}" alt="Pastas" width="240px">
                <h3 class="text-center ">${this.nombre}</h3>
                <p class="text-center card-text">${this.desc}</p>
                <p class="card-title fs-5">precio: ${this.precio}</p>
                <button class="btn btnAgregar" id= "${this.id}">Agregar al Carrito</button>
        `
        contenedor.append(li)
        }
//evento para agregar al carrito
    agregarEvento(){
        const btnAgregar = document.getElementById(this.id)
        const productoEncontrado = productos.find(product => product.id == this.id)
        btnAgregar.addEventListener("click", () => agregarAlCarrito(productoEncontrado))
    }
    }

//llamar a la api para absorver los datos

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '4dfedc31c5msh7eeb1c06f357d55p19ca79jsndfc1c9add5e6',
        'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
    }
};
fetch('https://tasty.p.rapidapi.com/recipes/list?from=10&size=20&tags=under_30_minutes', options)
    .then((res) => res.json())
    .then((response) => {response.results.forEach(element => {
        let nombre   = element.name
        let img      = element.thumbnail_url
        let desc     = element.description
        let precio   = random(500,3000)
        let id       = element.id

        let prod= new Producto(nombre, desc, img, precio, id);
        productos.push(prod)
        
        })
        let produc1= new Producto("umus", "deasdasdasdasdasdasdasdasc", "https://www.clara.es/medio/2021/12/16/que-comer-hoy_1962056a_1280x1167.jpg", random(500,5000), 1)
        let produc2= new Producto("espirales con verduras","deasdasdasdasdasdasdasdasc", "https://www.clara.es/medio/2021/12/16/que-comer-hoy-espirales-con-verduras_739cfcef_1280x1820.jpg", random(500,5000), 2)
        let produc3= new Producto("albondigas con tomate", "deasdasdasdasdasdasdasdasc","https://www.clara.es/medio/2021/12/16/que-comer-hoy-albondigas-con-tomate_36383de3_682x909.jpg", random(500,5000),3)
        productos.push(produc1,produc2,produc3)
        productos.forEach(e => {
            e.desplegarProductos()
            e.agregarEvento()
        })
    })
    .catch(err => console.log(err))


console.log(productos)

//agregar al carrito en local storage

function agregarAlCarrito(producto) {
    
    const enCarrito = carrito.find(prod => prod.id == producto.id)
    if(!enCarrito){
        carrito.push({...producto, cantidad:1})
    }
    else{
        const carritoFiltrado = carrito.filter(prod => prod.id != producto.id)
        carrito = [
            ...carritoFiltrado,
            {...enCarrito, cantidad: enCarrito.cantidad + 1}
        ]
    }
    localStorage.setItem("carrito", JSON.stringify(carrito))
    contador.innerHTML = carrito.reduce((acc,prod) => acc+prod.cantidad,0)
}

const contador = document.getElementById('cartCounter')
contador.innerHTML = carrito.reduce((acc,prod) => acc+prod.cantidad,0)


