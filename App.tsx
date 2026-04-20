import React, { useState, useEffect } from 'react';
import { GameProfile, AppSettings, EngineVersion, ToolType } from './types';
import { DEFAULT_PROFILE, DEFAULT_SETTINGS, MOCK_PROFILES } from './constants';
import { ProfileTab } from './components/ProfileTab';
import { OperationsTab } from './components/OperationsTab';
import { SettingsTab } from './components/SettingsTab';
import { Gamepad2, Settings, Wrench, Boxes, Zap, Archive } from 'lucide-react';

const TABS = [
  { id: 'profiles', label: 'Profily Hier', icon: Gamepad2 },
  { id: 'ops', label: 'Operácie', icon: Wrench },
  { id: 'settings', label: 'Nastavenia', icon: Settings },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profiles');
  
  // --- PERSISTENCE LOGIC START ---
  // Load Profiles from LocalStorage or fallback to MOCK/Default
  const [profiles, setProfiles] = useState<GameProfile[]>(() => {
    try {
      const savedProfiles = localStorage.getItem('ue5_tool_profiles');
      return savedProfiles ? JSON.parse(savedProfiles) : MOCK_PROFILES;
    } catch (e) {
      console.error("Failed to load profiles", e);
      return MOCK_PROFILES;
    }
  });

  const [activeProfileId, setActiveProfileId] = useState<string>(() => {
     // Try to restore last active profile
     return profiles.length > 0 ? profiles[0].id : '';
  });

  // Load Settings from LocalStorage or fallback to Default
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const savedSettings = localStorage.getItem('ue5_tool_settings');
      return savedSettings ? JSON.parse(savedSettings) : DEFAULT_SETTINGS;
    } catch (e) {
      console.error("Failed to load settings", e);
      return DEFAULT_SETTINGS;
    }
  });
  // --- PERSISTENCE LOGIC END ---
  
  // Lifted state for Tool Selection
  const [activeTool, setActiveTool] = useState<ToolType>(ToolType.RETOC);

  // Helper to find the active profile object
  const activeProfile = profiles.find(p => p.id === activeProfileId) || profiles[0];

  // Save Settings whenever they change
  useEffect(() => {
    localStorage.setItem('ue5_tool_settings', JSON.stringify(settings));
  }, [settings]);

  // Save Profiles whenever they change
  useEffect(() => {
    localStorage.setItem('ue5_tool_profiles', JSON.stringify(profiles));
  }, [profiles]);

  // --- Profile Actions ---
  const handleAddProfile = () => {
    const newId = Math.random().toString(36).substr(2, 5);
    const newProfile = { ...DEFAULT_PROFILE, id: newId, name: `Nová Hra ${newId}` };
    setProfiles([...profiles, newProfile]);
    setActiveProfileId(newId);
  };

  const handleDeleteProfile = (id: string) => {
    if (profiles.length <= 1) return;
    const newProfiles = profiles.filter(p => p.id !== id);
    setProfiles(newProfiles);
    setActiveProfileId(newProfiles[0].id);
  };

  const handleUpdateProfile = (updated: GameProfile) => {
    setProfiles(profiles.map(p => p.id === updated.id ? updated : p));
  };

  return (
    <div className="flex h-screen w-full bg-slate-950 text-slate-200 overflow-hidden">
      {/* Sidebar / Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        
        {/* Top Navigation */}
        <header className="bg-slate-900 border-b border-slate-800 h-16 flex items-center justify-between px-6 shrink-0 gap-6">
          
          {/* Logo */}
          <div className="flex items-center gap-3 min-w-fit">
             <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg shadow-blue-500/20">
                <Boxes className="text-white" size={20} />
             </div>
             <h1 className="text-xl font-bold tracking-tight text-white hidden lg:block">Universal <span className="text-blue-500">UE5 Zen</span> Tool</h1>
          </div>

          {/* Tool Selector (Center) */}
          <div className="flex-1 flex justify-center max-w-xl">
             <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 shadow-sm w-full">
                <button 
                  onClick={() => setActiveTool(ToolType.RETOC)}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-1.5 rounded text-xs font-bold transition-all ${
                    activeTool === ToolType.RETOC 
                      ? 'bg-blue-600 text-white shadow' 
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                  title="Odporúčané pre väčšinu hier"
                >
                   <Archive size={14} />
                   <div className="flex flex-col items-start leading-none">
                      <span>Retoc</span>
                      <span className="text-[9px] opacity-80 font-normal">Legacy (Odporúčané)</span>
                   </div>
                </button>
                <button 
                  onClick={() => setActiveTool(ToolType.CASTOC)}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-1.5 rounded text-xs font-bold transition-all ${
                    activeTool === ToolType.CASTOC 
                      ? 'bg-purple-600 text-white shadow' 
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                  title="Experimentálna podpora"
                >
                   <Zap size={14} />
                   <div className="flex flex-col items-start leading-none">
                      <span>Castoc</span>
                      <span className="text-[9px] opacity-80 font-normal">Moderné / Exp.</span>
                   </div>
                </button>
             </div>
          </div>
          
          {/* Tabs Navigation */}
          <nav className="flex gap-1 bg-slate-800/50 p-1 rounded-lg min-w-fit">
            {TABS.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-slate-700 text-white shadow-sm' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon size={16} />
                  <span className="hidden md:inline">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-slate-950 relative p-0">
          <div className="h-full">
            {activeTab === 'profiles' && (
              <ProfileTab 
                profiles={profiles}
                activeProfileId={activeProfileId}
                onSelectProfile={setActiveProfileId}
                onUpdateProfile={handleUpdateProfile}
                onAddProfile={handleAddProfile}
                onDeleteProfile={handleDeleteProfile}
              />
            )}
            {activeTab === 'ops' && (
              <OperationsTab 
                activeProfile={activeProfile}
                settings={settings}
                activeTool={activeTool}
              />
            )}
            {activeTab === 'settings' && (
              <SettingsTab 
                settings={settings}
                onUpdateSettings={setSettings}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;