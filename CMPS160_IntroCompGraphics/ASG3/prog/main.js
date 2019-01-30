// Global values used by whole program
var canvas
var gl
var scene
/**
 * Function called when the webpage loads.
 */
function main() {

  // Retrieve <canvas> element
  canvas = document.getElementById('webgl')
  // Get the rendering context for WebGL
  gl = getWebGLContext(canvas)

  scene = new Scene()

  if (!gl) 
  {  
    console.log('Failed to get the rendering context for WebGL'); 
    return;
  }

  // Initialize shaders
  if (!initShaders(gl, ASSIGN3_VSHADER, ASSIGN3_FSHADER)) 
  {
  	console.log('Failed to initialize shaders.');
  	return;
  }

  initEventHandelers()
  tick()
}