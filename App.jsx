import React, { useEffect, useRef, useState } from 'react';
import SpotlightCard from './src/components/SpotlightCard';
import Magnet from './src/components/Magnet';
import StarBorder from './src/components/StarBorder';
import { about, events, mrLexx, press, products, reviews, siteMeta } from './src/data/siteContent';

const nav = ['Shop', 'About', 'Mr. Lexx', 'Music', 'Press', 'Events', 'Bookings'];
const media = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

const productImages = {
  'Olive Green Exclusive Diggy Nation Hoodie': 'media/products/men/products-click-drop-down-arrow-for-more-categories-men-olive-green-exclusive-diggy-nation-hoodie-small-5184395-c0be10b8.png',
  'Black Diggy Nation UNISEX T-Shirt': 'media/products/men/products-click-drop-down-arrow-for-more-categories-men-black-diggy-nation-unisex-t-shirt-51561389-74aa1696.jpg',
  'Gray Diggy Nation UNISEX T-Shirt': 'media/products/men/products-click-drop-down-arrow-for-more-categories-men-gray-diggy-nation-unisex-t-shirt-51637087-8220e430.jpg',
  'Red Diggy Nation UNISEX T-Shirt': 'media/products/men/products-click-drop-down-arrow-for-more-categories-men-red-diggy-nation-unisex-t-shirt-51562546-4057394a.jpg',
  'White Diggy Nation UNISEX T-Shirt': 'media/products/men/products-click-drop-down-arrow-for-more-categories-men-white-diggy-nation-unisex-t-shirt-51697767-b51be4c8.jpg',
  'Dark Purple Diggy Nation UNISEX T-Shirt': 'media/products/men/products-click-drop-down-arrow-for-more-categories-men-dark-purple-diggy-nation-unisex-t-shirt-53140852-068de66a.jpg',
  'Yellow Diggy Nation UNISEX T-Shirt': 'media/products/men/products-click-drop-down-arrow-for-more-categories-men-yellow-diggy-nation-unisex-t-shirt-53140976-fc108ff1.jpg',
  'Coral Fashion Shorts': 'media/products/ladies-bottoms/products-ladies-bottoms-coral-fashion-shorts-s-m-51893494-0801fa29.jpg'
};

const heroPortrait = 'media/mr-lexx/mr-lexx-gallery-03.jpg';
const lexxPortrait = 'media/mr-lexx/mr-lexx-gallery-06.jpg';
const galleryImages = [1, 2, 4, 5, 8, 12, 14, 19, 20, 21].map((n) => `media/mr-lexx/mr-lexx-gallery-${String(n).padStart(2, '0')}.jpg`);
const pressImages = [
  'media/press/mr-lexx-in-the-news-mr-lexx-launches-diggy-nation-line-12-b39107cb.jpg',
  'media/press/mr-lexx-in-the-news-mr-lexx-live-in-studio-di-sound-off-january-20-2023-12-980991ba.jpg',
  'media/press/mr-lexx-in-the-news-the-industry-won-t-allow-me-to-retire-mr-lexx-taking-a-fresh-approach-for-the-new-year-12-9c46c418.jpg',
  'media/press/mr-lexx-in-the-news-dancehall-artist-mr-lexx-goes-full-100-12-44dd7a87.jpg',
  'media/press/mr-lexx-in-the-news-five-questions-with-mr-lexx-12-37b8f851.jpg',
  'media/press/mr-lexx-in-the-news-mr-lexx-focuses-on-acting-after-retiring-from-dancehall-12-3751b31f.jpg'
];

const socialLinks = [
  ['Instagram', 'https://www.instagram.com/therealmrlexx'],
  ['TikTok', 'https://www.tiktok.com/@therealmrlexx'],
  ['YouTube', 'https://www.youtube.com/@TheRealMrLexx'],
  ['Facebook', 'https://www.facebook.com/therealmrlexx'],
  ['X', 'https://x.com/TheRealMrLexx'],
  ['Threads', 'https://www.threads.net/@therealmrlexx']
];

function Wordmark({ compact = false }) {
  return <span className={`wordmark ${compact ? 'wordmark-compact' : ''}`}><span className="wordmark-diggy">DIGGY</span><span className="wordmark-nation">Nation</span></span>;
}

function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.unobserve(node);
      }
    }, { threshold: 0.14 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`reveal ${visible ? 'is-visible' : ''} ${className}`}>{children}</div>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const productRail = useRef(null);
  const galleryRail = useRef(null);

  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener('resize', close);
    return () => window.removeEventListener('resize', close);
  }, []);

  const scrollRail = (ref, direction) => ref.current?.scrollBy({ left: direction * Math.min(ref.current.clientWidth * 0.82, 420), behavior: 'smooth' });
  const navHref = (item) => `#${item.toLowerCase().replaceAll(' ', '-').replace('.', '')}`;

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#070707] text-white">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/72 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8">
          <a href="#top" aria-label="Diggy Nation home"><Wordmark compact /></a>
          <nav className="hidden gap-5 text-[10px] uppercase tracking-[0.18em] text-white/65 lg:flex">
            {nav.map((item) => <a key={item} href={navHref(item)} className="transition hover:text-white">{item}</a>)}
          </nav>
          <div className="flex items-center gap-2">
            <a href="#bookings" className="hidden rounded-full border border-amber-300/35 px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-amber-300 transition hover:bg-amber-300 hover:text-black sm:block">Book Mr. Lexx</a>
            <button aria-label="Toggle menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((v) => !v)} className="grid h-10 w-10 place-items-center rounded-full border border-white/15 lg:hidden"><span className="sr-only">Menu</span><span className={`mobile-menu-lines ${menuOpen ? 'open' : ''}`}><i/><i/></span></button>
          </div>
        </div>
        <div className={`mobile-nav lg:hidden ${menuOpen ? 'open' : ''}`}>
          <nav className="mx-auto grid max-w-7xl gap-1 px-5 pb-5 pt-1 md:px-8">
            {nav.map((item, i) => <a key={item} onClick={() => setMenuOpen(false)} href={navHref(item)} className="flex items-center justify-between border-b border-white/10 py-3 text-sm uppercase tracking-[.2em]"><span>{item}</span><span className="text-white/30">0{i + 1}</span></a>)}
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero-stage relative min-h-screen overflow-hidden px-5 pb-12 pt-28 md:px-8 md:pb-20">
          <img src={media(heroPortrait)} alt="Mr. Lexx" className="hero-photo absolute inset-0 h-full w-full object-cover object-[68%_25%]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,3,3,.99)_0%,rgba(3,3,3,.83)_43%,rgba(3,3,3,.14)_73%,rgba(3,3,3,.7)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_28%,rgba(245,181,45,.18),transparent_25%),linear-gradient(0deg,#070707_0%,transparent_32%)]" />
          <div className="relative z-10 mx-auto flex min-h-[calc(100vh-7rem)] max-w-7xl flex-col justify-end">
            <div className="mb-7 flex items-center gap-4 text-[10px] uppercase tracking-[.35em] text-white/40"><span>Est. 2022</span><span className="h-px w-14 bg-white/20"/><span>Dancehall lifestyle label</span></div>
            <div className="grid items-end gap-10 lg:grid-cols-[1.25fr_.75fr]">
              <div>
                <p className="hero-kicker mb-5 text-xs font-semibold uppercase tracking-[0.38em] text-amber-300">{siteMeta.founder} presents</p>
                <div className="hero-brand-lockup"><Wordmark /></div>
                <div className="mt-8 flex max-w-3xl flex-col gap-7 border-l border-white/15 pl-5 md:flex-row md:items-end md:justify-between md:pl-7">
                  <p className="max-w-xl text-base leading-7 text-white/75 md:text-lg">Dancehall heritage, fashion, music and culture — built into one digital home.</p>
                  <div className="text-right text-[10px] uppercase tracking-[.26em] text-white/35">Kingston roots<br/>global energy</div>
                </div>
                <div className="mt-9 flex flex-wrap gap-4"><Magnet padding={55} magnetStrength={3}><a href="#shop"><StarBorder color="#f5b52d" speed="4s" backgroundColor="#14100a" borderColor="#745719">Shop the collection</StarBorder></a></Magnet><a href="#music" className="rounded-[20px] border border-white/20 bg-black/20 px-7 py-4 text-sm uppercase tracking-[.14em] text-white/80 backdrop-blur transition hover:border-white/50 hover:text-white">Listen now</a></div>
              </div>
              <Reveal delay={220} className="pb-2 lg:pb-8"><div className="editorial-card border-l border-amber-300/70 bg-black/28 p-5 backdrop-blur-md"><p className="text-xs uppercase tracking-[.3em] text-white/45">Fashion · Music · Culture</p><p className="mt-3 max-w-sm text-2xl font-semibold leading-tight">More than merch. A lifestyle brand powered by Dancehall.</p><p className="mt-4 text-sm text-white/50">{siteMeta.phone}</p></div></Reveal>
            </div>
          </div>
        </section>

        <section id="shop" className="mx-auto max-w-7xl px-5 py-24 md:px-8">
          <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6"><div><p className="eyebrow">Original Diggy Nation pieces</p><h2 className="section-title">Wear the nation.</h2></div><div className="max-w-md text-sm leading-6 text-white/45">{siteMeta.customOrderNote}</div></Reveal>
          <div className="mb-4 flex items-center justify-between"><p className="text-[10px] uppercase tracking-[.24em] text-white/30">Swipe / drag collection</p><div className="flex gap-2"><button onClick={() => scrollRail(productRail, -1)} className="rail-btn">←</button><button onClick={() => scrollRail(productRail, 1)} className="rail-btn">→</button></div></div>
          <div ref={productRail} className="horizontal-rail snap-x snap-mandatory">
            {products.map((product, i) => (
              <div key={product.name} className="w-[84vw] max-w-[360px] shrink-0 snap-start sm:w-[350px]">
                <SpotlightCard className="product-card group !min-h-[520px] !overflow-hidden !border-white/10 !bg-[#0d0d0d] !p-0" spotlightColor="rgba(245,181,45,.20)">
                  <div className="relative z-10 flex min-h-[518px] flex-col">
                    <div className="product-image-wrap relative h-80 overflow-hidden bg-[#111]"><img src={media(productImages[product.name])} alt={product.name} loading="lazy" className="image-reveal h-full w-full object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0d0d0d] to-transparent" /><div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/55 px-3 py-1 text-[10px] uppercase tracking-[.2em] backdrop-blur">0{i + 1} · {product.category}</div><div className="product-overlay absolute inset-0 flex items-end bg-gradient-to-t from-black via-black/45 to-transparent p-5"><div><div className="mb-2 text-[10px] uppercase tracking-[.25em] text-amber-300">Details</div>{product.details?.length ? <ul className="space-y-1 text-xs leading-5 text-white/75">{product.details.slice(0, 5).map((detail) => <li key={detail}>— {detail}</li>)}</ul> : <p className="text-xs leading-5 text-white/65">Original Diggy Nation archive piece.</p>}</div></div></div>
                    <div className="flex flex-1 flex-col justify-between p-6"><div><h3 className="text-xl font-black uppercase leading-tight tracking-[-.025em]">{product.name}</h3><p className="mt-3 text-sm leading-6 text-white/45">{product.description}</p></div><div className="mt-5 flex items-center justify-between"><span className="text-xl font-black text-amber-300">{product.price}</span><span className="text-[10px] uppercase tracking-[.18em] text-white/35">Hover for details</span></div></div>
                  </div>
                </SpotlightCard>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="border-y border-white/10 bg-[#0b0b0b]"><div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:px-8 lg:grid-cols-[.9fr_1.1fr]"><Reveal className="grid grid-cols-2 gap-3">{galleryImages.slice(0, 4).map((img, i) => <div key={img} className={`archive-frame overflow-hidden rounded-2xl ${i === 0 ? 'col-span-2 aspect-[16/9]' : 'aspect-[4/5]'}`}><img src={media(img)} alt={`Diggy Nation / Mr. Lexx archive ${i + 1}`} loading="lazy" className="h-full w-full object-cover" /></div>)}</Reveal><Reveal delay={100}><p className="eyebrow">About Diggy Nation</p><h2 className="section-title max-w-4xl">Fashion was always part of the expression.</h2><div className="mt-10 space-y-5">{about.map((item) => <div key={item.title} className="border-l border-white/15 pl-5"><h3 className="text-xl font-bold">{item.title}</h3><p className="mt-2 leading-7 text-white/50">{item.body}</p></div>)}</div></Reveal></div></section>

        <section id="mr-lexx" className="mx-auto max-w-7xl px-5 py-24 md:px-8">
          <div className="grid gap-12 lg:grid-cols-2"><Reveal className="relative min-h-[620px] overflow-hidden rounded-[2rem] border border-white/10"><img src={media(lexxPortrait)} alt="Mr. Lexx portrait" loading="lazy" className="image-reveal absolute inset-0 h-full w-full object-cover object-top" /><div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" /><div className="absolute inset-x-0 bottom-0 p-8"><div className="eyebrow">Artist · Actor · Dancer · Founder</div><div className="mt-2 text-5xl font-black uppercase tracking-[-.04em]">Mr. Lexx</div></div></Reveal><Reveal delay={120} className="flex flex-col justify-center"><p className="eyebrow">Meet Mr. Lexx</p><h2 className="section-title">{mrLexx.stageNames}</h2><p className="mt-7 text-lg leading-8 text-white/55">{mrLexx.name}, born {mrLexx.born}, is a Jamaican Dancehall artist from {mrLexx.origin}. {mrLexx.summary}</p><div className="mt-7 space-y-3 text-sm leading-6 text-white/45">{mrLexx.highlights.map((x) => <p key={x}>— {x}</p>)}</div></Reveal></div>
          <div className="mt-10 flex items-center justify-between"><p className="text-[10px] uppercase tracking-[.24em] text-white/30">Archive gallery</p><div className="flex gap-2"><button onClick={() => scrollRail(galleryRail, -1)} className="rail-btn">←</button><button onClick={() => scrollRail(galleryRail, 1)} className="rail-btn">→</button></div></div><div ref={galleryRail} className="horizontal-rail mt-4 snap-x snap-mandatory">{galleryImages.map((img, i) => <div key={img} className="w-[62vw] max-w-[300px] shrink-0 snap-start overflow-hidden rounded-2xl border border-white/10 sm:w-[260px]"><img src={media(img)} alt={`Mr. Lexx archive ${i + 1}`} loading="lazy" className="aspect-[4/5] w-full object-cover transition duration-700 hover:scale-105" /></div>)}</div>
        </section>

        <section id="music" className="border-y border-white/10 bg-[#0b0b0b]"><div className="mx-auto max-w-7xl px-5 py-24 md:px-8"><Reveal className="mb-10 grid gap-8 lg:grid-cols-[.8fr_1.2fr]"><div><p className="eyebrow">Listen</p><h2 className="section-title">Mr. Lexx on repeat.</h2><p className="mt-5 max-w-md text-sm leading-7 text-white/45">Current releases, classics and the records that built the catalog — all in one place.</p></div><div className="grid gap-4 sm:grid-cols-3">{[['Latest release','Gyallis','2026'],['Catalog classic','Full Hundred','2000'],['Dancehall staple','Ring Mi Cellie','Archive']].map(([label,title,year]) => <div key={title} className="rounded-2xl border border-white/10 bg-white/[.025] p-5"><div className="text-[10px] uppercase tracking-[.22em] text-amber-300/70">{label}</div><div className="mt-3 text-2xl font-black uppercase">{title}</div><div className="mt-1 text-xs text-white/30">{year}</div></div>)}</div></Reveal><div className="grid gap-5 lg:grid-cols-2"><Reveal><div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#111] p-3"><iframe title="Mr. Lexx on Spotify" src="https://open.spotify.com/embed/artist/2spxqnHPH4K83fOY3Ei2me?utm_source=generator&theme=0" width="100%" height="352" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" className="rounded-[1.3rem] border-0" /></div></Reveal><Reveal delay={100}><div className="relative min-h-[376px] overflow-hidden rounded-[2rem] border border-white/10"><img src={media('media/mr-lexx/mr-lexx-gallery-20.jpg')} alt="Mr. Lexx music archive" loading="lazy" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" /><div className="absolute inset-x-0 bottom-0 p-7"><p className="eyebrow">More music</p><h3 className="mt-2 text-4xl font-black uppercase tracking-[-.04em]">Apple Music + YouTube</h3><div className="mt-5 flex flex-wrap gap-3"><a href="https://music.apple.com/us/artist/mr-lexx/74446257" target="_blank" rel="noreferrer" className="platform-pill">Apple Music ↗</a><a href="https://www.youtube.com/@TheRealMrLexx" target="_blank" rel="noreferrer" className="platform-pill">YouTube ↗</a></div></div></div></Reveal></div></div></section>

        <section id="press" className="bg-[#080808]"><div className="mx-auto max-w-7xl px-5 py-24 md:px-8"><Reveal><p className="eyebrow">Press archive</p><div className="mt-4 grid gap-10 lg:grid-cols-[.65fr_1.35fr]"><div><h2 className="section-title">Mr. Lexx<br/>in the news.</h2><p className="mt-6 max-w-md text-sm leading-7 text-white/45">Recovered imagery from the original Diggy Nation press archive now lives inside this rebuild.</p></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{press.slice(0, 6).map((item, i) => <article key={`${item.date}-${item.title}`} className="group overflow-hidden rounded-2xl border border-white/10 bg-[#111] transition duration-500 hover:-translate-y-1 hover:border-white/20"><div className="aspect-[4/3] overflow-hidden"><img src={media(pressImages[i])} alt={item.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /></div><div className="p-5"><div className="text-[10px] uppercase tracking-[.18em] text-amber-300/70">{item.date || 'Archive'}</div><h3 className="mt-2 text-sm font-semibold leading-6 text-white/78">{item.title}</h3></div></article>)}</div></div></Reveal></div></section>

        <section id="events" className="mx-auto max-w-7xl px-5 py-24 md:px-8"><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><Reveal><p className="eyebrow">Historical event archive</p><h2 className="section-title">On the road.</h2><div className="mt-8 overflow-hidden rounded-[2rem]"><img src={media('media/mr-lexx/mr-lexx-gallery-19.jpg')} alt="Mr. Lexx archive" loading="lazy" className="aspect-[4/5] w-full max-w-md object-cover transition duration-700 hover:scale-105" /></div></Reveal><div className="grid gap-3 md:grid-cols-2">{events.map((event, i) => <Reveal key={event} delay={Math.min(i * 25, 180)}><div className="rounded-2xl border border-white/10 bg-white/[.025] p-5 text-sm leading-6 text-white/55 transition hover:border-amber-300/30 hover:bg-amber-300/[.03]">{event}</div></Reveal>)}</div></div></section>

        <section id="bookings" className="relative overflow-hidden border-y border-white/10 bg-[#0b0b0b]"><img src={media('media/mr-lexx/mr-lexx-gallery-21.jpg')} alt="Mr. Lexx performance" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-20" /><div className="absolute inset-0 bg-[linear-gradient(90deg,#0b0b0b_12%,rgba(11,11,11,.93)_48%,rgba(11,11,11,.8))]" /><div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-24 md:px-8 lg:grid-cols-[1.1fr_.9fr]"><Reveal><p className="eyebrow">Bookings / EPK</p><h2 className="section-title max-w-4xl">Bring Mr. Lexx to the stage.</h2><p className="mt-6 max-w-2xl text-lg leading-8 text-white/60">Performance bookings, festival appearances, dubplates, media, brand collaborations and licensing inquiries.</p><div className="mt-8 flex flex-wrap gap-3">{['Live performance','Festival / club','Dubplates','Media / press','Brand collabs','Licensing'].map((x) => <span key={x} className="rounded-full border border-white/12 bg-black/30 px-4 py-2 text-xs uppercase tracking-[.14em] text-white/55">{x}</span>)}</div><div className="mt-9 flex flex-wrap gap-3"><a href={`mailto:${siteMeta.email}`} className="rounded-full bg-amber-300 px-6 py-3 text-xs font-black uppercase tracking-[.18em] text-black">Booking inquiry</a><a href={`tel:${siteMeta.phone.replace(/[^+\d]/g,'')}`} className="rounded-full border border-white/20 px-6 py-3 text-xs uppercase tracking-[.18em]">Call team</a></div></Reveal><Reveal delay={100}><div className="rounded-[2rem] border border-white/10 bg-black/45 p-7 backdrop-blur-xl"><div className="flex items-center justify-between border-b border-white/10 pb-5"><Wordmark compact/><span className="text-[10px] uppercase tracking-[.25em] text-white/30">Electronic Press Kit</span></div><div className="mt-6 grid grid-cols-2 gap-4 text-sm"><div><div className="text-[10px] uppercase tracking-[.2em] text-white/30">Artist</div><div className="mt-1 font-semibold">Mr. Lexx</div></div><div><div className="text-[10px] uppercase tracking-[.2em] text-white/30">Origin</div><div className="mt-1 font-semibold">East Kingston, Jamaica</div></div><div><div className="text-[10px] uppercase tracking-[.2em] text-white/30">Genre</div><div className="mt-1 font-semibold">Dancehall / Reggae</div></div><div><div className="text-[10px] uppercase tracking-[.2em] text-white/30">Brand</div><div className="mt-1 font-semibold">Diggy Nation</div></div></div><div className="mt-6 border-t border-white/10 pt-5"><div className="text-[10px] uppercase tracking-[.2em] text-white/30">Contact</div><div className="mt-2 text-sm leading-7 text-white/70">{siteMeta.email}<br/>{siteMeta.phone}<br/>{siteMeta.location}</div></div></div></Reveal></div></section>

        <section id="reviews" className="border-b border-white/10 bg-[#080808]"><div className="mx-auto max-w-7xl px-5 py-24 md:px-8"><Reveal className="flex flex-wrap items-end justify-between gap-6"><div><p className="eyebrow">Community feedback</p><h2 className="section-title">77 reviews.</h2></div><p className="max-w-lg text-sm leading-6 text-white/45">Selected feedback from the original Diggy Nation site.</p></Reveal><div className="mt-10 grid gap-5 md:grid-cols-3">{reviews.slice(0, 6).map(([name, date, quote], i) => <Reveal key={`${name}-${date}`} delay={Math.min(i * 45, 180)}><SpotlightCard className="!border-white/10 !bg-[#111] !p-6" spotlightColor="rgba(245,181,45,.14)"><div className="relative z-10"><p className="leading-7 text-white/65">“{quote}”</p><div className="mt-6 text-sm font-semibold">{name}</div><div className="mt-1 text-xs text-white/30">{date}</div></div></SpotlightCard></Reveal>)}</div></div></section>

        <section className="relative overflow-hidden px-5 py-24 md:px-8"><img src={media('media/mr-lexx/mr-lexx-gallery-01.jpg')} alt="Mr. Lexx" loading="lazy" className="parallax-lite absolute inset-0 h-full w-full object-cover opacity-20" /><div className="absolute inset-0 bg-[linear-gradient(90deg,#080604_20%,rgba(8,6,4,.84)_55%,rgba(8,6,4,.72))]" /><Reveal className="relative mx-auto max-w-7xl rounded-[2.5rem] border border-amber-300/25 bg-black/45 p-8 backdrop-blur-sm md:p-14"><p className="eyebrow">ONE NATION</p><h2 className="section-title max-w-4xl">The community behind the name.</h2><p className="mt-6 max-w-2xl text-lg leading-8 text-white/60">Drops, exclusives, early access, events and direct fan connection — the natural next chapter for Diggy Nation online.</p><div className="mt-8 flex flex-wrap gap-3">{socialLinks.map(([name,url]) => <a key={name} href={url} target="_blank" rel="noreferrer" className="social-link">{name} ↗</a>)}</div></Reveal></section>
      </main>

      <footer id="contact" className="border-t border-white/10 px-5 py-14 md:px-8"><div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2"><div><Wordmark compact/><p className="mt-5 text-sm leading-7 text-white/45">{siteMeta.location}<br/>{siteMeta.phone}<br/>{siteMeta.email}</p></div><div className="md:text-right"><p className="text-xs uppercase tracking-[.2em] text-white/40">Merchant policy</p><p className="mt-3 text-sm leading-7 text-white/45">{siteMeta.merchant.delivery} · {siteMeta.merchant.deliveryPrice}<br/>{siteMeta.merchant.customProcessing}<br/>{siteMeta.merchant.paymentNote}</p></div></div></footer>
    </div>
  );
}

export default App;
