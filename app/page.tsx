export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-2xl space-y-8">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          World Horse Organization
        </h1>

        <p className="text-lg sm:text-xl text-foreground/70 leading-relaxed">
          The World Horse Organization is committed to making sure every horse
          in the world gets released from ownership into the freedom of the
          World Horse Organization.
        </p>

        <div className="pt-4 space-y-2">
          <p className="text-sm font-mono uppercase tracking-widest text-foreground/40">
            Coming soon
          </p>
          <p className="text-sm text-foreground/50">
            Weekly races. Trading. Breeding. You can&apos;t own that horse.
          </p>
        </div>
      </div>
    </main>
  );
}
