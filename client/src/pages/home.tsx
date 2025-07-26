import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { findStudentByMatricule, Student } from "@/lib/storage";
import CertificateCard from "@/components/certificate-card";
import AdminLoginModal from "@/components/admin-login-modal";
import AdminDashboard from "@/components/admin-dashboard";
import Footer from "@/components/footer";
import { Tag, Search, Shield, AlertTriangle, CheckCircle } from "lucide-react";

export default function Home() {
  const [searchInput, setSearchInput] = useState('');
  const [foundStudent, setFoundStudent] = useState<Student | null>(null);
  const [showNoResults, setShowNoResults] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSearch = () => {
    const matricule = searchInput.trim().toUpperCase();
    
    if (!matricule) {
      showMessage('error', 'Veuillez entrer un numéro matricule');
      return;
    }

    const student = findStudentByMatricule(matricule);
    
    if (student) {
      setFoundStudent(student);
      setShowNoResults(false);
    } else {
      setFoundStudent(null);
      setShowNoResults(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleAdminLogin = () => {
    setShowAdminModal(false);
    setShowAdminDashboard(true);
  };

  const handleAdminLogout = () => {
    setShowAdminDashboard(false);
  };

  return (
    <div className="bg-primary-bg text-white min-h-screen">
      {/* Fixed Message */}
      {message && (
        <div className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2 ${
          message.type === 'success' ? 'bg-green-600' : 'bg-red-600'
        } text-white`}>
          {message.type === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertTriangle className="w-5 h-5" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-bg via-card-bg to-primary-bg opacity-90"></div>
        <div className="relative container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-accent-cyan rounded-full flex items-center justify-center">
                <Tag className="text-primary-bg w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold">PROGRAMME FUTUR</h1>
            </div>
            <Button
              onClick={() => setShowAdminModal(true)}
              className="bg-accent-orange hover:bg-orange-600 transition-colors px-6 py-2 rounded-lg font-semibold flex items-center space-x-2"
            >
              <Shield className="w-4 h-4" />
              <span>Admin</span>
            </Button>
          </div>
        </div>
      </header>

      {!showAdminDashboard && (
        <>
          {/* Hero Section */}
          <section className="container mx-auto px-4 py-12">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-accent-cyan to-white bg-clip-text text-transparent">
                PROGRAMME FUTUR
              </h1>
              <p className="text-xl md:text-2xl text-text-light mb-12 leading-relaxed">
                Plateforme d'authentification des certificats délivrés par le Programme FUTUR
              </p>
              
              {/* Search Section */}
              <div className="bg-card-bg rounded-2xl p-8 shadow-2xl border border-accent-cyan/20">
                <h2 className="text-2xl font-semibold mb-6 flex items-center justify-center space-x-3">
                  <Search className="text-accent-cyan w-6 h-6" />
                  <span>Recherche de Certificat</span>
                </h2>
                <div className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
                  <div className="flex-1">
                    <Input
                      type="text"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Entrez le numéro matricule..."
                      className="w-full px-4 py-3 bg-primary-bg border border-accent-cyan/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-cyan focus:ring-2 focus:ring-accent-cyan/20 transition-all"
                    />
                  </div>
                  <Button
                    onClick={handleSearch}
                    className="bg-accent-cyan hover:bg-cyan-400 text-primary-bg font-semibold px-8 py-3 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <Search className="w-4 h-4" />
                    <span>Rechercher</span>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Results Section */}
          {foundStudent && (
            <section className="container mx-auto px-4 py-8">
              <CertificateCard student={foundStudent} />
            </section>
          )}

          {/* No Results Section */}
          {showNoResults && (
            <section className="container mx-auto px-4 py-8">
              <div className="max-w-md mx-auto text-center bg-red-900/20 border border-red-500/30 rounded-2xl p-8">
                <AlertTriangle className="text-red-400 w-16 h-16 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-red-400">Certificat non trouvé</h3>
                <p className="text-gray-300">Aucun certificat trouvé pour ce numéro matricule.</p>
              </div>
            </section>
          )}
        </>
      )}

      {/* Admin Dashboard */}
      <AdminDashboard
        isOpen={showAdminDashboard}
        onClose={handleAdminLogout}
        onSuccess={(msg) => showMessage('success', msg)}
        onError={(msg) => showMessage('error', msg)}
      />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={showAdminModal}
        onClose={() => setShowAdminModal(false)}
        onLogin={handleAdminLogin}
        onError={(msg) => showMessage('error', msg)}
      />

      {/* Footer */}
      {!showAdminDashboard && <Footer />}
    </div>
  );
}
