//* APLICANDO DOM

let divPlants = document.querySelector('#plants')
let guardarPlantaBtn = document.getElementById('formBtn')
let inputBuscador = document.getElementById('buscador')
/* let ocultarStock = document.querySelector('#nosotros')
let verStock = document.querySelector('#nosotros') */
let coincidencia = document.querySelector('#coincidencia')
let selectOrden = document.querySelector('#selectOrden')
let modal_bodyCarrito = document.querySelector('#modal_bodyCarrito')
let btnCarrito = document.querySelector('#btnCarrito')

//! CONDICIONALES
let productosEnCarrito

if (localStorage.getItem('carrito')) {
    productosEnCarrito = JSON.parse(localStorage.getItem('carrito'))
} else {
    productosEnCarrito = []
    localStorage.setItem('carrito', productosEnCarrito)
}

//! FUNCTIONS
function listaProductos(array) {
    //resetear asi no se imprime mas de una vez
    divPlants.innerHTML = ''

    for (const p of array) {
        let newPlantDiv = document.createElement('div') 
    
        newPlantDiv.className = "col-12 col-md-6 col-lg-4"
        newPlantDiv.innerHTML = `
        <div id="${p.indice}" class="card" style="width: 18rem;">
            <img src="../archivos/${p.imagen}" class="card-img-top img-fluid" alt="${p.nombre}">
            <div class="card-body">
                <h5 class="card-title">${p.nombre}</h5>
                <p class="card-text">Familia: ${p.familia}</p>
                <p class="card-text">Precio: ${p.precio}</p>
                <a id="agregarBtn${p.indice}" class="btn btn-primary">Agregar al carrito</a>
            </div>
        </div>
        `
        divPlants.appendChild(newPlantDiv)
        let agregarBtn = document.getElementById(`agregarBtn${p.indice}`)

        agregarBtn.onclick = ()=>{
            agregarAlCarrito(p)
        }
    } 
}

function adjuntarProductosCarrito(array) {
    console.log('funciona btn ccarrito');
    array.forEach(elementCarrito => {
        console.log(elementCarrito.nombre);
        modal_bodyCarrito.innerHTML = `
        <div class="card border-primary mb-3" id="elementCarrito${elementCarrito.id}" style="max-width: 540px;">
            <img src="../archivos/${elementCarrito.imagen}" class="card-img-top" height="300px" alt="${elementCarrito.nombre}">
            <div class="card-body">
                <h5 class="card-title">${elementCarrito.nombre}</h5>
                <p class="card-text">${elementCarrito.precio}</p>
                <button class="btn btn-danger" id="btnEliminar${elementCarrito.id}"><i class="fas fa-trash-alt"></i></button>
            </div>
        </div>
        `
    });
}

function agregarAlCarrito(planta) {
    console.log(`La planta ${planta.nombre} ha sido agregada al carrito, tiene un valor de $${planta.precio}`);
    productosEnCarrito.push(planta) //sumarlo al array productos en carrito
    console.log(productosEnCarrito);
    localStorage.setItem('carrito', JSON.stringify(productosEnCarrito)) // setear el array en storage
}

function cargarPlanta(array) {
    let inputNombre = document.getElementById('nombreInput')
    let inputFamilia = document.getElementById('familiaInput')
    let inputPrecio = document.getElementById('precioInput')
    
    // Hacerlo con la fn constructora
    const nuevaPlanta = new Planta(array.length+1, inputNombre.value, inputFamilia.value, Number(inputPrecio.value), 'planta_new.jpg')
    console.log(nuevaPlanta);
    //console.log(`El precio con iva de ${nuevaPlanta.nombre} es de $${nuevaPlanta.agregamosIva()}`);

    array.push(nuevaPlanta)
    //guardarlo en storage
    localStorage.setItem('listadoDePlantas', JSON.stringify(array))
    listaProductos(array)
    let cargarPlantasNuevas = document.querySelector('#cargarPlantasNuevas')
    console.log(cargarPlantasNuevas);
    cargarPlantasNuevas.reset()

}
//Busqueda parcial con input por nombre y familia
function busqueda(buscado, array) {
    let buscadorInput = array.filter(
            (planta) => planta.familia.toLowerCase().includes(buscado) || planta.nombre.toLowerCase().includes(buscado)
        )
    if (buscadorInput.length === 0) {
        coincidencia.innerHTML = `<h3> No hay coincidencia con su búsqueda</h3>`
        listaProductos(buscadorInput)
    } else {
        coincidencia.innerHTML = ''
        listaProductos(buscadorInput)
    }
}

// Menor a mayor
function ordenarMenorMayor(array) {
    const menorMayor = [].concat(array) // hacemos una copia del original, para no modificarlo
    menorMayor.sort((a, b) => a.precio - b.precio)
    listaProductos(menorMayor)
}

// Mayor a menor
function ordenarMayorMenor(array) {
    const mayorMenor = [].concat(array)
    mayorMenor.sort((c, d) => d.precio - c.precio)
    listaProductos(mayorMenor)
}

// Ordenar alfabeticamente
function ordenarAlfa(array) {
    const ordenadoAlfa = [].concat(array)
    ordenadoAlfa.sort((a, b) => {
        if (a.nombre > b.nombre) {
            return 1
        }
        if (a.nombre < b.nombre) {
            return -1
        }
        return 0
    })
    listaProductos(ordenadoAlfa)
}

//! EVENTOS
guardarPlantaBtn.addEventListener('click', ()=> {
    cargarPlanta(listadoDePlantas)
})

/* verStock.onclick = ()=>{
    listaProductos(listadoDePlantas)
}

ocultarStock.ondblclick = ()=>{
    divPlants.innerHTML = ''
} */
     
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
    adjuntarProductosCarrito(productosEnCarrito)
})

//! CODIGO
listaProductos(listadoDePlantas)

/* 
localStorage.setItem('firstPlanta', JSON.stringify(plantA))
localStorage.setItem('listPlanta', JSON.stringify(listadoDePlantas))

console.log(JSON.parse(localStorage.getItem('firstPlanta')));
console.log(JSON.parse(localStorage.getItem('listPlanta'))); 
*/
