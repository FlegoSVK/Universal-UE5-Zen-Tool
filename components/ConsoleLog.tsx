import React, { useEffect, useRef, useState } from 'react';
import { LogEntry } from '../types';
import { Terminal, Trash2, Maximize2, ChevronUp } from 'lucide-react';

interface ConsoleLogProps {
  logs: LogEntry[];
  onClear: () => void;
}

const LogItem: React.FC<{ log: LogEntry }> = ({ log }) => {
  const [expanded, setExpanded] = useState(false);
  const CHAR_LIMIT = 140;
  
  // Detekcia, či je správa dlhá alebo viacriadková
  const isLong = log.message.length > CHAR_LIMIT || log.message.includes('\n');

  const getTypeStyles = (type: LogEntry['type']) => {
    switch (type) {
      case 'error': return 'text-red-400 font-bold';
      case 'success': return 'text-emerald-400 font-bold';
      case 'command': return 'text-blue-400 font-semibold';
      default: return 'text-slate-300';
    }
  };

  return (
    <div className={`group flex items-start gap-2 p-1 px-2 rounded hover:bg-white/5 transition-colors ${expanded ? 'bg-slate-800/40' : ''}`}>
      <span className="text-slate-600 font-mono text-[10px] pt-[2px] w-[60px] shrink-0 select-none">
        {log.timestamp}
      </span>
      
      <div className="flex-1 min-w-0 overflow-hidden">
        <div className={`font-mono text-xs break-words whitespace-pre-wrap ${getTypeStyles(log.type)}`}>
          {log.type === 'command' && <span className="opacity-50 select-none mr-2">$</span>}
          
          {expanded ? (
             // Zobraziť plnú správu
             log.message
          ) : (
             // Zobraziť skrátenú správu (odstránime nové riadky pre kompaktnosť v náhľade)
             isLong 
               ? <span>{log.message.substring(0, CHAR_LIMIT).replace(/\n/g, ' ')}...</span> 
               : log.message
          )}
        </div>
      </div>

      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity p-1 text-slate-500 hover:text-blue-400 focus:outline-none"
          title={expanded ? "Zbaliť" : "Zobraziť detaily"}
        >
          {expanded ? <ChevronUp size={14} /> : <Maximize2 size={12} />}
        </button>
      )}
    </div>
  );
};

export const ConsoleLog: React.FC<ConsoleLogProps> = ({ logs, onClear }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="flex flex-col h-full bg-slate-950 border-t border-slate-800 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.2)] z-10 relative">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900/80 border-b border-slate-800 backdrop-blur-sm">
        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
          <Terminal size={14} />
          <span>Konzola</span>
        </div>
        <button 
          onClick={onClear}
          className="p-1.5 hover:bg-red-500/10 rounded text-slate-500 hover:text-red-400 transition-colors"
          title="Vymazať"
        >
          <Trash2 size={14} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
        {logs.length === 0 && (
          <div className="text-slate-700 italic text-xs p-2 font-mono">Pripravený. Čakám na príkazy...</div>
        )}
        {logs.map((log) => (
          <LogItem key={log.id} log={log} />
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};