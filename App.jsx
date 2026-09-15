import React from 'react';
import SpotlightCard from './src/components/SpotlightCard';
import Magnet from './src/components/Magnet';
import StarBorder from './src/components/StarBorder';
import { about, events, mrLexx, press, products, reviews, siteMeta } from './src/data/siteContent';

const nav = ['Shop', 'About', 'Mr. Lexx', 'Press', 'Events', 'Reviews'];
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
const galleryImages = [1, 2, 4, 5, 8, 12, 14, 19].map((n) => `media/mr-lexx/mr-lexx-gallery-${String(n).padStart(2, '0')}.jpg`);
const pressImages = [
  'media/press/mr-lexx-in-the-news-mr-lexx-launches-diggy-nation-line-12-b39107cb.jpg',
  'media/press/mr-lexx-in-the-news-mr-lexx-live-in-studio-di-sound-off-january-20-2023-12-980991ba.jpg',
  'media/press/mr-lexx-in-the-news-the-industry-won-t-allow-me-to-retire-mr-lexx-taking-a-fresh-approach-for-the-new-year-12-9c46c418.jpg',
  'media/press/mr-lexx-in-the-news-dancehall-artist-mr-lexx-goes-full-100-12-44dd7a87.jpg',
  'media/press/mr-lexx-in-the-news-five-questions-with-mr-lexx-12-37b8f851.jpg',
  'media/press/mr-lexx-in-the-news-mr-lexx-focuses-on-acting-after-retiring-from-dancehall-12-3751b31f.jpg'
];

function App() {
  return (
    <div className="min-h-screen bg-[#070707] text-white">
      <div className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <a href="#top" className="text-lg font-black tracking-[0.28em]">DIGGY NATION</a>
          <nav className="hidden gap-6 text-xs uppercase tracking-[0.18em] text-white/65 lg:flex">
            {nav.map((item) => <a key={item} href={`#${item.toLowerCase().replaceAll(' ', '-').replace('.', '')}`} className="transition hover:text-white">{item}</a>)}
          </nav>
          <a href="#contact" className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.16em] transition hover:bg-white hover:text-black">Contact</a>
        </div>
      </div>

      <main id="top">
        <section className="relative flex min-h-screen items-end overflow-hidden px-5 pb-16 pt-28 md:px-8 md:pb-24">
          <img src={media(heroPortrait)} alt="Mr. Lexx" className="absolute inset-0 h-full w-full object-cover object-[68%_25%] opacity-55" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,3,3,.98)_0%,rgba(3,3,3,.82)_42%,rgba(3,3,3,.28)_72%,rgba(3,3,3,.72)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_25%,rgba(245,181,45,.20),transparent_26%),linear-gradient(0deg,#070707_0%,transparent_35%)]" />
          <div className="relative z-10 mx-auto grid w-full max-w-7xl items-end gap-10 lg:grid-cols-[1.25fr_.75fr]">
            <div>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.38em] text-amber-300">{siteMeta.founder} presents</p>
              <h1 className="max-w-5xl text-[18vw] font-black uppercase leading-[.76] tracking-[-.065em] sm:text-[14vw] lg:text-[9.8rem]">Diggy<br/>Nation</h1>
              <p className="mt-8 max-w-2xl text-base leading-7 text-white/72 md:text-lg">Dancehall heritage, fashion, music and culture — built into one digital home.</p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Magnet padding={55} magnetStrength={3}><a href="#shop"><StarBorder color="#f5b52d" speed="4s" backgroundColor="#14100a" borderColor="#745719">Shop the collection</StarBorder></a></Magnet>
                <a href="#mr-lexx" className="rounded-[20px] border border-white/20 bg-black/20 px-7 py-4 text-sm uppercase tracking-[.14em] text-white/80 backdrop-blur transition hover:border-white/50 hover:text-white">Discover Mr. Lexx</a>
              </div>
            </div>
            <div className="pb-3 lg:pb-8">
              <div className="border-l border-amber-300/70 bg-black/20 p-5 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[.3em] text-white/45">Fort Lauderdale · Jamaica</p>
                <p className="mt-3 max-w-sm text-2xl font-semibold leading-tight">More than merch. A lifestyle brand powered by Dancehall.</p>
                <p className="mt-4 text-sm text-white/50">{siteMeta.phone}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="shop" className="mx-auto max-w-7xl px-5 py-24 md:px-8">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div><p className="text-xs uppercase tracking-[.35em] text-amber-300">Original Diggy Nation pieces</p><h2 className="mt-3 text-5xl font-black uppercase tracking-[-.04em] md:text-7xl">Wear the nation.</h2></div>
            <div className="max-w-md text-sm leading-6 text-white/45">{siteMeta.customOrderNote}</div>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {products.map((product, i) => (
              <SpotlightCard key={product.name} className="group !min-h-[470px] !overflow-hidden !border-white/10 !bg-[#0d0d0d] !p-0" spotlightColor="rgba(245,181,45,.20)">
                <div className="relative z-10 flex min-h-[468px] flex-col">
                  <div className="relative h-64 overflow-hidden bg-[#111]">
                    <img src={media(productImages[product.name])} alt={product.name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0d0d0d] to-transparent" />
                    <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/55 px-3 py-1 text-[10px] uppercase tracking-[.2em] backdrop-blur">0{i + 1} · {product.category}</div>
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div><h3 className="text-xl font-bold uppercase leading-tight">{product.name}</h3><p className="mt-3 text-sm leading-6 text-white/45">{product.description}</p></div>
                    <div className="mt-5 flex items-center justify-between"><span className="text-lg font-bold text-amber-300">{product.price}</span><span className="text-xs uppercase tracking-[.18em] text-white/35">Original item</span></div>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </section>

        <section id="about" className="border-y border-white/10 bg-[#0b0b0b]">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:px-8 lg:grid-cols-[.9fr_1.1fr]">
            <div className="grid grid-cols-2 gap-3">
              {galleryImages.slice(0, 4).map((img, i) => <img key={img} src={media(img)} alt={`Diggy Nation / Mr. Lexx archive ${i + 1}`} loading="lazy" className={`h-full min-h-56 w-full rounded-2xl object-cover ${i === 0 ? 'col-span-2 aspect-[16/9]' : 'aspect-[4/5]'}`} />)}
            </div>
            <div>
              <p className="text-xs uppercase tracking-[.35em] text-amber-300">About Diggy Nation</p>
              <h2 className="mt-4 max-w-4xl text-5xl font-black uppercase tracking-[-.05em] md:text-7xl">Fashion was always part of the expression.</h2>
              <div className="mt-10 space-y-5">
                {about.map((item) => <div key={item.title} className="border-l border-white/15 pl-5"><h3 className="text-xl font-bold">{item.title}</h3><p className="mt-2 leading-7 text-white/50">{item.body}</p></div>)}
              </div>
            </div>
          </div>
        </section>

        <section id="mr-lexx" className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:px-8 lg:grid-cols-2">
          <div className="relative min-h-[620px] overflow-hidden rounded-[2rem] border border-white/10">
            <img src={media(lexxPortrait)} alt="Mr. Lexx portrait" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8"><div className="text-xs uppercase tracking-[.3em] text-amber-300">Artist · Actor · Dancer · Founder</div><div className="mt-2 text-4xl font-black uppercase">Mr. Lexx</div></div>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-xs uppercase tracking-[.35em] text-amber-300">Meet Mr. Lexx</p>
            <h2 className="mt-4 text-5xl font-black uppercase leading-[.92] tracking-[-.05em] md:text-7xl">{mrLexx.stageNames}</h2>
            <p className="mt-7 text-lg leading-8 text-white/55">{mrLexx.name}, born {mrLexx.born}, is a Jamaican Dancehall artist from {mrLexx.origin}. {mrLexx.summary}</p>
            <div className="mt-7 space-y-3 text-sm leading-6 text-white/45">{mrLexx.highlights.map((x) => <p key={x}>— {x}</p>)}</div>
            <div className="mt-8 grid grid-cols-4 gap-2">{galleryImages.slice(4).map((img, i) => <img key={img} src={media(img)} alt={`Mr. Lexx archive ${i + 1}`} loading="lazy" className="aspect-square w-full rounded-xl object-cover opacity-75 transition hover:opacity-100" />)}</div>
          </div>
        </section>

        <section id="press" className="border-y border-white/10 bg-[#0b0b0b]">
          <div className="mx-auto max-w-7xl px-5 py-24 md:px-8">
            <p className="text-xs uppercase tracking-[.35em] text-amber-300">Press archive</p>
            <div className="mt-4 grid gap-10 lg:grid-cols-[.65fr_1.35fr]">
              <div><h2 className="text-5xl font-black uppercase leading-[.9] tracking-[-.05em] md:text-7xl">Mr. Lexx<br/>in the news.</h2><p className="mt-6 max-w-md text-sm leading-7 text-white/45">Recovered imagery from the original Diggy Nation press archive now lives inside this rebuild.</p></div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {press.slice(0, 6).map((item, i) => <article key={`${item.date}-${item.title}`} className="group overflow-hidden rounded-2xl border border-white/10 bg-[#111]"><div className="aspect-[4/3] overflow-hidden"><img src={media(pressImages[i])} alt={item.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /></div><div className="p-5"><div className="text-[10px] uppercase tracking-[.18em] text-amber-300/70">{item.date || 'Archive'}</div><h3 className="mt-2 text-sm font-semibold leading-6 text-white/78">{item.title}</h3></div></article>)}
              </div>
            </div>
            <div className="mt-10 divide-y divide-white/10 border-y border-white/10">{press.slice(6).map((item) => <div key={`${item.date}-${item.title}`} className="grid gap-2 py-4 md:grid-cols-[150px_1fr]"><span className="text-xs uppercase tracking-[.14em] text-white/30">{item.date || 'Archive'}</span><span className="font-medium text-white/65">{item.title}</span></div>)}</div>
          </div>
        </section>

        <section id="events" className="mx-auto max-w-7xl px-5 py-24 md:px-8">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <div><p className="text-xs uppercase tracking-[.35em] text-amber-300">Historical event archive</p><h2 className="mt-4 text-5xl font-black uppercase tracking-[-.05em] md:text-7xl">On the road.</h2><img src={media('media/mr-lexx/mr-lexx-gallery-19.jpg')} alt="Mr. Lexx archive" loading="lazy" className="mt-8 aspect-[4/5] w-full max-w-md rounded-[2rem] object-cover" /></div>
            <div className="grid gap-3 md:grid-cols-2">{events.map((event) => <div key={event} className="rounded-2xl border border-white/10 bg-white/[.025] p-5 text-sm leading-6 text-white/55 transition hover:border-amber-300/30 hover:bg-amber-300/[.03]">{event}</div>)}</div>
          </div>
        </section>

        <section id="reviews" className="border-y border-white/10 bg-[#0b0b0b]">
          <div className="mx-auto max-w-7xl px-5 py-24 md:px-8">
            <div className="flex flex-wrap items-end justify-between gap-6"><div><p className="text-xs uppercase tracking-[.35em] text-amber-300">Community feedback</p><h2 className="mt-4 text-5xl font-black uppercase tracking-[-.05em] md:text-7xl">77 reviews.</h2></div><p className="max-w-lg text-sm leading-6 text-white/45">Selected feedback from the original Diggy Nation site.</p></div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">{reviews.slice(0, 9).map(([name, date, quote]) => <SpotlightCard key={`${name}-${date}`} className="!border-white/10 !bg-[#111] !p-6" spotlightColor="rgba(245,181,45,.14)"><div className="relative z-10"><p className="leading-7 text-white/65">“{quote}”</p><div className="mt-6 text-sm font-semibold">{name}</div><div className="mt-1 text-xs text-white/30">{date}</div></div></SpotlightCard>)}</div>
          </div>
        </section>

        <section className="relative overflow-hidden px-5 py-24 md:px-8">
          <img src={media('media/mr-lexx/mr-lexx-gallery-01.jpg')} alt="Mr. Lexx" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#080604_20%,rgba(8,6,4,.82)_55%,rgba(8,6,4,.72))]" />
          <div className="relative mx-auto max-w-7xl rounded-[2.5rem] border border-amber-300/25 bg-black/45 p-8 backdrop-blur-sm md:p-14">
            <p className="text-xs uppercase tracking-[.35em] text-amber-300">ONE NATION</p>
            <h2 className="mt-4 max-w-4xl text-5xl font-black uppercase tracking-[-.05em] md:text-7xl">The community behind the name.</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/60">Drops, exclusives, early access, events and direct fan connection — the natural next chapter for Diggy Nation online.</p>
            <div className="mt-8"><Magnet padding={45} magnetStrength={3}><a href="#contact"><StarBorder color="#f5b52d" speed="4s" backgroundColor="#14100a" borderColor="#745719">Join One Nation</StarBorder></a></Magnet></div>
          </div>
        </section>
      </main>

      <footer id="contact" className="border-t border-white/10 px-5 py-14 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
          <div><div className="text-3xl font-black tracking-[.18em]">DIGGY NATION</div><p className="mt-4 text-sm leading-7 text-white/45">{siteMeta.location}<br/>{siteMeta.phone}<br/>{siteMeta.email}</p></div>
          <div className="md:text-right"><p className="text-xs uppercase tracking-[.2em] text-white/40">Merchant policy</p><p className="mt-3 text-sm leading-7 text-white/45">{siteMeta.merchant.delivery} · {siteMeta.merchant.deliveryPrice}<br/>{siteMeta.merchant.customProcessing}<br/>{siteMeta.merchant.paymentNote}</p></div>
        </div>
      </footer>
    </div>
  );
}

export default App;
