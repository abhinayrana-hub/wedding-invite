import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { MapPin, ChevronDown, Download, Music } from "lucide-react";
// import * as htmlToImage from "html-to-image";
import html2canvas from "html2canvas";
// add these imports just below the existing imports
import ganeshImg from "./assets/ganesh.png";
import groomImg from "./assets/groom.png";
import brideImg from "./assets/bride.png";
import background from "./assets/background1.png";
import sitarMusic from "./assets/background_music.mp3";
import FallingPetals from "./components/FallingPetals";

/** ---------- IMAGES (you can later move these to /public/assets) ---------- */
// const ASSETS = {
//   ganesh:
//     "https://videos.openai.com/vg-assets/assets%2Ftask_01k2pm9w5jefs9b72r99vd9smt%2F1755253777_img_0.webp?st=2025-08-15T08%3A43%3A24Z&se=2025-08-21T09%3A43%3A24Z&sks=b&skt=2025-08-15T08%3A43%3A24Z&ske=2025-08-21T09%3A43%3A24Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=8ebb0df1-a278-4e2e-9c20-f2d373479b3a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=4CvwYG2ktzVEhHivzp02Fe%2B88PQ78JRzdjw5RR7GQM0%3D&az=oaivgprodscus",
//   groom:
//     "https://videos.openai.com/vg-assets/assets%2Ftask_01k2pnjwp8ep3sa5zzhh1zrf2s%2F1755255110_img_0.webp?st=2025-08-15T09%3A37%3A07Z&se=2025-08-21T10%3A37%3A07Z&sks=b&skt=2025-08-15T09%3A37%3A07Z&ske=2025-08-21T10%3A37%3A07Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=8ebb0df1-a278-4e2e-9c20-f2d373479b3a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=MtIdxtKT2d43QeLcJbPDhB4q51VzQWhXub6upGSVFeA%3D&az=oaivgprodscus",
//   bride:
//     "https://videos.openai.com/vg-assets/assets%2Ftask_01k2pkkgv9fa88nt5v12n3whcd%2F1755253013_img_1.webp?st=2025-08-15T08%3A39%3A30Z&se=2025-08-21T09%3A39%3A30Z&sks=b&skt=2025-08-15T08%3A39%3A30Z&ske=2025-08-21T09%3A39%3A30Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=8ebb0df1-a278-4e2e-9c20-f2d373479b3a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=wgpObF%2F%2Fq3QWX5Ew0EouJCZWPQ0JRtLO1gNFDngWbDQ%3D&az=oaivgprodscus",
// };

const ASSETS = {
  ganesh: ganeshImg,
  groom: groomImg,
  bride: brideImg,
};

/** ---------- MAP LINKS (replace with your real Google Maps URLs) ---------- */
const MAP_LINKS = {
  groom: "https://maps.google.com/?q=31.867374,76.543053",
  bride: "https://maps.google.com/?q=31.805571,76.472298",
};

/** ---------- Small layout helpers ---------- */
const Section = ({ id, children, className = "" }) => (
  <section
    id={id}
    className={`min-h-screen w-full flex items-center justify-center px-4 sm:px-6 md:px-10 ${className}`}
  >
    <div className="max-w-5xl w-full">{children}</div>
  </section>
);

/** ---------- Curtain + Ganesh intro ---------- */
function CurtainIntro({ onDone }) {
  const [open, setOpen] = useState(false); // drives the two side curtains
  const [fade, setFade] = useState(false); // fades Ganesh out before closing

  useEffect(() => {
    const t1 = setTimeout(() => setOpen(true), 1500); // curtains slide
    const t2 = setTimeout(() => setFade(true), 3200); // keep Ganesh visible for a bit, then start fading
    const t3 = setTimeout(() => onDone?.(), 3800); // remove overlay after fade starts

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-rose-50 via-amber-50 to-rose-100 overflow-hidden ">
      {/* ... keep the background pattern as-is ... */}

      {/* Center Ganesh: stays visible while curtains move, then fades */}
      <motion.div
        initial={{ scale: 0.98, opacity: 1 }}
        animate={{ scale: open ? 1 : 0.98, opacity: fade ? 0 : 1 }}
        transition={{
          scale: { type: "spring", stiffness: 80, damping: 15 },
          opacity: { duration: 2 }, // fade over 2 seconds
        }}
        className="absolute inset-0 flex items-center justify-center mr-20 md:mr-0"
      >
        <div className="flex flex-col items-center">
          <div className="w-[70vw] sm:w-[55vw] md:w-[40vw] lg:w-[33vw] max-w-[520px] aspect-square rounded-2xl bg-white/80 backdrop-blur shadow-xl flex items-center justify-center border border-amber-200 overflow-hidden">
            {ASSETS.ganesh ? (
              <img
                src={ASSETS.ganesh}
                alt="Shri Ganesh"
                className="w-full h-full object-contain"
              />
            ) : (
              <span className="text-7xl">🕉️</span>
            )}
          </div>
          <p className="mt-5 text-center text-base text-rose-700 devnagari">
            ॐ श्री गणेशाय नमः
          </p>
        </div>
      </motion.div>

      {/* Curtain panels (unchanged) */}
      {/* ... keep your two motion divs for the panels ... */}

      <div className="absolute inset-0 flex items-center justify-center mr-20 md:mr-0">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: open ? "-100%" : 0 }}
          transition={{ type: "spring", stiffness: 60, damping: 18 }}
          className="w-1/2 h-full bg-rose-200/80 border-r border-rose-300 shadow-xl"
        />
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: open ? "100%" : 0 }}
          transition={{ type: "spring", stiffness: 60, damping: 18 }}
          className="w-1/2 h-full bg-amber-200/80 border-l border-amber-300 shadow-xl"
        />
      </div>

      <button
        onClick={onDone}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs px-3 py-1 rounded-full border border-rose-300 bg-white/70 hover:bg-white transition"
      >
        Skip
      </button>
    </div>
  );
}

/** ---------- Hero section ---------- */
function Hero({ reveal = false }) {
  return (
    <Section id="home" className="pt-24 pb-20">
      <div className="text-center">
        {/* <p className="text-sm tracking-widest text-rose-700 devnagari">
          ॐ श्री गणेशाय नमः
        </p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 70, damping: 15 }}
          className="mt-3 text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 devnagari"
        >
          विघ्न हरण मंगल करण, श्री गणपति महाराज,
          <br className="hidden sm:block" />
          प्रथम निमंत्रण आपको, मेरे पूरण करिये काज।।
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-base md:text-lg text-gray-700 devnagari"
        >
          आओ जी रल मनालिये गौरां दे लाल नूँ — शंकर दे लाल नू, आओ जी रल मनालिये
        </motion.p> */}

        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 80, damping: 14 }}
          className="text-center"
        >
          <p className="text-sm tracking-widest text-rose-700 devnagari">
            ॐ श्री गणेशाय नमः
          </p>
          <h1 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 devnagari">
            विघ्न हरण मंगल करण, श्री गणपति महाराज,
            <br className="hidden sm:block" />
            प्रथम निमंत्रण आपको, मेरे पूरण करिये काज।।
          </h1>
          <p className="mt-4 text-base md:text-lg text-gray-700 devnagari">
            आओ जी रल मनालिये गौरां दे लाल नूँ — शंकर दे लाल नू, आओ जी रल मनालिये
          </p>
        </motion.div>

        {/* Middle text */}
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={reveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 14,
              delay: 0.05,
            }}
            className="mt-6 text-center text-sm text-gray-700 devnagari"
          >
            Smt. Brahmi and Late Shri Jaswant Singh request the pleasure of your
            presence on the auspicious occasion of the wedding ceremony of their
            loving grandson
          </motion.div>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Groom */}
          <motion.div
            initial={{ opacity: 0, x: -120 }}
            animate={reveal ? { opacity: 1, x: 0 } : { opacity: 0, x: -120 }}
            transition={{ type: "spring", stiffness: 90, damping: 16 }}
            className="flex flex-col items-center"
          >
            <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full overflow-hidden shadow-lg ring-2 ring-rose-200 bg-white flex items-center justify-center">
              {ASSETS.groom ? (
                <img
                  src={ASSETS.groom}
                  alt="Groom"
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-5xl">
                  🧑🏻‍💼🙏
                </div>
              )}
            </div>
            <h3 className="mt-3 text-xl font-medium">Abhinay</h3>
            <p className="mt-1 text-xs text-gray-600 text-center">
              S/o Smt. Ranjna Rana &amp; Kuldeep Chand Rana
            </p>
            <a
              href={MAP_LINKS.groom}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-rose-700 hover:underline"
            >
              <MapPin className="w-4 h-4" /> Navigate to Groom Location
            </a>
          </motion.div>

          {/* Middle text */}
          <div className="flex flex-col items-center">
            {/* <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={reveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 14,
                delay: 0.05,
              }}
              className="mt-4 text-center text-sm text-gray-700"
            
              Smt. Brahmi and Late Shri Jaswant Singh request the pleasure of
              your presence on the auspicious occasion of the wedding ceremony
              of their loving grandson
            </motion.div> */}

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 80, damping: 12 }}
              className="text-2xl md:text-5xl my-8"
            >
              &amp;
            </motion.div>
          </div>

          {/* Bride */}
          <motion.div
            initial={{ opacity: 0, x: 120 }}
            animate={reveal ? { opacity: 1, x: 0 } : { opacity: 0, x: 120 }}
            transition={{ type: "spring", stiffness: 90, damping: 16 }}
            className="flex flex-col items-center"
          >
            <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full overflow-hidden shadow-lg ring-2 ring-amber-200 bg-white flex items-center justify-center">
              {ASSETS.bride ? (
                <img
                  src={ASSETS.bride}
                  alt="Bride"
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-5xl">
                  👰🏻‍♀️🙏
                </div>
              )}
            </div>
            <h3 className="mt-3 text-xl font-medium">Shilpa</h3>
            <p className="mt-1 text-xs text-gray-600 text-center">
              D/o Smt. Neelam &amp; Baljeet Singh Jaswal
              <br />
              Vill. Bhadriana &amp; P.O. Karot, Tehsil Sujanpur, Distt.
              Hamirpur, Himachal Pradesh
            </p>
            <a
              href={MAP_LINKS.bride}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-amber-700 hover:underline"
            >
              <MapPin className="w-4 h-4" /> Navigate to Bride Location
            </a>
          </motion.div>
        </div>
        <a
          href="#details"
          className="mt-12 inline-flex flex-col items-center text-sm text-gray-600"
        >
          <span>Scroll for details</span>
          <ChevronDown className="w-5 h-5 animate-bounce mt-1" />
        </a>
      </div>
    </Section>
  );
}

/** ---------- Day schedule card ---------- */
function DaySchedule({ title, date, items, accent = "rose" }) {
  return (
    <div
      className={`rounded-2xl shadow-sm border p-5 md:p-6  bg-gradient-to-r from-red-50 via-amber-50 to-rose-100  backdrop-blur ${
        accent === "rose"
          ? "border-rose-100"
          : accent === "amber"
          ? "border-amber-100"
          : "border-emerald-100"
      }`}
    >
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">{date}</p>
      <ul className="mt-4 space-y-2">
        {items.map((it, idx) => (
          <li key={idx} className="flex items-start gap-3">
            {/* the bullet dot */}
            <span className="mt-1 inline-block w-2 h-2 rounded-full bg-gray-400" />
            {/* label and time on one line; time aligned right */}
            <span className="flex-1 flex justify-between">
              <span className="text-gray-800">{it.label}</span>
              <span className="text-gray-600 text-sm tabular-nums">
                {it.time}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** ---------- Details section ---------- */
function Details() {
  const tuesday = [
    { label: "Lady Sangeet & Mehandi", time: "8:00 a.m." },
    { label: "Samuhat and Haldi", time: "10:00 a.m." },
    { label: "Shand", time: "5:30 p.m." },
    { label: "Snacks (Ladies & kids only)", time: "6:30 p.m." },
    { label: "Dinner", time: "8:30 p.m." },
    { label: "Parshai and Sherabandi", time: "10:00 p.m." },
  ];

  const wednesday = [
    { label: "Departure of Barat", time: "7:30 a.m." },
    { label: "Lagan", time: "9:00 a.m." },
    { label: "Badhu Aagaman", time: "5:30 p.m." },
    { label: "Dinner", time: "8:00 p.m." },
  ];

  const thursday = [
    { label: "DaranSharatri & Tila Baba Poojan", time: "9:00 a.m." },
    { label: "Puari Dham", time: "12:00 p.m." },
  ];

  return (
    <Section id="details" className="py-20">
      <div className="text-center mb-10">
        <p className="text-sm tracking-widest text-rose-700 devnagari">
          श्री गणेशाय नमः
        </p>
        <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-gray-800">
          Golden Moments
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6  ">
        <DaySchedule
          title="Tuesday"
          date="21st October, 2025"
          items={tuesday}
          accent="rose"
        />
        <DaySchedule
          title="Wednesday"
          date="22nd October, 2025"
          items={wednesday}
          accent="amber"
        />
        <DaySchedule
          title="Thursday"
          date="23rd October, 2025"
          items={thursday}
          accent="emerald"
        />
      </div>

      <div className="mt-12 text-center text-sm text-gray-600">
        <p>
          We look forward to celebrating with you. Your presence is the greatest
          gift.
        </p>
      </div>
    </Section>
  );
}

/** ---------- Hidden shareable PNG poster (1080×1920) ---------- */
function ShareCard() {
  return (
    <div
      id="share-card"
      className="fixed -left-[9999px] top-0 w-[1080px] h-[1920px] p-16 bg-gradient-to-b from-white via-rose-50 to-amber-50"
    >
      <div className="w-full h-full rounded-3xl p-10 border-4 border-rose-200 bg-white/70 backdrop-blur flex flex-col items-center justify-between shadow">
        <div className="text-center">
          <div className="mx-auto w-44 h-44 rounded-full bg-white/80 shadow flex items-center justify-center overflow-hidden ring-2 ring-rose-200">
            {ASSETS.ganesh ? (
              <img
                src={ASSETS.ganesh}
                alt="Shri Ganesh"
                className="w-36 h-36 object-contain"
              />
            ) : (
              <span className="text-6xl">🕉️</span>
            )}
          </div>
          <div className="mt-6 text-2xl devnagari">ॐ श्री गणेशाय नमः</div>
        </div>

        <div className="text-center">
          <div className="text-5xl font-semibold">Abhinay ♥ Shilpa</div>
          <div className="mt-3 text-xl text-gray-700">
            Golden Moments · 21–23 Oct 2025
          </div>
          <div className="mt-6 flex items-center justify-center gap-8">
            <div className="w-44 h-44 rounded-full overflow-hidden ring-2 ring-rose-200 bg-white flex items-center justify-center">
              {ASSETS.groom ? (
                <img
                  src={ASSETS.groom}
                  alt="Groom"
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>
            <div className="w-44 h-44 rounded-full overflow-hidden ring-2 ring-amber-200 bg-white flex items-center justify-center">
              {ASSETS.bride ? (
                <img
                  src={ASSETS.bride}
                  alt="Bride"
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>
          </div>
        </div>

        <div className="text-center text-lg text-gray-700">
          We look forward to celebrating with you!
        </div>
      </div>
    </div>
  );
}

/** ---------- App root ---------- */
export default function App() {
  const [introDone, setIntroDone] = useState(false);
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [audioBlocked, setAudioBlocked] = useState(false);

  // 👉 NEW: track full document height for the petals layer
  const [pageHeight, setPageHeight] = useState(0);
  useEffect(() => {
    const updateHeight = () => {
      const h = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        document.documentElement.clientHeight
      );
      setPageHeight(h);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    // re-measure after curtains end (DOM grows)
    const id = setTimeout(updateHeight, 400);
    return () => {
      window.removeEventListener("resize", updateHeight);
      clearTimeout(id);
    };
  }, []);
  useEffect(() => {
    // measure again when intro finishes
    const r = requestAnimationFrame(() => {
      const h = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        document.documentElement.clientHeight
      );
      setPageHeight(h);
    });
    return () => cancelAnimationFrame(r);
  }, [introDone]);

  // Smooth scroll for anchor links
  useEffect(() => {
    const handler = (e) => {
      const a = e.target.closest("a[href^='#']");
      if (!a) return;
      const id = a.getAttribute("href")?.slice(1);
      const el = id ? document.getElementById(id) : null;
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  // useEffect(() => {
  //   const a = audioRef.current;
  //   if (a) {
  //     // Attempt to start playing immediately when the component mounts
  //     a.play()
  //       .then(() => setPlaying(true))
  //       .catch(() => {
  //         // If autoplay is blocked, the Play button will still work
  //       });
  //   }
  // }, []);

  // Try to autoplay with sound on load/refresh. If blocked by the browser, keep retrying for a few seconds
  // and resume whenever the tab regains focus/visibility. We still respect a saved user pause preference.
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    a.loop = true;
    a.muted = false;

    const getPref = () => localStorage.getItem("musicPref") || "play";

    // Start on first interaction only
    const unlock = () => {
      if (getPref() === "pause") return;
      a.play()
        .then(() => {
          setPlaying(true);
          setAudioBlocked(false);
        })
        .catch(() => setAudioBlocked(true));

      // Remove all listeners after first trigger
      document.removeEventListener("pointerdown", unlock);
      document.removeEventListener("touchstart", unlock);
      window.removeEventListener("wheel", unlock);
      window.removeEventListener("scroll", unlock);
    };

    document.addEventListener("pointerdown", unlock, { once: true });
    document.addEventListener("touchstart", unlock, {
      once: true,
      passive: true,
    });
    window.addEventListener("wheel", unlock, { once: true, passive: true });
    window.addEventListener("scroll", unlock, { once: true, passive: true });

    return () => {
      document.removeEventListener("pointerdown", unlock);
      document.removeEventListener("touchstart", unlock);
      window.removeEventListener("wheel", unlock);
      window.removeEventListener("scroll", unlock);
    };
  }, []);

  const handleDownload = async () => {
    const node = document.getElementById("share-card");
    if (!node) return;
    try {
      const canvas = await html2canvas(node, {
        useCORS: true,
        backgroundColor: null, // transparent background if desired
        scale: 2, // increase resolution
      });
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "Abhinay-Shilpa-Invite.png";
      link.href = dataUrl;
      link.click();
    } catch (e) {
      console.error("PNG export failed", e);
      alert("PNG export failed. Try again.");
    }
  };

  const toggleAudio = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.play()
        .then(() => {
          setPlaying(true);
          setAudioBlocked(false);
        })
        .catch(() => {
          setAudioBlocked(true);
        });
      localStorage.setItem("musicPref", "play");
    } else {
      a.pause();
      setPlaying(false);
      localStorage.setItem("musicPref", "pause");
    }
  };

  return (
    <div className="relative w-full min-h-screen text-gray-800  bg-rose-200/80 border-r border-rose-300 shadow-xl">
      {/* Blurred, lightened background layer */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px)", // adjust blur amount
          opacity: 0.6, // adjust opacity/lightness
        }}
      ></div>
      {/* Optional white overlay to lighten further */}
      <div className="absolute inset-0 z-5 bg-white/50"></div>

      {/* NEW: make the particles layer as tall as the whole page */}
      <div
        id="petals-layer"
        className="pointer-events-none absolute top-0 left-0 w-full z-20"
        style={{ height: `${pageHeight}px` }}
      >
        <FallingPetals />
      </div>

      {/* Main content goes here, above the background layers */}
      <div className="relative z-10">
        {!introDone && <CurtainIntro onDone={() => setIntroDone(true)} />}

        {/* Hidden shareable poster */}
        <ShareCard />

        {/* Optional background music: place a file at /public/assets/shehnai.mp3 */}
        <audio ref={audioRef} src={sitarMusic} loop autoPlay playsInline />

        {/* Top Bar */}
        <header className="fixed top-0 left-0 right-0 z-30 backdrop-blur bg-white/50 border-b border-rose-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 h-14 flex items-center justify-between">
            <a href="#home" className="font-medium tracking-wide">
              A ♡ S
            </a>
            <nav className="hidden sm:flex items-center gap-6 text-sm">
              <a href="#home" className="hover:text-rose-700">
                Home
              </a>
              <a href="#details" className="hover:text-rose-700">
                Details
              </a>
              <a
                href="#download"
                onClick={(e) => {
                  e.preventDefault();
                  handleDownload();
                }}
                className="hover:text-rose-700 inline-flex items-center gap-1"
              >
                <Download className="w-4 h-4" /> PNG
              </a>
            </nav>
          </div>
        </header>

        {/* Content */}
        <main className="pt-14">
          <Hero reveal={introDone} />
          <Details />

          <footer className="py-10 text-center text-xs text-gray-500">
            Made with ❤️ for Abhinay &amp; Shilpa · 2025
          </footer>
        </main>

        {/* Floating controls & mobile map quick actions */}
        <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-2">
          <button
            onClick={toggleAudio}
            className="px-3 py-2 rounded-full border bg-white/90 backdrop-blur shadow inline-flex items-center gap-2 text-sm"
          >
            <Music className="w-4 h-4" /> {playing ? "Pause" : "Play"}
          </button>
        </div>

        {audioBlocked && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-40 text-xs px-3 py-1 rounded-full border bg-white/90 backdrop-blur shadow">
            Browser blocked sound on load. Tap Play once to enable audio.
          </div>
        )}

        <div className="sm:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex gap-3">
          <a
            href={MAP_LINKS.groom}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-2 rounded-full border bg-white/90 backdrop-blur shadow inline-flex items-center gap-2 text-sm"
          >
            <MapPin className="w-4 h-4" /> Groom
          </a>
          <a
            href={MAP_LINKS.bride}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-2 rounded-full border bg-white/90 backdrop-blur shadow inline-flex items-center gap-2 text-sm"
          >
            <MapPin className="w-4 h-4" /> Bride
          </a>
        </div>
      </div>
    </div>
  );
}
