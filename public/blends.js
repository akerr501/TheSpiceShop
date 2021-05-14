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

function searchClick(){
  var search = document.getElementById("search").value;
  if(search.length > 0) window.location.assign("/blends/" + search);
  else window.location.assign("/blends");
}

window.addEventListener('DOMContentLoaded', function () {
  document.getElementById("blendtohouse-submit").addEventListener("click", blendToHouseClick);
  document.getElementById("blend-submit").addEventListener("click", blendClick);
  document.getElementById("search-submit").addEventListener("click", searchClick);


  var rows = document.getElementsByClassName("data-row editable");
  for (row of rows) {
    children = row.children;
    children[children.length - 1].children[0].addEventListener('click', function() {
      id = parseInt(this.parentElement.parentElement.children[0].children[0].textContent);
      console.log("DELETE: " + id);
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "/deleteBlend", false);
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
