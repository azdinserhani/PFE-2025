import Plyr from "plyr-react";
import "plyr-react/plyr.css"; // Import styles

const Player = ({ lesson }) => {
  console.log(lesson);

  const videoSrc = lesson?.content;
  return (
    <div className="">
      <Plyr
        source={{
          type: "video",
          sources: [
            {
              src: videoSrc,
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
      <div className="mt-2 text-lg font-semibold">
        {lesson?.title || "Select a lesson to start"}
      </div>
    </div>
  );
};

export default Player;
