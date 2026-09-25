import React from 'react';
import { Sparkles, Briefcase, DollarSign, CreditCard, ShieldCheck, RotateCcw } from 'lucide-react';

const PERSONAS = [
  {
    id: 'prime',
    name: 'Prime Professional',
    desc: 'High Income, High Credit, Low DTI',
    badge: 'Low Risk',
    badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    data: {
      Age: 38,
      Income: 125000,
      LoanAmount: 35000,
      CreditScore: 780,
      MonthsEmployed: 72,
      NumCreditLines: 2,
      InterestRate: 5.5,
      LoanTerm: 36,
      DTIRatio: 0.18,
      Education: "Master's",
      EmploymentType: 'Full-time',
      MaritalStatus: 'Married',
      HasMortgage: 'Yes',
      HasDependents: 'Yes',
      LoanPurpose: 'Home',
      HasCoSigner: 'Yes'
    }
  },
  {
    id: 'moderate',
    name: 'Balanced Homebuyer',
    desc: 'Average Income & Score, Moderate Loan',
    badge: 'Moderate Risk',
    badgeClass: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    data: {
      Age: 32,
      Income: 65000,
      LoanAmount: 25000,
      CreditScore: 660,
      MonthsEmployed: 42,
      NumCreditLines: 3,
      InterestRate: 9.8,
      LoanTerm: 48,
      DTIRatio: 0.38,
      Education: "Bachelor's",
      EmploymentType: 'Full-time',
      MaritalStatus: 'Single',
      HasMortgage: 'No',
      HasDependents: 'No',
      LoanPurpose: 'Auto',
      HasCoSigner: 'No'
    }
  },
  {
    id: 'gig_worker',
    name: 'Gig Worker / Freelancer',
    desc: 'Variable Income, Higher DTI Ratio',
    badge: 'Moderate-High',
    badgeClass: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
    data: {
      Age: 27,
      Income: 42000,
      LoanAmount: 20000,
      CreditScore: 610,
      MonthsEmployed: 18,
      NumCreditLines: 4,
      InterestRate: 14.5,
      LoanTerm: 36,
      DTIRatio: 0.52,
      Education: "Bachelor's",
      EmploymentType: 'Self-employed',
      MaritalStatus: 'Single',
      HasMortgage: 'No',
      HasDependents: 'No',
      LoanPurpose: 'Business',
      HasCoSigner: 'No'
    }
  },
  {
    id: 'subprime',
    name: 'Subprime Applicant',
    desc: 'Low Credit, High DTI & Interest',
    badge: 'High Risk',
    badgeClass: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    data: {
      Age: 23,
      Income: 22000,
      LoanAmount: 40000,
      CreditScore: 480,
      MonthsEmployed: 6,
      NumCreditLines: 4,
      InterestRate: 22.0,
      LoanTerm: 60,
      DTIRatio: 0.78,
      Education: 'High School',
      EmploymentType: 'Unemployed',
      MaritalStatus: 'Single',
      HasMortgage: 'No',
      HasDependents: 'Yes',
      LoanPurpose: 'Other',
      HasCoSigner: 'No'
    }
  }
];

export default function LoanForm({ formData, setFormData, onPredict, isLoading, onReset }) {
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const applyPersona = (persona) => {
    setFormData(persona.data);
  };

  return (
    <div className="space-y-6">
      
      {/* 1-Click Persona Quick Presets */}
      <div className="glass-panel rounded-3xl p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-white">1-Click Persona Presets</h3>
          </div>
          <span className="text-xs text-slate-400">Click any persona to auto-populate form</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PERSONAS.map(persona => (
            <button
              key={persona.id}
              onClick={() => applyPersona(persona)}
              type="button"
              className="text-left p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-cyan-500/40 transition-all duration-200 group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">
                  {persona.name}
                </span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${persona.badgeClass}`}>
                  {persona.badge}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-1">{persona.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={(e) => { e.preventDefault(); if (onPredict) onPredict(); }} className="space-y-6">
        
        {/* Section 1: Financial & Employment */}
        <div className="glass-panel rounded-3xl p-6">
          <div className="flex items-center space-x-2.5 mb-5 pb-3 border-b border-slate-800/80">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Employment & Income Profile</h3>
              <p className="text-xs text-slate-400">Financial capacity, stability, and debt obligations</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Annual Income */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-medium text-slate-300">Annual Income ($)</label>
                <span className="text-cyan-400 font-mono font-bold text-sm">
                  ${Number(formData.Income || 65000).toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="15000"
                max="150000"
                step="1000"
                value={formData.Income || 65000}
                onChange={(e) => handleChange('Income', Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>$15,000 (Min)</span>
                <span>$80,500 (Avg)</span>
                <span>$150,000 (Max)</span>
              </div>
            </div>

            {/* Debt-to-Income (DTI) */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-medium text-slate-300">Debt-to-Income (DTI) Ratio</label>
                <span className={`font-mono font-bold text-sm ${formData.DTIRatio > 0.5 ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {(Number(formData.DTIRatio || 0.35) * 100).toFixed(0)}%
                </span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.95"
                step="0.01"
                value={formData.DTIRatio || 0.35}
                onChange={(e) => handleChange('DTIRatio', Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>5% (Healthy)</span>
                <span>48% (Avg)</span>
                <span>95% (High Risk)</span>
              </div>
            </div>

            {/* Employment Type */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-300">Employment Type</label>
              <div className="grid grid-cols-2 gap-2">
                {['Full-time', 'Part-time', 'Self-employed', 'Unemployed'].map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleChange('EmploymentType', type)}
                    className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all text-center cursor-pointer ${
                      formData.EmploymentType === type
                        ? 'bg-blue-600/20 border-blue-500 text-blue-400 font-semibold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Months Employed */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-medium text-slate-300">Months Employed</label>
                <span className="text-cyan-400 font-mono font-bold text-sm">
                  {formData.MonthsEmployed || 36} mos ({((formData.MonthsEmployed || 36)/12).toFixed(1)} yrs)
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="120"
                step="1"
                value={formData.MonthsEmployed || 36}
                onChange={(e) => handleChange('MonthsEmployed', Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>0 Mos</span>
                <span>58 Mos (Avg)</span>
                <span>120 Mos (10 yrs)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Loan Requirements */}
        <div className="glass-panel rounded-3xl p-6">
          <div className="flex items-center space-x-2.5 mb-5 pb-3 border-b border-slate-800/80">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Loan Request Details</h3>
              <p className="text-xs text-slate-400">Requested principal, interest rate, term, and purpose</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Loan Amount */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-medium text-slate-300">Requested Loan Amount ($)</label>
                <span className="text-emerald-400 font-mono font-bold text-sm">
                  ${Number(formData.LoanAmount || 50000).toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="5000"
                max="250000"
                step="2500"
                value={formData.LoanAmount || 50000}
                onChange={(e) => handleChange('LoanAmount', Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>$5,000</span>
                <span>$131,800 (Avg)</span>
                <span>$250,000</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-medium text-slate-300">Interest Rate (%)</label>
                <span className={`font-mono font-bold text-sm ${formData.InterestRate > 15 ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {Number(formData.InterestRate || 8.5).toFixed(1)}%
                </span>
              </div>
              <input
                type="range"
                min="1.0"
                max="25.0"
                step="0.25"
                value={formData.InterestRate || 8.5}
                onChange={(e) => handleChange('InterestRate', Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>1.0% (Prime)</span>
                <span>13.5% (Avg)</span>
                <span>25.0% (Subprime)</span>
              </div>
            </div>

            {/* Loan Term */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-300">Loan Term (Duration)</label>
              <div className="grid grid-cols-5 gap-2">
                {[12, 24, 36, 48, 60].map(term => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => handleChange('LoanTerm', term)}
                    className={`py-2 rounded-xl text-xs font-medium border transition-all text-center cursor-pointer ${
                      formData.LoanTerm === term
                        ? 'bg-emerald-600/20 border-emerald-500 text-emerald-400 font-semibold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {term}m
                  </button>
                ))}
              </div>
            </div>

            {/* Loan Purpose */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-300">Loan Purpose</label>
              <div className="grid grid-cols-5 gap-1.5">
                {['Auto', 'Business', 'Education', 'Home', 'Other'].map(p => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => handleChange('LoanPurpose', p)}
                    className={`py-2 rounded-xl text-xs font-medium border transition-all text-center cursor-pointer ${
                      formData.LoanPurpose === p
                        ? 'bg-emerald-600/20 border-emerald-500 text-emerald-400 font-semibold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Credit History & Demographics */}
        <div className="glass-panel rounded-3xl p-6">
          <div className="flex items-center space-x-2.5 mb-5 pb-3 border-b border-slate-800/80">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Credit Profile & Demographics</h3>
              <p className="text-xs text-slate-400">Credit score, active lines, education, and age</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Credit Score */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-medium text-slate-300">FICO Credit Score</label>
                <span className={`font-mono font-bold text-sm ${
                  formData.CreditScore >= 700 ? 'text-emerald-400' :
                  formData.CreditScore >= 580 ? 'text-amber-400' : 'text-rose-400'
                }`}>
                  {formData.CreditScore || 680} {formData.CreditScore >= 700 ? '(Good/Prime)' : formData.CreditScore >= 580 ? '(Fair)' : '(Subprime)'}
                </span>
              </div>
              <input
                type="range"
                min="300"
                max="850"
                step="5"
                value={formData.CreditScore || 680}
                onChange={(e) => handleChange('CreditScore', Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>300 (Poor)</span>
                <span>562 (Avg)</span>
                <span>850 (Excellent)</span>
              </div>
            </div>

            {/* Age */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-medium text-slate-300">Applicant Age</label>
                <span className="text-purple-400 font-mono font-bold text-sm">
                  {formData.Age || 35} years
                </span>
              </div>
              <input
                type="range"
                min="18"
                max="75"
                step="1"
                value={formData.Age || 35}
                onChange={(e) => handleChange('Age', Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>18 yrs</span>
                <span>43 yrs (Avg)</span>
                <span>75 yrs</span>
              </div>
            </div>

            {/* Education */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-300">Education Level</label>
              <div className="grid grid-cols-4 gap-2">
                {['High School', "Bachelor's", "Master's", 'PhD'].map(edu => (
                  <button
                    key={edu}
                    type="button"
                    onClick={() => handleChange('Education', edu)}
                    className={`py-2 px-1 rounded-xl text-xs font-medium border transition-all text-center cursor-pointer ${
                      formData.Education === edu
                        ? 'bg-purple-600/20 border-purple-500 text-purple-400 font-semibold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {edu}
                  </button>
                ))}
              </div>
            </div>

            {/* Marital Status & Credit Lines */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-300">Marital Status</label>
                <select
                  value={formData.MaritalStatus || 'Single'}
                  onChange={(e) => handleChange('MaritalStatus', e.target.value)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-purple-500 cursor-pointer"
                >
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-300">Credit Lines</label>
                <div className="grid grid-cols-4 gap-1">
                  {[1, 2, 3, 4].map(num => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => handleChange('NumCreditLines', num)}
                      className={`py-2 rounded-xl text-xs font-medium border transition-all text-center cursor-pointer ${
                        formData.NumCreditLines === num
                          ? 'bg-purple-600/20 border-purple-500 text-purple-400 font-semibold'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Collateral & Guarantees */}
        <div className="glass-panel rounded-3xl p-6">
          <div className="flex items-center space-x-2.5 mb-5 pb-3 border-b border-slate-800/80">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Collateral, Dependents & Guarantees</h3>
              <p className="text-xs text-slate-400">Risk mitigators and household responsibilities</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Has Mortgage */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-200 block">Existing Mortgage?</span>
                <span className="text-[11px] text-slate-500">Home loan liability</span>
              </div>
              <button
                type="button"
                onClick={() => handleChange('HasMortgage', formData.HasMortgage === 'Yes' ? 'No' : 'Yes')}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                  formData.HasMortgage === 'Yes' ? 'bg-amber-500' : 'bg-slate-700'
                }`}
              >
                <span className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                  formData.HasMortgage === 'Yes' ? 'translate-x-7' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {/* Has Dependents */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-200 block">Has Dependents?</span>
                <span className="text-[11px] text-slate-500">Children / family</span>
              </div>
              <button
                type="button"
                onClick={() => handleChange('HasDependents', formData.HasDependents === 'Yes' ? 'No' : 'Yes')}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                  formData.HasDependents === 'Yes' ? 'bg-blue-500' : 'bg-slate-700'
                }`}
              >
                <span className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                  formData.HasDependents === 'Yes' ? 'translate-x-7' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {/* Has Co-Signer */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-200 block">Co-Signer Present?</span>
                <span className="text-[11px] text-slate-500">Second guarantor</span>
              </div>
              <button
                type="button"
                onClick={() => handleChange('HasCoSigner', formData.HasCoSigner === 'Yes' ? 'No' : 'Yes')}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                  formData.HasCoSigner === 'Yes' ? 'bg-emerald-500' : 'bg-slate-700'
                }`}
              >
                <span className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                  formData.HasCoSigner === 'Yes' ? 'translate-x-7' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 text-white font-bold text-sm tracking-wide shadow-xl shadow-cyan-500/25 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-cyan-200" />
            <span>{isLoading ? 'Computing ML Risk Matrix...' : 'Assess Loan Default Risk Now'}</span>
          </button>

          <button
            type="button"
            onClick={onReset}
            className="w-full sm:w-auto py-4 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-semibold text-sm transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-slate-400" />
            <span>Reset</span>
          </button>
        </div>

      </form>
    </div>
  );
}
