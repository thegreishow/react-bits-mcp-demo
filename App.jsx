import React from 'react';
import SpotlightCard from './src/components/SpotlightCard';
import Magnet from './src/components/Magnet';
import StarBorder from './src/components/StarBorder';
import { about, events, mrLexx, press, products, reviews, siteMeta } from './src/data/siteContent';

const nav = ['Shop', 'About', 'Mr. Lexx', 'Press', 'Events', 'Reviews'];

function App() {
  return (
    <div className="min-h-screen bg-[#070707] text-white">
      <div className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <a href="#top" className="text-lg font-black tracking-[0.28em]">DIGGY NATION</a>
          <nav className="hidden gap-6 text-xs uppercase tracking-[0.18em] text-white/65 lg:flex">
            {nav.map((item) => <a key={item} href={`#${item.toLowerCase().replaceAll(' ', '-').replace('.', '')}`} className="transition hover:text-white">{item}</a>)}
          </nav>
          <a href="#contact" className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.16em] hover:bg-white hover:text-black">Contact</a>
        </div>
      </div>

      <main id="top">
        <section className="relative flex min-h-screen items-end overflow-hidden px-5 pb-16 pt-28 md:px-8 md:pb-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_24%,rgba(245,181,45,.22),transparent_28%),radial-gradient(circle_at_20%_72%,rgba(255,255,255,.09),transparent_30%),linear-gradient(135deg,#050505,#131313_55%,#050505)]" />
          <div className="absolute right-[-8vw] top-[13vh] select-none text-[42vw] font-black leading-none text-white/[0.025]">D</div>
          <div className="relative z-10 mx-auto grid w-full max-w-7xl items-end gap-10 lg:grid-cols-[1.25fr_.75fr]">
            <div>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.38em] text-amber-300">{siteMeta.founder} presents</p>
              <h1 className="max-w-5xl text-[18vw] font-black uppercase leading-[.76] tracking-[-.065em] sm:text-[14vw] lg:text-[9.8rem]">Diggy<br/>Nation</h1>
              <p className="mt-8 max-w-2xl text-base leading-7 text-white/62 md:text-lg">A privately held fashion lifestyle company created by Dancehall Reggae artist Mr. Lexx — fashion, music, history and community in one digital home.</p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Magnet padding={55} magnetStrength={3}><a href="#shop"><StarBorder color="#f5b52d" speed="4s" backgroundColor="#14100a" borderColor="#745719">Shop the collection</StarBorder></a></Magnet>
                <a href="#mr-lexx" className="rounded-[20px] border border-white/15 px-7 py-4 text-sm uppercase tracking-[.14em] text-white/75 transition hover:border-white/45 hover:text-white">Meet Mr. Lexx</a>
              </div>
            </div>
            <div className="pb-3 lg:pb-8">
              <div className="border-l border-amber-300/70 pl-5">
                <p className="text-xs uppercase tracking-[.3em] text-white/40">Fort Lauderdale · Jamaica</p>
                <p className="mt-3 max-w-sm text-2xl font-semibold leading-tight">Online merchandise is currently listed for U.S. customers only. Custom colors are handled directly by the team.</p>
                <p className="mt-4 text-sm text-white/45">{siteMeta.phone}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="shop" className="mx-auto max-w-7xl px-5 py-24 md:px-8">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div><p className="text-xs uppercase tracking-[.35em] text-amber-300">Original store inventory</p><h2 className="mt-3 text-5xl font-black uppercase tracking-[-.04em] md:text-7xl">Wear the nation.</h2></div>
            <div className="max-w-md text-sm leading-6 text-white/45">{siteMeta.customOrderNote}</div>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {products.map((product, i) => (
              <SpotlightCard key={product.name} className="!min-h-[360px] !border-white/10 !bg-[#0d0d0d] !p-6" spotlightColor="rgba(245,181,45,.20)">
                <div className="relative z-10 flex h-full min-h-[308px] flex-col justify-between">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[.22em] text-white/35"><span>0{i + 1}</span><span>{product.category}</span></div>
                  <div>
                    <div className="mb-6 h-28 rounded-2xl border border-white/5 bg-[radial-gradient(circle_at_70%_30%,rgba(245,181,45,.15),transparent_35%),#111]" />
                    <h3 className="text-xl font-bold uppercase leading-tight">{product.name}</h3>
                    <p className="mt-3 text-sm leading-6 text-white/45">{product.description}</p>
                    <div className="mt-5 text-lg font-bold text-amber-300">{product.price}</div>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
          <div className="mt-8 rounded-3xl border border-white/10 bg-white/[.025] p-6 text-sm leading-7 text-white/50">
            Original store categories found: Men, Ladies Tops, Ladies Bottoms and Tumblers. The old site uses a “Load more” storefront, so this public crawl may not expose every hidden inventory item or variant.
          </div>
        </section>

        <section id="about" className="border-y border-white/10 bg-[#0b0b0b]">
          <div className="mx-auto max-w-7xl px-5 py-24 md:px-8">
            <p className="text-xs uppercase tracking-[.35em] text-amber-300">About Diggy Nation</p>
            <h2 className="mt-4 max-w-4xl text-5xl font-black uppercase tracking-[-.05em] md:text-7xl">Fashion was always part of the expression.</h2>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {about.map((item) => <SpotlightCard key={item.title} className="!border-white/10 !bg-[#111] !p-7" spotlightColor="rgba(245,181,45,.16)"><div className="relative z-10"><h3 className="text-2xl font-bold">{item.title}</h3><p className="mt-4 leading-7 text-white/50">{item.body}</p></div></SpotlightCard>)}
            </div>
          </div>
        </section>

        <section id="mr-lexx" className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:px-8 lg:grid-cols-2">
          <div className="relative min-h-[500px] overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_50%_22%,rgba(245,181,45,.24),transparent_26%),linear-gradient(160deg,#1a1a1a,#050505)]">
            <div className="absolute inset-x-0 bottom-[-5%] text-center text-[24vw] font-black leading-none text-white/[.035] lg:text-[13rem]">LEXX</div>
            <div className="absolute bottom-8 left-8 text-xs uppercase tracking-[.3em] text-white/40">Artist · Actor · Dancer · Founder</div>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-xs uppercase tracking-[.35em] text-amber-300">Meet Mr. Lexx</p>
            <h2 className="mt-4 text-5xl font-black uppercase leading-[.92] tracking-[-.05em] md:text-7xl">{mrLexx.stageNames}</h2>
            <p className="mt-7 text-lg leading-8 text-white/55">{mrLexx.name}, born {mrLexx.born}, is a Jamaican Dancehall artist from {mrLexx.origin}. {mrLexx.summary}</p>
            <div className="mt-7 space-y-3 text-sm leading-6 text-white/45">{mrLexx.highlights.map((x) => <p key={x}>— {x}</p>)}</div>
          </div>
        </section>

        <section id="press" className="border-y border-white/10 bg-[#0b0b0b]">
          <div className="mx-auto max-w-7xl px-5 py-24 md:px-8">
            <p className="text-xs uppercase tracking-[.35em] text-amber-300">Archive</p>
            <div className="mt-4 grid gap-10 lg:grid-cols-[.65fr_1.35fr]">
              <h2 className="text-5xl font-black uppercase leading-[.9] tracking-[-.05em] md:text-7xl">Mr. Lexx<br/>in the news.</h2>
              <div className="divide-y divide-white/10 border-y border-white/10">{press.map((item) => <div key={`${item.date}-${item.title}`} className="grid gap-2 py-5 md:grid-cols-[150px_1fr]"><span className="text-xs uppercase tracking-[.14em] text-white/30">{item.date || 'Archive'}</span><span className="font-medium text-white/75">{item.title}</span></div>)}</div>
            </div>
          </div>
        </section>

        <section id="events" className="mx-auto max-w-7xl px-5 py-24 md:px-8">
          <p className="text-xs uppercase tracking-[.35em] text-amber-300">Historical event archive</p>
          <h2 className="mt-4 text-5xl font-black uppercase tracking-[-.05em] md:text-7xl">On the road.</h2>
          <div className="mt-10 grid gap-3 md:grid-cols-2">{events.map((event) => <div key={event} className="rounded-2xl border border-white/10 bg-white/[.025] p-5 text-sm leading-6 text-white/55">{event}</div>)}</div>
        </section>

        <section id="reviews" className="border-y border-white/10 bg-[#0b0b0b]">
          <div className="mx-auto max-w-7xl px-5 py-24 md:px-8">
            <div className="flex flex-wrap items-end justify-between gap-6"><div><p className="text-xs uppercase tracking-[.35em] text-amber-300">Community feedback</p><h2 className="mt-4 text-5xl font-black uppercase tracking-[-.05em] md:text-7xl">77 reviews.</h2></div><p className="max-w-lg text-sm leading-6 text-white/45">The original public page advertises 77 reviews. These are selected migrated testimonials while the full owner-side review export is still to be verified.</p></div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">{reviews.slice(0, 9).map(([name, date, quote]) => <SpotlightCard key={`${name}-${date}`} className="!border-white/10 !bg-[#111] !p-6" spotlightColor="rgba(245,181,45,.14)"><div className="relative z-10"><p className="leading-7 text-white/65">“{quote}”</p><div className="mt-6 text-sm font-semibold">{name}</div><div className="mt-1 text-xs text-white/30">{date}</div></div></SpotlightCard>)}</div>
          </div>
        </section>

        <section className="px-5 py-24 md:px-8">
          <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-amber-300/25 bg-[radial-gradient(circle_at_15%_10%,rgba(245,181,45,.18),transparent_24%),#0d0b08] p-8 md:p-14">
            <p className="text-xs uppercase tracking-[.35em] text-amber-300">ONE NATION</p>
            <h2 className="mt-4 max-w-4xl text-5xl font-black uppercase tracking-[-.05em] md:text-7xl">Keep the name. Give it a real purpose.</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/55">The original site already has a ONE NATION section heading. In the rebuild, this can become the real community layer for drops, exclusives, event updates and direct fan connection.</p>
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
