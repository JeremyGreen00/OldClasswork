/**
 * Specifies a Square. A subclass of Geometry.
 *
 * @author "Your Name Here"
 * @this {Square}
 */
class Square extends Geometry {
  /**
   * Constructor for Square.
   *
   * @constructor
   * @param {Number} size The size of the square drawn
   * @param {Number} centerX The center x-position of the square
   * @param {Number} centerY The center y-position of the square
   */
  constructor(size, centerX, centerY) {
    super()
    this.vertices[0] = new Vertex()
    this.vertices[1] = new Vertex()
    this.vertices[2] = new Vertex()
    this.vertices[3] = new Vertex()
    this.vertices[4] = new Vertex()
    this.vertices[5] = new Vertex()
    this.generateSquareVertices(size, centerX, centerY)

    // Recommendations: Remember that Square is a subclass of Geometry.
    // "super" keyword can come in handy when minimizing code reuse.
  }

  /**
   * Generates the vertices of the square.
   *
   * @private
   * @param {Number} size The size of the square drawn
   * @param {Number} centerX The center x-position of the square
   * @param {Number} centerY The center y-position of the square
   */
  generateSquareVertices(size, centerX, centerY) {
    
    var l = size
    var x = centerX
    var y = centerY

    this.vertices[0].points[0] = x+l
    this.vertices[0].points[1] = y-l
    this.vertices[0].points[2] = 0
    this.vertices[1].points[0] = x-l
    this.vertices[1].points[1] = y-l
    this.vertices[1].points[2] = 0
    this.vertices[2].points[0] = x+l
    this.vertices[2].points[1] = y+l
    this.vertices[2].points[2] = 0

    this.vertices[3].points[0] = x-l
    this.vertices[3].points[1] = y+l
    this.vertices[3].points[2] = 0
    this.vertices[4].points[0] = x+l
    this.vertices[4].points[1] = y+l
    this.vertices[4].points[2] = 0
    this.vertices[5].points[0] = x-l
    this.vertices[5].points[1] = y-l
    this.vertices[5].points[2] = 0
    //this.vertices = new Float32Array([x+l,y-l, x-l,y-l, x+l,y+l,  x-l,y+l, x+l,y+l, x-l,y-l])

    // Recommendations: Might want to call this within your Square constructor.
    // Keeps your code clean :)
  }
}
