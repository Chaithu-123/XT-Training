$('#myModal').on('show.bs.modal', function(e) {
    var modaltitle = $(e.relatedTarget).data('modal');
    $(e.currentTarget).find('input[name="modaltitle"]').val(modaltitle);
});


$('#myModal').on('show.bs.modal', function(e) {
    var modalbody = $(e.relatedTarget).data('modal');
    $(e.currentTarget).find('input[name="modalbody"]').val(modalbody);
});

$(document).ready(function() {

    getmovie();

    //     $('#myModal').modal('show');
});

// post request

$("#save").click(function() {
    let modaltitle = $("#myModal input[id='myModalLabel']").val();
    let modalbody = $("#myModal input[id='myModalbody']").val();
    $.post("http://localhost:3000/MovieData/", {
            title: modaltitle,
            body: modalbody
        },
        function(data, status) {
            $("#container").append(`
  <div class="card" id="card_cont" >
    <header class="container" id="title_cont">
      <h2> ` + modaltitle + ` </h2>
    </header>
    <div class="container" id="body_cont">
     ` + modalbody + `
    </div>    
  </div>`);
        });
    alert("Data: " + data + "\nStatus: " + status);
});

// get response from json server

let getmovie = () => {
    $.getJSON("http://localhost:3000/MovieData/",
        function(data, status) {
            console.log(data);
            createcollections(data);

        });
}
let createcollections = (data) => {
    $("#container").html('');
    for (let i of data) {
        $("#container").append(`
  <div class="card" id="card_cont" >
    <header class="container" id="title_cont">
      <h2> ` + i.title + ` </h2>
    </header>
    <div class="container" id="body_cont">
     ` + i.body + `
    </div>    
  </div>`);
    }
}



// crud card

function newItem() {
    var item = document.getElementById("input").value;
    var ul = document.getElementById("list");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode("- " + item));
    ul.appendChild(li);
    document.getElementById("input").value = "";
    li.onclick = removeItem;
}

document.body.onkeyup = function(e) {
    if (e.keyCode == 13) {
        newItem();
    }
};

function removeItem(e) {
    e.target.parentElement.removeChild(e.target);
}