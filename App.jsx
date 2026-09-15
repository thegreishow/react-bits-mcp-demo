import React from 'react';
import SpotlightCard from './src/components/SpotlightCard';
import Magnet from './src/components/Magnet';
import StarBorder from './src/components/StarBorder';

const nav = ['Shop', 'Mr. Lexx', 'Music', 'Events', 'One Nation'];

function App() {
  return (
    <div className="min-h-screen bg-[#070707] text-white">
      <div className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <a href="#top" className="text-lg font-black tracking-[0.28em]">DIGGY NATION</a>
          <nav className="hidden gap-7 text-xs uppercase tracking-[0.18em] text-white/65 md:flex">
            {nav.map((item) => <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="transition hover:text-white">{item}</a>)}
          </nav>
          <a href="#contact" className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.16em] hover:bg-white hover:text-black">Bookings</a>
        </div>
      </div>

      <main id="top">
        <section className="relative flex min-h-screen items-end overflow-hidden px-5 pb-16 pt-28 md:px-8 md:pb-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_24%,rgba(245,181,45,.22),transparent_28%),radial-gradient(circle_at_20%_72%,rgba(255,255,255,.09),transparent_30%),linear-gradient(135deg,#050505,#131313_55%,#050505)]" />
          <div className="absolute right-[-8vw] top-[13vh] select-none text-[42vw] font-black leading-none text-white/[0.025]">D</div>
          <div className="relative z-10 mx-auto grid w-full max-w-7xl items-end gap-10 lg:grid-cols-[1.25fr_.75fr]">
            <div>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.38em] text-amber-300">Mr. Lexx presents</p>
              <h1 className="max-w-5xl text-[18vw] font-black uppercase leading-[.76] tracking-[-.065em] sm:text-[14vw] lg:text-[9.8rem]">Diggy<br/>Nation</h1>
              <p className="mt-8 max-w-xl text-base leading-7 text-white/62 md:text-lg">Dancehall heritage, fashion, music and culture — built into one digital home.</p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Magnet padding={55} magnetStrength={3}>
                  <a href="#shop">
                    <StarBorder color="#f5b52d" speed="4s" backgroundColor="#14100a" borderColor="#745719">Enter the shop</StarBorder>
                  </a>
                </Magnet>
                <a href="#mr.-lexx" className="rounded-[20px] border border-white/15 px-7 py-4 text-sm uppercase tracking-[.14em] text-white/75 transition hover:border-white/45 hover:text-white">Discover Mr. Lexx</a>
              </div>
            </div>
            <div className="pb-3 lg:pb-8">
              <div className="border-l border-amber-300/70 pl-5">
                <p className="text-xs uppercase tracking-[.3em] text-white/40">Diggy Nation / Jamaica</p>
                <p className="mt-3 max-w-sm text-2xl font-semibold leading-tight">More than merch. A lifestyle brand powered by Dancehall.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="shop" className="mx-auto max-w-7xl px-5 py-24 md:px-8">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div><p className="text-xs uppercase tracking-[.35em] text-amber-300">The label</p><h2 className="mt-3 text-5xl font-black uppercase tracking-[-.04em] md:text-7xl">Wear the nation.</h2></div>
            <a href="#contact" className="text-sm uppercase tracking-[.2em] text-white/55 hover:text-white">Shop all →</a>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              ['01','Diggy Essentials','Core tees, statement pieces and everyday staples.'],
              ['02','Limited Drops','Small-run collections built around moments, music and culture.'],
              ['03','Custom Orders','Special requests and made-for-you Diggy Nation pieces.']
            ].map(([n,title,copy]) => (
              <SpotlightCard key={title} className="!min-h-[330px] !border-white/10 !bg-[#0d0d0d] !p-7" spotlightColor="rgba(245,181,45,.22)">
                <div className="relative z-10 flex h-full min-h-[275px] flex-col justify-between">
                  <span className="text-xs tracking-[.3em] text-white/35">{n}</span>
                  <div><h3 className="text-3xl font-bold uppercase">{title}</h3><p className="mt-3 max-w-xs leading-6 text-white/48">{copy}</p></div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </section>

        <section id="mr.-lexx" className="border-y border-white/10 bg-[#0b0b0b]">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:px-8 lg:grid-cols-2">
            <div className="relative min-h-[480px] overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_50%_22%,rgba(245,181,45,.24),transparent_26%),linear-gradient(160deg,#1a1a1a,#050505)]">
              <div className="absolute inset-x-0 bottom-[-5%] text-center text-[24vw] font-black leading-none text-white/[.035] lg:text-[13rem]">LEXX</div>
              <div className="absolute bottom-8 left-8 text-xs uppercase tracking-[.3em] text-white/40">Artist · Icon · Founder</div>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-xs uppercase tracking-[.35em] text-amber-300">The artist</p>
              <h2 className="mt-4 text-5xl font-black uppercase leading-[.92] tracking-[-.05em] md:text-7xl">Mr. Lexx<br/>Still forward.</h2>
              <p className="mt-7 max-w-xl text-lg leading-8 text-white/55">A digital home for the music, history, visuals, appearances and next chapter of one of Jamaica's unmistakable Dancehall voices.</p>
              <div className="mt-8 flex flex-wrap gap-3 text-xs uppercase tracking-[.18em] text-white/65"><span className="rounded-full border border-white/10 px-4 py-2">Music</span><span className="rounded-full border border-white/10 px-4 py-2">Videos</span><span className="rounded-full border border-white/10 px-4 py-2">Press</span><span className="rounded-full border border-white/10 px-4 py-2">EPK</span></div>
            </div>
          </div>
        </section>

        <section id="music" className="mx-auto max-w-7xl px-5 py-24 md:px-8">
          <p className="text-xs uppercase tracking-[.35em] text-amber-300">Sound system</p>
          <div className="mt-4 grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <h2 className="text-5xl font-black uppercase leading-[.9] tracking-[-.05em] md:text-7xl">Classics.<br/>New music.<br/>One archive.</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {['Latest Release','Essential Mr. Lexx','Videos + Performances','Jiggy House / New Projects'].map((x,i)=><div key={x} className="group rounded-3xl border border-white/10 bg-white/[.025] p-6 transition hover:-translate-y-1 hover:border-amber-300/30"><span className="text-xs text-white/30">0{i+1}</span><h3 className="mt-16 text-2xl font-semibold">{x}</h3><p className="mt-2 text-sm text-white/40">Explore →</p></div>)}
            </div>
          </div>
        </section>

        <section id="one-nation" className="px-5 py-24 md:px-8">
          <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-amber-300/25 bg-[radial-gradient(circle_at_15%_10%,rgba(245,181,45,.18),transparent_24%),#0d0b08] p-8 md:p-14">
            <p className="text-xs uppercase tracking-[.35em] text-amber-300">Community</p>
            <h2 className="mt-4 max-w-4xl text-5xl font-black uppercase tracking-[-.05em] md:text-7xl">One Nation starts here.</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/55">Drops, exclusives, early access, event updates and direct connection with the Diggy Nation community.</p>
            <Magnet padding={45} magnetStrength={3} wrapperClassName="mt-8"><StarBorder color="#f5b52d" speed="5s" backgroundColor="#171109" borderColor="#6e531d">Join One Nation</StarBorder></Magnet>
          </div>
        </section>
      </main>

      <footer id="contact" className="border-t border-white/10 px-5 py-14 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end">
          <div><div className="text-3xl font-black tracking-[.18em]">DIGGY NATION</div><p className="mt-3 text-sm text-white/35">Shop · Music · Bookings · Culture</p></div>
          <div className="text-left text-xs uppercase tracking-[.2em] text-white/40 md:text-right"><p>Concept showcase · 2026</p><p className="mt-2">DiggyNation.com redesign</p></div>
        </div>
      </footer>
    </div>
  );
}

export default App;
