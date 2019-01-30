/**
 * Responsible for animating the Scene.
 */
var framecount = 0
var timer = Date.now()

function tick() {
  
  // Timer
  if(Date.now() - timer>=1000) 
  {
	// Show time to render on page
	sendTextToHTML('This scene rendered at ' + framecount + ' fps','mlToRenderText')
  	timer = Date.now()
  	framecount = 0
  }
  else
  {
	  framecount++;
  }

  camera.setProjection(0)//document.getElementById('ProjType').value)

  scene.updateAnimation()
  camera.updateViewMatrix()
  scene.render()

  requestAnimationFrame(tick)

  // Recomendations: You're going to want to call this at the end of your main()
  // in main.js. requestAnimationFrame() needs to be used here (read the book).
}
