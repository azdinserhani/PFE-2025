import Plyr from "plyr-react";
import "plyr-react/plyr.css"; // Import styles
const Player = () => {
  return (
    <div className="">
      <Plyr
        source={{
          type: "video",
          sources: [
            {
              // src: "/vid.mkv", // Replace with your video URL
              type: "video/mp4",
            },
          ],
        }}
        options={{
          settings: ["speed"], // Show only the speed and quality options
          controls: [
            "play",
            "progress",
            "current-time",
            "mute",
            "volume",
            "captions",
            "settings",
            "pip",
            "airplay",
            "fullscreen",
            "rewind",
            "fast-forward",
          ],
          seekTime: 10,
        }}
      />
    </div>
  );
};

export default Player;
