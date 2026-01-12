
import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const Calculators: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'EMI' | 'ROI'>('EMI');
  
  // EMI State
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [tenure, setTenure] = useState(20);
  const [interest, setInterest] = useState(8.5);

  // ROI State
  const [purchasePrice, setPurchasePrice] = useState(7500000);
  const [expectedRent, setExpectedRent] = useState(35000);
  const [appreciation, setAppreciation] = useState(6);

  const emiData = useMemo(() => {
    const r = interest / 12 / 100;
    const n = tenure * 12;
    const emi = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayable = emi * n;
    const totalInterest = totalPayable - loanAmount;

    return {
      monthly: Math.round(emi),
      totalPayable: Math.round(totalPayable),
      interest: Math.round(totalInterest),
      chart: [
        { name: 'Principal', value: loanAmount, color: '#1e3a8a' },
        { name: 'Interest', value: totalInterest, color: '#10b981' }
      ]
    };
  }, [loanAmount, tenure, interest]);

  const roiData = useMemo(() => {
    const annualRent = expectedRent * 12;
    const rentalYield = (annualRent / purchasePrice) * 100;
    const totalReturnIn5Yrs = (purchasePrice * Math.pow(1 + appreciation/100, 5)) - purchasePrice + (annualRent * 5);

    return {
      yield: rentalYield.toFixed(2),
      fiveYearGain: Math.round(totalReturnIn5Yrs),
      chart: [
        { name: 'Rental Income', value: annualRent * 5, color: '#10b981' },
        { name: 'Appreciation', value: (purchasePrice * Math.pow(1 + appreciation/100, 5)) - purchasePrice, color: '#1e3a8a' }
      ]
    };
  }, [purchasePrice, expectedRent, appreciation]);

  return (
    <div>
      <div className="flex bg-slate-100 p-1 rounded-2xl mb-8">
        <button 
          onClick={() => setActiveTab('EMI')}
          className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${activeTab === 'EMI' ? 'bg-white shadow-sm text-indigo-900' : 'text-slate-500'}`}
        >
          EMI Calculator
        </button>
        <button 
          onClick={() => setActiveTab('ROI')}
          className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${activeTab === 'ROI' ? 'bg-white shadow-sm text-indigo-900' : 'text-slate-500'}`}
        >
          ROI Estimator
        </button>
      </div>

      {activeTab === 'EMI' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Loan Amount</label>
                <span className="font-bold">₹{(loanAmount / 100000).toFixed(1)} L</span>
              </div>
              <input 
                type="range" min="100000" max="20000000" step="100000" 
                value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-900"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Tenure (Years)</label>
                <span className="font-bold">{tenure} Y</span>
              </div>
              <input 
                type="range" min="1" max="30" step="1" 
                value={tenure} onChange={(e) => setTenure(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-900"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Interest Rate</label>
                <span className="font-bold">{interest}%</span>
              </div>
              <input 
                type="range" min="5" max="15" step="0.1" 
                value={interest} onChange={(e) => setInterest(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-900"
              />
            </div>
            
            <div className="pt-4 border-t border-slate-100">
              <p className="text-slate-400 text-xs mb-1">Monthly Installment (EMI)</p>
              <h3 className="text-4xl font-black text-indigo-900">₹{emiData.monthly.toLocaleString()}</h3>
            </div>
          </div>
          
           <div className="h-48 md:h-64 relative">
             <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={emiData.chart}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {emiData.chart.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
             </ResponsiveContainer>
             <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Interest</span>
                <span className="text-sm font-bold">₹{(emiData.interest / 100000).toFixed(1)} L</span>
             </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Property Cost</label>
                <span className="font-bold">₹{(purchasePrice / 100000).toFixed(1)} L</span>
              </div>
              <input 
                type="range" min="1000000" max="50000000" step="500000" 
                value={purchasePrice} onChange={(e) => setPurchasePrice(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Monthly Rent</label>
                <span className="font-bold">₹{expectedRent.toLocaleString()}</span>
              </div>
              <input 
                type="range" min="5000" max="200000" step="1000" 
                value={expectedRent} onChange={(e) => setExpectedRent(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Ann. Appreciation</label>
                <span className="font-bold">{appreciation}%</span>
              </div>
              <input 
                type="range" min="1" max="20" step="0.5" 
                value={appreciation} onChange={(e) => setAppreciation(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>
            
            <div className="pt-4 border-t border-slate-100 flex justify-between items-end">
              <div>
                <p className="text-slate-400 text-xs mb-1">Rental Yield</p>
                <h3 className="text-2xl font-black text-emerald-600">{roiData.yield}%</h3>
              </div>
              <div className="text-right">
                <p className="text-slate-400 text-xs mb-1">Estimated 5Yr Gain</p>
                <h3 className="text-2xl font-black text-indigo-900">₹{(roiData.fiveYearGain / 100000).toFixed(1)} L</h3>
              </div>
            </div>
          </div>
          
           <div className="h-48 md:h-64 relative">
             <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={roiData.chart}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {roiData.chart.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
             </ResponsiveContainer>
             <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Total Return</span>
                <span className="text-sm font-bold">5 Years</span>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calculators;
