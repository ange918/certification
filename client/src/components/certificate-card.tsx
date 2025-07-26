import { Student } from "@/lib/storage";
import { CheckCircle, Tag } from "lucide-react";

interface CertificateCardProps {
  student: Student;
}

export default function CertificateCard({ student }: CertificateCardProps) {
  return (
    <div className="max-w-2xl mx-auto bg-card-bg rounded-2xl p-8 shadow-2xl border border-accent-cyan/20">
      <div className="text-center mb-6">
        <div className="w-24 h-24 bg-gradient-to-br from-accent-cyan to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <Tag className="text-primary-bg text-3xl w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold text-accent-cyan mb-2">Certificat Authentifié</h2>
        <div className="w-16 h-1 bg-accent-cyan mx-auto"></div>
      </div>
      
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-accent-cyan/30 flex-shrink-0">
          <img 
            src={student.photo} 
            alt={`Photo de ${student.firstName} ${student.name}`} 
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300';
            }}
          />
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <div className="space-y-3">
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <span className="text-text-light font-semibold">Nom complet:</span>
              <span className="text-xl font-bold text-white">{student.firstName} {student.name}</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <span className="text-text-light font-semibold">Matricule:</span>
              <span className="text-lg font-mono text-accent-cyan">{student.matricule}</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <span className="text-text-light font-semibold">Filière:</span>
              <span className="text-lg text-white">{student.filiere}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-green-900/20 border border-green-500/30 rounded-lg text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <CheckCircle className="text-green-400 w-6 h-6" />
          <span className="text-green-400 font-semibold text-lg">Certificat Validé</span>
        </div>
        <p className="text-green-300">Ce certificat a été délivré avec succès par le Programme FUTUR et est authentique.</p>
      </div>
    </div>
  );
}
