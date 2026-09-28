import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowRight, ChevronLeft, ChevronRight, Heart, MapPin, Menu, Music2, Pause, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/rajasthan-wedding.jpg";
import detailImage from "@/assets/wedding-details.jpg";
import mehndiImage from "@/assets/wedding-mehndi.jpg";
import mandapImage from "@/assets/wedding-mandap.jpg";

const description = "With the blessings of our families, join Khushboo and Shekhar for their wedding celebrations on 21 November 2026 in Shrimadhopur, Rajasthan.";
export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Khushboo & Shekhar | Wedding Invitation" },
    { name: "description", content: description },
    { property: "og:title", content: "Khushboo & Shekhar | Wedding Invitation" },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: WeddingInvitation,
});

const nav = [["Home", "home"], ["Invitation", "invitation"], ["Events", "events"], ["Gallery", "gallery"], ["Venue", "venue"], ["Blessings", "blessings"]] as const;
const events = [
  { date: "11 NOVEMBER", name: "Peele Chawal", symbol: "✿", description: "Lord Ganesha Prayer", detail: "A blessed beginning to the celebrations." },
  { date: "16 NOVEMBER", name: "Lagan Tika", symbol: "✧", description: "A cherished tradition", detail: "A moment of blessings and togetherness." },
  { date: "18 NOVEMBER", name: "Haldi", symbol: "☀", description: "A celebration in yellow", detail: "Sunshine, laughter and joyful blessings." },
  { date: "20 NOVEMBER", name: "Mehndi", symbol: "❈", description: "A little colour, a lot of love", detail: "An occasion for art and celebration." },
  { date: "20 NOVEMBER · EVENING", name: "Sangeet", symbol: "♫", description: "An evening of music", detail: "Let us celebrate with song and dance." },
  { date: "21 NOVEMBER", name: "Wedding", symbol: "♡", description: "The day we say forever", detail: "Join us as two families become one.", featured: true },
];
// Replace these illustrative wedding-themed images with the couple's real photos when available.
const gallery = [
  { category: "Khushboo", image: detailImage, alt: "Illustrative bridal wedding details with marigolds and jewellery" },
  { category: "Shekhar", image: heroImage, alt: "Illustrative Rajasthani wedding courtyard" },
  { category: "Family", image: mandapImage, alt: "Illustrative wedding mandap with floral decorations" },
  { category: "Memories", image: mehndiImage, alt: "Illustrative mehndi and wedding flowers" },
  { category: "Celebrations", image: mandapImage, alt: "Illustrative decorated wedding mandap" },
];

// Destination of the venue QR code. Opens in a new tab from the Get Directions button.
const VENUE_MAP_URL = "https://maps.app.goo.gl/XcWKjjC2gxaQpCyb6";

// Clearly-marked sample blessings — replace these with real wishes when available.
const SAMPLE_WISHES = [
  { name: "SAMPLE WISH", message: "Wishing you both a lifetime of love, happiness and beautiful memories." },
  { name: "SAMPLE WISH", message: "May your journey together always be filled with laughter, love and endless blessings." },
];

function Ornament({ light = false }: { light?: boolean }) {
  return <div className={`ornament ${light ? "ornament-light" : ""}`} aria-hidden="true"><span />✦<span /></div>;
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.7, ease: "easeOut" }}>{children}</motion.div>;
}

function SectionHeading({ eyebrow, title, light = false }: { eyebrow: string; title: string; light?: boolean }) {
  return <Reveal className="text-center"><p className={`eyebrow ${light ? "text-gold-light" : "text-terracotta"}`}>{eyebrow}</p><h2 className={`display-heading mt-4 ${light ? "text-ivory" : "text-primary"}`}>{title}</h2><Ornament light={light} /></Reveal>;
}

function Countdown() {
  const [remaining, setRemaining] = useState<number | null>(null);
  useEffect(() => {
    const update = () => setRemaining(Math.max(0, new Date("2026-11-21T00:00:00+05:30").getTime() - Date.now()));
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, []);
  const duration = remaining ?? 0;
  const parts = [
    [Math.floor(duration / 86400000), "Days"],
    [Math.floor(duration / 3600000) % 24, "Hours"],
    [Math.floor(duration / 60000) % 60, "Minutes"],
    [Math.floor(duration / 1000) % 60, "Seconds"],
  ] as const;
  return <div className="countdown" aria-label="Time until the wedding" aria-live="off">{parts.map(([value, label]) => <div key={label} className="countdown-cell"><span className="countdown-number">{remaining === null ? "--" : String(value).padStart(2, "0")}</span><span className="countdown-label">{label}</span></div>)}</div>;
}

// The exact venue QR code must live at public/images/location-qr.png, unmodified.
// Once the file is present it is shown automatically; a placeholder appears until then.
function VenueQr() {
  const [missing, setMissing] = useState(false);
  if (missing) return <div className="venue-qr-placeholder" aria-hidden="true"><span>✦</span><p>QR code coming soon</p></div>;
  return <img src="/images/location-qr.png" alt="Wedding location QR code" width={512} height={512} onError={() => setMissing(true)} />;
}

// Gentle floating petals for the blessings section (skipped when reduced motion is set).
const PETALS = [
  { left: "6%", delay: 0, duration: 13, size: 12 },
  { left: "18%", delay: 3, duration: 15, size: 9 },
  { left: "34%", delay: 1.6, duration: 12, size: 11 },
  { left: "55%", delay: 4.5, duration: 14, size: 9 },
  { left: "70%", delay: 2.2, duration: 16, size: 12 },
  { left: "86%", delay: 0.8, duration: 13, size: 10 },
  { left: "94%", delay: 5.2, duration: 15, size: 8 },
];

function BlessingsPetals() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return <div className="blessings-petals" aria-hidden="true">{PETALS.map((petal, i) => (
    <motion.span key={i} className="blessing-petal" style={{ left: petal.left, width: petal.size, height: petal.size * 1.35 }}
      initial={{ y: "-30px", opacity: 0, rotate: 0 }}
      animate={{ y: ["-30px", "30vh", "58vh", "85vh"], x: [0, 12, -8, 0], opacity: [0, .5, .5, 0], rotate: [0, 60, -30, 45] }}
      transition={{ duration: petal.duration, delay: petal.delay, repeat: Infinity, ease: "easeIn" }} />
  ))}</div>;
}

function WeddingInvitation() {
  const [opened, setOpened] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [blessingSent, setBlessingSent] = useState(false);
  const [wishes, setWishes] = useState<{ name: string; message: string }[]>([]);
  const [playing, setPlaying] = useState(false);
  const [musicError, setMusicError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const reduce = useReducedMotion();
  const activePhoto = selectedPhoto === null ? null : gallery[selectedPhoto];

  useEffect(() => { document.body.style.overflow = opened && selectedPhoto === null ? "" : "hidden"; return () => { document.body.style.overflow = ""; }; }, [opened, selectedPhoto]);
  useEffect(() => {
    if (selectedPhoto === null) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSelectedPhoto(null);
      if (e.key === "ArrowRight") setSelectedPhoto(i => i === null ? null : (i + 1) % gallery.length);
      if (e.key === "ArrowLeft") setSelectedPhoto(i => i === null ? null : (i + gallery.length - 1) % gallery.length);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedPhoto]);

  function openInvitation() { setOpened(true); window.scrollTo({ top: 0, behavior: "instant" }); }
  function handleBlessing(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setWishes(current => [{ name: String(form.get("name")).trim(), message: String(form.get("message")).trim() }, ...current]);
    setBlessingSent(true);
  }
  async function toggleMusic() {
    if (!audioRef.current) return;
    if (playing) { audioRef.current.pause(); setPlaying(false); return; }
    try { await audioRef.current.play(); setMusicError(false); setPlaying(true); }
    catch { setMusicError(true); setPlaying(false); }
  }

  return <>
    <AnimatePresence>
      {!opened && <motion.div className="opening-screen" initial={false} exit={{ opacity: 0, y: -35, transition: { duration: reduce ? 0 : 0.75 } }}>
        <img src={heroImage} alt="Decorated Rajasthani courtyard" className="opening-bg" />
        <div className="opening-shade" />
        <div className="opening-content">
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="opening-intro">WITH THE BLESSINGS OF OUR FAMILIES</motion.p>
          <motion.div className="invitation-envelope" initial={{ opacity: 0, y: 30, rotate: -3 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ duration: 0.85, delay: 0.15 }}>
            <div className="invitation-card">
              <div className="invitation-card-inner">
                <span className="card-flower" aria-hidden="true">✤</span>
                <p className="hindi-title">शुभ विवाह</p>
                <Ornament />
                <p className="card-small">THE WEDDING OF</p>
                <h1 className="opening-names">Khushboo <em>&</em> Shekhar</h1>
                <div className="card-divider" />
                <p className="card-date">21 November 2026</p>
                <p className="card-place">Shrimadhopur, Sikar, Rajasthan</p>
                <span className="card-flower card-flower-bottom" aria-hidden="true">✤</span>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.7 }}>
            <Button onClick={openInvitation} className="invitation-open-btn">Open Invitation <ArrowRight size={16} /></Button>
            <p className="opening-footer">A CELEBRATION OF LOVE & TOGETHERNESS</p>
          </motion.div>
        </div>
      </motion.div>}
    </AnimatePresence>

    <div className="site-shell">
      <header className="site-header">
        <a href="#home" className="brand" onClick={() => setMenuOpen(false)}>K <span>✦</span> S</a>
        <nav className={`site-nav ${menuOpen ? "site-nav-open" : ""}`} aria-label="Main navigation">{nav.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>
        <Button variant="ghost" size="icon" className="mobile-menu" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
      </header>

      <main>
        <section id="home" className="hero-section">
          <img src={heroImage} alt="Rajasthani haveli courtyard decorated for a wedding" className="hero-image" width={1536} height={1024} />
          <div className="hero-shade" />
          <div className="hero-content">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={opened ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <p className="hero-overline">TOGETHER WITH OUR FAMILIES</p>
              <Ornament light />
              <h1 className="hero-title">Khushboo <span>&</span> Shekhar</h1>
              <p className="hero-subtitle">Two hearts, one beautiful journey</p>
              <div className="hero-details"><span>21 • 11 • 2026</span><span className="hero-dot">✦</span><span>Shrimadhopur, Sikar, Rajasthan</span></div>
            </motion.div>
          </div>
          <a href="#invitation" className="hero-scroll" aria-label="Scroll to invitation"><ArrowDown size={17} /></a>
        </section>

        <section className="countdown-band"><p className="eyebrow">THE CELEBRATION BEGINS IN</p><Countdown /></section>

        <section id="invitation" className="invitation-section section-pad">
          <div className="corner-ornament corner-left" aria-hidden="true">✥</div><div className="corner-ornament corner-right" aria-hidden="true">✥</div>
          <div className="container-narrow"><SectionHeading eyebrow="A JOYFUL INVITATION" title="With all our hearts" /><Reveal><p className="invitation-copy">With the blessings of our families and loved ones, we invite you to celebrate the beautiful beginning of a new chapter in the lives of <em>Khushboo & Shekhar.</em></p><p className="invitation-note">Your presence and blessings will make our celebration even more special.</p><p className="signature">With love, Khushboo & Shekhar</p></Reveal></div>
        </section>

        <section id="events" className="events-section section-pad"><div className="container-wide"><SectionHeading eyebrow="MARK YOUR CALENDAR" title="The Celebrations" /><p className="section-lead">A few beautiful days, a lifetime of memories.</p><div className="events-timeline">{events.map((event, index) => <Reveal key={event.name} className={`event-row ${index % 2 ? "event-row-right" : ""}`}><div className={`event-card ${event.featured ? "event-featured" : ""}`}><div className="event-top"><span className="event-date">{event.date} 2026</span><span className="event-symbol" aria-hidden="true">{event.symbol}</span></div><h3>{event.name}</h3><p className="event-description">{event.description}</p><div className="event-rule" /><p className="event-detail">{event.detail}</p></div><span className="timeline-node" aria-hidden="true" /></Reveal>)}</div></div></section>

        <section className="journey-section section-pad"><div className="container-wide"><SectionHeading eyebrow="A STORY STILL UNFOLDING" title="Our Journey" light /><div className="journey-steps">{["Two families", "Two hearts", "A beautiful beginning", "Forever begins"].map((step, i) => <Reveal key={step} className="journey-step"><span className="journey-index">0{i + 1}</span><span className="journey-icon" aria-hidden="true">{["✥", "♡", "✦", "∞"][i]}</span><h3>{step}</h3></Reveal>)}</div></div></section>

        <section id="gallery" className="gallery-section section-pad"><div className="container-wide"><SectionHeading eyebrow="A GLIMPSE OF THE CELEBRATION" title="Moments to Cherish" /><p className="section-lead">Illustrative images for now — our favourite memories are yet to come.</p><div className="gallery-grid">{gallery.map((photo, index) => <motion.div key={photo.category} className={`gallery-item gallery-item-${index}`} {...(reduce ? {} : { whileHover: { scale: 1.015 } })} transition={{ duration: 0.3 }}><Button variant="ghost" aria-label={`View ${photo.category} image`} onClick={() => setSelectedPhoto(index)} className="gallery-button"><img src={photo.image} alt={photo.alt} loading="lazy" width={1024} height={1280} /><span className="gallery-caption"><span>{photo.category}</span><span className="gallery-arrow">↗</span></span></Button></motion.div>)}</div></div></section>

        <section id="venue" className="venue-section section-pad"><div className="container-wide"><SectionHeading eyebrow="THE PLACE WE CELEBRATE" title="Wedding Venue" /><p className="section-lead">Join us as we celebrate the beginning of a beautiful new journey.</p><Reveal><div className="venue-frame"><span className="venue-corner venue-corner-tl" aria-hidden="true">✥</span><span className="venue-corner venue-corner-tr" aria-hidden="true">✥</span><span className="venue-corner venue-corner-bl" aria-hidden="true">✥</span><span className="venue-corner venue-corner-br" aria-hidden="true">✥</span><div className="venue-layout"><div className="venue-info"><div className="venue-location-card"><motion.span className="venue-pin" aria-hidden="true" animate={reduce ? { y: 0 } : { y: [0, -5, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}><MapPin size={27} strokeWidth={1.5} /></motion.span><div><h3>Shrimadhopur</h3><p>Sikar, Rajasthan, India</p></div></div><p className="venue-note">The exact venue and address will be shared soon.</p><div className="venue-floral" aria-hidden="true"><span />❁<span /></div></div><div className="venue-qr-column"><div className="venue-qr-card"><h3 className="venue-qr-title">Scan for Location</h3><div className="venue-qr-frame"><VenueQr /></div><p className="venue-qr-caption">Scan this QR code to open the wedding location.</p></div>{VENUE_MAP_URL.startsWith("http") ? <Button asChild className="solid-button"><a href={VENUE_MAP_URL} target="_blank" rel="noopener noreferrer">Get Directions <ArrowRight size={16} /></a></Button> : <Button className="solid-button venue-directions" disabled>Get Directions <MapPin size={16} /></Button>}{!VENUE_MAP_URL.startsWith("http") && <p className="venue-directions-note">Directions link will be added once the venue is confirmed.</p>}</div></div></div></Reveal></div></section>

        <section id="blessings" className="blessings-section section-pad"><BlessingsPetals /><div className="container-narrow"><SectionHeading eyebrow="WORDS FROM THE HEART" title="Wedding Blessings" light /><p className="section-lead section-lead-light">Your love, blessings and kind words mean the world to us.</p><div className="blessings-panel">{blessingSent ? <motion.div className="blessings-success" role="status" initial={{ opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .5, ease: "easeOut" }}><motion.span className="success-heart" animate={reduce ? { scale: 1 } : { scale: [1, 1.18, 1] }} transition={{ duration: 1.4, repeat: Infinity, repeatDelay: .8, ease: "easeInOut" }}><Heart size={26} fill="currentColor" /></motion.span><h3>Thank you for your beautiful wishes for Khushboo & Shekhar!</h3><p>This blessing is a preview only; it has not been sent or saved.</p><Button variant="outline" className="outline-light" onClick={() => setBlessingSent(false)}>Write another blessing</Button></motion.div> : <form className="blessings-form" onSubmit={handleBlessing}><label>Guest Name<input name="name" type="text" placeholder="Your full name" required maxLength={100} /></label><label>Your Blessing<textarea name="message" rows={4} placeholder="Write from the heart..." required minLength={2} maxLength={500} /></label><Button type="submit" className="blessings-submit">Send Blessing <Heart size={16} fill="currentColor" /></Button><p className="form-disclaimer">Preview only — blessings appear on this device and are not sent or saved.</p></form>}</div><div className="blessings-grid">{SAMPLE_WISHES.map((wish, i) => <Reveal key={`sample-${i}`} className="blessings-card"><p>“{wish.message}”</p><small>SAMPLE WISH</small></Reveal>)}{wishes.map((wish, i) => <Reveal key={`${wish.name}-${i}`} className="blessings-card"><p>“{wish.message}”</p><small>— {wish.name}</small></Reveal>)}</div><motion.p className="blessings-close" initial={reduce ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>With love, from our family to yours <Heart size={20} fill="currentColor" aria-label="love" /></motion.p></div></section>

        <section className="closing-section"><div className="closing-inner"><span className="closing-flower" aria-hidden="true">✿</span><p className="eyebrow text-gold-light">WITH LOVE AND GRATITUDE</p><h2>Your presence is<br />the greatest gift.</h2><Ornament light /><p className="closing-names">Khushboo <em>&</em> Shekhar</p><p className="closing-date">21 November 2026</p><p className="closing-place">Shrimadhopur, Sikar, Rajasthan</p><span className="closing-flower closing-flower-bottom" aria-hidden="true">✿</span></div></section>
      </main>
      <footer>Made with <Heart size={13} fill="currentColor" aria-label="love" /> for Khushboo & Shekhar</footer>
      <audio ref={audioRef} src="/music/AUD-20260928-WA0013.mp3" loop preload="none" onEnded={() => setPlaying(false)} onError={() => { setPlaying(false); setMusicError(true); }} />
      <div className="music-control"><Button size="icon" className="music-button" onClick={toggleMusic} aria-label={playing ? "Pause music" : "Play music"} title={playing ? "Pause music" : "Play music"}>{playing ? <Pause size={19} /> : <Music2 size={19} />}</Button>{musicError && <span role="status" className="music-error">Music unavailable</span>}</div>
      <AnimatePresence>{selectedPhoto !== null && activePhoto && <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label={`${activePhoto.category} image`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedPhoto(null)}><Button size="icon" variant="ghost" className="lightbox-close" aria-label="Close image" onClick={() => setSelectedPhoto(null)}><X /></Button><Button size="icon" variant="ghost" className="lightbox-prev" aria-label="Previous image" onClick={e => { e.stopPropagation(); setSelectedPhoto((selectedPhoto + gallery.length - 1) % gallery.length); }}><ChevronLeft /></Button><img src={activePhoto.image} alt={activePhoto.alt} onClick={e => e.stopPropagation()} /><Button size="icon" variant="ghost" className="lightbox-next" aria-label="Next image" onClick={e => { e.stopPropagation(); setSelectedPhoto((selectedPhoto + 1) % gallery.length); }}><ChevronRight /></Button><p>{activePhoto.category} · Illustrative image</p></motion.div>}</AnimatePresence>
    </div>
  </>;
}
