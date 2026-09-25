import React from 'react';
import { ShieldCheck, AlertTriangle, XCircle, DollarSign, PieChart, CheckCircle2 } from 'lucide-react';

export default function RiskMeter({ predictionData, formData }) {
  if (!predictionData) {
    return (
      <div className="glass-panel rounded-3xl p-8 text-center flex flex-col items-center justify-center min-h-[420px]">
        <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-4 text-slate-500 animate-pulse">
          <PieChart className="w-8 h-8" />
        </div>
        <h4 className="text-base font-bold text-slate-200 mb-1">No Active Risk Assessment</h4>
        <p className="text-xs text-slate-400 max-w-xs">
          Adjust the loan parameters on the left and click "Assess Loan Default Risk Now" to calculate risk probability.
        </p>
      </div>
    );
  }

  const prob = predictionData.default_probability ?? 0;
  const isApproved = prob < 50;

  const radius = 70;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (prob / 100) * circumference;

  let badgeBorder = 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400';
  let strokeColor = '#10b981';
  let StatusIcon = CheckCircle2;

  if (prob >= 50) {
    badgeBorder = 'border-rose-500/30 bg-rose-500/10 text-rose-400';
    strokeColor = '#f43f5e';
    StatusIcon = XCircle;
  } else if (prob >= 20) {
    badgeBorder = 'border-amber-500/30 bg-amber-500/10 text-amber-400';
    strokeColor = '#f59e0b';
    StatusIcon = AlertTriangle;
  }

  return (
    <div className="space-y-5">
      <div className="glass-panel rounded-3xl p-6 relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <StatusIcon className={`w-5 h-5 ${strokeColor === '#10b981' ? 'text-emerald-400' : strokeColor === '#f59e0b' ? 'text-amber-400' : 'text-rose-400'}`} />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Risk Scoring Output</span>
          </div>
          <span className={`text-xs font-bold px-3 py-1 rounded-full border ${badgeBorder}`}>
            {predictionData.risk_tier}
          </span>
        </div>

        {/* Gauge */}
        <div className="flex flex-col items-center justify-center my-4 relative">
          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg height="176" width="176" className="transform -rotate-90">
              <circle
                stroke="#1e293b"
                fill="transparent"
                strokeWidth={stroke}
                r={normalizedRadius}
                cx="88"
                cy="88"
              />
              <circle
                stroke={strokeColor}
                fill="transparent"
                strokeWidth={stroke}
                strokeDasharray={circumference + ' ' + circumference}
                style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.8s ease-in-out' }}
                strokeLinecap="round"
                r={normalizedRadius}
                cx="88"
                cy="88"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-black text-white tracking-tight font-mono">
                {prob.toFixed(1)}%
              </span>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Default Risk
              </span>
            </div>
          </div>

          <div className="w-full mt-4 text-center p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
            <p className="text-xs font-semibold text-slate-200">
              {predictionData.decision}
            </p>
          </div>
        </div>

        {/* Financial Matrix */}
        <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-800/80">
          <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800/60">
            <span className="text-[11px] text-slate-400 block mb-1">Estimated Monthly EMI</span>
            <div className="flex items-center space-x-1">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-bold text-white font-mono">
                ${Number(predictionData.estimated_monthly_payment || 0).toLocaleString()}
              </span>
            </div>
            <span className="text-[10px] text-slate-500 block mt-0.5">
              Over {formData.LoanTerm || 36} months
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800/60">
            <span className="text-[11px] text-slate-400 block mb-1">Monthly Income Burden</span>
            <div className="flex items-center space-x-1">
              <PieChart className="w-4 h-4 text-cyan-400" />
              <span className={`text-sm font-bold font-mono ${predictionData.emi_to_income_ratio > 40 ? 'text-rose-400' : 'text-cyan-400'}`}>
                {predictionData.emi_to_income_ratio || 0}%
              </span>
            </div>
            <span className="text-[10px] text-slate-500 block mt-0.5">
              Of ${Math.round((formData.Income || 65000)/12).toLocaleString()}/mo
            </span>
          </div>
        </div>
      </div>

      {/* Policy Assessment */}
      <div className="glass-panel rounded-3xl p-5 border-l-4 border-l-blue-500">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-blue-400" />
          <span>Underwriting Policy Assessment</span>
        </h4>
        <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
          {isApproved ? (
            <>
              <li className="text-emerald-300">Applicant is within acceptable default risk threshold (&lt;50%).</li>
              <li>Income and employment stability support repayment capability.</li>
              {formData.HasCoSigner === 'Yes' && <li className="text-cyan-300">Co-signer provides additional credit security.</li>}
            </>
          ) : (
            <>
              <li className="text-rose-300">Default probability exceeds risk threshold (50%).</li>
              <li>Recommend requiring additional guarantor or collateral.</li>
              <li>Consider restructuring with lower principal or longer term.</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
