/**
 * Specifies a geometric object.
 *
 * @author "Your Name Here"
 * @this {Geometry}
 */
class Geometry {
  /**
   * Constructor for Geometry.
   *
   * @constructor
   */
  constructor() {
    this.vertices = [] // Vertex objects. Each vertex has x-y-z.
    this.color = []  // The color of your geometric object
    this.modelMatrix = new Matrix4();
    this.modelMatrix.setIdentity();
  }

  /**
   * Renders this Geometry within your webGL scene.
   */
  render() {

    var v = []

    for (var i = 0; i < this.vertices.length; i++) {
      v.push(this.vertices[i].points.elements[0])
      v.push(this.vertices[i].points.elements[1])
      v.push(this.vertices[i].points.elements[2])
    }

    v = new Float32Array(v)

    sendAttributeBufferToGLSL(v, v.length/3, 'a_Position')

    sendUniformVec4ToGLSL(this.color, 'u_FragColor')  // color of point

    sendUniformMatToGLSL(this.modelMatrix, 'u_Transform')

    tellGLSLToDrawCurrentBuffer(v.length/3)

    // Recommendations: sendUniformVec4ToGLSL(), tellGLSLToDrawCurrentBuffer(),
    // and sendAttributeBufferToGLSL() are going to be useful here.
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