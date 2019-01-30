/**
 * Samples the color of each pixel in an image.
 *
 * @param {Image} image The image whose color data is being sampled
 * @returns {Array} A 1-D array of RGBA values in row-major order
 */
function sampleImageColor(image) {
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
	  if(hm.length != cm.length)
	  {
	  	console.log('heightMap and colorMap do not match in size')
	  	return null
	  }

	  for (var i=0;i<hm.length;i+=4)
	  {
	    var cubeHeight = (hm[i] + hm[i+1] + hm[i+2])/(3*255) + 0.01

	    var rowL = 16

	    var xbox = ( (i / 4) % rowL ) - rowL/2
	    var zbox = Math.floor( i / ( 4 * rowL ) ) - rowL/2
	    //console.log(xbox + ' ' + zbox)

		var txtcb = new Cube(1,-xbox,-1,-zbox)
	    txtcb.color = [cm[i]/255 , cm[i+1]/255 , cm[i+2]/255 , cm[i+3]/255]
	    txtcb.modelMatrix.scale(1,cubeHeight,1)
	    txtcb.modelMatrix.translate(-xbox,1,-zbox)
	    scene.addGeometry(txtcb)
	  }
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
