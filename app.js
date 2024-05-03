const valorContador = document.getElementById("contador");
const porcion = document.querySelectorAll(".porcion");
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
let contador,
  contadorClick = 0;

btnIniciar.addEventListener("click", () => {
  contador = 0;
  contadorClick = 0;
  coloresAleatorios = [];
  activarGenerarSecuencia = false;
  panel.classList.remove("ocultar");
  container.classList.add("ocultar");
  generarSecuencia();
});

const generarSecuencia = () => {
  coloresAleatorios.push(generarValorAleatorio(colores));
  contador = coloresAleatorios.length;
  activarGenerarSecuencia = true;
  secuenciaElegida(contador);
};

const generarValorAleatorio = (obj) => {
  let array = Object.keys(obj);
  return array[Math.floor(Math.random() * array.length)];
};

const secuenciaElegida = async (contador) => {
  valorContador.innerText = contador;
  intercambiarOpacidad(0.5);
  for (let i of coloresAleatorios) {
    let colorActual = document.querySelector(`.${i}`);
    await retraso(500);
    colorActual.style.backgroundColor = `${colores[i]["nuevo"]}`;
    await retraso(600);
    colorActual.style.backgroundColor = `${colores[i]["actual"]}`;
    await retraso(600);
  }
  intercambiarOpacidad(1);
  activarGenerarSecuencia = false;
};

async function retraso(tiempo) {
  return await new Promise((resolver) => {
    setTimeout(resolver, tiempo);
  });
}

porcion.forEach((element) => {
  element.addEventListener("click", async (e) => {
    porcion.blur();
    if (activarGenerarSecuencia) {
      return false;
    }
    if (e.target.classList[0] == coloresAleatorios[contadorClick]) {
      e.target.style.backgroundColor = `${colores[coloresAleatorios[contadorClick]]["nuevo"]}`;
      clickSonido();
      await retraso(500);
      e.target.style.backgroundColor = `${colores[coloresAleatorios[contadorClick]]["actual"]}`;
      contadorClick += 1;
      if (contadorClick == contador) {
        contadorClick = 0;
        generarSecuencia();
      }
    } else {
      errorSonido();
      gameOver();
    }
  });
});

const gameOver = () => {
  resultado.innerHTML = `<span> Tu Puntuación: </span>${contador}`;
  resultado.classList.remove("ocultar");
  container.classList.remove("ocultar");
  panel.classList.add("ocultar");
  btnIniciar.innerText = "Jugar otra vez";
  btnIniciar.classList.remove("ocultar");
};

const clickSonido = () => {
  sonidoClick.currentTime = 0;
  sonidoClick.play();
};

const errorSonido = () => {
  sonidoError.currentTime = 0;
  sonidoError.play();
};

const intercambiarOpacidad = (opacidad) => {
  porcion.forEach((element) => {
    element.style.opacity = opacidad;
  });
};

const destelloInterfaz = () => {
  contenedor.classList.add("destello");
  setTimeout(() => {
    contenedor.classList.remove("destello");
  }, 1000);
};
