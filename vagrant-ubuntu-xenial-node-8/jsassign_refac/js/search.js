 let baseURL = "https://api.themoviedb.org/3/";
 let APIKEY = "0857f3bcecfb71367f56290556a3e85c";
 let apiurl = baseURL + "search/movie?api_key=" + APIKEY + "&query=";
 $(document).ready(function() {
     $("#search").keyup(function() {
         $("#result").html("");
         let searchField = $("#search").val();
         let expression = new RegExp(searchField, "i");

         $.ajax({
             url: apiurl + searchField,
             type: "GET"
         }).done(function(data) {

             $.each(data.results, function(key, value) {
                 if (value.title.search(expression) !== -1 || value.poster_path.search(
                         expression) !== -1) {
                     $("#result").append(
                         `
                                                    <li class="list-group-item">
                                                    <img src="https://image.tmdb.org/t/p/w500` + value.poster_path + `" height="25" width="30" class="img-thumbnail" />
                                                ` + value.title + `(` + value.release_date + `)
                                                    </li>`
                     );
                 }
             });
         });

     });


 });