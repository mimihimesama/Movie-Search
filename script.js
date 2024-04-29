const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YjI1MWMwYjcyOWM5ZDI2OTZlMDZjNGQ0YTM4OWI2ZSIsInN1YiI6IjY2MmIyZDE1NmUwZDcyMDExYzFmN2JmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GiFFRR5tmGJ2LoaVoS2ub_xksPO2gGRNSHX4rcPdJUI",
  },
};

fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((response) => {
    let movie_list = response["results"];
    let temp_html = ``;

    movie_list.forEach((i) => {
      let img_url = "https://image.tmdb.org/t/p/w500" + i["backdrop_path"];
      let movie_title = i["title"];
      let overview = i["overview"];
      let vote = i["vote_average"];
      let id = i["id"];

      temp_html += `
        <div class="movie-card" id="${id}">
            <img src="${img_url}" alt="${movie_title}">
            <div class="card-content">
              <h3>${movie_title}</h3>
              <p>${overview}</p>
              <p>⭐ ${vote}</p>
            </div>
        </div>`;

      document.getElementById("cards-box").innerHTML = temp_html;
    });
    addClickEventToCards();
  })
  .catch((error) => console.error("Error fetching the movies:", error));

function addClickEventToCards() {
  document.querySelectorAll(".movie-card").forEach((card) => {
    card.addEventListener("click", function () {
      alert("영화 ID: " + this.id);
    });
  });
}

function search_btn() {
  const movie_name_input = document.getElementById("movieSearchInput").value;
  const card_arr = document.getElementsByClassName("movie-card");

  for (let i = 0; i < card_arr.length; i++) {
    const movie_title = card_arr[i].getElementsByTagName("h3")[0].innerText;

    if (movie_title.toUpperCase().includes(movie_name_input.toUpperCase())) {
      card_arr[i].style.display = "inline-block";
    } else {
      card_arr[i].style.display = "none";
    }
  }
}
