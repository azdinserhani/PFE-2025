import { BiLike } from "react-icons/bi";
import FeatureCard from "./FeatureCard";
import { FaMedal } from "react-icons/fa6";
import { MdOutlineDeveloperMode } from "react-icons/md";
import { CiFaceSmile } from "react-icons/ci";
const Features = () => {
  const featureContent = [
    {
      icon: BiLike,
      title: "Relaxing & Learning",
      desc: "The phrasal sequence of the is now so that many campaign and benefit",
    },
    {
      icon: FaMedal,
      title: "Certificate",
      desc: "Receive a certificate upon completion of the course to showcase your achievement.",
    },
    {
      icon: MdOutlineDeveloperMode,
      title: "Private Mentoring",
      desc: "Get one-on-one mentoring sessions to help you with your learning journey.",
    },
    {
      icon: CiFaceSmile,
      title: "Creative Thinking",
      desc: "Enhance your creative thinking skills with our specially designed activities.",
    },
  ];
  return (
    <div className="h-[80vh] flex flex-col  items-center justify-center">
      <h2 className="text-4xl font-bold">Discover Powerful Features</h2>
      <p className="text-gray-400 font-bold mt-4">
        Discover a world of knowledge and opportunities with our online
        education platform pursue a new career.
      </p>
      <div className="flex gap-6 mt-12 p-4">
        {featureContent.map((feature) => {
          return <FeatureCard item={feature} icon={feature.icon} />;
        })}
      </div>
    </div>
  );
};

export default Features;
