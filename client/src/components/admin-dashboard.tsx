import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getAllStudents, addStudent, studentMatriculeExists, type Student } from "@/lib/storage";
import { Gauge, UserPlus, LogOut, Users, CheckCircle } from "lucide-react";

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

export default function AdminDashboard({ isOpen, onClose, onSuccess, onError }: AdminDashboardProps) {
  const [students, setStudents] = useState<Student[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    firstName: '',
    matricule: '',
    filiere: '',
    photo: ''
  });

  useEffect(() => {
    if (isOpen) {
      const loadData = async () => {
        const data = await getAllStudents();
        setStudents(data);
      };
      loadData();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.firstName || !formData.matricule || !formData.filiere || !formData.photo) {
      onError('Tous les champs sont requis');
      return;
    }

    try {
      const newStudent = await addStudent({
        name: formData.name.trim().toUpperCase(),
        firstName: formData.firstName.trim(),
        matricule: formData.matricule.trim().toUpperCase(),
        filiere: formData.filiere,
        photo: formData.photo.trim()
      });

      const updatedStudents = await getAllStudents();
      setStudents(updatedStudents);
      setFormData({
        name: '',
        firstName: '',
        matricule: '',
        filiere: '',
        photo: ''
      });
      onSuccess('Étudiant ajouté avec succès!');
    } catch (error: any) {
      onError(error.message || 'Erreur lors de l\'ajout de l\'étudiant');
    }
  };

  if (!isOpen) return null;

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold flex items-center space-x-3">
              <Gauge className="text-accent-cyan w-8 h-8" />
              <span>Tableau de Bord Admin</span>
            </h2>
            <p className="text-text-light mt-2">Gestion des étudiants et certificats</p>
          </div>
          <Button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Déconnexion</span>
          </Button>
        </div>

        {/* Add Student Form */}
        <div className="bg-card-bg rounded-2xl p-8 shadow-2xl border border-accent-cyan/20 mb-8">
          <h3 className="text-2xl font-semibold mb-6 flex items-center space-x-3">
            <UserPlus className="text-accent-orange w-6 h-6" />
            <span>Ajouter un Étudiant</span>
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-text-light">Nom</label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Entrez le nom..."
                className="w-full px-4 py-3 bg-primary-bg border border-accent-cyan/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-cyan focus:ring-2 focus:ring-accent-cyan/20 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-text-light">Prénom</label>
              <Input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                placeholder="Entrez le prénom..."
                className="w-full px-4 py-3 bg-primary-bg border border-accent-cyan/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-cyan focus:ring-2 focus:ring-accent-cyan/20 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-text-light">Matricule</label>
              <Input
                type="text"
                value={formData.matricule}
                onChange={(e) => setFormData({ ...formData, matricule: e.target.value })}
                placeholder="Ex: FUT2024001"
                className="w-full px-4 py-3 bg-primary-bg border border-accent-cyan/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-cyan focus:ring-2 focus:ring-accent-cyan/20 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-text-light">Filière</label>
              <Select value={formData.filiere} onValueChange={(value) => setFormData({ ...formData, filiere: value })}>
                <SelectTrigger className="w-full px-4 py-3 bg-primary-bg border border-accent-cyan/30 rounded-lg text-white focus:outline-none focus:border-accent-cyan focus:ring-2 focus:ring-accent-cyan/20 transition-all">
                  <SelectValue placeholder="Sélectionnez une filière..." />
                </SelectTrigger>
                <SelectContent className="bg-primary-bg border border-accent-cyan/30 text-white">
                  <SelectItem value="Informatique">Informatique</SelectItem>
                  <SelectItem value="Marketing Digital">Marketing Digital</SelectItem>
                  <SelectItem value="Comptabilité">Comptabilité</SelectItem>
                  <SelectItem value="Gestion">Gestion</SelectItem>
                  <SelectItem value="Communication">Communication</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2 text-text-light">Photo de l'étudiant</label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        setFormData({ ...formData, photo: event.target?.result as string });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full px-4 py-3 bg-primary-bg border border-accent-cyan/30 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent-cyan file:text-primary-bg hover:file:bg-cyan-400 transition-all"
                  required
                />
                {formData.photo && (
                  <div className="mt-4 flex justify-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-accent-cyan/30">
                      <img
                        src={formData.photo}
                        alt="Aperçu"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="md:col-span-2">
              <Button
                type="submit"
                className="w-full bg-accent-cyan hover:bg-cyan-400 text-primary-bg font-semibold py-3 rounded-lg transition-all transform hover:scale-[1.02] flex items-center justify-center space-x-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>Ajouter l'Étudiant</span>
              </Button>
            </div>
          </form>
        </div>

        {/* Students List */}
        <div className="bg-card-bg rounded-2xl p-8 shadow-2xl border border-accent-cyan/20">
          <h3 className="text-2xl font-semibold mb-6 flex items-center space-x-3">
            <Users className="text-accent-cyan w-6 h-6" />
            <span>Liste des Étudiants</span>
          </h3>
          <div className="space-y-4">
            {students.length === 0 ? (
              <div className="text-center text-text-light py-8">
                <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Aucun étudiant enregistré</p>
              </div>
            ) : (
              students.map(student => (
                <div key={student.id} className="bg-primary-bg rounded-lg p-4 border border-accent-cyan/20 flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-accent-cyan/30 flex-shrink-0">
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
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">{student.firstName} {student.name}</h4>
                    <p className="text-accent-cyan text-sm font-mono">{student.matricule}</p>
                    <p className="text-text-light text-sm">{student.filiere}</p>
                  </div>
                  <div className="text-green-400">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
