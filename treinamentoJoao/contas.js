const menu = document.querySelector('.container-menu')
const tbody = document.querySelector('tbody')
const menuNome = document.querySelector('#m-nome')
const contaMenu = document.querySelector('#m-conta')
const valorMenu = document.querySelector('#m-valor')
const buttonSave = document.querySelector('#buttonSave')

let itens
let id

function openMenu(edit = false, index = 0) {
  menu.classList.add('active')

  menu.onclick = e => {
    if (e.target.className.indexOf('container-menu') !== -1) {
      menu.classList.remove('active')
    }
  }

  if (edit) {
    menuNome.value = itens[index].nome
    contaMenu.value = itens[index].conta
    valorMenu.value = itens[index].valor
    id = index
  } else {
    menuNome.value = ''
    contaMenu.value = ''
    valorMenu.value = ''
  }

}

function editItem(index) {
  openMenu(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.conta}</td>
    <td>R$ ${item.valor}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

buttonSave.onclick = e => {

  if (menuNome.value == '' || contaMenu.value == '' || valorMenu.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = menuNome.value
    itens[id].funcao = contaMenu.value
    itens[id].salario = valorMenu.value
  } else {
    itens.push({ 'nome': menuNome.value, 'conta': contaMenu.value, 'valor': valorMenu.value })
  }

  setItensBD()

  menu.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()

class resposivo {
  constructor(responsiveMenu, navList, navLinks) {
    this.navLinks = document.querySelectorAll(navLinks);
    this.activeClass = "active";
    this.responsiveMenu = document.querySelector(responsiveMenu);
    this.navList = document.querySelector(navList);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.animateLinks();
    this.responsiveMenu.classList.toggle(this.activeClass);
    this.navList.classList.toggle(this.activeClass);
  }

  init() {
    if (this.responsiveMenu) {
      this.addClickEvent();
    }
    return this;
  }
  addClickEvent() {
    this.responsiveMenu.addEventListener("click", this.handleClick);
  }
  animateLinks() {
    this.navLinks.forEach((link, index) => {
      link.style.animation
        ? (link.style.animation = "")
        : (link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3
          }s`);
    });
  }

}

const navBarResponsive = new navBarResponsive(
  ".responsive-menu",
  ".nav-list",
  ".nav-list li",
);
navBarResponsive.init();