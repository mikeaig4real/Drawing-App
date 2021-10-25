//variables

const canvas = document.getElementById('canvas');
const settings = document.querySelector('.settings');
const ctx = canvas.getContext('2d');
const toolBar = document.querySelector('.toolbar');
const brush = document.querySelector('.text-size');
const color = document.querySelector('.color');
const eraser = document.querySelector('.eraser');
const clearAll = document.querySelector('.clear-all');
const download = document.querySelector('.download');
const solid = document.querySelector('.solid');
let brushSize = 5;
let defaultCol = 'black';
let type = 'fill'
let isPressed;


//UI


class UI {
    static drawCircle(x, y) {
        UI.pressed();
        UI.notPressed();
        UI.setSettings();
        canvas.addEventListener('mousemove', (e) => {
            if (isPressed) {
                x = e.offsetX, y = e.offsetY
                ctx.beginPath();
                type == 'fill'? ctx.fillStyle = defaultCol : ctx.strokeStyle = defaultCol
                ctx.arc(x, y, brushSize, 0, 2 * Math.PI);
                type == 'fill' ? ctx.fill() : ctx.stroke();
            }
        })
    }

    static pressed() {
        canvas.addEventListener('mousedown', () => {
            isPressed = true;
        })
    }

    static notPressed() {
        canvas.addEventListener('mouseup', () => {
            isPressed = false;
        })
    }

    static setSettings() {
        settings.addEventListener('click', () => {
            toolBar.classList.toggle('show');
            UI.changeSize();
            UI.changeColor();
            UI.chageType();
            UI.downloadDraw();
        })
    }

    static changeSize() {
        brush.addEventListener('change', (e) => {
            let { value: size } = e.target;
            if (size >= 5 && size <= 30) {
                brushSize = size;
            } else {
                alert('Are you even a good painter??')
            }
        })
    }

    static changeColor() {
        color.addEventListener('change', (e) => {
            defaultCol = e.target.value;
        })
        let formerColor = defaultCol;
        let formerType = type;
        eraser.addEventListener('click', () => {
            canvas.classList.toggle('erase');
            if (canvas.classList.contains('erase')) {
                defaultCol = 'azure';
                type = 'fill';
            } else {
                defaultCol = formerColor;
                type = formerType;
            }
        })
        clearAll.addEventListener('click', () => {
            ctx.clearRect(0, 0, 450, 450);
        })
    }

    static chageType() {
        solid.addEventListener('click', () => {
            solid.classList.toggle('fas');
            solid.classList.toggle('far');
            if (type == 'fill') {
                type = 'stroke'
            } else {
                type = 'fill';
            }
        })
    }

    static downloadDraw() {
        download.addEventListener('click', () => {
            download.href = canvas.toDataURL()
        })
    }

}


// Storage

class Storage {

}



// DOM loaded

document.addEventListener('DOMContentLoaded', () => {
    UI.drawCircle();
})