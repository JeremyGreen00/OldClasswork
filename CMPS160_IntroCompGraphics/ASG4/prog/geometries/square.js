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
    this.x = centerX
    this.y = centerY
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

    this.vertices[0].points = new Vector3([size,-size,0]);
    this.vertices[1].points = new Vector3([-size,-size,0]);
    this.vertices[2].points = new Vector3([size,size,0]);

    this.vertices[3].points = new Vector3([-size,size,0]);
    this.vertices[4].points = new Vector3([size,size,0]);
    this.vertices[5].points = new Vector3([-size,-size,0]);


    this.modelMatrix.setTranslate(this.x, this.y, 0)

    // Recommendations: Might want to call this within your Square constructor.
    // Keeps your code clean :)
  }
}
