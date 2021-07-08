let headerCheckBox = document.getElementById('header');
let bodyCheckBox = document.getElementById('body');
let paramCheckBox = document.getElementById('param');

function updateHeaderDiv() {
  if (headerCheckBox.checked){
    document.getElementById('HeaderDiv').style.visibility = "visible";
  } else {
    document.getElementById('HeaderDiv').style.visibility = "hidden";
  }
}

function updateParamDiv() {
  if (paramCheckBox.checked){
    document.getElementById('ParamDiv').style.visibility = "visible";
  } else {
    document.getElementById('ParamDiv').style.visibility = "hidden";
  }
}

function updateBodyDiv() {
  if (bodyCheckBox.checked){
    document.getElementById('BodyDiv').style.visibility = "visible";
  } else {
    document.getElementById('BodyDiv').style.visibility = "hidden";
  }
}

function addQueryParameter() {
  let lista = document.getElementById("listaParametros");
  let li = document.createElement("li");
  let parameter = createInput("Parameter")
  let value = createInput("Value")
  let checkbox = createCheckbox()
  let button = createButton(`deleteParamButton${lista.childElementCount + 1}`);
  button.onclick = () => {deleteQueryParameter(button.id);}
  addChildElement(li,[parameter, value, checkbox, button])
  lista.appendChild(li);
}

function createInput(placeholder){
  let input = document.createElement("input");
  input.type = "text";
  input.placeholder = placeholder;
  return input
}

function createCheckbox(){
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  return checkbox
}

function addChildElement(elementFather,elementsList){
  for( const element of elementsList){
    elementFather.appendChild(element)
  }
}

function createButton(buttonID){
  let button = document.createElement("button");
  button.innerText = "Delete";
  button.id = buttonID
  return button;
}

function deleteQueryParameter(id) {
  document.getElementById(id).parentElement.remove();
}
