import React, { useState, useEffect, useRef } from 'react';
import { Search, Command, Zap, ArrowRight, Hash, BookOpen, User } from 'lucide-react';
import { MOCK_RESOURCES, AVAILABLE_TOPICS } from '../constants';
import { queryQuickAI } from '../services/aiService';

interface Props {
  onClose: () => void;
  onSelectResource: (id: string) => void;
  onSelectSubject: (code: string) => void;
}

export const SearchOverlay: React.FC<Props> = ({ onClose, onSelectResource, onSelectSubject }) => {
  const [query, setQuery] = useState('');
  const [aiMode, setAiMode] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        e.preventDefault();
        setAiMode(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (aiMode && query.trim()) {
      setIsAiLoading(true);
      const res = await queryQuickAI(query);
      setAiResponse(res.answer);
      setIsAiLoading(false);
    }
  };

  // Simple fuzzy logic for subjects/resources
  const filteredSubjects = Array.from(new Set(MOCK_RESOURCES.map(r => r.courseCode)))
    .filter(code => code.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 3);

  const filteredResources = MOCK_RESOURCES
    .filter(r => r.title.toLowerCase().includes(query.toLowerCase()) || r.topics.some(t => t.toLowerCase().includes(query.toLowerCase())))
    .slice(0, 5);

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] bg-uni-black/80 backdrop-blur-sm p-4 font-mono">
      <div className="w-full max-w-2xl bg-uni-panel border border-uni-border shadow-2xl overflow-hidden flex flex-col max-h-[60vh]">
        
        {/* Search Input Area */}
        <form onSubmit={handleSearch} className="flex items-center p-4 border-b border-uni-border bg-uni-dark relative">
          {aiMode ? (
             <Zap className="text-uni-neon mr-3 animate-pulse" size={24} />
          ) : (
             <Search className="text-uni-muted mr-3" size={24} />
          )}
          
          <input 
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={aiMode ? "Ask AI anything about the archives..." : "Search subjects, notes, tags..."}
            className="flex-1 bg-transparent text-lg text-uni-contrast outline-none placeholder:text-uni-muted/50 font-sans"
          />
          
          <div className="flex items-center gap-2">
            <span className={`text-[10px] px-2 py-1 border rounded transition-colors ${aiMode ? 'border-uni-neon text-uni-neon bg-uni-neon/10' : 'border-uni-border text-uni-muted'}`}>
              TAB {aiMode ? 'OFF' : 'FOR AI'}
            </span>
            <span className="text-[10px] px-2 py-1 border border-uni-border text-uni-muted rounded">ESC</span>
          </div>
        </form>

        {/* Results Area */}
        <div className="overflow-y-auto p-2">
          
          {aiMode ? (
            <div className="p-4">
              {!aiResponse && !isAiLoading && (
                <div className="text-center text-uni-muted py-8">
                  <Zap size={48} className="mx-auto mb-4 opacity-20" />
                  <p>AI Mode is active. Ask questions like <br/>"What are the key topics in BMAT202L?"</p>
                </div>
              )}
              {isAiLoading && (
                 <div className="space-y-3">
                   <div className="h-4 w-3/4 bg-uni-border animate-pulse rounded"></div>
                   <div className="h-4 w-1/2 bg-uni-border animate-pulse rounded"></div>
                 </div>
              )}
              {aiResponse && (
                <div className="prose prose-invert prose-sm">
                   <h4 className="text-uni-neon font-bold mb-2 uppercase text-xs">AI Response</h4>
                   <p className="text-uni-contrast leading-relaxed">{aiResponse}</p>
                </div>
              )}
            </div>
          ) : (
            <>
              {query && (
                <div className="space-y-1">
                  {/* Subjects Group */}
                  {filteredSubjects.length > 0 && (
                    <div className="mb-2">
                      <div className="px-3 py-2 text-xs font-bold text-uni-muted uppercase">Subjects</div>
                      {filteredSubjects.map(code => (
                        <button 
                          key={code} 
                          onClick={() => { onSelectSubject(code); onClose(); }}
                          className="w-full flex items-center px-3 py-3 hover:bg-uni-border/50 rounded group transition-colors text-left"
                        >
                          <BookOpen size={16} className="text-uni-cyan mr-3" />
                          <span className="text-uni-contrast group-hover:text-uni-cyan font-bold">{code}</span>
                          <ArrowRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 text-uni-muted" />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Resources Group */}
                  {filteredResources.length > 0 && (
                    <div>
                      <div className="px-3 py-2 text-xs font-bold text-uni-muted uppercase">Resources</div>
                      {filteredResources.map(res => (
                        <button 
                          key={res.id}
                          onClick={() => { onSelectResource(res.id); onClose(); }}
                          className="w-full flex items-center px-3 py-3 hover:bg-uni-border/50 rounded group transition-colors text-left"
                        >
                          <Hash size={16} className="text-uni-muted mr-3 group-hover:text-uni-contrast" />
                          <div className="flex-1 min-w-0">
                            <div className="text-uni-contrast truncate text-sm font-medium">{res.title}</div>
                            <div className="text-xs text-uni-muted flex gap-2">
                              <span>{res.courseCode}</span>
                              <span>•</span>
                              <span className="uppercase">{res.type}</span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {filteredSubjects.length === 0 && filteredResources.length === 0 && (
                    <div className="text-center py-12 text-uni-muted">
                      <p>No matches found.</p>
                    </div>
                  )}
                </div>
              )}
              {!query && (
                <div className="p-4">
                  <h4 className="text-xs font-bold text-uni-muted uppercase mb-2">Suggested</h4>
                  <div className="flex flex-wrap gap-2">
                    {AVAILABLE_TOPICS.slice(0, 6).map(topic => (
                      <span key={topic} className="px-2 py-1 bg-uni-border/30 rounded text-xs text-uni-contrast cursor-pointer hover:bg-uni-border transition-colors" onClick={() => setQuery(topic)}>
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="p-2 border-t border-uni-border bg-uni-black text-[10px] text-uni-muted flex justify-between">
           <span>Navigate with arrows</span>
           <span>NVIDIA NIM Powered</span>
        </div>
      </div>
    </div>
  );
};
