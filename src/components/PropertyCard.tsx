
import React from 'react';
import { MapPin, Home, Maximize, Clock, ChevronRight, Video, Camera, Sparkles } from 'lucide-react';
import { Property, PropertyStatus } from '../../types';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <div className="group bg-white rounded-[2.5rem] overflow-hidden shadow-[0_20px_40px_-15px_rgba(15,23,42,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(15,23,42,0.12)] transition-all duration-700 border border-slate-50 flex flex-col h-full relative">
      {/* Image Area */}
      <div className="relative h-72 overflow-hidden">
        <img 
          src={property.images[0]} 
          alt={property.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
        />
        <div className="absolute top-5 left-5 flex flex-col gap-2">
          {property.isFeatured && (
            <span className="px-4 py-1.5 bg-indigo-950 text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-full shadow-2xl backdrop-blur-md flex items-center gap-2">
              <Sparkles size={12} className="text-emerald-400" /> Featured Selection
            </span>
          )}
          <span className={`px-4 py-1.5 ${property.status === PropertyStatus.READY ? 'bg-emerald-500' : 'bg-orange-500'} text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-full shadow-2xl`}>
            {property.status}
          </span>
        </div>
        <div className="absolute bottom-5 right-5 flex gap-2">
           <button className="w-10 h-10 bg-white/20 backdrop-blur-xl rounded-xl text-white hover:bg-white/40 transition-colors flex items-center justify-center border border-white/20 shadow-xl">
              <Video size={18} />
           </button>
           <button className="w-10 h-10 bg-white/20 backdrop-blur-xl rounded-xl text-white hover:bg-white/40 transition-colors flex items-center justify-center border border-white/20 shadow-xl">
              <Camera size={18} />
           </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-8 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest">
            <MapPin size={16} className="text-emerald-500" /> {property.location}
          </div>
          <div className="text-2xl font-black text-indigo-950 tracking-tighter">₹{property.price} L+</div>
        </div>
        
        <h3 className="text-2xl font-black text-indigo-950 mb-6 group-hover:text-emerald-500 transition-colors tracking-tight leading-none">{property.title}</h3>
        
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="p-4 bg-slate-50 rounded-2xl flex flex-col items-center justify-center border border-slate-100 group-hover:bg-indigo-50 transition-colors duration-500">
            <Home size={18} className="text-indigo-900 mb-2" />
            <span className="text-[9px] text-slate-400 font-black uppercase tracking-tighter">Plan</span>
            <span className="text-xs font-black text-indigo-950">{property.bhk} BHK</span>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl flex flex-col items-center justify-center border border-slate-100 group-hover:bg-indigo-50 transition-colors duration-500">
            <Maximize size={18} className="text-indigo-900 mb-2" />
            <span className="text-[9px] text-slate-400 font-black uppercase tracking-tighter">Area</span>
            <span className="text-xs font-black text-indigo-950">{property.area} SF</span>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl flex flex-col items-center justify-center border border-slate-100 group-hover:bg-indigo-50 transition-colors duration-500">
            <Clock size={18} className="text-indigo-900 mb-2" />
            <span className="text-[9px] text-slate-400 font-black uppercase tracking-tighter">Pos.</span>
            <span className="text-[9px] font-black text-indigo-950 text-center leading-tight">By 2025</span>
          </div>
        </div>

        {/* Locality Insights Preview */}
        {property.insights && property.insights.length > 0 && (
          <div className="mb-8 space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-100">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Neighborhood Intelligence</p>
            {property.insights.slice(0, 2).map((insight, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <span className="text-slate-600 font-bold">{insight.type}: {insight.name}</span>
                <span className="text-indigo-950 font-black px-2 py-0.5 bg-white rounded-lg shadow-sm">{insight.distance}</span>
              </div>
            ))}
          </div>
        )}

        <div className="mt-auto flex gap-4">
          <button className="flex-1 py-5 bg-indigo-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 group/btn hover:bg-emerald-500 transition-all shadow-xl active:scale-95">
            Examine Asset <ChevronRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
          </button>
          <button className="w-14 h-14 border-2 border-slate-100 rounded-2xl flex items-center justify-center hover:bg-slate-50 transition-colors shrink-0 shadow-sm active:scale-95">
            <Maximize size={20} className="text-slate-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
