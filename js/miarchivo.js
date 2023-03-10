//? Este es mi proyecto, tiene por objetivo brindar un servicio de E-commerce basándose en un vivero.   Tiene la funcionalidad de agregar un nuevo producto (planta) al stock, también se puede realizar una búsqueda ordenada de manera alfabética y por precios, mayor y menor o viceversa.   También tiene un buscador por nombre.    Cada producto tiene su botón para agregar al carrito si el usuario lo desea, allí se calcula su costo total con los detalles de dicha selección. Si el  usuario quiere puede agregar o eliminar productos del carrito. Por ultimo cuando ya este decidido se encuentra su botón Finalizar compra, finalizando así el simulador 

//! CLASS CONSTRUCTORA
class Planta {
    constructor(indice, nombre, familia, precio, imagen){ 
        this.indice = indice,
        this.nombre = nombre,
        this.familia = familia,
        this.precio = precio,
        this.imagen = imagen,
        this.cantidad = 1
    }
    agregamosIva(){
        let precioConIva = this.precio *1.21
        return precioConIva
    }
    restarUnidad(){
        return this.cantidad -= 1
    }
    sumarUnidad(){
        this.cantidad += 1    
    }
}

let listadoDePlantas = []
//* La función "cargarListadoDePlantas()" para hacer una peticion(GET) al archivo JSON 
const cargarListadoDePlantas = async () => {
    const response = await fetch("../infoStock.json")
    const data = await response.json()
    for(let plant of data){
        let plantaNueva = new Planta(plant.indice, plant.nombre, plant.familia, plant.precio, plant.imagen)
        
        listadoDePlantas.push(plantaNueva)
    }
    localStorage.setItem('listadoDePlantas', JSON.stringify(listadoDePlantas))
}

if (localStorage.getItem('listadoDePlantas')) {
    for (const plant of JSON.parse(localStorage.getItem('listadoDePlantas'))) {
        let plantaStorage = new Planta (plant.indice, plant.nombre, plant.familia, plant.precio, plant.imagen)
        listadoDePlantas.push(plantaStorage)
    }
} else {
    Toastify({
        text: 'La información almacenada ha sido actualizada!',
        duration: 1500,
        gravity: "top",
        position: "right",
        style: {
          background: "linear-gradient(to right, #509ee3, #f3f3f3)",
          color: '#000'
        },
    }).showToast();

    cargarListadoDePlantas()
}

//! CAPTURANDO DOM
let $divPlants = document.querySelector('#plants') 
let $guardarPlantaBtn = document.getElementById('formBtn') 
let $inputBuscador = document.getElementById('buscador')
let $coincidencia = document.querySelector('#coincidencia') 
let $selectOrden = document.querySelector('#selectOrden') 
let $modalBodyCarrito = document.querySelector('#modal_bodyCarrito') 
let $btnCarrito = document.querySelector('#botonCarrito') 
let $precioTotal = document.querySelector('#precioTotal')
let $loaderTexto = document.querySelector('#loaderTexto')
let $loader = document.querySelector('#loader')
let $btnFinalizarCompra = document.querySelector('#btnFinalizarCompra')
let $bodyTable = document.querySelector('#bodyTable')

//! CONDICIONAL CARRITO
let productosEnCarrito = []
if (localStorage.getItem('carrito')) {
    for (let plant of JSON.parse(localStorage.getItem('carrito'))) {

        let cantStorage = plant.cantidad
       
        let planta = new Planta(plant.indice, plant.nombre, plant.familia, plant.precio, plant.imagen)
       
        planta.cantidad = cantStorage
        productosEnCarrito.push(planta)
    }
} else {
    productosEnCarrito = []
    localStorage.setItem ('carrito', productosEnCarrito)
}


//! FUNCTIONS
//* La función recorre un array y va creando una card por cada producto, luego vuelca la informacion requerida en el DOM.
function listaProductos(array) {
    $divPlants.innerHTML = ''

    for (let p of array) {
        let newPlantDiv = document.createElement('div') 
    
        newPlantDiv.className = "col-12 col-md-6 col-lg-4"
        newPlantDiv.innerHTML = `
        <div id="${p.indice}" class="card" style="width: 18rem;">
            <img src="../archivos/${p.imagen}" class="card-img-top img-fluid" alt="${p.nombre}">
            <div class="card-body" id='decoracionPropia'>
                <h5 class="card-title">${p.nombre}</h5>
                <p class="card-text">Familia: ${p.familia}</p>
                <p class="card-text">Precio: $${p.agregamosIva()}</p>
                <a id="agregarBtn${p.indice}" class="btn btn-primary">Agregar al carrito</a>
            </div>
        </div>
        `
        $divPlants.appendChild(newPlantDiv)
        let agregarBtn = document.getElementById(`agregarBtn${p.indice}`)
        agregarBtn.addEventListener('click', ()=>{
            agregarAlCarrito(p)
        })
    }
}

//* "compraTotal()" se encarga de hacer la suma de todos los productos que esten dentro del array.
function compraTotal(array) {
    let total = array.reduce((acc, producto) => acc + (producto.agregamosIva() * producto.cantidad), 0)

    total === 0 ? ($precioTotal.innerHTML = `El carrito se encuentra vacio`) : ($precioTotal.innerHTML = `El precio total es $${total}`)
}

//* Avisa al usuario cada vez que algun producto es agregado al carrito
function alertSeAgregoAlCarrito(planta) {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: `La planta ${planta.nombre} ha sido agregada al carrito`,
        showConfirmButton: false,
        timer: 1000,
        background: '#f3f3f3'
    })
}

//* Avisa al usuario que ya existe este producto en carrito
function existeProductoEnCarrito(planta) {
    if (planta != '') {
        Swal.fire({
            title: `Ya existe en el carrito un producto llamada ${planta.nombre}`,
            text:`¿Desea agregarlo de todas maneras?`,
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Si',
            confirmButtonColor: '#474F1D',
            cancelButtonText: `No`,
            cancelButtonColor: `#BB8246`,
          }).then((resultado)=>{
            if (resultado.isConfirmed) {
                Swal.fire({
                    title: '¡Se agregó al carrito correctamente!',
                    icon: 'success',
                    confirmButtonColor: '#474F1D',
                })
                planta.sumarUnidad()
                localStorage.setItem('carrito', JSON.stringify(productosEnCarrito))
            } else {
                Swal.fire({
                    title: '¡Operación cancelada!',
                    icon: 'info',
                    confirmButtonColor: '#BB8246',
                    timer: 1500
                })
            }
          })
    } 
}

//* Esta funcion agrega el produto seleccionado por el cliente
function agregarAlCarrito(planta) {
    let productoAgregado = productosEnCarrito.find((elem)=> elem.indice === planta.indice)
    if (productoAgregado === undefined) {
        alertSeAgregoAlCarrito(planta)
        productosEnCarrito.push(planta)        
        localStorage.setItem('carrito', JSON.stringify(productosEnCarrito))
    } else {
        existeProductoEnCarrito(planta)
    }
}

//* Se encarga de agregar productos nuevos al stock 
function cargarPlanta(array) {
    let $inputNombre = document.getElementById('nombreInput') 
    let $inputFamilia = document.getElementById('familiaInput') 
    let $inputPrecio = document.getElementById('precioInput') 

    if ($inputNombre.value != '' && isNaN($inputNombre.value) && $inputFamilia.value != '' && isNaN($inputFamilia.value) && $inputPrecio.value != '') {
        
        const nuevaPlanta = new Planta(array.length+1, $inputNombre.value, $inputFamilia.value, Number($inputPrecio.value), 'planta_new.jpg')
    
        array.push(nuevaPlanta)
        localStorage.setItem('listadoDePlantas', JSON.stringify(array))
        listaProductos(array)

        let cargarPlantasNuevas = document.querySelector('#cargarPlantasNuevas')
        cargarPlantasNuevas.reset()
        notificacionToastify()

    } else {
        Toastify({
            text: 'Ingrese la información correctamente por favor',
            duration: 2000,
            gravity: "top",
            position: "right",
            style: {
              background: "linear-gradient(to right, #f3f3f3, #DE1D0B)",
              color: '#000'
            },
        }).showToast();
    }
}

//* Esta función se ejecuta una vez que se ha cargado un nuevo producto correctamente
function notificacionToastify() {
    Toastify({
        text: 'La planta ha sido agregada con exito al stock',
        duration: 2000,
        gravity: "top",
        position: "right",
        style: {
          background: "linear-gradient(to right, #f3f3f3, #DDC297)",
          color: '#000'
        },
    }).showToast();
}

//* "busqueda()" le permite al usuario comenzar una busqueda parcial(filter) a través del input por nombre o familia
function busqueda(buscado, array) {
    let buscadorInput = array.filter(
            (planta) => planta.familia.toLowerCase().includes(buscado) || planta.nombre.toLowerCase().includes(buscado)
        )
    buscadorInput.length === 0 ? ($coincidencia.innerHTML = `<h3>No hay resultados con su búsqueda</h3>`, listaProductos(buscadorInput)) : ($coincidencia.innerHTML = '', listaProductos(buscadorInput))

}

//* Esta se encarga de que los productos que esten en el carrito (previamente seleccionados por el cliente) sean añadidos al DOM. 
function agregarProductosAlBodyTableCarrito(array) {
    $bodyTable.innerHTML = ''
    
    array.forEach((planta) => {
        $bodyTable.innerHTML += `
            <tr id="planta${planta.indice}">
                <th >${planta.nombre}</th>
                <td >$${planta.agregamosIva()}</td>
                <td >${planta.cantidad}</td>
                <td >$${planta.agregamosIva() * planta.cantidad}</td>
                <td>
                <button class="btn btn-success" id="btnSumarUnidad${planta.indice}">+1</button>
                </td>
                <td>
                <button class="btn btn-danger" id="btnRestarUnidad${planta.indice}">-1</button>
                </td>
                <td>
                <button class="btn btn-danger" id="btnEliminar${planta.indice}">
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                    width="20px" height="20px" viewBox="0 0 512.000000 512.000000"
                    preserveAspectRatio="xMidYMid meet">

                    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                    fill="#000000" stroke="none">
                    <path d="M1871 5109 c-128 -25 -257 -125 -311 -241 -37 -79 -50 -146 -50 -259
                    l0 -88 -487 -3 c-475 -3 -489 -4 -534 -24 -60 -28 -125 -93 -152 -153 -30 -64
                    -30 -178 0 -242 27 -60 92 -125 152 -153 l46 -21 2025 0 2025 0 46 21 c60 28
                    125 93 152 153 30 64 30 178 0 242 -27 60 -92 125 -152 153 -45 20 -59 21
                    -533 24 l-488 3 0 88 c0 49 -5 112 -10 142 -34 180 -179 325 -359 359 -66 12
                    -1306 12 -1370 -1z m1359 -309 c60 -31 80 -78 80 -190 l0 -90 -750 0 -750 0 0
                    90 c0 110 20 159 78 189 36 19 60 20 670 21 615 0 634 -1 672 -20z"/>
                    <path d="M625 3578 c3 -24 62 -727 130 -1563 69 -836 130 -1558 136 -1605 24
                    -197 159 -352 343 -395 91 -22 2561 -22 2652 0 184 43 319 198 343 395 6 47
                    67 769 136 1605 68 836 127 1539 130 1563 l5 42 -1940 0 -1940 0 5 -42z m1122
                    -286 c17 -12 37 -36 46 -54 12 -26 32 -304 92 -1273 l77 -1239 -21 -43 c-37
                    -77 -129 -104 -205 -60 -76 43 -66 -39 -151 1332 l-77 1239 21 43 c38 79 146
                    106 218 55z m883 8 c26 -13 47 -34 60 -60 20 -39 20 -56 20 -1280 0 -1224 0
                    -1241 -20 -1280 -23 -45 -80 -80 -130 -80 -50 0 -107 35 -130 80 -20 39 -20
                    56 -20 1280 0 1223 0 1241 20 1280 37 73 124 99 200 60z m901 0 c27 -14 46
                    -34 60 -63 l21 -43 -77 -1239 c-85 -1371 -75 -1289 -151 -1332 -76 -44 -168
                    -17 -205 60 l-21 43 76 1234 c71 1155 77 1238 97 1277 15 29 34 48 63 63 52
                    25 86 25 137 0z"/>
                    </g>
                    </svg>
                </button>
                </td>
            </tr>
        `
    });
    eliminarTodoProductoDeCarrito(array)
    sumarUnidadEnElCarrito(array)
    restarUnidadDelCarrito(array)
    compraTotal(array)
}

//* El usuario puede eliminar todos los productos del carrito que tengan la misma id
function eliminarTodoProductoDeCarrito(array) {
    array.forEach((planta)=> {
        document.getElementById(`btnEliminar${planta.indice}`).addEventListener('click', ()=>{
            let cardProducto = document.getElementById(`planta${planta.indice}`)
            cardProducto.remove()
            let productoAEliminar = array.find(productoC => productoC.indice === planta.indice)
            let posicion = array.indexOf(productoAEliminar)
            array.splice(posicion, 1)
            localStorage.setItem('carrito', JSON.stringify(array))
            compraTotal(array)
        })
    })
}

//* El cliente puede sumar de una cantidad
function sumarUnidadEnElCarrito(array) {
    array.forEach((planta)=> {
        document.querySelector(`#btnSumarUnidad${planta.indice}`).addEventListener('click', ()=>{
            planta.sumarUnidad()
            localStorage.setItem('carrito', JSON.stringify(array))
            agregarProductosAlBodyTableCarrito(array)
        })
    })
}

//* El cliente puede restar de una cantidad
function restarUnidadDelCarrito(array) {
    array.forEach((planta)=> {
        document.getElementById(`btnRestarUnidad${planta.indice}`).addEventListener('click', ()=>{
            let cant = planta.restarUnidad()
            if (cant < 1) {
                let cardProducto = document.getElementById(`planta${planta.indice}`)
                cardProducto.remove()
                let posicion = array.indexOf(planta)
                array.splice(posicion, 1)
                localStorage.setItem('carrito', JSON.stringify(array))
                compraTotal(array)
            } else {
                localStorage.setItem('carrito', JSON.stringify(array))
            }
            agregarProductosAlBodyTableCarrito(array)
        })
    })
}

//* Ordenar de menor a mayor
function ordenarMenorMayor(array) {
    const menorMayor = [].concat(array)
    menorMayor.sort((a, b) => a.precio - b.precio)
    listaProductos(menorMayor)
}

//* Ordenar mayor a menor
function ordenarMayorMenor(array) {
    const mayorMenor = [].concat(array)
    mayorMenor.sort((c, d) => d.precio - c.precio)
    listaProductos(mayorMenor)
}

//* Ordenar alfabeticamente
function ordenarAlfa(array) {
    const ordenadoAlfa = [].concat(array)
    ordenadoAlfa.sort((a, b) => {
        if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) {
            return 1
        }
        if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) {
            return -1
        }
        return 0
    })
    listaProductos(ordenadoAlfa)
}

//* Simula la finalización de una compra
function  finalizarCompra(array) {

    if (array != '') {
        Swal.fire({
            title: '¿Desea seguir con su compra?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Si, quiero',
            confirmButtonColor: '#474F1D',
            cancelButtonText: `No quiero`,
            cancelButtonColor: `#BB8246`,
          }).then((resultado)=>{
            if (resultado.isConfirmed) {
                Swal.fire({
                    title: '¡Compra realizada con éxito!',
                    icon: 'success',
                    confirmButtonColor: '#474F1D',
                    text: `¡Muchas gracias por su compra! :)`
                })
                productosEnCarrito = []
                compraTotal(productosEnCarrito)
                $bodyTable.innerHTML = ''
                localStorage.removeItem('carrito')
            } else {
                Swal.fire({
                    title: '¡Compra cancelada!',
                    icon: 'info',
                    confirmButtonColor: '#BB8246',
                    timer: 2000
                })
            }
          })
    } else {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: `El carrito esta vacio, no se puede ejecutar una compra`,
            showConfirmButton: false,
            timer: 1500,
            background: '#f3f3f3'
        })
    } 
}

//! EVENTOS
$guardarPlantaBtn.addEventListener('click', ()=> {
    cargarPlanta(listadoDePlantas)
})
     
$inputBuscador.addEventListener('input', ()=> {
    busqueda($inputBuscador.value, listadoDePlantas)
})

$selectOrden.addEventListener('change', () => {
    if ($selectOrden.value === '1') {
        ordenarMayorMenor(listadoDePlantas)
    } else if ($selectOrden.value === '2') {
        ordenarMenorMayor(listadoDePlantas)
    } else if ($selectOrden.value === '3') {
        ordenarAlfa(listadoDePlantas)
    } else {
        (listadoDePlantas)
    }
})

$btnCarrito.addEventListener('click', () => {
    agregarProductosAlBodyTableCarrito(productosEnCarrito, listadoDePlantas)   
})

$btnFinalizarCompra.addEventListener('click', ()=>{
    finalizarCompra(productosEnCarrito)
})

//! CODIGO
setTimeout(() => {
    $loaderTexto.innerHTML = ''
    $loader.remove()
    
    listaProductos(listadoDePlantas)
}, 1500)

//!ERROR
/* Cuando agregamos cantidad a través del btn "agregar al carrito" funciona. Pero cuando quedan produtos dentro del carrito y se recarga la página ya no funciona. */