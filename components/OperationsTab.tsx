import React, { useState, useEffect } from 'react';
import { GameProfile, ToolType, AppSettings } from '../types';
import { PackageOpen, Box, FileText, Copy, Check, ClipboardPaste, Terminal, AlertCircle } from 'lucide-react';
import { useTranslation } from '../i18n';

interface OperationsTabProps {
  activeProfile: GameProfile;
  settings: AppSettings;
  activeTool: ToolType;
}

export const OperationsTab: React.FC<OperationsTabProps> = ({ activeProfile, settings, activeTool }) => {
  const { t } = useTranslation();
  // Extraction States
  const [filterPath, setFilterPath] = useState('');
  const [extractOutputPath, setExtractOutputPath] = useState('D:\\Modding\\Extracted');

  // Packing States
  const [modSource, setModSource] = useState('');
  const [packDestFolder, setPackDestFolder] = useState(''); 
  
  // Naming parts based on: z_Nazov_SK_ID_P
  const [modNameStr, setModNameStr] = useState(() => activeProfile.name.replace(/[^a-zA-Z0-9]/g, ''));
  const [modLangStr, setModLangStr] = useState('SK');
  const [modChunkId, setModChunkId] = useState('300');

  useEffect(() => {
    setModNameStr(activeProfile.name.replace(/[^a-zA-Z0-9]/g, ''));
  }, [activeProfile.name]);

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
      alert(t('pasteError'));
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
              setErrorMsg(t('errorExtract'));
              return;
          }

          if (activeTool === ToolType.RETOC) {
              cmd = `& "${toolPath}"`;
              if (activeProfile.aesKey) {
                  cmd += ` --aes-key "${activeProfile.aesKey}"`;
              }
              cmd += ` to-legacy "${activeProfile.paksPath}" "${extractOutputPath}" --filter "${filterPath}"`;
          } else {
              // Castoc fallback
              cmd = `& "${toolPath}"`;
              if (activeProfile.aesKey) {
                  cmd += ` --aes-key "${activeProfile.aesKey}"`;
              }
              cmd += ` extract "${activeProfile.paksPath}" "${extractOutputPath}" --filter "${filterPath}"`;
          }

      } else {
          // PACKING
          if (!modSource || !packDestFolder) {
              setErrorMsg(t('errorPack'));
              return;
          }

          const finalFileName = `z_${modNameStr}_${modLangStr}_${modChunkId}_P.utoc`;
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
                    <h3 className="font-bold text-slate-200">{t('extractionTitle')}</h3>
                    <p className="text-xs text-slate-500">{t('extractionDesc')}</p>
                </div>
                </div>
                
                <div className="p-6 space-y-6 flex-1">
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">{t('filterPath')}</label>
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <input
                            type="text"
                            value={filterPath}
                            onChange={(e) => setFilterPath(e.target.value)}
                            placeholder={t('filterPathPlaceholder')}
                            className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-slate-200 focus:border-amber-500 outline-none font-mono text-sm pl-8 transition-colors"
                            />
                            <div className="absolute left-3 top-3 text-slate-600">/</div>
                        </div>
                        <button 
                            onClick={() => handlePaste(setFilterPath)}
                            className="bg-slate-800 p-3 rounded border border-slate-700 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                            title={t('pasteClipboard')}
                        >
                            <ClipboardPaste size={18} />
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">{t('extractOutput')}</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={extractOutputPath}
                            onChange={(e) => setExtractOutputPath(e.target.value)}
                            placeholder={t('extractOutputPlaceholder')}
                            className="flex-1 bg-slate-950 border border-slate-700 rounded p-3 text-slate-200 focus:border-amber-500 outline-none font-mono text-sm transition-colors"
                        />
                        <button 
                            onClick={() => handlePaste(setExtractOutputPath)}
                            className="bg-slate-800 p-3 rounded border border-slate-700 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                            title={t('pasteClipboard')}
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
                        <span>{t('generateCommand')}</span>
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
                    <h3 className="font-bold text-slate-200">{t('packingTitle')}</h3>
                    <p className="text-xs text-slate-500">{t('packingDesc')}</p>
                </div>
                </div>

                <div className="p-6 space-y-6 flex-1">
                {/* Source Input */}
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">{t('sourcePath')}</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={modSource}
                            onChange={(e) => setModSource(e.target.value)}
                            placeholder={t('sourcePathPlaceholder')}
                            className="flex-1 bg-slate-950 border border-slate-700 rounded p-3 text-slate-200 focus:border-emerald-500 outline-none font-mono text-sm transition-colors"
                        />
                        <button 
                            onClick={() => handlePaste(setModSource)}
                            className="bg-slate-800 p-3 rounded border border-slate-700 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                            title={t('pasteClipboard')}
                        >
                            <ClipboardPaste size={18} />
                        </button>
                    </div>
                </div>

                {/* Destination Folder */}
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">{t('destFolder')}</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={packDestFolder}
                            onChange={(e) => setPackDestFolder(e.target.value)}
                            placeholder={t('destFolderPlaceholder')}
                            className="flex-1 bg-slate-950 border border-slate-700 rounded p-3 text-slate-200 focus:border-emerald-500 outline-none font-mono text-sm transition-colors"
                        />
                        <button 
                            onClick={() => handlePaste(setPackDestFolder)}
                            className="bg-slate-800 p-3 rounded border border-slate-700 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                            title={t('pasteClipboard')}
                        >
                            <ClipboardPaste size={18} />
                        </button>
                    </div>
                </div>
                
                {/* Naming Pattern Input */}
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">{t('modNameLabel')}</label>
                    <div className="flex items-center bg-slate-950 border border-slate-700 rounded p-1">
                        <div className="px-3 py-2 text-slate-500 font-mono select-none">z_</div>
                        
                        <input
                            type="text"
                            value={modNameStr}
                            onChange={(e) => setModNameStr(e.target.value)}
                            className="flex-1 min-w-[50px] bg-transparent text-center text-slate-200 outline-none font-mono font-bold placeholder-slate-700"
                        />
                        
                        <div className="px-1 py-2 text-slate-500 font-mono select-none border-l border-slate-800">_</div>
                        
                        <input
                            type="text"
                            value={modLangStr}
                            onChange={(e) => setModLangStr(e.target.value)}
                            className="w-12 bg-transparent text-center text-slate-200 outline-none font-mono font-bold placeholder-slate-700 uppercase"
                            maxLength={3}
                        />
                        
                        <div className="px-1 py-2 text-slate-500 font-mono select-none border-r border-slate-800">_</div>
                        
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
                    <span>{t('toolLabel')} <span className="text-blue-400 font-mono">{activeTool === ToolType.RETOC ? 'retoc.exe' : 'castoc.exe'}</span></span>
                    <span>{t('versionLabel')} <span className="text-emerald-400 font-bold">{activeProfile.engineVersion}</span></span>
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
                        <span>{t('generateCommand')}</span>
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
                          <span className="text-sm font-bold uppercase tracking-wider">{t('generatedCommand')}</span>
                      </div>
                      <button 
                          onClick={copyToClipboard}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm font-bold transition-all ${copied ? 'bg-green-600 text-white' : 'bg-slate-700 hover:bg-slate-600 text-slate-200'}`}
                      >
                          {copied ? <Check size={14} /> : <Copy size={14} />}
                          {copied ? t('copied') : t('copy')}
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
                      {t('copyHelp')}
                  </p>
              </div>
          )}

        </div>
      </div>
    </div>
  );
};