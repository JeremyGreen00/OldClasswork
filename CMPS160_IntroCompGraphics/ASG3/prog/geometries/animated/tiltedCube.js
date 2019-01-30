/**
 * Specifies a tilted cube which rotates.
 *
 * @author "Your Name"
 * @this {TiltedCube}
 */
class TiltedCube extends Geometry {
  /**
   * Constructor for TiltedCube.
   *
   * @constructor
   * @returns {TiltedCube} Geometric object created
   */
  constructor(size) {
    
    super()
    for(var i = 0; i< 36; i++)
      {this.vertices[i] = new Vertex()}

    this.generateCubeVertices(size)

    // Recommendations: Might want to tilt your cube at 30 degrees relative to
    // the z-axis here. Pretty good tilt that lets us see that it's a cube.
  }

  /**
   * Generates the vertices of TiltedCube. Just a regular cube.
   *
   * @private
   * @param {Number} size The size of the tilted cube.
   */
  generateCubeVertices(size) {
    

    var pts = [1,1,1, 1,-1,1, -1,-1,1, 1,1,1, -1,-1,1, -1,1,1,
               1,1,1, -1,1,1, 1,1,-1, -1,1,1, -1,1,-1, 1,1,-1,
               1,1,1, 1,1,-1, 1,-1,1, 1,-1,1, 1,1,-1, -1,-1,1,

               1,1,1, 1,-1,1, -1,-1,1, 1,1,1, -1,-1,1, -1,1,1,
               1,1,1, -1,1,1, 1,1,-1, -1,1,1, -1,1,-1, 1,1,-1,
               1,1,1, 1,1,-1, 1,-1,1, 1,-1,1, 1,1,-1, -1,-1,1]

    var mult = 1

    for(var i = 0; i< 36; i++)
    {
      if(i>12) mult = -1

      this.vertices[i].points = new Vector3([pts[3*i] * mult * size, pts[3*i +1] * mult * size, pts[3*i +2] * mult * size]);
    }
    this.modelMatrix.setRotate(30,0.5,0.5,0.5)
    // Recommendations: Might want to generate your cube vertices so that their
    // x-y-z values are combinations of 1.0 and -1.0. Allows you to scale the
    // the cube to your liking better in the future.
  }

  /**
   * Updates the animation of the TiltedCube. Should make it rotate.
   */
  updateAnimation() {
    
    this.modelMatrix.rotate(1,0,0.5,0)

    // Recommendations: While your cube will only need to be at the origin, I'd
    // recommend coding it so it spins in place when placed anywhere on your
    // canvas. Why? Because you might need to have more than one spinning cube
    // in different positions on a future assignment ;)
    //
    // Keep in mind that no rendering should be done here. updateAnimation()'s
    // purpose is to update the geometry's modelMatrix and any other variables
    // related to animation. It should be the case that after I call
    // updateAnimation() I should be able to call render() elsewhere and have my
    // geometry complete a frame of animation.
  }
}
