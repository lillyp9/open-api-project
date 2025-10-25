let artworkId = null;
const API_URL =
  "https://api.artic.edu/api/v1/artworks/search?q=painting&fields=id,title,image_id&has_image=1&limit=20";

const artworkImageButton = document.querySelector("#artwork-image-button");
const artworkInfoButton = document.querySelector("#artwork-info-button");

const imgEl = document.querySelector(".artwork-img");
const imgTitle = document.querySelector(".img-title");

const imgDescription = document.querySelector(".img-description");
const copyrightText = document.querySelector(".copyright");
const IMAGE_SIZE = 600;

async function fetchArtistImage() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    const randomImage = data.data[Math.floor(Math.random() * data.data.length)];
    const imageId = randomImage.image_id;
    artworkId = randomImage.id;
    const baseURL = data.config.iiif_url;
    const fullImageURL = `${baseURL}/${imageId}/full/${IMAGE_SIZE},/0/default.jpg`;
    imgEl.src = fullImageURL;
    imgTitle.textContent = "";
    imgDescription.textContent = "";
  } catch (error) {
    console.error("Fetch error:", error);
  }
}
//Artwork Info//
async function fetchArtworkInfo(id) {
  try {
    const response = await fetch(`https://api.artic.edu/api/v1/artworks/${id}`);
    if (!response.ok) throw new Error("Network response was not ok");
    const { data } = await response.json();
    const { title, description } = data;

    imgTitle.textContent = title;
    imgDescription.innerHTML = description;
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

//Button Event Listeners//
artworkImageButton.addEventListener("click", () => {
  fetchArtistImage();
});
artworkInfoButton.addEventListener("click", () => {
  if (!artworkId) return;
  fetchArtworkInfo(artworkId);
  artworkId = null;
});
