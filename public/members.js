function memberClick(){
  var fname = document.getElementById('fname').value;
  var mname = document.getElementById('mname').value;
  var lname = document.getElementById('lname').value;
  var hID = document.getElementById('member-dropdown').value;
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

function searchChange(){
  var search = document.getElementById("search").value;
  if(search.length > 0) document.getElementById("myLink").href = "/members/" + search;
  else document.getElementById("myLink").href = "/members";
}


window.addEventListener('DOMContentLoaded', function () {
  document.getElementById("member-submit").addEventListener("click", memberClick);
  document.getElementById("search").addEventListener("input", searchChange);

  var rows = document.getElementsByClassName("data-row");
  for (row of rows) {
    children = row.children;
    children[children.length - 1].children[0].addEventListener('click', function() {
      id = parseInt(this.parentElement.parentElement.children[0].children[0].textContent);
      console.log("DELETE: " + id);
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "/deleteMember", false);
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
