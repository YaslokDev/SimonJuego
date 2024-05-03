// Obtener elementos del HTML
const valorContador = document.getElementById("contador");
const porciones = document.querySelectorAll(".porcion");
const container = document.querySelector(".container");
const btnIniciar = document.querySelector("#iniciar");
const resultado = document.querySelector("#resultado");
const panel = document.querySelector(".panel");
const sonidoClick = document.getElementById("sonidoClick");
const sonidoError = document.getElementById("sonidoError");
const contenedor = document.querySelector(".interfaz");

// Objeto que contiene los colores y sus valores
const colores = {
  color1: {
    actual: "rgba(0,128,0,0.5)",
    nuevo: "rgb(0,128,0)",
  },
  color2: {
    actual: "rgba(255, 0, 0, 0.5)",
    nuevo: "rgb(255,0,0)",
  },
  color3: {
    actual: "rgba(0, 0, 255, 0.5)",
    nuevo: "rgb(0,0,255)",
  },
  color4: {
    actual: "rgba(255, 255, 0, 0.5)",
    nuevo: "rgb(255,255,0)",
  },
};

// Array para almacenar los colores aleatorios
let coloresAleatorios = [];
// Bandera para activar la generación de la secuencia
let activarGenerarSecuencia = false;
// Contador de la secuencia
let contador = 0;
// Contador de los clicks del usuario
let contadorClick = 0;

// Agrega un evento de clic al botón "iniciar"
btnIniciar.addEventListener("click", iniciarJuego);

// Agrega un evento de clic a cada porción
porciones.forEach((porcion) => {
  porcion.addEventListener("click", manejarClick);
});

// Función para iniciar el juego
async function iniciarJuego() {
  // Reinicia los contadores
  contador = 0;
  contadorClick = 0;
  coloresAleatorios = [];
  activarGenerarSecuencia = false;
  // Muestra el panel y oculta el contenedor
  panel.classList.remove("ocultar");
  container.classList.add("ocultar");
  // Genera la secuencia
  await generarSecuencia();
}

// Función para generar la secuencia de colores
async function generarSecuencia() {
  // Agrega un color aleatorio a la secuencia
  coloresAleatorios.push(generarColorAleatorio(colores));
  contador = coloresAleatorios.length;
  activarGenerarSecuencia = true;
  // Muestra la secuencia
  await mostrarSecuencia(contador);
}

// Función para generar un color aleatorio
function generarColorAleatorio(obj) {
  const colores = Object.keys(obj);
  return colores[Math.floor(Math.random() * colores.length)];
}

// Función para mostrar la secuencia de colores
async function mostrarSecuencia(contador) {
  // Actualiza el valor del contador
  valorContador.innerText = contador;
  // Reduce la opacidad de las porciones
  intercambiarOpacidad(0.5);
  // Recorre la secuencia y muestra cada color
  for (let color of coloresAleatorios) {
    const colorActual = document.querySelector(`.${color}`);
    await retraso(500);
    colorActual.style.backgroundColor = `${colores[color]["nuevo"]}`;
    await retraso(600);
    colorActual.style.backgroundColor = `${colores[color]["actual"]}`;
    await retraso(600);
  }
  // Restaura la opacidad de las porciones
  intercambiarOpacidad(1);
  activarGenerarSecuencia = false;
}

// Función para manejar los clicks del usuario
async function manejarClick(e) {
  // Si se está generando la secuencia, no se permite hacer clic
  if (activarGenerarSecuencia) {
    return false;
  }
  // Obtiene el color del elemento clickeado
  const colorClickeado = e.target.classList[0];
  // Verifica si el color clickeado es el correcto
  if (colorClickeado === coloresAleatorios[contadorClick]) {
    // Cambia el color del elemento clickeado
    e.target.style.backgroundColor = `${colores[colorClickeado]["nuevo"]}`;
    clickSonido();
    await retraso(500);
    e.target.style.backgroundColor = `${colores[colorClickeado]["actual"]}`;
    contadorClick += 1;
    // Si se completó la secuencia, genera una nueva
    if (contadorClick === contador) {
      contadorClick = 0;
      await generarSecuencia();
    }
  } else {
    // Si el color clickeado es incorrecto, se reproduce el sonido de error y se termina el juego
    errorSonido();
    await gameOver();
  }
}

// Función para terminar el juego
async function gameOver() {
  // Muestra el resultado
  resultado.innerHTML = `<span> Tu Puntuación: </span>${contador}`;
  resultado.classList.remove("ocultar");
  container.classList.remove("ocultar");
  panel.classList.add("ocultar");
  btnIniciar.innerText = "Jugar otra vez";
  btnIniciar.classList.remove("ocultar");
  destelloInterfaz();
}

// Función para reproducir el sonido de clic
function clickSonido() {
  sonidoClick.currentTime = 0;
  sonidoClick.play();
}

// Función para reproducir el sonido de error
function errorSonido() {
  sonidoError.currentTime = 0;
  sonidoError.play();
}

// Función para intercambiar la opacidad de las porciones
function intercambiarOpacidad(opacidad) {
  porciones.forEach((porcion) => {
    porcion.style.opacity = opacidad;
  });
}

// Función para destellar la interfaz
function destelloInterfaz() {
  contenedor.classList.add("destello");
  setTimeout(() => {
    contenedor.classList.remove("destello");
  }, 1000);
}

// Función para crear un retraso asíncrono
async function retraso(tiempo) {
  return await new Promise((resolver) => {
    setTimeout(resolver, tiempo);
  });
}
