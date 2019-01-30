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
    this.color = []  // The color of your geometric object

    this.vertices = []; // Vertex objects. Each vertex has x-y-z.
    this.modelMatrix = new Matrix4(); // Model matrix applied to geometric object
    this.shader = createShader(gl, ASSIGN4_VSHADER, ASSIGN4_FSHADER) // shading program you will be using to shade this geometry

    this.texture = null
  }

  /**
   * Renders this Geometry within your webGL scene.
   */
  render() {
    useShader(gl,this.shader)

    if(this.ve == null)
    {
      this.ve = new Float32Array(this.vertices.length*3)
      this.colors = new Float32Array(this.vertices.length*4)
      var issolid = false
      if(document.getElementById('Color_bt').value == "Solid") issolid = true


      for (var i = 0; i < this.vertices.length; i++) {
        this.ve[i*3] = (this.vertices[i].points.elements[0])
        this.ve[i*3 + 1] = (this.vertices[i].points.elements[1])
        this.ve[i*3 + 2] = (this.vertices[i].points.elements[2])
        if(issolid)
        {
          this.colors[i*4] = this.color[0]
          this.colors[i*4 + 1] = this.color[1]
          this.colors[i*4 + 2] = this.color[2]
          this.colors[i*4 + 3] = this.color[3]
        }
        else
        {
          this.colors[i*4] = (Math.random())
          this.colors[i*4 + 1] = Math.random()
          this.colors[i*4 + 2] = Math.random()
          this.colors[i*4 + 3] = 1
        }
      }
    }

    sendAttributeBufferToGLSL(this.ve, this.ve.length/3, 'a_Position')
    sendAttributeBufferToGLSL(this.colors, this.colors.length/4, 'a_Color')

    sendUniformMatToGLSL(this.modelMatrix, 'u_Transform')

    tellGLSLToDrawCurrentBuffer(this.ve.length/3)

    // Recommendations: sendUniformVec4ToGLSL(), tellGLSLToDrawCurrentBuffer(),
    // and sendAttributeBufferToGLSL() are going to be useful here.
  }

  /**
   * Responsible for updating the geometry's modelMatrix for animation.
   * Does nothing for non-animating geometry.
   */
  updateAnimation() {

    this.modelMatrix.rotate(1,0,1,0)
    return;

    // NOTE: This is just in place so you'll be able to call updateAnimation()
    // on geometry that don't animate. No need to change anything.
  }
}