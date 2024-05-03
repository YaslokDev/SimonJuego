const valorContador = document.getElementById("contador");
const porciones = document.querySelectorAll(".porcion");
const container = document.querySelector(".container");
const btnIniciar = document.querySelector("#iniciar");
const resultado = document.querySelector("#resultado");
const panel = document.querySelector(".panel");
const sonidoClick = document.getElementById("sonidoClick");
const sonidoError = document.getElementById("sonidoError");
const contenedor = document.querySelector(".interfaz");

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

let coloresAleatorios = [];
let activarGenerarSecuencia = false;
let contador = 0;
let contadorClick = 0;

btnIniciar.addEventListener("click", iniciarJuego);

porciones.forEach((porcion) => {
  porcion.addEventListener("click", manejarClick);
});

async function iniciarJuego() {
  contador = 0;
  contadorClick = 0;
  coloresAleatorios = [];
  activarGenerarSecuencia = false;
  panel.classList.remove("ocultar");
  container.classList.add("ocultar");
  await generarSecuencia();
}

async function generarSecuencia() {
  coloresAleatorios.push(generarColorAleatorio(colores));
  contador = coloresAleatorios.length;
  activarGenerarSecuencia = true;
  await mostrarSecuencia(contador);
}

function generarColorAleatorio(obj) {
  const colores = Object.keys(obj);
  return colores[Math.floor(Math.random() * colores.length)];
}

async function mostrarSecuencia(contador) {
  valorContador.innerText = contador;
  intercambiarOpacidad(0.5);
  for (let color of coloresAleatorios) {
    const colorActual = document.querySelector(`.${color}`);
    await retraso(500);
    colorActual.style.backgroundColor = `${colores[color]["nuevo"]}`;
    await retraso(600);
    colorActual.style.backgroundColor = `${colores[color]["actual"]}`;
    await retraso(600);
  }
  intercambiarOpacidad(1);
  activarGenerarSecuencia = false;
}

async function manejarClick(e) {
  if (activarGenerarSecuencia) {
    return false;
  }
  const colorClickeado = e.target.classList[0];
  if (colorClickeado === coloresAleatorios[contadorClick]) {
    e.target.style.backgroundColor = `${colores[colorClickeado]["nuevo"]}`;
    clickSonido();
    await retraso(500);
    e.target.style.backgroundColor = `${colores[colorClickeado]["actual"]}`;
    contadorClick += 1;
    if (contadorClick === contador) {
      contadorClick = 0;
      await generarSecuencia();
    }
  } else {
    errorSonido();
    await gameOver();
  }
}

async function gameOver() {
  resultado.innerHTML = `<span> Tu Puntuación: </span>${contador}`;
  resultado.classList.remove("ocultar");
  container.classList.remove("ocultar");
  panel.classList.add("ocultar");
  btnIniciar.innerText = "Jugar otra vez";
  btnIniciar.classList.remove("ocultar");
  destelloInterfaz();
}

function clickSonido() {
  sonidoClick.currentTime = 0;
  sonidoClick.play();
}

function errorSonido() {
  sonidoError.currentTime = 0;
  sonidoError.play();
}

function intercambiarOpacidad(opacidad) {
  porciones.forEach((porcion) => {
    porcion.style.opacity = opacidad;
  });
}

function destelloInterfaz() {
  contenedor.classList.add("destello");
  setTimeout(() => {
    contenedor.classList.remove("destello");
  }, 1000);
}

async function retraso(tiempo) {
  return await new Promise((resolver) => {
    setTimeout(resolver, tiempo);
  });
}
