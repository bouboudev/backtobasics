const auth = "563492ad6f91700001000001944819da9434437db87e60ed6b0427e9";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
// const submitButton = document.querySelector(".submit-btn");
const form = document.querySelector(".search-form");
let searchValue;
const more = document.querySelector(".more");
let page = 1;
let fetchLink;
let currentSearch;

//event listeners

searchInput.addEventListener("input", updateInpute);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  currentSearch = searchValue;
  searchPhotos(searchValue);
});

more.addEventListener("click", loadMore);

// recherche en directe et dynamique
function updateInpute(e) {
  searchValue = e.target.value;
}
// factoriser pour éviter répétitions
//appel API
async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  return data;
}

//générer html

function generatePictures(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = ` <div class="gallery-info"> 
              <p>${photo.photographer}</p>
              <a href=${photo.src.original} target="_blank">Télécharger<a/>
              </div>
              <img src=${photo.src.large}> </img>`;
    gallery.appendChild(galleryImg);
  });
}

async function curatedPhotos() {
  fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}
async function searchPhotos(search) {
  // vider la galerie à chaque nouvelle recherche
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=${search}+query&per_page=15&page=1`;
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

// vider la galerie
function clear() {
  gallery.innerHTML = "";
  searchInput.value = "";
}

async function loadMore() {
  // pouvoir afficher d'autres images sans doublons

  // incrementer la page
  page++;

  //   modifie le lien api de manière dynamique pour avoir une nouvelle page de recherche à chaque fois qu'on clique sur  voir plus
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
  }
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

curatedPhotos();
