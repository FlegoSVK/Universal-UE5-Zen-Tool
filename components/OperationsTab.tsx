import React, { useState } from 'react';
import { GameProfile, ToolType, AppSettings } from '../types';
import { PackageOpen, Box, FileText, Copy, Check, ClipboardPaste, Terminal, AlertCircle } from 'lucide-react';

interface OperationsTabProps {
  activeProfile: GameProfile;
  settings: AppSettings;
  activeTool: ToolType;
}

export const OperationsTab: React.FC<OperationsTabProps> = ({ activeProfile, settings, activeTool }) => {
  // Extraction States
  const [filterPath, setFilterPath] = useState('');
  const [extractOutputPath, setExtractOutputPath] = useState('D:\\Modding\\Extracted');

  // Packing States
  const [modSource, setModSource] = useState('');
  const [packDestFolder, setPackDestFolder] = useState(''); 
  
  // Naming parts based on: z_Grounded2_SK_300_P
  const [modNameStr, setModNameStr] = useState('Grounded2');
  const [modChunkId, setModChunkId] = useState('300');

  // Command Output State
  const [generatedCommand, setGeneratedCommand] = useState('');
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handlePaste = async (setter: (val: string) => void) => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setter(text);
      }
    } catch (err) {
      console.error('Failed to read clipboard', err);
      alert("Nepodarilo sa prečítať schránku. Uistite sa, že ste udelili povolenie.");
    }
  };

  const handleGenerateCommand = (type: 'extract' | 'pack') => {
      setErrorMsg(null);
      let cmd = "";
      let toolPath = activeTool === ToolType.RETOC ? settings.retocPath : settings.castocPath;
      
      // Basic validation
      if (!toolPath) toolPath = activeTool === ToolType.RETOC ? "retoc.exe" : "castoc.exe";

      if (type === 'extract') {
          if (!filterPath || !extractOutputPath) {
              setErrorMsg("Chyba: Vyplňte cestu filtra a výstupný priečinok.");
              return;
          }

          // Syntax: & "Path\To\Tool.exe" to-legacy "PaksPath" "OutputPath" --filter "FilterPath"
          if (activeTool === ToolType.RETOC) {
              cmd = `& "${toolPath}" to-legacy "${activeProfile.paksPath}" "${extractOutputPath}" --filter "${filterPath}"`;
              if (activeProfile.aesKey) {
                  cmd += ` --aes "${activeProfile.aesKey}"`;
              }
          } else {
              // Castoc fallback
              cmd = `& "${toolPath}" extract "${activeProfile.paksPath}" "${extractOutputPath}" --filter "${filterPath}"`;
              if (activeProfile.aesKey) {
                  cmd += ` --aes-key "${activeProfile.aesKey}"`;
              }
          }

      } else {
          // PACKING
          if (!modSource || !packDestFolder) {
              setErrorMsg("Chyba: Vyplňte zdrojový a cieľový priečinok.");
              return;
          }

          const finalFileName = `z_${modNameStr}_SK_${modChunkId}_P.utoc`;
          const fullOutputFilePath = `${packDestFolder}\\${finalFileName}`;

          // Syntax: & "Path\To\Tool.exe" to-zen --version UE5_X "SourcePath" "OutputFile"
          if (activeTool === ToolType.RETOC) {
              cmd = `& "${toolPath}" to-zen --version ${activeProfile.engineVersion} "${modSource}" "${fullOutputFilePath}"`;
          } else {
              // Castoc fallback
              cmd = `& "${toolPath}" pack "${modSource}" -o "${fullOutputFilePath}" -v ${activeProfile.engineVersion}`;
          }
      }

      setGeneratedCommand(cmd);
      setCopied(false);
  };

  const copyToClipboard = () => {
      navigator.clipboard.writeText(generatedCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full animate-fadeIn">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-5xl mx-auto space-y-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Section A: Extraction */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col shadow-xl">
                <div className="bg-slate-850 p-4 border-b border-slate-800 flex items-center gap-3">
                <div className="bg-amber-500/10 p-2 rounded-lg text-amber-500">
                    <PackageOpen size={24} />
                </div>
                <div>
                    <h3 className="font-bold text-slate-200">Extrakcia (Zen &rarr; Legacy)</h3>
                    <p className="text-xs text-slate-500">Rozbalenie súborov hry (.utoc/.ucas &rarr; .uasset)</p>
                </div>
                </div>
                
                <div className="p-6 space-y-6 flex-1">
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Cesta Filtra (Konkrétny súbor .uasset)</label>
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <input
                            type="text"
                            value={filterPath}
                            onChange={(e) => setFilterPath(e.target.value)}
                            placeholder="/GameName/Content/Path/To/Asset.uasset"
                            className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-slate-200 focus:border-amber-500 outline-none font-mono text-sm pl-8 transition-colors"
                            />
                            <div className="absolute left-3 top-3 text-slate-600">/</div>
                        </div>
                        <button 
                            onClick={() => handlePaste(setFilterPath)}
                            className="bg-slate-800 p-3 rounded border border-slate-700 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                            title="Prilepiť text zo schránky"
                        >
                            <ClipboardPaste size={18} />
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Výstupný priečinok extrakcie</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={extractOutputPath}
                            onChange={(e) => setExtractOutputPath(e.target.value)}
                            placeholder="D:\Modding\Extracted"
                            className="flex-1 bg-slate-950 border border-slate-700 rounded p-3 text-slate-200 focus:border-amber-500 outline-none font-mono text-sm transition-colors"
                        />
                        <button 
                            onClick={() => handlePaste(setExtractOutputPath)}
                            className="bg-slate-800 p-3 rounded border border-slate-700 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                            title="Prilepiť text zo schránky"
                        >
                            <ClipboardPaste size={18} />
                        </button>
                    </div>
                </div>

                <div className="mt-auto pt-4">
                    {errorMsg && (
                        <div className="mb-3 p-3 bg-red-500/10 border border-red-500/20 rounded flex items-center gap-2 text-red-400 text-xs">
                             <AlertCircle size={14} /> {errorMsg}
                        </div>
                    )}
                    <button 
                        onClick={() => handleGenerateCommand('extract')}
                        className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 rounded-lg flex justify-center items-center gap-2 transition-all shadow-lg shadow-amber-900/20 active:scale-[0.98]"
                    >
                        <FileText size={18} /> 
                        <span>GENEROVAŤ PRÍKAZ</span>
                    </button>
                </div>
                </div>
            </div>

            {/* Section B: Packing */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col shadow-xl">
                <div className="bg-slate-850 p-4 border-b border-slate-800 flex items-center gap-3">
                <div className="bg-emerald-500/10 p-2 rounded-lg text-emerald-500">
                    <Box size={24} />
                </div>
                <div>
                    <h3 className="font-bold text-slate-200">Balenie (Legacy &rarr; Zen)</h3>
                    <p className="text-xs text-slate-500">Zabalenie upravených súborov do .utoc/.ucas</p>
                </div>
                </div>

                <div className="p-6 space-y-6 flex-1">
                {/* Source Input */}
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Zdrojový priečinok módu (Source)</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={modSource}
                            onChange={(e) => setModSource(e.target.value)}
                            placeholder="F:\Preklady\Grounded 2\Export"
                            className="flex-1 bg-slate-950 border border-slate-700 rounded p-3 text-slate-200 focus:border-emerald-500 outline-none font-mono text-sm transition-colors"
                        />
                        <button 
                            onClick={() => handlePaste(setModSource)}
                            className="bg-slate-800 p-3 rounded border border-slate-700 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                            title="Prilepiť text zo schránky"
                        >
                            <ClipboardPaste size={18} />
                        </button>
                    </div>
                </div>

                {/* Destination Folder */}
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Priečinok pre export (Kde uložiť .utoc)</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={packDestFolder}
                            onChange={(e) => setPackDestFolder(e.target.value)}
                            placeholder="F:\Preklady\Grounded 2"
                            className="flex-1 bg-slate-950 border border-slate-700 rounded p-3 text-slate-200 focus:border-emerald-500 outline-none font-mono text-sm transition-colors"
                        />
                        <button 
                            onClick={() => handlePaste(setPackDestFolder)}
                            className="bg-slate-800 p-3 rounded border border-slate-700 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                            title="Prilepiť text zo schránky"
                        >
                            <ClipboardPaste size={18} />
                        </button>
                    </div>
                </div>
                
                {/* Naming Pattern Input */}
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Názov Módu (Pattern: z_Nazov_SK_ID_P)</label>
                    <div className="flex items-center bg-slate-950 border border-slate-700 rounded p-1">
                        <div className="px-3 py-2 text-slate-500 font-mono select-none">z_</div>
                        
                        <input
                            type="text"
                            value={modNameStr}
                            onChange={(e) => setModNameStr(e.target.value)}
                            placeholder="Grounded2"
                            className="flex-1 bg-transparent text-center text-slate-200 outline-none font-mono font-bold placeholder-slate-700"
                        />
                        
                        <div className="px-2 py-2 text-slate-500 font-mono select-none border-l border-r border-slate-800">_SK_</div>
                        
                        <input
                            type="text"
                            value={modChunkId}
                            onChange={(e) => setModChunkId(e.target.value)}
                            placeholder="300"
                            className="w-16 bg-transparent text-center text-slate-200 outline-none font-mono font-bold placeholder-slate-700"
                        />
                        
                        <div className="px-3 py-2 text-slate-500 font-mono select-none">_P.utoc</div>
                    </div>
                </div>

                <div className="bg-slate-950/50 p-3 rounded border border-slate-800 text-xs text-slate-500 flex justify-between items-center">
                    <span>Nástroj: <span className="text-blue-400 font-mono">{activeTool === ToolType.RETOC ? 'retoc.exe' : 'castoc.exe'}</span></span>
                    <span>Verzia: <span className="text-emerald-400 font-bold">{activeProfile.engineVersion}</span></span>
                </div>

                <div className="mt-auto pt-4">
                    {errorMsg && (
                        <div className="mb-3 p-3 bg-red-500/10 border border-red-500/20 rounded flex items-center gap-2 text-red-400 text-xs">
                             <AlertCircle size={14} /> {errorMsg}
                        </div>
                    )}
                    <button 
                        onClick={() => handleGenerateCommand('pack')}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-lg flex justify-center items-center gap-2 transition-all shadow-lg shadow-emerald-900/20 active:scale-[0.98]"
                    >
                        <FileText size={18} /> 
                        <span>GENEROVAŤ PRÍKAZ</span>
                    </button>
                </div>
                </div>
            </div>
          </div>

          {/* Generated Command Output Area */}
          {generatedCommand && (
              <div className="bg-black/40 border border-slate-700 rounded-xl p-4 animate-fadeIn">
                  <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 text-slate-400">
                          <Terminal size={16} />
                          <span className="text-sm font-bold uppercase tracking-wider">Vygenerovaný Príkaz</span>
                      </div>
                      <button 
                          onClick={copyToClipboard}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm font-bold transition-all ${copied ? 'bg-green-600 text-white' : 'bg-slate-700 hover:bg-slate-600 text-slate-200'}`}
                      >
                          {copied ? <Check size={14} /> : <Copy size={14} />}
                          {copied ? 'SKOPIROVANÉ' : 'KOPIROVAŤ'}
                      </button>
                  </div>
                  <div className="relative">
                      <textarea 
                          readOnly
                          value={generatedCommand}
                          className="w-full h-24 bg-slate-950 text-emerald-400 font-mono text-sm p-4 rounded-lg border border-slate-800 outline-none resize-none shadow-inner"
                      />
                  </div>
                  <p className="text-xs text-slate-500 mt-2 text-center">
                      Skopírujte tento príkaz a vložte ho do PowerShell okna (Admin).
                  </p>
              </div>
          )}

        </div>
      </div>
    </div>
  );
};