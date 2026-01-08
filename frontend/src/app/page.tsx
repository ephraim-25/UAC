import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import { Laptop, Sofa, Tv, Zap, ArrowRight, ShieldCheck, Award, MapPin, Headphones } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const categories = [
    { name: 'Informatique', icon: <Laptop size={32} />, count: '240+ Produits', color: 'bg-primary/5 text-primary' },
    { name: 'Mobilier', icon: <Sofa size={32} />, count: '120+ Produits', color: 'bg-primary/5 text-primary' },
    { name: 'Électroménager', icon: <Tv size={32} />, count: '180+ Produits', color: 'bg-primary/5 text-primary' },
    { name: 'Énergie Solaire', icon: <Zap size={32} />, count: '50+ Produits', color: 'bg-primary/5 text-primary' },
  ];

  return (
    <main className="bg-white selection:bg-primary/20 min-h-screen">
      <Navbar />
      <Hero />

      {/* Categories Grid - Univers UAC */}
      <section className="py-24 container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4">Découvrez nos univers</h2>
            <h3 className="text-4xl md:text-5xl font-black text-neutral tracking-tighter leading-tight">
              Tout l'équipement pour <br />
              <span className="text-primary/40">vos projets.</span>
            </h3>
          </div>
          <Link href="/catalog" className="btn btn-ghost text-primary font-black uppercase tracking-widest text-xs gap-2 group">
            Tout le catalogue <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, i) => (
            <Link
              key={i}
              href={`/catalog?category=${cat.name.toLowerCase()}`}
              className="group relative"
            >
              <div className="card bg-white border border-neutral/5 hover:border-primary/20 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,86,150,0.1)] p-8">
                <div className={`w-16 h-16 rounded-2xl ${cat.color} flex items-center justify-center transition-all duration-500 group-hover:bg-primary group-hover:text-white mb-6 shadow-sm`}>
                  {cat.icon}
                </div>
                <h4 className="text-xl font-black text-neutral mb-1">{cat.name}</h4>
                <p className="text-[10px] font-bold opacity-30 uppercase tracking-[0.2em]">{cat.count}</p>

                <div className="mt-8 flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                  Explorer <ArrowRight size={12} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust & Heritage Section */}
      <section className="bg-neutral py-24 text-white relative overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-8">
                <Award size={16} className="text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest">Héritage & Excellence</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-[1.1]">
                Pourquoi faire confiance à <br />
                <span className="text-primary">UAC RDC ?</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {[
                  { title: 'Certifié Origine', text: 'Chaque produit est importé directement du fabricant.' },
                  { title: 'SAV Expert', text: 'Ateliers certifiés Samsung et Philips sur place.' },
                  { title: 'Stock Local', text: 'Pas de délais cachés, tout est en stock à Kinshasa.' },
                  { icon: <Headphones />, title: 'Support Réactif', text: 'Une équipe de conseillers dédiée 7j/7.' }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                      <ShieldCheck size={20} />
                    </div>
                    <h4 className="font-black text-lg uppercase tracking-tight">{item.title}</h4>
                    <p className="text-sm opacity-50 font-medium leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/5 backdrop-blur-3xl p-10 rounded-[40px] border border-white/10 relative overflow-hidden">
                <div className="flex items-center gap-6 mb-12">
                  <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center text-3xl font-black">U</div>
                  <div>
                    <h3 className="text-2xl font-black">Union Africaine de Commerce</h3>
                    <p className="text-xs opacity-50 uppercase tracking-widest mt-1 italic">Le partenaire de votre croissance</p>
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-primary transition-colors transition-all duration-300"><MapPin /></div>
                    <div>
                      <p className="text-sm font-black uppercase">Siège Social</p>
                      <p className="text-xs opacity-50">Gombe, Kinshasa, RDC</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-primary transition-colors transition-all duration-300"><Award /></div>
                    <div>
                      <p className="text-sm font-black uppercase">Présence Nationale</p>
                      <p className="text-xs opacity-50">Kinshasa - Lubumbashi - Matadi</p>
                    </div>
                  </div>
                </div>

                {/* Visual accent */}
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Footer */}
      <footer className="bg-white pt-24 pb-12 border-t border-neutral/5">
        <div className="container mx-auto px-4 md:px-8 flex flex-col items-center text-center">
          <Link href="/" className="flex items-center gap-3 mb-10 opacity-40 hover:opacity-100 transition-opacity">
            <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-lg">
              <span className="text-white font-black">U</span>
            </div>
            <span className="text-2xl font-black tracking-tighter text-neutral">UAC RDC</span>
          </Link>

          <nav className="flex flex-wrap justify-center gap-10 mb-16 uppercase font-black text-[11px] tracking-[0.2em] text-neutral/40">
            <Link href="/about" className="hover:text-primary transition-colors">Notre Compagnie</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Centres de Vente</Link>
            <Link href="/services" className="hover:text-primary transition-colors">Services SAV</Link>
            <Link href="/privacy" className="hover:text-primary transition-colors">Mentions Légales</Link>
          </nav>

          <div className="w-full h-px bg-neutral/5 mb-8" />

          <p className="text-[10px] font-bold text-neutral/30 uppercase tracking-[0.3em]">
            © 2026 UAC RDC - Propulsé par Dark Business Hi-Tech
          </p>
        </div>
      </footer>
    </main>
  );
}
