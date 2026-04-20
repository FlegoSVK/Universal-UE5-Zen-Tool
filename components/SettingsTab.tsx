import React, { useState, useEffect } from 'react';
import { AppSettings, GithubRelease } from '../types';
import { checkUpdate } from '../services/githubService';
import { Download, RefreshCw, CheckCircle, Github, ClipboardPaste } from 'lucide-react';

interface SettingsTabProps {
  settings: AppSettings;
  onUpdateSettings: (settings: AppSettings) => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({ settings, onUpdateSettings }) => {
  const [retocRelease, setRetocRelease] = useState<GithubRelease | null>(null);
  const [guiRelease, setGuiRelease] = useState<GithubRelease | null>(null);
  const [loading, setLoading] = useState(false);

  // --- Paste Logic ---
  const handlePaste = async (field: keyof AppSettings) => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        onUpdateSettings({ ...settings, [field]: text });
      }
    } catch (err) {
      console.error('Failed to read clipboard', err);
      alert("Nepodarilo sa prečítať schránku. Uistite sa, že ste udelili povolenie.");
    }
  };

  const handleCheckUpdates = async () => {
    setLoading(true);
    const rRelease = await checkUpdate("trumank", "retoc");
    const gRelease = await checkUpdate("atenfyr", "UAssetGUI");
    setRetocRelease(rRelease);
    setGuiRelease(gRelease);
    setLoading(false);
  };

  useEffect(() => {
    handleCheckUpdates();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Tool Paths */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-2">Konfigurácia Nástrojov</h3>
        
        <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Cesta k retoc.exe</label>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={settings.retocPath}
                    onChange={(e) => onUpdateSettings({...settings, retocPath: e.target.value})}
                    className="flex-1 bg-slate-950 border border-slate-700 rounded p-3 text-slate-200 focus:border-blue-500 outline-none font-mono text-sm shadow-inner"
                    placeholder="Napr. F:\Preklady\Grounded 2\retoc.exe"
                />
                <button 
                    onClick={() => handlePaste('retocPath')}
                    className="bg-slate-800 p-3 rounded border border-slate-700 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                    title="Prilepiť text zo schránky"
                >
                    <ClipboardPaste size={18} />
                </button>
            </div>
        </div>

        <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Cesta k castoc.exe</label>
             <div className="flex gap-2">
                <input
                    type="text"
                    value={settings.castocPath}
                    onChange={(e) => onUpdateSettings({...settings, castocPath: e.target.value})}
                    className="flex-1 bg-slate-950 border border-slate-700 rounded p-3 text-slate-200 focus:border-blue-500 outline-none font-mono text-sm shadow-inner"
                    placeholder="Napr. C:\Tools\castoc.exe"
                />
                <button 
                    onClick={() => handlePaste('castocPath')}
                    className="bg-slate-800 p-3 rounded border border-slate-700 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                    title="Prilepiť text zo schránky"
                >
                    <ClipboardPaste size={18} />
                </button>
            </div>
             <p className="text-xs text-slate-600 mt-1">Alternatívny nástroj (voliteľné).</p>
        </div>
      </section>

      {/* Update Checker */}
      <section className="space-y-4">
        <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <h3 className="text-lg font-bold text-white">Kontrola Aktualizácií</h3>
            <button 
                onClick={handleCheckUpdates}
                disabled={loading}
                className="text-sm bg-slate-800 hover:bg-slate-700 text-blue-400 px-3 py-1.5 rounded flex items-center gap-2 transition-colors disabled:opacity-50"
            >
                <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Skontrolovať Teraz
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Retoc Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Github size={16} />
                        <span className="font-bold text-slate-200">trumank/retoc</span>
                    </div>
                    {retocRelease ? (
                         <div className="text-sm text-green-400 flex items-center gap-2">
                            <CheckCircle size={12} /> 
                            <span>{retocRelease.tag_name}</span>
                            {retocRelease.prerelease && (
                                <span className="text-[10px] bg-amber-500/10 text-amber-500 border border-amber-500/20 px-1.5 rounded uppercase font-bold tracking-wider">
                                    Pre-release
                                </span>
                            )}
                         </div>
                    ) : (
                        <div className="text-sm text-slate-500">Kontrolujem...</div>
                    )}
                </div>
                {retocRelease && (
                    <a href={retocRelease.html_url} target="_blank" rel="noreferrer" className="bg-slate-800 hover:bg-slate-700 p-2 rounded text-slate-300" title="Otvoriť na GitHub">
                        <Download size={18} />
                    </a>
                )}
            </div>

             {/* UAssetGUI Card */}
             <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Github size={16} />
                        <span className="font-bold text-slate-200">atenfyr/UAssetGUI</span>
                    </div>
                    {guiRelease ? (
                         <div className="text-sm text-green-400 flex items-center gap-2">
                            <CheckCircle size={12} /> 
                            <span>{guiRelease.tag_name}</span>
                            {guiRelease.prerelease && (
                                <span className="text-[10px] bg-purple-500/10 text-purple-400 border border-purple-500/20 px-1.5 rounded uppercase font-bold tracking-wider">
                                    Experimental
                                </span>
                            )}
                         </div>
                    ) : (
                        <div className="text-sm text-slate-500">Kontrolujem...</div>
                    )}
                </div>
                {guiRelease && (
                    <a href={guiRelease.html_url} target="_blank" rel="noreferrer" className="bg-slate-800 hover:bg-slate-700 p-2 rounded text-slate-300" title="Otvoriť na GitHub">
                        <Download size={18} />
                    </a>
                )}
            </div>
        </div>
      </section>
    </div>
  );
};