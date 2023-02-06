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
// Crear array de objetos:
let listadoDePlantas = []
//condicional, evalua si hay algo en el storage
if (localStorage.getItem('listadoDePlantas')) {
    //si existe
    listadoDePlantas = JSON.parse(localStorage.getItem('listadoDePlantas'))
} else {
    console.log('Esta es la 1ra vez');
    //si no existe
    listadoDePlantas.push(plantA, plantB, plantC, plantD, plantE, plantF, plantG, plantH, plantI, plantJ, plantK, plantL, plantM, plantN, plantO, plantP, plantQ, plantR, plantS, plantT, plantU, plantV, plantW, plantX)
    localStorage.setItem('listadoDePlantas', JSON.stringify(listadoDePlantas))
}
console.log(listadoDePlantas);
