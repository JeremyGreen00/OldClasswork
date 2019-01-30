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
  }

  /**
   * Renders this Geometry within your webGL scene.
   */
  render() {

    var v = []

    for (var i = 0; i < this.vertices.length; i++) {
      v.push(this.vertices[i].points[0])
      v.push(this.vertices[i].points[1])
    }

    v = new Float32Array(v)

    sendAttributeBufferToGLSL(v, v.length/2, 'a_Position')

    sendUniformVec4ToGLSL(this.color, 'u_FragColor')  // color of point

    tellGLSLToDrawCurrentBuffer(v.length/2)

    // Recommendations: sendUniformVec4ToGLSL(), tellGLSLToDrawCurrentBuffer(),
    // and sendAttributeBufferToGLSL() are going to be useful here.
  }
}