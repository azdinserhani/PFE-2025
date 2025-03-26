import React from "react";
import Player from "../../components/PlayCourse/Player";
import CourseSections from "../../components/CoursePage/CourseSections";

import CourseOverview from "../../components/PlayCourse/CourseOverview";

const PlayCourse = () => {
  return (
    <div className="flex p-5 gap-4 h-screen">
      <div className="flex-2/3 overflow-y-scroll">
        <div className="">
          <Player />
        </div>
        <CourseOverview />
      </div>

      <div className="flex-1/3 flex gap-3 flex-col overflow-y-scroll max-h-screen">
        <CourseSections />
        <CourseSections />
        <CourseSections />
        <CourseSections />
        <CourseSections />
        <CourseSections />
        <CourseSections />
      </div>
    </div>
  );
};

export default PlayCourse;
