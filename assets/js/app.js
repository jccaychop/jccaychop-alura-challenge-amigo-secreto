// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

// Array que almacenará la lista de amigos a sortear
let amigos = [];

// Capturar el valor del campo de entrada
let input = document.querySelector('#amigo');

let listaAmigos = document.querySelector('#listaAmigos');
let buttonDraw = document.querySelector('.button-draw');
let buttonReset = document.querySelector('.button-reset');
let resultado = document.querySelector('#resultado');

// Array que almacenará la lista de amigos que ya salieron sorteados
let amigosSorteados = [];

// validacion que solo recibe texto, tildes, letra ñ, Ñ y hasta 5 palabras separadas.
// no acepta nombres de solo espacios en blanco, ni mas de un espacio en blanco entre palabras
const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:\s[A-Za-zÁÉÍÓÚáéíóúÑñ]+){0,4}$/;

function agregarAmigo() {
  let nombre = input.value;

  if (!regex.test(nombre)) {
    alert('Por favor, inserte un nombre válido');
    return;
  }

  if (esNombreRepetido(nombre)) {
    alert('El nombre ya se encuentra en la lista');
    return;
  }

  amigos.push(input.value);

  limpiarCaja();
  recorreListaAmigos();
  habilitarBotones();
}

function esNombreRepetido(nombre) {
  return amigos.includes(nombre);
}

function habilitarBotones() {
  buttonDraw.removeAttribute('disabled');
  buttonReset.removeAttribute('disabled');
}

function deshabilitarBotones() {
  buttonDraw.setAttribute('disabled', true);
  buttonReset.setAttribute('disabled', true);
}

function limpiarCaja() {
  let valorCaja = document.querySelector('#amigo');
  valorCaja.value = '';
}

function recorreListaAmigos() {
  listaAmigos.innerHTML = '';
  let ulTemporal = new DocumentFragment();

  for (let index = 0; index < amigos.length; index++) {
    let li = document.createElement('li');
    li.innerText = amigos[index];

    if (amigosSorteados.includes(index)) {
      li.classList.remove('elegible');
      li.classList.add('elegido');
    } else {
      li.classList.add('elegible');
    }
    ulTemporal.appendChild(li);
  }

  listaAmigos.appendChild(ulTemporal);
}

function sortearAmigo() {
  resultado.innerHTML = '';

  // verificamos que la lista de amigos no esté vacía
  if (amigos.length === 0) {
    alert('Lista de amigos vacía');
    return;
  }

  if (amigos.length === amigosSorteados.length) {
    buttonDraw.setAttribute('disabled', true);
    alert('Todos los nombres fueron sorteados');
    return;
  }

  let index = Math.floor(Math.random() * amigos.length);

  if (amigosSorteados.includes(index)) {
    sortearAmigo();
  } else {
    amigosSorteados.push(index);
    recorreListaAmigos();
    resultado.innerHTML = `<li>El amigo secreto sorteado es: <span>${amigos[index]}</span></li>`;
  }
}

function reset() {
  amigos = [];
  listaAmigos.innerHTML = '';
  amigosSorteados = [];
  resultado.innerHTML = '';
  deshabilitarBotones();
}

deshabilitarBotones();
