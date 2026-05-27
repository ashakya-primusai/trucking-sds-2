import { Reveal } from "@/components/ui/reveal";

const companies = [
  "Mercer Lines",
  "Pioneer Transit",
  "Atlas Freight",
  "Westbound Co",
  "Redhawk Logistics",
  "Coastline Trucking",
];

export function SocialProof() {
  return (
    <Reveal variant="fade">
      <div className="border-y border-line py-6 bg-bg">
        <div className="page-wrap flex items-center gap-12 flex-wrap">
          <span className="font-mono text-xs tracking-[0.08em] uppercase text-ink-3">
            Trusted by 10,000+ dispatchers
          </span>
          <div className="flex flex-wrap gap-x-8 gap-y-3 flex-1 justify-end">
            {companies.map((name, i) => (
              <Reveal key={name} variant="fade" delay={80 + i * 40}>
                <span className="font-medium text-[14.5px] text-ink-3 tracking-tight opacity-85">
                  {name}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
