import { Tag, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-card-bg to-primary-bg border-t border-accent-cyan/20 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-accent-cyan rounded-full flex items-center justify-center">
                <Tag className="text-primary-bg w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold">PROGRAMME FUTUR</h3>
            </div>
            <p className="text-text-light mb-6 max-w-md">
              Plateforme officielle d'authentification des certificats délivrés par le Programme FUTUR. 
              Nous garantissons la transparence et l'authenticité de vos qualifications.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-accent-cyan/20 rounded-full flex items-center justify-center hover:bg-accent-cyan/30 transition-colors">
                <Facebook className="w-5 h-5 text-accent-cyan" />
              </a>
              <a href="#" className="w-10 h-10 bg-accent-cyan/20 rounded-full flex items-center justify-center hover:bg-accent-cyan/30 transition-colors">
                <Instagram className="w-5 h-5 text-accent-cyan" />
              </a>
              <a href="#" className="w-10 h-10 bg-accent-cyan/20 rounded-full flex items-center justify-center hover:bg-accent-cyan/30 transition-colors">
                <Twitter className="w-5 h-5 text-accent-cyan" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-accent-cyan">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-accent-orange" />
                <span className="text-text-light text-sm">contact@programmefutur.ci</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-accent-orange" />
                <span className="text-text-light text-sm">+225 01 02 03 04 05</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-accent-orange mt-1" />
                <span className="text-text-light text-sm">
                  Abidjan, Cocody<br />
                  Côte d'Ivoire
                </span>
              </div>
            </div>
          </div>

          {/* Liens Utiles */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-accent-cyan">Liens Utiles</h4>
            <div className="space-y-2">
              <a href="#" className="block text-text-light hover:text-accent-cyan transition-colors text-sm">
                Nos Formations
              </a>
              <a href="#" className="block text-text-light hover:text-accent-cyan transition-colors text-sm">
                Vérifier un Certificat
              </a>
              <a href="#" className="block text-text-light hover:text-accent-cyan transition-colors text-sm">
                Politique de Confidentialité
              </a>
              <a href="#" className="block text-text-light hover:text-accent-cyan transition-colors text-sm">
                Conditions d'Utilisation
              </a>
              <a href="#" className="block text-text-light hover:text-accent-cyan transition-colors text-sm">
                Support
              </a>
            </div>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div className="border-t border-accent-cyan/20 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-text-light text-sm mb-4 md:mb-0">
              © 2025 Programme FUTUR. Tous droits réservés.
            </p>
            <p className="text-accent-cyan text-sm font-medium">
              Authentification sécurisée des certificats
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}