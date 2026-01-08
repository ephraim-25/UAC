"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import { getProductBySlug, Product } from '@/lib/api';
import { ShoppingCart, Heart, Share2, ShieldCheck, Truck, RefreshCw, ChevronLeft, Star } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function ProductDetailPage() {
    const { slug } = useParams();
    const router = useRouter();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const data = await getProductBySlug(slug as string);
                setProduct(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching product:', err);
                setError('Produit introuvable ou erreur de chargement.');
            } finally {
                setLoading(false);
            }
        };

        if (slug) fetchProduct();
    }, [slug]);

    if (loading) {
        return (
            <div className="bg-white min-h-screen">
                <Navbar />
                <div className="pt-32 container mx-auto px-4 md:px-8 flex flex-col lg:flex-row gap-16 animate-pulse">
                    <div className="lg:w-1/2 aspect-square bg-neutral/5 rounded-[3rem]" />
                    <div className="lg:w-1/2 flex flex-col gap-6">
                        <div className="h-4 bg-neutral/5 w-24 rounded" />
                        <div className="h-12 bg-neutral/5 w-3/4 rounded" />
                        <div className="h-6 bg-neutral/5 w-1/4 rounded" />
                        <div className="h-32 bg-neutral/5 w-full rounded" />
                    </div>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="bg-white min-h-screen">
                <Navbar />
                <div className="pt-40 container mx-auto px-4 md:px-8 text-center">
                    <h1 className="text-3xl font-black text-neutral mb-4">{error || "Produit non trouvé"}</h1>
                    <button onClick={() => router.push('/catalog')} className="btn btn-primary rounded-xl px-8 text-white">
                        Retour au catalogue
                    </button>
                </div>
            </div>
        );
    }

    return (
        <main className="bg-white min-h-screen">
            <Navbar />

            <div className="pt-24 pb-20 container mx-auto px-4 md:px-8">
                {/* Navigation back */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral/40 mb-10 hover:text-primary transition-colors"
                >
                    <ChevronLeft size={16} /> Retour
                </button>

                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Image Gallery */}
                    <div className="lg:w-1/2 flex flex-col gap-6">
                        <div className="aspect-square bg-neutral/5 rounded-[3rem] overflow-hidden border border-neutral/5 flex items-center justify-center p-12">
                            <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-full h-full object-contain drop-shadow-2xl"
                            />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {product.images.map((img, i) => (
                                <div key={i} className="aspect-square bg-neutral/5 rounded-2xl border-2 border-primary/10 overflow-hidden cursor-pointer hover:border-primary transition-all">
                                    <img src={img} alt={`${product.name} view ${i}`} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="lg:w-1/2 flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <span className="badge badge-primary text-white font-black px-4 py-3 text-[10px] uppercase tracking-widest">
                                {product.category.name}
                            </span>
                            <div className="flex gap-2">
                                <button className="btn btn-ghost btn-circle btn-sm text-neutral/30 hover:text-primary"><Heart size={20} /></button>
                                <button className="btn btn-ghost btn-circle btn-sm text-neutral/30 hover:text-primary"><Share2 size={20} /></button>
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-black text-neutral tracking-tighter leading-tight mb-4">
                            {product.name}
                        </h1>

                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex text-warning">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                            </div>
                            <span className="text-xs font-bold opacity-30 uppercase tracking-widest">(12 avis certifiés)</span>
                        </div>

                        <p className="text-lg text-neutral/60 leading-relaxed font-medium mb-10">
                            {product.description}
                        </p>

                        <div className="bg-neutral/5 rounded-3xl p-8 mb-10">
                            <div className="flex items-baseline gap-4 mb-2">
                                <span className="text-4xl font-black text-primary tracking-tighter">${product.price.toLocaleString()}</span>
                                <span className="text-sm font-bold opacity-30 line-through">${(product.price * 1.2).toFixed(2)}</span>
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral/40 mb-6">TVA de 16% incluse dans le prix affiché</p>

                            <div className="flex flex-col sm:flex-row gap-4 items-center">
                                <div className="flex items-center bg-white rounded-2xl border border-neutral/10 p-1 w-full sm:w-auto">
                                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="btn btn-ghost btn-sm px-4">-</button>
                                    <span className="px-6 font-black text-lg">{quantity}</span>
                                    <button onClick={() => setQuantity(q => q + 1)} className="btn btn-ghost btn-sm px-4">+</button>
                                </div>
                                <button
                                    onClick={() => addToCart(product, quantity)}
                                    disabled={product.stockQuantity === 0}
                                    className="btn btn-primary btn-lg flex-1 rounded-2xl text-white shadow-uac border-none hover:bg-secondary"
                                >
                                    <ShoppingCart size={24} />
                                    Ajouter au Panier
                                </button>
                            </div>
                        </div>

                        {/* Support / Trust Features */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12 border-b border-neutral/5 mb-12">
                            {[
                                { icon: <ShieldCheck className="text-primary" />, title: 'Certification Officielle', sub: 'Import Direct Producteur' },
                                { icon: <Truck className="text-primary" />, title: 'Livraison Express', sub: 'Partout en RDC' },
                                { icon: <RefreshCw className="text-primary" />, title: 'SAV Garanti', sub: 'Atelier UAC certifié' },
                                { icon: <Award className="text-primary" />, title: 'Heritage 1974', sub: 'Experts en équipements' }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 items-start">
                                    <div className="p-3 bg-primary/5 rounded-xl">{item.icon}</div>
                                    <div>
                                        <h4 className="text-xs font-black uppercase tracking-tight text-neutral">{item.title}</h4>
                                        <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest mt-0.5">{item.sub}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Specs / Attributes */}
                        <div>
                            <h3 className="text-lg font-black text-neutral uppercase tracking-tighter mb-6">Spécifications Techniques</h3>
                            <div className="flex flex-col gap-1">
                                {product.attributes && Object.entries(product.attributes).map(([key, value]) => (
                                    <div key={key} className="flex justify-between py-4 border-b border-neutral/5 group hover:bg-neutral/5 px-2 transition-colors">
                                        <span className="text-xs font-bold uppercase tracking-widest text-neutral/40">{key}</span>
                                        <span className="text-xs font-black text-neutral uppercase tracking-tight">{String(value)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded mt-auto">
                <aside>
                    <p className="font-bold text-xs opacity-50 uppercase tracking-widest">© 2026 - UAC RDC Platform - Propulsé par DBH</p>
                </aside>
            </footer>
        </main>
    );
}

import { Award } from 'lucide-react';
