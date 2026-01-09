"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import axios from 'axios';
import { Package, ChevronRight, Clock, MapPin, Search, User, Heart, LogOut, CheckCircle2, Truck, AlertCircle } from 'lucide-react';
import Link from 'next/link';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function OrdersPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem('uac_user');
        if (!savedUser) {
            router.push('/auth/login');
        } else {
            setUser(JSON.parse(savedUser));
            // In a real app, fetch orders from backend
            // fetchOrders();
        }
        setLoading(false);
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('uac_token');
        localStorage.removeItem('uac_user');
        router.push('/');
    };

    const getStatusInfo = (status: string) => {
        switch (status) {
            case 'PAID': return { icon: <CheckCircle2 className="text-success" />, label: 'Payée', bg: 'bg-success/10' };
            case 'SHIPPED': return { icon: <Truck className="text-primary" />, label: 'En cours de livraison', bg: 'bg-primary/10' };
            case 'PENDING': return { icon: <Clock className="text-warning" />, label: 'En attente', bg: 'bg-warning/10' };
            default: return { icon: <AlertCircle className="text-neutral/20" />, label: status, bg: 'bg-neutral/5' };
        }
    };

    if (!user) return null;

    return (
        <main className="bg-white min-h-screen">
            <Navbar />

            <div className="pt-32 pb-20 container mx-auto px-4 md:px-8">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar Navigation */}
                    <aside className="lg:w-1/4">
                        <div className="sticky top-32 bg-neutral/5 rounded-[2.5rem] p-10 border border-neutral/10">
                            <div className="flex flex-col items-center text-center mb-10">
                                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white text-4xl font-black mb-4 shadow-uac">
                                    {user.fullName?.[0] || 'U'}
                                </div>
                                <h2 className="text-xl font-black text-neutral uppercase tracking-tighter">{user.fullName || 'Client UAC'}</h2>
                            </div>

                            <nav className="flex flex-col gap-2">
                                <Link href="/account/profile" className="flex items-center justify-between p-4 hover:bg-white rounded-2xl transition-all font-black uppercase text-[10px] tracking-widest text-neutral/40 hover:text-primary">
                                    <div className="flex items-center gap-3">
                                        <User size={18} />
                                        Mon Profil
                                    </div>
                                    <ChevronRight size={14} />
                                </Link>
                                <Link href="/account/orders" className="flex items-center justify-between p-4 bg-white rounded-2xl border border-primary/20 text-primary font-black uppercase text-[10px] tracking-widest shadow-sm">
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

                    {/* Main Content: Orders List */}
                    <section className="lg:w-3/4">
                        <div className="flex justify-between items-center mb-10">
                            <h1 className="text-4xl font-black text-neutral uppercase tracking-tighter">Mes Commandes</h1>
                            <div className="relative hidden md:block">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral/20" size={16} />
                                <input type="text" placeholder="N° DE COMMANDE" className="input input-sm rounded-xl border-neutral/10 pl-10 h-10 w-48 text-[10px] font-black uppercase tracking-widest" />
                            </div>
                        </div>

                        {loading ? (
                            <div className="flex flex-col gap-6">
                                {[1, 2, 3].map(i => <div key={i} className="h-32 bg-neutral/5 rounded-3xl animate-pulse" />)}
                            </div>
                        ) : (
                            <div className="flex flex-col gap-6">
                                {/* Mock Order for demonstration */}
                                <div className="bg-white border border-neutral/10 rounded-[2.5rem] p-8 md:p-10 shadow-sm hover:border-primary/20 transition-all group overflow-hidden relative">
                                    <div className="absolute top-0 right-0 p-10 opacity-5 -rotate-12 pointer-events-none group-hover:opacity-10 transition-opacity">
                                        <Package size={120} />
                                    </div>

                                    <div className="flex flex-col md:flex-row justify-between gap-8 relative z-10">
                                        <div className="flex flex-col gap-4">
                                            <div className="flex items-center gap-3">
                                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral/40">Commande #72A9B4</span>
                                                <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2 ${getStatusInfo('PAID').bg}`}>
                                                    {getStatusInfo('PAID').icon}
                                                    {getStatusInfo('PAID').label}
                                                </span>
                                            </div>
                                            <h3 className="text-2xl font-black text-neutral uppercase tracking-tighter">UAC Home Solar Kit + 3 Accessoires</h3>
                                            <p className="text-xs font-bold opacity-30 uppercase tracking-widest flex items-center gap-2">
                                                <Clock size={14} /> 08 Janvier 2026 à 14:30
                                            </p>
                                        </div>

                                        <div className="flex flex-col md:items-end justify-between gap-4">
                                            <span className="text-3xl font-black text-primary tracking-tighter">$1,250.00</span>
                                            <button className="btn btn-outline btn-primary rounded-xl px-8 h-12 uppercase font-black text-[10px] tracking-[0.2em]">Détails & Facture</button>
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-8 border-t border-dashed border-neutral/10 grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="flex gap-4 items-center">
                                            <div className="w-10 h-10 bg-neutral/5 rounded-xl flex items-center justify-center text-primary">
                                                <MapPin size={18} />
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-black uppercase tracking-widest opacity-30">Destination</p>
                                                <p className="text-xs font-bold text-neutral">Kinshasa, Gombe</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 items-center md:border-l border-neutral/10 md:pl-6">
                                            <div className="w-10 h-10 bg-neutral/5 rounded-xl flex items-center justify-center text-primary">
                                                <Truck size={18} />
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-black uppercase tracking-widest opacity-30">Livraison</p>
                                                <p className="text-xs font-bold text-neutral underline decoration-dotted decoration-primary">Prévue Aujourd'hui</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* No orders fallback */}
                                <div className="hidden py-20 bg-neutral/5 rounded-[3rem] border border-dashed border-neutral/20 flex flex-col items-center justify-center text-center p-12">
                                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                                        <Package className="text-neutral/10" size={40} />
                                    </div>
                                    <h3 className="text-xl font-black text-neutral uppercase tracking-tighter mb-4">Aucune commande</h3>
                                    <p className="text-sm font-medium opacity-30 max-w-xs mx-auto mb-8">Votre historique est vide. Découvrez nos nouveaux arrivages informatique et mobilier.</p>
                                    <Link href="/catalog" className="btn btn-primary rounded-xl px-10 text-white uppercase font-black tracking-widest text-xs">Parcourir le catalogue</Link>
                                </div>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </main>
    );
}
