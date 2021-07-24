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
  li.className = "row";
  let divCheckbox = document.createElement("div");
  divCheckbox.className = "col-md-1";
  let divInput = document.createElement("div")
  divInput.className = "col";
  let divDelete = document.createElement("div");
  divDelete.className = "col-md-3";
  let parameter = createInput("Parameter")
  let value = createInput("Value")
  let checkbox = createCheckbox()
  checkbox.checked = true;
  let button = createButton(`deleteParamButton${lista.childElementCount + 1}`);
  button.onclick = () => {deleteItem(button.id);}
  addChildElement(divCheckbox, [checkbox]);
  addChildElement(divDelete, [button]);
  addChildElement(divInput, [parameter, value])
  addChildElement(li,[divCheckbox, divInput, divDelete])
  lista.appendChild(li);
}

function addHeader() {
  let lista = document.getElementById("listaHeaders");
  let li = document.createElement("li");
  li.className = "row";
  let divCheckbox = document.createElement("div");
  divCheckbox.className = "col-md-1";
  let divInput = document.createElement("div")
  divInput.className = "col";
  let divDelete = document.createElement("div");
  divDelete.className = "col-md-3";
  let header = createInput("Header")
  let value = createInput("Value")
  let checkbox = createCheckbox()
  checkbox.checked = true;
  let button = createButton(`deleteHeaderButton${lista.childElementCount + 1}`);
  button.onclick = () => {deleteItem(button.id);}
  addChildElement(divCheckbox, [checkbox]);
  addChildElement(divDelete, [button]);
  addChildElement(divInput, [header, value])
  addChildElement(li,[divCheckbox, divInput, divDelete])
  lista.appendChild(li);
}

function createInput(name){
  let input = document.createElement("input");
  input.type = "text";
  input.name = name;
  input.placeholder = name;
  input.className = "form-control form-control-sm"
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
  document.getElementById(id).parentElement.parentElement.remove();
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
  let lista = Array.from(document.querySelectorAll("#listaHeaders > li"));
  lista = getValidInputValues(lista)
  if (lista.length == 0) return "";
  let queryHeader = ""
  lista.forEach((header)=>{
    queryHeader = queryHeader + `\n -H \"${header.name}: ${header.value}\"`
  });
  return queryHeader
}
//REFATORAR
function getValidInputValues(elementsArr){
  return elementsArr.filter((element)=>{
    let name = element.querySelector("div:nth-child(2) > input[type='text']:nth-child(1)").value
    let value = element.querySelector("div:nth-child(2) > input[type='text']:nth-child(2)").value
    if(name === "" ||  value === ""){
      return false;
    }else {
      let checkbox = element.querySelector("input[type='checkbox']")
      if(checkbox.checked){
        return true;
      }
      return false;
    }
  }).map((element) => {
    let name = element.querySelector("div:nth-child(2) > input[type='text']:nth-child(1)").value
    let value = element.querySelector("div:nth-child(2) > input[type='text']:nth-child(2)").value
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
  if(!validaURL()) return;
  let generatedCURL = "cURL "
  if(getHTTPMethod() === "POST") generatedCURL = generatedCURL + "-X POST ";
  generatedCURL = generatedCURL + getURL();
  generatedCURL = generatedCURL + getQueryParams();
  generatedCURL = generatedCURL + getHeaderValues();
  document.getElementById("GeneratedCurl").value = generatedCURL;
}

function validaURL(){
  if(getURL() == ""){
    document.getElementById("url").style.background = "#e66f56"
    return 
  }else {
    document.getElementById("url").style.background = "white"
    return true
  }
}