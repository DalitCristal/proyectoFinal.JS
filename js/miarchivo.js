
// The function validacion() le pasa como parametro un string validado a la function inicio()
function validacion(string) {
    if (!string) {
        console.log(`"${acumularInfo}" no es un carácter valido`);
    } else if (string === 'redes' || string === 'redes sociales' || string === 'recomendacion') {
        console.log(`Gracias! saber que usted se conecto con nosotros a través de "${acumularInfo}", nos permite seguir brindando un mejor servicio`); 
        nosotros()
    } else if (string === 'otro'){
        let otroLlegada = prompt(`Por favor, nos especificaria por donde conecto con nosotros`)
        console.log(`Gracias! saber que usted se conecto con nosotros a través de "${otroLlegada}", nos permite seguir brindando un mejor servicio`); 
    }
    return string
}

// Functon inicio() se encarga de guiar al cliente hacia su compra deseada en caso de que si conozca plantisfulsoul y en caso de que no, guarda informacion para saber como llegan los clientes al vivero y luego los invita a la "seccion nosotros" para que nos conozcan
let acumularInfo = ''
const inicio = () => {
    let ask = prompt(`¿Ya nos conocias?
    Responde por si o no`).toLowerCase()
    if (ask === 'si') {
        console.log(`Muy felices de que vuelvas! 
        ahora..`);
        return seccionTienda(numTienda())
    } else if (ask === 'no') {
        acumularInfo = prompt(`¿Cómo nos conoció? redes sociales, recomendacion u otro?`).toLowerCase()
        validacion(acumularInfo)
    } else {
        console.log(`El caracter ingresado: "${ask}" no es valido`);
    }
}

// function nosotros() dirige al cliente hacia la seccion "Nosotros"
function nosotros() {
    console.log(`Bienvenido a la seccion donde te contaremos sobre Nosotros!`);
}

// The function numTienda() le pasa el parametro a function seccionTienda()
let numTienda = () => {
    let a = Number(prompt(`¿QUÉ AREA DESEA INSPECCIONAR?
    5 - Hortalizas
    6 - Aromáticas
    7 - Cactus y crazas
    `))
    return a
}
// function pregunta() le pasa el parametro de la seccion hortalizas a la function compra()
function preguntaHort() {
    let preg = prompt(`¿Que planta le gustaria comprar?
    lechuga
    tomate
    alcaucil
    berenjena 
    pimiento
    zanahoria
    `).toLowerCase()
    return preg
}

// function preguntaAroma() le pasa el parametro de la seccion aromaticas a la function compra()
function preguntaAroma() {
    let preg = prompt(`¿Que planta le gustaria comprar?
    romero
    albahaca
    lavanda
    salvia 
    tomillo
    incienso
    menta
    cedron
    oregano
    `).toLowerCase()
    return preg
}

// function preguntaCactus() le pasa el parametro de la seccion cactus  crazas a la function compra()
function preguntaCactus() {
    let preg = prompt(`¿Que planta le gustaria comprar?
    rosa del desierto
    oreja de shrek
    cactus piedra
    cola de burro 
    rosario
    kalanchoe tomentosa
    castello
    arbol de jade
    perforata
    `).toLowerCase()
    return preg
}

// function compra() se esncarga de mostrarle al usuario la lista de productos y preguntarle cual quiere
const compra = (planta) => {
    let n, precioI, suma
    
    if (!(isNaN(planta))) {
        console.log(`No ha ingresado caracteres correcto`);
        return `No ha ingresado caracteres correctos`
    } else if (planta === 'lechuga' || planta === 'tomate' || planta === 'alcaucil' || planta === 'berenjena' || planta === 'pimiento' || planta === 'zanahoria' || planta === 'romero' || planta === 'albahaca' || planta === 'lavanda' || planta === 'salvia' || planta === 'tomillo' || planta === 'incienso' || planta === 'menta' || planta === 'cedron' || planta === 'oregano' || planta === 'rosa del desierto' || planta === 'oreja de shrek' || planta === 'cactus piedra' || planta === 'cola de burro' || planta === 'rosario' || planta === 'kalanchoe tomentosa' || planta === 'castello' || planta === 'arbol de jade' || planta === 'perforata'){
        n = Number(prompt(`Que cantidad de plantines de ${planta} quieres?`)) 
        while (isNaN(n)) {
            n = Number(prompt(`DATO MAL INGRESADO!  Ingrese nuevamente la cantidad de plantines que desee?
            Por favor ingrese un NÚMERO`)) 
        }
        

        precioI = 100    
        suma = precioI*n
        console.log(`Usted quiere ${n} plantines de ${planta}, cada uno vale $${precioI}
        El total es de $${suma}
        Muchas gracias por su compra!`);
       
    } else {
        console.log(`Disculpe, no tenemos por el momento este tipo de producto`);
    }
}

// La funcion seccionTienda() es para el boton "tienda" que desplegara un submenu hacia los diferentes sectores de la tienda, recibe como parametro un numero el cual lo llevara hacia dicha zona
const seccionTienda = b => {
    if (!b) { //? VALIDACION: si es o no un numero
        console.log(`Usted no ha ingresado un número`);
    } else if (b === 5) {
        console.log('Hortalizas!');
        compra(preguntaHort())
    } else if (b === 6) {
        console.log(`Aromáticas!`);
        compra(preguntaAroma())
    } else if (b === 7) {
        console.log(`Cactus y crazas!`);
        compra(preguntaCactus())
    } else {
        console.log(`No ha ingresado, ninguna de las opciones del menú`); //? VALIDACION: cuando no coloca los numeros requeridos
    }
    return b
}

// Menu = Bucle que contiene un condicional
let salirMenu = true
do {
    let opcionMenu = prompt(`Ingrese la opcion deseada:
    1 - Inicio
    2 - Nosotros
    3 - Tienda
    0 - Salir del menu 
    `)

    switch (opcionMenu) {
        case '1':
            console.log(`Bienvenido al Inicio!`);
            inicio()
        break;
        case '2':
            nosotros()
        break;
        case '3':
            console.log('Bienvenido a nuestra tienda!');
            seccionTienda(numTienda())
        break;
        case '0':
            console.log('Salir del menu');
            salirMenu = false
        break;
        default:
            console.log('Opcion no valida');
        break;
    }
} while (salirMenu);