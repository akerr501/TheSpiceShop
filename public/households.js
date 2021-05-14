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

function searchChange(){
  var search = document.getElementById("search").value;
  if(search.length > 0) document.getElementById("myLink").href = "/households/" + search;
  else document.getElementById("myLink").href = "/households";
}

window.addEventListener('DOMContentLoaded', function () {
  document.getElementById("house-submit").addEventListener("click", houseClick);
  document.getElementById("housetohouse-submit").addEventListener("click", houseToHouseClick);
  document.getElementById("search").addEventListener("input", searchChange);
});
