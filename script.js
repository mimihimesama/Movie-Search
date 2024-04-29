const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YjI1MWMwYjcyOWM5ZDI2OTZlMDZjNGQ0YTM4OWI2ZSIsInN1YiI6IjY2MmIyZDE1NmUwZDcyMDExYzFmN2JmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GiFFRR5tmGJ2LoaVoS2ub_xksPO2gGRNSHX4rcPdJUI"
  }
};

fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", options)
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

function search_enter() {
  const movie_name_input = document.getElementById("movieSearchInput").value.toUpperCase();
  const card_arr = Array.from(document.getElementsByClassName("movie-card")); // HTMLCollection을 배열로 변환

  // 모든 카드의 현재 표시 상태를 저장
  const originalDisplay = card_arr.map((card) => card.style.display);

  // 검색어가 포함된 모든 카드를 필터링
  const foundCards = card_arr.filter((card) => {
    const movie_title = card.getElementsByTagName("h3")[0].innerText.toUpperCase();
    return movie_title.includes(movie_name_input);
  });

  // 모든 카드의 표시 상태 업데이트
  card_arr.forEach((card) => {
    card.style.display = "none"; // 일단 숨김
  });

  // 필터링된 카드만 표시
  foundCards.forEach((card) => {
    card.style.display = "inline-block";
  });

  if (foundCards.length === 0) {
    card_arr.forEach((card, index) => {
      card.style.display = originalDisplay[index];
    });
    alert("검색 결과가 없습니다.");
  }

  return false;
}
