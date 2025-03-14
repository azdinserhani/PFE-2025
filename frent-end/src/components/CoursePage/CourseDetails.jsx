import React from "react";
import CourseSections from "./CourseSections";

const CourseDetails = () => {
  return (
    <div className="flex flex-col justify-center items-center  gap-7">
      <h2 className="text-2xl font-semibold">Spoken English Popular Course</h2>
      <div className="flex items-center gap-1 w-full justify-center">
        <img
          src="/instu1.jpg"
          alt=""
          className="h-10 w-10 rounded-full object-cover"
        />
        <span>Calvin Carlo</span>
      </div>
      <div className="flex w-full justify-center gap-4 text-gray-500">
        <span>10 hours</span>
        <span>All Levels</span>
        <span>16 Lessons</span>
        <span>0 Quiz</span>
        <span>5 Students</span>
        <button>Enroll Now</button>
      </div>
      <img
        src="/Info2.jpg"
        alt=""
        className="h-[650px] w-[80%] rounded-2xl shadow-lg object-cover"
      />
      <div className="flex flex-col gap-3 w-[50%]">
        <span className="text-2xl font-semibold">Overview</span>
        <p className="text-gray-400">
          Ooh, name it after me! Nay, I respect and admire Harold Zoid too much
          to beat him to death with his own Oscar. Why would I want to know
          that? What's with you kids? Every other day it's food, food, food.
          Alright, I'll get you some stupid food. It's a T. It goes “tuh”. You
          seem malnourished. Are you suffering from intestinal parasites? I
          suppose I could part with 'one' and still be feared… And I'd do it
          again! And perhaps a third time! But that would be it. I'm just glad
          my fat, ugly mama isn't alive to see this day. I can explain. It's
          very valuable. I barely knew Philip, but as a clergyman I have no
          problem telling his most intimate friends all about him. Bender, we're
          trying our best. Kif might! You can crush me but you can't crush my
          spirit! Kif, I have mated with a woman. Inform the men. I'm Santa
          Claus! What are you hacking off? Is it my torso?! 'It is!' My precious
          torso! You, a bobsleder!? That I'd like to see! And I'd do it again!
          And perhaps a third time! But that would be it. My fellow Earthicans,
          as I have explained in my book 'Earth in the Balance”, and the much
          more popular ”Harry Potter and the Balance of Earth', we need to
          defend our planet against pollution. Also dark wizards.
        </p>
      </div>
      <div className="">
        <span className="text-2xl font-semibold">Curriculum</span>
        <CourseSections />
      </div>
    </div>
  );
};

export default CourseDetails;
