var currrgba = [1.0,0.0,0.0,1.0]
var currshape = 0
var currtxtr = undefined
/**
 * Responsible for initializing buttons, sliders, radio buttons, etc. present
 * within your HTML document.
 */
function initEventHandelers() {
  var draw = false;
  // Register function (event handler) to be called on a mouse press
  canvas.onmousedown = function(ev) { draw = true
                                      click(ev) }
  canvas.onmouseup = function()     { draw = false }
  canvas.onmousemove = function(ev) { if(draw) click(ev) }
  
  document.getElementById('clbt').onclick = function()      { scene.clearGeometry() }
  document.getElementById('add_obj_bt').onclick = function(){ addOBJ() }
  
  document.getElementById('Color_bt').onclick = function()  { 
    if(this.value == "Solid")
    {
      this.value = "Rainbow"
      sendTextToHTML('🌈 RAINBOW 🌈','Color_bt')
    } 
    else
    {
      this.value = "Solid"
      sendTextToHTML('Solid Color 😐','Color_bt')
    }
  }
  document.getElementById('sl_red').oninput = function()    { currrgba[0] = this.value / 100 }
  document.getElementById('sl_green').oninput = function()  { currrgba[1] = this.value / 100 }
  document.getElementById('sl_blue').oninput = function()   { currrgba[2] = this.value / 100 }

  document.getElementById('Tri_bt').onclick = function()    { currshape = 0 }
  document.getElementById('Square_bt').onclick = function() { currshape = 1 }
  document.getElementById('Circle_bt').onclick = function() { currshape = 2 }
  document.getElementById('Cube_bt').onclick = function()   { currshape = 3 }
}

/**
 * Function called upon mouse click or mouse drag. Computes position of cursor,
 * pushes cursor position as GLSL coordinates, and draws.
 *
 * @param {Object} ev The event object containing the mouse's canvas position
 */
function click(ev) {
  
  var x = ev.clientX // x coordinate of a mouse pointer
  var y = ev.clientY // y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect()
  var size = document.getElementById('sl_sz').value/200 //recalc scaling for shapes
  var shape

  // Calc correct x and y pos in canvas space
  x = ((x - rect.left) - canvas.height/2)/(canvas.height/2)
  y = (canvas.width/2 - (y - rect.top))/(canvas.width/2)

  // Show position on page
  sendTextToHTML('x: ' + x + ' y: ' + y,'xyposText')

  // What shap are we drawing
  switch(currshape)
  {
    // Triangle
    case 0:
      shape = new FluctuatingTriangle(size,x,y)
    break;
    // Square
    case 1:
      shape = new SpinningSquare(size,x,y)
    break;
    // Circle (calc detail)
    case 2:
      shape = new RandomCircle(size,document.getElementById('circle_detail').value ,x,y)
    break;
    case 3:
    if(document.getElementById("Obj_image").files[0] == undefined)
    {
      shape = new TiltedCube(size,x,y)
    }
    else
    {
      var reader = new FileReader()

      reader.onload = function (e) {
        shape = new MultiTextureCube(e.target.result)
        shape.modelMatrix.setTranslate(x,y,0)
        shape.modelMatrix.rotate(30,0,0,1)
        shape.modelMatrix.scale(size,size,size)
        scene.addGeometry(shape)
      }
      reader.readAsDataURL(document.getElementById("Obj_image").files[0])

    }
    break;
  }

  if (shape != null) 
  {
    shape.color = [currrgba[0],currrgba[1],currrgba[2],currrgba[3]];
    scene.addGeometry(shape)
  }
}

function addOBJ()
{
  var reader = new FileReader()

  reader.onload = function(e) 
  {
    var contents = e.target.result;

    var shape = new LoadedOBJ(contents)

    shape.color = [currrgba[0],currrgba[1],currrgba[2],currrgba[3]];
    shape.modelMatrix.translate(0,0,1)

    scene.addGeometry(shape)
  }

  reader.readAsText(document.getElementById("Obj_file").files[0]);
}
