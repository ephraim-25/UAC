"use client";

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Eye, Heart } from 'lucide-react';
import { Product } from '@/lib/api';

interface ProductCardProps {
    product: Product;
}

import { useCart } from '@/context/CartContext';

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <div className="card bg-white border border-neutral/5 hover:border-primary/20 transition-all duration-300 hover:shadow-xl group">
            <figure className="relative pt-6 px-6">
                <Link href={`/catalog/${product.slug}`} className="block w-full aspect-square bg-neutral/5 rounded-2xl overflow-hidden relative">
                    <img
                        src={product.images[0] || 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=1000&auto=format&fit=crop'}
                        alt={product.name}
                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.stockQuantity === 0 && (
                        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
                            <span className="badge badge-error text-white font-bold p-3">Rupture de Stock</span>
                        </div>
                    )}
                </Link>

                {/* Quick Actions */}
                <div className="absolute top-8 right-8 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                    <button className="btn btn-circle btn-sm bg-white border-primary/10 text-primary hover:bg-primary hover:text-white shadow-lg">
                        <Heart size={16} />
                    </button>
                    <button className="btn btn-circle btn-sm bg-white border-primary/10 text-primary hover:bg-primary hover:text-white shadow-lg">
                        <Eye size={16} />
                    </button>
                </div>
            </figure>

            <div className="card-body p-6">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/40">
                        {product.category.name}
                    </span>
                    {product.stockQuantity > 0 && product.stockQuantity <= 5 && (
                        <span className="text-[9px] font-bold text-error uppercase animate-pulse">Plus que {product.stockQuantity}</span>
                    )}
                </div>

                <Link href={`/catalog/${product.slug}`}>
                    <h3 className="card-title text-neutral text-base line-clamp-2 hover:text-primary transition-colors mb-4 leading-snug">
                        {product.name}
                    </h3>
                </Link>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral/5">
                    <div className="flex flex-col">
                        <span className="text-xl font-black text-primary tracking-tighter">${product.price.toLocaleString()}</span>
                        <span className="text-[10px] opacity-40 font-bold uppercase tracking-widest">TVA Incluse</span>
                    </div>
                    <button
                        onClick={() => addToCart(product)}
                        disabled={product.stockQuantity === 0}
                        className={`btn btn-primary btn-sm rounded-xl px-4 text-white shadow-sm border-none ${product.stockQuantity === 0 ? 'btn-disabled' : ''}`}
                    >
                        <ShoppingCart size={16} />
                        <span className="hidden sm:inline">Ajouter</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
