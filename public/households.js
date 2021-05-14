function houseClick(){
  var str = document.getElementById('straddr').value;
  var city = document.getElementById('cityaddr').value;
  var state = document.getElementById('stateaddr').value;
  var zip = document.getElementById('zipaddr').value;
  var username = document.getElementById('username').value;
  var pwd = document.getElementById('pwd').value;
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/makeHouse");
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
    str: '"' + str + '"',
    city: '"' + city + '"',
    state: '"' + state + '"',
    zip: '"' + zip + '"',
    name: '"' + username + '"',
    pwd: '"' + pwd + '"'
  }));
  location.reload();
}

function houseToHouseClick(){
  var hIDO = document.getElementById('household1-dropdown').value;
  var hIDT = document.getElementById('household2-dropdown').value;
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/makeHouseToHouse");
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
    hIDO: hIDO,
    hIDT: hIDT
  }));
  location.reload();
}

function searchClick(){
  var search = document.getElementById("search").value;
  if(search.length > 0) window.location.assign("/households/" + search);
  else window.location.assign("/households");
}

window.addEventListener('DOMContentLoaded', function () {
  document.getElementById("house-submit").addEventListener("click", houseClick);
  document.getElementById("housetohouse-submit").addEventListener("click", houseToHouseClick);
  document.getElementById("search-submit").addEventListener("click", searchClick);

  var rows = document.getElementsByClassName("data-row editable");
  for (row of rows) {
    children = row.children;
    children[children.length - 1].children[0].addEventListener('click', function() {
      id = parseInt(this.parentElement.parentElement.children[0].children[0].textContent);
      console.log("DELETE: " + id);
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "/deleteHousehold", false);
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
