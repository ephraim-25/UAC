"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import { User, Mail, Phone, MapPin, Package, Heart, LogOut, ChevronRight, Edit3 } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('uac_user');
        if (!savedUser) {
            router.push('/auth/login');
        } else {
            setUser(JSON.parse(savedUser));
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('uac_token');
        localStorage.removeItem('uac_user');
        router.push('/');
    };

    if (!user) return null;

    return (
        <main className="bg-white min-h-screen">
            <Navbar />

            <div className="pt-32 pb-20 container mx-auto px-4 md:px-8">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar Navigation */}
                    <aside className="lg:w-1/4">
                        <div className="bg-neutral/5 rounded-[2.5rem] p-10 border border-neutral/10">
                            <div className="flex flex-col items-center text-center mb-10">
                                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white text-4xl font-black mb-4 shadow-uac">
                                    {user.fullName?.[0] || 'U'}
                                </div>
                                <h2 className="text-xl font-black text-neutral uppercase tracking-tighter">{user.fullName || 'Client UAC'}</h2>
                                <p className="text-[10px] font-bold opacity-30 uppercase tracking-widest">{user.role}</p>
                            </div>

                            <nav className="flex flex-col gap-2">
                                <Link href="/account/profile" className="flex items-center justify-between p-4 bg-white rounded-2xl border border-primary/20 text-primary font-black uppercase text-[10px] tracking-widest shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <User size={18} />
                                        Mon Profil
                                    </div>
                                    <ChevronRight size={14} />
                                </Link>
                                <Link href="/account/orders" className="flex items-center justify-between p-4 hover:bg-white rounded-2xl transition-all font-black uppercase text-[10px] tracking-widest text-neutral/40 hover:text-primary">
                                    <div className="flex items-center gap-3">
                                        <Package size={18} />
                                        Mes Commandes
                                    </div>
                                    <ChevronRight size={14} />
                                </Link>
                                <Link href="/account/wishlist" className="flex items-center justify-between p-4 hover:bg-white rounded-2xl transition-all font-black uppercase text-[10px] tracking-widest text-neutral/40 hover:text-primary">
                                    <div className="flex items-center gap-3">
                                        <Heart size={18} />
                                        Liste de Souhaits
                                    </div>
                                    <ChevronRight size={14} />
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-3 p-4 text-error font-black uppercase text-[10px] tracking-widest mt-10 hover:bg-error/5 rounded-2xl transition-all"
                                >
                                    <LogOut size={18} />
                                    Déconnexion
                                </button>
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content: Profile Details */}
                    <section className="lg:w-3/4">
                        <div className="flex justify-between items-center mb-10">
                            <h1 className="text-4xl font-black text-neutral uppercase tracking-tighter">Mon Profil</h1>
                            <button className="btn btn-ghost gap-2 text-primary font-black uppercase text-xs tracking-widest hover:bg-primary/5">
                                <Edit3 size={16} /> Modifier
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-8 bg-white border border-neutral/10 rounded-[2rem] shadow-sm hover:border-primary/20 transition-all group">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 bg-primary/5 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                        <User size={20} />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral/40">Nom Complet</span>
                                </div>
                                <p className="text-lg font-black text-neutral">{user.fullName || 'Non renseigné'}</p>
                            </div>

                            <div className="p-8 bg-white border border-neutral/10 rounded-[2rem] shadow-sm hover:border-primary/20 transition-all group">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 bg-primary/5 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                        <Mail size={20} />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral/40">Adresse Email</span>
                                </div>
                                <p className="text-lg font-black text-neutral">{user.email}</p>
                            </div>

                            <div className="p-8 bg-white border border-neutral/10 rounded-[2rem] shadow-sm hover:border-primary/20 transition-all group">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 bg-primary/5 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                        <Phone size={20} />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral/40">Téléphone</span>
                                </div>
                                <p className="text-lg font-black text-neutral">{user.phone || 'Non renseigné'}</p>
                            </div>

                            <div className="p-8 bg-white border border-neutral/10 rounded-[2rem] shadow-sm hover:border-primary/20 transition-all group">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 bg-primary/5 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                        <MapPin size={20} />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral/40">Adresse de Livraison</span>
                                </div>
                                <p className="text-lg font-black text-neutral">{user.address || 'Non renseignée'}</p>
                            </div>
                        </div>

                        <div className="mt-12 p-10 bg-primary/5 rounded-[2.5rem] border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div>
                                <h3 className="text-xl font-black text-neutral uppercase tracking-tighter mb-2">Besoin d'aide ?</h3>
                                <p className="text-sm font-medium opacity-50">Notre service client premium est à votre disposition 24h/24 par WhatsApp ou téléphone.</p>
                            </div>
                            <button className="btn btn-primary rounded-xl px-10 text-white shadow-uac h-14 uppercase font-black tracking-widest text-xs">Contacter UAC</button>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
