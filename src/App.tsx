
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Menu, 
  X, 
  Phone, 
  MessageCircle, 
  ArrowRight, 
  MapPin, 
  Maximize, 
  ChevronRight, 
  Home, 
  TrendingUp, 
  Calculator, 
  Info,
  Layers,
  CheckCircle2,
  Clock,
  Send,
  Sparkles,
  Award,
  Users
} from 'lucide-react';
import { PROPERTIES, BLOGS, TESTIMONIALS, AGENT_DATA, MARKET_INTEL } from './constants';
import { Property, PropertyStatus } from '../types';
import PropertyCard from './components/PropertyCard';
import Calculators from './components/Calculators';
import GeminiAssistant from './components/GeminiAssistant';
import LeadForm from './components/LeadForm';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [showFilters, setShowFilters] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [marketModalItem, setMarketModalItem] = useState<any | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCity = selectedCity === 'All' || p.city === selectedCity;
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      return matchesSearch && matchesCity && matchesPrice;
    });
  }, [searchQuery, selectedCity, priceRange]);

  const cities = ['All', ...Array.from(new Set(PROPERTIES.map(p => p.city)))];

  useEffect(() => {
    // Body scroll lock when market modal is open
    if (marketModalItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [marketModalItem]);
  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden bg-slate-50">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'glass py-3 shadow-lg' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <img src="/images/logo.svg" alt="The Proptech Diva" className="w-10 h-10 rounded-xl object-cover shadow-indigo-900/20 shadow-lg" />
                <span className={`text-xl font-black tracking-tighter ${scrolled ? 'text-indigo-950' : 'text-white'}`}>THE <span className="text-emerald-500">PROPTECH</span> DIVA</span>
              </div>
            {/* Desktop Personal Branding Mini-Indicator */}
            <div className={`hidden lg:flex items-center gap-3 pl-6 border-l transition-all ${scrolled ? 'border-slate-200' : 'border-white/20'}`}>
               <img src={AGENT_DATA.photo} className="w-8 h-8 rounded-full object-cover object-top border-2 border-emerald-500" alt={AGENT_DATA.name} />
               <div className="flex flex-col">
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${scrolled ? 'text-slate-400' : 'text-slate-300'}`}>Agent Identity</span>
                  <span className={`text-xs font-bold ${scrolled ? 'text-indigo-950' : 'text-white'}`}>{AGENT_DATA.name}</span>
               </div>
            </div>
          </div>
          
          <div className={`hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-wider ${scrolled ? 'text-slate-600' : 'text-white'}`}>
            <a href="#properties" className="hover:text-emerald-500 transition-colors">Properties</a>
            <a href="#calculators" className="hover:text-emerald-500 transition-colors">Tools</a>
            <a href="#about" className="hover:text-emerald-500 transition-colors">Founder</a>
            <a href="#insights" className="hover:text-emerald-500 transition-colors">Insights</a>
            <button 
              onClick={() => setShowLeadModal(true)}
              className="px-6 py-3 bg-indigo-950 text-white rounded-full hover:bg-indigo-900 transition-all shadow-xl shadow-indigo-950/20 active:scale-95 text-xs tracking-widest"
            >
              Consult Now
            </button>
          </div>

          <button className={`md:hidden p-2 ${scrolled ? 'text-indigo-950' : 'text-white'}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col pt-24 px-6 gap-6 md:hidden animate-in fade-in zoom-in-95 duration-300">
             <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl mb-4">
             <img src={AGENT_DATA.photo} className="w-16 h-16 rounded-full object-cover object-top border-2 border-emerald-500 shadow-md" alt={AGENT_DATA.name} />
             <div>
                <p className="text-lg font-bold text-indigo-950">{AGENT_DATA.name}</p>
                <p className="text-xs text-slate-500 font-medium">{AGENT_DATA.role}</p>
             </div>
          </div>
          <a href="#properties" onClick={() => setIsMenuOpen(false)} className="text-2xl font-black text-indigo-950">Marketplace</a>
          <a href="#calculators" onClick={() => setIsMenuOpen(false)} className="text-2xl font-black text-indigo-950">Financial Tools</a>
          <a href="#about" onClick={() => setIsMenuOpen(false)} className="text-2xl font-black text-indigo-950">Founder Profile</a>
          <a href="#insights" onClick={() => setIsMenuOpen(false)} className="text-2xl font-black text-indigo-950">Market Intel</a>
          <div className="mt-auto pb-10 flex flex-col gap-4">
            <button 
              onClick={() => { setShowLeadModal(true); setIsMenuOpen(false); }}
              className="w-full py-4 bg-indigo-950 text-white rounded-2xl text-lg font-bold shadow-2xl"
            >
              Book Site Visit
            </button>
          </div>
        </div>
      )}

      {/* Modern Hero Section with Personal Branding Integration */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2400" 
            className="w-full h-full object-cover" 
            alt="Hero Background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/90 via-indigo-950/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full h-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 text-white space-y-8 animate-in slide-in-from-left-10 duration-1000">
              <div className="space-y-2">
                <span className="px-4 py-1.5 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-[0.2em] rounded-full inline-block backdrop-blur-sm">
                  Excellence in Premium Realty
                </span>
                <h1 className="text-5xl md:text-8xl font-black leading-[0.95] tracking-tighter">
                  Crafting <span className="text-emerald-400 italic">Living</span> <br /> Masterpieces.
                </h1>
              </div>
              
              <p className="text-lg md:text-xl text-slate-300 max-w-xl leading-relaxed font-medium">
                Identify premium investments and bespoke residences curated by <span className="text-white font-bold">{AGENT_DATA.name}</span>. We translate vision into value.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1 max-w-md">
                   <div className="glass p-1.5 rounded-2xl flex items-center shadow-2xl">
                      <Search className="text-slate-400 ml-4" size={20} />
                      <input 
                        type="text" 
                        placeholder="Search elite locations..." 
                        className="bg-transparent border-none focus:ring-0 text-white placeholder:text-slate-400 w-full px-4 text-sm font-medium"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <button 
                        onClick={() => setShowFilters(!showFilters)}
                        className="p-3 bg-white text-indigo-950 rounded-xl hover:bg-slate-100 transition-all shadow-md active:scale-95 shrink-0"
                      >
                        <Layers size={18} />
                      </button>
                   </div>
                   
                   {showFilters && (
                    <div className="absolute top-full left-0 right-0 mt-4 glass-dark p-6 rounded-3xl shadow-2xl border border-white/10 z-30 animate-in slide-in-from-top-4">
                       <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">City</label>
                            <select 
                              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-xs outline-none"
                              value={selectedCity}
                              onChange={(e) => setSelectedCity(e.target.value)}
                            >
                              {cities.map(c => <option key={c} value={c} className="text-indigo-950">{c}</option>)}
                            </select>
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Cap (Lakhs)</label>
                            <input 
                              type="number"
                              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-xs outline-none"
                              value={priceRange[1]}
                              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                            />
                          </div>
                       </div>
                    </div>
                   )}
                </div>
                <button 
                  onClick={() => setShowLeadModal(true)}
                  className="px-8 py-4 bg-emerald-500 text-white rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-lg flex items-center justify-center gap-3 active:scale-95"
                >
                  Consult Now <ArrowRight size={20} />
                </button>
              </div>
            </div>

            {/* Right Agent Column - Personal Branding Focus */}
            <div className="lg:col-span-5 relative hidden lg:block animate-in fade-in zoom-in-95 duration-1000 delay-300">
               <div className="relative w-full max-w-sm mx-auto">
                  {/* Glass Card Container for Photo */}
                  <div className="aspect-[4/5] bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl shadow-indigo-950/40 relative z-10 border-4 border-white/10 group">
                    <img 
                      src={AGENT_DATA.photo} 
                      className="w-full h-full object-cover object-top -translate-y-6 grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                      alt={AGENT_DATA.name} 
                    />
                    {/* Overlay Identity Card */}
                      <div className="absolute bottom-4 left-6 right-6 glass p-3 rounded-3xl shadow-2xl border border-white/20 backdrop-blur-xl">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[9px] font-black uppercase tracking-[0.18em] text-emerald-600">The Founder</span>
                          <h3 className="text-lg font-black text-indigo-950 tracking-tighter">{AGENT_DATA.name}</h3>
                          <p className="text-[11px] text-slate-500 font-bold mb-2">{AGENT_DATA.role}</p>
                          <div className="flex items-center gap-4 border-t border-slate-200/50 pt-2">
                            <div className="flex flex-col">
                              <span className="text-[9px] text-slate-400 font-bold uppercase">Experience</span>
                              <span className="text-xs font-black text-indigo-950">{AGENT_DATA.experience}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[9px] text-slate-400 font-bold uppercase">Closures</span>
                              <span className="text-xs font-black text-indigo-950">{AGENT_DATA.deals}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>
                  
                  {/* Background Floating Elements */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/20 blur-[60px] rounded-full"></div>
                  <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-indigo-500/20 blur-[80px] rounded-full"></div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 relative z-10">
        
        {/* Marketplace Section */}
        <section id="properties" className="py-24 px-4 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
            <div className="space-y-2">
              <span className="text-emerald-600 font-black uppercase tracking-[0.2em] text-[10px] py-1 px-3 bg-emerald-50 rounded-full inline-block">Exclusive Marketplace</span>
              <h2 className="text-4xl md:text-6xl font-black text-indigo-950 tracking-tighter">Curated <span className="text-emerald-500 italic">Portfolio</span></h2>
            </div>
            <div className="flex items-center gap-6">
               <div className="text-right hidden sm:block">
                 <p className="text-slate-400 text-xs font-bold uppercase">Current Inventory</p>
                 <p className="text-xl font-black text-indigo-950">{filteredProperties.length} elite options</p>
               </div>
               <button className="p-4 bg-indigo-950 text-white rounded-2xl hover:bg-emerald-500 transition-all shadow-lg active:scale-95">
                  <Layers size={20} />
               </button>
            </div>
          </div>

          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-200 shadow-sm">
              <div className="mb-6 flex justify-center opacity-20"><Search size={80} className="text-indigo-950" /></div>
              <h3 className="text-2xl font-black text-indigo-950 mb-2 tracking-tight">Refine Your Search</h3>
              <p className="text-slate-500 font-medium mb-8">No matching residences found for these criteria.</p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCity('All'); setPriceRange([0, 2000]); }}
                className="px-10 py-4 bg-indigo-950 text-white rounded-2xl font-black tracking-widest text-xs uppercase shadow-xl active:scale-95"
              >
                Reset Market View
              </button>
            </div>
          )}
        </section>

        {/* Market Intelligence Modal (reusable for both cards) */}
        {marketModalItem && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-indigo-950/60 backdrop-blur-md transition-opacity"
              onClick={() => setMarketModalItem(null)}
            />

            <div className="relative w-full max-w-3xl mx-auto animate-in zoom-in-95 duration-300">
              <div className="bg-white rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
                <div className="flex items-start justify-between p-6 border-b border-slate-100">
                  <div>
                    <h3 className="text-2xl font-extrabold text-indigo-950">{marketModalItem.title}</h3>
                    <p className="text-sm text-slate-500 mt-1">{marketModalItem.category} • <time dateTime={marketModalItem.date}>{marketModalItem.date}</time></p>
                  </div>
                  <button
                    onClick={() => setMarketModalItem(null)}
                    className="p-2 rounded-full text-slate-500 hover:bg-slate-100"
                    aria-label="Close modal"
                  >
                    <X />
                  </button>
                </div>

                <div className="p-8 max-h-[70vh] overflow-y-auto text-slate-700 leading-relaxed space-y-6">
                  {/* Keep the card intro unchanged (same excerpt) */}
                  <p className="text-base font-medium">{marketModalItem.excerpt}</p>

                  {/* Structured location-based sections */}
                  {marketModalItem.id === 'mi1' && (
                    <div className="space-y-6">
                      <section>
                        <h4 className="text-lg font-bold text-indigo-950 mb-2">Delhi</h4>
                        <p>Typical stamp duty ranges from ~3%–6% depending on property value and zone; registration charges are often fixed plus state levies — buyers should budget for 5%–6% total transactional costs.</p>
                      </section>

                      <section>
                        <h4 className="text-lg font-bold text-indigo-950 mb-2">Noida & Greater Noida</h4>
                        <p>Faster approvals and developer incentives can reduce effective buyer costs; expect lower stamp duty compared with central Delhi but budget registration and ancillary charges.</p>
                      </section>

                      <section>
                        <h4 className="text-lg font-bold text-indigo-950 mb-2">Gurgaon (Gurugram)</h4>
                        <p>Satellite-town pricing with rising infrastructure spending — stamp duty similar to Haryana rates; investors frequently consider transfer taxes and parking/maintenance obligations.</p>
                      </section>
                    </div>
                  )}

                  {marketModalItem.id === 'mi2' && (
                    <div className="space-y-6">
                      <section>
                        <h4 className="text-lg font-bold text-indigo-950 mb-2">Sectors to watch</h4>
                        <p>In Noida, Sectors 150, 150A and 132 show higher post-launch appreciation; in Gurgaon, micro-markets around the Golf Course Extension and Dwarka Expressway corridor deliver stronger rental yields.</p>
                      </section>

                      <section>
                        <h4 className="text-lg font-bold text-indigo-950 mb-2">ROI & Yield</h4>
                        <p>Expect capital appreciation of 8%–18% over 2–3 years in high-growth pockets; rental yields typically 2.5%–4% depending on locality and property type.</p>
                      </section>

                      <section>
                        <h4 className="text-lg font-bold text-indigo-950 mb-2">Primary Drivers</h4>
                        <p>Metro extensions, new expressways, and institutional commercial leasing are the primary catalysts for infrastructure-led appreciation.</p>
                      </section>
                    </div>
                  )}

                  <div className="pt-4 border-t border-slate-100">
                    <button onClick={() => setMarketModalItem(null)} className="mt-4 px-6 py-3 bg-indigo-950 text-white rounded-2xl font-bold">Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Intelligence & ROI Section */}
        <section id="calculators" className="py-32 bg-indigo-950 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
              <div className="lg:col-span-5 space-y-10">
                <div className="space-y-4">
                  <span className="text-emerald-400 font-black uppercase tracking-[0.2em] text-[10px]">Data Driven Decisions</span>
                  <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">Financial <br /> <span className="text-emerald-400">Precision.</span></h2>
                </div>
                
                <div className="space-y-8">
                  <div className="flex gap-6 items-start group">
                    <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-emerald-500 transition-colors duration-500">
                      <Calculator className="text-emerald-400 group-hover:text-white" size={28} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2 tracking-tight">Dynamic EMI Projections</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">Calculate cash flows and mortgage structures with real-time interest sensitivity analysis.</p>
                    </div>
                  </div>
                  <div className="flex gap-6 items-start group">
                    <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-emerald-500 transition-colors duration-500">
                      <TrendingUp className="text-emerald-400 group-hover:text-white" size={28} />
                    </div>
                    <div>
                     <h4 className="text-xl font-bold mb-2 tracking-tight">Yield & Growth Modeling</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">Forecast appreciation and rental income using proprietary locality heatmaps.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-7">
                <div className="bg-white rounded-[3.5rem] p-4 sm:p-10 text-slate-900 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/20">
                  <Calculators />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Personalized Founder Branding Section */}
        <section id="about" className="py-32 px-4 max-w-7xl mx-auto overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
            <div className="lg:col-span-6 relative">
              <div className="relative z-10 rounded-[3.5rem] overflow-hidden shadow-2xl shadow-indigo-950/20 border-8 border-white">
                <img src="/the_founder_legacy.jpeg" className="w-full aspect-[4/5] object-cover" alt="Our Workspace" />
              </div>
              
              {/* Floating Achievement Card */}
              <div className="absolute -bottom-10 -right-10 glass p-10 rounded-[2.5rem] shadow-2xl border border-white z-20 hidden md:block max-w-[280px] backdrop-blur-3xl">
                 <div className="space-y-4">
                    <Award className="text-emerald-500" size={40} />
                    <div>
                       <p className="text-4xl font-black text-indigo-950">Top 1%</p>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">NCR Consultant Rank</p>
                    </div>
                    <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                       <Users className="text-indigo-900" size={20} />
                       <span className="text-xs font-bold text-indigo-950">80+ Private HNI Clients</span>
                    </div>
                 </div>
              </div>
            </div>
            
            <div className="lg:col-span-6 space-y-10">
              <div className="space-y-4">
                <span className="text-emerald-600 font-black uppercase tracking-[0.2em] text-[10px]">The Founder's Legacy</span>
                <h2 className="text-4xl md:text-6xl font-black text-indigo-950 tracking-tighter leading-tight">Elevating Real Estate to <span className="text-emerald-500 italic">Fine Art</span></h2>
              </div>
              
              <div className="space-y-6 text-slate-600">
                <p className="text-xl font-medium leading-relaxed italic border-l-4 border-emerald-500 pl-6">
                  "Real estate is not about brick and mortar; it's about the heritage we leave behind. My mission is to ensure every transaction is a bridge to a better future."
                </p>
                <p className="text-lg leading-relaxed">
                  LuxeRealtors, founded by <span className="text-indigo-950 font-bold">{AGENT_DATA.name}</span>, represents the zenith of professional real estate consultancy. We operate on principles of radical transparency, predictive data analysis, and bespoke client attention.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-3xl border-2 border-slate-50 shadow-sm hover:shadow-lg transition-all">
                  <h4 className="font-black text-indigo-950 mb-1 text-sm uppercase tracking-widest">RERA Registered</h4>
                  <p className="text-xs text-slate-400 font-bold">{AGENT_DATA.rera}</p>
                </div>
                <div className="p-6 bg-white rounded-3xl border-2 border-slate-50 shadow-sm hover:shadow-lg transition-all">
                  <h4 className="font-black text-indigo-950 mb-1 text-sm uppercase tracking-widest">Delhi NCR Reach</h4>
                  <p className="text-xs text-slate-400 font-bold">Gzb, Noida, Gurgaon, Jewar Partners</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setShowLeadModal(true)}
                  className="px-10 py-5 bg-indigo-950 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-indigo-950/20 active:scale-95 transition-all"
                >
                  Direct Consultation
                </button>
                <button className="p-5 bg-slate-100 text-slate-600 rounded-2xl hover:bg-slate-200 transition-colors">
                  <Phone size={24} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Intelligence Section */}
        <section id="insights" className="py-32 bg-slate-100">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
              <div className="space-y-4">
                <span className="text-emerald-600 font-black uppercase tracking-[0.2em] text-[10px]">Strategic Foresight</span>
                <h2 className="text-4xl md:text-6xl font-black text-indigo-950 tracking-tighter">Market <span className="text-emerald-500 italic">Intelligence</span></h2>
              </div>
              <p className="text-slate-500 max-w-sm font-medium leading-relaxed">
                Navigating volatility with precision. Access the data that institutional investors use to stay ahead.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
              {MARKET_INTEL.map(item => (
                <article key={item.id} className="relative glass p-6 rounded-3xl backdrop-blur-md border border-white/10 shadow-lg hover:shadow-2xl transition-transform duration-500 hover:-translate-y-2 overflow-hidden">
                  <div className="md:flex md:items-start gap-6">
                    <div className="flex-shrink-0 w-full md:w-1/2 h-56 md:h-56 rounded-2xl overflow-hidden bg-slate-200">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="mt-4 md:mt-0 md:flex-1">
                      <div className="flex items-center justify-between gap-4">
                        <span className="px-3 py-1 bg-indigo-950 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full">{item.category}</span>
                        <time dateTime={item.date} className="text-[10px] text-slate-400 font-bold">{item.date}</time>
                      </div>
                      <h3 className="mt-4 text-2xl md:text-3xl font-extrabold text-indigo-950 leading-tight">{item.title}</h3>
                      <p className="mt-3 text-slate-600 leading-relaxed font-medium">{item.excerpt}</p>

                      {/* Intro paragraph only on the main card; full details live in modal. */}

                      <div className="mt-6">
                        <button
                          type="button"
                          onClick={() => setMarketModalItem(item)}
                          className="inline-flex items-center gap-3 px-5 py-3 bg-emerald-500 text-white rounded-2xl font-bold shadow-md hover:bg-emerald-600 transition-colors"
                        >
                          In-Depth Analysis <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="bg-indigo-950 rounded-[4rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-12 opacity-5 -translate-y-1/2 translate-x-1/2 scale-150"><TrendingUp size={240} /></div>
              <div className="relative z-10 max-w-2xl mx-auto space-y-10">
                <div className="space-y-4">
                   <h3 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">The Investor's <span className="text-emerald-400">Brief.</span></h3>
                   <p className="text-indigo-200 font-medium text-lg leading-relaxed">Get curated luxury listings and macro-economic property shifts delivered bi-weekly.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input 
                    type="email" 
                    placeholder="Enter your professional email" 
                    className="bg-white/5 border border-white/10 rounded-2xl px-8 py-5 flex-1 outline-none focus:ring-2 focus:ring-emerald-500 transition-all placeholder:text-indigo-300 font-medium text-sm" 
                  />
                  <button className="bg-emerald-500 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-emerald-600 transition-all shadow-xl active:scale-95">Subscribe</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-32 px-4 max-w-7xl mx-auto">
          <div className="text-center mb-24 space-y-4">
            <span className="text-emerald-600 font-black uppercase tracking-[0.2em] text-[10px]">Validated Trust</span>
            <h2 className="text-4xl md:text-6xl font-black text-indigo-950 tracking-tighter">Human <span className="text-emerald-500 italic">Stories</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {TESTIMONIALS.map(t => (
              <div key={t.id} className="p-12 bg-white rounded-[3.5rem] shadow-[0_30px_60px_-15px_rgba(15,23,42,0.05)] border border-slate-50 flex flex-col gap-8 group hover:-translate-y-2 transition-all duration-500">
                <div className="flex gap-1 text-emerald-500">
                  {[...Array(5)].map((_, i) => <CheckCircle2 key={i} size={20} fill="currentColor" className="opacity-80" />)}
                </div>
                <p className="text-2xl font-medium text-indigo-950 leading-relaxed italic">"{t.content}"</p>
                <div className="flex items-center gap-6 mt-auto pt-8 border-t border-slate-50">
                  <img src={t.avatar} className="w-16 h-16 rounded-full object-cover border-4 border-slate-50 shadow-md" alt={t.name} />
                  <div>
                    <p className="font-black text-indigo-950 text-xl tracking-tight">{t.name}</p>
                    <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-indigo-950 text-slate-400 py-32 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">
          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center gap-2">
              <img src="/images/logo.svg" alt="The Proptech Diva" className="w-8 h-8 rounded-lg object-cover" />
              <span className="text-lg font-black text-white tracking-tighter">THE <span className="text-emerald-500">PROPTECH</span> DIVA</span>
            </div>
            <p className="text-sm leading-relaxed font-medium">
              A boutique real estate intelligence and advisory brand focused on luxury assets, strategic investments, and data-driven property decisions. We bridge market insight with modern technology to help buyers, investors,
               and developers unlock long-term value across India’s most dynamic real estate corridors.
            </p>
            <div className="flex gap-4">
              {['FB', 'TW', 'IG', 'LI'].map(s => (
                <div key={s} className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all duration-300 cursor-pointer text-[10px] font-black">{s}</div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-white font-black text-xs uppercase tracking-[0.2em]">Strategy</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-emerald-500 transition-colors">Elite Marketplace</a></li>
              <li><a href="#" className="hover:text-emerald-500 transition-colors">Asset Management</a></li>
              <li><a href="#" className="hover:text-emerald-500 transition-colors">Private Listings</a></li>
              <li><a href="#" className="hover:text-emerald-500 transition-colors">Legal Advisory</a></li>
            </ul>
          </div>
          
          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-white font-black text-xs uppercase tracking-[0.2em]">Territories</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-emerald-500 transition-colors">NCR Corridor</a></li>
              <li><a href="#" className="hover:text-emerald-500 transition-colors">Silicon Plateau</a></li>
              <li><a href="#" className="hover:text-emerald-500 transition-colors">Marine Drive Hub</a></li>
              <li><a href="#" className="hover:text-emerald-500 transition-colors">Global Portfolios</a></li>
            </ul>
          </div>
          
          <div className="lg:col-span-4 space-y-8">
            <h4 className="text-white font-black text-xs uppercase tracking-[0.2em]">HQ Operations</h4>
            <ul className="space-y-6 text-sm font-medium">
              <li className="flex gap-4 items-start"><MapPin size={20} className="text-emerald-500 shrink-0" /> C-37, First Flor, Metro Plaza, Vasundhara <br />Ghaziabad NCR - 201012</li>
              <li className="flex gap-4 items-center"><Phone size={20} className="text-emerald-500 shrink-0" /> +91 96251 91904</li>
              <li className="flex gap-4 items-center"><MessageCircle size={20} className="text-emerald-500 shrink-0" /> proptechsneha@gmail.com</li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-widest">
          <p>© 2024 LuxeRealtors India. License: {AGENT_DATA.rera}</p>
          <div className="flex gap-10">
             <a href="#" className="hover:text-white transition-colors">Ethics Policy</a>
             <a href="#" className="hover:text-white transition-colors">Investor Terms</a>
             <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </footer>

      {/* Responsive Conversion Triggers */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
        <a 
          href="https://wa.me/919625191904" 
          className="w-16 h-16 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-2xl hover:scale-110 hover:-rotate-6 transition-all active:scale-95 group relative"
          title="WhatsApp Now"
        >
          <MessageCircle size={32} />
          <span className="absolute right-full mr-4 bg-white text-indigo-950 px-4 py-2 rounded-xl text-xs font-black shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Instant WhatsApp</span>
        </a>
        <button 
          onClick={() => setShowLeadModal(true)}
          className="w-16 h-16 bg-indigo-950 text-white rounded-2xl flex items-center justify-center shadow-2xl hover:scale-110 hover:rotate-6 transition-all active:scale-95 group relative"
          title="Request Callback"
        >
          <Phone size={28} />
          <span className="absolute right-full mr-4 bg-white text-indigo-950 px-4 py-2 rounded-xl text-xs font-black shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Schedule Callback</span>
        </button>
      </div>

      {/* Mobile-Only Conversion Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden glass border-t border-slate-200 p-4 flex gap-4 backdrop-blur-3xl bg-white/80">
        <button 
          onClick={() => setShowLeadModal(true)}
          className="flex-1 bg-indigo-950 text-white font-black py-4 rounded-2xl shadow-xl uppercase tracking-widest text-[10px]"
        >
          Reserve Visit
        </button>
        <button 
          onClick={() => window.open('https://wa.me/919625191904')}
          className="flex-1 border-2 border-emerald-500 text-emerald-600 font-black py-4 rounded-2xl flex items-center justify-center gap-2 uppercase tracking-widest text-[10px]"
        >
          <MessageCircle size={18} /> WhatsApp
        </button>
      </div>

      {/* AI Assistant Button */}
      <GeminiAssistant />

      {/* Modal - Lead Capture */}
      {showLeadModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
          <div className="absolute inset-0 bg-indigo-950/80 backdrop-blur-md" onClick={() => setShowLeadModal(false)}></div>
          <div className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-[0_100px_200px_-50px_rgba(0,0,0,0.5)] p-6 sm:p-12 overflow-y-auto max-h-[95vh] animate-in zoom-in-95 duration-500">
            <button 
              className="absolute top-8 right-8 p-3 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
              onClick={() => setShowLeadModal(false)}
            >
              <X size={24} />
            </button>
            <LeadForm onClose={() => setShowLeadModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
