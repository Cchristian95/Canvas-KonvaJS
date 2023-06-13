//variables
var shape = [];
var selectedShape = null;
var shapeColor = 'black';
var strokeWidth = 3;
var id = 0;

var tr = new Konva.Transformer();
// layer.add(tr);
tr.nodes([]);

var width = window.innerWidth;
var height = 500;

var stage = new Konva.Stage({
  container: 'container',
  width: width,
  height: height,
});

var layer = new Konva.Layer();
stage.add(layer);

// add a new feature, lets add ability to draw selection rectangle
var selectionRectangle = new Konva.Rect({
  fill: 'rgba(0,0,255,0.3)',
  visible: false,
});
layer.add(selectionRectangle);

//Event Listener
//Boton toolbar
document.getElementById('rectBtn').addEventListener('click', createRect);
document.getElementById('circleBtn').addEventListener('click', createCircle);
document.getElementById('triangleBtn').addEventListener('click', createTriangle);
document.getElementById('deleteBtn').addEventListener('click', removeShape);
// document.getElementById('deleteAllBtn').addEventListener('click', deleteAll);

//Change of color
document.getElementById('fillBtn').addEventListener('click', selectFill);
document.getElementById('redColor').addEventListener('click', changeColorRed);
document.getElementById('blueColor').addEventListener('click', changeColorBlue);
document.getElementById('greenColor').addEventListener('click', changeColorGreen);
document.getElementById('yellowColor').addEventListener('click', changeColorYellow);

//Change of Stroke
document.getElementById('strokeWidth').addEventListener('click', changeStroke);
document.getElementById('strokeBtn').addEventListener('click', colorStroke);

//Events
// by default select all shapes
var x1, y1, x2, y2;
stage.on('mousedown touchstart', (e) => {
  // do nothing if we mousedown on any shape
  if (e.target !== stage) {
    return;
  }
  e.evt.preventDefault();
  x1 = stage.getPointerPosition().x;
  y1 = stage.getPointerPosition().y;
  x2 = stage.getPointerPosition().x;
  y2 = stage.getPointerPosition().y;

  selectionRectangle.visible(true);
  selectionRectangle.width(0);
  selectionRectangle.height(0);
});

stage.on('mousemove touchmove', (e) => {
  // do nothing if we didn't start selection
  if (!selectionRectangle.visible()) {
    return;
  }
  e.evt.preventDefault();
  x2 = stage.getPointerPosition().x;
  y2 = stage.getPointerPosition().y;

  selectionRectangle.setAttrs({
    x: Math.min(x1, x2),
    y: Math.min(y1, y2),
    width: Math.abs(x2 - x1),
    height: Math.abs(y2 - y1),
  });
});

stage.on('mouseup touchend', (e) => {
  // do nothing if we didn't start selection
  if (!selectionRectangle.visible()) {
    return;
  }
  e.evt.preventDefault();
  // update visibility in timeout, so we can check it in click event
  setTimeout(() => {
    selectionRectangle.visible(false);
  });

  var shapes = stage.find('.rect,.circle,.triangle');
  var box = selectionRectangle.getClientRect();
  var selected = shapes.filter((shape) =>
    Konva.Util.haveIntersection(box, shape.getClientRect())
  );
  tr.nodes(selected);
});

// clicks should select/deselect shapes
stage.on('click tap', function (e) {
  // if we are selecting with rect, do nothing
  if (selectionRectangle.visible()) {
    console.log("En Stage");
    selectedShape = null;
    return;
  }

  // if click on empty area - remove all selections
  if (e.target === stage) {
    tr.nodes([]);
    return;
  }

  // do nothing if clicked NOT on our shapes
  if (!e.target.hasName('rect') || !e.target.hasName('circle') || !e.target.hasName('triangle')) {
    selectShape(e);
    console.log(e.target);
  }

  // do we pressed shift or ctrl?
  const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
  const isSelected = tr.nodes().indexOf(e.target) >= 0;

  if (!metaPressed && !isSelected) {
    tr.nodes([e.target]);
  } else if (metaPressed && isSelected) {
    const nodes = tr.nodes().slice();
    nodes.splice(nodes.indexOf(e.target), 1);
    tr.nodes(nodes);
  } else if (metaPressed && !isSelected) {
    const nodes = tr.nodes().concat([e.target]);
    tr.nodes(nodes);
  }
});

// Create shapes
// Create rect
function createRect() {
  id += 1;
  console.log("ShapeRect");
  rect1 = new Konva.Rect({
    id: id,
    x: 60,
    y: 80,
    width: 100,
    height: 60,
    fill: 'yellow',
    name: 'rect',
    strokeWidth: strokeWidth,
    stroke: shapeColor,
    shadowColor: "black",
    shadowBlur: 15,
    shadowOpacity: 0.5,
    draggable: true,
  });
  layer.add(rect1);
  layer.add(tr);
  return

}

// Create circle
function createCircle() {
  id += 1;
  console.log("ShapeCircle");
  circle1 = new Konva.Circle({
    id: id,
    x: 220,
    y: 110,
    radius: 50,
    width: 100,
    height: 80,
    fill: 'blue',
    strokeWidth: strokeWidth,
    stroke: shapeColor,
    name: 'circle',
    shadowColor: "black",
    shadowBlur: 15,
    shadowOpacity: 0.5,
    draggable: true
  });
  layer.add(circle1);
  layer.add(tr);
  return
}

// Create triangle
function createTriangle() {
  id += 1;
  console.log("ShapeTriangle")
  triangle1 = new Konva.RegularPolygon({
    id: id,
    x: 320,
    y: 120,
    sides: 3,
    radius: 50,
    fill: 'green',
    name: 'triangle',
    strokeWidth: strokeWidth,
    stroke: shapeColor,
    shadowColor: "black",
    shadowBlur: 15,
    shadowOpacity: 0.5,
    draggable: true
  });
  layer.add(triangle1);
  layer.add(tr);
  console.log(stage);
  return
}

//Delete all
// function  deleteAll(){
//   layer.children.forEach(element => {
//     if (element != null) {
//       element.destroy();
//     }
//   });
// }

// Erase shapes
function removeShape() {
  layer.children.forEach(element => {
    if (element.attrs.id === selectedShape) {
      element.destroy();
      selectedShape = null
      console.log("Eliminado ", selectedShape);
    }
  });
}

//Select Stroke or fill
// Chage stroke
function colorStroke() {
  console.log('Color seleccionado', shapeColor)
  layer.children.forEach(element => {
    if (element.attrs.id === selectedShape) {
      element.attrs.stroke = shapeColor;
    }
  });
}

var width = document.getElementById('strokeWidth');
function changeStroke() {
  console.log('Rango seleccionado', width.value);
  layer.children.forEach(element => {
    if (element.attrs.id === selectedShape) {
      console.log(width.value);
        element.attrs.strokeWidth = width.value;
    }
  });
}

// Change Color wit picker
function selectFill() {
  console.log('Entro con color ', shapeColor)
  layer.children.forEach(element => {
    if (element.attrs.id === selectedShape) {
      element.attrs.fill = shapeColor;
    }
  });
}

// Change Color
function changeColorRed() {
  console.log("Entro a seccion red");
  layer.children.forEach(element => {
    if (element.attrs.id === selectedShape) {
      element.attrs.fill = 'red';
      console.log("cambio color")
    }
  });
}
function changeColorBlue() {
  console.log("Entro a seccion blue");
  layer.children.forEach(element => {
    if (element.attrs.id === selectedShape) {
      element.attrs.fill = 'blue';
    }
  });
}
function changeColorGreen() {
  console.log("Entro a seccion green");
  layer.children.forEach(element => {
    if (element.attrs.id === selectedShape) {
      element.attrs.fill = 'green';
    }
  });
}
function changeColorYellow() {
  console.log("Entro a seccion yellow");
  layer.children.forEach(element => {
    if (element.attrs.id === selectedShape) {
      element.attrs.fill = 'yellow';
    }
  });
}

//Select shapes
function selectShape(e) {
  deselectShape();
  const id = e.target.attrs.id;
  selectedShape = id;
  console.log('Figura seleccionada:', selectedShape);
  layer.draw();
}

//Deselect shapes
function deselectShape() {
  if (selectedShape) {
    selectedShape = null;
    layer.draw();
  }
}




