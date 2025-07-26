import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  onError: (message: string) => void;
}

export default function AdminLoginModal({ isOpen, onClose, onLogin, onError }: AdminLoginModalProps) {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'futur2025') {
      onLogin();
      setPassword('');
    } else {
      onError('Mot de passe incorrect');
    }
  };

  const handleClose = () => {
    onClose();
    setPassword('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-card-bg rounded-2xl p-8 max-w-md w-full shadow-2xl border border-accent-cyan/20">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-accent-orange rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="text-primary-bg w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold">Accès Administrateur</h2>
          <p className="text-text-light mt-2">Entrez le mot de passe pour continuer</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe..."
              className="w-full px-4 py-3 bg-primary-bg border border-accent-cyan/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-cyan focus:ring-2 focus:ring-accent-cyan/20 transition-all"
            />
          </div>
          <div className="flex gap-3">
            <Button
              type="button"
              onClick={handleClose}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-accent-cyan hover:bg-cyan-400 text-primary-bg py-3 rounded-lg font-semibold transition-colors"
            >
              Connexion
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
