function memberClick(){
  var fname = document.getElementById('fname').value;
  var mname = document.getElementById('mname').value;
  var lname = document.getElementById('lname').value;
  var hID = document.getElementById('member-dropdown').value;
  if(fname.length > 0 && lname.length > 0){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/makeMember");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
      fname: '"' + fname + '"',
      mname: '"' + mname + '"',
      lname: '"' + lname + '"',
      hID: hID
    }));
    location.reload();
  }
}

function searchClick(){
  var search = document.getElementById("search").value;
  if(search.length > 0) window.location.assign("/members/" + search);
  else window.location.assign("/members");
}

function deleteClick(){
  id = parseInt(this.parentElement.parentElement.children[0].children[0].textContent);
  console.log("DELETE: " + id);
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/deleteMember", false);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
    id: id
  }));
  location.reload();
}

function toggleEditable(columns){
  console.log(columns);
  for(var i = 1; i < columns.length-3; i++){
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
    var fname = columns[1].children[0].textContent;
    var lname = columns[2].children[0].textContent;
    var mname = columns[3].children[0].textContent;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/updateMember");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
      id: id,
      fname: '"' + fname + '"',
      mname: '"' + mname + '"',
      lname: '"' + lname + '"'
    }));
    toggleEditable(columns);
    this.value = "Edit";
  }
}


window.addEventListener('DOMContentLoaded', function () {
  document.getElementById("member-submit").addEventListener("click", memberClick);
  document.getElementById("search-submit").addEventListener("click", searchClick);

  var rows = document.getElementsByClassName("data-row");
  for (row of rows) {
    children = row.children;
    children[children.length - 1].children[0].addEventListener('click', deleteClick);
    children[children.length - 2].children[0].addEventListener('click', updateClick);
  }
});
