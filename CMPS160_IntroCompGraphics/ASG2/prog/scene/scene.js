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
   * Renders all the Geometry within the scene.
   */
  render() {

    // Clear <canvas> 
    gl.clear(gl.COLOR_BUFFER_BIT)  // clear the screen to black

    for (var i = 0; i < this.geometries.length; i++) {
      this.geometries[i].render()
    }

    // Recommendations: No calls to any of your GLSL functions should be made
    // here. Your Geometry objects in this.geometries should render themselves
    // through their own .render() methods.
  }
}
