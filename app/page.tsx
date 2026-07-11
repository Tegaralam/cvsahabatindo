'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring, animate } from 'framer-motion'
import {
    ArrowRight, ArrowUpRight, Zap, Clock, TrendingDown, Gauge, Fuel,
    VolumeX, Leaf, Mail, Phone, MapPin, ChevronDown, Sparkles, ShieldCheck,
    Factory, Building2, Warehouse, Ship, Hotel, Radio
} from 'lucide-react'
import ChatWidget from '@/components/ChatWidget'

const HERO_IMG = '/images/hero.jpg'
const ABOUT_IMG = '/images/generator2.jpg'

/* ---------- ANIMATED COUNTER ---------- */
function Counter({ from = 0, to, suffix = '', prefix = '', decimals = 0, duration = 2.2 }: any) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })
    const [display, setDisplay] = useState(from)

    useEffect(() => {
        if (!inView) return
        const controls = animate(from, to, {
            duration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (v) => setDisplay(v),
        })
        return () => controls.stop()
    }, [inView, from, to, duration])

    const formatted = decimals > 0
        ? display.toFixed(decimals)
        : Math.round(display).toLocaleString('id-ID')
    return <span ref={ref}>{prefix}{formatted}{suffix}</span>
}

/* ---------- WORD REVEAL ---------- */
function WordReveal({ text, className = '', delay = 0 }: any) {
    const words = text.split(' ')
    return (
        <span className={className}>
            {words.map((w: any, i: any) => (
                <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.25em]">
                    <motion.span
                        initial={{ y: '110%' }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.9, delay: delay + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                        className="inline-block"
                    >
                        {w}
                    </motion.span>
                </span>
            ))}
        </span>
    )
}

/* ---------- NAV ---------- */
function Nav() {
    const [scrolled, setScrolled] = useState(false)
    useEffect(() => {
        const on = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', on); return () => window.removeEventListener('scroll', on)
    }, [])
    return (
        <motion.nav
            initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#0a0a0a]/70 backdrop-blur-2xl border-b border-white/5' : 'bg-transparent'}`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
                <a href="#" className="flex items-center gap-3 group">
                    <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-500/25">
                        <Zap className="w-5 h-5 text-black" strokeWidth={2.5} />
                        <div className="absolute inset-0 rounded-xl bg-emerald-400/40 blur-xl -z-10 group-hover:blur-2xl transition" />
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className="text-[10px] tracking-[0.28em] text-white/50 uppercase">CV. Sahabat Indo</span>
                        <span className="text-sm font-semibold tracking-wide">SUKSES</span>
                    </div>
                </a>
                <div className="hidden md:flex items-center gap-10 text-sm text-white/60">
                    {['Tentang', 'Keunggulan', 'Produk', 'Kontak'].map((it) => (
                        <a key={it} href={`#${it.toLowerCase()}`} className="relative hover:text-white transition group">
                            {it}
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-emerald-400 group-hover:w-full transition-all duration-500" />
                        </a>
                    ))}
                </div>
                <a href="#kontak" className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 hover:border-emerald-400/60 hover:bg-emerald-500/5 transition text-sm">
                    Request Proposal
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                </a>
            </div>
        </motion.nav>
    )
}

/* ---------- HERO ---------- */
function Hero() {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.18])
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

    return (
        <section ref={ref} className="relative min-h-screen w-full overflow-hidden">
            {/* Background image with parallax */}
            <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
                <Image src={HERO_IMG} alt="Industrial generator" fill priority className="object-cover" />
            </motion.div>

            {/* Overlays */}
            <div className="absolute inset-0 z-10 bg-black/75" />
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]" />
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0a0a0a]/95 via-[#0a0a0a]/40 to-transparent" />
            <div className="absolute inset-0 z-10 grid-pattern opacity-40 pointer-events-none" />
            <div className="absolute inset-0 z-10 noise-overlay opacity-[0.05] mix-blend-overlay pointer-events-none" />

            {/* Ambient glow */}
            <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] spot-emerald z-10 blur-3xl animate-glow-drift pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] spot-emerald z-10 blur-3xl opacity-60 pointer-events-none" />

            {/* Content */}
            <motion.div style={{ opacity }} className="relative z-20 min-h-screen flex items-center">
                <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-24 w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-400/20 bg-emerald-500/5 backdrop-blur-md mb-10"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-[11px] tracking-[0.28em] uppercase text-emerald-300 font-medium">Green Energy Engineering — Est. Indonesia</span>
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl lg:text-[8.5rem] font-bold tracking-[-0.03em] leading-[0.92] max-w-6xl">
                        <WordReveal text="Energi industri" delay={0.4} />
                        <br />
                        <span className="font-serif-display italic text-white/50 text-6xl md:text-7xl lg:text-[7.5rem] leading-[1]">
                            <WordReveal text="yang lebih cerdas." delay={0.55} />
                        </span>
                        <br />
                        <span className="text-gradient-emerald">
                            <WordReveal text="Hybrid Generator Booster." delay={0.75} />
                        </span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.1 }}
                        className="mt-10 max-w-2xl text-lg md:text-xl text-white/75 leading-relaxed font-light"
                    >
                        Solusi engineering inovasi energi hijau untuk industri Anda. Investasi <span className="text-emerald-400 font-medium">37% lebih murah</span> dari Solar Off-Grid, operasional stabil <span className="text-white">24 jam non-stop</span>, dengan ROI kurang dari 1 tahun.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.3 }}
                        className="mt-12 flex flex-wrap items-center gap-4"
                    >
                        <a href="#kontak" className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold transition shadow-2xl shadow-emerald-500/25 overflow-hidden">
                            <span className="relative z-10">Konsultasi Enterprise</span>
                            <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition" />
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-300 to-emerald-500 opacity-0 group-hover:opacity-100 transition" />
                        </a>
                        <a href="#keunggulan" className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/15 hover:border-white/30 hover:bg-white/5 transition text-white/90">
                            Lihat Keunggulan
                        </a>
                    </motion.div>

                    {/* Stats strip */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.5 }}
                        className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 max-w-5xl border-t border-white/10 pt-10"
                    >
                        {[
                            { k: <><Counter to={37} suffix="%" /></>, v: 'Lebih Murah' },
                            { k: '24 / 7', v: 'Non-Stop' },
                            { k: <><span className="text-white/60">≈</span> 5 Bln</>, v: 'Break Even' },
                            { k: <><Counter to={250} suffix=" kVA" /></>, v: 'Max Output' },
                        ].map((s, i) => (
                            <div key={i} className={`md:px-8 ${i > 0 ? 'md:border-l border-white/10' : ''}`}>
                                <div className="text-3xl md:text-4xl font-bold text-white tracking-tight">{s.k}</div>
                                <div className="text-[10px] md:text-xs text-white/50 uppercase tracking-[0.2em] mt-2">{s.v}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/40"
            >
                <span className="text-[10px] tracking-[0.35em] uppercase">Scroll</span>
                <ChevronDown className="w-4 h-4 animate-bounce" />
            </motion.div>
        </section>
    )
}

/* ---------- MARQUEE TICKER ---------- */
function MarqueeTicker() {
    const items = [
        'HYBRID GENERATOR BOOSTER',
        'ZERO EMISSION',
        'FULL SILENT OPERATION',
        '24/7 STABILITY',
        'GREEN ENERGY INNOVATION',
        '5% FUEL CONSUMPTION',
        'MADE IN INDONESIA',
        'B2B ENGINEERING',
    ]
    const list = [...items, ...items, ...items]
    return (
        <div className="relative py-8 border-y border-white/5 bg-[#0a0a0a] overflow-hidden">
            <div className="flex whitespace-nowrap animate-marquee">
                {list.map((it, i) => (
                    <div key={i} className="flex items-center shrink-0">
                        <span className="text-2xl md:text-3xl font-serif-display italic text-white/80 mx-8">{it}</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-400/70" />
                    </div>
                ))}
            </div>
            {/* Fade edges */}
            <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none" />
        </div>
    )
}

/* ---------- SECTION LABEL ---------- */
function SectionLabel({ number, text }: any) {
    return (
        <div className="flex items-center gap-4 mb-8">
            <span className="font-serif-display italic text-emerald-400 text-2xl">{number}</span>
            <div className="w-10 h-px bg-emerald-400/60"></div>
            <span className="text-[10px] tracking-[0.35em] uppercase text-white/50 font-medium">{text}</span>
        </div>
    )
}

/* ---------- ABOUT ---------- */
function About() {
    return (
        <section id="tentang" className="relative py-32 md:py-40 border-t border-white/5 overflow-hidden">
            <div className="absolute top-1/2 -translate-y-1/2 -right-64 w-[500px] h-[500px] spot-emerald blur-3xl opacity-40 pointer-events-none" />
            <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
                <div className="grid lg:grid-cols-12 gap-16 lg:gap-20 items-start">
                    <div className="lg:col-span-5">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                        >
                            <SectionLabel number="01" text="Tentang Kami" />
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.02] tracking-[-0.02em]">
                                Engineering<br />
                                <span className="font-serif-display italic text-white/70">yang berpihak pada</span><br />
                                <span className="text-gradient-emerald">masa depan bumi.</span>
                            </h2>
                        </motion.div>
                    </div>

                    <div className="lg:col-span-7 space-y-12">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}
                            className="text-xl md:text-2xl text-white/80 leading-[1.5] font-light"
                        >
                            <span className="text-white font-medium">CV. Sahabat Indo Sukses</span> adalah perusahaan engineering yang menghadirkan solusi inovasi energi hijau untuk sektor industri Indonesia. Kami merancang teknologi yang <span className="font-serif-display italic text-emerald-300">efisien, senyap, dan bebas emisi</span>—tanpa mengorbankan kestabilan operasional 24 jam.
                        </motion.p>

                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                {
                                    icon: Sparkles,
                                    title: 'Visi',
                                    desc: 'Menjadi mitra transformasi energi hijau terdepan di Indonesia yang membuktikan bahwa efisiensi biaya dan keberlanjutan lingkungan dapat berjalan berdampingan.'
                                },
                                {
                                    icon: ShieldCheck,
                                    title: 'Misi',
                                    desc: 'Menghadirkan produk engineering yang teruji, hemat, senyap, dan tanpa polusi—dengan komitmen ROI cepat serta dukungan teknis penuh untuk mitra industri kami.'
                                },
                            ].map((it, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 + i * 0.15 }}
                                    className="relative bg-[#141414] border border-white/10 rounded-2xl p-8 hover:border-emerald-400/30 transition-all duration-500 group overflow-hidden"
                                >
                                    <div className="absolute -top-24 -right-24 w-48 h-48 spot-emerald blur-2xl opacity-0 group-hover:opacity-100 transition duration-700" />
                                    <div className="relative">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/20 transition">
                                                <it.icon className="w-5 h-5 text-emerald-400" />
                                            </div>
                                            <div>
                                                <div className="text-[10px] tracking-[0.3em] uppercase text-white/40">Bab {String(i + 1).padStart(2, '0')}</div>
                                                <h3 className="text-lg font-semibold">{it.title}</h3>
                                            </div>
                                        </div>
                                        <p className="text-white/70 leading-relaxed text-[15px]">{it.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

/* ---------- KEUNGGULAN ---------- */
const STATS = [
    {
        icon: TrendingDown,
        numberEl: <><Counter to={37} suffix="%" /></>,
        unit: 'LEBIH MURAH',
        title: 'Biaya Investasi',
        desc: 'Investasi jauh lebih efisien dibanding sistem Solar Off-Grid konvensional dengan performa yang setara.',
    },
    {
        icon: Clock,
        numberEl: <><Counter to={24} /></>,
        unit: 'JAM NON-STOP',
        title: 'Operasional Stabil',
        desc: 'Menjamin kontinuitas produksi tanpa downtime, siang dan malam sepanjang tahun.',
    },
    {
        icon: Zap,
        numberEl: <>&lt;&nbsp;<Counter to={1} /></>,
        unit: 'TAHUN BEP',
        title: 'Break Even Point',
        desc: 'ROI rata-rata tercapai dalam ~5 bulan operasional—efisiensi finansial yang tak tertandingi.',
    },
    {
        icon: Gauge,
        numberEl: <>50–<Counter to={250} /></>,
        unit: 'kVA STABILIZER',
        title: 'Kapasitas Output',
        desc: 'Rentang Stabilizer Output Power fleksibel untuk berbagai skala kebutuhan industri.',
    },
    {
        icon: Fuel,
        numberEl: <><Counter to={5} suffix="%" /></>,
        unit: 'KONSUMSI BBM',
        title: 'Hemat Bahan Bakar',
        desc: 'Reduksi konsumsi bahan bakar drastis dibanding genset konvensional pada beban setara.',
    },
    {
        icon: VolumeX,
        numberEl: '0',
        unit: 'EMISI & KEBISINGAN',
        title: 'Full Silent, Tanpa Polusi',
        desc: 'Beroperasi dalam mode senyap penuh tanpa polusi emisi buang—ramah lingkungan & pekerja.',
    },
]

function Keunggulan() {
    return (
        <section id="keunggulan" className="relative py-32 md:py-40 border-t border-white/5 overflow-hidden">
            <div className="absolute inset-0 grid-pattern-fine opacity-40 pointer-events-none" />
            <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
                <div className="max-w-3xl mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                    >
                        <SectionLabel number="02" text="Keunggulan Produk" />
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] leading-[0.98]">
                            Angka yang<br />
                            <span className="font-serif-display italic text-white/70">berbicara</span> lantang.
                        </h2>
                        <p className="mt-8 text-lg text-white/70 leading-relaxed font-light max-w-xl">
                            Setiap unit <span className="text-white">Hybrid Generator Booster</span> dirancang untuk memberi keuntungan operasional dan finansial yang terukur bagi industri Anda.
                        </p>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {STATS.map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                            className="group relative bg-[#141414] border border-white/10 rounded-2xl p-8 hover:border-emerald-400/40 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
                        >
                            <div className="absolute -top-24 -right-24 w-56 h-56 spot-emerald blur-3xl opacity-0 group-hover:opacity-100 transition duration-700" />
                            <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

                            <div className="relative">
                                <div className="flex items-start justify-between mb-10">
                                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/20 group-hover:border-emerald-400/50 transition">
                                        <s.icon className="w-5 h-5 text-emerald-400" />
                                    </div>
                                    <span className="font-serif-display italic text-white/25 text-3xl leading-none">0{i + 1}</span>
                                </div>

                                <div className="mb-6">
                                    <div className="text-6xl md:text-7xl font-bold tracking-[-0.04em] text-white leading-[0.9]">
                                        {s.numberEl}
                                    </div>
                                    <div className="mt-3 text-[11px] tracking-[0.25em] uppercase text-emerald-400 font-semibold">
                                        {s.unit}
                                    </div>
                                </div>

                                <div className="h-px w-full bg-white/5 mb-6" />

                                <h3 className="text-lg font-semibold mb-3 text-white">{s.title}</h3>
                                <p className="text-sm text-white/60 leading-relaxed">{s.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

/* ---------- SEGMENTS SERVED ---------- */
function Segments() {
    const items = [
        { icon: Factory, label: 'Manufaktur' },
        { icon: Building2, label: 'Perkantoran' },
        { icon: Warehouse, label: 'Pergudangan' },
        { icon: Ship, label: 'Maritim' },
        { icon: Hotel, label: 'Hospitality' },
        { icon: Radio, label: 'Telekomunikasi' },
    ]
    return (
        <section className="relative py-24 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
                    <div>
                        <SectionLabel number="03" text="Sektor Yang Dilayani" />
                        <h3 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
                            Solusi untuk beragam <span className="font-serif-display italic text-emerald-300">skala industri.</span>
                        </h3>
                    </div>
                    <p className="text-white/60 max-w-md font-light">
                        Hybrid Generator Booster kami adaptif untuk berbagai vertikal industri dengan kebutuhan daya yang berbeda.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {items.map((it, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.06 }}
                            className="group aspect-square bg-[#141414] border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:border-emerald-400/40 hover:bg-[#171717] transition"
                        >
                            <it.icon className="w-8 h-8 text-white/50 group-hover:text-emerald-400 transition" strokeWidth={1.5} />
                            <span className="text-xs text-white/60 group-hover:text-white transition tracking-wide">{it.label}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

/* ---------- PRODUCT SPOTLIGHT ---------- */
function ProductSpotlight() {
    return (
        <section id="produk" className="relative py-32 md:py-40 border-t border-white/5 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] spot-emerald blur-3xl opacity-40 pointer-events-none" />
            <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}
                        className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 group"
                    >
                        <motion.div
                            initial={{ scale: 1.1 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }}
                            className="absolute inset-0 w-full h-full"
                        >
                            <Image
                                src={ABOUT_IMG}
                                alt="Hybrid Generator Booster"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover"
                            />
                        </motion.div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950/20 via-transparent to-transparent" />

                        {/* Corner label */}
                        <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-[10px] tracking-[0.25em] uppercase text-white/80">Flagship</span>
                        </div>

                        <div className="absolute bottom-8 left-8 right-8">
                            <div className="text-xs tracking-[0.3em] uppercase text-emerald-400 mb-3">Produk Utama</div>
                            <div className="text-3xl font-bold tracking-tight">Hybrid Generator</div>
                            <div className="text-3xl font-serif-display italic text-white/70">Booster</div>
                            <div className="text-sm text-white/60 mt-3 flex items-center gap-2">
                                <span className="w-6 h-px bg-white/30" />
                                Series 50 – 250 kVA
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.15 }}
                    >
                        <SectionLabel number="04" text="Produk Unggulan" />
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.02] tracking-[-0.02em] mb-10">
                            Satu unit.<br />
                            <span className="font-serif-display italic text-emerald-300">Enam keunggulan</span><br />
                            mutlak.
                        </h2>
                        <ul className="space-y-2">
                            {[
                                'Investasi 37% lebih murah dari Solar Off-Grid',
                                'Beroperasi stabil 24 jam non-stop',
                                'Break Even Point kurang dari 1 tahun (~5 bulan)',
                                'Kapasitas output 50 kVA hingga 250 kVA',
                                'Konsumsi bahan bakar hanya 5% dari genset konvensional',
                                'Full silent — tanpa polusi emisi buang',
                            ].map((f, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08 }}
                                    className="flex items-start gap-5 py-4 border-b border-white/5 group"
                                >
                                    <span className="font-serif-display italic text-emerald-400/60 text-lg w-6 shrink-0 mt-1">0{i + 1}</span>
                                    <div className="mt-1.5 w-5 h-5 rounded-full border border-emerald-400/50 bg-emerald-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/30 transition">
                                        <Leaf className="w-3 h-3 text-emerald-400" />
                                    </div>
                                    <span className="text-white/80 leading-relaxed group-hover:text-white transition">{f}</span>
                                </motion.li>
                            ))}
                        </ul>

                        <a href="#kontak" className="mt-12 group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black hover:bg-emerald-400 transition font-semibold">
                            Diskusikan Kebutuhan Anda
                            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

/* ---------- FOOTER / CTA ---------- */
function Footer() {
    return (
        <footer id="kontak" className="relative border-t border-white/5 pt-32 pb-12 overflow-hidden">
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[900px] h-[500px] spot-emerald blur-3xl opacity-50 pointer-events-none" />
            <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
                <div className="grid lg:grid-cols-12 gap-16 mb-24">
                    <div className="lg:col-span-7">
                        <SectionLabel number="05" text="Mari Berkolaborasi" />
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] leading-[1.02]"
                        >
                            Mari bicarakan<br />
                            <span className="font-serif-display italic text-white/70">masa depan energi</span><br />
                            <span className="text-gradient-emerald">industri Anda.</span>
                        </motion.h2>
                        <p className="mt-8 text-white/60 max-w-lg text-lg font-light leading-relaxed">
                            Tim engineering kami siap merancang solusi Hybrid Generator Booster sesuai spesifikasi kebutuhan operasional bisnis Anda.
                        </p>
                    </div>

                    <div className="lg:col-span-5 grid gap-4">
                        <a href="mailto:cvsahabatindo@gmail.com" className="group bg-[#141414] border border-white/10 rounded-2xl p-8 hover:border-emerald-400/40 transition flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <Mail className="w-4 h-4 text-emerald-400" />
                                    <div className="text-[10px] tracking-[0.28em] uppercase text-white/40">Email</div>
                                </div>
                                <div className="text-white font-medium group-hover:text-emerald-300 transition">cvsahabatindo@gmail.com</div>
                            </div>
                            <ArrowUpRight className="w-5 h-5 text-white/30 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                        </a>
                        <a href="tel:+6282231051532" className="group bg-[#141414] border border-white/10 rounded-2xl p-8 hover:border-emerald-400/40 transition flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <Phone className="w-4 h-4 text-emerald-400" />
                                    <div className="text-[10px] tracking-[0.28em] uppercase text-white/40">Telepon</div>
                                </div>
                                <div className="text-white font-medium group-hover:text-emerald-300 transition">+62 822-3105-1532</div>
                            </div>
                            <ArrowUpRight className="w-5 h-5 text-white/30 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                        </a>
                        <div className="bg-[#141414] border border-white/10 rounded-2xl p-8">
                            <div className="flex items-center gap-3 mb-3">
                                <MapPin className="w-4 h-4 text-emerald-400" />
                                <div className="text-[10px] tracking-[0.28em] uppercase text-white/40">Lokasi</div>
                            </div>
                            <div className="text-white font-medium">Sidoarjo, Jawa Timur — Indonesia</div>
                        </div>
                    </div>
                </div>

                {/* Giant brand mark */}
                <div className="pt-16 border-t border-white/5 mb-10">
                    <div className="font-serif-display italic text-white/[0.04] text-[16vw] leading-none tracking-tight text-center select-none pointer-events-none">
                        Sahabat Indo
                    </div>
                </div>

                <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                            <Zap className="w-4 h-4 text-black" strokeWidth={2.5} />
                        </div>
                        <div className="text-sm">
                            <span className="text-white font-medium">CV. Sahabat Indo Sukses</span>
                            <span className="text-white/40 ml-2">© {new Date().getFullYear()}</span>
                        </div>
                    </div>
                    <div className="text-xs text-white/40 tracking-wider">
                        Engineering Green Energy Innovation — <span className="font-serif-display italic">Made in Indonesia</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

/* ---------- FLOATING CTA ---------- */
function FloatingCTA() {
    return (
        <motion.a
            href="https://wa.me/6282231051532"
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.05 }}
            className="fixed bottom-6 right-6 z-50 group flex items-center gap-3 px-5 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold shadow-2xl shadow-emerald-500/30"
        >
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black/40"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
            </span>
            <span className="text-sm">Konsultasi Cepat</span>
        </motion.a>
    )
}

/* ---------- MAIN ---------- */
const App = () => {
    return (
        <main className="relative bg-[#0a0a0a] text-[#f5f5f5] overflow-x-hidden">
            <Nav />
            <Hero />
            <MarqueeTicker />
            <About />
            <Keunggulan />
            <Segments />
            <ProductSpotlight />
            <Footer />
            <FloatingCTA />
            <ChatWidget />
        </main>
    )
}

export default App
