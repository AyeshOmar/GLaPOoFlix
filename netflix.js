
 //let DivImage=document.getElementById('DivImage')


	
function fetchMovies(url,path_type,DivDom){
	
fetch(`${url}`)
.then(response =>response.json())
.then(data =>  {

showMovies(data , path_type,DivDom)

	
})
.catch(error =>{
console.log(error)
	})
}







function showMovies(data , path_type,DivDom){

let DivImage = document.getElementById(DivDom)

for(var x of data.results){

let imageElement =document.createElement('img')

 imageElement.setAttribute('data-id', x.id)

 imageElement.src=`https://image.tmdb.org/t/p/original${x[path_type]}`
 
 imageElement.addEventListener('click', e => {
      handleMovieSelection(e)
    })

DivImage.appendChild(imageElement)
}

}













function GetOriginal(path_type,DivDom){
let url='https://api.themoviedb.org/3/discover/tv?api_key=19f84e11932abbc79e6d83f82d6d1045&with_networks=213'
fetchMovies(url,path_type,DivDom)
}


function GetTrending(path_type,DivDom){
	let url = 'https://api.themoviedb.org/3/trending/movie/week?api_key=19f84e11932abbc79e6d83f82d6d1045'
fetchMovies(url,path_type,DivDom)
}




function GetTopRated(path_type,DivDom){
	let url='https://api.themoviedb.org/3/movie/top_rated?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US&page=1'
fetchMovies(url,path_type,DivDom)
}

 //fetchMovies('https://api.themoviedb.org/3/discover/tv?api_key=19f84e11932abbc79e6d83f82d6d1045&with_networks=213','poster_path','DivImage')


 GetOriginal('poster_path','DivImage')
 GetTrending('poster_path','Trending')
 GetTopRated('poster_path','TopRated')


 async function getMovieTrailer(id) {
  var url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US`
  return await fetch(url).then(response => {
    if (response.ok) {
      return response.json()
    } else {
      throw new Error('something went wrong')
    }
  })
}

const setTrailer = trailers => {
  const iframe = document.getElementById('movieTrailer')
  const movieNotFound = document.querySelector('.movieNotFound')
  if (trailers.length > 0) {
    movieNotFound.classList.add('d-none')
    iframe.classList.remove('d-none')
    iframe.src = `https://www.youtube.com/embed/${trailers[0].key}`
  } else {
    iframe.classList.add('d-none')
    movieNotFound.classList.remove('d-none')
  }
}

const handleMovieSelection = e => {

  const id = e.target.getAttribute('data-id')
  const iframe = document.getElementById('movieTrailer')
  // here we need the id of the movie
  getMovieTrailer(id).then(data => {
    const results = data.results
    const youtubeTrailers = results.filter(result => {
      if (result.site == 'YouTube' && result.type == 'Trailer') {
        return true
      } else {
        return false
      }
    })
    setTrailer(youtubeTrailers)
  })

  // open modal
  $('#trailerModal').modal('show')
  // we need to call the api with the ID
}


