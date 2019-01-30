/**
 * Samples the color of each pixel in an image.
 *
 * @param {Image} image The image whose color data is being sampled
 * @returns {Array} A 1-D array of RGBA values in row-major order
 */
function sampleImageColor(image) {
  console.log("Loading " + image)
  var canvas = document.createElement('canvas');

  canvas.height = image.height;
  canvas.width = image.width;
  console.log(canvas);
  var context = canvas.getContext('2d');
  context.drawImage(image, 0, 0);

  var colorData = context.getImageData(0, 0, image.width, image.height).data;

  return colorData;
}

function generateMap(heightMapPath,colorMapPath)
{

  var hm
  var cm
  var hloaded = false
  var cloaded = false
  var himage = new Image()  // Create an image object
  var cimage = new Image()  // Create an image object
  var genmap = function()
  {
  	if(cloaded && hloaded)
  	{
      var timer = Date.now()
    console.log("generating map")
  	  if(hm.length != cm.length)
  	  {
  	  	console.log('heightMap and colorMap do not match in size')
  	  	return null
  	  }
      var ground = new Cube(80,0,-1,0,'external/textures/grass.jpg')
      ground.modelMatrix.scale(1,0.001,1)
      ground.color = [1,1,1,1]
      scene.addGeometry(ground)
      for(var i = 0; i< 36; i++)
      {
        ground.vertices[i].uv[0] *= 100
        ground.vertices[i].uv[1] *= 100
      }

      //ground = new Cube(0.1,0,0,0)
      //ground.color = [1,1,1,0.5]
      //scene.addGeometry(ground)

      var rowL = Math.sqrt(hm.length)/2
      console.log(Math.sqrt(hm.length)/2)

  	  for (var i=0; i<hm.length; i+=4)
  	  {

  	    var cubeHeight = (hm[i] + hm[i+1] + hm[i+2])/(3*255) + 0.01

  	    var xbox = ( (i / 4) % rowL ) - rowL/2
  	    var zbox = Math.floor( i / ( 4 * rowL ) ) - rowL/2

    		var txtcb// = new Cube(1,-xbox*2,-1,-zbox*2,'external/textures/merge3d.jpg')
        if(cubeHeight <0.1)
        {
          /*txtcb = new Cube(1,0,0,0,'external/textures/grass_lite.jpg')

          txtcb.modelMatrix.translate(-xbox*2,-1,-zbox*2)
          txtcb.color = [cm[i]/255 , cm[i+1]/255 , cm[i+2]/255 , cm[i+3]/255]
          txtcb.modelMatrix.scale(1,cubeHeight,1)
          txtcb.modelMatrix.translate(0,1,0)

          scene.addGeometry(txtcb) //*/
        }
        else if(cm[i] >250 && cm[i+1] >250 && cm[i+2] >250)
        {
          var whichtree = Math.random()
          if(whichtree < 0.3)
          {
            txtcb = new MyOBJ(tree1)
            txtcb.modelMatrix.translate(85, -3,-45)
            //txtcb.modelMatrix.rotate(Math.random()*360,0,1,0)
            txtcb.modelMatrix.translate(-xbox*9, 0,-zbox*9)
            txtcb.modelMatrix.scale(20,cubeHeight*40,20)
          }
          else if(whichtree < 0.7)
          {
            txtcb = new MyOBJ(tree2)
            txtcb.modelMatrix.translate(70, -3,0)
            //txtcb.modelMatrix.rotate(Math.random()*360,0,1,0)
            txtcb.modelMatrix.translate(-xbox*9, 0,-zbox*9)
            txtcb.modelMatrix.scale(20,cubeHeight*40,20)
          }
          else
          {
            txtcb = new MyOBJ(tree3)
            txtcb.modelMatrix.translate(65, -3,40)
            //txtcb.modelMatrix.rotate(Math.random()*360,0,1,0)
            txtcb.modelMatrix.translate(-xbox*9, 0,-zbox*9)
            txtcb.modelMatrix.scale(20,cubeHeight*40,20)
          }

          txtcb.color = [0.1 , Math.random() , 0.1 , 1.0]

          scene.addGeometry(txtcb)
        }
        else if(cm[i] >200 && cm[i+1] >200)
        {
          txtcb = new Cube(1,0,0,0)

          txtcb.modelMatrix.translate(-xbox*2,-1,-zbox*2)
          txtcb.modelMatrix.scale(1,0.5,1)
          txtcb.color = [cm[i]/255 , cm[i+1]/255 , cm[i+2]/255 , cm[i+3]/255]

          scene.addGeometry(txtcb)

          txtcb = new MacGuffin(teapot,'external/textures/TeapotTex.png', 'teapot quest')

          //txtcb.modelMatrix.scale(0.25,0.25,0.25)
          txtcb.modelMatrix.translate(-xbox*3,0,-zbox*3)
          txtcb.color = [cm[i]/255 , cm[i+1]/255 , cm[i+1]/255 , 1.0]

          scene.addGeometry(txtcb)
        }
        else if(cm[i] >200)
        {
          txtcb = new Cube(1,0,0,0,'external/textures/wall.jpg')

          txtcb.modelMatrix.translate(-xbox*2,-1,-zbox*2)
          txtcb.color = [cm[i]/255 , cm[i+1]/255 , cm[i+2]/255 , cm[i+3]/255]
          txtcb.modelMatrix.scale(1,cubeHeight,1)
          txtcb.modelMatrix.translate(0,1,0)

          scene.addGeometry(txtcb)
        }
        else if(cm[i+2] >200)
        {
          txtcb = new Cube(1,0,0,0,'external/textures/tree.jpg')

          txtcb.modelMatrix.translate(-xbox*2,-1,-zbox*2)
          txtcb.color = [cm[i]/255 , cm[i+1]/255 , cm[i+2]/255 , cm[i+3]/255]
          txtcb.modelMatrix.scale(1,cubeHeight,1)
          txtcb.modelMatrix.translate(0,1,0)

          scene.addGeometry(txtcb)
        }
    	}
    console.log("Done generating map")
  	}
  }

  // Register the event handler to be called on loading an image 
  himage.onload = function(){
    hm = sampleImageColor(himage)
    hloaded = true
    genmap()
  }
  // Register the event handler to be called on loading an image 
  cimage.onload = function(){
    cm = sampleImageColor(cimage)
    cloaded = true
    genmap()
  }

  himage.src = heightMapPath
  cimage.src = colorMapPath
}
