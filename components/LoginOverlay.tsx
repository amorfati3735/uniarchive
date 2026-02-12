import React, { useState } from 'react';
import { X, Mail, ArrowRight, ShieldCheck, AlertTriangle } from 'lucide-react';
import { User } from '../types';

interface Props {
  onClose: () => void;
  onLogin: (user: User) => void;
}

export const LoginOverlay: React.FC<Props> = ({ onClose, onLogin }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'input' | 'verify'>('input');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email.endsWith('@vitstudent.ac.in')) {
      setError('Access Restricted: Must use valid @vitstudent.ac.in email');
      return;
    }

    setIsLoading(true);
    // Simulate API check
    setTimeout(() => {
      setIsLoading(false);
      setStep('verify');
    }, 1500);
  };

  const verifyCode = () => {
    // Mock verification
    const mockUser: User = {
      email: email,
      username: email.split('@')[0],
      isVerified: true,
      role: 'student'
    };
    onLogin(mockUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-uni-black/90 backdrop-blur-md p-4 font-mono">
      <div className="w-full max-w-md bg-uni-panel border border-uni-neon shadow-hard-neon relative overflow-hidden">
        
        {/* Header */}
        <div className="p-6 bg-uni-dark border-b border-uni-border flex justify-between items-center">
          <h2 className="text-xl font-display font-bold text-uni-contrast uppercase tracking-tight flex items-center gap-2">
            <ShieldCheck size={24} className="text-uni-neon" /> Student Access
          </h2>
          <button onClick={onClose} className="text-uni-muted hover:text-uni-contrast transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-8">
          {step === 'input' ? (
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-uni-muted mb-2 uppercase">University Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-uni-muted" size={16} />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="reg_no@vitstudent.ac.in"
                    className={`w-full bg-uni-black border ${error ? 'border-uni-alert' : 'border-uni-border'} p-3 pl-10 text-uni-contrast focus:border-uni-neon outline-none transition-colors`}
                    autoFocus
                  />
                </div>
                {error && (
                  <div className="flex items-center gap-2 mt-2 text-uni-alert text-xs">
                    <AlertTriangle size={12} />
                    <span>{error}</span>
                  </div>
                )}
              </div>

              <button 
                type="submit"
                disabled={isLoading || !email}
                className="w-full bg-uni-neon text-uni-black font-display font-bold py-3 hover:bg-uni-contrast transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-hard-neon uppercase flex justify-center items-center gap-2"
              >
                {isLoading ? 'Verifying Domain...' : 'Verify Identity'} {!isLoading && <ArrowRight size={16}/>}
              </button>
            </form>
          ) : (
             <div className="text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
               <div className="w-16 h-16 bg-uni-neon/10 rounded-full flex items-center justify-center mx-auto border border-uni-neon">
                 <Mail size={32} className="text-uni-neon" />
               </div>
               <div>
                 <h3 className="text-uni-contrast font-bold text-lg mb-2">Check your Inbox</h3>
                 <p className="text-uni-muted text-sm">We've sent a magic link to <span className="text-uni-cyan">{email}</span></p>
               </div>
               
               <div className="bg-uni-black p-4 border border-uni-border text-xs text-uni-muted">
                 <p>[DEV MODE] Code autofilled: 123456</p>
               </div>

               <button 
                onClick={verifyCode}
                className="w-full bg-uni-contrast text-uni-black font-display font-bold py-3 hover:bg-uni-neon transition-all shadow-hard uppercase"
              >
                Complete Login
              </button>
             </div>
          )}
        </div>
        
        {/* Footer decoration */}
        <div className="h-1 w-full bg-gradient-to-r from-uni-neon via-uni-cyan to-uni-alert"></div>
      </div>
    </div>
  );
};
