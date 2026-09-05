import React from 'react';
import SpotlightCard from './src/components/SpotlightCard';
import Magnet from './src/components/Magnet';
import StarBorder from './src/components/StarBorder';

function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-100">
      <header className="px-6 py-16 text-center">
        <p className="mb-3 text-sm uppercase tracking-[0.2em] text-violet-300">React Bits · copied source</p>
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">React Bits MCP Demo</h1>
        <p className="mx-auto mb-8 max-w-xl text-lg text-neutral-400">
          Real components from reactbits.dev, sitting in this repo as source you can edit.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Magnet padding={60} magnetStrength={3}>
            <StarBorder color="#c4b5fd" speed="5s" backgroundColor="#111111" borderColor="#3f3f46">
              Get Started
            </StarBorder>
          </Magnet>
          <a
            href="https://reactbits.dev"
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border border-neutral-700 px-6 py-4 text-sm text-neutral-300 hover:border-violet-400"
          >
            Learn more on reactbits.dev
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 pb-20">
        <section className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-semibold">What is in this repo</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <SpotlightCard spotlightColor="rgba(167, 139, 250, 0.35)">
              <div className="relative z-10">
                <div className="mb-3 text-2xl">🔌</div>
                <h3 className="mb-2 text-xl font-medium">MCP lookup</h3>
                <p className="text-sm text-neutral-400">
                  Your Mac MCP helps Claude/Cursor find components. Grok cannot talk to that process.
                </p>
              </div>
            </SpotlightCard>
            <SpotlightCard spotlightColor="rgba(52, 211, 153, 0.3)">
              <div className="relative z-10">
                <div className="mb-3 text-2xl">🧩</div>
                <h3 className="mb-2 text-xl font-medium">Copied source</h3>
                <p className="text-sm text-neutral-400">
                  SpotlightCard, Magnet, and StarBorder live in <code className="text-violet-300">src/components/</code>.
                </p>
              </div>
            </SpotlightCard>
            <SpotlightCard spotlightColor="rgba(196, 181, 253, 0.35)">
              <div className="relative z-10">
                <div className="mb-3 text-2xl">⚡</div>
                <h3 className="mb-2 text-xl font-medium">No extra npm lib</h3>
                <p className="text-sm text-neutral-400">
                  React Bits is copy-paste. You own the files. Tweak colors and motion anytime.
                </p>
              </div>
            </SpotlightCard>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-semibold">Live components</h2>
          <div className="space-y-8">
            <div className="rounded-3xl border border-neutral-800 bg-neutral-950 p-8">
              <h3 className="mb-2 text-2xl font-semibold">StarBorder + Magnet</h3>
              <p className="mb-6 text-sm text-neutral-400">
                Move near the button — Magnet pulls it. The rim is StarBorder.
              </p>
              <Magnet padding={80} magnetStrength={2.4}>
                <StarBorder color="#34d399" speed="4.5s" backgroundColor="#052e1a" borderColor="#14532d">
                  Hover around me
                </StarBorder>
              </Magnet>
            </div>

            <SpotlightCard className="!p-8" spotlightColor="rgba(99, 102, 241, 0.45)">
              <div className="relative z-10">
                <h3 className="mb-2 text-2xl font-semibold">SpotlightCard</h3>
                <p className="text-neutral-300">
                  Move the pointer across this card. The glow follows the cursor.
                  Source: official React Bits Tailwind variant.
                </p>
              </div>
            </SpotlightCard>
          </div>
        </section>

        <section className="text-center">
          <h2 className="mb-8 text-3xl font-semibold">Add more later</h2>
          <ol className="mx-auto max-w-2xl space-y-3 rounded-3xl border border-neutral-800 bg-neutral-950 p-8 text-left text-neutral-300">
            <li>1. Registry is already in <code className="text-violet-300">components.json</code></li>
            <li>
              2. CLI name pattern:{' '}
              <code className="text-violet-300">npx shadcn@latest add https://reactbits.dev/r/SplitText-JS-TW</code>
            </li>
            <li>3. Or copy another file from DavidHDev/react-bits <code className="text-violet-300">src/tailwind/</code></li>
            <li>4. Import it in <code className="text-violet-300">App.jsx</code> the same way as SpotlightCard</li>
          </ol>
        </section>
      </main>

      <footer className="border-t border-neutral-800 py-10 text-center text-sm text-neutral-500">
        Built with React, Vite, Tailwind, and copied React Bits components · © 2026
      </footer>
    </div>
  );
}

export default App;
