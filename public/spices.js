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

function searchChange(){
  var search = document.getElementById("search").value;
  if(search.length > 0) document.getElementById("myLink").href = "/spices/" + search;
  else document.getElementById("myLink").href = "/spices";
}

window.addEventListener('DOMContentLoaded', function () {
  document.getElementById("spice-submit").addEventListener("click", spiceClick);
  document.getElementById("spicetoblend-submit").addEventListener("click", spiceToBlendClick);
  document.getElementById("search").addEventListener("input", searchChange);
});
