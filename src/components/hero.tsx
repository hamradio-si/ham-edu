interface HeroProps {
  image: string;
  className?: string;
  children: React.ReactNode;
}

export function Hero({ image, className, children }: HeroProps) {
  return (
    <div
      className={`hero relative flex ${className}`}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="container z-10">
        <div className="max-w-lg rounded-2xl bg-neutral/80 p-10 text-white">
          {children}
        </div>
      </div>
    </div>
  );
}
