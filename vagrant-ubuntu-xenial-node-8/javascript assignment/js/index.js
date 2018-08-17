(function ($) {
  "use strict"; // Start of use strict

  // let apiKey="43f4a6bcfb684cb473229f4869508de4";
  let baseURL = 'https://api.themoviedb.org/3/';
  let APIKEY = "43f4a6bcfb684cb473229f4869508de4";
  let configData = null;
  let baseImgURL = null;
  let searchtext="";
  let maxPopularTiles=6;
  let demoData = { "images": { "base_url": "http://image.tmdb.org/t/p/", "secure_base_url": "https://image.tmdb.org/t/p/", "backdrop_sizes": ["w300", "w780", "w1280", "original"], "logo_sizes": ["w45", "w92", "w154", "w185", "w300", "w500", "original"], "poster_sizes": ["w92", "w154", "w185", "w342", "w500", "w780", "original"], "profile_sizes": ["w45", "w185", "h632", "original"], "still_sizes": ["w92", "w185", "w300", "original"] }, "change_keys": ["adult", "air_date", "also_known_as", "alternative_titles", "biography", "birthday", "budget", "cast", "certifications", "character_names", "created_by", "crew", "deathday", "episode", "episode_number", "episode_run_time", "freebase_id", "freebase_mid", "general", "genres", "guest_stars", "homepage", "images", "imdb_id", "languages", "name", "network", "origin_country", "original_name", "original_title", "overview", "parts", "place_of_birth", "plot_keywords", "production_code", "production_companies", "production_countries", "releases", "revenue", "runtime", "season", "season_number", "season_regular", "spoken_languages", "status", "tagline", "title", "translations", "tvdb_id", "tvrage_id", "type", "video", "videos"] }

   //loader
   let show_hide_loader=(isShow)=>{
    let loaderEle= $('#loader');
    if(isShow){
      loaderEle.show();
    }else{
      loaderEle.hide();
    }
  }
  let getConfig = () => {
    //show_hide_loader(true);
    let apiurl = baseURL + 'configuration?api_key=' + APIKEY;
    fetch(apiurl)
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        baseImgURL = data.images.secure_base_url;
        configData = data.images;
        console.log('config:', data);
        console.log('config fetched');
        let searchtext = $('#input_search').val().trim();
        if(searchtext.length > 0){
          searchByKey('movie', searchtext);
        }else{
          getPopularDataListByCategory('movie');
        }
      })
      .catch(function (err) {
        alert(err);
      });
  }

  let searchByKey = (mediaType, keyword) => {
    let apiurl = baseURL + 'search/' + mediaType + '?api_key=' + APIKEY + '&query=' + keyword;
    fetch(apiurl)
      .then(result => result.json())
      .then((data) => {
        //process the returned data
        //document.getElementById('output').innerHTML = JSON.stringify(data, null, 4);
        //work with results array...
        console.log(data)
          ;
      })
  }


  let getPopularDataListByCategory = (mediaType, pageNo=1) => {
    let apiurl = baseURL + mediaType + '/popular?api_key=' + APIKEY + '&language=en-US&page=' + pageNo;
    fetch(apiurl)
      .then(result => result.json())
      .then((data) => {
        //process the returned data
        generatePopularList(data.results, mediaType);
      })

    // $.get( "https://api.themoviedb.org/3/movie/popular?api_key=43f4a6bcfb684cb473229f4869508de4&language=en-US&page=1")
    // .done(function( data ) {

    //   console.log( "Data Loaded: ");
    //   console.log(data.results);
    //   movieDB = data;
    // });
  }

  let init = () => {
    getConfig();
  }

  let onPopularMovieClick = () => {
    alert("Welcome To Movie");
  };

  

  //show_hide_loader(false);
  document.addEventListener('DOMContentLoaded', init);






  let generatePopularList = (datalist, mediaType) => {
    if (mediaType.toLowerCase() == 'tv') {
      //appendpopularlist(datalist, 'popular-movies');
    } else if (mediaType.toLowerCase() == 'movie') {
      appendpopularlist(datalist, 'popular-movies');
    }
  }


  //Append html content
  let appendpopularlist = (datalist, containerid) => {
    let appendContainer= $('#'+containerid);
    appendContainer.html('');
    if(datalist.length > 0){
      let popularTileItems=datalist.slice(0, 6);
      for (let i of popularTileItems) {
        let htmlcontent = $(`<div class="col-lg-4 col-md-6 col-sm-12 px-0">
                                <a class="movie-info" href="#">
                                    <img id="pimg_`+ i.id +`" src="`+ baseImgURL +`w500/`+ i.poster_path +`" alt="`+i.title +`">
                                    <div class="info">
                                        <span class="info-name d-block text-light">`+i.title+`</span>
                                    </div>
                                </a>
                          </div>`);
                          
        htmlcontent.appendTo(appendContainer);
        $('#pimg_'+i.id).click(onPopularMovieClick);
      }
    }else{
      let htmlcontent = $(`<div class="col-lg-4 col-md-6 col-sm-12 px-0">
                          <h3>No Movies Available</h3>
                        </div>`);
      htmlcontent.appendTo(appendContainer);
    }
  }

 

})(jQuery);