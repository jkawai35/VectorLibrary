//Jaren Kawai
//jkawai@ucsc.edu

// DrawTriangle.js (c) 2012 matsuda
function main() {  
  // Retrieve <canvas> element
  canvas = document.getElementById('example');  
  if (!canvas) { 
    console.log('Failed to retrieve the <canvas> element');
    return false; 
  } 

  // Get the rendering context for 2DCG
  ctx = canvas.getContext('2d');

  // Draw a blue rectangle
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set color to blue
  ctx.fillRect(0, 0, canvas.width, canvas.height);        // Fill a rectangle with the color


}

function handleDrawEvent(){
  let v1x = document.getElementById("v1x");
  let v1y = document.getElementById("v1y");
  let v2x = document.getElementById("v2x");
  let v2y = document.getElementById("v2y");
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set color to blue
  ctx.fillRect(0, 0, canvas.width, canvas.height);// Fill a rectangle with the color

  let v1 = new Vector3([v1x.value,v1y.value,0])
  let v2 = new Vector3([v2x.value,v2y.value,0])
 
  drawVector(v1, 'red');
  drawVector(v2, 'blue');
}

function handleDrawOperationEvent(){
  let v1x = document.getElementById("v1x");
  let v1y = document.getElementById("v1y");
  let v2x = document.getElementById("v2x");
  let v2y = document.getElementById("v2y");
  let scale = document.getElementById("scaler");
  let select = document.getElementById('operation-select');

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set color to blue
  ctx.fillRect(0, 0, canvas.width, canvas.height);// Fill a rectangle with the color
  
  let v1 = new Vector3([v1x.value,v1y.value,0]);
  let v2 = new Vector3([v2x.value,v2y.value,0]); 

  drawVector(v1, 'red')
  drawVector(v2, 'blue')

  let option = select.options[select.selectedIndex].text;

  if (option == 'Add'){
    v1.add(v2);
    drawVector(v1, 'green')
  }
  else if (option == 'Sub'){
    v1.sub(v2);
    drawVector(v1, 'green')
  }
  else if (option == 'Mul'){
    v1.mul(scale.value)
    v2.mul(scale.value)
    drawVector(v1, 'green')
    drawVector(v2, 'green')
  }
  else if (option == 'Div'){
    v1.div(scale.value)
    v2.div(scale.value)
    drawVector(v1, 'green')
    drawVector(v2, 'green')
  }
  else if (option == 'Magnitude'){
    console.log("Magnitude v1: " + v1.magnitude())
    console.log("Magnitude v2: " + v2.magnitude())
  }
  else if (option == 'Normalize'){
    v1.normalize()
    v2.normalize()
    drawVector(v1, 'green')
    drawVector(v2, 'green')
  }
  else if (option == "Angle Between"){
    console.log("Angle: " + angleBetween(v1, v2))
  }
  else if (option == "Area"){
    console.log("Area of the triangle: " + areaTriangle(v1, v2));
  }

}

function drawVector(v, color){
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(canvas.width/2, canvas.height/2);
  ctx.lineTo(canvas.width/2 + v.elements[0] * 20, canvas.height/2 - v.elements[1] * 20);
  ctx.stroke();
}

function angleBetween(v1, v2){
  let dot = Vector3.dot(v1, v2);
  return ((180 / Math.PI) * Math.acos(dot / (v1.magnitude() * v2.magnitude())));
}

function areaTriangle(v1, v2){
  let v3 = Vector3.cross(v1, v2);
  return v3.magnitude() / 2;
}