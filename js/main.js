/* api 불러오기 */
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OWNjY2I1ZDc3NmI5YjliYWU0NzQ5MmQyOGMxOWEzOCIsInN1YiI6IjY1OTNiNjI4MDY5ZjBlNDRhMjIxNTczNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rdMqnqX7eza-iQQfPXo0nv8mea9jvRHnGwwY8kNkMGs"
  }
};

const url =
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KO&page=1&sort_by=popularity.desc";

/* api 호출 */
function getMovies() {
  fetch(url, options)
    .then((response) => response.json())
    .then((data) => showMovies(data.results))
    .catch((err) => console.error(err));
}

getMovies();

const movieList = document.querySelector(".card-list"); // ul
const img_url = "https://image.tmdb.org/t/p/w500";

/* 카드 api 추가 */
function showMovies(data) {
  for (let i = 0; i < data.length; i++) {
    let title = data[i]["title"];
    let overview = data[i]["overview"];
    let poster_path = data[i]["poster_path"];
    let vote_average = data[i]["vote_average"];
    let id = data[i]["id"];

    let temp_html = `
			<li class="movie-list" data-id="${id}">
			<a href="html/movie_review.html">
				<img src="${img_url + poster_path}" alt="${title}">
				<div class="side back">
				<p>영화제목영역</p>
				<p class="review">자세히보기 <i class="fa-solid fa-angle-right"></i></p>
			  </div>
				</a>
			</li>
    		`;
    //해석: movieList의 요소의 마지막 줄에 temp_html 추가하기
    //insertAdjacentHTML(첫 번째 매개변수: HTML을 삽입할 위치를 지정합니다.
    //beforeend'는 해당 요소의 자식으로, 마지막 자식 요소 뒤에 HTML을 추가
    //중복 클래스 존재 시  중첩 적용된다.
    movieList.insertAdjacentHTML("beforeend", temp_html);
  }
}

/* 검색창 버튼 클릭시*/
let searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let searchTxt = document.getElementById("search-text").value.replace(/\s/g, ""); //모든 공백을 제거함

  //검색어가 없으면 알럿창 띄우기
  if (searchTxt !== "") {
    //검색어가 공백이 아닐때
    let cards = document.querySelectorAll(".movie-list");
    let searchResult = false;

    for (let i = 0; i < cards.length; i++) {
      let title = cards[i]; //각각의 요소를 가지고왔음.
      // console.log(title);
      let titleList = title.querySelector("h2"); //title에있는 h2요소를 가져옴.
      // console.log(titleList);
      let results = titleList.textContent.replace(/\s/g, ""); //다시 textContent로 담음.
      // console.log(results);

      if (!results.includes(searchTxt)) {
        //검색한내용 철자와 result(title)안에 있는 내용을 비교함
        cards[i].style.display = "none";
      } else {
        //값이 하나라도 포함되어있으면
        cards[i].style.display = "block";
        searchResult = true;
      }
    }
    if (!searchResult) {
      const section = document.querySelector("section");
      const listNone = document.querySelector(".list-none");
      section.classList.add("active");
      listNone.style.display = "block";
    }
  } else {
    alert("검색어를 입력해 주세요.");
  }
});
