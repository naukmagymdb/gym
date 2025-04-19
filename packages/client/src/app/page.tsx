export default function Home() {
  return (
    <div
      className="min-h-screen relative flex flex-col items-center justify-center py-12 text-center"
      style={{
        backgroundImage: 'url("/landing_background.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">
          Welcome to our Gym
        </h1>
        <p className="text-xl text-gray-200 mb-8 max-w-2xl">
          A comprehensive gym management system for tracking members, classes,
          and trainers. Streamline your gym operations with our easy-to-use
          platform.
        </p>
      </div>
    </div>
  );
}
