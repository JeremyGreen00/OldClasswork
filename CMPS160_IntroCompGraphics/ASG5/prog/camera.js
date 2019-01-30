/**
 * Specifies a camera in 3D space. Used by scene.
 */
class Camera {
    /**
    * Specifies a camera in 3D space. Used by scene.
    */
    constructor() {
        this.position = new Vector3([0, 0, -4]);
        this.center = new Vector3([0, 0, -1]);
        this.up = new Vector3([0, 1, 0]);

        this.projectionMatrix = new Matrix4();
        this.viewMatrix = new Matrix4();

        //this.u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix')
        this.anglex = Math.PI/2
        this.angley = Math.PI/2
    }

    /**
    * Rotates the camera.
    *
    * @param angle The angle of rotation
    * @param x The x-direction of your rotation
    * @param y The x-direction of your rotation
    * @param z The x-direction of your rotation
    */
    rotate(angle, x, y, z) {
      // YOUR CODE HERE
      this.anglex -= x * (angle * Math.PI / 180)
      this.angley += y * (angle * Math.PI / 180)
      this.center.elements[0] = Math.sin(this.angley)*Math.cos(this.anglex) + this.position.elements[0]
      this.center.elements[1] = Math.cos(this.angley)                       + this.position.elements[1]
      this.center.elements[2] = Math.sin(this.angley)*Math.sin(this.anglex) + this.position.elements[2]
    }

    /**
    * Rotates the camera.
    *
    * @param distance The distance of camera movement
    * @param x The x-direction of your rotation
    * @param y The x-direction of your rotation
    * @param z The x-direction of your rotation
    */
    move(distance, x, y, z) {
      // YOUR CODE HERE
      this.position.elements[0] += distance * z * Math.cos(this.anglex) + distance * x * Math.cos(this.anglex + Math.PI/2)
      this.position.elements[1] += distance * y
      this.position.elements[2] += distance * z * Math.sin(this.anglex) + distance * x * Math.sin(this.anglex + Math.PI/2)

      this.center.elements[0] += distance * z * Math.cos(this.anglex) + distance * x * Math.cos(this.anglex + Math.PI/2)
      this.center.elements[1] += distance * y
      this.center.elements[2] += distance * z * Math.sin(this.anglex) + distance * x * Math.sin(this.anglex + Math.PI/2)
    }

    /**
    * Changes the projection. Can be orthographic or perspective.
    *
    * @param {String} perspectiveType The type of projection
    */
    setProjection(projectionType) {

      if(projectionType == 'perspective')
      {
        this.projectionMatrix.setPerspective(document.getElementById('fov').value * 1, 
                                            canvas.width/canvas.height, 
                                            document.getElementById('near').value * 1 + 0.01, 
                                            document.getElementById('far').value * 1)
      }
      else if(projectionType == 'ortho')
      {
        this.projectionMatrix.setOrtho(-1, 1, -1, 1,
                                        document.getElementById('near').value * 1 + 0.01, 
                                        document.getElementById('far').value * 1 + 0.01)
      }
    }

    /**
    * Updates the view matrix of your camera.
    */
    updateViewMatrix() {

        this.viewMatrix.setLookAt(
            this.position.elements[0],
            this.position.elements[1],
            this.position.elements[2],
            this.center.elements[0],
            this.center.elements[1],
            this.center.elements[2],
            this.up.elements[0],
            this.up.elements[1],
            this.up.elements[2]);

        //gl.uniformMatrix4fv(this.u_ViewMatrix, false, this.viewMatrix.elements)
    }
}
