function memberClick(){
  // get names and id from form
  var fname = document.getElementById('fname').value;
  var mname = document.getElementById('mname').value;
  var lname = document.getElementById('lname').value;
  var hID = document.getElementById('member-dropdown').value;
  if(fname.length > 0 && lname.length > 0){ // if they put first and last name, create
    // make http request to create member
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/makeMember");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
      fname: '"' + fname + '"',
      mname: '"' + mname + '"',
      lname: '"' + lname + '"',
      hID: hID
    }));
    // reload page to show it's done
    location.reload();
  }
  else window.alert("Please enter a value for Firstname and LastName");
}

function searchClick(){
  // get value searched
  var search = document.getElementById("search").value;
  if(search.length > 0) window.location.assign("/members/" + search); // if they searched, take to page
  else window.location.assign("/members"); // otherwise, take to default members page
}

function deleteClick(){
  // get the id
  id = parseInt(this.parentElement.parentElement.children[0].children[0].textContent);
  console.log("DELETE: " + id);
  //create new http request to delete row
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/deleteMember", false);
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
    if(editable == "false"){ // change row to be content editable
      if(i == 4){ // if dropdown
        // make a copy household id drop down
        var dropdown = document.getElementById("member-dropdown").cloneNode(true);
        // make dropdown red and put previous result as value
        dropdown.style.color = "red";
        dropdown.value = input.textContent;
        for(var j = 0; j < dropdown.children.length; j++) dropdown.children[j].style.color = "red";
        // change idea to avoid problems later
        dropdown.id = "member-dropdown2";
        // replace p with dropdown
        input.parentNode.replaceChild(dropdown, input);
      }
      else {
        // otherwise, just change content to editrable and red text
        input.contentEditable = "true";
        input.style.color = "red";
      }
    }
    else { // change so content is not editable
      if(i == 4){ // if dropdown
        // create new paragraph to replace with
        var p = document.createElement("p");
        // select dropdown
        var dropdown = document.getElementById("member-dropdown2");
        // copy dropdown over to paragraph
        p.textContent = dropdown.value;
        p.id = "editable";
        p.contentEditable = "false";
        // replace dropdown with paragraph
        dropdown.parentNode.replaceChild(p, dropdown);
      }
      else{ // otherwise just change to not be editable and black text
        input.contentEditable = "false";
        input.style.color = "black";
      }
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
    var fname = columns[1].children[0].textContent;
    var lname = columns[2].children[0].textContent;
    var mname = columns[3].children[0].textContent;
    if(fname.length > 0 && lname.length > 0){ // if content is valid, make request
      toggleEditable(columns); // first toggle the row, then get householdID
      var hID = columns[4].children[0].textContent;
      // create new post request to update database
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "/updateMember");
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify({
        id: id,
        fname: '"' + fname + '"',
        mname: '"' + mname + '"',
        lname: '"' + lname + '"',
        hid: hID
      }));
      this.value = "Edit";
    }
    else window.alert("Please enter a value for SpiceName and SpiceDescription");
  }
}


window.addEventListener('DOMContentLoaded', function () {
  // add listeners for the two form inputs
  document.getElementById("member-submit").addEventListener("click", memberClick);
  document.getElementById("search-submit").addEventListener("click", searchClick);

  var rows = document.getElementsByClassName("data-row");
  for (row of rows) {
    // add button listeners to each of the buttons in each row for delete and update
    children = row.children;
    children[children.length - 1].children[0].addEventListener('click', deleteClick);
    children[children.length - 2].children[0].addEventListener('click', updateClick);
  }
});
