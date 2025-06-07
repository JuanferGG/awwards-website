import { useRef } from "react";
import { useState, useEffect } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [backgroundIndex, setBackgroundIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);
  const [activeBackgroundVideo, setActiveBackgroundVideo] = useState(1); // 1 o 2

  const totalVideos = 4;
  const nextVideoRef = useRef(null);
  const backgroundVideo1Ref = useRef(null);
  const backgroundVideo2Ref = useRef(null);

  // Crossfade suave entre videos de fondo
  useEffect(() => {
    if (hasClicked) {
      const timer = setTimeout(() => {
        const currentVideo = activeBackgroundVideo === 1 ? backgroundVideo1Ref.current : backgroundVideo2Ref.current;
        const nextVideo = activeBackgroundVideo === 1 ? backgroundVideo2Ref.current : backgroundVideo1Ref.current;
        
        if (nextVideo) {
          // Configurar el nuevo video
          nextVideo.src = getVideoSrc(currentIndex);
          nextVideo.currentTime = currentVideo?.currentTime || 0;
          nextVideo.play();
          
          // Crossfade con GSAP
          gsap.to(currentVideo, { opacity: 0, duration: 0.5 });
          gsap.to(nextVideo, { opacity: 1, duration: 0.5 });
          
          // Cambiar el video activo
          setActiveBackgroundVideo(activeBackgroundVideo === 1 ? 2 : 1);
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, hasClicked, activeBackgroundVideo]);

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  const upComingVideoIndex = (currentIndex % totalVideos) + 1;

  const handleMiniVidClick = () => {
    setHasClicked(true);
    setCurrentIndex(upComingVideoIndex);
  };

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

  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden"
      >
        <div className="">
          {/* Video miniatura */}
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              onClick={handleMiniVidClick}
              className="origin-center scale-50 opacity-0 transition-all 
            duration-300 ease-in hover:scale-100 hover:opacity-100"
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
          {/* Video Grande */}
          <video
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
          
          {/* Videos de fondo alternados para crossfade */}
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
        </div>
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