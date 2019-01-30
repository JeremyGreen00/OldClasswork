/**
 * Specifies a Triangle. A subclass of Geometry.
 *
 * @author "Your Name Here"
 * @this {Triangle}
 */
class Triangle extends Geometry {
  /**
   * Constructor for Triangle.
   *
   * @constructor
   * @param {Number} size The size of the triangle drawn
   * @param {Number} centerX The center x-position of the triangle
   * @param {Number} centerY The center y-position of the triangle
   */
  constructor(size, centerX, centerY) {
    super();
    this.vertices[0] = new Vertex()
    this.vertices[1] = new Vertex()
    this.vertices[2] = new Vertex()
    this.generateTriangleVertices(size, centerX, centerY)
    // Recommendations: Remember that Triangle is a subclass of Geometry.
    // "super" keyword can come in handy when minimizing code reuse.
  }

  /**
   * Generates the vertices of the Triangle.
   *
   * @private
   * @param {Number} size The size of the triangle drawn
   * @param {Number} centerX The center x-position of the triangle
   * @param {Number} centerY The center y-position of the triangle
   */
  generateTriangleVertices(size, centerX, centerY) {
    var l = size
    var x = centerX
    var y = centerY
    this.vertices[0].points[0] = x+l
    this.vertices[0].points[1] = y-l
    this.vertices[0].points[2] = 0
    this.vertices[1].points[0] = x-l
    this.vertices[1].points[1] = y-l
    this.vertices[1].points[2] = 0
    this.vertices[2].points[0] = x
    this.vertices[2].points[1] = y+l
    this.vertices[2].points[2] = 0
    //this.vertices = new Float32Array([x+l,y-l, x-l,y-l, x,y+l])

    // Recommendations: Might want to call this within your Triangle constructor.
    // Keeps your code clean :)
  }
}
