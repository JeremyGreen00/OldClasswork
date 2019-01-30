
class scene {
  constructor() {
    this.verts = []
    this.colors = []
    this.i = 0
  }
}

class Geometry {
	constructor(data) {
    this.verts = new Float32Array(data)
  }
  // Getter
  get points() {
    return this.verts
  }
  get size() {
    return this.verts.length
  }
}

class Triangle extends Geometry {
    constructor(x,y,size) {
    var l = size
    super([x+l,y-l, x-l,y-l, x,y+l])
  }
}

class Square extends Geometry {
	constructor(x,y,size) {
    var l = size
    super([x+l,y-l, x-l,y-l, x+l,y+l,  x-l,y+l, x+l,y+l, x-l,y-l])
  }
} 

class Circle extends Geometry {
	constructor(x,y,size) {
	var l = size
	var pts = 2*Math.PI/document.getElementById('circle_detail').value
    var arr = []
    for (var i = 0; i < 2*Math.PI; i+=pts) {
      arr.push.apply(arr,[x,y, x+l*Math.sin(i),y+l*Math.cos(i), x+l*Math.sin(i+pts),y+l*Math.cos(i+pts)])
    }
    super(arr)
  }
}