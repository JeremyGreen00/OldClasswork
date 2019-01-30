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

  var u_LightDirection = gl.getUniformLocation(gl.program, 'u_LightDirection');
  var lightDirection = new Vector3([0.5, 3.0, 4.0]);
  lightDirection.normalize();     // Normalize
  gl.uniform3fv(u_LightDirection, lightDirection.elements);

  generateMap('external/map/hmap2.png','external/map/cmap2.png')

  /*var headmodel = new MacGuffin(teapot,'external/textures/flcl.png', 'teapot textured')//'external/textures/flcl.jpg')
  //console.log(headmodel)
  headmodel.color = [1,1,1,1]
  headmodel.modelMatrix.setTranslate(0,0,1.5)
  headmodel.modelMatrix.scale(0.25,0.25,0.25)
  scene.addGeometry(headmodel)
/*
  headmodel = new MyOBJ(teapot)
  //console.log(headmodel)
  headmodel.color = [1,0,0,1]
  headmodel.modelMatrix.setTranslate(2,-0.05,-1.5)
  headmodel.modelMatrix.scale(0.25,0.25,0.25)
  scene.addGeometry(headmodel)//*/

  headmodel = new MyOBJ(head,'external/textures/merge3d.jpg')//'external/textures/flcl.jpg')
  headmodel.color = [1,0,1,1]
  headmodel.modelMatrix.setTranslate(0,30,0)
  headmodel.modelMatrix.rotate(90,1,0,0)
  headmodel.modelMatrix.scale(4,4,1)
  scene.addGeometry(headmodel)

  resize(gl.canvas)
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

  initEventHandelers()
  tick()
}