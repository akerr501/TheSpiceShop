function blendToHouseClick(){
  var hID = document.getElementById('household-dropdown').value;
  var bID = document.getElementById('blend-dropdown').value;
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/makeBlendToHouse");
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
    hID: hID,
    bID: bID
  }));
  location.reload();
}

function blendClick(){
  var name = document.getElementById('bname').value;
  var quantity = document.getElementById('quantity').value;
  var description = document.getElementById('bdescription').value;
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

function searchChange(){
  var search = document.getElementById("search").value;
  if(search.length > 0) document.getElementById("myLink").href = "/blends/" + search;
  else document.getElementById("myLink").href = "/blends";
}

window.addEventListener('DOMContentLoaded', function () {
  document.getElementById("blendtohouse-submit").addEventListener("click", blendToHouseClick);
  document.getElementById("blend-submit").addEventListener("click", blendClick);
  document.getElementById("search").addEventListener("input", searchChange);
});
