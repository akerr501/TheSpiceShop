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


  var rows = document.getElementsByClassName("data-row editable");
  for (row of rows) {
    children = row.children;
    children[children.length - 1].children[0].addEventListener('click', function() {
      id = parseInt(this.parentElement.parentElement.children[0].children[0].textContent);
      console.log("DELETE: " + id);
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "/deleteSpice", false);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify({
        id: id
      }));
      location.reload();
    });
    children[children.length - 2].children[0].addEventListener('click', function() {
      id = parseInt(this.id[this.id.length - 1]) + 1;
      console.log(this.value);
      console.log("UPDATE: " + id);
    });
  }
});
