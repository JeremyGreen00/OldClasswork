/**
 * A cube with a single textured applied in multiple different ways. A subclass
 * of TiltedCube.
 *
 * @author "Your Name Here"
 * @this {MultiTextureCube}
 */
class MultiTextureCube extends TiltedCube {
  /**
   * Constructor for MultiTextureCube
   *
   * @constructor
   * @param {String} texturePath The filepath/URL of the image used as a texture
   */
  constructor(texturePath) {
    super(0.25,0.5,0)

    this.shader = createShader(gl, ASSIGN4_VSHADER, ASSIGN4_FSHADER_TXTR)
    this.generateUVCoordinates()

    if (texturePath == null) this.shader = createShader(gl, ASSIGN4_VSHADER, ASSIGN4_FSHADER)
    else this.shader = createShader(gl, ASSIGN4_VSHADER, ASSIGN4_FSHADER_TXTR)

    this.txtrpth = texturePath
    // Recomendations: Might want to call generateUVCoordinates here.
  }

  /**
   * Generates the texture coordinates of CheckerCube.
   *
   * @private
   */
  generateUVCoordinates() {
    
    var v1,v2,v3,v4, v11,v21,v31,v41, v12,v22,v32,v42, v13,v23,v33,v43, v14,v24,v34,v44 
    v1 = [1,1]
    v2 = [1,0]
    v3 = [0,1]
    v4 = [0,0]

    v11 = [1,1]
    v21 = [1,0.5]
    v31 = [0,1]
    v41 = [0,0.5]

    v12 = [1,0.5]
    v22 = [1,0]
    v32 = [0,0.5]
    v42 = [0,0]

    v13 = [2,1]
    v23 = [2,0]
    v33 = [0,1]
    v43 = [0,0]

    v14 = [3,3]
    v24 = [3,0]
    v34 = [0,3]
    v44 = [0,0]
  //    v7----- v5
  //   /|      /|
  //  v3------v1|
  //  | |     | |
  //  | |v8---|-|v6
  //  |/      |/
  //  v4------v2
    var uvs = [v1,v2,v3, v2,v4,v3,
               v11,v21,v31, v21,v41,v31,
               v12,v22,v32, v22,v42,v32,
               v13,v23,v33, v23,v43,v33,
               v1,v2,v3, v2,v4,v3,
               v14,v24,v34, v24,v44,v34]

    for(var i = 0; i< 36; i++)
    {
      this.vertices[i].uv[0] = uvs[i][0]
      this.vertices[i].uv[1] = uvs[i][1]
    }


    // Recomendations: Remember uv coordinates are defined from 0.0 to 1.0.
  }

  /**
   * Renders MultiTextureCube.
   */
  render() {
    
    useShader(gl,this.shader)

    if(this.ve == null)
    {
      this.ve = new Float32Array(this.vertices.length*3)
      this.colors = new Float32Array(this.vertices.length*4)
      this.uvs = new Float32Array(this.vertices.length*2)


      for (var i = 0; i < this.vertices.length; i++) {
        this.ve[i*3] = (this.vertices[i].points.elements[0])
        this.ve[i*3 + 1] = (this.vertices[i].points.elements[1])
        this.ve[i*3 + 2] = (this.vertices[i].points.elements[2])

          this.colors[i*4] = this.color[0]
          this.colors[i*4 + 1] = this.color[1]
          this.colors[i*4 + 2] = this.color[2]
          this.colors[i*4 + 3] = this.color[3]

        this.uvs[i*2] = this.vertices[i].uv[0]
        this.uvs[i*2 + 1] = this.vertices[i].uv[1]
      }
      var parent = this
      create2DTexture(this.txtrpth, gl.LINEAR, gl.NEAREST, gl.REPEAT, gl.REPEAT, 
          function(e) {parent.texture = e})
    }

    sendAttributeBufferToGLSL(this.ve, this.ve.length/3, 'a_Position')
    sendAttributeBufferToGLSL(this.colors, this.colors.length/4, 'a_Color')
    sendAttributeBufferToGLSL(this.uvs, this.uvs.length/2, 'a_TexCoord')

    send2DTextureToGLSL(this.texture, 0, 'u_Sampler')

    sendUniformMatToGLSL(this.modelMatrix, 'u_Transform')

    tellGLSLToDrawCurrentBuffer(this.ve.length/3)

    // Recomendations: This will be the first time render will need to be
    // overloaded. Why? Because this is a textured geometry, not a geometry
    // which relies on a color value. Might want to use
  }

}
