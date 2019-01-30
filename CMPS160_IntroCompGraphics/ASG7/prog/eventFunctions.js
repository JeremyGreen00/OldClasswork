var isMoving = false
var useNormShader = false
var mouseDown = false
/**
 * Responsible for initializing buttons, sliders, radio buttons, etc. present
 * within your HTML document.
 */
function initEventHandelers() {


  document.onkeydown = function(ev){ 
    keydown(ev)
  }
  document.onkeyup =   function(ev){ 
    keyup(ev)
  }
  window.addEventListener('resize', function(event){
    resize(gl.canvas)
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
  });
/*
  document.getElementById('ProjType').onclick = function()
  {
    if(this.value == 'perspective')
    {
      this.value = 'ortho'
      sendTextToHTML('Switch to Perspective','ProjType')
    } 
    else
    {
      this.value = 'perspective'
      sendTextToHTML('Switch to Orthographic','ProjType')
    }
  }*/

  var movx = 0
  var movy = 0

  // Register function (event handler) to be called on a mouse press
  canvas.onmousedown = function(ev) { 
    mouseDown = true 
    canvas.requestPointerLock()
    //var mousePos = getMouseXY(ev)
    //movx = mousePos.x
    //movy = mousePos.y
  }
  canvas.onmousemove = function(ev) { 
    
    camera.rotate(0.2,ev.movementX,ev.movementY, 0)
  
  }
  canvas.onmouseup = function() { mouseDown = false }
}

function getMouseXY(ev)
{
  var x = ev.clientX // x coordinate of a mouse pointer
  var y = ev.clientY // y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect()

  // Calc correct x and y pos in canvas space
  x = ((x - rect.left) - canvas.height/2)/(canvas.height/2)
  y = (canvas.width/2 - (y - rect.top))/(canvas.width/2)

  return {x: x, y: y}
}

function keydown(ev)
{
  if(ev.keyCode == 87) //w
  {
    camera.keyW = true;
  }
  if(ev.keyCode == 65) //a
  {
    camera.keyA = true;
  }
  if(ev.keyCode == 83) //s
  {
    camera.keyS = true;
  }
  if(ev.keyCode == 68) //d
  {
    camera.keyD = true;
  }
  if(ev.keyCode == 78) //n
  {
    useNormShader = !useNormShader
  }
}
function keyup(ev)
{
  if(ev.keyCode == 87) //w
  {
    camera.keyW = false;
  }
  if(ev.keyCode == 65) //a
  {
    camera.keyA = false;
  }
  if(ev.keyCode == 83) //s
  {
    camera.keyS = false;
  }
  if(ev.keyCode == 68) //d
  {
    camera.keyD = false;
  }
}

function GetOBJ(filePath,imagPath)
{

  /*
  var reader = new FileReader()
  reader.onload = function(e) 
  {
    var contents = e.target.result;

    var shape = new myOBJ(contents,imagPath)

    shape.color = [1,1,1,1]

    return shape
  }

  reader.readAsText(filePath)*/
}
