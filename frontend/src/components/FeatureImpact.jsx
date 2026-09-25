import React from 'react';
import { Sparkles, TrendingUp, TrendingDown, Info } from 'lucide-react';

export default function FeatureImpact({ predictionData }) {
  if (!predictionData || !predictionData.top_risk_factors) {
    return (
      <div className="glass-panel rounded-3xl p-8 text-center text-slate-400">
        Please assess an applicant first to view Explainable AI (XAI) feature factor impacts.
      </div>
    );
  }

  const factors = predictionData.top_risk_factors;

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="glass-panel rounded-3xl p-6 bg-gradient-to-r from-blue-950/40 to-indigo-950/40 border border-blue-800/30">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Explainable AI (XAI) Feature Attribution</h3>
            <p className="text-xs text-slate-400">
              Decomposition of model decision: shows which borrower attributes are increasing or reducing default risk
            </p>
          </div>
        </div>
      </div>

      {/* Factors List */}
      <div className="glass-panel rounded-3xl p-6">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
          Top Significant Feature Influences
        </h4>

        <div className="space-y-4">
          {factors.map((f, idx) => {
            const isRiskIncreaser = f.direction === 'increases_risk';
            const impactPct = Math.min(100, Math.abs(f.impact) * 40);

            return (
              <div key={idx} className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className={`p-1.5 rounded-lg ${isRiskIncreaser ? 'bg-rose-500/10 text-rose-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                      {isRiskIncreaser ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-200 block">
                        {f.feature.replace('_', ': ')}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        Input Value: <span className="font-mono text-slate-300">{String(f.raw_value)}</span>
                      </span>
                    </div>
                  </div>

                <div className="text-right">
                  <span className={`text-xs font-mono font-bold ${isRiskIncreaser ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {isRiskIncreaser ? '+ Risk' : '- Risk'} ({Math.abs(f.impact).toFixed(3)})
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    Weight: {f.coefficient > 0 ? '+' : ''}{f.coefficient.toFixed(3)}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${isRiskIncreaser ? 'bg-rose-500' : 'bg-emerald-500'}`}
                  style={{ width: `${Math.max(8, impactPct)}%` }}
                />
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}
