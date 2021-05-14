function spiceClick(){
  var sname = document.getElementById('sname').value;
  var description = document.getElementById('sdescription').value;
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/makeSpice");
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
    s: '"' + sname + '"',
    d: '"' + description + '"'
  }));
  location.reload();
}

function spiceToBlendClick(){
  var sID = document.getElementById('spice-dropdown').value;
  var bID = document.getElementById('blend-dropdown').value;
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/makeSpiceToBlend");
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
    sID: sID,
    bID: bID
  }));
  location.reload();
}

function searchClick(){
  var search = document.getElementById("search").value;
  if(search.length > 0) window.location.assign("/spices/" + search);
  else window.location.assign("/spices");
}


function deleteClick(){
  id = parseInt(this.parentElement.parentElement.children[0].children[0].textContent);
  console.log("DELETE: " + id);
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/deleteSpice", false);
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
    if(editable == "true") input.contentEditable = "false";
    else input.contentEditable = "true";
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
    var description = columns[2].children[0].textContent;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/updateSpice");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
      id: id,
      name: '"' + name + '"',
      description: '"' + description + '"'
    }));
    toggleEditable(columns);
    this.value = "Edit";
  }
}

window.addEventListener('DOMContentLoaded', function () {
  document.getElementById("spice-submit").addEventListener("click", spiceClick);
  document.getElementById("spicetoblend-submit").addEventListener("click", spiceToBlendClick);
  document.getElementById("search-submit").addEventListener("click", searchClick);


  var rows = document.getElementsByClassName("data-row editable");
  for (row of rows) {
    children = row.children;
    children[children.length - 1].children[0].addEventListener('click', deleteClick);
    children[children.length - 2].children[0].addEventListener('click', updateClick);
  }
});
