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
              src: "http://localhost:3003/media/1746106457823-2%20-%20Meet%20Your%20Hosts%20Brad.mp4", // Replace with your video URL
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
