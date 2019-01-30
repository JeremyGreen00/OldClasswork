
var g_points = [] // The array of points to render
var g_colors = [] // The array of colors for each point

var currrgba = [1.0,0.0,0.0,1.0]
var currshape = 0
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
  document.getElementById('sl_red').oninput = function()    { currrgba[0] = this.value / 100 }
  document.getElementById('sl_green').oninput = function()  { currrgba[1] = this.value / 100 }
  document.getElementById('sl_blue').oninput = function()   { currrgba[2] = this.value / 100 }


  document.getElementById('Tri_bt').onclick = function()    { currshape = 0 }
  document.getElementById('Square_bt').onclick = function() { currshape = 1 }
  document.getElementById('Circle_bt').onclick = function() { currshape = 2 }
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

  // Timer
  var timer = Date.now() * 1.0

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
      shape = new Triangle(size,x,y)
    break;
    // Square
    case 1:
      shape = new Square(size,x,y)
    break;
    // Circle (calc detail)
    case 2:
      shape = new Circle(size,document.getElementById('circle_detail').value ,x,y)
    break;
  }
  shape.color = [currrgba[0],currrgba[1],currrgba[2],currrgba[3]];

  scene.addGeometry(shape)

  scene.render()

  // Show time to render on page
  sendTextToHTML('This scene rendered in ' + (Date.now() - timer) + ' milliseconds','mlToRenderText')
}

/**
 * Clears the HTML canvas.
 */
function clearCanvas() {
  g_points = [] // The array of points to render
  g_colors = [] // The array of colors for each point
  
  render()
}

/**
 * Changes the color of the points drawn on HTML canvas.
 *
 * @param {float} color Color value from 0.0 to 1.0.
 */
function changePointColor(color) {
  // I'm not sure how I am expected to use this if at all
}
