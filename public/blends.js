// This is the javascript powering the blends page
// Authors: Adam Kerr, Santosh Ramesh

function blendToHouseClick(){
  // get ids from form
  var hID = document.getElementById('household-dropdown').value;
  var bID = document.getElementById('blend-dropdown').value;
  if(hID.length > 0 && bID.length > 0){ // if they put ids, create
    // make http request to create intersection
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/makeBlendToHouse");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
      hID: hID,
      bID: bID
    }));
    // reload page to show it's done
    location.reload();
  }
}

function blendClick(){
  // get content from form
  var name = document.getElementById('bname').value;
  var quantity = document.getElementById('quantity').value;
  var description = document.getElementById('bdescription').value;
  if(name.length > 0 && quantity > 0){ // if they put content, create
    // make http request to create blend
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/makeBlend");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
      n: '"' + name + '"',
      q: quantity,
      d: '"' +  description + '"'
    }));
    // reload page to show it's done
    location.reload();
  } else{
    window.alert("Please enter a value for BlendName and a Quantity > 0");
  }
}

function searchClick(){
  // get value searched
  var search = document.getElementById("search").value;
  if(search.length > 0) window.location.assign("/blends/" + search); // if they searched, take to page
  else window.location.assign("/blends"); // otherwise, take to default spices page
}

function deleteClick(){
  // get the id
  id = parseInt(this.parentElement.parentElement.children[0].children[0].textContent);
  console.log("DELETE: " + id);
  // create new http request to delete row
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/deleteBlend", false);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
    id: id
  }));
  // reload page to show it's done
  location.reload();
}

function toggleEditable(columns){
  console.log(columns);
  for(var i = 1; i < columns.length-2; i++){
    // get the element
    var input = columns[i].children[0];
    // read content editability
    editable = input.contentEditable;
    if(editable == "true"){ // change to not be editable and black text
      input.contentEditable = "false";
      input.style.color = "black";
    }
    else { // otherwise change to be editable and red text
      input.contentEditable = "true";
      input.style.color = "red";
    }
  }
}

function updateClick(){
  // read the ID
  id = parseInt(this.parentElement.parentElement.children[0].children[0].textContent);
  // read in the cells of the row
  var columns = this.parentElement.parentElement.children;
  console.log(this.value);
  console.log("UPDATE: " + id);
  if(this.value === "Edit"){ // button text == edit, simply change text and toggle row
    this.value = "Done";
    toggleEditable(columns);
  }
  else { // button text == done, update database
    // read in content
    var name = columns[1].children[0].textContent;
    var quantity = parseInt(columns[2].children[0].textContent);
    var description = columns[3].children[0].textContent;
    if(name.length > 0 && quantity > 0 && quantity != "NaN"){ // if content is valid, make request
      // create new post request to update database
      console.log("the quanity is: " + quantity);
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
    } else{
      window.alert("Please enter a value for BlendName and a Quantity > 0");
    }
  }
}

window.addEventListener('DOMContentLoaded', function () {
  // add listeners for the three form inputs
  document.getElementById("blendtohouse-submit").addEventListener("click", blendToHouseClick);
  document.getElementById("blend-submit").addEventListener("click", blendClick);
  document.getElementById("search-submit").addEventListener("click", searchClick);


  var rows = document.getElementsByClassName("data-row editable");
  for (row of rows) {
    // add button listeners to each of the buttons in each row for delete and update
    children = row.children;
    children[children.length - 1].children[0].addEventListener('click', deleteClick);
    children[children.length - 2].children[0].addEventListener('click', updateClick);
  }
});
