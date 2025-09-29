$(document).ready(() => {

    function createPlaylistCard(video) {
    const mainDiv = document.createElement("div");
    mainDiv.id = "card" + video.id;
    mainDiv.className = "playlist-card";

    const thumbnail = document.createElement("img");
    thumbnail.src = video.thumbnail;
    thumbnail.className = "thumbnail";

    const title = document.createElement("h3");
    title.className = "video-card-title";
    title.textContent = video.title;

    mainDiv.appendChild(thumbnail);
    mainDiv.appendChild(title);

    return mainDiv;
  }

  

  async function loadFiles() {
    try {
      const response = await fetch(
        "https://5d76bf96515d1a0014085cf9.mockapi.io/playlist"
      );
      const videos = await response.json();

      console.log(videos);

      const playlistWrapper = document.getElementById("playlist-wrapper");
      playlistWrapper.innerHTML = "";

      videos.forEach((video) => {
        const card = createPlaylistCard(video);
        playlistWrapper.appendChild(card);
      });
    } catch (error) {
      console.error("Error loading playlist:", error);
    }
  }

  loadFiles();
});
