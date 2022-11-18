const ul = document.getElementById('primeiro');
const url = 'http://localhost:3001/clientes';

function fazGet(url) {
  let request = new XMLHttpRequest();
  request.open('GET', url, false);
  request.send();
  return request.responseText;
}
function criaLinha(usuario) {
  console.log(usuario);
  let linha = document.createElement('tr');
  let tdId = document.createElement('td');
  let tdNome = document.createElement('td');
  let tdCpf = document.createElement('td');

  tdId.innerHTML = usuario.ID;
  tdNome.innerHTML = usuario.Nome;
  tdCpf.innerHTML = usuario.CPF;

  linha.appendChild(tdId);
  linha.appendChild(tdNome);
  linha.appendChild(tdCpf);

  return linha;
}
function main() {
  let data = fazGet('http://localhost:3001/clientes');
  let usuarios = JSON.parse(data);
  let tabela = document.getElementById('primeiro');

  usuarios.forEach((element) => {
    let linha = criaLinha(element);
    tabela.appendChild(linha);
  });
}
main();
