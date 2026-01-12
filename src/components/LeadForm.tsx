
import React, { useState } from 'react';
import { Send, CheckCircle, Phone, Mail, User } from 'lucide-react';

interface LeadFormProps {
  onClose: () => void;
}

const LeadForm: React.FC<LeadFormProps> = ({ onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API Call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 3000);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="text-center py-10">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} />
        </div>
        <h3 className="text-2xl font-bold mb-2">Request Received!</h3>
        <p className="text-slate-500 mb-6">One of our premium relationship managers will reach out to you within the next 30 minutes.</p>
        <button 
          onClick={onClose}
          className="px-8 py-3 bg-indigo-900 text-white rounded-xl font-bold"
        >
          Back to Browsing
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Secure Your Visit</h2>
        <p className="text-slate-500">Book a personalized 1-on-1 site walkthrough with our experts.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            required
            type="text" 
            placeholder="Full Name" 
            className="w-full pl-12 pr-4 py-4 bg-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-900 transition-all border-none"
          />
        </div>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            required
            type="email" 
            placeholder="Email Address" 
            className="w-full pl-12 pr-4 py-4 bg-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-900 transition-all border-none"
          />
        </div>
        <div className="relative">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            required
            type="tel" 
            placeholder="Phone Number" 
            className="w-full pl-12 pr-4 py-4 bg-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-900 transition-all border-none"
          />
        </div>
        
        <div className="pt-4 grid grid-cols-2 gap-4 mb-4">
           <label className="flex flex-col p-4 bg-slate-50 rounded-2xl border-2 border-slate-100 cursor-pointer has-[:checked]:border-indigo-900 has-[:checked]:bg-indigo-50 transition-all">
              <input type="radio" name="service" className="hidden" defaultChecked />
              <span className="text-sm font-bold">Buy/Invest</span>
              <span className="text-[10px] text-slate-500 uppercase font-bold mt-1">Primary Choice</span>
           </label>
           <label className="flex flex-col p-4 bg-slate-50 rounded-2xl border-2 border-slate-100 cursor-pointer has-[:checked]:border-indigo-900 has-[:checked]:bg-indigo-50 transition-all">
              <input type="radio" name="service" className="hidden" />
              <span className="text-sm font-bold">Sell/List</span>
              <span className="text-[10px] text-slate-500 uppercase font-bold mt-1">Secondary</span>
           </label>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-5 bg-indigo-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-800 transition-all shadow-xl disabled:opacity-50"
        >
          {loading ? 'Processing...' : (
            <>Get Instant Callback <Send size={18} /></>
          )}
        </button>
        
        <p className="text-[10px] text-center text-slate-400 font-medium px-6">
          By clicking, you agree to be contacted via call, SMS or WhatsApp. We respect your privacy.
        </p>
      </form>
    </div>
  );
};

export default LeadForm;
