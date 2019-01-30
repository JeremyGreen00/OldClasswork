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
  constructor(size, x, y) {
    super()
    
    this.x = x
    this.y = y

    for(var i = 0; i< 36; i++)
      {this.vertices[i] = new Vertex()}

    this.generateCubeVertices(size)

    this.modelMatrix.setTranslate(this.x, this.y, 0)
    this.modelMatrix.rotate(30,0,0,1)
    this.modelMatrix.scale(size,size,size)

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
   * Updates the animation of the TiltedCube. Should make it rotate.
   */
  updateAnimation() {
    
    this.modelMatrix.rotate(1,1,1,0)

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
