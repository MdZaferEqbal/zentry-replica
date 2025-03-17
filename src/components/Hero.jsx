import gsap from "gsap";
import Button from "./Button";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [loadedVideos, setLoadedVideos] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const totalVideos = 4;
  const nextVideoRef = useRef(null);

  const upcomingVideoIndex =
    currentIndex === totalVideos ? 1 : currentIndex + 1;

  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex(upcomingVideoIndex);
  };

  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setIsLoading(false);
    }
  }, [loadedVideos]);

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set(`#current-video`, { visibility: "visible" });

        gsap.to(`#current-video`, {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1.025,
          ease: "power1.inOut",
          onStart: () => nextVideoRef.current.play(),
          onComplete: () =>
            gsap.set(`#current-video`, { visibility: "hidden" }),
        });

        gsap.from(`#next-video`, {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });

        gsap.to("#main-video", {
          duration: 1,
          onComplete: () => {
            document.getElementById("main-video").src =
              getVideoSrc(currentIndex);
          },
        });
      }
    },
    { dependencies: [currentIndex], revertOnUpdate: true }
  );

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
      borderRadius: "0% 0% 40% 10%",
    });

    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  const getVideoSrc = (index) => {
    return `/videos/hero-${index}.mp4`;
  };

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {isLoading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          {/* https://uiverse.io/G4b413l/tidy-walrus-92 */}
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden b-g-blue-75"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-x-hidden rounded-lg">
            <div
              onClick={handleMiniVdClick}
              className="origin-center scale-50 opacity-0 transition-all z-50 overflow-hidden duration-500 ease-in-out hover:scale-100 hover:opacity-100"
            >
              {/* Mini Next Video Picker*/}
              <video
                ref={nextVideoRef}
                src={getVideoSrc(upcomingVideoIndex)}
                loop
                muted
                id="next-video"
                className="size-64 origin-center scale-150 object-cover z-50 object-center overflow-hidden"
                onLoadedData={handleVideoLoad}
              ></video>
            </div>
          </div>

          {/* Current Background Video for Animation */}
          <video
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="current-video"
            className="absolute-center invisible rounded-lg absolute z-20 size-64 object-center object-cover"
            onLoadedData={handleVideoLoad}
          ></video>

          {/* Playing Video */}
          <video
            ref={nextVideoRef}
            src="/videos/hero-1.mp4"
            loop
            autoPlay
            muted
            id="main-video"
            className="absolute left-0 top-0 size-full object-center object-cover"
            onLoadedData={handleVideoLoad}
          ></video>
        </div>

        <h1 className="special-font font-zentry text-6xl sm:text-9xl hero-heading absolute bottom-5 right-5 z-40 color-blue-75">
          G<b>a</b>ming
        </h1>

        <div className="absolute left-0 top-0 z-40">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font font-zentry text-6xl sm:text-9xl hero-heading color-blue-100">
              redefi<b>n</b>e
            </h1>

            <p className="mb-5 max-w-64 font-robert-regular color-blue-100">
              Enter the Metagame Layer <br /> Unleash the Play Economy
            </p>

            <Button
              id="watch-trailer"
              title="Watch Trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="b-g-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>

      <h1 className="special-font font-zentry text-6xl sm:text-9xl hero-heading absolute bottom-5 right-5 text-black">
        G<b>A</b>MING
      </h1>
    </div>
  );
};

export default Hero;
