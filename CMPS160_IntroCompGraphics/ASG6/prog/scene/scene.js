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

    this.lightAngle = 0.0;
    this.lightDirection = new Vector3([2, 3.0, -4.0]);
    this.lightDirection.normalize();     // Normalize
    this.ambientLightColor = new Vector3([0.2, 0.2, 0.2])
    this.lightColor = new Vector3([1,1,1])

    // Specify the color for clearing <canvas> 
    gl.clearColor(0.0, 0.0, 0.0, 1.0)

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
    this.geometries.push(geometry)
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
    
    for (var i = 0; i < this.geometries.length; i++) {
      this.geometries[i].updateAnimation()
    }

    
    this.lightAngle += 0.01;
    this.lightDirection.elements[2] = -4.0 * Math.cos(this.lightAngle) - 3.0 * Math.sin(this.lightAngle)
    this.lightDirection.elements[1] = -4.0 * Math.sin(this.lightAngle) + 3.0 * Math.cos(this.lightAngle)
    this.lightDirection.elements[0] = 2.0
    this.lightDirection.normalize();     // Normalize

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

    for (var i = 0; i < this.geometries.length; i++) {
      this.geometries[i].render()
    }

    // Recommendations: No calls to any of your GLSL functions should be made
    // here. Your Geometry objects in this.geometries should render themselves
    // through their own .render() methods.
  }
}
