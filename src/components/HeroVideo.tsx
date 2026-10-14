import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { cn } from "../utils/cn";
import heroVideo from "../assets/hero.mp4";
import heroVideoMobile from "../assets/hero-mobile.mp4";
import heroPoster from "../assets/hero-poster.jpg";
import heroPosterMobile from "../assets/hero-poster-mobile.jpg";

/** Duração (ms) da dissolução entre o fim do vídeo e o recomeço do loop. */
const FADE_MS = 800;

/** O esquiador fica à direita; no corte vertical (celular/tablet) mantemos o foco nele. */
const FRAMING = "object-cover object-[92%_50%] lg:object-[85%_50%]";

type NetworkNavigator = Navigator & { connection?: { saveData?: boolean; effectiveType?: string } };

/** Economia de dados ou conexão 2G: nesses casos nem baixamos o vídeo. */
function hasConstrainedConnection(): boolean {
  const connection = (navigator as NetworkNavigator).connection;
  return (
    connection?.saveData === true ||
    connection?.effectiveType === "slow-2g" ||
    connection?.effectiveType === "2g"
  );
}

/**
 * Visual principal do Hero: o vídeo do esquiador, com a imagem (poster) por baixo.
 *
 * - `hero.mp4` no desktop e `hero-mobile.mp4` no celular. Só a versão usada é baixada.
 * - O poster carrega primeiro; o vídeo só é adicionado depois dele, para não disputar banda.
 * - autoplay + muted + loop + playsInline, sem controles.
 * - Se o vídeo não carregar, não tocar ou der erro, continua só o poster.
 * - `prefers-reduced-motion`, economia de dados e conexão 2G: só o poster, sem baixar o vídeo.
 * - Pausa quando o Hero sai da tela e quando a aba fica em segundo plano.
 * - No fim do loop, dissolve para o primeiro quadro (o poster) em vez de um corte seco.
 */
export default function HeroVideo() {
  const reduceMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [constrained] = useState(hasConstrainedConnection);

  const videoRef = useRef<HTMLVideoElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);
  const [posterReady, setPosterReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const [failed, setFailed] = useState(false);

  const posterSrc = isMobile ? heroPosterMobile : heroPoster;
  const videoSrc = isMobile ? heroVideoMobile : heroVideo;
  const showVideo = !reduceMotion && !constrained && !failed && posterReady;

  // Poster já em cache (ou versão trocada): libera o vídeo sem esperar o evento onLoad.
  useEffect(() => {
    const image = posterRef.current;
    setPosterReady(Boolean(image?.complete && image.naturalWidth > 0));
  }, [posterSrc]);

  // Ao trocar de versão (desktop <-> celular), esconde o vídeo até o novo começar.
  useEffect(() => {
    setPlaying(false);
    setFadingOut(false);
    setFailed(false);
  }, [isMobile]);

  // Pausa fora da tela e com a aba em segundo plano (economiza bateria e CPU).
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true; // alguns navegadores só liberam autoplay com a propriedade definida
    let inView = true;

    const sync = () => {
      if (inView && !document.hidden) void video.play().catch(() => undefined);
      else video.pause();
    };

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    observer.observe(video);
    document.addEventListener("visibilitychange", sync);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [showVideo, isMobile]);

  // Com `loop`, o navegador volta ao início sozinho: escondemos o vídeo um pouco antes do fim
  // (o poster, que é o primeiro quadro, aparece por baixo) e mostramos de novo quando recomeça.
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    if (video.duration - video.currentTime < FADE_MS / 1000 + 0.15) setFadingOut(true);
    else if (video.currentTime < 1) setFadingOut(false);
  };

  return (
    <>
      <img
        ref={posterRef}
        src={posterSrc}
        alt=""
        aria-hidden="true"
        decoding="async"
        onLoad={() => setPosterReady(true)}
        onError={() => setPosterReady(true)}
        className={cn("absolute inset-0 h-full w-full", FRAMING)}
      />
      {showVideo ? (
        <video
          key={isMobile ? "mobile" : "desktop"}
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          aria-hidden="true"
          tabIndex={-1}
          onPlaying={() => setPlaying(true)}
          onTimeUpdate={handleTimeUpdate}
          onError={() => setFailed(true)}
          style={{ transitionDuration: `${FADE_MS}ms` }}
          className={cn(
            "pointer-events-none absolute inset-0 h-full w-full transition-opacity ease-in-out",
            FRAMING,
            playing && !fadingOut ? "opacity-100" : "opacity-0",
          )}
        />
      ) : null}
    </>
  );
}
