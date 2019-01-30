// Global values used by whole program
var canvas
var gl
var scene
var camera
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

  useShader(gl,createShader(gl, ASSIGN4_VSHADER, ASSIGN4_FSHADER_TXTR))

  // Camera matrix object
  camera = new Camera()

  scene = new Scene()

  if (!gl) 
  {  
    console.log('Failed to get the rendering context for WebGL')
    return;
  }
  generateMap('external/map/hmap1.png','external/map/cmap1.png')

  var headmodel = new MyOBJ(teapot,'external/textures/TeapotTex.png')//'external/textures/flcl.jpg')
  //console.log(headmodel)
  headmodel.color = [1,1,1,1]
  headmodel.modelMatrix.setTranslate(0,-0.05,-1.5)
  headmodel.modelMatrix.scale(0.25,0.25,0.25)
  scene.addGeometry(headmodel)

  headmodel = new MyOBJ(head,'external/textures/merge3d.jpg')//'external/textures/flcl.jpg')
  headmodel.color = [1,1,1,1]
  headmodel.modelMatrix.setTranslate(0,10,10)
  headmodel.modelMatrix.rotate(90,1,0,1)
  headmodel.modelMatrix.scale(0.5,0.5,0.5)
  scene.addGeometry(headmodel)

  initEventHandelers()
  tick()
}