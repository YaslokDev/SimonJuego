const valorContador = document.getElementById("contador");
const porcion = document.querySelectorAll(".porcion");
const container = document.querySelector(".container");
const btnIniciar = document.querySelector("#iniciar");
const resultado = document.querySelector("#resultado");
const panel = document.querySelector(".panel");

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
  for (let i of coloresAleatorios) {
    let colorActual = document.querySelector(`.${i}`);
    await retraso(500);
    colorActual.style.backgroundColor = `${colores[i]["nuevo"]}`;
    await retraso(600);
    colorActual.style.backgroundColor = `${colores[i]["actual"]}`;
    await retraso(600);
  }
  activarGenerarSecuencia = false;
};

async function retraso(tiempo) {
  return await new Promise((resolver) => {
    setTimeout(resolver, tiempo);
  });
}

porcion.forEach((element) => {
  element.addEventListener("click", async (e) => {
    console.log("CLICK");
    if (activarGenerarSecuencia) {
      return false;
    }
    if (e.target.classList[0] == coloresAleatorios[contadorClick]) {
      e.target.style.backgroundColor = `${colores[coloresAleatorios[contadorClick]]["nuevo"]}`;
      await retraso(500);
      e.target.style.backgroundColor = `${colores[coloresAleatorios[contadorClick]]["actual"]}`;
      contadorClick += 1;
      if (contadorClick == contador) {
        contadorClick = 0;
        generarSecuencia();
      }
    } else {
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