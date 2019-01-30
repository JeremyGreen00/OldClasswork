// Basic Vertex Shader that receives position and size for each vertex (point).
var ASSIGN4_VSHADER = //Can use point light OR directional light
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Normal;\n' +
  'attribute vec4 a_Color;\n' +
  'attribute vec2 a_TexCoord;\n' +

  'uniform   mat4 u_Transform;\n' +
  'uniform   mat4 u_ViewMatrix;\n' +
  'uniform   mat4 u_ProjMatrix;\n' +
  'uniform   mat4 u_MvpMatrix;\n' +
  'uniform   mat4 u_ModelMatrix;\n' + //literally just for fog
  'uniform   mat4 u_NormalMatrix;\n' +
  'uniform   vec4 u_Eye;\n' +     // Position of eye point (world coordinates)

  'varying   vec2 v_TexCoord;\n' +
  'varying   vec4 v_Color;\n' +
  'varying   vec4 v_Normal;\n' +
  'varying   float v_Dist;\n' +

  'void main() {\n' + 
  '  gl_Position = u_MvpMatrix*a_Position;\n' + // Coordinates
  '  v_TexCoord = a_TexCoord;\n' + 
  '  vec4 normal = u_NormalMatrix * a_Normal;\n' +
  '  v_Color = a_Color;\n' + 
  //'  v_Color = vec4(normal.rgb, a_Color.a);\n' + //normal shader
  //'  v_Color = vec4(diffuse + ambient + spec, a_Color.a);\n' + //phong shader
  '  v_Normal = normal;\n' + 
     // Calculate the distance to each vertex from eye point
  //'  v_Dist = distance(u_ModelMatrix * a_Position, u_Eye);\n' +
  '  v_Dist = gl_Position.w;\n' + 
  '}\n';

// Basic Fragment Shader that receives a single one color (point).
var ASSIGN4_FSHADER =
  'precision mediump float;\n' +
  'uniform sampler2D u_Sampler;\n' +

  'varying   vec2 v_TexCoord;\n' +
  'varying   vec4 v_Color;\n' +
  'varying   vec4 v_Normal;\n' +
  'varying   float v_Dist;\n' +

  'uniform   vec3 u_LightColor;\n' +
  'uniform   vec3 u_LightDirection;\n' +
  'uniform   vec3 u_AmbientLight;\n' +
  'uniform   vec3 u_EyeDirection;\n' +
  'uniform   vec3 u_FogColor;\n' + // Color of Fog
  'uniform   vec2 u_FogDist;\n' +  // Distance of Fog (starting point, end point)

  'uniform   bool u_Clicked;\n' + // Mouse is pressed
  'uniform   float u_Alpha;\n' + // Mouse is pressed

  'uniform   bool u_useNormalShader;\n' +

  'void main() {\n' +

  '  float nDotL = max(dot(u_LightDirection, normalize(v_Normal.xyz)), 0.0);\n' +

  // specular calculation
  '  vec3 Vref  = reflect(-u_LightDirection, normalize(v_Normal.xyz));\n' +
  '  float spec = pow( max( dot(Vref, normalize(u_EyeDirection)), 0.0), 120.0 );\n' +

  // Check if player is looking at correcct side
  '  if (dot(Vref, normalize(u_EyeDirection)) <= 0.0) {\n' +
  '    spec = 0.0;\n' +
  '  }\n' +

  // Calculate the color due to diffuse reflection
  '  vec3 diffuse = u_LightColor * v_Color.rgb * nDotL;\n' +      
  // Calculate the color due to ambient reflection
  '  vec3 ambient = u_AmbientLight * v_Color.rgb;\n' +

     // Calculation of fog factor (factor becomes smaller as it goes further away from eye point)
  '  float fogFactor = clamp((u_FogDist.y - v_Dist) / (u_FogDist.y - u_FogDist.x), 0.0, 1.0);\n' +
     // Stronger fog as it gets further: u_FogColor * (1 - fogFactor) + v_Color * fogFactor
  '  vec3 color = mix(u_FogColor, vec3(diffuse + ambient + spec), fogFactor);\n' +

  '  if (u_useNormalShader == true) {\n' +
  '    gl_FragColor = vec4(v_Normal.rgb, v_Color.a);\n' + //normal shader
  '  } else {\n' +
  '    gl_FragColor = vec4(color, u_Alpha);\n' + // Set the color
  '  }\n' +
  //'  gl_FragColor = texture2D(u_Sampler, v_TexCoord) * v_Color;\n' +
  '}\n';

  // Basic Fragment Shader that receives a single one color (point).
var ASSIGN4_FSHADER_TXTR =
  'precision mediump float;\n' +
  'uniform sampler2D u_Sampler;\n' +

  'varying   vec2 v_TexCoord;\n' +
  'varying   vec4 v_Color;\n' +
  'varying   vec4 v_Normal;\n' +
  'varying   float v_Dist;\n' +

  'uniform   vec3 u_LightColor;\n' +
  'uniform   vec3 u_LightDirection;\n' +
  'uniform   vec3 u_AmbientLight;\n' +
  'uniform   vec3 u_EyeDirection;\n' +
  'uniform   vec3 u_FogColor;\n' + // Color of Fog
  'uniform   vec2 u_FogDist;\n' +  // Distance of Fog (starting point, end point)

  'uniform   bool u_Clicked;\n' + // Mouse is pressed
  'uniform   float u_Alpha;\n' + // Mouse is pressed

  'uniform   bool u_useNormalShader;\n' +

  'void main() {\n' +

  '  float nDotL = max(dot(u_LightDirection, normalize(v_Normal.xyz)), 0.0);\n' +

  // specular calculation
  '  vec3 Vref  = reflect(-u_LightDirection, normalize(v_Normal.xyz));\n' +
  '  float spec = pow( max( dot(Vref, normalize(u_EyeDirection)), 0.0), 120.0 );\n' +

  // Check if player is looking at correcct side
  '  if (dot(Vref, normalize(u_EyeDirection)) <= 0.0) {\n' +
  '    spec = 0.0;\n' +
  '  }\n' +

  // Calculate the color due to diffuse reflection
  '  vec3 diffuse = u_LightColor * texture2D(u_Sampler, v_TexCoord).rgb * nDotL;\n' +      
  // Calculate the color due to ambient reflection
  '  vec3 ambient = u_AmbientLight * texture2D(u_Sampler, v_TexCoord).rgb;\n' +

     // Calculation of fog factor (factor becomes smaller as it goes further away from eye point)
  '  float fogFactor = clamp((u_FogDist.y - v_Dist) / (u_FogDist.y - u_FogDist.x), 0.0, 1.0);\n' +
     // Stronger fog as it gets further: u_FogColor * (1 - fogFactor) + v_Color * fogFactor
  '  vec3 color = mix(u_FogColor, vec3(diffuse + ambient + spec), fogFactor);\n' +

  //'  gl_FragColor = vec4(diffuse + ambient + spec, v_Color.a);\n' + // Set the color
  '  if(u_useNormalShader == true) {\n' +
  '    gl_FragColor = vec4(v_Normal.rgb, v_Color.a);\n' + //normal shader
  '  } else {\n' +

  '    if(u_Clicked) {\n' +
  '      gl_FragColor = v_Color;\n' +
  '    } else {\n' +
  '      gl_FragColor = vec4(color, u_Alpha);\n' +
  '    }\n' +
  
  '  }\n' +
  '}\n';

