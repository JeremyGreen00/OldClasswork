/**
 * Specifies a geometric object.
 *
 * @author "Your Name Here"
 * @this {Geometry}
 */
class Light {
  /**
   * Constructor for Geometry.
   *
   * @constructor
   */
  constructor(x,y,z) {
    this.color = [1,1,1]  // The color of your light object


    this.u_LightDirection = gl.getUniformLocation(gl.program, 'u_LightDirection');
    this.lightDirection = new Vector3([x, y, z]);
    this.lightDirection.normalize();     // Normalize
  }

  /**
   * Renders this Geometry within your webGL scene.
   */
  render() {
    gl.uniform3fv(this.u_LightDirection, this.lightDirection.elements);

    //  Add ambient light
    gl.uniform3fv(gl.getUniformLocation(gl.program, 'u_AmbientLight'), [0.2,0.2,0.2]);
    gl.uniform3fv(gl.getUniformLocation(gl.program, 'u_LightColor'), [color[0],color[1],color[2]]);

    gl.uniform3fv(gl.getUniformLocation(gl.program, 'u_EyeDirection'), [(camera.position.elements[0] - camera.center.elements[0]),
                                                                        (camera.position.elements[1] - camera.center.elements[1]),
                                                                        (camera.position.elements[2] - camera.center.elements[2])]);
  }

  /**
   * Responsible for updating the geometry's modelMatrix for animation.
   * Does nothing for non-animating geometry.
   */
  updateAnimation() {

    return;

    // NOTE: This is just in place so you'll be able to call updateAnimation()
    // on geometry that don't animate. No need to change anything.
  }
}