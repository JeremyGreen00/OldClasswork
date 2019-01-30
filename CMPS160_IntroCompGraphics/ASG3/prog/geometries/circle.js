/**
 * Specifies a Circle. A subclass of Geometry.
 *
 * @author "Your Name Here"
 * @this {Circle}
 */
class Circle extends Geometry {
  /**
   * Constructor for Circle.
   *
   * @constructor
   * @param {Number} radius The radius of the circle being constructed
   * @param {Integer} segments The number of segments composing the circle
   * @param {Number} centerX The central x-position of the circle
   * @param {Number} centerY The central y-position of the circle
   */
  constructor(radius, segments, centerX, centerY) {
    super()
    this.x = centerX
    this.y = centerY
    this.size = radius
    this.generateCircleVertices(radius, segments, centerX, centerY)

    // Recommendations: Remember that Circle is a subclass of Geometry.
    // "super" keyword can come in handy when minimizing code reuse.
  }

  /**
   * Generates the vertices of the Circle.
   *
   * @private
   * @param {Number} radius The radius of the circle being constructed
   * @param {Integer} segments The number of segments composing the circle
   * @param {Number} centerX The central x-position of the circle
   * @param {Number} centerY The central y-position of the circle
   */
  generateCircleVertices(radius, segments, centerX, centerY) {
    var verind = 0

    var pts = 2*Math.PI/segments

    for (var i = 0; i < 2*Math.PI; i+=pts) {

      this.vertices[verind] = new Vertex()
      this.vertices[verind++].points = new Vector3([0,0,0]);

      this.vertices[verind] = new Vertex()
      this.vertices[verind++].points = new Vector3([radius*Math.sin(i),radius*Math.cos(i),0]);

      this.vertices[verind] = new Vertex()
      this.vertices[verind++].points = new Vector3([radius*Math.sin(i+pts),radius*Math.cos(i+pts),0]);
    }

    this.modelMatrix.setTranslate(this.x, this.y, 0)

    // Recommendations: Might want to call this within your Circle constructor.
    // Keeps your code clean :)
  }
}
