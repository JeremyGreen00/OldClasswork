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
    this.x = centerX
    this.y = centerY
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

    this.vertices[0].points = new Vector3([size,-size,0]);
    this.vertices[1].points = new Vector3([-size,-size,0]);
    this.vertices[2].points = new Vector3([0,size,0]);

    this.modelMatrix.setTranslate(centerX, centerY, 0)

    // Recommendations: Might want to call this within your Triangle constructor.
    // Keeps your code clean :)
  }
}
