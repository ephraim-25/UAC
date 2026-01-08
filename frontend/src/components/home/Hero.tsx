"use client";

import React from 'react';
import { ArrowRight, CheckCircle2, ShoppingBag, ShieldCheck, Truck, Clock } from 'lucide-react';
import Link from 'next/link';

const Hero = () => {
    return (
        <section className="relative min-h-[90vh] flex items-center pt-20 bg-white overflow-hidden">
            {/* Subtle Corporate Grid Layer */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#005696 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            {/* Decorative Blue Gradient Accent */}
            <div className="absolute -top-24 -right-24 w-[40%] h-[120%] bg-primary/[0.03] -skew-x-12 transform origin-top-right hidden lg:block border-l border-primary/5" />

            <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                <div className="flex flex-col gap-8">
                    <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/10 rounded-full px-5 py-2 w-fit">
                        <ShieldCheck size={16} className="text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Distributeur Officiel Samsung & HP</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black text-neutral leading-[1.05] tracking-tighter">
                        L'excellence <br />
                        <span className="text-primary">UAC RDC</span> <br />
                        chez vous.
                    </h1>

                    <p className="text-lg md:text-xl text-neutral/60 max-w-lg leading-relaxed font-semibold">
                        Équipez votre espace avec le meilleur de la technologie, du mobilier et des solutions solaires. La référence qualité au Congo depuis 1974.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="/catalog" className="btn btn-primary btn-lg rounded-2xl px-10 text-white shadow-uac border-none hover:bg-secondary transition-all group">
                            Acheter Maintenant
                            <ShoppingBag size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link href="/services" className="btn btn-outline btn-primary btn-lg rounded-2xl px-10 border-2">
                            Découvrir nos Services
                            <ArrowRight size={20} />
                        </Link>
                    </div>

                    <div className="flex flex-wrap items-center gap-8 mt-4">
                        {[
                            { icon: <Truck size={18} />, text: 'Livraison Partout' },
                            { icon: <Clock size={18} />, text: 'SAV Garanti' },
                            { icon: <ShieldCheck size={18} />, text: 'Originalité 100%' }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-2 text-neutral/40">
                                <div className="text-primary/60">{item.icon}</div>
                                <span className="text-xs font-black uppercase tracking-widest">{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative group lg:ml-auto">
                    {/* Main Visual Frame */}
                    <div className="relative z-10 p-5 bg-white rounded-[40px] shadow-[0_50px_100px_-20px_rgba(0,86,150,0.15)] border border-primary/5 overflow-hidden transition-transform duration-700 hover:scale-[1.02]">
                        <img
                            src="https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1000&auto=format&fit=crop"
                            alt="UAC Premium Tech"
                            className="rounded-[30px] w-full h-auto object-cover aspect-[1.1/1]"
                        />

                        {/* Product Floating Tag */}
                        <div className="absolute top-10 right-10 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-primary/5 flex flex-col gap-1 items-center">
                            <span className="text-[10px] font-black text-primary uppercase">Nouveauté</span>
                            <span className="text-lg font-black text-neutral">$1,499</span>
                        </div>

                        {/* Bottom Brand Bar */}
                        <div className="absolute bottom-10 left-10 p-4 bg-primary/95 backdrop-blur-md rounded-2xl shadow-xl text-white flex items-center gap-4">
                            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center font-black">U</div>
                            <div>
                                <p className="text-xs font-black uppercase tracking-widest">UAC Heritage</p>
                                <p className="text-[10px] opacity-70">Depuis 1974</p>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Back Elements */}
                    <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -z-10" />
                    <div className="absolute -bottom-20 -left-20 w-80 h-80 border-[40px] border-primary/[0.02] rounded-[100px] -z-10 rotate-12" />
                </div>
            </div>
        </section>
    );
};

export default Hero;
