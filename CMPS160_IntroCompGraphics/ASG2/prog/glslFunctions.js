/**
 * Sends data to an attribute variable using a buffer.
 *
 * @private
 * @param {Float32Array} data Data being sent to attribute variable
 * @param {Number} dataCount The amount of data to pass per vertex
 * @param {String} attribName The name of the attribute variable
 */
function sendAttributeBufferToGLSL(data, dataCount, attribName) {
  
  var attBuff = gl.createBuffer()

  gl.bindBuffer(gl.ARRAY_BUFFER, attBuff)

  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)

  var a_pos = gl.getAttribLocation(gl.program, attribName)

  gl.vertexAttribPointer(a_pos, 2, gl.FLOAT, false, 0, 0)

  gl.enableVertexAttribArray(a_pos)
}

/**
 * Draws the current buffer loaded. Buffer was loaded by sendAttributeBufferToGLSL.
 *
 * @param {Integer} pointCount The amount of vertices being drawn from the buffer.
 */
function tellGLSLToDrawCurrentBuffer(pointCount) {

  gl.drawArrays(gl.TRIANGLES, 0, pointCount)
}

/**
 * Sends a float value to the specified uniform variable within GLSL shaders.
 * Prints an error message if unsuccessful.
 *
 * @param {float} val The float value being passed to uniform variable
 * @param {String} uniformName The name of the uniform variable
 */
function sendUniformFloatToGLSL(val, uniformName) {
  
  var uname = gl.getUniformLocation(gl.program, uniformName);
  if (uname < 0) 
  {
  	console.log('Fail to get the storage location of ' + uname);
  	return;
  }   
  gl.uniform1f(uname, val);
}

/**
 * Sends an JavaSript array (vector) to the specified uniform variable within
 * GLSL shaders. Array can be of length 2-4.
 *
 * @param {Array} val Array (vector) being passed to uniform variable
 * @param {String} uniformName The name of the uniform variable
 */
function sendUniformVec4ToGLSL(val, uniformName) {

  var uname = gl.getUniformLocation(gl.program, uniformName);
  if (uname < 0) 
  {
  	console.log('Fail to get the storage location of ' + uname);
  	return;
  }   
  if(val.length == 2)
    gl.uniform2f(uname, val[0],val[1]);
  else if(val.length == 3)
    gl.uniform3f(uname, val[0],val[1],val[2]);
  else if(val.length == 4)
    gl.uniform4f(uname, val[0],val[1],val[2],val[3]);
  else
  {
  	console.log('Invalid uniform size');
  	return;
  }
}

/**
 * Sends a float value to the specified attribute variable within GLSL shaders.
 * Prints an error message if unsuccessful.
 *
 * @param {float} val The float value being passed to attribute variable
 * @param {String} attributeName The name of the attribute variable
 */
function sendAttributeFloatToGLSL(val, attributeName) {
  
  var uname = gl.getAttribLocation(gl.program, attributeName);
  if (uname < 0) 
  {
  	console.log('Fail to get the storage location of ' + uname);
  	return;
  }   
  gl.vertexAttrib1f(uname, val);
}

/**
 * Sends an JavaSript array (vector) to the specified attribute variable within
 * GLSL shaders. Array can be of length 2-4.
 *
 * @param {Array} val Array (vector) being passed to attribute variable
 * @param {String} attributeName The name of the attribute variable
 */
function sendAttributeVec4ToGLSL(val, attributeName) {

  var uname = gl.getAttribLocation(gl.program, attributeName);
  if (uname < 0) 
  {
  	console.log('Fail to get the storage location of ' + uname);
  	return;
  }   
  if(val.length == 2)
    gl.vertexAttrib2f(uname, val[0],val[1]);
  else if(val.length == 3)
    gl.vertexAttrib3f(uname, val[0],val[1],val[2]);
  else if(val.length == 4)
    gl.vertexAttrib4f(uname, val[0],val[1],val[2],val[3]);
  else
  {
  	console.log('Invalid attribute size');
  	return;
  }
}