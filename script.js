const ARTWORK_ID = 15563;
const API_URL = `https://api.artic.edu/api/v1/artworks/${ARTWORK_ID}`;

async function fetchArtwork(){
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    const artwork = data.data;
   
    const title = artwork.title;
    const artist = artwork.artist_display;
    console.log("Title:", title);
    console.log("Artist:",artist);
  }
  catch (error) {
    console.error("Fetch error:", error);
}
}

fetchArtwork();


//Artwork 

// Reusing ARTWORK_ID and API_URL declared earlier

const artworkInfoButton = document.querySelector("#artwork-info-button");
const artworkImageButton = document.querySelector("#artwork-image-button");

const imgEl = document.querySelector(".artwork-img");
const imgTitle = document.querySelector(".img-title");

const imgDescription = document.querySelector(".img-description");
const copyrightText = document.querySelector(".copyright");
const IMAGE_SIZE = 600;

async function fetchArtistImage(){
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    const imageId = data.data.image_id;
    const baseURL =data.config.iiif_url;
    const fullImageURL = `${baseURL}/${imageId}/full/${IMAGE_SIZE},/0/default.jpg`;
    imgEl.src = fullImageURL;
  }
  catch (error) {
    console.error("Fetch error:", error);
}
}
//Artwork Info//
async function fetchArtworkInfo(){
  try{
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Network response was not ok");
    const {data} = await response.json();
    const {title, description} = data;

    imgTitle.textContent = title;
    imgDescription.innerHTML=description;
    
  }
  catch (error) {
    console.error("Fetch error:", error);
}
}

//Button Event Listeners//
artworkImageButton.addEventListener('click', () => { fetchArtistImage(); });

artworkInfoButton.addEventListener('click', () =>  {fetchArtworkInfo(); });