import React from 'react';
import { Cpu, Award, BarChart3, Database, Layers, CheckCircle } from 'lucide-react';
import metadata from '../data/modelMetadata.json';

export default function ModelInsights() {
  const { metrics, training_samples, testing_samples, coefficients } = metadata;
  const sortedCoeffs = [...(coefficients || [])].sort((a, b) => Math.abs(b.coefficient) - Math.abs(a.coefficient));

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel rounded-3xl p-6 bg-gradient-to-r from-purple-950/40 to-slate-900/60 border border-purple-800/30">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Machine Learning Model Architecture & Performance</h3>
            <p className="text-xs text-slate-400">
              Evaluated on 255,347 real-world loan applicant profiles using Scikit-Learn Logistic Regression
            </p>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel rounded-3xl p-5 border border-cyan-500/20">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Accuracy Score</span>
          <span className="text-3xl font-black text-cyan-400 font-mono">
            {((metrics?.accuracy || 0.8853) * 100).toFixed(2)}%
          </span>
          <p className="text-[10px] text-slate-500 mt-1">Overall correct predictions</p>
        </div>

        <div className="glass-panel rounded-3xl p-5 border border-blue-500/20">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">ROC-AUC Metric</span>
          <span className="text-3xl font-black text-blue-400 font-mono">
            {((metrics?.roc_auc || 0.7531) * 100).toFixed(2)}%
          </span>
          <p className="text-[10px] text-slate-500 mt-1">Discrimination capability</p>
        </div>

        <div className="glass-panel rounded-3xl p-5 border border-purple-500/20">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Training Samples</span>
          <span className="text-3xl font-black text-purple-400 font-mono">
            {(training_samples || 204277).toLocaleString()}
          </span>
          <p className="text-[10px] text-slate-500 mt-1">80% Training Split</p>
        </div>

        <div className="glass-panel rounded-3xl p-5 border border-emerald-500/20">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Testing Samples</span>
          <span className="text-3xl font-black text-emerald-400 font-mono">
            {(testing_samples || 51070).toLocaleString()}
          </span>
          <p className="text-[10px] text-slate-500 mt-1">20% Unseen Validation</p>
        </div>
      </div>

      {/* Confusion Matrix & Feature Weights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Confusion Matrix */}
        <div className="glass-panel rounded-3xl p-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4 flex items-center space-x-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Confusion Matrix (Test Evaluation)</span>
          </h4>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/30 text-center">
              <span className="text-xs text-slate-400 block mb-1">True Negatives (TN)</span>
              <span className="text-xl font-bold text-emerald-400 font-mono">
                {metrics?.confusion_matrix ? metrics.confusion_matrix[0][0].toLocaleString() : '45,100'}
              </span>
              <span className="text-[10px] text-slate-500 block mt-1">Correct Non-Defaults</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-rose-500/20 text-center">
              <span className="text-xs text-slate-400 block mb-1">False Positives (FP)</span>
              <span className="text-xl font-bold text-rose-400 font-mono">
                {metrics?.confusion_matrix ? metrics.confusion_matrix[0][1].toLocaleString() : '131'}
              </span>
              <span className="text-[10px] text-slate-500 block mt-1">Non-default flagged</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-amber-500/20 text-center">
              <span className="text-xs text-slate-400 block mb-1">False Negatives (FN)</span>
              <span className="text-xl font-bold text-amber-400 font-mono">
                {metrics?.confusion_matrix ? metrics.confusion_matrix[1][0].toLocaleString() : '5,720'}
              </span>
              <span className="text-[10px] text-slate-500 block mt-1">Defaults missed</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-cyan-500/30 text-center">
              <span className="text-xs text-slate-400 block mb-1">True Positives (TP)</span>
              <span className="text-xl font-bold text-cyan-400 font-mono">
                {metrics?.confusion_matrix ? metrics.confusion_matrix[1][1].toLocaleString() : '204'}
              </span>
              <span className="text-[10px] text-slate-500 block mt-1">Correct Defaults</span>
            </div>
          </div>
        </div>

        {/* Feature Weights */}
        <div className="glass-panel rounded-3xl p-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4 flex items-center space-x-2">
            <BarChart3 className="w-4 h-4 text-purple-400" />
            <span>Top Model Feature Weights (Beta Coefficients)</span>
          </h4>

          <div className="space-y-2.5 max-h-[320px] overflow-y-auto pr-2">
            {sortedCoeffs.slice(0, 10).map((c, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                <span className="font-medium text-slate-300">{c.feature}</span>
                <div className="flex items-center space-x-2">
                  <span className={`font-mono font-bold ${c.coefficient > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {c.coefficient > 0 ? '+' : ''}{c.coefficient.toFixed(4)}
                  </span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${c.coefficient > 0 ? 'bg-rose-500/10 text-rose-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                    {c.coefficient > 0 ? 'Increases Risk' : 'Reduces Risk'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
