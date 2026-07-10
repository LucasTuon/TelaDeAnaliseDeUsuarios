const nome = "Lucas";       // valor que não muda
let idade = 22;              // valor que pode mudar
idade = 23;

function somar(a, b) {       // função tradicional
  return a + b;
}

const somarArrow = (a, b) => a + b;  // mesma coisa, forma "arrow"


function init() {
    console.log("O sistema iniciou!");
    console.log(somar(10, 2))
    console.log(idade)
}


init()

fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => console.log(json))

const select = document.querySelector('#userSelect');

select.addEventListener('change', () => {
  console.log('Você selecionou:', select.value);
});