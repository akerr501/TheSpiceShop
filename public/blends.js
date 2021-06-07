function blendToHouseClick(){
  var hID = document.getElementById('household-dropdown').value;
  var bID = document.getElementById('blend-dropdown').value;
  if(hID.length > 0 && bID.length > 0){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/makeBlendToHouse");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
      hID: hID,
      bID: bID
    }));
    location.reload();
  }
}

function blendClick(){
  var name = document.getElementById('bname').value;
  var quantity = document.getElementById('quantity').value;
  var description = document.getElementById('bdescription').value;
  if(name.length > 0 && quantity.length > 0 && description.length > 0){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/makeBlend");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
      n: '"' + name + '"',
      q: quantity,
      d: '"' +  description + '"'
    }));
    location.reload();
  }
}

function searchClick(){
  var search = document.getElementById("search").value;
  if(search.length > 0) window.location.assign("/blends/" + search);
  else window.location.assign("/blends");
}

function deleteClick(){
  id = parseInt(this.parentElement.parentElement.children[0].children[0].textContent);
  console.log("DELETE: " + id);
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/deleteBlend", false);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
    id: id
  }));
  location.reload();
}

function toggleEditable(columns){
  console.log(columns);
  for(var i = 1; i < columns.length-2; i++){
    var input = columns[i].children[0];
    editable = input.contentEditable;
    if(editable == "true"){
      input.contentEditable = "false";
      input.style.color = "black";
    }
    else {
      input.contentEditable = "true";
      input.style.color = "red";
    }
  }
}

function updateClick(){
  id = parseInt(this.parentElement.parentElement.children[0].children[0].textContent);
  var columns = this.parentElement.parentElement.children;
  console.log(this.value);
  console.log("UPDATE: " + id);
  if(this.value === "Edit"){
    this.value = "Done";
    toggleEditable(columns);
  }
  else {
    var name = columns[1].children[0].textContent;
    var quantity = parseInt(columns[2].children[0].textContent);
    var description = columns[3].children[0].textContent;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/updateBlend");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
      id: id,
      name: '"' + name + '"',
      quantity: quantity,
      description: '"' + description + '"'
    }));
    toggleEditable(columns);
    this.value = "Edit";
  }
}

window.addEventListener('DOMContentLoaded', function () {
  document.getElementById("blendtohouse-submit").addEventListener("click", blendToHouseClick);
  document.getElementById("blend-submit").addEventListener("click", blendClick);
  document.getElementById("search-submit").addEventListener("click", searchClick);


  var rows = document.getElementsByClassName("data-row editable");
  for (row of rows) {
    children = row.children;
    children[children.length - 1].children[0].addEventListener('click', deleteClick);
    children[children.length - 2].children[0].addEventListener('click', updateClick);
  }
});
