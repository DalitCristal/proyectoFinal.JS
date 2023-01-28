
//! CLASS CONSTRUCTORA
class Planta {
    constructor(indice, nombre, familia, precio){ //* Atributos
        this.indice = indice,
        this.nombre = nombre,
        this.familia = familia,
        this.precio = precio
    }
    //* Métodos
    caracteristicasPlanta(){
        console.log(`La planta se denomina ${this.nombre}, pertenece a la familia de "${this.familia}" y tiene un valor de ${this.precio}`);
    }
    agregamosIva(){
    return this.precio *1.21
    }
}

//* Instanciación
const plantA = new Planta (1, 'lechuga', 'hortalizas', 100)
const plantB = new Planta (2, 'tomate', 'hortalizas', 100)
const plantC = new Planta (3, 'alcaucil', 'hortalizas', 100)
const plantD = new Planta (4, 'berenjena', 'hortalizas', 100)
const plantE = new Planta (5, 'pimiento rojo', 'hortalizas', 100)
const plantF = new Planta (6, 'zanahoria', 'hortalizas', 100)
const plantG = new Planta (7, 'romero', 'aromaticas', 300)
const plantH = new Planta (8, 'albahaca', 'aromaticas', 300)
const plantI = new Planta (9, 'lavanda', 'aromaticas', 300)
const plantJ = new Planta (10, 'salvia', 'aromaticas', 300)
const plantK = new Planta (11, 'tomillo', 'aromaticas', 300)
const plantL = new Planta (12, 'incienso', 'aromaticas', 300)
const plantM = new Planta (13, 'menta', 'aromaticas', 300)
const plantN = new Planta (14, 'cedron', 'aromaticas', 300)
const plantO = new Planta (15, 'oregano', 'aromaticas', 300)
const plantP = new Planta (16, 'rosa del desierto', 'suculentas', 400)
const plantQ = new Planta (17, 'oreja de shrek', 'suculentas', 400)
const plantR = new Planta (18, 'cactus piedra', 'suculentas', 400)
const plantS = new Planta (19, 'cola de burro ', 'suculentas', 400)
const plantT = new Planta (20, 'rosario', 'suculentas', 400)
const plantU = new Planta (21, 'kalanchoe tomentosa', 'suculentas', 400)
const plantV = new Planta (22, 'castello', 'suculentas', 400)
const plantW = new Planta (23, 'arbol de jade', 'suculentas', 400)
const plantX = new Planta (24, 'perforata', 'suculentas', 400)

//! ARRAY
// Crear array de objetos:
const listadoDePlantas = []
listadoDePlantas.push(plantA, plantB, plantC, plantD, plantE, plantF, plantG, plantH, plantI, plantJ, plantK, plantL, plantM, plantN, plantO, plantP, plantQ, plantR, plantS, plantT, plantU, plantV, plantW, plantX)

//! FUNCTIONS

function administrador() {
let contraUsser = prompt('Ingrese la contraseña para poder cargar productos')    
    let contra = 'admin'
    if (contraUsser === contra) {
        console.log('Puede cargar producto, contraseña CORRECTA!');
        cargarProducto(listadoDePlantas)
    } else if(contraUsser !== contra) {
        for (let i = 1; i < 3; i++) {
            contraUsser = prompt(`
            TIENE 3 INTENTOS:
            ${i} Ingrese la contraseña para poder cargar productos`)

            if (contraUsser === contra) {
                cargarProducto(listadoDePlantas)
            } else {
                console.log('LO SENTIMOS, ESTA AREA ES UNICAMENTE PARA ADMINISTRADORES DEL SITIO');
            } 
        }
    } else {
        console.log(`CONTRASEÑA INCORRECTA! 
        LO SENTIMOS, ESTA AREA ES UNICAMENTE PARA ADMINISTRADORES DEL SITIO`);
    }
}

function cargarProducto(array) {
    let nombreIngresado = prompt('Ingrese el nombre de la planta').toLowerCase()
    //validamos que la carga de producto tenga el nombre correctamente
    while (!isNaN(nombreIngresado)) {
        nombreIngresado = prompt('Ingrese CORRECTAMENTE el nombre de la planta').toLowerCase()
    }

    let familiaIngresada = prompt(`Ingrese la familia a la que pertenece "${nombreIngresado}"`).toLowerCase()
    //VALIDACION STRING
    while (!isNaN(familiaIngresada)) {
        familiaIngresada = prompt(`Ingrese la familia CORRECTAMENTE`).toLowerCase()
    }
    // validacion number
    let precioIngresado = parseInt(prompt(`Ingrese el valor del plantín de ${nombreIngresado}`))
    while (isNaN(precioIngresado)) {
        precioIngresado = parseInt(prompt(`Ingrese el valor del plantín CORRECTAMENTE`))
    }

    // Hacerlo con la fn constructora
    const nuevaPlanta = new Planta(array.length+1, nombreIngresado, familiaIngresada, precioIngresado)
    console.log(nuevaPlanta);
    console.log(`El precio con iva de ${nuevaPlanta.nombre} es de $${nuevaPlanta.agregamosIva()}`);
    // Pushearlo al array
    array.push(nuevaPlanta)
    listaProductosForEach(array)
}

/*
function listaProductos(listadoDePlantas) {
    console.log('Las plantas que tenemos disponibles son:');
    // Recorrer array listadoDePlantas
    for (const e of listadoDePlantas) {
        console.log(e.indice, e.nombre, e.familia, e.precio);
    }
}
*/

function listaProductosForEach(arr) {
    console.log(`Nuestro catalogo:`);
    arr.forEach(
        (planta)=>{
            console.log(`${planta.indice} - ${planta.nombre} de la familia ${planta.familia} y vale ${planta.precio}`);
        }
    )
}

//* Método find() busca hasta encontrar coincidencia
function buscarPorNombre(array) {
    let nombreBuscado = prompt('Ingrese el nombre de la planta que desea buscar')
    let nombreEncontrado = array.find(
        (p) => p.nombre.toLowerCase() == nombreBuscado.toLowerCase() 
    )

    if (nombreEncontrado === undefined) {
        console.log(`${nombreBuscado} no se encuentra en nuestro stock`);
    } else {
        console.log(nombreEncontrado);
    }
}

//* Filter() retorna un array
function buscarPorFamilia(arr) {
    let familiaBuscada = prompt('Ingrese la familia a la que pertenece la especie que busca')
    let busqueda = arr.filter(
        (planta) => planta.familia.toLowerCase() == familiaBuscada.toLowerCase()
    )
    
    if (busqueda.length === 0) {
        console.log(`No se encontro "${familiaBuscada}" en nuestro stock`);
    } else {
        listaProductosForEach(busqueda)
    }
}
 
//* Sort() método destructivo
//? Menor a mayor
function OrdenarMenorMayor(array) {
    const menorMayor = [].concat(array) // hacemos una copia del original, para no modificarlo
    menorMayor.sort((a, b) => a.precio - b.precio)
    listaProductosForEach(menorMayor)
}

//? Mayor a menor
function OrdenarMayorMenor(array) {
    const mayorMenor = [].concat(array)
    mayorMenor.sort((c, d) => d.precio - c.precio)
    listaProductosForEach(mayorMenor)
}

//? Ordenar alfabeticamente
function ordenarAlfa(array) {
    const ordenadoAlfa = [].concat(array)
    // a-z
    ordenadoAlfa.sort((a, b) => {
        if (a.nombre > b.nombre) {
            return 1
        }
        if (a.nombre < b.nombre) {
            return -1
        }
        return 0 // e es igual f
    })
    listaProductosForEach(ordenadoAlfa)
}
//console.log(ordenarAlfa(listadoDePlantas));

// Preguntarle al usuario de que manera quiere ordenar
function ordenar(array) {
    let o = parseInt(prompt(`
    1 - Ordenar de menor a mayor:
    2 - Ordenar de mayor a menor:
    3 - Ordenar alfabeticamente por nombre:
    `))
    switch (o) {
        case 1:
            OrdenarMenorMayor(array)
            break;
        case 2:
            OrdenarMayorMenor(listadoDePlantas)
            break;
        case 3:
            ordenarAlfa(array)
            break;
        default:
            console.log(`${o} no es válido para ordenar`);
            break;
    }
}

// Function borrar planta
function borrarPlanta(array) {
    console.log(`¿Que indice desea eliminar?`);
    for (const i of array) {
        console.log(`${i.indice} - ${i.nombre} de la familia ${i.familia}`);
    }
    let idEliminar = Number(prompt('Ingrese el indice a eliminar'))
    //Validacion de number
    while (isNaN(idEliminar)) {
        idEliminar = Number(prompt('Ingrese el indice a eliminar CORRECTAMENTE'))
    }

    //map() copia un array solo con lo que le diga
    let arrayIndice = (array.map(planta => planta.indice))

    //indexOf() para averiguar la posicion del elemento que queremos
    let localizacion = arrayIndice.indexOf(idEliminar)

    return localizacion

}

// la function deleteOk() le pregunta al usuario si esta seguro antes de concretar la eliminacion del producto 
function deleteOk(fn) {
    let ask = prompt(`¿Usted esta seguro que desea eliminar definitivamente ${fn}? "si" o "no"`).toLowerCase()

    if (ask === 'si') {
        //Splice() para una vez localizado, borrarlo
        listadoDePlantas.splice(fn, 1)
        listaProductosForEach(listadoDePlantas)
    } else if (ask === 'no') {
        console.log(`${fn} no ha sido eliminado. Gracias!`);
    } else {
        console.log('Usted ha ingresado caracteres incorrectos');
    }
}

// Function menu, se encarga de cortar o no la condicion del menu (case: '0')
function menu() {
    let salirMenu = false
    do {
        salirMenu = preguntarOpcion(salirMenu)
    } while (!salirMenu);
}

function preguntarOpcion(salir) {
    let opcionMenu = prompt(`Ingrese la opcion deseada:
    1 - Agregar planta
    2 - Borrar planta
    3 - Consultar stock
    4 - Encontrar planta por nombre
    5 - Buscar plantas por familia
    6 - Ordenar plantas
    0 - Salir del menu 
    `)

    switch (opcionMenu) {
        case '1':
            console.log(`Bienvenido al Inicio!`);
            administrador()
        break;
        case '2':
            deleteOk(borrarPlanta(listadoDePlantas))
            //borrarPlanta(listadoDePlantas)
        break;
        case '3':
            listaProductosForEach(listadoDePlantas)
        break;
        case '4':
            buscarPorNombre(listadoDePlantas)
        break
        case '5':
            buscarPorFamilia(listadoDePlantas)
        break
        case '6':
            ordenar(listadoDePlantas)
        break
        case '0':
            console.log('Gracias por utilizar nuestra app');
            salir = true
        return salir
        default:
            console.log('Opcion no valida');
        break;
    }
}
menu()