$(document).ready(() => {
  function createPlaylistCard(video) {
    const card = document.createElement("div");
    card.id = "card" + video.id;
    card.className = "playlist-card";

    const thumbnail = document.createElement("img");
    thumbnail.src = video.thumbnail;
    thumbnail.className = "thumbnail";

    const title = document.createElement("h3");
    title.className = "video-card-title";
    title.textContent = video.title;

    card.appendChild(thumbnail);
    card.appendChild(title);

    card.addEventListener("click", async() => {
      const videoDetails = await getVideoDetails(video.id);
      setMainVideo(videoDetails);
      setActiveCard(video.id);
    });

    return card;
  }

    function setMainVideo(videoDetails) {
      const iframe = document.getElementById("video-player");
      iframe.src = `https://player.vimeo.com/video/${videoDetails.vimeoId}`;
      iframe.style.border = "none";
      iframe.allowFullscreen = true;

      document.getElementById("video-title").textContent = videoDetails.title;
      document.getElementById("video-description").textContent = videoDetails.description || "";
      document.getElementById("views-count").textContent = videoDetails.views || "0";
    }

  function setActiveCard(activeId) {
    const cards = document.querySelectorAll(".playlist-card");
    cards.forEach((card) => card.classList.remove("active-card"));
    const activeCard = document.getElementById("card" + activeId);
    if (activeCard) activeCard.classList.add("active-card");
  }

  async function loadFiles() {
    try {
      const response = await fetch(
        "https://5d76bf96515d1a0014085cf9.mockapi.io/playlist"
      );
      const videos = await response.json();

      const playlistWrapper = document.getElementById("playlist-wrapper");
      playlistWrapper.innerHTML = "";

      for (let i = 0; i <= 9; i++) {
        let video = videos[i];
        const card = createPlaylistCard(video);
        playlistWrapper.appendChild(card);
      }

      if(videos.length > 0){
        const firstVideoDetails = await getVideoDetails(videos[0].id);
        setMainVideo(firstVideoDetails);
        setActiveCard(videos[0].id);
      }
    } catch (error) {
      console.error("Error loading playlist:", error);
    }
  }

  async function getVideoDetails(videoID) {
    try {
      const response = await fetch(
        `https://5d76bf96515d1a0014085cf9.mockapi.io/video/${videoID}`
      );

      const videoDetails = await response.json();
      return videoDetails;
    } catch (error) {
      console.error(error);
    }
  }

  loadFiles();
});
