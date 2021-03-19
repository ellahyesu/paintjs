// Canvas API -> https://developer.mozilla.org/ko/docs/Web/API/Canvas_API
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 500;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// 나중에 이 값들을 overwrite하도록 만들것임. defalut값.
ctx.fillStyle = "white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting(){
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(e) {
  const x = e.offsetX;
  const y = e.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x,y);
    // console.log("creating path in ", x, y);
  } else {
    ctx.lineTo(x,y);
    ctx.stroke();
    // console.log("creating line in ", x, y);
  }
}

function onMouseDown() {
  painting = true;
}

function onMouseUp() {
  painting = false;
}

function handleColorClick(e) {
  const color = e.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(e) {
  const line = e.target.value;
  ctx.lineWidth = line;
  // console.log(e.target.value);
}

function handleModeClick(e) {
  if(filling === true){
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick() {
  if(filling) {
    ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
  }
}

function handleCM(e) {
  e.preventDefault();
}

function handleSaveClick() {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[EXPORT]";
  link.click();
}

if(canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

// Array.from -> object로 부터 array를 만든다
// console.log(Array.from(colors));

Array.from(colors).forEach(color => 
  color.addEventListener("click", handleColorClick)
);

if(range) {
  range.addEventListener("input", handleRangeChange);
}

if(mode) {
  mode.addEventListener("click", handleModeClick);
}

if(saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}