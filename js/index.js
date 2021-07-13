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
  checkbox.checked = true;
  let button = createButton(`deleteParamButton${lista.childElementCount + 1}`);
  button.onclick = () => {deleteItem(button.id);}
  addChildElement(li,[parameter, value, checkbox, button])
  lista.appendChild(li);
}

function addHeader() {
  let lista = document.getElementById("listaHeaders");
  let li = document.createElement("li");
  let header = createInput("Header")
  let value = createInput("Value")
  let checkbox = createCheckbox()
  let button = createButton(`deleteHeaderButton${lista.childElementCount + 1}`);
  checkbox.checked = true;
  button.onclick = () => {deleteItem(button.id);}
  addChildElement(li,[header, value, checkbox, button])
  lista.appendChild(li);
}

function createInput(name){
  let input = document.createElement("input");
  input.type = "text";
  input.name = name;
  input.placeholder = name;
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

function deleteItem(id) {
  document.getElementById(id).parentElement.remove();
}



function getQueryParams(){
  let lista = Array.from(document.querySelectorAll("#listaParametros > li"));
  lista = getValidInputValues(lista)
  if (lista.length == 0) return "";
  let queryParameters = "?"
  lista.forEach((param)=>{
    queryParameters = queryParameters + param.name + "=" + param.value + "&"
  });
  return queryParameters.slice(0, -1)
}

function getHeaderValues(){

}
//REFATORAR
function getValidInputValues(elementsArr){
  return elementsArr.filter((element)=>{
    let name = element.querySelector("input:nth-child(1)").value
    let value = element.querySelector("input:nth-child(2)").value
    if(name === "" ||  value === ""){
      return false
    }else {
      return true
    }
  }).map((element) => {
    let name = element.querySelector("input:nth-child(1)").value
    let value = element.querySelector("input:nth-child(2)").value
    return {name, value}
  });

}
function getURL(){
  return document.getElementById("url").value;
}

function getHTTPMethod(){
  return document.getElementById("method").value
}

function generateCURL(){
  if(getURL() == "") return
  let generatedCURL = "cURL "
  if(getHTTPMethod() === "POST") generatedCURL = generatedCURL + "-X POST ";
  generatedCURL = generatedCURL + getURL();
  generatedCURL = generatedCURL + getQueryParams();
  document.getElementById("GeneratedCurl").value = generatedCURL;
}