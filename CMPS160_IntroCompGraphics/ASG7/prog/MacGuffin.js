/**
 * Specifies the geometry contained within an OBJ file. A subclass of Geometry.
 * NOTE: The geometry is transformed to display correctly using its modelMatrix.
 *
 * @author Alfredo Rivero
 * @this {LoadedOBJ}
 */
class MacGuffin extends MyOBJ {
  /**
   * Constructor for LoadedOBJ
   *
   * @constructor
   * @param {String} objStr An OBJ file in string form
   * @returns {LoadedOBJ} Constructed LoadedOBJ
   */
  constructor(objStr, imgpath, itemName) {
    super(objStr,imgpath);

    this.itemName = itemName

    this.u_Clicked = gl.getUniformLocation(gl.program, 'u_Clicked');
    this.canClick = true
    this.wasClicked = false;
  }

  /**
   * Responsible for updating the geometry's modelMatrix for animation.
   * Does nothing for non-animating geometry.
   */
  updateAnimation() {

    

    if(this.wasClicked && this.countdown>=0)
    {
      this.modelMatrix.scale(1.01,1.01,1.01)
      this.modelMatrix.rotate(10,0,1,0)
      this.countdown -= 1
      this.color[3] -= 0.01
    }
    if(this.countdown<=0)
    {
      this.modelMatrix.setScale(0,0,0)
    }
    else
      this.modelMatrix.rotate(1,0,1,0)

    if(mouseDown && this.canClick)
    {
      this.canClick = false
      if(this.check(gl, gl.canvas.width/2, gl.canvas.height/2, this.u_Clicked))
      {
        console.log("Object PICKED: " + this.itemName)
        this.wasClicked = true
        this.countdown = 60
      }
    }
    if(!mouseDown) this.canClick = true
  }

  check(gl, x, y, u_Clicked) 
  {
    var picked = false;
    gl.uniform1i(gl.getUniformLocation(gl.program, 'u_Clicked'), 1);  // Pass true to u_Clicked
    this.render()//draw(gl, n, currentAngle, viewProjMatrix, u_MvpMatrix); // Draw cube with red
    //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);     // Clear buffers
    //gl.drawElements(gl.TRIANGLES, this.ve.length/3, gl.UNSIGNED_BYTE, 0);   // Draw
    // Read pixel at the clicked position
    var pixels = new Uint8Array(4); // Array for storing the pixel value
    gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

    if (pixels[0] == this.color[0] * 255 &&
        pixels[1] == this.color[1] * 255 &&
        pixels[2] == this.color[2] * 255) // The mouse in on cube if R(pixels[0]) is 255
      picked = true;

    gl.uniform1i(gl.getUniformLocation(gl.program, 'u_Clicked'), 0);  // Pass false to u_Clicked(rewrite the cube)
    //draw(gl, n, currentAngle, viewProjMatrix, u_MvpMatrix); // Draw the cube
    
    return picked;
  }
}