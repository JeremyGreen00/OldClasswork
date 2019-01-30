/**
 * Responsible for animating the Scene.
 */
function tick() {
  
  // Timer
  var timer = Date.now() * 1.0

  scene.updateAnimation()
  scene.render()

  // Show time to render on page
  sendTextToHTML('This scene rendered in ' + (Date.now() - timer) + ' milliseconds','mlToRenderText')

  requestAnimationFrame(tick)

  // Recomendations: You're going to want to call this at the end of your main()
  // in main.js. requestAnimationFrame() needs to be used here (read the book).
}
