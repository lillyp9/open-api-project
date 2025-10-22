const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.static("public"));

app.get("/artwork", async (res) => {

try{
    const r = await fetch('https://api.artic.edu/api/v1/artworks/15563');
    const json = await r.json();

    const imageID = json?.data?.image_id;
    const iiifBase = "https://www.artic.edu/iiif/2";
    const imageURL = imageID ? `${iiifBase}/${imageID}/full/843,/0/default.jpg` : null;

    res.json({
        raw:json,
        title: json?.data?.title || "N/A",
        artist: json?.data?.artist_display || "N/A",
        date_display: json?.data?.date_display || "",
        medium_display: json?.data?.medium_display || "",
        image_url: imageURL
    });
} catch(error) {
    console.error("Error fetching artwork data:", error);
    res.status(500).json({error: "Failed to fetch artwork data"});
}
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
