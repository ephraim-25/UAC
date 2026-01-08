"use client";

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import axios from 'axios';
import { CreditCard, Smartphone, CheckCircle2, ChevronRight, Truck, ShieldCheck, MapPin } from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function CheckoutPage() {
    const { cart, totalPrice, clearCart } = useCart();
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        paymentProvider: '',
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [orderId, setOrderId] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (cart.length === 0) return;

        try {
            setLoading(true);
            // 1. Create Order
            const { data: order } = await axios.post(`${API_BASE_URL}/orders`, {
                customerName: formData.name,
                customerEmail: formData.email,
                customerPhone: formData.phone,
                paymentMethod: formData.paymentProvider,
                items: cart.map(item => ({
                    productId: item.id,
                    quantity: item.quantity,
                    price: item.price,
                })),
            });

            setOrderId(order.id);

            // 2. Initiate Payment if provider selected
            if (formData.paymentProvider) {
                const { data: payment } = await axios.post(`${API_BASE_URL}/payments/initiate/${order.id}`, {
                    provider: formData.paymentProvider,
                });

                // In a real app, redirect to checkoutUrl or show instructions
                console.log('Payment initiated:', payment);
            }

            setSuccess(true);
            clearCart();
        } catch (err) {
            console.error('Checkout error:', err);
            alert('Une erreur est survenue lors de la commande.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <main className="bg-white min-h-screen">
                <Navbar />
                <div className="pt-40 container mx-auto px-4 text-center">
                    <div className="w-24 h-24 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 size={48} />
                    </div>
                    <h1 className="text-4xl font-black text-neutral mb-4 uppercase tracking-tighter">Commande Réussie !</h1>
                    <p className="text-neutral/50 mb-8 max-w-md mx-auto font-medium">
                        Merci {formData.name}, votre commande <span className="text-primary font-bold">#{orderId.slice(0, 8)}</span> a été enregistrée avec succès.
                        Un conseiller UAC vous contactera sous peu.
                    </p>
                    <button onClick={() => router.push('/catalog')} className="btn btn-primary rounded-xl px-8 text-white">
                        Retour au catalogue
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="bg-white min-h-screen">
            <Navbar />

            <div className="pt-24 pb-20 container mx-auto px-4 md:px-8">
                <h1 className="text-4xl font-black text-neutral mb-12 uppercase tracking-tighter">Finalisez votre Commande</h1>

                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Form Area */}
                    <div className="lg:w-2/3">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                            {/* Delivery Info */}
                            <section>
                                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-primary mb-8 flex items-center gap-2">
                                    <MapPin size={18} /> 1. Informations de Livraison
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="form-control">
                                        <label className="label text-[10px] font-black uppercase opacity-40">Nom Complet</label>
                                        <input
                                            type="text" name="name" required value={formData.name} onChange={handleInputChange}
                                            className="input input-bordered rounded-xl border-neutral/10 focus:border-primary"
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label text-[10px] font-black uppercase opacity-40">Email</label>
                                        <input
                                            type="email" name="email" value={formData.email} onChange={handleInputChange}
                                            className="input input-bordered rounded-xl border-neutral/10 focus:border-primary"
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label text-[10px] font-black uppercase opacity-40">Téléphone (WhatsApp)</label>
                                        <input
                                            type="tel" name="phone" required value={formData.phone} onChange={handleInputChange}
                                            className="input input-bordered rounded-xl border-neutral/10 focus:border-primary"
                                            placeholder="+243 ..."
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label text-[10px] font-black uppercase opacity-40">Ville / Quartier</label>
                                        <input
                                            type="text" name="address" required value={formData.address} onChange={handleInputChange}
                                            className="input input-bordered rounded-xl border-neutral/10 focus:border-primary"
                                            placeholder="Kinshasa, Gombe..."
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Payment Method */}
                            <section>
                                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-primary mb-8 flex items-center gap-2">
                                    <Smartphone size={18} /> 2. Mode de Paiement
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {[
                                        { id: 'MPESA', name: 'M-Pesa', icon: <Smartphone />, color: 'text-error' },
                                        { id: 'ORANGE_MONEY', name: 'Orange Money', icon: <Smartphone />, color: 'text-warning' },
                                        { id: 'STRIPE', name: 'Carte Bancaire', icon: <CreditCard />, color: 'text-primary' },
                                    ].map((method) => (
                                        <label
                                            key={method.id}
                                            className={`cursor-pointer border-2 p-6 rounded-2xl flex flex-col items-center gap-4 transition-all ${formData.paymentProvider === method.id ? 'border-primary bg-primary/5 shadow-uac' : 'border-neutral/10 hover:border-primary/40'}`}
                                        >
                                            <input
                                                type="radio" name="paymentProvider" value={method.id}
                                                className="hidden" onChange={handleInputChange}
                                                checked={formData.paymentProvider === method.id}
                                            />
                                            <div className={`${method.color} scale-125`}>{method.icon}</div>
                                            <span className="font-black text-xs uppercase tracking-widest">{method.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </section>

                            <button
                                type="submit" disabled={loading || cart.length === 0}
                                className="btn btn-primary btn-lg rounded-2xl text-white shadow-uac border-none mt-4 h-16"
                            >
                                {loading ? <span className="loading loading-spinner"></span> : "Confirmer la Commande"}
                            </button>
                        </form>

                        <div className="mt-12 p-6 bg-neutral/5 rounded-2xl border border-neutral/10 flex items-start gap-4">
                            <ShieldCheck size={24} className="text-primary mt-1" />
                            <div>
                                <h4 className="text-xs font-black uppercase tracking-tight text-neutral">Transactions Sécurisées</h4>
                                <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest leading-relaxed mt-1">
                                    Vos données sont chiffrées en AES-256. UAC RDC ne stocke aucun identifiant bancaire.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Summary */}
                    <div className="lg:w-1/3">
                        <div className="sticky top-28 bg-neutral/5 rounded-[2.5rem] p-10 border border-neutral/10">
                            <h3 className="text-xl font-black text-neutral mb-8 uppercase tracking-tighter">Récapitulatif</h3>

                            <div className="flex flex-col gap-6 mb-8 max-h-72 overflow-y-auto pr-2 custom-scrollbar">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-4 items-center">
                                        <div className="w-16 h-16 bg-white rounded-xl border border-neutral/10 p-2 shrink-0">
                                            <img src={item.images[0]} alt={item.name} className="w-full h-full object-contain" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-xs font-black text-neutral truncate">{item.name}</h4>
                                            <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">Qté: {item.quantity}</p>
                                        </div>
                                        <span className="text-sm font-black text-primary">${(item.price * item.quantity).toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col gap-4 border-t border-neutral/10 pt-8">
                                <div className="flex justify-between text-xs font-bold opacity-40 uppercase tracking-widest">
                                    <span>Sous-total</span>
                                    <span>${totalPrice.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-xs font-bold opacity-40 uppercase tracking-widest">
                                    <span>Livraison</span>
                                    <span className="text-success underline decoration-dotted underline-offset-4">Gratuite</span>
                                </div>
                                <div className="flex justify-between items-center mt-4">
                                    <span className="text-sm font-black uppercase tracking-widest">Total</span>
                                    <span className="text-3xl font-black text-primary tracking-tighter">${totalPrice.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="mt-10 p-4 bg-white/50 rounded-2xl flex items-center gap-3">
                                <Truck size={18} className="text-primary" />
                                <span className="text-[10px] font-black uppercase tracking-tight text-neutral/60">Livraison estimée sous 24h-48h</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
