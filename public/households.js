function houseClick(){
  var str = document.getElementById('straddr').value;
  var city = document.getElementById('cityaddr').value;
  var state = document.getElementById('stateaddr').value;
  var zip = document.getElementById('zipaddr').value;
  var username = document.getElementById('username').value;
  var pwd = document.getElementById('pwd').value;
  if(str.length > 0 && city.length > 0 && state.length > 0
      && zip.length > 0 && username.length > 0 && pwd.length > 0){
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
  } else{
    window.alert("Please enter a value for AddressStreet, AddressCity, AddressState, AddressZip, Username, and Password");
  }
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

function deleteClick(){
  id = parseInt(this.parentElement.parentElement.children[0].children[0].textContent);
  console.log("DELETE: " + id);
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/deleteHousehold", false);
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
    else if (i != 5){
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
    var str = columns[1].children[0].textContent;
    var city = columns[2].children[0].textContent;
    var state = columns[3].children[0].textContent;
    var zip = columns[4].children[0].textContent;
    var name = columns[6].children[0].textContent;
    var pwd = columns[7].children[0].textContent;
    var xhr = new XMLHttpRequest();
    if(str.length > 0 && city.length > 0 && state.length > 0
      && zip > 0 && name.length > 0 && pwd.length > 0){
      xhr.open("POST", "/updateHousehold");
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify({
        id: id,
        str: '"' + str + '"',
        city: '"' + city + '"',
        state: '"' + state + '"',
        zip: '"' + zip + '"',
        name: '"' + name + '"',
        pwd: '"' + pwd + '"'
      }));
      toggleEditable(columns);
      this.value = "Edit";
    } else{
      window.alert("Please enter a value for AddressStreet, AddressCity, AddressState, AddressZip, Username, and Password");
    }
  }
}

window.addEventListener('DOMContentLoaded', function () {
  document.getElementById("house-submit").addEventListener("click", houseClick);
  document.getElementById("housetohouse-submit").addEventListener("click", houseToHouseClick);
  document.getElementById("search-submit").addEventListener("click", searchClick);

  var rows = document.getElementsByClassName("data-row editable");
  for (row of rows) {
    children = row.children;
    children[children.length - 1].children[0].addEventListener('click', deleteClick);
    children[children.length - 2].children[0].addEventListener('click', updateClick);
  }
});
