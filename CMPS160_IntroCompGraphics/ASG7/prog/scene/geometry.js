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
    this.mvpMatrix = new Matrix4();
    this.normalMatrix = new Matrix4();
    this.shader = null//createShader(gl, ASSIGN4_VSHADER, ASSIGN4_FSHADER) // shading program you will be using to shade this geometry

    this.texture = null
  }

  /**
   * Renders this Geometry within your webGL scene.
   */
  render() {

    //useShader(gl,this.shader)

    if(this.ve == null)
    {
      gl.enable(gl.DEPTH_TEST)
      gl.enable(gl.BLEND)
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)  
      // Init 32 bit arrays
      this.ve = new Float32Array(this.vertices.length*3)
      this.colors = new Float32Array(this.vertices.length*4)
      this.uvs = new Float32Array(this.vertices.length*2)
      this.norms = new Float32Array(this.vertices.length*3)

      // Set arrays
      for (var i = 0; i < this.vertices.length; i++) {
        this.ve[i*3] = (this.vertices[i].points.elements[0])
        this.ve[i*3 + 1] = (this.vertices[i].points.elements[1])
        this.ve[i*3 + 2] = (this.vertices[i].points.elements[2])

        this.colors[i*4] = this.color[0]
        this.colors[i*4 + 1] = this.color[1]
        this.colors[i*4 + 2] = this.color[2]
        this.colors[i*4 + 3] = this.color[3]

        if(this.vertices[i].uv != null)
        {
          this.uvs[i*2] = this.vertices[i].uv[0]
          this.uvs[i*2 + 1] = this.vertices[i].uv[1]
        }

        if(this.vertices[i].normal != null)
        {
          this.norms[i*3] = (this.vertices[i].normal.elements[0])
          this.norms[i*3 + 1] = (this.vertices[i].normal.elements[1])
          this.norms[i*3 + 2] = (this.vertices[i].normal.elements[2])
        }
        else
        {
          if( (i % 3) == 0)
          {
            var vx,vy,vz, ux,uy,uz
            vx = this.vertices[i+1].points.elements[0] - this.vertices[i].points.elements[0]
            vy = this.vertices[i+1].points.elements[1] - this.vertices[i].points.elements[1]
            vz = this.vertices[i+1].points.elements[2] - this.vertices[i].points.elements[2]
            ux = this.vertices[i+2].points.elements[0] - this.vertices[i].points.elements[0]
            uy = this.vertices[i+2].points.elements[1] - this.vertices[i].points.elements[1]
            uz = this.vertices[i+2].points.elements[2] - this.vertices[i].points.elements[2]
            this.norms[i*3] = uz*vy - uy*vz
            this.norms[i*3 + 1] = ux*vz - uz*vx
            this.norms[i*3 + 2] = uy*vx - ux*vy
          }
          else
          {
            this.norms[i*3] = this.norms[(i-1)*3]
            this.norms[i*3 + 1] = this.norms[(i-1)*3 + 1]
            this.norms[i*3 + 2] = this.norms[(i-1)*3 + 2]
          }
        }
      }

      this.vecBuff = gl.createBuffer()
      this.texBuff = gl.createBuffer()
      this.colBuff = gl.createBuffer()
      this.nrmBuff = gl.createBuffer()

      this.vec_pos = gl.getAttribLocation(gl.program, 'a_Position')
      this.tex_pos = gl.getAttribLocation(gl.program, 'a_TexCoord')
      this.col_pos = gl.getAttribLocation(gl.program, 'a_Color')
      this.nrm_pos = gl.getAttribLocation(gl.program, 'a_Normal')

      //Bind data
      gl.bindBuffer(gl.ARRAY_BUFFER, this.vecBuff)
      gl.bufferData(gl.ARRAY_BUFFER, this.ve, gl.STATIC_DRAW)
      gl.vertexAttribPointer(this.vec_pos, 3, gl.FLOAT, false, 0, 0)
      gl.enableVertexAttribArray(this.vec_pos)

      gl.bindBuffer(gl.ARRAY_BUFFER, this.texBuff)
      gl.bufferData(gl.ARRAY_BUFFER, this.uvs, gl.STATIC_DRAW)
      gl.vertexAttribPointer(this.tex_pos, 2, gl.FLOAT, false, 0, 0)
      gl.enableVertexAttribArray(this.tex_pos)

      gl.bindBuffer(gl.ARRAY_BUFFER, this.colBuff)
      gl.bufferData(gl.ARRAY_BUFFER, this.colors, gl.STATIC_DRAW)
      gl.vertexAttribPointer(this.col_pos, 4, gl.FLOAT, false, 0, 0)
      gl.enableVertexAttribArray(this.col_pos)

      gl.bindBuffer(gl.ARRAY_BUFFER, this.nrmBuff)
      gl.bufferData(gl.ARRAY_BUFFER, this.norms, gl.STATIC_DRAW)
      gl.vertexAttribPointer(this.nrm_pos, 3, gl.FLOAT, false, 0, 0)
      gl.enableVertexAttribArray(this.nrm_pos)

      // Get the storage location of u_MvpMatrix
      this.u_modelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
      this.u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');
      this.u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler')
      this.u_NormalMatrix = gl.getUniformLocation(gl.program, 'u_NormalMatrix');
      this.glTextureUnit = eval("gl.TEXTURE" + 0)
    }

    //if(Math.sqrt((camera.position.elements[0]-this.modelMatrix.elements[3])*(camera.position.elements[0]-this.modelMatrix.elements[3]) + 
      //            (camera.position.elements[1]-this.modelMatrix.elements[6])*(camera.position.elements[1]-this.modelMatrix.elements[6]) +
        //          (camera.position.elements[2]-this.modelMatrix.elements[9])*(camera.position.elements[2]-this.modelMatrix.elements[9]))<30)
    //if(camera.projectionMatrix.dot(this.modelMatrix)>0)
    {
      //  Add light info
      gl.uniform3fv(gl.getUniformLocation(gl.program, 'u_LightDirection'), scene.lightDirection.elements);

      //  Add ambient light
      gl.uniform3fv(gl.getUniformLocation(gl.program, 'u_AmbientLight'), scene.ambientLightColor.elements);
      gl.uniform3fv(gl.getUniformLocation(gl.program, 'u_LightColor'), scene.lightColor.elements);

      gl.uniform1f(gl.getUniformLocation(gl.program, 'u_useNormalShader'), useNormShader);
      gl.uniform1f(gl.getUniformLocation(gl.program, 'u_Alpha'), this.color[3]);

      gl.uniform3fv(gl.getUniformLocation(gl.program, 'u_FogColor'), scene.fogColor);
      gl.uniform2fv(gl.getUniformLocation(gl.program, 'u_FogDist'), scene.fogDist);
      gl.uniform4fv(gl.getUniformLocation(gl.program, 'u_Eye'),[(camera.position.elements[0]),
                                                                (camera.position.elements[1]),
                                                                (camera.position.elements[2]),
                                                                1.0]);

      //  Set u_Clicked to false
      //gl.uniform1i(gl.getUniformLocation(gl.program, 'u_Clicked'), 0); // Pass false to u_Clicked

      // Calculate the model view projection matrix
      this.mvpMatrix.set(camera.projectionMatrix).multiply(camera.viewMatrix).multiply(this.modelMatrix);
      // Pass the model view projection matrix to u_MvpMatrix
      gl.uniformMatrix4fv(this.u_MvpMatrix, false, this.mvpMatrix.elements)

      // Pass the model view projection matrix to u_MvpMatrix
      gl.uniformMatrix4fv(this.u_modelMatrix, false, this.modelMatrix.elements)

      // Pass the matrix to transform the normal based on the model matrix to u_NormalMatrix
      this.normalMatrix.setInverseOf(this.modelMatrix);
      this.normalMatrix.transpose();
      gl.uniformMatrix4fv(this.u_NormalMatrix, false, this.normalMatrix.elements);

      gl.bindBuffer(gl.ARRAY_BUFFER, this.vecBuff)
      //gl.bufferData(gl.ARRAY_BUFFER, this.ve, gl.STATIC_DRAW)
      gl.vertexAttribPointer(this.vec_pos, 3, gl.FLOAT, false, 0, 0)
      gl.enableVertexAttribArray(this.vec_pos)

      gl.bindBuffer(gl.ARRAY_BUFFER, this.texBuff)
      //gl.bufferData(gl.ARRAY_BUFFER, this.uvs, gl.STATIC_DRAW)
      gl.vertexAttribPointer(this.tex_pos, 2, gl.FLOAT, false, 0, 0)
      gl.enableVertexAttribArray(this.tex_pos)

      gl.bindBuffer(gl.ARRAY_BUFFER, this.colBuff)
      //gl.bufferData(gl.ARRAY_BUFFER, this.colors, gl.STATIC_DRAW)
      gl.vertexAttribPointer(this.col_pos, 4, gl.FLOAT, false, 0, 0)
      gl.enableVertexAttribArray(this.col_pos)

      gl.bindBuffer(gl.ARRAY_BUFFER, this.nrmBuff)
      //gl.bufferData(gl.ARRAY_BUFFER, this.norms, gl.STATIC_DRAW)
      gl.vertexAttribPointer(this.nrm_pos, 3, gl.FLOAT, false, 0, 0)
      gl.enableVertexAttribArray(this.nrm_pos)

      if(this.texture != null)
      {
        gl.activeTexture(this.glTextureUnit)

        gl.bindTexture(gl.TEXTURE_2D, this.texture)

        gl.uniform1i(this.u_Sampler, this.textureUnit)
      }

      tellGLSLToDrawCurrentBuffer(this.ve.length/3)
    }
  }

  /**
   * Responsible for updating the geometry's modelMatrix for animation.
   * Does nothing for non-animating geometry.
   */
  updateAnimation() {

    return;

    // NOTE: This is just in place so you'll be able to call updateAnimation()
    // on geometry that don't animate. No need to change anything.
  }
}