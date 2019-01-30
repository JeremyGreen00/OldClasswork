/**
 * Specifies the geometry contained within an OBJ file. A subclass of Geometry.
 * NOTE: The geometry is transformed to display correctly using its modelMatrix.
 *
 * @author Alfredo Rivero
 * @this {LoadedOBJ}
 */
class MyOBJ extends LoadedOBJ {
  /**
   * Constructor for LoadedOBJ
   *
   * @constructor
   * @param {String} objStr An OBJ file in string form
   * @returns {LoadedOBJ} Constructed LoadedOBJ
   */
  constructor(objStr, imgpath) {
    super(objStr);

    this.txtrpth = imgpath

    if (imgpath != null) 
    {
      var parent = this

      create2DTexture(imgpath,gl.LINEAR, gl.NEAREST, gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE, 
        function(e) {parent.texture = e})
    }
    else
    {
      this.texture = null
    }
  }

  /**
   * Responsible for updating the geometry's modelMatrix for animation.
   * Does nothing for non-animating geometry.
   */
  updateAnimation() {

    //this.modelMatrix.rotate(1,0,1,0)
    this.x = this.modelMatrix.elements[0]
    this.y = this.modelMatrix.elements[1]
    this.z = this.modelMatrix.elements[2]

  }
}
