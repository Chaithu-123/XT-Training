import '../scss/styles.scss';
import "../node_modules/bootstrap/scss/bootstrap.scss";
import "../js/search";
import "../js/modal";

(function($) {
    "use strict";


    let baseURL = "https://api.themoviedb.org/3/";
    let APIKEY = "0857f3bcecfb71367f56290556a3e85c";
    let configData = null;
    let baseImgURL = null;
    let searchtext = "";
    let maxPopularTiles = 12;
    let pMovieCardClasses = ["tile1", "tile2", "tile3", "tile4", "tile5", "tile6", "tile7", "tile8", "tile9", "tile10", "tile11", "tile12"];
    let pMovieclassIndex = 0;
    let currentmovie = null;

    let demoData = {
        "images": {
            "base_url": "http://image.tmdb.org/t/p/",
            "secure_base_url": "https://image.tmdb.org/t/p/",
            "backdrop_sizes": ["w300", "w780", "w1280", "original"],
            "logo_sizes": ["w45", "w92", "w154", "w185", "w300", "w500", "original"],
            "poster_sizes": ["w92", "w154", "w185", "w342", "w500", "w780", "original"],
            "profile_sizes": ["w45", "w185", "h632", "original"],
            "still_sizes": ["w92", "w185", "w300", "original"]
        },
        "change_keys": ["adult", "air_date", "also_known_as", "alternative_titles", "biography", "birthday", "budget", "cast", "certifications", "character_names", "created_by", "crew", "deathday", "episode", "episode_number", "episode_run_time", "freebase_id", "freebase_mid", "general", "genres", "guest_stars", "homepage", "images", "imdb_id", "languages", "name", "network", "origin_country", "original_name", "original_title", "overview", "parts", "place_of_birth", "plot_titles", "production_code", "production_companies", "production_countries", "releases", "revenue", "runtime", "season", "season_number", "season_regular", "spoken_languages", "status", "tagline", "title", "translations", "tvdb_id", "tvrage_id", "type", "video", "videos"]
    }



    let getConfig = () => {

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
                // let searchtext = $('#search_txt').val().trim();
                if (searchtext.length > 0) {
                    searchByKey('movie', title);
                } else {
                    getPopularDataListByCategory('movie');
                }
            })
            .catch(function(err) {
                alert(err);
            });
    }




    let getPopularDataListByCategory = (mediaType, pageNo = 1) => {
        let apiurl = baseURL + mediaType + '/popular?api_key=' + APIKEY + '&language=en-US&page=' + pageNo;
        fetch(apiurl)
            .then(result => result.json())
            .then((data) => {
                generatePopularList(data.results, mediaType);
            })


    }

    let init = () => {
            getConfig();
        }
        // Opening Movie Details
    let onPopularMovieClick = (evt) => {
        let currentEle = evt.currentTarget;
        let apiurl = baseURL + 'movie/' + currentEle.id.substr(5) + '?api_key=' + APIKEY;
        fetch(apiurl)
            .then(result => result.json())
            .then((data) => {
                //process the returned data
                appendMovieInfo(data, 'movie_details');
            })

    };


    let appendMovieInfo = (data, containerid) => {
            $('#whole_content').hide();
            $('#' + containerid).show();
            $('#' + containerid).html(``);
            currentmovie = data;
            let htmlElements = $(`<div class="custom_bg">
            <div class="single_column">
    
    
                <section class="images_inner">
                    <div class="poster">
                        <div class="image_content"><img class="movie-info" src="` + baseImgURL + `w185` + data.poster_path + `" alt="` + data.title + `" />
                        </div>
                    </div>
    
                    <div class="header_poster_wrapper">
                        <section class="header_poster">
                            <div class="title" dir="auto">
    
    
    
                                <span>
                                    
                                        <h2 class="30">` + data.title + `</h2>
                                   
                                     ` + data.release_date + ` 
                                </span>
    
                            </div>
                            <ul class="auto_actions">
    
                                <li class="chart">
                                    <div class="c100 p34 center">
                                        ` + data.popularity + `
                                        <div class="slice">
                                            <div class="bar"></div>
                                            <div class="fill"></div>
                                        </div>
                                    </div>
                                    <div class="text">User Score</div>
                                </li>
    
    
    
                                <li>
                                
                        <button type="button" id="actionsave" class="btn btn-primary">Add To Collection</button>
                                    </li>
    
    

                                    
                                <li>
                                   Votes
                                </li>
    
    
                                <li >
                                  Rate Movie
                                </li>
    
                 
    
    
    
    
    
    
                            </ul>
    
                            <div class="header_info">
                                <h3 dir="auto">Overview</h3>
                                <div class="overview" dir="auto">
    
                                     ` + data.overview + `
    
    
                                </div>
    
                                <h3 class="featured" dir="auto" style="font-size:  2rem;">Featured Crew</h3>
                                <ol class="people_no_image">
    
    
                                    <li class="profile">
                                        <p>
                                            Derek Connolly
                                        </p>
                                        <p class="character">Writer</p>
                                    </li>
    
                                    <li class="profile">
                                        <p>
                                            Colin Trevorrow
                                        </p>
                                        <p class="character">Writer</p>
                                    </li>
    
                                    <li class="profile">
                                        <p>
                                            Juan Antonio Bayona
                                        </p>
                                        <p class="character">Director</p>
                                    </li>
    
                                    <li class="profile">
                                        <p>
                                            Michael Crichton
                                        </p>
                                        <p class="character">Characters</p>
                                    </li>
    
    
                                </ol>
                            </div>
                        </section>
                    </div>
    
                </section>
    
            </div>
        </div>`);
            htmlElements.appendTo($('#' + containerid));

            $("#actionsave").click(onEditMovieCollection);
            // $("#actionsave").click(function() {
            //     let currentCol = {
            //         "Name": "Animation",
            //         "Desc": "Animation Movies",
            //         "Movies": "[]",
            //         "id": 1
            //     }

            //     let movieData = JSON.parse(currentCol.Movies);
            //     movieData.push(currentmovie);
            //     let mdata = JSON.stringify(movieData);

            //     $.ajax({
            //         url: "http://localhost:3000/MovieData/" + currentCol.id,
            //         method: "PUT",
            //         data: {
            //             "Name": currentCol.Name,
            //             "Desc": currentCol.Desc,
            //             "Movies": mdata,
            //         },
            //         success: function(result) {
            //             alert("submitted");
            //         }
            //     });

            //     $.getJSON("http://localhost:3000/MovieData/",
            //         function(data, status) {
            //             console.log(data);
            //         });
            //     // $.put("http://localhost:3000/MovieData/" + currentCol.id, {
            //     //         "Name": currentCol.Name,
            //     //         "Desc": currentCol.Desc,
            //     //         "Movies": mdata,
            //     //     },
            //     //     function(data, status) {
            //     //         alert("Data: " + data + "\nStatus: " + status);
            //     //     });

            // });
        }
        // Functionality For Edit Movie Button

    let onEditMovieCollection = (e) => {
        $(".form-row #lbl_mName").text(currentmovie.title);
        $.getJSON("http://localhost:3000/MovieData/",
            function(data, status) {
                let collectionDataList = data;
                let modalColComboBox = $(".form-row #selcolletion");
                modalColComboBox.html('');
                for (let i of collectionDataList) {
                    modalColComboBox.append(`<option id="copt` + i.id + `">
                                       ` + i.Name + `
                                   </option>`);
                }

                $("#addMovieToCollectionModal").modal('show');
                $("#btn-addmovie").click(function(e) {
                    let form = $('#addmovieform')[0];
                    let selectedOptionId = $('.form-row #selcolletion option:selected')[0].id;
                    if (form.checkValidity() === false) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    form.classList.add('was-validated');
                    addMovieToCollection(selectedOptionId.substr(4), currentmovie, collectionDataList);
                });
            });


    }

    // Adding Movie To User Collection

    let addMovieToCollection = (cId, mdata, colDataList) => {
        let cindex = colDataList.findIndex(x => x.id == cId);
        let movieData, existMovieIndex;
        if (cindex != -1) {
            if (!(colDataList[cindex].Movies == "")) {
                movieData = JSON.parse(colDataList[cindex].Movies);
                existMovieIndex = movieData.findIndex(x => x.id == mdata.id);
                if (existMovieIndex == -1) {
                    movieData.push(mdata);

                }
            } else {
                movieData = [];
                movieData.push(mdata);
            }
            let movieStrData = JSON.stringify(movieData);


            $.ajax({
                url: "http://localhost:3000/MovieData/" + colDataList[cindex].id,
                method: "PUT",
                data: {
                    "Name": colDataList[cindex].Name,
                    "Desc": colDataList[cindex].Desc,
                    "Movies": movieStrData,
                },
                success: function(result) {
                    alert("Movie successfully added");
                }
            });

        }
    }


    document.addEventListener('DOMContentLoaded', init);




    // Generating The Popular Movie List On Home Page

    let generatePopularList = (datalist, mediaType) => {
        if (mediaType.toLowerCase() == 'tv') {

        } else if (mediaType.toLowerCase() == 'movie') {
            appendpopularlist(datalist, 'movie_list');
        }
    }




    let appendpopularlist = (datalist, containerid) => {
        let appendContainer = $('#' + containerid);
        appendContainer.html('');
        pMovieclassIndex = 0;
        if (datalist.length > 0) {
            let popularTileItems = datalist.slice(0, maxPopularTiles);
            for (let i of popularTileItems) {
                let htmlcontent = $(`<div class="` + pMovieCardClasses[pMovieclassIndex] + ` card-content col-lg-4">
                                <a class = "movie-info" href = "#">
                                    <img id="pimg_` + i.id + `" src="` + baseImgURL + `w185/` + i.poster_path + `" alt="` + i.title + `">
                                    <div class="info">
                                        <span class="info-name d-block text-light">` + i.title + `</span>
                                    </div>
                                </a>
                          </div>`);

                htmlcontent.appendTo(appendContainer);
                $('#pimg_' + i.id).click(onPopularMovieClick);
                pMovieclassIndex = pMovieclassIndex == (pMovieCardClasses.length - 1) ? 0 : pMovieclassIndex + 1;
            }
        } else {
            let htmlcontent = $(`<div class="big_1  ">
                          <h3>No Movies Available</h3>
                        </div>`);
            htmlcontent.appendTo(appendContainer);
        }
    }


})(jQuery);