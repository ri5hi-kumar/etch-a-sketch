const DEFAULT_SIZE = 16
const DEFAULT_MODE = 'black'

let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

let draw = false;

const grid = document.querySelector('.grid');
const slider = document.querySelector('#slider');
const clear = document.querySelector('#clear');
const black = document.querySelector('#black');
const rgb = document.querySelector('#rgb');
const display = document.querySelector('.display');

function changeColor(e) {
    if(e.type === 'mouseover' && !draw) return;
    if(currentMode === 'black'){
        e.target.style.backgroundColor = 'black';
    }
    else if(currentMode === 'rgb'){
        e.target.style.backgroundColor = getRandomColor();
    }
}

const createGrid = (size) => {
    grid.style.gridTemplateColumns = `repeat(${size}, 2fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 2fr)`;
    display.innerText = `${size} X ${size}`;
    for(let i = 1; i <= size * size; i++){
        const box = document.createElement('div');
        box.classList.add('cell');
        box.addEventListener('mouseover', changeColor);
        box.addEventListener('mousedown', changeColor);
        grid.append(box);
    }
}

window.addEventListener('mousedown', function(){
    draw = true;
})

window.addEventListener('mouseup', function(){
    draw = false;
})

slider.addEventListener('change', function(e){
    grid.innerHTML = '';
    currentSize = parseInt(e.target.value);
    createGrid(currentSize);
})

clear.addEventListener('click', function(){
    grid.innerHTML = '';
    createGrid(currentSize);
})

black.addEventListener('click', function(){
    currentMode = 'black';
})

rgb.addEventListener('click', function(){
    currentMode = 'rgb';
})

const getRandomColor = () =>{
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    return `rgb(${r}, ${g}, ${b})`
}


window.onload = () =>{
    createGrid(DEFAULT_SIZE);
}