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
    