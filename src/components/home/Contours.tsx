import Image from "next/image";

const LAYOUT = [
  { n: 1, className: "top-[4%] left-[-6%] w-[34vw] rotate-[-8deg]" },
  { n: 2, className: "top-[10%] right-[-4%] w-[26vw] rotate-[12deg]" },
  { n: 3, className: "top-[42%] left-[30%] w-[30vw]" },
  { n: 4, className: "top-[55%] left-[-8%] w-[28vw] rotate-[20deg]" },
  { n: 5, className: "top-[60%] right-[-6%] w-[30vw] rotate-[-14deg]" },
  { n: 6, className: "top-[82%] left-[38%] w-[26vw] rotate-[6deg]" },
];

/** Topographic contour-line decorations used on the dark and blue sections. */
export function Contours({ className = "opacity-60" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {LAYOUT.map(({ n, className: c }) => (
        <Image
          key={n}
          src={`/images/decor/contour-0${n}.svg`}
          alt=""
          width={449}
          height={450}
          className={`absolute h-auto ${c}`}
        />
      ))}
    </div>
  );
}
