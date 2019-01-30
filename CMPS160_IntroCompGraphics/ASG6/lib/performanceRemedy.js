var uniformLocations = {};  // A 2-D associative array containing the locations of our uniforms
var attributeLocations = {};  // A 2-D associative array containing the locations of our attributes
var attributeBuffer;

/**
 * Initalizes both attribute buffer and index buffer as global varialbles.
 *
 * @param gl The WebGL rendering context of the Canvas
 */
function initAttributeBuffer(gl) {
  attributeBuffer = gl.createBuffer();
  if (!attributeBuffer) {
    console.log("Failed to create buffers!");
    return;
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, attributeBuffer);
}

/**
 * Saves the uniform and attribute locations of a given shading program.
 * Saved uniforms and attributes will be stored in
 * uniformLocations/attributeLocations and will follow this format for being
 * accessed: uniform/attributeLocations[shaderName][uniform/attributeName]
 *
 * @param gl The WebGL rendering context of the Canvas
 * @param {String} shaderName The name assigned to the shading program (used to access 2-D associative arrays)
 * @param shadingProgram A WebGL shading program
 * @param {Array} uniformList An array of strings containing the names of uniform locations
 * you'd like to save
 * @param {Array} attributeList An array of strings containing the names of attribute locations
 * you'd like to save.
 */
function saveShaderLocations(gl, shaderName, shaderProgram, uniformList, attributeList) {
  uniformLocations[shaderName] = {};
  for (var i = 0; i < uniformList.length; i++) {
    uniformLocations[shaderName][uniformList[i]] = gl.getUniformLocation(shaderProgram, uniformList[i]);
  }

  attributeLocations[shaderName] = {};
  for(var j = 0; j < attributeList.length; j++) {
    attributeLocations[shaderName][attributeList[j]] = gl.getAttribLocation(shaderProgram, attributeList[j]);
  }
}

/**
 * Interleaves multiple arrays of data into one array. Also returns the indices
 * correspnding to the interleaved array.
 *
 * @param {Array} dataArrays An array containing the arrays that need to be interleaved
 * @param {Array} dataCounts An array containing the amount of data passed per vertex
 * within each array that needs to be interleaved. The data counts in this array
 * need to be in the same order as the arrays in dataArrays.
 */
function interleaveDataArrays(dataArrays, dataCounts) {
  var interleavedData = [];
  var indices = [];

  var dataAppearances = {};
  var currentNewIndex = 0;

  var informationCount = dataArrays[0].length / dataCounts[0];
  for (var i = 0; i < informationCount; i++) {
    var vertexData = [];
    for (var j = 0; j < dataArrays.length; j++) {
      var dataFromDataArray = dataArrays[j].slice(i * dataCounts[j], (i + 1) * dataCounts[j]);
      vertexData = vertexData.concat(dataFromDataArray);
    }

    interleavedData = interleavedData.concat(vertexData);
  }

  return [new Float32Array(interleavedData)];
}

/**
 * Interleaves an array of vertex objects into a single array. Also produces
 * the indices for this array and an array of data counts for each vertex
 * parameter. Assumes conflicting data such as color and uv coordinates are
 * not defined simultaneously in a vertex object.
 *
 * @param {Array} vertices An array of vertex objects
 */
function interleaveVertices(vertices) {
  var vertexProperties = [];
  var dataArrays = [];
  var dataCounts = [];
  var usingVec3_4 = [];


  // Determine number of dataArrays and if a vector is being used
  var propertyIndex = 0;
  for (property in vertices[0]) {
    if (vertices[0].hasOwnProperty(property)) {
      if (vertices[0][property] == null) {
        continue;
      }

      if (vertices[0][property] instanceof Array) {
        dataArrays[propertyIndex]= vertices[0][property];
        usingVec3_4[propertyIndex] = false;
        dataCounts[propertyIndex] = vertices[0][property].length;
      }
      else {
        dataArrays[propertyIndex] = Array.from(vertices[0][property].elements);
        usingVec3_4[propertyIndex] = true;
        dataCounts[propertyIndex] = vertices[0][property].elements.length;
      }

      vertexProperties[propertyIndex] = property;
      propertyIndex++;
    }
  }

  for (var i = 1; i < vertices.length; i++) {
    for (var j = 0; j < vertexProperties.length; j++) {
      if (usingVec3_4[j]) {
        dataArrays[j] = dataArrays[j].concat(Array.from(vertices[i][vertexProperties[j]].elements));
      }
      else {
        dataArrays[j] = dataArrays[j].concat(vertices[i][vertexProperties[j]]);
      }
    }
  }

  var answer = interleaveDataArrays(dataArrays, dataCounts);
  answer.push(dataCounts);

  return answer;
}

/**
 * Sends an array of interleaved vertex information the shader.
 *
 * @param {Float32Array} data Data being sent to attribute variable
 * @param {Number} dataCount The amount of data to pass per vertex
 * @param {String} attribName The name of the attribute variable
 */
function sendAttributeDataToGLSL(data, shaderName, dataCounts, attribNames) {
  var FSIZE = data.BYTES_PER_ELEMENT;

  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

  var dataEnd = 0;
  for (var j = 0; j < dataCounts.length; j++) {
    dataEnd += dataCounts[j];
  }
  dataEnd *= FSIZE;

  var currentDataStart = 0;
  for (var i = 0; i < attribNames.length; i++) {

    var attribute = attributeLocations[shaderName][attribNames[i]];
    gl.vertexAttribPointer(attribute, dataCounts[i], gl.FLOAT, false, dataEnd, currentDataStart);
    gl.enableVertexAttribArray(attribute);

    currentDataStart += FSIZE * dataCounts[i];
  }
}
