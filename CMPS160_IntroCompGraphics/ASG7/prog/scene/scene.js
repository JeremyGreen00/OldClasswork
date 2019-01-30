/**
 * Specifies a WebGL scene.
 *
 * @author "Jeremy Green"
 * @this {Scene}
 */
class Scene {
  /**
   * Constructor for Scene.
   *
   * @constructor
   */
  constructor() {
    this.geometries = [] // Geometries being drawn on canvas
    this.geometries_txtr = [] // Geometries with textures being drawn on canvas
    this.available_txtrs = []
    this.txtrs = []

    this.solid_shader = createShader(gl, ASSIGN4_VSHADER, ASSIGN4_FSHADER)
    this.txtr_shader = createShader(gl, ASSIGN4_VSHADER, ASSIGN4_FSHADER_TXTR)

    this.lightAngle = 0.0;
    this.lightDirection = new Vector3([2, 3.0, -4.0]);
    this.lightDirection.normalize();     // Normalize
    this.ambientLightColor = new Vector3([0.2, 0.2, 0.2])
    this.lightColor = new Vector3([1,1,1])

    this.fogColor = new Float32Array([0.037, 0.131, 0.223]);
    this.fogDist = new Float32Array([5, 15]);

    // Specify the color for clearing <canvas> 
    gl.clearColor(this.fogColor[0], this.fogColor[1], this.fogColor[2], 1.0)

    // Clear <canvas> 
    gl.clear(gl.COLOR_BUFFER_BIT)  // clear the screen to black

    // Recommendations: Setting the canvas's clear color and clearing the canvas
    // here is a good idea.
  }

  /**
   * Adds the given geometry to the the scene.
   *
   * @param {Geometry} geometry Geometry being added to scene
   */
  addGeometry(geometry) {
    if(geometry.txtrpth == null)
      this.geometries.push(geometry)
    else
      this.geometries_txtr.push(geometry)
  }

  /**
   * Clears all the geometry within the scene.
   */
  clearGeometry() {
    this.geometries = []; // Geometries being drawn on canvas

    this.render()

    // Recommendations: It would be best to call this.render() at the end of
    // this call.
  }

  /**
   * Updates the animation for each geometry in geometries.
   */
  updateAnimation() {
    
    useShader(gl,this.solid_shader)
    for (var i = 0; i < this.geometries.length; i++) {
      this.geometries[i].updateAnimation()
    }

    useShader(gl,this.txtr_shader)
    for (var i = 0; i < this.geometries_txtr.length; i++) {
      this.geometries_txtr[i].updateAnimation()
    }
    
    /*this.lightAngle += 0.01;
    this.lightDirection.elements[2] = -4.0 * Math.cos(this.lightAngle) - 3.0 * Math.sin(this.lightAngle)
    this.lightDirection.elements[1] = -4.0 * Math.sin(this.lightAngle) + 3.0 * Math.cos(this.lightAngle)
    this.lightDirection.elements[0] = 2.0
    this.lightDirection.normalize();     // Normalize*/

    // Recomendations: No rendering should be done here. Your Geometry objects
    // in this.geometries should update their animations themselves through
    // their own .updateAnimation() methods.
  }

  /**
   * Renders all the Geometry within the scene.
   */
  render() {

    // Clear <canvas> 
    gl.clear(gl.COLOR_BUFFER_BIT)  // clear the screen to black


    gl.uniform3fv(gl.getUniformLocation(gl.program, 'u_EyeDirection'), [(camera.position.elements[0] - camera.center.elements[0]),
                                                                        (camera.position.elements[1] - camera.center.elements[1]),
                                                                        (camera.position.elements[2] - camera.center.elements[2])]);
    gl.uniform3fv(gl.getUniformLocation(gl.program, 'u_FogColor'), this.fogColor);
    gl.uniform2fv(gl.getUniformLocation(gl.program, 'u_FogDist'), this.fogDist);
    gl.uniform4fv(gl.getUniformLocation(gl.program, 'u_Eye'),[(camera.position.elements[0]),
                                                              (camera.position.elements[1]),
                                                              (camera.position.elements[2]),
                                                              1.0]);

    useShader(gl,this.solid_shader)
    for (var i = 0; i < this.geometries.length; i++) {
      this.geometries[i].render()
    }

    gl.uniform3fv(gl.getUniformLocation(gl.program, 'u_EyeDirection'), [(camera.position.elements[0] - camera.center.elements[0]),
                                                                        (camera.position.elements[1] - camera.center.elements[1]),
                                                                        (camera.position.elements[2] - camera.center.elements[2])]);
    useShader(gl,this.txtr_shader)
    for (var i = 0; i < this.geometries_txtr.length; i++) {
      this.geometries_txtr[i].render()
    }

    // Recommendations: No calls to any of your GLSL functions should be made
    // here. Your Geometry objects in this.geometries should render themselves
    // through their own .render() methods.
  }
}
