
//Creacion de formas

function createRect() {
    console.log("ShapeRect");
      rect1 = new Konva.Rect({
        x: 60,
        y: 80,
        width: 100,
        height: 60,
        fill: 'yellow',
        name: 'shape',
        strokeWidth: 5,
        stroke: 'red',
        shadowColor: "black",
        shadowBlur: 15,
        shadowOpacity: 0.5,
        draggable: true,
      });
      layer.add(rect1);
      shape.push(['Rect']);
      console.log(shape);
      return shape;
      
    }
    function createCircle() {
      console.log("ShapeCircle");
      circle1 =  new Konva.Circle({
        x: 220,
        y: 110,
        radius: 50,
        width: 100,
        height: 80,
        fill: 'blue',
        strokeWidth: 5,
        stroke: 'red',
        name: 'shape',
        shadowColor: "black",
        shadowBlur: 15,
        shadowOpacity: 0.5,
        draggable: true
      });
      layer.add(circle1);
      shape.push(['Circle']);
      console.log(shape);
      return shape;
  }
  function createTriangle() {
    console.log("ShapeTriangle")
      triangle1 = new Konva.RegularPolygon({
        x: 320,
        y: 120,
        sides: 3,
        radius: 50,
        fill: 'green',
        name: 'shape',
        strokeWidth: 5,
        stroke: 'red',
        shadowColor: "black",
        shadowBlur: 15,
        shadowOpacity: 0.5,
        draggable: true
      });
      layer.add(triangle1);
      shape.push (['Triangle']);
      console.log(shape);
      return triangle1;
  }

  // Función para eliminar una forma
function removeShape() {
  // alert('Estas seguro de eliminar');
  console.log("Eliminar ", selectedShape)
  if(selectedShape){
    console.log(selectedShape);
    selectedShape.destroy();
    layer.draw();
    console.log("sin", shape)
  };
  console.log("sin2", shape)
  return shape;
  
}

// Función para editar las propiedades de una figura
function editShapeProperties() {
  console.log("Edit shape", shape)
  if (shape) {
    
  }
}

//Seleccionar Formar
function selectShape(shape) {
  console.log('Figura de entrada:', shape);
  deselectShape();
  selectedShape = shape;
  layer.draw();
  console.log('Figura seleccionada:', selectedShape);
  return selectedShape;
}

// // Función para deseleccionar la figura
function deselectShape() {
  console.log("Entro a deseleccionar");
  if (selectedShape) {
    selectedShape = null;
    console.log(selectedShape);
    layer.draw();
  }
}

