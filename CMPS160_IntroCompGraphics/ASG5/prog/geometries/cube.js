/**
 * Specifies a tilted cube which rotates.
 *
 * @author "Your Name"
 * @this {TiltedCube}
 */
class Cube extends Geometry {
  /**
   * Constructor for TiltedCube.
   *
   * @constructor
   * @returns {TiltedCube} Geometric object created
   */
  constructor(size, x, y, z, texturePath) {
    super()
    
    this.x = x
    this.y = y
    this.z = z

    for(var i = 0; i< 36; i++)
      {this.vertices[i] = new Vertex()}

    this.generateCubeVertices()
    this.generateUVCoordinates()

    this.modelMatrix.setTranslate(this.x, this.y, this.z)
    this.modelMatrix.scale(size,size,size)

    if (texturePath == null) 
    {
      this.shader = createShader(gl, ASSIGN4_VSHADER, ASSIGN4_FSHADER)
    }
    else 
    {
      this.shader = createShader(gl, ASSIGN4_VSHADER, ASSIGN4_FSHADER_TXTR)

      var parent = this
      create2DTexture(texturePath, gl.LINEAR, gl.NEAREST, gl.REPEAT, gl.REPEAT, 
          function(e) {parent.texture = e})
    }

    this.txtrpth = texturePath
    // Recommendations: Might want to tilt your cube at 30 degrees relative to
    // the z-axis here. Pretty good tilt that lets us see that it's a cube.
  }

  /**
   * Generates the vertices of TiltedCube. Just a regular cube.
   *
   * @private
   * @param {Number} size The size of the tilted cube.
   */
  generateCubeVertices() {
    
    var v1,v2,v3,v4,v5,v6,v7,v8
    v1 = [1,1,1]
    v2 = [1,-1,1]
    v3 = [-1,1,1]
    v4 = [-1,-1,1]
    v5 = [1,1,-1]
    v6 = [1,-1,-1]
    v7 = [-1,1,-1]
    v8 = [-1,-1,-1]
// Create a cube
  //    v7----- v5
  //   /|      /|
  //  v3------v1|
  //  | |     | |
  //  | |v8---|-|v6
  //  |/      |/
  //  v4------v2
    var pts = [v1,v2,v3, v2,v4,v3,
               v5,v6,v1, v6,v2,v1,
               v7,v8,v5, v8,v6,v5,
               v3,v4,v7, v4,v8,v7,
               v4,v2,v8, v2,v6,v8,
               v3,v7,v1, v7,v5,v1]

    for(var i = 0; i< 36; i++)
    {
      this.vertices[i].points = new Vector3([pts[i][0], pts[i][1], pts[i][2]]);
    }
    // Recommendations: Might want to generate your cube vertices so that their
    // x-y-z values are combinations of 1.0 and -1.0. Allows you to scale the
    // the cube to your liking better in the future.
  }

  /**
   * Generates the texture coordinates of CheckerCube.
   *
   * @private
   */
  generateUVCoordinates() {

    var v1,v2,v3,v4
    v1 = [1,1]
    v2 = [1,0]
    v3 = [0,1]
    v4 = [0,0]
  //    v7----- v5
  //   /|      /|
  //  v3------v1|
  //  | |     | |
  //  | |v8---|-|v6
  //  |/      |/
  //  v4------v2
    var uvs = [v1,v2,v3, v2,v4,v3,
               v1,v2,v3, v2,v4,v3,
               v1,v2,v3, v2,v4,v3,
               v1,v2,v3, v2,v4,v3,
               v1,v2,v3, v2,v4,v3,
               v1,v2,v3, v2,v4,v3]

    for(var i = 0; i< 36; i++)
    {
      this.vertices[i].uv[0] = uvs[i][0]
      this.vertices[i].uv[1] = uvs[i][1]
    }


    // Recomendations: Remember uv coordinates are defined from 0.0 to 1.0.
  }
}
