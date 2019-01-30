// Basic Vertex Shader that receives position and size for each vertex (point).
var ASSIGN4_VSHADER =
  'attribute vec4 a_Position;\n' +
  'uniform mat4   u_Transform;\n' +
  'attribute vec2 a_TexCoord;\n' +
  'attribute vec4 a_Color;\n' +
  'varying vec2   v_TexCoord;\n' +
  'varying vec4   v_Color;\n' +
  'void main() {\n' + 
  '  gl_Position = u_Transform*a_Position;\n' + // Coordinates
  '  v_TexCoord = a_TexCoord;\n' + 
  '  v_Color = a_Color;\n' +
  '}\n';

// Basic Fragment Shader that receives a single one color (point).
var ASSIGN4_FSHADER =
  'precision mediump float;\n' +
  'uniform sampler2D u_Sampler;\n' +
  'varying vec2 v_TexCoord;\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  '  gl_FragColor = v_Color;\n' + // Set the color
  //'  gl_FragColor = texture2D(u_Sampler, v_TexCoord) * v_Color;\n' +
  '}\n';

  // Basic Fragment Shader that receives a single one color (point).
var ASSIGN4_FSHADER_TXTR =
  'precision mediump float;\n' +
  'uniform sampler2D u_Sampler;\n' +
  'varying vec2 v_TexCoord;\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  //'  gl_FragColor = v_Color;\n' + // Set the color
  '  gl_FragColor = texture2D(u_Sampler, v_TexCoord);\n' +
  '}\n';
