import { useRef, useState, useEffect } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger)

export const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [backgroundIndex] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [, setLoadedVideos] = useState(0);
  const [activeBackgroundVideo, setActiveBackgroundVideo] = useState(1);

  const totalVideos = 4;

  const nextVideoRef = useRef(null);
  const backgroundVideo1Ref = useRef(null);
  const backgroundVideo2Ref = useRef(null);

  // ✅ Manejo de carga de videos
  const handleVideoLoad = () => {
    setLoadedVideos((prev) => {
      const updated = prev + 1;
      if (updated === totalVideos) {
        setIsLoading(false);
      }
      return updated;
    });
  };

  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  const upComingVideoIndex = (currentIndex % totalVideos) + 1;

  const handleMiniVidClick = () => {
    setHasClicked(true);
    setCurrentIndex(upComingVideoIndex);
  };

  // Crossfade suave entre videos de fondo
  useEffect(() => {
    if (hasClicked) {
      const timer = setTimeout(() => {
        const currentVideo =
          activeBackgroundVideo === 1
            ? backgroundVideo1Ref.current
            : backgroundVideo2Ref.current;
        const nextVideo =
          activeBackgroundVideo === 1
            ? backgroundVideo2Ref.current
            : backgroundVideo1Ref.current;

        if (nextVideo) {
          nextVideo.src = getVideoSrc(currentIndex);
          nextVideo.currentTime = currentVideo?.currentTime || 0;
          nextVideo.play();

          gsap.to(currentVideo, { opacity: 0, duration: 0.5 });
          gsap.to(nextVideo, { opacity: 1, duration: 0.5 });

          setActiveBackgroundVideo(activeBackgroundVideo === 1 ? 2 : 1);
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, hasClicked, activeBackgroundVideo]);

  // Animación del mini video al hacer clic
  useGSAP(
    () => {
      if (hasClicked) {
        const nextVideo = nextVideoRef.current;
        if (!nextVideo) return;

        gsap.set("#next-video", { visibility: "visible" });

        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => {
            nextVideo.play();
          },
          onComplete: () => {
            setHasClicked(false);
          },
        });

        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    {
      dependencies: [currentIndex],
      revertOnUpdate: true,
    }
  );

  // Animación del marco de video con scroll
  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
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

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {/* ✅ Loader */}
      {isLoading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot" />
            <div className="three-body__dot" />
            <div className="three-body__dot" />
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden"
      >
        {/* Mini video clickable */}
        <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
          <div
            onClick={handleMiniVidClick}
            className="origin-center scale-50 opacity-0 transition-all duration-300 ease-in hover:scale-100 hover:opacity-100"
          >
            <video
              ref={nextVideoRef}
              src={getVideoSrc(upComingVideoIndex)}
              loop
              muted
              id="current-video"
              className="size-64 origin-center scale-150 object-cover object-center rounded-lg"
              onLoadedData={handleVideoLoad}
            />
          </div>
        </div>

        {/* Video grande que crece al hacer clic */}
        <video
          ref={nextVideoRef}
          src={getVideoSrc(currentIndex)}
          loop
          muted
          id="next-video"
          className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
          onLoadedData={handleVideoLoad}
        />

        {/* ✅ Videos de fondo alternados para crossfade */}
        <video
          ref={backgroundVideo1Ref}
          src={getVideoSrc(backgroundIndex)}
          autoPlay
          loop
          muted
          className="absolute left-0 top-0 size-full object-cover object-center"
          style={{ opacity: activeBackgroundVideo === 1 ? 1 : 0 }}
          onLoadedData={handleVideoLoad}
        />
        <video
          ref={backgroundVideo2Ref}
          src={getVideoSrc(backgroundIndex)}
          loop
          muted
          className="absolute left-0 top-0 size-full object-cover object-center"
          style={{ opacity: activeBackgroundVideo === 2 ? 1 : 0 }}
          onLoadedData={handleVideoLoad}
        />

        {/* Texto y botón */}
        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          G<b>a</b>ming
        </h1>
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              Redefi<b>n</b>e
            </h1>
            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Enter the Metagame Layer <br />
              Unleash the play Economy
            </p>
            <Button
              id="watch-trailer"
              title="Watch Trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="!bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        G<b>a</b>ming
      </h1>
    </div>
  );
};
