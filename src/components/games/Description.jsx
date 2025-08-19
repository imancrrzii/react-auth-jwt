import { Grid, Grip, MoreHorizontal, MoveUpRight } from "lucide-react";
import image1 from "../../assets/images/games/9.png"
import image2 from "../../assets/images/games/30.png"

const segments = [
  { label: "Hiring", value: 20, color: "#8B5CF6" },
  { label: "Job Post", value: 40, color: "#3B82F6" },
  { label: "Joining", value: 40, color: "#EF4444" },
];

const totalValue = 100;
const radius = 80;
const strokeWidth = 20;
const normalizedRadius = radius - strokeWidth * 0.5;
const circumference = normalizedRadius * 2 * Math.PI;

const createArcPath = (startAngle, endAngle, radius) => {
  const startRad = (startAngle + 180) * (Math.PI / 180);
  const endRad = (endAngle + 180) * (Math.PI / 180);

  const x1 = 100 + radius * Math.cos(startRad);
  const y1 = 100 + radius * Math.sin(startRad);
  const x2 = 100 + radius * Math.cos(endRad);
  const y2 = 100 + radius * Math.sin(endRad);

  const largeArcFlag = endAngle - startAngle > 90 ? 1 : 0;

  return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`;
};

let currentAngle = 0;
const segmentPaths = segments.map((segment, index) => {
  const angle = (segment.value / totalValue) * 180;
  const startAngle = currentAngle;
  const endAngle = currentAngle + angle;

  const path = createArcPath(startAngle, endAngle, normalizedRadius);
  currentAngle += angle;

  return {
    ...segment,
    path,
    startAngle,
    endAngle,
  };
});

const Description = () => {
  return (
    <div className="bg-white px-2 py-12 md:p-12">
      <div className="flex flex-col md:flex-row justify-between gap-8 max-w-screen-xl mx-auto px-8 md:px-16 w-full items-center relative">
        <div className="w-full lg:w-1/2 flex flex-col gap-4 px-4">
          <div className="bg-gray-100 text-xs text-black font-bold px-3 py-2 w-fit rounded-full tracking-tight">
            How it works
          </div>
          <div
            className="text-2xl md:text-4xl font-black max-w-6xl md:leading-tight text-gray-900 drop-shadow-md max-w-sm"
            style={{
              textShadow:
                "2px 2px 4px rgba(255,255,255,0.8), -1px -1px 2px rgba(255,255,255,0.8)",
            }}
          >
            How HireSmart AI Simplifies Your Hiring Process
          </div>
          <div className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            eius minus quisquam totam fuga similique adipisci sint recusandae
            sit? Quae, illo minima!
          </div>
          <button className="flex gap-2 items-center text-sky-500 font-semibold bg-white border-2 border-sky-500 w-fit px-4 py-2 rounded-full mt-2">
            Request Demo <MoveUpRight className="w-4 h-4" />
          </button>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <div className="bg-sky-500 flex gap-3 px-6 py-4 justify-between rounded-2xl text-white text-sm">
            <div>😊 Joss</div>
            <div>😍 Laugh</div>
            <div>🤦‍♀️ Winking</div>
            <div>😎 Heart</div>
            <div>👌 Cute</div>
          </div>
          <div className="flex flex-col bg-gray-100 p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">
                Faster Time-to-Hire
              </h3>
              <button className="text-gray-400 hover:text-gray-600">
                <Grip size={20} />
              </button>
            </div>

            <div className="relative flex justify-center mb-6">
              <svg width="200" height="120" className="overflow-visible">
                <defs>
                  <filter
                    id="shadow"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feDropShadow
                      dx="0"
                      dy="2"
                      stdDeviation="3"
                      floodOpacity="0.1"
                    />
                  </filter>
                </defs>

                <path
                  d={`M 20 100 A ${normalizedRadius} ${normalizedRadius} 0 0 1 180 100`}
                  fill="transparent"
                  stroke="#f1f5f9"
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                />

                {segmentPaths.map((segment, index) => (
                  <path
                    key={`border-${index}`}
                    d={segment.path}
                    fill="transparent"
                    stroke="white"
                    strokeWidth={strokeWidth + 4}
                    strokeLinecap="round"
                    className="transition-all duration-300 ease-in-out"
                  />
                ))}

                {segmentPaths.map((segment, index) => (
                  <path
                    key={index}
                    d={segment.path}
                    fill="transparent"
                    stroke={segment.color}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    className="transition-all duration-300 ease-in-out hover:brightness-110"
                    filter="url(#shadow)"
                    style={{
                      filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                    }}
                  />
                ))}
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center pt-12">
                <div className="text-sm text-gray-500 mb-1">Windows</div>
                <div className="text-3xl font-bold text-gray-800">58%</div>
              </div>
            </div>

            <div className="flex justify-center gap-6">
              {segments.map((segment, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: segment.color }}
                  />
                  <span className="text-sm text-gray-600">{segment.label}</span>
                </div>
              ))}
            </div>
          </div>
          <img src={image1} alt="" className="absolute bottom-4 left-0 lg:left-1/2 lg:transform lg:-translate-x-1/2 w-12 h-12 lg:w-24 lg:h-24"/>
          <img src={image2} alt="" className="absolute bottom-20 right-6 w-12 h-12 lg:w-24 lg:h-24" />
        </div>
      </div>
    </div>
  );
};

export default Description;
