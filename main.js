document.addEventListener('DOMContentLoaded', outputAll);

class Aliment{
    constructor(name, manafacturer, origin, price) {
        this.name = name;
        this.manafacturer = manafacturer;
        this.origin = origin;
        this.price = price;
    }
}

let submitForm = document.querySelector('#list-form').addEventListener('submit', (e) => {
    e.preventDefault();
    let name = document.querySelector('.aliment').value;
    let manafacturer = document.querySelector('.manafacturer').value;
    let origin = document.querySelector('.origin').value;
    let price = document.querySelector('.price').value;
    let aliment = new Aliment(name, manafacturer, origin, price);
    if(name === '' || manafacturer === '' || origin === '' || price === ''){
        alert("red", "Please Complete all the Fields!");
    }else{
        setAliment(aliment);
        clearFields();
        alert("blue", "The Product has Been Added!");
        output(aliment);
    }
});

function clearFields(){
    let items = document.querySelectorAll('input[type=text]');
    items.forEach((item) => item.value = '');
}

function setAliment(aliment){
    let alimentList = getAliment();
    alimentList.push(aliment);
    localStorage.setItem('aliments', JSON.stringify(alimentList));
}

function getAliment(){
    let alimentList;
    if(localStorage.getItem('aliments') === null){
        alimentList = [];
    }else{
        alimentList = JSON.parse(localStorage.getItem('aliments'));
    }
    return alimentList;
}

function outputAll(){
    let itemList = getAliment();
    let div = document.querySelector('.list-output');
    itemList.forEach(aliment => {
        let ul = document.createElement('ul');
        ul.className = "aliment-ul";
        ul.innerHTML = `
            <li class="aliment-li">Aliment: <span class="aliment-span">${aliment.name}</span></li>
            <li class="aliment-li">Company: <span class="aliment-span">${aliment.manafacturer}</span></li>
            <li class="aliment-li">Origin: <span class="aliment-span">${aliment.origin}</span></li>
            <li class="aliment-li">Price: <span class="aliment-span">${aliment.price}</span></li>
            <li class="btn-li"><button class="btnDelete"><i class="fas fa-trash"></i>Delete</button></li>`;
        div.appendChild(ul);
    });
}

function output(aliment){
    let div = document.querySelector('.list-output');
    let ul = document.createElement('ul');
    ul.className = "aliment-ul";
    ul.innerHTML = `
        <li class="aliment-li">Aliment: <span class="aliment-span">${aliment.name}</span></li>
        <li class="aliment-li">Company: <span class="aliment-span">${aliment.manafacturer}</li>
        <li class="aliment-li">Origin: <span class="aliment-span">${aliment.origin}</span></li>
        <li class="aliment-li">Price: <span class="aliment-span">${aliment.price}</span></li>
        <li class="btn-li"><button class="btnDelete"><i class="fas fa-trash"></i>Delete</button></li>`;
    div.appendChild(ul);
}

function alert(alertType, message){
    var div = document.createElement('div');
    var container = document.querySelector('.container');
    var form = document.querySelector('.list-form');
    div.className = `alert alert-${alertType}`;
    div.appendChild(document.createTextNode(message));
    container.insertBefore(div, form);
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
}

function deleteAlimentFromLocalStorage(name){
    let alimentList =  getAliment();
    alimentList.forEach((aliment, index) => {
        if(aliment.name === name){
            alimentList.splice(index, 1);
        }
    });
    localStorage.setItem('aliments', JSON.stringify(alimentList))
}

function deleteFromDom(e){
    e.remove();
}

document.querySelector(".list-output").addEventListener('click', (e) => {
    if(e.target.classList.contains("btnDelete")){
        deleteFromDom(e.target.parentElement.parentElement);
        deleteAlimentFromLocalStorage(e.target.parentElement.parentElement.childNodes[0].nextElementSibling.textContent.slice(9));
        alert("blue", "The product was removed!");
    }
});

