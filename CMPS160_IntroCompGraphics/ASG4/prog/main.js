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

  // Enable usability on mobile
  loadMobile(canvas)

  scene = new Scene()

  if (!gl) 
  {  
    console.log('Failed to get the rendering context for WebGL')
    return;
  }

  //  Add checkered cube
  var txtcb = new CheckerCube()
  txtcb.color = [1,1,1,1];
  scene.addGeometry(txtcb)

  var txtcb = new MultiTextureCube('external/textures/flcl.jpg')
  txtcb.color = [1,1,1,1];
  scene.addGeometry(txtcb)

  initEventHandelers()
  tick()
}