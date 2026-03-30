import { marqueeItems } from '../data';

export function Marquee() {
  const doubled = [...marqueeItems, ...marqueeItems];

  return (
    <div
      id="marquee-section"
      className="marquee-wrapper overflow-hidden border-t border-b border-mid-grey py-14"
    >
      <div className="marquee-track flex w-max animate-marquee">
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-12 pr-12 whitespace-nowrap">
            <span
              className={`font-serif font-light tracking-[0.06em] ${
                item.italic ? 'italic text-warm-grey' : 'text-warm-black'
              }`}
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.8rem)' }}
            >
              {item.text}
            </span>
            <span className="w-[6px] h-[6px] rounded-full bg-accent flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}