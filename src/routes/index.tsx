import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ChevronDown, AlertTriangle, Phone, MapPinOff, FileWarning, Scale, Users,
  Plane, Crosshair, ClipboardCheck, Truck, Recycle, FileText,
  Radar, BarChart3, Camera, Flame, Droplet, Bird, Skull,
  Calendar, CheckCircle2, XCircle, Sparkles, ArrowRight, MapPin,
} from "lucide-react";
import heroImg from "@/assets/hero-drone.jpg";
import dump1 from "@/assets/dump-site-1.jpg";
import dump2 from "@/assets/dump-site-2.jpg";
import droneImg from "@/assets/drone-flight.jpg";
import cleanupImg from "@/assets/cleanup.jpg";

export const Route = createFileRoute("/")({ component: Presentation });

/* ---------- Shared bits ---------- */

const sections = [
  { id: "open", label: "Open" },
  { id: "problem", label: "Problem" },
  { id: "challenges", label: "Challenges" },
  { id: "map", label: "Hotspots" },
  { id: "impact", label: "Impact" },
  { id: "solution", label: "Workflow" },
  { id: "phases", label: "Phases" },
  { id: "evidence", label: "Evidence" },
  { id: "dashboard", label: "Dashboard" },
  { id: "finance", label: "Model" },
  { id: "compare", label: "Compare" },
  { id: "pilot", label: "Pilot" },
  { id: "future", label: "Future" },
  { id: "close", label: "Close" },
];

function ProgressRail() {
  const [active, setActive] = useState("open");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  return (
    <nav className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
      <ul className="space-y-3">
        {sections.map((s, i) => (
          <li key={s.id} className="group flex items-center justify-end gap-3">
            <span
              className={`font-mono text-[10px] uppercase tracking-[0.2em] transition-opacity ${
                active === s.id ? "text-bone opacity-100" : "text-muted-foreground opacity-0 group-hover:opacity-100"
              }`}
            >
              {String(i + 1).padStart(2, "0")} · {s.label}
            </span>
            <a
              href={`#${s.id}`}
              className={`block h-px transition-all ${
                active === s.id ? "w-10 bg-moss" : "w-5 bg-bone/30 hover:bg-bone/60"
              }`}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Section({
  id, label, index, title, children, className = "",
}: {
  id: string; label?: string; index?: string; title?: React.ReactNode;
  children: React.ReactNode; className?: string;
}) {
  return (
    <section id={id} className={`relative min-h-screen w-full px-6 py-24 md:px-16 lg:px-24 ${className}`}>
      <div className="mx-auto max-w-7xl">
        {(label || title) && (
          <header className="mb-12 max-w-4xl">
            {label && (
              <div className="mb-4 flex items-center gap-3">
                {index && <span className="font-mono text-xs text-moss">{index}</span>}
                <span className="section-label">{label}</span>
              </div>
            )}
            {title && (
              <h2 className="font-display text-4xl font-light leading-[1.05] text-balance text-bone md:text-6xl">
                {title}
              </h2>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}

/* ---------- 1. Opening ---------- */


function Opening() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="open"
      ref={ref}
      className="relative flex h-screen w-full items-center overflow-hidden"
    >
      {/* Background */}
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src={heroImg}
          alt="Aerial view of illegal dumping in bushland"
          className="h-[120%] w-full object-cover"
          width={1920}
          height={1080}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />

        <div className="absolute inset-0 topo opacity-30 mix-blend-overlay" />
      </motion.div>

      {/* Main Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col justify-center px-6 md:px-16 lg:px-24"
      >
        {/* Center Content */}
        <div>
          <div className="mb-8 flex items-center gap-3">
            <span className="h-px w-12 bg-moss" />

            <span className="font-mono text-xs uppercase tracking-[0.3em] text-moss">
              Council Proposal · 2026
            </span>
          </div>

          <h1 className="max-w-5xl font-display text-5xl font-light leading-[0.98] text-balance text-bone md:text-7xl lg:text-[5.5rem]">
            Drone-enabled illegal dumping{" "}
            <em className="not-italic text-moss">detection</em> & rapid{" "}
            <em className="not-italic text-moss">removal.</em>
          </h1>

          <p className="mt-8 max-w-2xl text-lg text-fog md:text-xl">
            An interactive council briefing on a modern, evidence-based
            operational model for protecting bushland, reserves, and remote
            council land.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="absolute bottom-12 left-0 right-0 flex items-end justify-between px-6 md:px-16 lg:px-24">
          <div className="text-sm text-muted-foreground">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-moss">
              Prepared by
            </div>

            <div className="mt-1 text-bone">
              Greenback Recovery PTY LTD
            </div>
          </div>

          <motion.a
            href="#problem"
            initial={{ y: 0 }}
            animate={{ y: [0, 8, 0] }}
            transition={{
              repeat: Infinity,
              duration: 2.4,
              ease: "easeInOut",
            }}
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-bone/70 hover:text-bone"
          >
            Scroll to begin <ChevronDown className="h-4 w-4" />
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
/* ---------- 2. Problem ---------- */

const problemStats = [
  { k: "72%", v: "of dumping incidents go unreported until they become hotspots" },
  { k: "weeks", v: "Average delay between dumping and council action" },
  { k: "$1.2k+", v: "Typical cleanup cost per incident, escalating with volume" },
  { k: "↑ 38%", v: "Rise in remote bushland dumping over the past three years" },
];

function Problem() {
  const images = [dump1, dump2, heroImg];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % images.length), 4500);
    return () => clearInterval(t);
  }, [images.length]);
  return (
    <Section id="problem" index="02" label="The Problem"
      title={<>A growing, <em className="not-italic text-moss">unmanaged</em> environmental burden.</>}
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="space-y-4">
          {problemStats.map((s, idx) => (
            <motion.div
              key={s.k}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="group flex items-start gap-6 border-t border-bone/10 pt-6"
            >
              <div className="w-32 shrink-0 font-display text-4xl font-light text-moss md:text-5xl">{s.k}</div>
              <p className="text-lg text-fog">{s.v}</p>
            </motion.div>
          ))}
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-card lg:aspect-auto">
          <AnimatePresence mode="wait">
            <motion.img
              key={i}
              src={images[i]}
              alt="Illegally dumped waste in bushland"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
          </AnimatePresence>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-6">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/70">
              <span className="h-1.5 w-1.5 rounded-full bg-rust" />
              Documented hotspot · Gnangara region
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------- 3. Challenges ---------- */

const challenges = [
  { icon: Phone, title: "Reliance on public reporting", body: "Most dumping is found weeks after the fact, only when residents complain. By then volume — and cost — has multiplied." },
  { icon: MapPinOff, title: "Remote, inaccessible locations", body: "Fire trails, forest tracks and reserve edges are rarely patrolled. They become magnets for repeat offenders." },
  { icon: FileWarning, title: "Administrative overload", body: "Officers juggle inspection, evidence, contractor coordination and reporting — slowing every response." },
  { icon: Scale, title: "Compliance & liability risk", body: "Asbestos, fuels and chemicals create EPA exposure when discovery and removal are delayed." },
  { icon: Users, title: "Community complaints", body: "Visible neglect erodes public trust and adds reputational pressure to already stretched teams." },
];

function Challenges() {
  return (
    <Section
      id="challenges"
      index="03"
      label="Current Reality"
      title={
        <>
          Five pressures every council <em className="not-italic text-moss">already</em> knows.
        </>
      }
      className="bg-card/40"
    >
      <div className="grid gap-3">
        {challenges.map((c, idx) => {
          const Icon = c.icon;
          return (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="grid grid-cols-[auto_1fr_auto] gap-6 border-t border-bone/10 py-4"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-moss/30 bg-moss/5">
                <Icon className="h-5 w-5 text-moss" />
              </div>

              <div>
                <div className="font-display text-2xl font-light text-bone md:text-3xl">
                  {c.title}
                </div>
                <p className="mt-3 max-w-3xl text-fog">
                  {c.body}
                </p>
              </div>

              <span className="font-mono text-xs text-muted-foreground">
                0{idx + 1}
              </span>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

/* ---------- 4. Map ---------- */

const pins = [
  { x: 28, y: 38, name: "Gnangara North Track", waste: "Construction debris", tonnes: "~ 4.2 t", risk: "High" },
  { x: 46, y: 55, name: "Reserve Edge — Sector C", waste: "Tyres & furniture", tonnes: "~ 1.6 t", risk: "Medium" },
  { x: 64, y: 32, name: "Fire Trail 17", waste: "Asbestos sheeting", tonnes: "~ 0.8 t", risk: "Critical" },
  { x: 72, y: 68, name: "Pinjar Access Road", waste: "Mixed household", tonnes: "~ 2.1 t", risk: "Medium" },
  { x: 38, y: 72, name: "Wanneroo Bushland", waste: "Green waste & timber", tonnes: "~ 3.4 t", risk: "Low" },
  { x: 55, y: 22, name: "Old Quarry Approach", waste: "Industrial drums", tonnes: "~ 1.2 t", risk: "Critical" },
];

const riskColor: Record<string, string> = {
  Low: "text-moss border-moss/40 bg-moss/10",
  Medium: "text-amber-300 border-amber-300/40 bg-amber-300/10",
  High: "text-orange-300 border-orange-300/40 bg-orange-300/10",
  Critical: "text-rust border-rust/40 bg-rust/10",
};

function MapSection() {
  const [active, setActive] = useState(0);
  return (
    <Section id="map" index="04" label="Hotspot Intelligence"
      title={<>Where dumping is <em className="not-italic text-moss">actually</em> happening.</>}
    >
      <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <div className="relative aspect-[16/10] overflow-hidden rounded-sm border hairline bg-[oklch(0.22_0.018_160)]">
          {/* topo background */}
          <div className="absolute inset-0 topo opacity-60" />
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {[0.15, 0.3, 0.45, 0.6, 0.75].map((r, i) => (
              <path
                key={i}
                d={`M ${10 + i * 3} ${50 + Math.sin(i) * 10} Q ${50} ${20 + i * 8} ${90 - i * 2} ${60 - i * 5}`}
                fill="none"
                stroke="oklch(0.62 0.09 150 / 0.18)"
                strokeWidth="0.15"
              />
            ))}
          </svg>
          {/* scanning line */}
          <motion.div
            className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-moss to-transparent"
            animate={{ x: ["0%", "100%", "0%"] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            style={{ width: "100%", boxShadow: "0 0 40px oklch(0.62 0.09 150 / 0.4)" }}
          >
            <div className="h-full w-px bg-moss" />
          </motion.div>

          {pins.map((p, i) => (
            <button
              key={p.name}
              onClick={() => setActive(i)}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              <span className="relative flex h-4 w-4 items-center justify-center">
                <span className={`absolute h-full w-full animate-ping rounded-full ${active === i ? "bg-rust/40" : "bg-moss/40"}`} />
                <span className={`relative h-2.5 w-2.5 rounded-full ${active === i ? "bg-rust shadow-[0_0_12px] shadow-rust" : "bg-moss"}`} />
              </span>
            </button>
          ))}

          <div className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.2em] text-moss">
            ⌖ Live hotspot map · 6 pins · Northern Corridor
          </div>
          <div className="absolute bottom-4 right-4 font-mono text-[10px] text-muted-foreground">
            31°44'S · 115°50'E
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="glass rounded-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-moss">Incident #{String(active + 1).padStart(3, "0")}</div>
              <span className={`chip border ${riskColor[pins[active].risk]}`}>{pins[active].risk}</span>
            </div>
            <h3 className="mt-4 font-display text-3xl font-light text-bone">{pins[active].name}</h3>
            <div className="mt-6 space-y-3 border-t border-bone/10 pt-4 text-sm">
              <Row k="Waste type" v={pins[active].waste} />
              <Row k="Est. tonnage" v={pins[active].tonnes} />
              <Row k="Detected by" v="Drone sweep · A-07" />
              <Row k="Status" v="Pending dispatch" />
            </div>
            <div className="mt-6 grid grid-cols-3 gap-1">
              <img src={dump1} alt="" className="aspect-square w-full object-cover" loading="lazy" />
              <img src={dump2} alt="" className="aspect-square w-full object-cover" loading="lazy" />
              <img src={heroImg} alt="" className="aspect-square w-full object-cover" loading="lazy" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{k}</span>
      <span className="text-bone">{v}</span>
    </div>
  );
}

/* ---------- 5. Impact ---------- */

const impacts = [
  { icon: Skull, t: "Asbestos exposure", b: "Demolition waste left in bushland degrades and releases fibres — putting officers, contractors, and the public at risk.", img: dump1 },
  { icon: Droplet, t: "Groundwater contamination", b: "Drums, paints and fuels leach into shallow aquifers feeding sensitive wetland systems.", img: dump2 },
  { icon: Flame, t: "Bushfire fuel load", b: "Tyres, mattresses and timber piles act as accelerants in a region already stretched by fire seasons.", img: heroImg },
  { icon: Bird, t: "Wildlife & habitat damage", b: "Native species ingest plastics and entangle in debris; nesting sites are smothered or contaminated.", img: cleanupImg },
];

function Impact() {
  return (
    <Section id="impact" index="05" label="Environmental Impact"
      title={<>The cost of <em className="not-italic text-moss">waiting</em> is paid by the bush.</>}
      className="bg-card/40"
    >
      <div className="space-y-24">
        {impacts.map((it, i) => {
          const Icon = it.icon;
          const reverse = i % 2 === 1;
          return (
            <motion.div
              key={it.t}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`grid items-center gap-10 lg:grid-cols-2 ${reverse ? "lg:[&>div:first-child]:order-2" : ""}`}
            >
              <div>
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-moss/30 bg-moss/5">
                    <Icon className="h-6 w-6 text-moss" />
                  </div>
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    Risk vector · 0{i + 1}
                  </span>
                </div>
                <h3 className="font-display text-4xl font-light text-bone md:text-5xl">{it.t}</h3>
                <p className="mt-4 max-w-md text-lg text-fog">{it.b}</p>
              </div>
              <div className="relative aspect-[16/10] overflow-hidden rounded-sm">
                <img src={it.img} alt="" className="h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-tr from-background/80 via-transparent to-transparent" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

/* ---------- 6. Solution Workflow ---------- */

const workflow = [
  { icon: Plane, t: "Drone Surveillance", b: "Scheduled aerial sweeps of high-risk corridors, fire trails and reserve edges — including locations unreachable by patrol vehicles." },
  { icon: Crosshair, t: "GPS Mapping", b: "Every incident is geo-tagged at the moment of capture. Coordinates flow directly into the operations dashboard." },
  { icon: ClipboardCheck, t: "Waste Verification", b: "Categorisation by type — construction, asbestos, household, hazardous — drives triage and the right contractor response." },
  { icon: Truck, t: "Contractor Mobilisation", b: "Verified incidents dispatch licensed removal crews with appropriate equipment, PPE and disposal pathway pre-assigned." },
  { icon: Recycle, t: "Removal & Disposal", b: "Materials are extracted, weighed and routed to licensed facilities. Resource recovery is prioritised wherever possible." },
  { icon: FileText, t: "Evidence Pack & Reporting", b: "Each closed incident produces a sealed pack: before/after imagery, GPS, weighbridge, disposal receipts — ready for EPA or audit." },
];

function Solution() {
  return (
    <Section id="solution" index="06" label="Proposed Solution"
      title={<>One continuous workflow — <em className="not-italic text-moss">detection</em> to closure.</>}
    >
      <div className="relative">
        {/* vertical line */}
        <div className="absolute left-7 top-2 bottom-2 hidden w-px bg-gradient-to-b from-moss via-moss/30 to-transparent md:block" />
        <div className="space-y-10">
          {workflow.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.t}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="grid gap-6 md:grid-cols-[auto_1fr] md:gap-10"
              >
                <div className="relative flex md:block">
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-moss/40 bg-background">
                    <Icon className="h-6 w-6 text-moss" />
                  </div>
                </div>
                <div className="pb-6">
                  <div className="font-mono text-xs uppercase tracking-[0.25em] text-moss">Step 0{i + 1}</div>
                  <h3 className="mt-1 font-display text-3xl font-light text-bone md:text-4xl">{s.t}</h3>
                  <p className="mt-3 max-w-2xl text-fog">{s.b}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

/* ---------- 7. Phases ---------- */

const phases = [
  {
    n: "Phase 01", t: "Detection & Removal", img: droneImg,
    pts: ["Scheduled drone sweeps", "Verified incident reports", "Licensed contractor dispatch", "Same-week response window"],
  },
  {
    n: "Phase 02", t: "Reporting & Documentation", img: cleanupImg,
    pts: ["Sealed evidence packs", "EPA-ready compliance trail", "Monthly council dashboard", "Hotspot trend analysis"],
  },
  {
    n: "Phase 03", t: "Optional AI Deterrence", img: heroImg,
    pts: ["Solar AI cameras at hotspots", "Vehicle detection & alerts", "Repeat-offender intelligence", "Preventative coverage"],
  },
];

function Phases() {
  return (
    <Section id="phases" index="07" label="Service Model"
      title={<>A three-phase model that <em className="not-italic text-moss">evolves</em> with you.</>}
      className="bg-card/40"
    >
      <div className="grid gap-6 md:grid-cols-3">
        {phases.map((p, i) => (
          <motion.article
            key={p.n}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="group relative flex flex-col overflow-hidden rounded-sm border hairline bg-background/40"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={p.img} alt={p.t} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            </div>
            <div className="flex-1 p-6">
              <div className="font-mono text-xs uppercase tracking-[0.25em] text-moss">{p.n}</div>
              <h3 className="mt-2 font-display text-3xl font-light text-bone">{p.t}</h3>
              <ul className="mt-5 space-y-2 text-sm text-fog">
                {p.pts.map((pt) => (
                  <li key={pt} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-3 shrink-0 bg-moss" />{pt}
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

/* ---------- 8. Evidence Pack ---------- */

function Evidence() {
  return (
    <Section id="evidence" index="08" label="Evidence Pack" title={<>What gets handed back to council.</>}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="overflow-hidden rounded-sm border hairline bg-card shadow-2xl shadow-black/40"
      >
        <div className="flex items-center justify-between border-b border-bone/10 bg-background/60 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-moss/15 text-moss">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-moss">Incident Report</div>
              <div className="font-display text-sm text-bone">GBR-2026-0148 · Closed</div>
            </div>
          </div>
          <div className="hidden text-right font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:block">
            Issued 14 March 2026 · 09:42 AWST
          </div>
        </div>

        <div className="grid gap-0 md:grid-cols-2">
          <div className="relative aspect-[4/3] border-b border-bone/10 md:border-b-0 md:border-r">
            <img src={dump1} alt="Before" className="h-full w-full object-cover" loading="lazy" />
            <div className="absolute left-3 top-3 chip">Before · 09:42</div>
          </div>
          <div className="relative aspect-[4/3]">
            <img src={cleanupImg} alt="After" className="h-full w-full object-cover" loading="lazy" />
            <div className="absolute left-3 top-3 chip border-moss/60 bg-moss/20">After · 16:08</div>
          </div>
        </div>

        <div className="grid gap-px bg-bone/5 md:grid-cols-4">
          {[
            ["GPS", "−31.7421, 115.8362"],
            ["Waste", "Mixed construction"],
            ["Weight", "4.18 t"],
            ["Facility", "Tamala Park · RCT-091"],
            ["Detected", "Drone A-07 · 09:42"],
            ["Dispatched", "10:15 · Crew B"],
            ["Completed", "16:08 · 6h 26m"],
            ["Officer", "J. Marlowe · GBR"],
          ].map(([k, v]) => (
            <div key={k} className="bg-card p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{k}</div>
              <div className="mt-1 text-sm text-bone">{v}</div>
            </div>
          ))}
        </div>

        <div className="grid gap-px bg-bone/5 md:grid-cols-3">
          {[
            { t: "Weighbridge Docket", id: "WB-44211" },
            { t: "Disposal Receipt", id: "TP-2026-0411" },
            { t: "Chain of Custody", id: "CoC-0148" },
          ].map((d) => (
            <div key={d.id} className="flex items-center justify-between bg-card p-4">
              <div>
                <div className="text-sm text-bone">{d.t}</div>
                <div className="font-mono text-xs text-muted-foreground">{d.id}</div>
              </div>
              <CheckCircle2 className="h-4 w-4 text-moss" />
            </div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}

/* ---------- 9. Dashboard ---------- */

function Dashboard() {
  const months = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
  const data = [18, 24, 21, 32, 28, 35, 41];
  const max = Math.max(...data);
  return (
    <Section id="dashboard" index="09" label="Operations Dashboard"
      title={<>What council sees, <em className="not-italic text-moss">every</em> month.</>}
      className="bg-card/40"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="overflow-hidden rounded-sm border hairline bg-background/60"
      >
        <div className="flex items-center justify-between border-b border-bone/10 px-6 py-4">
          <div className="flex items-center gap-3">
            <Radar className="h-4 w-4 text-moss" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-bone">Council Ops · March 2026</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-moss">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-moss" /> Live
          </div>
        </div>

        <div className="grid gap-px bg-bone/5 md:grid-cols-4">
          {[
            { k: "Incidents detected", v: "41", d: "+17% vs Feb", up: true },
            { k: "Tonnes removed", v: "127.4", d: "this month", up: true },
            { k: "Avg. response", v: "3.2d", d: "−1.1d vs Feb", up: false },
            { k: "Repeat hotspots", v: "06", d: "monitored", up: false },
          ].map((s) => (
            <div key={s.k} className="bg-background/40 p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{s.k}</div>
              <div className="mt-3 font-display text-5xl font-light text-bone">{s.v}</div>
              <div className={`mt-2 text-xs ${s.up ? "text-moss" : "text-fog"}`}>{s.d}</div>
            </div>
          ))}
        </div>

        <div className="grid gap-px bg-bone/5 md:grid-cols-[2fr_1fr]">
          <div className="bg-background/40 p-6">
            <div className="mb-6 flex items-center justify-between">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Incidents over time</div>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex h-44 items-end gap-3">
              {data.map((d, i) => (
                <div key={i} className="group flex flex-1 flex-col items-center gap-2">
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: `${(d / max) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.08, ease: "easeOut" }}
                    className="w-full rounded-t-sm bg-gradient-to-t from-moss/30 to-moss/80"
                  />
                  <span className="font-mono text-[10px] text-muted-foreground">{months[i]}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-background/40 p-6">
            <div className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <Camera className="h-3.5 w-3.5" /> Top hotspots
            </div>
            <ul className="space-y-3">
              {pins.slice(0, 5).map((p, i) => (
                <li key={p.name} className="flex items-center justify-between border-t border-bone/5 pt-3 text-sm">
                  <div className="flex items-center gap-2 text-bone">
                    <MapPin className="h-3 w-3 text-moss" /> {p.name}
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">{p.tonnes}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}

/* ---------- 10. Financial ---------- */

function Finance() {
  return (
    <Section id="finance" index="10" label="Financial Model"
      title={<>Structured around <em className="not-italic text-moss">scope</em>, not packaging.</>}
    >
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-1">
          {[
            { n: "01", t: "Council coverage area", b: "Reserves, bushland, fire trails, problem corridors" },
            { n: "02", t: "Monitoring scope", b: "Sweep frequency, drone hours, optional camera sites" },
            { n: "03", t: "Incident volume", b: "Historical and projected, by category and risk" },
            { n: "04", t: "Service cost structure", b: "Retainer, per-incident, or hybrid blend" },
          ].map((s) => (
            <div key={s.n} className="grid grid-cols-[auto_1fr] gap-6 border-t border-bone/10 py-6">
              <span className="font-mono text-xs text-moss">{s.n}</span>
              <div>
                <div className="font-display text-xl text-bone">{s.t}</div>
                <div className="mt-1 text-sm text-fog">{s.b}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { t: "Pilot Program", d: "Fixed 6-month engagement covering a defined area. Outcome data delivered at month 5." },
            { t: "Retainer", d: "Ongoing monthly coverage with agreed sweep cadence and SLA on response time." },
            { t: "Per-Incident", d: "Flexible model for ad-hoc activation. Costed on category, volume and access." },
            { t: "Optional AI Monitoring", d: "Add solar-powered cameras at confirmed repeat hotspots. Priced per node." },
          ].map((c) => (
            <motion.div
              key={c.t}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="rounded-sm border hairline bg-card/60 p-6"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-moss">Option</div>
              <h3 className="mt-2 font-display text-2xl font-light text-bone">{c.t}</h3>
              <p className="mt-2 text-sm text-fog">{c.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- 11. Compare ---------- */

function Compare() {
  const trad = ["Reactive, complaint-driven", "Delays of weeks or months", "Fragmented evidence trail", "Reliant on public reports", "Patchy coverage of remote sites"];
  const prop = ["Proactive, scheduled detection", "Same-week verified response", "Sealed evidence pack per incident", "Drone-led, dashboard-managed", "Full coverage of trails & reserves"];
  return (
    <Section id="compare" index="11" label="Why outsourcing works"
      title={<>Two operating models, side by side.</>}
      className="bg-card/40"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-sm border hairline bg-background/40 p-8">
          <div className="mb-6 flex items-center gap-3">
            <XCircle className="h-5 w-5 text-rust" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Traditional council process</span>
          </div>
          <ul className="space-y-4">
            {trad.map((t) => (
              <li key={t} className="flex items-start gap-3 border-t border-bone/10 pt-4 text-fog">
                <span className="mt-2 h-1 w-3 shrink-0 bg-rust/60" />{t}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-sm border border-moss/30 bg-moss/5 p-8">
          <div className="mb-6 flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-moss" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-moss">Proposed model</span>
          </div>
          <ul className="space-y-4">
            {prop.map((t) => (
              <li key={t} className="flex items-start gap-3 border-t border-moss/20 pt-4 text-bone">
                <span className="mt-2 h-1 w-3 shrink-0 bg-moss" />{t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

/* ---------- 12. Pilot Timeline ---------- */

const pilot = [
  { m: "Month 1", t: "Hotspot mapping", b: "Baseline survey, identify priority zones, agree sweep schedule." },
  { m: "Month 2", t: "Drone monitoring", b: "Scheduled aerial sweeps begin. First verified incidents enter the dashboard." },
  { m: "Month 3", t: "Removal coordination", b: "Full dispatch loop active. Licensed contractors operating with evidence packs." },
  { m: "Month 4", t: "Reporting metrics", b: "Monthly council reporting begins. Trends and repeat hotspots emerging." },
  { m: "Month 5–6", t: "Performance review", b: "Outcome data and recommendations presented to council leadership." },
];

function Pilot() {
  return (
    <Section id="pilot" index="12" label="Pilot Rollout"
      title={<>Six months. <em className="not-italic text-moss">Measurable</em> outcomes.</>}
    >
      <div className="relative">
        <div className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-moss/40 to-transparent md:block" />
        <ol className="grid gap-10 md:grid-cols-5 md:gap-4">
          {pilot.map((p, i) => (
            <motion.li
              key={p.m}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-moss/40 bg-background">
                <Calendar className="h-4 w-4 text-moss" />
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-moss">{p.m}</div>
              <h3 className="mt-2 font-display text-xl font-light text-bone">{p.t}</h3>
              <p className="mt-2 text-sm text-fog">{p.b}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

/* ---------- 13. Future ---------- */

const future = [
  { t: "Solar AI cameras", b: "Permanent detection at confirmed repeat zones." },
  { t: "Regional expansion", b: "Shared operations across neighbouring councils." },
  { t: "Predictive analytics", b: "Forecasting dumping risk by season and corridor." },
  { t: "Automated hotspot detection", b: "Computer vision flagging on drone capture." },
  { t: "Cross-council intelligence", b: "Shared offender data and disposal patterns." },
  { t: "Public transparency layer", b: "Quarterly public dashboards on outcomes." },
];

function Future() {
  return (
    <Section id="future" index="13" label="Future Vision"
      title={<>What this becomes <em className="not-italic text-moss">in three years.</em></>}
      className="bg-card/40"
    >
      <div className="grid gap-px overflow-hidden rounded-sm bg-bone/5 md:grid-cols-3">
        {future.map((f, i) => (
          <motion.div
            key={f.t}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="group relative bg-card p-8"
          >
            <Sparkles className="h-5 w-5 text-moss opacity-60 transition-opacity group-hover:opacity-100" />
            <h3 className="mt-6 font-display text-2xl font-light text-bone">{f.t}</h3>
            <p className="mt-2 text-sm text-fog">{f.b}</p>
            <ArrowRight className="absolute bottom-6 right-6 h-4 w-4 text-moss opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- 14. Close ---------- */

function Closing() {
  return (
    <section id="close" className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-32">
      <div className="absolute inset-0">
        <img src={heroImg} alt="" className="h-full w-full object-cover opacity-30" loading="lazy" />
        <div className="absolute inset-0 bg-background/85" />
        <div className="absolute inset-0 topo opacity-30" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 mx-auto max-w-5xl text-center"
      >
        <div className="mx-auto mb-8 h-px w-16 bg-moss" />
        <h2 className="font-display text-5xl font-light leading-[1.05] text-balance text-bone md:text-7xl lg:text-8xl">
          Cleaner bushland. <br />
          <em className="not-italic text-moss">Faster</em> response. <br />
          Smarter detection.
        </h2>
        <div className="mt-16 grid gap-8 text-sm text-muted-foreground sm:grid-cols-3">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-moss">Prepared by</div>
            <div className="mt-2 text-bone">Greenback Recovery PTY LTD</div>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-moss">Document</div>
            <div className="mt-2 text-bone">Council Briefing · v2.0</div>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-moss">Contact</div>
            <div className="mt-2 text-bone">proposals@greenback.au</div>
          </div>
        </div>
        <div className="mt-16 inline-flex items-center gap-3 border-t border-bone/10 pt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          <AlertTriangle className="h-3 w-3 text-moss" />
          Confidential · For council review only
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Page ---------- */

function Presentation() {
  return (
    <main className="relative">
      <ProgressRail />
      <Opening />
      <Problem />
      <Challenges />
      <MapSection />
      <Impact />
      <Solution />
      <Phases />
      <Evidence />
      <Dashboard />
      <Finance />
      <Compare />
      <Pilot />
      <Future />
      <Closing />
    </main>
  );
}
