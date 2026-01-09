"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import axios from 'axios';
import { Mail, Lock, LogIn, ShieldCheck, ArrowRight } from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ email: '', password: '' });
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
            const { data } = await axios.post(`${API_BASE_URL}/auth/login`, formData);
            // Save token (shoud use cookie in real app)
            localStorage.setItem('uac_token', data.access_token);
            localStorage.setItem('uac_user', JSON.stringify(data.user));

            router.push('/account/profile');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Identifiants invalides');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="bg-white min-h-screen">
            <Navbar />

            <div className="flex min-h-screen pt-20">
                {/* Left Side: Illustration & Branding */}
                <div className="hidden lg:flex w-1/2 bg-primary relative overflow-hidden items-center justify-center p-20">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent opacity-50" />
                    <div className="relative z-10 text-white max-w-lg">
                        <h1 className="text-7xl font-black tracking-tighter mb-8 leading-none uppercase">Bienvenue chez <br />UAC RDC.</h1>
                        <p className="text-xl font-medium opacity-70 mb-12 leading-relaxed">
                            Rejoignez la plateforme e-commerce premium leader en Afrique Centrale depuis 1974.
                        </p>
                        <div className="flex gap-10">
                            <div className="flex flex-col gap-2">
                                <span className="text-4xl font-black">50+</span>
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-50">Années d'Excellence</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-4xl font-black">24h</span>
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-50">Support Dédié</span>
                            </div>
                        </div>
                    </div>
                    {/* Decorative Elements */}
                    <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
                </div>

                {/* Right Side: Login Form */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-20">
                    <div className="w-full max-w-md">
                        <div className="mb-12">
                            <h2 className="text-4xl font-black text-neutral tracking-tighter uppercase mb-4">Connexion</h2>
                            <p className="text-sm font-bold opacity-30 uppercase tracking-widest">Accédez à votre espace premium UAC</p>
                        </div>

                        {error && (
                            <div className="bg-error/10 text-error p-4 rounded-xl text-xs font-black uppercase tracking-tight mb-8 animate-in fade-in slide-in-from-top-2">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <div className="form-control">
                                <label className="label text-[10px] font-black uppercase opacity-40">Adresse Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary opacity-40" size={18} />
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="input input-bordered w-full rounded-2xl pl-12 border-neutral/10 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                                        placeholder="nom@exemple.com"
                                    />
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label text-[10px] font-black uppercase opacity-40">Mot de Passe</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary opacity-40" size={18} />
                                    <input
                                        type="password"
                                        name="password"
                                        required
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="input input-bordered w-full rounded-2xl pl-12 border-neutral/10 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                                    />
                                </div>
                                <label className="label self-end">
                                    <Link href="#" className="label-text-alt text-[10px] font-black uppercase text-primary hover:underline">Mot de passe oublié ?</Link>
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn btn-primary btn-lg rounded-2xl text-white shadow-uac border-none hover:bg-secondary mt-4 gap-3"
                            >
                                {loading ? <span className="loading loading-spinner"></span> : (
                                    <>
                                        <LogIn size={20} />
                                        Se Connecter
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-12 text-center">
                            <p className="text-xs font-bold opacity-40 uppercase tracking-widest mb-4">Vous n'avez pas encore de compte ?</p>
                            <Link href="/auth/register" className="group text-sm font-black text-primary uppercase tracking-tight flex items-center justify-center gap-2 hover:gap-4 transition-all">
                                Créer un compte premium
                                <ArrowRight size={18} />
                            </Link>
                        </div>

                        <div className="mt-20 flex items-center gap-4 p-4 bg-neutral/5 rounded-2xl border border-neutral/10">
                            <ShieldCheck size={24} className="text-primary shrink-0" />
                            <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest leading-relaxed">
                                Votre session est sécurisée par un chiffrement AES-256 bits conforme aux standards bancaires.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
