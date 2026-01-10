"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import ProductCard from '@/components/catalog/ProductCard';
import { getProducts, getCategories, Product, Category } from '@/lib/api';
import { Filter, SlidersHorizontal, ChevronRight, LayoutGrid, List } from 'lucide-react';
import Link from 'next/link';

/**
 * CatalogContent - Composant interne qui utilise useSearchParams()
 * Wrappé dans Suspense pour respecter les exigences Next.js 15 SSR
 */
function CatalogContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const currentCategory = searchParams.get('category');
    const currentSearch = searchParams.get('search');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [productsData, categoriesData] = await Promise.all([
                    getProducts({
                        category: currentCategory || undefined,
                        search: currentSearch || undefined,
                    }),
                    getCategories(),
                ]);
                setProducts(productsData);
                setCategories(categoriesData);
                setError(null);
            } catch (err) {
                console.error('Error fetching catalog data:', err);
                setError('Impossible de charger le catalogue. Veuillez réessayer plus tard.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currentCategory, currentSearch]);

    const handleCategoryClick = (slug: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (currentCategory === slug) {
            params.delete('category');
        } else {
            params.set('category', slug);
        }
        router.push(`/catalog?${params.toString()}`);
    };

    return (
        <main className="bg-white min-h-screen">
            <Navbar />

            <div className="pt-24 pb-12 container mx-auto px-4 md:px-8">
                {/* Breadcrumbs */}
                <div className="text-xs uppercase font-black tracking-widest text-neutral/30 flex items-center gap-2 mb-8">
                    <Link href="/">Accueil</Link>
                    <ChevronRight size={12} />
                    <span className="text-primary">Catalogue</span>
                    {currentCategory && (
                        <>
                            <ChevronRight size={12} />
                            <span className="text-primary">{currentCategory}</span>
                        </>
                    )}
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar Filters */}
                    <aside className="lg:w-72 shrink-0">
                        <div className="sticky top-28 flex flex-col gap-10">
                            <div>
                                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-neutral mb-6 flex items-center gap-2">
                                    <Filter size={16} className="text-primary" />
                                    Catégories
                                </h3>
                                <div className="flex flex-col gap-2">
                                    <button
                                        onClick={() => router.push('/catalog')}
                                        className={`btn btn-sm justify-between rounded-xl px-4 border-none ${!currentCategory ? 'btn-primary text-white shadow-uac' : 'bg-neutral/5 text-neutral/70 hover:bg-primary/10 hover:text-primary'}`}
                                    >
                                        Toutes les catégories
                                    </button>
                                    {categories.map((cat) => (
                                        <button
                                            key={cat.id}
                                            onClick={() => handleCategoryClick(cat.slug)}
                                            className={`btn btn-sm justify-between rounded-xl px-4 border-none shadow-none ${currentCategory === cat.slug ? 'btn-primary text-white shadow-uac' : 'bg-neutral/5 text-neutral/70 hover:bg-primary/10 hover:text-primary'}`}
                                        >
                                            {cat.name}
                                            <span className="opacity-40 text-[10px]">&gt;</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-neutral mb-6 flex items-center gap-2">
                                    <SlidersHorizontal size={16} className="text-primary" />
                                    Prix
                                </h3>
                                <input type="range" min="0" max="10000" className="range range-primary range-xs" />
                                <div className="flex justify-between mt-2 text-[10px] font-bold opacity-40 uppercase">
                                    <span>$0</span>
                                    <span>$10,000+</span>
                                </div>
                            </div>

                            {/* Promotional Spot */}
                            <div className="bg-primary rounded-[2rem] p-8 text-white relative overflow-hidden mt-4 group cursor-pointer">
                                <div className="relative z-10">
                                    <p className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-70">UAC Spécial</p>
                                    <h4 className="text-xl font-black tracking-tight mb-4">Besoin d'un devis Pro ?</h4>
                                    <p className="text-xs opacity-80 leading-relaxed mb-6">Pour vos équipements de bureau et solutions d'énergie.</p>
                                    <button className="text-xs font-black uppercase tracking-widest border-b-2 border-white pb-1 group-hover:pl-2 transition-all">Consulter l'expert</button>
                                </div>
                                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid Area */}
                    <div className="flex-1">
                        {/* Toolbar */}
                        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6 border-b border-neutral/5 pb-8">
                            <div>
                                <h1 className="text-3xl font-black text-neutral tracking-tighter">
                                    {currentCategory ? (categories.find(c => c.slug === currentCategory)?.name) : "Tout le Catalogue"}
                                </h1>
                                <p className="text-xs font-bold opacity-30 uppercase tracking-widest mt-1">
                                    {loading ? "Chargement..." : `${products.length} produits trouvés`}
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                <select className="select select-sm select-bordered rounded-xl font-bold text-xs uppercase tracking-widest bg-neutral/5 border-none focus:ring-primary/20">
                                    <option>Plus récents</option>
                                    <option>Prix croissant</option>
                                    <option>Prix décroissant</option>
                                    <option>Popularité</option>
                                </select>
                                <div className="join bg-neutral/5 p-1 rounded-xl">
                                    <button className="btn btn-sm join-item bg-white border-none shadow-sm"><LayoutGrid size={16} /></button>
                                    <button className="btn btn-sm join-item bg-transparent border-none text-neutral/40 hover:text-primary"><List size={16} /></button>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                    <div key={i} className="flex flex-col gap-4 animate-pulse">
                                        <div className="bg-neutral/5 aspect-square rounded-[2rem]" />
                                        <div className="h-4 bg-neutral/5 rounded w-1/3" />
                                        <div className="h-6 bg-neutral/5 rounded w-3/4" />
                                        <div className="h-10 bg-neutral/5 rounded w-full mt-4" />
                                    </div>
                                ))}
                            </div>
                        ) : error ? (
                            <div className="alert alert-error bg-error/10 border-error/20 text-error rounded-2xl p-8 flex flex-col items-center text-center">
                                <p className="font-bold">{error}</p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="btn btn-sm btn-error text-white mt-4 rounded-xl px-6"
                                >
                                    Réessayer
                                </button>
                            </div>
                        ) : products.length === 0 ? (
                            <div className="text-center py-24 bg-neutral/5 rounded-[3rem] border-2 border-dashed border-neutral/10">
                                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                                    <Filter size={32} />
                                </div>
                                <h3 className="text-xl font-black text-neutral mb-2">Aucun produit trouvé</h3>
                                <p className="text-sm opacity-50 mb-8 max-w-xs mx-auto">Nous n'avons trouvé aucun article correspondant à vos critères de recherche.</p>
                                <button
                                    onClick={() => router.push('/catalog')}
                                    className="btn btn-primary rounded-xl px-8 text-white"
                                >
                                    Effacer les filtres
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                                {products.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        )}

                        {/* Pagination Placeholder */}
                        {!loading && !error && products.length > 0 && (
                            <div className="flex justify-center mt-20">
                                <div className="join">
                                    <button className="join-item btn btn-sm rounded-l-xl">«</button>
                                    <button className="join-item btn btn-sm btn-active btn-primary text-white">1</button>
                                    <button className="join-item btn btn-sm">2</button>
                                    <button className="join-item btn btn-sm">3</button>
                                    <button className="join-item btn btn-sm rounded-r-xl">»</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Simple Footer Copy from before */}
            <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded mt-20">
                <aside>
                    <p className="font-bold text-xs opacity-50 uppercase tracking-widest">© 2026 - UAC RDC Platform - Propulsé par DBH</p>
                </aside>
            </footer>
        </main>
    );
}

/**
 * CatalogPage - Page principale avec Suspense Boundary
 * Next.js 15 requiert que useSearchParams() soit dans un Suspense pour le SSR
 */
export default function CatalogPage() {
    return (
        <Suspense fallback={
            <main className="bg-white min-h-screen">
                <Navbar />
                <div className="pt-24 pb-12 container mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="flex flex-col gap-4 animate-pulse">
                                <div className="bg-neutral/5 aspect-square rounded-[2rem]" />
                                <div className="h-4 bg-neutral/5 rounded w-1/3" />
                                <div className="h-6 bg-neutral/5 rounded w-3/4" />
                                <div className="h-10 bg-neutral/5 rounded w-full mt-4" />
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        }>
            <CatalogContent />
        </Suspense>
    );
}
