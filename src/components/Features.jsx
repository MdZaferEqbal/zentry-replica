import { useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";

const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");

  const itemRef = useRef();

  const handleMouseMove = (e) => {
    if (!itemRef.current) return;

    const videoElement = itemRef.current?.querySelector("video");

    videoElement.play();

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.98, .98, .98)`;

    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    const videoElement = itemRef.current?.querySelector("video");

    videoElement.pause();
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`bento-tilt-container ${className}`}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

const BentoCard = ({ videoSrc, title, description }) => {
  return (
    <div className="text-amber-50 reltaive size-full" data-id="bento-card">
      <video
        className="absolute top-0 left-0 size-full object-cover object-center"
        src={videoSrc}
        loop
        muted
        data-id="bento-backdrop-video"
      />
      <div className="relative z-10 flex size-full justify-between flex-col p-5 text-blue-50">
        <div>
          <h1 className="uppercase md:text-6xl text-4xl font-black font-zentry special-font">
            {title}
          </h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section id="prologue" className="bg-black pb-52">
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32">
          <p className="font-circular-web text-lg text-blue-50">
            Into the Meatagame Layer
          </p>
          <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
            Immerse yourself in a rich and ever-expanding universe where a
            vibrant array of products converge into an interconnected overlay
            experience on your world.
          </p>
        </div>
        <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
          <BentoCard
            videoSrc="videos/feature-1.mp4"
            title={
              <>
                radie<b>n</b>t
              </>
            }
            description="A cross-platform metagame app, turning your activities across Web2 and Web3 games into a rewarding adventure."
          />
        </BentoTilt>

        <div className="grid h-[135vh] grid-cols-2 grid-rows-3 gap-7">
          <BentoTilt className="relative border-hsla col-span-2 overflow-hidden rounded-md transition-transform duration-300 ease-out row-span-1 md:col-span-1 md:row-span-2">
            <BentoCard
              videoSrc="videos/feature-2.mp4"
              title={
                <>
                  zig<b>m</b>a
                </>
              }
              description="An anime and gaming-inspired NFT collection - the IP primed for expansion."
            />
          </BentoTilt>

          <BentoTilt className="relative border-hsla col-span-2 overflow-hidden rounded-md transition-transform duration-300 ease-out row-span-1 ms-32 md:col-span-1 md:ms-0">
            <BentoCard
              videoSrc="videos/feature-3.mp4"
              title={
                <>
                  n<b>e</b>xus
                </>
              }
              description="A gamified social hub, adding a new dimension of play to social interaction for Web3 communities."
            />
          </BentoTilt>

          <BentoTilt className="relative border-hsla col-span-2 overflow-hidden rounded-md transition-transform duration-300 ease-out me-14 md:col-span-1 md:me-0">
            <BentoCard
              videoSrc="videos/feature-4.mp4"
              title={
                <>
                  az<b>u</b>l
                </>
              }
              description="A cross-world AI Agent - elevating your gameplay to be more fun and productive."
            />
          </BentoTilt>

          <div className="relative col-span-1 row-span-1 overflow-hidden rounded-md transition-transform duration-300 ease-out">
            <div className="flex-col size-full p-5 flex justify-between bg-[#5543fe]">
              <h1 className="md:text-6xl text-4xl font-black font-zentry special-font uppercase max-w-64 text-black">
                M<b>o</b>re co<b>m</b>ing s<b>o</b>on!
              </h1>
              <TiLocationArrow className="m-5 scale-[5] self-end" />
            </div>
          </div>

          <div className="relative col-span-1 row-span-1 overflow-hidden rounded-md transition-transform duration-300 ease-out">
            <video
              src="videos/feature-5.mp4"
              loop
              muted
              autoPlay
              className="size-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
