const accessKey = "-4AGNyYSWA-2X7-C76HKv5J4McCd7uG1koTqYUa6GcE";

const formEle = document.querySelector('form');
const inputEle = document.querySelector('#search-input');
const searchResults = document.querySelector('.search-results');
const showMore = document.querySelector('#show-more-button');

let page = 1;

async function searchImage() {
    const inputData = inputEle.value.trim();
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (page === 1) {
        searchResults.innerHTML = "";
    }

    const results = data.results;
    if (results.length === 0) {
        showMore.style.display = "none";
        return; // No more results to show
    }

    results.forEach(result => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('search-result');
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = '_blank';
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });

    page++;
    showMore.style.display = "block";
}

formEle.addEventListener('submit', event => {
    event.preventDefault();
    page = 1;
    searchImage();
});

showMore.addEventListener('click', () => {
    searchImage();
});
