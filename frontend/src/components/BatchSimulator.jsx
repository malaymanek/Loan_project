import React, { useState } from 'react';
import { Play, Sparkles, AlertCircle, CheckCircle2, TrendingUp, Layers, RefreshCw } from 'lucide-react';
import { predictBatchInBrowser } from '../utils/mlEngine';

export default function BatchSimulator({ onSelectApplicant }) {
  const [batchSize, setBatchSize] = useState(15);
  const [results, setResults] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [filter, setFilter] = useState('ALL');

  const runSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      const simulatedData = predictBatchInBrowser(batchSize);
      setResults(simulatedData);
      setIsSimulating(false);
    }, 400);
  };

  const filteredResults = results?.filter(r => {
    if (filter === 'ALL') return true;
    if (filter === 'HIGH') return r.risk_tier.includes('High') || r.risk_tier.includes('Very High');
    if (filter === 'MODERATE') return r.risk_tier.includes('Moderate');
    if (filter === 'LOW') return r.risk_tier.includes('Low');
    return true;
  });

  const highRiskCount = results ? results.filter(r => r.prediction === 1).length : 0;
  const defaultRate = results ? ((highRiskCount / results.length) * 100).toFixed(1) : 0;
  const totalExposure = results ? results.reduce((sum, r) => sum + r.LoanAmount, 0) : 0;
  const atRiskCapital = results ? results.filter(r => r.prediction === 1).reduce((sum, r) => sum + r.LoanAmount, 0) : 0;

  return (
    <div className="space-y-6">
      {/* Simulation Controls Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-700/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-6 h-6 text-indigo-400" />
            Portfolio Batch Risk Stress-Tester
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Simulate diverse synthetic loan applicant cohorts to analyze portfolio-level default exposure and risk distributions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-2 rounded-xl border border-slate-700">
            <span className="text-xs text-slate-400 font-medium">Cohort Size:</span>
            <select
              value={batchSize}
              onChange={(e) => setBatchSize(Number(e.target.value))}
              className="bg-transparent text-white font-bold text-sm focus:outline-none cursor-pointer"
            >
              <option value={10} className="bg-slate-800">10 Applicants</option>
              <option value={20} className="bg-slate-800">20 Applicants</option>
              <option value={50} className="bg-slate-800">50 Applicants</option>
              <option value={100} className="bg-slate-800">100 Applicants</option>
            </select>
          </div>

          <button
            onClick={runSimulation}
            disabled={isSimulating}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSimulating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Simulating...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                Simulate Portfolio
              </>
            )}
          </button>
        </div>
      </div>

      {/* Results Overview Metrics */}
      {results && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="glass-panel p-4 rounded-xl border border-slate-700/50">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Simulated Cohort</span>
              <div className="text-2xl font-bold text-white mt-1">{results.length} Profiles</div>
              <span className="text-xs text-indigo-400">Processed in-memory</span>
            </div>

            <div className="glass-panel p-4 rounded-xl border border-slate-700/50">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Predicted Default Rate</span>
              <div className="text-2xl font-bold text-amber-400 mt-1">{defaultRate}%</div>
              <span className="text-xs text-slate-400">{highRiskCount} / {results.length} flagged high-risk</span>
            </div>

            <div className="glass-panel p-4 rounded-xl border border-slate-700/50">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Portfolio Value</span>
              <div className="text-2xl font-bold text-white mt-1">${(totalExposure / 1000).toFixed(0)}k</div>
              <span className="text-xs text-slate-400">Aggregate loan sum</span>
            </div>

            <div className="glass-panel p-4 rounded-xl border border-slate-700/50">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Capital at Risk</span>
              <div className="text-2xl font-bold text-rose-400 mt-1">${(atRiskCapital / 1000).toFixed(0)}k</div>
              <span className="text-xs text-rose-400/80">{((atRiskCapital / (totalExposure || 1)) * 100).toFixed(1)}% of total capital</span>
            </div>
          </div>

          {/* Table with Filter Tabs */}
          <div className="glass-panel rounded-2xl border border-slate-700/60 overflow-hidden">
            <div className="p-4 bg-slate-900/60 border-b border-slate-700/60 flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-semibold text-white text-sm">Batch Applicant Records</h3>
              <div className="flex gap-1.5 bg-slate-800/80 p-1 rounded-lg border border-slate-700">
                {['ALL', 'HIGH', 'MODERATE', 'LOW'].map(t => (
                  <button
                    key={t}
                    onClick={() => setFilter(t)}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                      filter === t ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-900/90 text-slate-400 text-xs uppercase font-medium border-b border-slate-800">
                  <tr>
                    <th className="px-4 py-3">Applicant ID</th>
                    <th className="px-4 py-3">Income / Credit</th>
                    <th className="px-4 py-3">Loan Amount</th>
                    <th className="px-4 py-3">DTI / Int. Rate</th>
                    <th className="px-4 py-3">Default Risk</th>
                    <th className="px-4 py-3">Risk Tier</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredResults.map((r, i) => {
                    const isHigh = r.prediction === 1;
                    return (
                      <tr key={i} className="hover:bg-slate-800/40 transition-colors">
                        <td className="px-4 py-3 font-mono text-xs text-indigo-300">
                          {r.id || `APP-${1000 + i}`}
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-medium text-white">${r.Income.toLocaleString()}</div>
                          <div className="text-xs text-slate-400 font-mono">Score: {r.CreditScore}</div>
                        </td>
                        <td className="px-4 py-3 text-slate-200 font-medium">
                          ${r.LoanAmount.toLocaleString()}
                          <div className="text-xs text-slate-400">{r.LoanTerm} mos @ {r.InterestRate}%</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-slate-300 font-medium">{(r.DTIRatio * 100).toFixed(0)}%</div>
                          <div className="text-xs text-slate-400">{r.EmploymentType}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 rounded-full bg-slate-700 overflow-hidden">
                              <div
                                className={`h-full ${
                                  r.default_probability > 0.6
                                    ? 'bg-rose-500'
                                    : r.default_probability > 0.3
                                    ? 'bg-amber-500'
                                    : 'bg-emerald-500'
                                }`}
                                style={{ width: `${r.default_probability * 100}%` }}
                              />
                            </div>
                            <span className="font-mono text-xs text-white">
                              {(r.default_probability * 100).toFixed(1)}%
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                              isHigh
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                : r.default_probability > 0.3
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            }`}
                          >
                            {r.risk_tier}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => onSelectApplicant && onSelectApplicant(r)}
                            className="px-3 py-1 bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white rounded-lg text-xs font-medium transition-all cursor-pointer border border-slate-700 hover:border-indigo-500"
                          >
                            Inspect &rarr;
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Initial Empty State */}
      {!results && (
        <div className="glass-panel p-12 rounded-2xl border border-dashed border-slate-700 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
            <Sparkles className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white">Generate Instant Cohort Simulation</h3>
          <p className="text-slate-400 text-sm max-w-md mt-1 mb-6">
            Click simulate above to test how our machine learning pipeline segments high volumes of applicants across various credit brackets.
          </p>
          <button
            onClick={runSimulation}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            Launch 15-Applicant Test Run
          </button>
        </div>
      )}
    </div>
  );
}
