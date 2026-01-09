"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import axios from 'axios';
import { Mail, Lock, User, UserPlus, ShieldCheck, ArrowRight, Phone, MapPin } from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        fullName: '',
        phone: '',
        address: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { data } = await axios.post(`${API_BASE_URL}/auth/register`, formData);
            localStorage.setItem('uac_token', data.access_token);
            localStorage.setItem('uac_user', JSON.stringify(data.user));

            router.push('/account/profile');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Erreur lors de la création du compte');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="bg-white min-h-screen">
            <Navbar />

            <div className="flex min-h-screen pt-20">
                {/* Left Side: Login Redirect Area */}
                <div className="hidden lg:flex w-1/3 bg-neutral relative overflow-hidden items-center justify-center p-20">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/20 to-transparent opacity-50" />
                    <div className="relative z-10 text-white text-center">
                        <h2 className="text-4xl font-black tracking-tighter mb-6 leading-tight uppercase">Déjà membre ?</h2>
                        <p className="text-sm font-medium opacity-50 mb-10 leading-relaxed uppercase tracking-widest">
                            Connectez-vous pour retrouver vos commandes et avantages.
                        </p>
                        <Link href="/auth/login" className="btn btn-outline btn-white rounded-2xl px-10 border-white/20 text-white hover:bg-white hover:text-neutral">
                            Se Connecter
                        </Link>
                    </div>
                </div>

                {/* Right Side: Register Form */}
                <div className="w-full lg:w-2/3 flex items-center justify-center p-8 md:p-20 overflow-y-auto">
                    <div className="w-full max-w-2xl">
                        <div className="mb-12">
                            <h2 className="text-4xl font-black text-neutral tracking-tighter uppercase mb-2">Créer un Compte</h2>
                            <p className="text-[10px] font-black opacity-30 uppercase tracking-[0.2em] text-primary">Prenez part à l'excellence UAC RDC</p>
                        </div>

                        {error && (
                            <div className="bg-error/10 text-error p-4 rounded-xl text-xs font-black uppercase tracking-tight mb-8 animate-in fade-in slide-in-from-top-2">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            <div className="form-control md:col-span-2">
                                <label className="label text-[10px] font-black uppercase opacity-40">Nom Complet</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-primary opacity-40" size={18} />
                                    <input
                                        type="text" name="fullName" required value={formData.fullName} onChange={handleInputChange}
                                        className="input input-bordered w-full rounded-2xl pl-12 border-neutral/10 focus:border-primary font-medium"
                                        placeholder="Jean Dupont"
                                    />
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label text-[10px] font-black uppercase opacity-40">Adresse Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary opacity-40" size={18} />
                                    <input
                                        type="email" name="email" required value={formData.email} onChange={handleInputChange}
                                        className="input input-bordered w-full rounded-2xl pl-12 border-neutral/10 focus:border-primary font-medium"
                                        placeholder="nom@exemple.com"
                                    />
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label text-[10px] font-black uppercase opacity-40">Mot de Passe</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary opacity-40" size={18} />
                                    <input
                                        type="password" name="password" required value={formData.password} onChange={handleInputChange}
                                        className="input input-bordered w-full rounded-2xl pl-12 border-neutral/10 focus:border-primary font-medium"
                                    />
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label text-[10px] font-black uppercase opacity-40">Téléphone (WhatsApp)</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-primary opacity-40" size={18} />
                                    <input
                                        type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                                        className="input input-bordered w-full rounded-2xl pl-12 border-neutral/10 focus:border-primary font-medium"
                                        placeholder="+243 ..."
                                    />
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label text-[10px] font-black uppercase opacity-40">Ville / Adresse</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-primary opacity-40" size={18} />
                                    <input
                                        type="text" name="address" value={formData.address} onChange={handleInputChange}
                                        className="input input-bordered w-full rounded-2xl pl-12 border-neutral/10 focus:border-primary font-medium"
                                        placeholder="Kinshasa, Gombe"
                                    />
                                </div>
                            </div>

                            <div className="md:col-span-2 pt-6">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn btn-primary btn-lg w-full rounded-2xl text-white shadow-uac border-none hover:bg-secondary gap-3"
                                >
                                    {loading ? <span className="loading loading-spinner"></span> : (
                                        <>
                                            <UserPlus size={20} />
                                            Créer mon compte UAC
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>

                        <div className="mt-12 flex items-center gap-6 p-6 bg-primary/5 rounded-[2rem] border border-primary/10">
                            <ShieldCheck size={32} className="text-primary shrink-0" />
                            <div>
                                <h4 className="text-xs font-black uppercase tracking-tight text-neutral">Engagement de Confidentialité</h4>
                                <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest leading-relaxed mt-1">
                                    UAC RDC s'engage à ne jamais partager vos informations personnelles. Vos données sont sécurisées selon la loi congolaise et les standards internationaux.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
