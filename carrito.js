let carrito = JSON.parse(localStorage.getItem("carrito")) ? JSON.parse(localStorage.getItem("carrito")) : []

const tabla = document.getElementById("tabla")

//desplegar base del carrito dependiendo si hay o no productos

if (carrito.length>0){
    tabla.innerHTML = ` 
            <h4 class=" texto">Carrito de compras</h4>
            <table class="table texto">
                <thead id="tabla-prod">
                    <tr>
                        <td class="texto fs-5" scope="col1">#</td>
                        <td class="texto fs-5" scope="col1">img</td>
                        <td class="texto fs-5" scope="col2">Item</td>
                        <td class="texto fs-5" scope="col3">precio c/u</td>
                        <td class="texto fs-5" scope="col4">Cantidad</td>
                        <td class="texto fs-5" scope="col5">Acción</td>
                        <td class="texto fs-5" scope="col6">Total</td>
                    </tr>
                </thead>
            </table>
    `
} else{
    tabla.innerHTML=
    ` 
    <div class="card" style="width: 90%;">
        <img src="../assets/imagenes/carrucel (2).jpg" class="card-img-top" alt="...">
        <div class="card-body">
            <p class="card-text h2">No hay productos en el carrito.</p>
        </div>
    </div>
    ` 
}

//pintar contenedor del carrito

const pintarCarrito = () =>{carrito.forEach(e =>{
    const contenedor = document.getElementById('tabla-prod')
    const li = document.createElement("tr")
    li.innerHTML= 
    `
        <td class="texto text-center" id="e1" scope="col1">
            <svg style="width: 3rem; height: 3rem" class="my-0 mx-0 btn btn-info btn-sm btnBorrarProducto" id="btnBorrarProducto-${e.id}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
            </svg>
        </td>  
        <td class="texto text-center" id="e2" scope="col1" id><img style="width: 3rem; height: 3rem" src="${e.img}" alt="">  </td>
        <td class="texto text-center" id="e3"scope="col2">${e.nombre}</td>
        <td class="texto text-center" id="e4"scope="col3">$ <span>${e.precio}</span></td>
        <td class="texto text-center" scope="col4" id="cantidad${e.id}">${e.cantidad}</td>
        <td class="texto text-center" scope="col5" id=${e.id}>
            <button style="width: 3rem; height: 3rem" class="my-0 btn btn-agg btn-info btn-sm btnSuma" data-id="1">
                +
            </button>
            <button style="width: 3rem; height: 3rem" class="my-0 btn btn-agg btn-info btn-sm btnResta" data-id="2">
                -
            </button>
        </td>
        <td class="texto text-center" id="e5"scope="col6">$ <span id="precio${e.id}" >${e.cantidad * e.precio}</span></td>
    `
    contenedor.append(li)   
})
totalCarrito()
btnComprarBorrar()
}

const totalCarrito = () =>{carrito
    const contenedor = document.getElementById('tabla-prod')
    const li = document.createElement("tr")
    li.innerHTML= 
    `
    <td colspan="2">Total productos</td>
    <td id="productoTotal">${carrito.reduce((acc,prod) => acc+prod.cantidad,0)}</td>
    <td colspan="2">Precio Total</td>
    <td class="font-weight-bold">$ <span id="precioTotal">${carrito.reduce((acc,prod) => acc+(prod.precio*prod.cantidad),0)}</span></td>
    `
    contenedor.append(li)   
}

//btn de comprar, borrar carrito y seguir comprando
const btnComprarBorrar = () =>{carrito
    const contenedor = document.getElementById('tabla-prod')
    const li = document.createElement("tr")
    li.innerHTML= 
    `
    <td class="texto">
    <button style="width: 10rem; height: 3rem" class="my-0 btn btn-agg btn-sm">
        <a class="text-decoration-none texto-color" href="./menu.html">seguir comprando</a>
    </button>
    </td>
    <td class="texto">
    <button style="width: 10rem; height: 3rem" class="my-0 btn btn-agg btn-sm" id="borrarCarrito">
        vaciar carrito 
    </button>
    </td>
    <td class="texto">
    <button style="width: 10rem; height: 3rem" class="my-0 btn btn-agg btn-sm" id="comprarCarrito">
        comprar 
    </button>
    </td>   
    `
    contenedor.append(li)   
}
pintarCarrito()

const btn_borrar = document.getElementById("borrarCarrito")
btn_borrar.addEventListener("click", vaciarCarrito)

function vaciarCarrito(){
    tabla.innerHTML=` 
    <h3> No hay productos en el carrito </h3>
    ` 
    localStorage.removeItem("carrito")

    swal({
        title: "Borraste tu carrito!",
        text: "visita nuestro menu y no te quedes con las ganas",
        icon: "success",
    });
}
//sumar y restar productos

const btnSuma  =  Array(...document.getElementsByClassName("btnSuma"))
const btnResta =  Array(...document.getElementsByClassName("btnResta"))

btnSuma.forEach(el => {
    el.addEventListener("click", (e) => sumarProducto(e))
})

btnResta.forEach(el => {
    el.addEventListener("click", (e) => restarProducto(e))
})

function sumarProducto(e){
    const btn                =  e.target
    const nodoPadre          =  btn.parentNode
    const productoEncontrado =  carrito.find(item => item.id == nodoPadre.id)
    const carritoFiltrado    =  carrito.filter(item => item.id != nodoPadre.id)
    carrito = [
        ...carritoFiltrado,
        {
            ...productoEncontrado,
            cantidad: productoEncontrado.cantidad + 1
        }
    ]
    localStorage.setItem("carrito", JSON.stringify(carrito))
    const cantidad         =  document.getElementById(`cantidad${nodoPadre.id}`)
    const precio           =  document.getElementById(`precio${nodoPadre.id}`)
    const precioTotal      =  document.getElementById("precioTotal")
    const productoTotal    =  document.getElementById("productoTotal")

    cantidad.innerHTML     =  productoEncontrado.cantidad + 1
    precio.innerHTML       =  productoEncontrado.precio * (productoEncontrado.cantidad + 1)
    precioTotal.innerHTML  =  carrito.reduce((acc,item) => acc+item.precio*item.cantidad,0)
    productoTotal.innerHTML=  carrito.reduce((acc,prod) => acc+prod.cantidad,0)
}

function restarProducto(e){
    const btn                 =  e.target
    const nodoPadre           =  btn.parentNode
    const productoEncontrado  =  carrito.find(item => item.id == nodoPadre.id)
    const carritoFiltrado     =  carrito.filter(item => item.id != nodoPadre.id)
    if(productoEncontrado.cantidad>1){
    carrito = [
        ...carritoFiltrado,
        {
            ...productoEncontrado,
            cantidad: productoEncontrado.cantidad - 1
        }
    ]
    localStorage.setItem("carrito", JSON.stringify(carrito))
    const cantidad         =  document.getElementById(`cantidad${nodoPadre.id}`)
    const precio           =  document.getElementById(`precio${nodoPadre.id}`)
    const precioTotal      =  document.getElementById("precioTotal")
    const productoTotal    =  document.getElementById("productoTotal")

    cantidad.innerHTML      =  productoEncontrado.cantidad - 1
    precio.innerHTML        =  productoEncontrado.precio * (productoEncontrado.cantidad - 1)
    precioTotal.innerHTML   =  carrito.reduce((acc,item) => acc+item.precio*item.cantidad,0)
    productoTotal.innerHTML =  carrito.reduce((acc,item) => acc+item.cantidad,0)

    }
}

//borrar productos

const btnBorrarProducto  =  Array(...document.getElementsByClassName("btnBorrarProducto"))

btnBorrarProducto.forEach(el => {
    el.addEventListener("click", (e) => borrarProducto(e))
})



function borrarProducto(e){
    const btn                =  e.target
    const btnId              =  btn.id.split("-")[1]
    const carritoFiltrado    =  carrito.filter(item => item.id != btnId)

    console.log("btnId->", btnId)
    console.log("carritoFiltrado->", carritoFiltrado)

    carrito = [
        ...carritoFiltrado
    ]
    localStorage.setItem("carrito", JSON.stringify(carrito))
    
    const cantidad =  document.getElementById(`cantidad${btn.id}`)
    const e1       =  document.getElementById("e1")
    const e2       =  document.getElementById("e2")
    const e3       =  document.getElementById("e3")
    const e4       =  document.getElementById("e4")
    const e5       =  document.getElementById("e5")
    console.log(cantidad)
    console.log(cantidad)
    e1.remove()
    e2.remove()
    e3.remove()
    e4.remove()
    e5.remove()
}

//btn comrar carrito
const btnComprar  =  document.getElementById("comprarCarrito")
btnComprar.addEventListener("click", comprarCarrito)

function comprarCarrito(){
    swal({
        title: "Realizaste tu compra!",
        icon: "success",
    });
}