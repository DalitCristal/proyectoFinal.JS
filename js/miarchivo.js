//! CLASS CONSTRUCTORA
class Planta {
    constructor(indice, nombre, familia, precio, imagen){ //* Atributos
        this.indice = indice,
        this.nombre = nombre,
        this.familia = familia,
        this.precio = precio,
        this.imagen = imagen 
    }
    //* Métodos
    caracteristicasPlanta(){
        console.log(`La planta se denomina ${this.nombre}, pertenece a la familia de "${this.familia}" y tiene un valor de ${this.precio}`);
    }
    agregamosIva(){
    return this.precio *1.21
    }
}

//* Instanciación de objetos
const plantA = new Planta (1, 'lechuga', 'hortalizas', 100, 'planta_de_lechuga.jpg')
const plantB = new Planta (2, 'tomate', 'hortalizas', 100, 'planta_de_tomate.jpg')
const plantC = new Planta (3, 'alcaucil', 'hortalizas', 100, 'planta_de_alcaucil.jpg')
const plantD = new Planta (4, 'berenjena', 'hortalizas', 100, 'planta_de_berenjena.jpg')
const plantE = new Planta (5, 'pimiento rojo', 'hortalizas', 100, 'planta_de_pimiento.jpg')
const plantF = new Planta (6, 'zanahoria', 'hortalizas', 100, 'planta_de_zanahoria.jpg')
const plantG = new Planta (7, 'romero', 'aromaticas', 300, 'planta_de_romero.jpg')
const plantH = new Planta (8, 'albahaca', 'aromaticas', 300, 'planta_de_albahaca.jpg')
const plantI = new Planta (9, 'lavanda', 'aromaticas', 300, 'planta_de_lavanda.jpg')
const plantJ = new Planta (10, 'salvia', 'aromaticas', 300, 'planta_de_salvia.jpg')
const plantK = new Planta (11, 'tomillo', 'aromaticas', 300, 'planta_de_tomillo.jpg')
const plantL = new Planta (12, 'incienso', 'aromaticas', 300, 'planta_de_incienso.jpg')
const plantM = new Planta (13, 'menta', 'aromaticas', 300, 'planta_de_menta.jpg')
const plantN = new Planta (14, 'cedron', 'aromaticas', 300, 'planta_de_cedron.jpg')
const plantO = new Planta (15, 'oregano', 'aromaticas', 300, 'planta_de_oregano.jpg')
const plantP = new Planta (16, 'rosa del desierto', 'suculentas', 400, 'planta_rosa_del_desierto.jpg')
const plantQ = new Planta (17, 'oreja de shrek', 'suculentas', 400, 'planta_orejas_de_shrek.jpg')
const plantR = new Planta (18, 'cactus piedra', 'suculentas', 400, 'planta_cactus_piedra.jpg')
const plantS = new Planta (19, 'cola de burro', 'suculentas', 400, 'planta_cola_de_burro.jpg')
const plantT = new Planta (20, 'rosario', 'suculentas', 400, 'planta_rosario.jpg')
const plantU = new Planta (21, 'kalanchoe tomentosa', 'suculentas', 400, 'planta_kalanchoe_tomentosa.jpg')
const plantV = new Planta (22, 'castello', 'suculentas', 400, 'planta_castello_paivae.jpg')
const plantW = new Planta (23, 'arbol de jade', 'suculentas', 400, 'planta_arbol_de_jade.jpg')
const plantX = new Planta (24, 'perforata', 'suculentas', 400, 'planta_perforata.jpg')

//* seteo array
let listadoDePlantas = []
if (localStorage.getItem('listadoDePlantas')) {
    for (const plant of JSON.parse(localStorage.getItem('listadoDePlantas'))) {
        let plantaStorage = new Planta (plant.indice, plant.nombre, plant.familia, plant.precio, plant.imagen)
        listadoDePlantas.push(plantaStorage)
        console.log(listadoDePlantas);
    }
} else {
    console.log('Esta es la 1ra vez');
    listadoDePlantas.push(plantA, plantB, plantC, plantD, plantE, plantF, plantG, plantH, plantI, plantJ, plantK, plantL, plantM, plantN, plantO, plantP, plantQ, plantR, plantS, plantT, plantU, plantV, plantW, plantX)
    localStorage.setItem('listadoDePlantas', JSON.stringify(listadoDePlantas))
}
console.log(listadoDePlantas);

//! CONDICIONAL
let productosEnCarrito = JSON.parse(localStorage.getItem('carrito')) || []
console.log(productosEnCarrito);
//! APLICANDO DOM
let divPlants = document.querySelector('#plants') 
let guardarPlantaBtn = document.getElementById('formBtn') 
let inputBuscador = document.getElementById('buscador')
let coincidencia = document.querySelector('#coincidencia') 
let selectOrden = document.querySelector('#selectOrden') 
let modal_bodyCarrito = document.querySelector('#modal_bodyCarrito') 
let btnCarrito = document.querySelector('#botonCarrito') 
let precioTotal = document.querySelector('#precioTotal')
let btnFinalizarCompra = document.querySelector('#btnFinalizarCompra')

//! FUNCTIONS
function listaProductos(array) {
    divPlants.innerHTML = ''

    for (let p of array) {
        let newPlantDiv = document.createElement('div') 
    
        newPlantDiv.className = "col-12 col-md-6 col-lg-4"
        newPlantDiv.innerHTML = `
        <div id="${p.indice}" class="card" style="width: 18rem;">
            <img src="../archivos/${p.imagen}" class="card-img-top img-fluid" alt="${p.nombre}">
            <div class="card-body" id='decoracionPropia'>
                <h5 class="card-title">${p.nombre}</h5>
                <p class="card-text">Familia: ${p.familia}</p>
                <p class="card-text">Precio: $${p.precio}</p>
                <a id="agregarBtn${p.indice}" class="btn btn-primary">Agregar al carrito</a>
            </div>
        </div>
        `
        divPlants.appendChild(newPlantDiv)
        let agregarBtn = document.getElementById(`agregarBtn${p.indice}`)
        console.log(agregarBtn);
        agregarBtn.onclick = ()=>{

            agregarAlCarrito(p)
        }
    } 
}

function compraTotal(array) {
    let total = array.reduce((acc, productosEnCarrito)=> acc + productosEnCarrito.precio, 0)

    total === 0 ? (precioTotal.innerHTML = `El carrito se encuentra vacio`) : (precioTotal.innerHTML = `El precio total es $${total}`)
    
}

function alertSeAgregoAlCarrito(planta) {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: `La planta ${planta.nombre} ha sido agregada al carrito`,
        showConfirmButton: false,
        timer: 1500,
        background: '#f3f3f3'
    })
}

function existeProductoEnCarrito(planta) {
    Swal.fire({
        position: 'center',
        text: `Ya existe un producto llamado ${planta.nombre} en el carrito`,
        icon: 'info',
        confirmButtonText: 'Ok',
        background: '#f3f3f3',
        confirmButtonColor: '#474F1D'
    })
}

function agregarAlCarrito(planta) {
    let productoAgregado = productosEnCarrito.find((elem)=> elem.indice === planta.indice)

    if (productoAgregado === undefined) {
        alertSeAgregoAlCarrito(planta)
        productosEnCarrito.push(planta)
        localStorage.setItem('carrito', JSON.stringify(productosEnCarrito))
        console.log(productosEnCarrito);
    } else {
        existeProductoEnCarrito(planta)
    }
}

function cargarPlanta(array) {
    let inputNombre = document.getElementById('nombreInput') 
    let inputFamilia = document.getElementById('familiaInput')
    let inputPrecio = document.getElementById('precioInput') 

    const nuevaPlanta = new Planta(array.length+1, inputNombre.value, inputFamilia.value, Number(inputPrecio.value), 'planta_new.jpg')
    console.log(nuevaPlanta);

    array.push(nuevaPlanta)
    localStorage.setItem('listadoDePlantas', JSON.stringify(array))
    listaProductos(array)
    let cargarPlantasNuevas = document.querySelector('#cargarPlantasNuevas')
    console.log(cargarPlantasNuevas);
    cargarPlantasNuevas.reset()
    notificacionToastify()
}

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

//* Busqueda parcial con input por nombre y familia
function busqueda(buscado, array) {
    let buscadorInput = array.filter(
            (planta) => planta.familia.toLowerCase().includes(buscado) || planta.nombre.toLowerCase().includes(buscado)
        )
    buscadorInput.length === 0 ? (coincidencia.innerHTML = `<h3>No hay resultados con su búsqueda</h3>`, listaProductos(buscadorInput)) : (coincidencia.innerHTML = '', listaProductos(buscadorInput))

}

function adjuntarProductosAlCarrito(array) {
    modal_bodyCarrito.innerHTML = ''
    
    array.forEach((planta) => {
        modal_bodyCarrito.innerHTML += `
        <div class="card border-primary mb-3 cardCarrito" id="planta${planta.indice}">
            <img src="../archivos/${planta.imagen}" class="card-img-top" height="100px" alt="${planta.nombre}">
            <div class="card-body">
                <h5 class="card-title">${planta.nombre}</h5>
                <p class="card-text">$${planta.precio}</p>
                <button class="btn btn-danger" id="btnEliminar${planta.indice}">
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                width="25px" height="25px" viewBox="0 0 512.000000 512.000000"
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
            </div>
        </div>
        `
    });
    listaProductosEliminar(array)
    compraTotal(array)
}

function listaProductosEliminar(array) {
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

function  finalizarCompra() {
    Swal.fire({
        title: '<strong>¡Muchas gracias por su compra!</strong>',
        icon: 'success',
        html:
          'Si lo desea en el siguiente enlace usted puede seguirnos en instagram y enterarse de nuestros ultimos lanzamientos ' +
          '<a href="https://www.instagram.com/mercadodelatierra/">link</a> ',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
          '<i class="fa fa-thumbs-up"></i><svg width="30px" height="30px" viewBox="0 0 1024 1024" class="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M786.197333 1002.666667H256a21.333333 21.333333 0 0 1-21.333333-21.333334V512a21.333333 21.333333 0 0 1 0.746666-5.610667l128-469.333333A21.333333 21.333333 0 0 1 384 21.333333c82.346667 0 149.333333 66.986667 149.333333 149.333334v234.666666h298.816c43.626667 0 84.928 18.986667 113.344 52.096a149.162667 149.162667 0 0 1 34.24 119.936l-45.952 298.666667A148.544 148.544 0 0 1 786.197333 1002.666667z" fill="#EAD8C5" /><path d="M234.666667 490.666667H42.666667a21.333333 21.333333 0 0 0-21.333334 21.333333v469.333333a21.333333 21.333333 0 0 0 21.333334 21.333334h192V490.666667z" fill="#444444" /></svg>',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText:
          '<i class="fa fa-thumbs-down"></i><svg width="30px" height="30px" viewBox="0 0 1024 1024" class="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M786.176 21.333333H256a21.333333 21.333333 0 0 0-21.333333 21.333334v469.333333a21.333333 21.333333 0 0 0 0.746666 5.610667l128 469.333333A21.333333 21.333333 0 0 0 384 1002.666667c82.346667 0 149.333333-66.986667 149.333333-149.333334V618.666667h298.816c43.605333 0 84.928-18.986667 113.344-52.096a149.162667 149.162667 0 0 0 34.24-119.936l-45.952-298.666667A148.544 148.544 0 0 0 786.176 21.333333z" fill="#EAD8C5" /><path d="M234.666667 533.333333H42.666667a21.333333 21.333333 0 0 1-21.333334-21.333333V42.666667a21.333333 21.333333 0 0 1 21.333334-21.333334h192v512z" fill="#444444" /></svg>',
        cancelButtonAriaLabel: 'Thumbs down'
      })
}

//! EVENTOS
guardarPlantaBtn.addEventListener('click', ()=> {
    cargarPlanta(listadoDePlantas)
})
     
inputBuscador.addEventListener('input', ()=> {
    busqueda(inputBuscador.value, listadoDePlantas)
})

selectOrden.addEventListener('change', () => {
    console.log(selectOrden.value);   
    if (selectOrden.value === '1') {
        ordenarMayorMenor(listadoDePlantas)
    } else if (selectOrden.value === '2') {
        ordenarMenorMayor(listadoDePlantas)
    } else if (selectOrden.value === '3') {
        ordenarAlfa(listadoDePlantas)
    } else {
        listaProductos(listadoDePlantas)
    }
})

btnCarrito.addEventListener('click', () => {
    adjuntarProductosAlCarrito(productosEnCarrito)
})

btnFinalizarCompra.addEventListener('click', ()=>{
    finalizarCompra()
})

//! CODIGO
listaProductos(listadoDePlantas)

