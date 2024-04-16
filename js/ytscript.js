
//test code for js connectivity
//alert('Js is connected')

// creating a function to add student information to the page
function addMyStdCredentials() {

    const stdCredentialContainer = document.getElementById('myStdCredentials');
    // clearing previous values if exists
    stdCredentialContainer.innerHTML='';
    const stdCredentialPara = document.createElement('p');
    stdCredentialPara.textContent = 'My Student ID: 200553438, Name: Davinderjit Singh\tReferences: https://developers.google.com/youtube/v3';
    stdCredentialContainer.appendChild(stdCredentialPara);
}

// will call the function when the user searchs for something

// storing the api key from the google cloud youtube data api v3
const auth_key = 'AIzaSyB1nGK028k8tY8Y5X-P8x5CSRbffCUV37Q';

// Function to fetch YouTube videos based on input query provided by the user

// using asynchronus functions to run site smoothly while awaiting response from api
async function youtubeFinder(search_key) {

    //implementing error handling for api requests
    try {
        // making a  request to the YouTube Data API's search endpoint
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${auth_key}&part=snippet&q=${search_key}`);

        // parsing the api response in json format
        const data = await response.json();

    
        // passing the json file items to the display function
        displayVideos(data.items);
        
    } // regular error handling
    catch (error) {
        console.error('Error finding YouTube videos:', error.message);
    }
}

// Function to display YouTube videos on the page
function displayVideos(videos) {
    // calling the dynamic student credentials function
    addMyStdCredentials();
    const videosContainer = document.getElementById('videos');

    // ensuring clean canvas for displaying new search results
    videosContainer.innerHTML = '';

    // dynamically adding search results in the index html code using a foreach loop
    videos.forEach(video => {
        const videoTitle = video.snippet.title;
        const videoThumbnail = video.snippet.thumbnails.medium.url;

        // creating HTML elements
        const videoElement = document.createElement('div');
        videoElement.classList.add('video');

        const thumbnailElement = document.createElement('img');
        thumbnailElement.src = videoThumbnail;

        const titleElement = document.createElement('h3');
        titleElement.textContent = videoTitle;

        // Append elements to container
        videoElement.appendChild(thumbnailElement);
        videoElement.appendChild(titleElement);
        videosContainer.appendChild(videoElement);
    });
}

// writing function to parse search button click
function searchParser() {
    const searchInput = document.getElementById('search-input');
    const query = searchInput.value.trim();

    if (query !== '') {
        youtubeFinder(query);
    } else {
        alert('Please enter a not null search query');
    }
}

// Event listener for search button click
let search_term = document.getElementById('search-button').addEventListener('click', searchParser);

// calling the youtubeFinder function with a default search query when the page loads
window.addEventListener('load', () => {
    youtubeFinder('Georgian College'); // Default search query
});
