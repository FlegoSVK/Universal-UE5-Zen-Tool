import React, { useState, useEffect } from 'react';
import { GameProfile, EngineVersion } from '../types';
import { GAME_ENGINE_DB } from '../constants';
import { Save, Trash, Plus, Sparkles, ClipboardPaste } from 'lucide-react';

interface ProfileTabProps {
  profiles: GameProfile[];
  activeProfileId: string;
  onSelectProfile: (id: string) => void;
  onUpdateProfile: (profile: GameProfile) => void;
  onAddProfile: () => void;
  onDeleteProfile: (id: string) => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({
  profiles,
  activeProfileId,
  onSelectProfile,
  onUpdateProfile,
  onAddProfile,
  onDeleteProfile,
}) => {
  const activeProfile = profiles.find((p) => p.id === activeProfileId);
  const [suggestion, setSuggestion] = useState<{key: string, version: EngineVersion} | null>(null);

  const handlePaste = async (field: keyof GameProfile) => {
    if (!activeProfile) return;
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        onUpdateProfile({ ...activeProfile, [field]: text });
      }
    } catch (err) {
      console.error('Failed to read clipboard', err);
      alert("Nepodarilo sa prečítať schránku. Uistite sa, že ste udelili povolenie.");
    }
  };

  // Auto-detect engine version based on name
  useEffect(() => {
    if (!activeProfile) return;
    
    const lowerName = activeProfile.name.toLowerCase();
    const foundKey = Object.keys(GAME_ENGINE_DB).find(key => lowerName.includes(key));

    if (foundKey) {
        setSuggestion({ key: foundKey, version: GAME_ENGINE_DB[foundKey] });
    } else {
        setSuggestion(null);
    }
  }, [activeProfile?.name]);

  const handleChange = (field: keyof GameProfile, value: string) => {
    if (activeProfile) {
      onUpdateProfile({ ...activeProfile, [field]: value });
    }
  };

  const applySuggestion = () => {
    if (suggestion && activeProfile) {
        onUpdateProfile({ ...activeProfile, engineVersion: suggestion.version });
    }
  };

  if (!activeProfile) return <div className="p-8 text-center text-slate-500">Žiadne profily neboli načítané.</div>;

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto animate-fadeIn">
      
      {/* Header / Selector */}
      <div className="flex items-end gap-4 border-b border-slate-800 pb-6">
        <div className="flex-1">
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Aktuálny Profil Hry</label>
          <div className="relative">
            <select
              value={activeProfileId}
              onChange={(e) => onSelectProfile(e.target.value)}
              className="w-full bg-slate-900 text-white border border-slate-700 rounded-lg p-3 pr-10 appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            >
              {profiles.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-400">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-1">Vyberte hru, ktorú chcete modovať.</p>
        </div>
        <button
          onClick={onAddProfile}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-3 rounded-lg flex items-center gap-2 font-medium transition-colors"
          title="Pridať novú hru"
        >
          <Plus size={18} /> Nová Hra
        </button>
        <button
          onClick={() => onDeleteProfile(activeProfileId)}
          className="bg-slate-800 hover:bg-red-900/50 hover:text-red-400 text-slate-400 px-4 py-3 rounded-lg flex items-center gap-2 transition-colors border border-slate-700 hover:border-red-800"
          disabled={profiles.length <= 1}
          title="Zmazať tento profil"
        >
          <Trash size={18} />
        </button>
      </div>

      {/* Form Fields */}
      <div className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Názov Profilu</label>
            <input
              type="text"
              value={activeProfile.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Napr. Stalker 2"
              className="w-full bg-slate-950 border border-slate-700 rounded p-2.5 text-slate-200 focus:border-blue-500 outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Verzia Enginu (Unreal Version)</label>
            <select
              value={activeProfile.engineVersion}
              onChange={(e) => handleChange('engineVersion', e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded p-2.5 text-slate-200 focus:border-blue-500 outline-none"
            >
              {Object.values(EngineVersion).map((ver) => (
                <option key={ver} value={ver}>{ver}</option>
              ))}
            </select>
            
            {/* Auto-Suggestion Badge */}
            {suggestion && activeProfile.engineVersion !== suggestion.version && (
                <button 
                    onClick={applySuggestion}
                    className="mt-2 w-full text-left flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 p-2 rounded text-xs text-amber-200 hover:bg-amber-500/20 transition-colors group"
                >
                    <Sparkles size={14} className="text-amber-400 animate-pulse" />
                    <span>
                        Rozpoznaná hra <strong>{suggestion.key}</strong>. 
                        Odporučená verzia: <span className="font-bold text-amber-400 decoration-amber-400 underline decoration-dotted">{suggestion.version}</span>
                    </span>
                    <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity font-bold text-amber-400">Použiť</span>
                </button>
            )}
            
            {!suggestion && (
                <p className="text-xs text-slate-600 mt-1">Dôležité pre správne balenie (Grounded 2 je zvyčajne 5.3 alebo 5.4).</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">Koreňový Priečinok Hry (Root Path)</label>
          <div className="flex gap-2">
            <input
                type="text"
                value={activeProfile.rootPath}
                onChange={(e) => handleChange('rootPath', e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-700 rounded p-2.5 text-slate-200 focus:border-blue-500 outline-none font-mono text-sm"
                placeholder="Napr. C:\XboxGames\Grounded2"
            />
            <button 
                onClick={() => handlePaste('rootPath')}
                className="bg-slate-800 p-2.5 rounded border border-slate-700 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                title="Prilepiť text zo schránky"
            >
                <ClipboardPaste size={18} />
            </button>
          </div>
          <p className="text-xs text-slate-600 mt-1">Hlavný priečinok inštalácie hry (napr. steamapps/common/GameName).</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">Priečinok s .pak súbormi (Paks Path)</label>
          <div className="flex gap-2">
            <input
                type="text"
                value={activeProfile.paksPath}
                onChange={(e) => handleChange('paksPath', e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-700 rounded p-2.5 text-slate-200 focus:border-blue-500 outline-none font-mono text-sm"
                placeholder="Napr. C:\XboxGames\Grounded2\Maine\Content\Paks"
            />
             <button 
                onClick={() => handlePaste('paksPath')}
                className="bg-slate-800 p-2.5 rounded border border-slate-700 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                title="Prilepiť text zo schránky"
            >
                <ClipboardPaste size={18} />
            </button>
          </div>
          <p className="text-xs text-slate-600 mt-1">Zvyčajne v: Game/Content/Paks. Tu program hľadá .utoc a .ucas súbory.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">AES Kľúč <span className="text-slate-600 text-xs">(Voliteľné)</span></label>
          <input
            type="text"
            value={activeProfile.aesKey}
            onChange={(e) => handleChange('aesKey', e.target.value)}
            placeholder="0x..."
            className="w-full bg-slate-950 border border-slate-700 rounded p-2.5 text-slate-200 focus:border-blue-500 outline-none font-mono text-sm"
          />
          <p className="text-xs text-slate-600 mt-1">Hexadecimálny kľúč potrebný len ak sú súbory hry šifrované.</p>
        </div>

        <div className="pt-4 flex justify-end">
           <button
            onClick={() => {/* Mock save action */}}
            className="bg-green-700 hover:bg-green-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors shadow-lg shadow-green-900/20"
          >
            <Save size={18} /> Uložiť Nastavenia Profilu
          </button>
        </div>
      </div>
    </div>
  );
};