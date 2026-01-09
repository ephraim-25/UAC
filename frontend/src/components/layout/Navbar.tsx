"use client";

import React from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, User, Heart, Menu, Box, X } from 'lucide-react';

import { useCart } from '@/context/CartContext';

const Navbar = () => {
    const { cart, totalItems, totalPrice } = useCart();
    const [user, setUser] = React.useState<any>(null);

    React.useEffect(() => {
        const savedUser = localStorage.getItem('uac_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('uac_token');
        localStorage.removeItem('uac_user');
        window.location.reload();
    };

    return (
        <div className="navbar bg-white h-20 fixed top-0 z-[100] px-4 md:px-8 border-b border-primary/10 transition-all duration-300">
            {/* Start: Logo and Mobile Menu */}
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden mr-2">
                        <Menu size={24} className="text-primary" />
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-2xl bg-white border border-primary/10 rounded-box w-64 uppercase font-bold tracking-widest gap-2">
                        <li><Link href="/catalog?category=it" className="py-3">Informatique</Link></li>
                        <li><Link href="/catalog?category=furniture" className="py-3">Mobilier</Link></li>
                        <li><Link href="/catalog?category=appliances" className="py-3">Électroménager</Link></li>
                        <li><Link href="/catalog?category=solar" className="py-3">Solaire</Link></li>
                        <div className="divider my-0 opacity-10"></div>
                        <li><Link href="/services" className="py-3">Services UAC</Link></li>
                    </ul>
                </div>

                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-11 h-11 bg-primary flex items-center justify-center rounded-xl shadow-uac transition-transform group-hover:scale-105">
                        <Box className="text-white" size={24} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-black tracking-tighter text-primary">UAC<span className="text-neutral font-bold opacity-30">RDC</span></span>
                        <span className="text-[9px] font-black tracking-[0.25em] text-neutral/40 uppercase">E-Commerce Premium</span>
                    </div>
                </Link>
            </div>

            {/* Center: Desktop Navigation */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-1 uppercase font-black tracking-widest text-[12px] text-neutral/70">
                    <li><Link href="/catalog?category=it" className="hover:text-primary hover:bg-primary/5 rounded-full px-5">Informatique</Link></li>
                    <li><Link href="/catalog?category=furniture" className="hover:text-primary hover:bg-primary/5 rounded-full px-5">Mobilier</Link></li>
                    <li><Link href="/catalog?category=appliances" className="hover:text-primary hover:bg-primary/5 rounded-full px-5">Électroménager</Link></li>
                    <li><Link href="/catalog?category=solar" className="hover:text-primary hover:bg-primary/5 rounded-full px-5">Solaire</Link></li>
                </ul>
            </div>

            {/* End: Actions */}
            <div className="navbar-end gap-1 md:gap-3">
                <div className="hidden lg:flex items-center bg-neutral/5 rounded-full pl-4 pr-1 py-1 group focus-within:bg-white focus-within:ring-2 ring-primary/20 transition-all border border-transparent focus-within:border-primary/20">
                    <Search size={16} className="text-neutral/40" />
                    <input
                        type="text"
                        placeholder="Référence, marque..."
                        className="bg-transparent border-none outline-none text-[13px] px-3 w-32 xl:w-48 placeholder:text-neutral/30 font-medium"
                    />
                </div>

                <div className="flex items-center gap-1">
                    <button className="btn btn-ghost btn-circle btn-sm md:btn-md hover:bg-primary/10 hover:text-primary transition-colors">
                        <Heart size={20} />
                    </button>

                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle btn-sm md:btn-md hover:bg-primary/10 hover:text-primary transition-colors">
                            <div className="indicator">
                                <ShoppingCart size={20} />
                                {totalItems > 0 && (
                                    <span className="badge badge-xs badge-primary indicator-item p-1 font-bold">{totalItems}</span>
                                )}
                            </div>
                        </label>
                        <div tabIndex={0} className="mt-4 z-[1] card card-compact dropdown-content w-72 bg-white shadow-2xl border border-primary/5 rounded-2xl overflow-hidden">
                            <div className="card-body p-6">
                                <h3 className="font-black text-primary uppercase tracking-widest text-xs">Mon Panier ({totalItems})</h3>
                                {cart.length === 0 ? (
                                    <div className="py-8 text-center text-neutral/30 italic text-sm border-y border-neutral/5 my-2">
                                        Votre panier est vide.
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-4 py-4 border-y border-neutral/5 my-2 max-h-60 overflow-y-auto">
                                        {cart.map((item) => (
                                            <div key={item.id} className="flex gap-3 items-center">
                                                <div className="w-12 h-12 bg-neutral/5 rounded-lg p-1">
                                                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-contain" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[11px] font-bold text-neutral truncate uppercase">{item.name}</p>
                                                    <p className="text-[10px] text-neutral/40">{item.quantity} x ${item.price.toLocaleString()}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-[10px] font-black uppercase opacity-40">Total</span>
                                    <span className="text-lg font-black text-primary">${totalPrice.toLocaleString()}</span>
                                </div>
                                <div className="card-actions">
                                    <Link href="/checkout" className="btn btn-primary btn-block text-white rounded-xl">Commander</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-primary btn-circle btn-sm md:btn-md ml-1 shadow-lg hover:shadow-primary/20 transition-all border-none">
                            {user ? (
                                <span className="text-white font-black text-xs">{user.fullName?.[0]}</span>
                            ) : (
                                <User size={20} className="text-white" />
                            )}
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-4 z-[1] p-2 shadow-2xl bg-white border border-primary/10 rounded-2xl w-56 font-bold text-neutral/70">
                            <div className="px-4 py-3 border-b border-neutral/5 mb-2">
                                <p className="text-[10px] uppercase tracking-widest opacity-40 mb-1">
                                    {user ? `Connecté en tant que` : `Bienvenue chez UAC`}
                                </p>
                                <p className="text-sm font-black text-primary uppercase line-clamp-1">
                                    {user ? user.fullName : `Espace Client`}
                                </p>
                            </div>

                            {user ? (
                                <>
                                    <li><Link href="/account/profile" className="py-2 hover:text-primary">Profil & Paramètres</Link></li>
                                    <li><Link href="/account/orders" className="py-2 hover:text-primary">Mes Commandes</Link></li>
                                    <li><Link href="/account/wishlist" className="py-2 hover:text-primary">Liste de Souhaits</Link></li>
                                    <div className="divider my-0 opacity-5"></div>
                                    <li><button onClick={handleLogout} className="py-2 text-error hover:bg-error/5 w-full text-left">Déconnexion</button></li>
                                </>
                            ) : (
                                <>
                                    <li><Link href="/auth/login" className="py-2 text-primary">Se Connecter</Link></li>
                                    <li><Link href="/auth/register" className="py-2 hover:text-primary">Créer un Compte</Link></li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
