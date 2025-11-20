const accessKey = "RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw";

const formEl = document.querySelector("form");
const searchInputEl = document.getElementById("search-input");
const searchResultsEl = document.querySelector(".search-results");
const showMoreButtonEl = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

function fadeInElement(el) {
  el.style.opacity = 0;
  el.style.transform = "translateY(10px)";
  el.style.transition = "0.4s ease";
  requestAnimationFrame(() => {
    el.style.opacity = 1;
    el.style.transform = "translateY(0)";
  });
}

async function searchImages() {
  inputData = searchInputEl.value.trim();
  if (!inputData) return;

  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (page === 1) {
      searchResultsEl.innerHTML = "";
    }

    data.results.forEach((result) => {
      const imageWrapper = document.createElement("div");
      imageWrapper.classList.add("search-result");

      const image = document.createElement("img");
      image.src = result.urls.small;
      image.alt = result.alt_description || "Image";

      const imageLink = document.createElement("a");
      imageLink.href = result.links.html;
      imageLink.target = "_blank";
      imageLink.rel = "noopener noreferrer";
      imageLink.textContent = result.alt_description || "View Image";

      imageWrapper.appendChild(image);
      imageWrapper.appendChild(imageLink);
      searchResultsEl.appendChild(imageWrapper);

      fadeInElement(imageWrapper);
    });

    page++;
    if (page > 1) showMoreButtonEl.style.display = "block";

  } catch (error) {
    console.error("Error fetching images:", error);
  }
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showMoreButtonEl.addEventListener("click", () => {
  searchImages();
});
