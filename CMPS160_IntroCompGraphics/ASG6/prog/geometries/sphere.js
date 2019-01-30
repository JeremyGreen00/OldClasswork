/**
 * Specifies a tilted cube which rotates.
 *
 * @author "Your Name"
 * @this {TiltedCube}
 */
class Sphere extends Geometry {
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

    for(var i = 0; i< 16 * 16; i++)
    {
      this.vertices[i] = new Vertex()
    }

    //this.generateVertices()
    //this.generateUVCoordinates()
    //this.generateVectorNormals()

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
  generateVertices() {
    
    for(var i = 0; i< 16; i++)
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

  generateVectorNormals()
  {
    //Normals
    var n1,n2,n3,n4,n5,n6
    n1 = [0,0,1]
    n2 = [1,0,0]
    n3 = [0,0,-1]
    n4 = [-1,0,0]
    n5 = [0,-1,0]
    n6 = [0,1,0]


    var nrm = [n1,n1,n1, n1,n1,n1,
               n2,n2,n2, n2,n2,n2,
               n3,n3,n3, n3,n3,n3,
               n4,n4,n4, n4,n4,n4,
               n5,n5,n5, n5,n5,n5,
               n6,n6,n6, n6,n6,n6]

    for(var i = 0; i< 36; i++)
    {
      this.vertices[i].normal = new Vector3([nrm[i][0], nrm[i][1], nrm[i][2]]);
    }
  }
}
