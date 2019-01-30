
function loadMobile(canvas) {
  if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return;
  }
  const style = document.createElement('style');
  style.innerHTML = `
  body {
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
  }

  canvas {
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }

  input[type=range] {
    -webkit-appearance: none;
  }
  
  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
  }
  
  input[type=range]:focus {
    outline: none;
  }
  
  input[type=range]::-ms-track {
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  /*#############Thumb##############*/
  
  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 24px;
    width: 24px;
    background: #555;
    cursor: pointer;
    margin-top: -12px;
  }
  
  input[type=range]::-moz-range-thumb {
    height: 24px;
    width: 24px;
    background: #555;
    cursor: pointer;
  }
  
  input[type=range]::-ms-thumb {
    height: 24px;
    width: 24px;
    background: #555;
    cursor: pointer;
  }
  /*#############Track##############*/
  
  input[type=range]::-webkit-slider-runnable-track {
    height: 4px;
    cursor: pointer;
    background: #ccc;
  }
  
  input[type=range]:active::-webkit-slider-runnable-track {
    background: #d6d6d6;
  }
  
  input[type=range]::-moz-range-track {
    height: 4px;
    cursor: pointer;
    background: #ccc;
  }
  
  input[type=range]::-ms-track {
    height: 4px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  
  input[type=range]::-ms-fill-lower {
    background: #ccc;
  }
  
  input[type=range]:focus::-ms-fill-lower {
    background: #ddd;
  }
  
  input[type=range]::-ms-fill-upper {
    background: #ccc;
  }
  
  input[type=range]:focus::-ms-fill-upper {
    background: #ddd;
  }
  `;
  document.body.appendChild(style);

  var attrs_to_change = ['pageX', 'pageY', 'screenX', 'screenY', 'offsetX', 'offsetY', 'clientX', 'clientY'];

  function mouseToTouch(event, type) {
    event.preventDefault();
    event.stopImmediatePropagation();

    for (let i = 0; i < event.changedTouches.length; i++) {
      var touch = event.changedTouches[i];
      var newEvent = new Event(type);
      attrs_to_change.forEach(key => {
        newEvent[key] = touch[key];
      });

      newEvent.force = touch.force;
      canvas.dispatchEvent(newEvent);
    }
  }
  canvas.addEventListener('touchstart', e => mouseToTouch(e, 'mousedown'), true);
  canvas.addEventListener('touchend', e => mouseToTouch(e, 'mouseup'), true);
  canvas.addEventListener('touchmove', e => mouseToTouch(e, 'mousemove'), true);
}