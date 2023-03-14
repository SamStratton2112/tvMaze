"use strict";

const $showsList = $("#shows-list");
const $episodesArea = $("#episodes-area");
const $searchForm = $("#search-form");



/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function getShowsByTerm(term) {
  // ADD: Remove placeholder & make request to TVMaze search shows API.
    let results= await axios.get(`http://api.tvmaze.com/search/shows?q=${term}`);
    const MISSING_IMAGE_URL = "http://tinyurl.com/missing-tv";
    let shows = results.data.map(result => {
      let show = result.show;
      return {
        id: show.id,
        name: show.name,
        summary: show.summary,
        image: show.image ? show.image.medium : MISSING_IMAGE_URL,
      };
    });
    return shows;
}


/** Given list of shows, create markup for each and to DOM */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();
  for (let show of shows) {
    let $showInfo = $(
        `<div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media" data-show-id="${show.id}">
           <img src="${show.image}">
           <div class="media-body">
             <h5 class="text-primary">${show.name}</h5>
             <div><small>${show.summary}</small></div>
             <button class="btn btn-outline-light btn-sm Show-getEpisodes" id="epsBtn">
               Episodes
             </button>
           </div>
         </div>  
       </div>
      `);
    $('#epsBtn').css('background', 'blue');
    $showsList.append($showInfo);  }
}


/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchForShowAndDisplay() {
  const term = $("#search-query").val();
  let shows = await getShowsByTerm(term);
  $episodesArea.hide();
  populateShows(shows);
}

async function getEpisodes(id){
  let res = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`);
  let episodes = res.data.map(episode => ({
    id: episode.id,
    name: episode.name,
    season: episode.season,
    number: episode.number,
  }))
  return episodes;
}

function listEpisodes(episodes){
  const epsList= document.querySelector('#episode-list');
  epsList.empty();
  for(let eps of episodes){
    let showEps = $(
      `<li>
      ${eps.name}(season ${eps.season}, episode ${eps.number})
      </li>`);
      epsList.append(showEps)
  }
}


$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});

$('#epsBtn').on('click', function (){
  let id = show.id
  getEpisodes(id)

})

//This should have been pretty straight forward but the instructions dont 
//sync with the project very well... often refering to things with different
//names in the starter code. Perhaps someone should look into fixing this
// I was unable to get the episodes to list out when I clicked my button
// but I've spent over 4 hours on this (a lot of time went to making sense of 
//the confusing instructions and starter code) so I'm moving on.


/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

// async function getEpisodesOfShow(id) { }

/** Write a clear docstring for this function... */

// function populateEpisodes(episodes) { }



//Extra code
// console.log(results)
//     // results returns an array of results. After several get requests it appears
//     //that the best match will be located at index 0. 
//     let showId = res.show.id;
//     let showName = res.show.name;
//     let showSum = res.show.summary;
//     let showImgURL = res.show.image.original;
//     //I am defining the information that I will insert into my show object. 
//     if(showImgURL.value === ''){
//       const backupImg = 'https://tinyurl.com/tv-missing'
//       showImgURL = backupImg;
//       //I am setting by backup image 
//     }
//     let showObj = {showId, showName, showSum, showImgURL};
//     console.log(showObj);

//     let addShowDiv = document.createElement('div');
//   let addShowImg = document.createElement('img');
//   addShowImg.setAttribute('src', showObj.showImgURL);
//   addShowDiv.append(addShowImg);
//   $showList.append(addShowDiv)
