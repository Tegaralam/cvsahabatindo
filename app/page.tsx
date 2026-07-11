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
import { useLanguage } from '@/components/LanguageProvider'
import dynamic from 'next/dynamic'

const PDFModal = dynamic(() => import('@/components/PDFModal'), { ssr: false })

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
                <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.25em] pb-[0.2em] -mb-[0.2em]">
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
function Nav({ onOpenPDF }: { onOpenPDF: () => void }) {
    const [scrolled, setScrolled] = useState(false)
    const { t, language, setLanguage } = useLanguage()
    useEffect(() => {
        const on = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', on); return () => window.removeEventListener('scroll', on)
    }, [])

    const navLinks = [
        { key: 'about', label: t.nav.about, href: '#tentang' },
        { key: 'features', label: t.nav.features, href: '#keunggulan' },
        { key: 'product', label: t.nav.product, href: '#produk' },
        { key: 'contact', label: t.nav.contact, href: '#kontak' }
    ]

    return (
        <motion.nav
            initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'bg-slate-50/70 backdrop-blur-2xl border-b border-slate-900/5' : 'bg-transparent'}`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
                <a href="#" className="flex items-center gap-3 group">
                    <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-500/25">
                        <Zap className="w-5 h-5 text-black" strokeWidth={2.5} />
                        <div className="absolute inset-0 rounded-xl bg-emerald-400/40 blur-xl -z-10 group-hover:blur-2xl transition" />
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className="text-[10px] tracking-[0.28em] text-slate-900/50 uppercase">CV. Sahabat Indo</span>
                        <span className="text-sm font-semibold tracking-wide">SUKSES</span>
                    </div>
                </a>
                <div className="hidden md:flex items-center gap-10 text-sm text-slate-900/60">
                    {navLinks.map((it) => (
                        <a key={it.key} href={it.href} className="relative hover:text-slate-900 transition group">
                            {it.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-emerald-400 group-hover:w-full transition-all duration-500" />
                        </a>
                    ))}
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setLanguage(language === 'id' ? 'en' : 'id')}
                        className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-slate-900/5 hover:bg-slate-900/10 text-slate-900/70 hover:text-slate-900 transition text-xs font-semibold tracking-wider"
                    >
                        {language === 'id' ? 'EN' : 'ID'}
                    </button>
                    <button onClick={onOpenPDF} className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-900/15 hover:border-emerald-600/60 hover:bg-emerald-600/5 transition text-sm">
                        {t.nav.proposal}
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                    </button>
                </div>
            </div>
        </motion.nav>
    )
}

/* ---------- HERO ---------- */
function Hero() {
    const { t } = useLanguage()
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
            <div className="absolute inset-0 z-10 bg-slate-50/60" />
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-slate-50/40 via-transparent to-slate-50" />
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-slate-50/80 via-slate-50/30 to-transparent" />
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
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-600/20 bg-emerald-600/5 backdrop-blur-md mb-10"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                        </span>
                        <span className="text-[11px] tracking-[0.28em] uppercase text-emerald-300 font-medium">Green Energy Engineering — Est. Indonesia</span>
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl lg:text-[8.5rem] font-bold tracking-[-0.03em] leading-[0.92] max-w-6xl">
                        <WordReveal text={t.hero.title1} delay={0.4} />
                        <br />
                        <span className="font-serif-display italic text-slate-900/70 text-6xl md:text-7xl lg:text-[7.5rem] leading-[1]">
                            <WordReveal text={t.hero.title2} delay={0.55} />
                        </span>
                        <br />
                        <span className="text-gradient-emerald">
                            <WordReveal text={t.hero.title3} delay={0.75} />
                        </span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.1 }}
                        className="mt-10 max-w-2xl text-lg md:text-xl text-slate-900/75 leading-relaxed font-light"
                    >
                        {t.hero.desc}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.3 }}
                        className="mt-12 flex flex-wrap items-center gap-4"
                    >
                        <a href="#kontak" className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-400 text-white font-semibold transition shadow-2xl shadow-emerald-500/25 overflow-hidden">
                            <span className="relative z-10">{t.hero.btn1}</span>
                            <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition" />
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-300 to-emerald-500 opacity-0 group-hover:opacity-100 transition" />
                        </a>
                        <a href="#keunggulan" className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-slate-900/15 hover:border-slate-900/30 hover:bg-slate-900/5 transition text-slate-900/90">
                            {t.hero.btn2}
                        </a>
                    </motion.div>

                    {/* Stats strip */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.5 }}
                        className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 max-w-5xl border-t border-slate-900/10 pt-10"
                    >
                        {[
                            { k: <><Counter to={37} suffix="%" /></>, v: t.hero.stats.cheaper },
                            { k: '24 / 7', v: t.hero.stats.nonstop },
                            { k: <><span className="text-slate-900/60">≈</span> 5 Bln</>, v: t.hero.stats.roi },
                            { k: <><Counter to={250} suffix=" kVA" /></>, v: t.hero.stats.output },
                        ].map((s, i) => (
                            <div key={i} className={`md:px-8 ${i > 0 ? 'md:border-l border-slate-900/10' : ''}`}>
                                <div className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">{s.k}</div>
                                <div className="text-[10px] md:text-xs text-slate-900/50 uppercase tracking-[0.2em] mt-2">{s.v}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-slate-900/40"
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
        <div className="relative py-8 border-y border-slate-900/5 bg-slate-50 overflow-hidden">
            <div className="flex whitespace-nowrap animate-marquee">
                {list.map((it, i) => (
                    <div key={i} className="flex items-center shrink-0">
                        <span className="text-2xl md:text-3xl font-serif-display italic text-slate-900/80 mx-8">{it}</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-400/70" />
                    </div>
                ))}
            </div>
            {/* Fade edges */}
            <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none" />
        </div>
    )
}

/* ---------- SECTION LABEL ---------- */
function SectionLabel({ number, text }: any) {
    return (
        <div className="flex items-center gap-4 mb-8">
            <span className="font-serif-display italic text-emerald-600 text-2xl">{number}</span>
            <div className="w-10 h-px bg-emerald-400/60"></div>
            <span className="text-[10px] tracking-[0.35em] uppercase text-slate-900/50 font-medium">{text}</span>
        </div>
    )
}

/* ---------- ABOUT ---------- */
function About() {
    const { t } = useLanguage()
    return (
        <section id="tentang" className="relative py-32 md:py-40 border-t border-slate-900/5 overflow-hidden">
            <div className="absolute top-1/2 -translate-y-1/2 -right-64 w-[500px] h-[500px] spot-emerald blur-3xl opacity-40 pointer-events-none" />
            <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
                <div className="grid lg:grid-cols-12 gap-16 lg:gap-20 items-start">
                    <div className="lg:col-span-5">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                        >
                            <SectionLabel number="01" text={t.about.label} />
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.02] tracking-[-0.02em]">
                                {t.about.title1}<br />
                                <span className="font-serif-display italic text-slate-900/70">{t.about.title2}</span><br />
                                <span className="text-gradient-emerald">{t.about.title3}</span>
                            </h2>
                        </motion.div>
                    </div>

                    <div className="lg:col-span-7 space-y-12">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}
                            className="text-xl md:text-2xl text-slate-900/80 leading-[1.5] font-light"
                        >
                            <span className="text-slate-900 font-medium">{t.about.desc1}</span>{t.about.desc2}<span className="font-serif-display italic text-emerald-300">{t.about.desc3}</span>{t.about.desc4}
                        </motion.p>

                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                {
                                    icon: Sparkles,
                                    title: t.about.vision,
                                    desc: t.about.visionDesc
                                },
                                {
                                    icon: ShieldCheck,
                                    title: t.about.mission,
                                    desc: t.about.missionDesc
                                },
                            ].map((it, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 + i * 0.15 }}
                                    className="relative bg-white border border-slate-900/10 rounded-2xl p-8 hover:border-emerald-600/30 transition-all duration-500 group overflow-hidden"
                                >
                                    <div className="absolute -top-24 -right-24 w-48 h-48 spot-emerald blur-2xl opacity-0 group-hover:opacity-100 transition duration-700" />
                                    <div className="relative">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-11 h-11 rounded-xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-600/20 transition">
                                                <it.icon className="w-5 h-5 text-emerald-600" />
                                            </div>
                                            <div>
                                                <div className="text-[10px] tracking-[0.3em] uppercase text-slate-900/40">{t.about.chapter} {String(i + 1).padStart(2, '0')}</div>
                                                <h3 className="text-lg font-semibold">{it.title}</h3>
                                            </div>
                                        </div>
                                        <p className="text-slate-900/70 leading-relaxed text-[15px]">{it.desc}</p>
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
function Keunggulan() {
    const { t } = useLanguage()

    const STATS = [
        {
            icon: TrendingDown,
            numberEl: <><Counter to={37} suffix="%" /></>,
            unit: t.features.items[0].unit,
            title: t.features.items[0].title,
            desc: t.features.items[0].desc,
        },
        {
            icon: Clock,
            numberEl: <><Counter to={24} /></>,
            unit: t.features.items[1].unit,
            title: t.features.items[1].title,
            desc: t.features.items[1].desc,
        },
        {
            icon: Zap,
            numberEl: <>&lt;&nbsp;<Counter to={1} /></>,
            unit: t.features.items[2].unit,
            title: t.features.items[2].title,
            desc: t.features.items[2].desc,
        },
        {
            icon: Gauge,
            numberEl: <>50–<Counter to={250} /></>,
            unit: t.features.items[3].unit,
            title: t.features.items[3].title,
            desc: t.features.items[3].desc,
        },
        {
            icon: Fuel,
            numberEl: <><Counter to={5} suffix="%" /></>,
            unit: t.features.items[4].unit,
            title: t.features.items[4].title,
            desc: t.features.items[4].desc,
        },
        {
            icon: VolumeX,
            numberEl: '0',
            unit: t.features.items[5].unit,
            title: t.features.items[5].title,
            desc: t.features.items[5].desc,
        },
    ]

    return (
        <section id="keunggulan" className="relative py-32 md:py-40 border-t border-slate-900/5 overflow-hidden">
            <div className="absolute inset-0 grid-pattern-fine opacity-40 pointer-events-none" />
            <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
                <div className="max-w-3xl mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                    >
                        <SectionLabel number="02" text={t.features.label} />
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] leading-[0.98]">
                            {t.features.title1}<br />
                            <span className="font-serif-display italic text-slate-900/70">{t.features.title2}</span>{t.features.title3}
                        </h2>
                        <p className="mt-8 text-lg text-slate-900/70 leading-relaxed font-light max-w-xl">
                            {t.features.desc}
                        </p>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {STATS.map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                            className="group relative bg-white border border-slate-900/10 rounded-2xl p-8 hover:border-emerald-600/40 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
                        >
                            <div className="absolute -top-24 -right-24 w-56 h-56 spot-emerald blur-3xl opacity-0 group-hover:opacity-100 transition duration-700" />
                            <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

                            <div className="relative">
                                <div className="flex items-start justify-between mb-10">
                                    <div className="w-12 h-12 rounded-xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-600/20 group-hover:border-emerald-600/50 transition">
                                        <s.icon className="w-5 h-5 text-emerald-600" />
                                    </div>
                                    <span className="font-serif-display italic text-slate-900/25 text-3xl leading-none">0{i + 1}</span>
                                </div>

                                <div className="mb-6">
                                    <div className="text-6xl md:text-7xl font-bold tracking-[-0.04em] text-slate-900 leading-[0.9]">
                                        {s.numberEl}
                                    </div>
                                    <div className="mt-3 text-[11px] tracking-[0.25em] uppercase text-emerald-600 font-semibold">
                                        {s.unit}
                                    </div>
                                </div>

                                <div className="h-px w-full bg-slate-900/5 mb-6" />

                                <h3 className="text-lg font-semibold mb-3 text-slate-900">{s.title}</h3>
                                <p className="text-sm text-slate-900/60 leading-relaxed">{s.desc}</p>
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
    const { t } = useLanguage()
    const icons = [Factory, Building2, Warehouse, Ship, Hotel, Radio]
    const items = t.segments.items.map((label, i) => ({ icon: icons[i], label }))

    return (
        <section className="relative py-24 border-t border-slate-900/5">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
                    <div>
                        <SectionLabel number="03" text={t.segments.label} />
                        <h3 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
                            {t.segments.title1} <span className="font-serif-display italic text-emerald-300">{t.segments.title2}</span>
                        </h3>
                    </div>
                    <p className="text-slate-900/60 max-w-md font-light">
                        {t.segments.desc}
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {items.map((it, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.06 }}
                            className="group aspect-square bg-white border border-slate-900/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:border-emerald-600/40 hover:bg-slate-100 transition"
                        >
                            <it.icon className="w-8 h-8 text-slate-900/50 group-hover:text-emerald-600 transition" strokeWidth={1.5} />
                            <span className="text-xs text-slate-900/60 group-hover:text-slate-900 transition tracking-wide">{it.label}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

/* ---------- PRODUCT SPOTLIGHT ---------- */
function ProductSpotlight() {
    const { t } = useLanguage()
    return (
        <section id="produk" className="relative py-32 md:py-40 border-t border-slate-900/5 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] spot-emerald blur-3xl opacity-40 pointer-events-none" />
            <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}
                        className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-slate-900/10 group"
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
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/40 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950/20 via-transparent to-transparent" />

                        {/* Corner label */}
                        <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-900/10">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-[10px] tracking-[0.25em] uppercase text-slate-900/80">Flagship</span>
                        </div>

                        <div className="absolute bottom-8 left-8 right-8">
                            <div className="text-xs tracking-[0.3em] uppercase text-emerald-600 mb-3">{t.product.main}</div>
                            <div className="text-3xl font-bold tracking-tight">Hybrid Generator</div>
                            <div className="text-3xl font-serif-display italic text-slate-900/70">Booster</div>
                            <div className="text-sm text-slate-900/60 mt-3 flex items-center gap-2">
                                <span className="w-6 h-px bg-slate-900/30" />
                                Series 50 – 250 kVA
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.15 }}
                    >
                        <SectionLabel number="04" text={t.product.label} />
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.02] tracking-[-0.02em] mb-10">
                            {t.product.title1}<br />
                            <span className="font-serif-display italic text-emerald-300">{t.product.title2}</span><br />
                            {t.product.title3}
                        </h2>
                        <ul className="space-y-2">
                            {t.product.list.map((f, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08 }}
                                    className="flex items-start gap-5 py-4 border-b border-slate-900/5 group"
                                >
                                    <span className="font-serif-display italic text-emerald-600/60 text-lg w-6 shrink-0 mt-1">0{i + 1}</span>
                                    <div className="mt-1.5 w-5 h-5 rounded-full border border-emerald-600/50 bg-emerald-600/10 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-600/30 transition">
                                        <Leaf className="w-3 h-3 text-emerald-600" />
                                    </div>
                                    <span className="text-slate-900/80 leading-relaxed group-hover:text-slate-900 transition">{f}</span>
                                </motion.li>
                            ))}
                        </ul>

                        <a href="#kontak" className="mt-12 group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black hover:bg-emerald-400 transition font-semibold">
                            {t.product.btn}
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
    const { t } = useLanguage()
    return (
        <footer id="kontak" className="relative border-t border-slate-900/5 pt-32 pb-12 overflow-hidden">
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[900px] h-[500px] spot-emerald blur-3xl opacity-50 pointer-events-none" />
            <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
                <div className="grid lg:grid-cols-12 gap-16 mb-24">
                    <div className="lg:col-span-7">
                        <SectionLabel number="05" text={t.footer.label} />
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] leading-[1.02]"
                        >
                            {t.footer.title1}<br />
                            <span className="font-serif-display italic text-slate-900/70">{t.footer.title2}</span><br />
                            <span className="text-gradient-emerald">{t.footer.title3}</span>
                        </motion.h2>
                        <p className="mt-8 text-slate-900/60 max-w-lg text-lg font-light leading-relaxed">
                            {t.footer.desc}
                        </p>
                    </div>

                    <div className="lg:col-span-5 grid gap-4">
                        <a href="mailto:cvsahabatindo@gmail.com" className="group bg-white border border-slate-900/10 rounded-2xl p-8 hover:border-emerald-600/40 transition flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <Mail className="w-4 h-4 text-emerald-600" />
                                    <div className="text-[10px] tracking-[0.28em] uppercase text-slate-900/40">{t.footer.email}</div>
                                </div>
                                <div className="text-slate-900 font-medium group-hover:text-emerald-300 transition">cvsahabatindo@gmail.com</div>
                            </div>
                            <ArrowUpRight className="w-5 h-5 text-slate-900/30 group-hover:text-emerald-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                        </a>
                        <a href="https://wa.me/6282244410345" className="group bg-white border border-slate-900/10 rounded-2xl p-8 hover:border-emerald-600/40 transition flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <Phone className="w-4 h-4 text-emerald-600" />
                                    <div className="text-[10px] tracking-[0.28em] uppercase text-slate-900/40">{t.footer.phone}</div>
                                </div>
                                <div className="text-slate-900 font-medium group-hover:text-emerald-300 transition">+6282231051532</div>
                            </div>
                            <ArrowUpRight className="w-5 h-5 text-slate-900/30 group-hover:text-emerald-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                        </a>
                        <div className="bg-white border border-slate-900/10 rounded-2xl p-8">
                            <div className="flex items-center gap-3 mb-3">
                                <MapPin className="w-4 h-4 text-emerald-600" />
                                <div className="text-[10px] tracking-[0.28em] uppercase text-slate-900/40">{t.footer.location}</div>
                            </div>
                            <div className="text-slate-900 font-medium">{t.footer.locationText}</div>
                        </div>
                    </div>
                </div>

                {/* Giant brand mark */}
                <div className="pt-16 border-t border-slate-900/5 mb-10">
                    <div className="font-serif-display italic text-slate-900/[0.04] text-[16vw] leading-none tracking-tight text-center select-none pointer-events-none">
                        Sahabat Indo
                    </div>
                </div>

                <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                            <Zap className="w-4 h-4 text-black" strokeWidth={2.5} />
                        </div>
                        <div className="text-sm">
                            <span className="text-slate-900 font-medium">CV. Sahabat Indo Sukses</span>
                            <span className="text-slate-900/40 ml-2">© {new Date().getFullYear()}</span>
                        </div>
                    </div>
                    <div className="text-xs text-slate-900/40 tracking-wider">
                        Engineering Green Energy Innovation — <span className="font-serif-display italic">Made in Indonesia</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

/* ---------- FLOATING CTA ---------- */
function FloatingCTA() {
    const { t } = useLanguage()
    return (
        <motion.a
            href="https://wa.me/6282244410345"
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.05 }}
            className="fixed bottom-6 right-6 z-50 group flex items-center gap-3 px-5 py-4 rounded-full bg-emerald-600 hover:bg-emerald-400 text-white font-semibold shadow-2xl shadow-emerald-500/30"
        >
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black/40"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
            </span>
            <span className="text-sm">{t.chat.fastConsult}</span>
        </motion.a>
    )
}

/* ---------- MAIN ---------- */
const App = () => {
    const [isPDFOpen, setIsPDFOpen] = useState(false)
    const { language } = useLanguage()

    return (
        <main className="relative bg-slate-50 text-slate-900 overflow-x-hidden">
            <Nav onOpenPDF={() => setIsPDFOpen(true)} />
            <Hero />
            <MarqueeTicker />
            <About />
            <Keunggulan />
            <Segments />
            <ProductSpotlight />
            <Footer />
            <FloatingCTA />
            <ChatWidget />
            <PDFModal
                isOpen={isPDFOpen}
                onClose={() => setIsPDFOpen(false)}
                pdfUrl={language === 'en' ? '/api/pdf?file=HG50B (USA)' : '/api/pdf?file=HG50B'}
                title="Hybrid Generator Booster Proposal"
            />
        </main>
    )
}

export default App
