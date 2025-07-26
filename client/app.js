// Logique JS pour la page d’accueil responsive du Programme FUTUR
// Ce fichier gère la recherche, l’affichage dynamique, les modals, etc.

// --- Données simulées (à remplacer par une vraie source ou API plus tard) ---
let students = [
  {
    id: '1',
    name: 'KONE',
    firstName: 'Awa',
    matricule: 'FUT2024001',
    filiere: 'Informatique',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: '2',
    name: 'COULIBALY',
    firstName: 'Moussa',
    matricule: 'FUT2024002',
    filiere: 'Marketing Digital',
    photo: 'https://randomuser.me/api/portraits/men/45.jpg',
  },
  // Ajoute d'autres étudiants ici si besoin
];

// --- Fonctions utilitaires ---
function findStudentByMatricule(matricule) {
  return students.find(
    (s) => s.matricule.toUpperCase() === matricule.toUpperCase()
  );
}

function studentMatriculeExists(matricule) {
  return students.some(
    (s) => s.matricule.toUpperCase() === matricule.toUpperCase()
  );
}

function addStudent(student) {
  const id = Date.now().toString();
  students.push({ ...student, id });
}

function loadStudents() {
  return students;
}

// --- Composants HTML natifs ---
function renderHeader() {
  return `
    <header class="relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-primary-bg via-card-bg to-primary-bg opacity-90"></div>
      <div class="relative container mx-auto px-4 py-8">
        <div class="flex justify-between items-center mb-8">
          <div class="flex items-center space-x-3">
            <div class="w-12 h-12 bg-accent-cyan rounded-full flex items-center justify-center">
              <svg class="text-primary-bg w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M2 12l10 7 10-7-10-7-10 7z"/><path d="M2 12l10 7 10-7"/></svg>
            </div>
            <h1 class="text-2xl font-bold">PROGRAMME FUTUR</h1>
          </div>
          <button id="admin-btn" class="bg-accent-orange hover:bg-orange-600 transition-colors px-6 py-2 rounded-lg font-semibold flex items-center space-x-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            <span>Admin</span>
          </button>
        </div>
      </div>
    </header>
  `;
}

function renderHeroSection() {
  return `
    <section class="container mx-auto px-4 py-12">
      <div class="text-center max-w-4xl mx-auto">
        <h1 class="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-accent-cyan to-white bg-clip-text text-transparent">
          PROGRAMME FUTUR
        </h1>
        <p class="text-xl md:text-2xl text-text-light mb-12 leading-relaxed">
          Plateforme d'authentification des certificats délivrés par le Programme FUTUR
        </p>
        <div class="bg-card-bg rounded-2xl p-8 shadow-2xl border border-accent-cyan/20">
          <h2 class="text-2xl font-semibold mb-6 flex items-center justify-center space-x-3">
            <svg class="text-accent-cyan w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <span>Recherche de Certificat</span>
          </h2>
          <div class="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
            <div class="flex-1">
              <input id="search-input" type="text" placeholder="Entrez le numéro matricule..." class="w-full px-4 py-3 bg-primary-bg border border-accent-cyan/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-cyan focus:ring-2 focus:ring-accent-cyan/20 transition-all" />
            </div>
            <button id="search-btn" class="bg-accent-cyan hover:bg-cyan-400 text-primary-bg font-semibold px-8 py-3 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              <span>Rechercher</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderCertificateCard(student) {
  return `
    <section class="container mx-auto px-4 py-8">
      <div class="max-w-2xl mx-auto bg-card-bg rounded-2xl p-8 shadow-2xl border border-accent-cyan/20">
        <div class="text-center mb-6">
          <div class="w-24 h-24 bg-gradient-to-br from-accent-cyan to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="text-primary-bg text-3xl w-12 h-12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M2 12l10 7 10-7-10-7-10 7z"/><path d="M2 12l10 7 10-7"/></svg>
          </div>
          <h2 class="text-2xl font-bold text-accent-cyan mb-2">Certificat Authentifié</h2>
          <div class="w-16 h-1 bg-accent-cyan mx-auto"></div>
        </div>
        <div class="flex flex-col md:flex-row items-center gap-6">
          <div class="w-32 h-32 rounded-full overflow-hidden border-4 border-accent-cyan/30 flex-shrink-0">
            <img src="${student.photo}" alt="Photo de ${student.firstName} ${student.name}" class="w-full h-full object-cover" onerror="this.src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300'" />
          </div>
          <div class="flex-1 text-center md:text-left">
            <div class="space-y-3">
              <div class="flex flex-col md:flex-row md:items-center gap-2">
                <span class="text-text-light font-semibold">Nom complet:</span>
                <span class="text-xl font-bold text-white">${student.firstName} ${student.name}</span>
              </div>
              <div class="flex flex-col md:flex-row md:items-center gap-2">
                <span class="text-text-light font-semibold">Matricule:</span>
                <span class="text-lg font-mono text-accent-cyan">${student.matricule}</span>
              </div>
              <div class="flex flex-col md:flex-row md:items-center gap-2">
                <span class="text-text-light font-semibold">Filière:</span>
                <span class="text-lg text-white">${student.filiere}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-8 p-4 bg-green-900/20 border border-green-500/30 rounded-lg text-center">
          <div class="flex items-center justify-center space-x-2 mb-2">
            <svg class="text-green-400 w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>
            <span class="text-green-400 font-semibold text-lg">Certificat Validé</span>
          </div>
          <p class="text-green-300">Ce certificat a été délivré avec succès par le Programme FUTUR et est authentique.</p>
        </div>
      </div>
    </section>
  `;
}

function renderNoResults() {
  return `
    <section class="container mx-auto px-4 py-8">
      <div class="max-w-md mx-auto text-center bg-red-900/20 border border-red-500/30 rounded-2xl p-8">
        <svg class="text-red-400 w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
        <h3 class="text-xl font-semibold mb-2 text-red-400">Certificat non trouvé</h3>
        <p class="text-gray-300">Aucun certificat trouvé pour ce numéro matricule.</p>
      </div>
    </section>
  `;
}

function renderFooter() {
  return `
    <footer class="bg-gradient-to-r from-card-bg to-primary-bg border-t border-accent-cyan/20 mt-16">
      <div class="container mx-auto px-4 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="md:col-span-2">
            <div class="flex items-center space-x-3 mb-4">
              <div class="w-10 h-10 bg-accent-cyan rounded-full flex items-center justify-center">
                <svg class="text-primary-bg w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M2 12l10 7 10-7-10-7-10 7z"/><path d="M2 12l10 7 10-7"/></svg>
              </div>
              <h3 class="text-2xl font-bold">PROGRAMME FUTUR</h3>
            </div>
            <p class="text-text-light mb-6 max-w-md">
              Plateforme officielle d'authentification des certificats délivrés par le Programme FUTUR. Nous garantissons la transparence et l'authenticité de vos qualifications.
            </p>
            <div class="flex space-x-4">
              <a href="#" class="w-10 h-10 bg-accent-cyan/20 rounded-full flex items-center justify-center hover:bg-accent-cyan/30 transition-colors"><svg class="w-5 h-5 text-accent-cyan" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 2h-3a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/><path d="M6 9v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9"/><path d="M9 22V12h6v10"/></svg></a>
              <a href="#" class="w-10 h-10 bg-accent-cyan/20 rounded-full flex items-center justify-center hover:bg-accent-cyan/30 transition-colors"><svg class="w-5 h-5 text-accent-cyan" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
              <a href="#" class="w-10 h-10 bg-accent-cyan/20 rounded-full flex items-center justify-center hover:bg-accent-cyan/30 transition-colors"><svg class="w-5 h-5 text-accent-cyan" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43.36a9.09 9.09 0 0 1-2.88 1.1A4.52 4.52 0 0 0 16.11 0c-2.5 0-4.52 2.02-4.52 4.52 0 .35.04.7.11 1.03A12.94 12.94 0 0 1 3.1.67a4.52 4.52 0 0 0-.61 2.27c0 1.56.8 2.94 2.02 3.75A4.48 4.48 0 0 1 2 5.13v.06c0 2.18 1.55 4 3.8 4.42a4.52 4.52 0 0 1-2.04.08c.58 1.81 2.26 3.13 4.25 3.17A9.05 9.05 0 0 1 0 19.54a12.8 12.8 0 0 0 6.95 2.04c8.34 0 12.9-6.91 12.9-12.9 0-.2 0-.39-.01-.58A9.22 9.22 0 0 0 24 4.59a9.1 9.1 0 0 1-2.6.71z"/></svg></a>
            </div>
          </div>
          <div>
            <h4 class="text-lg font-semibold mb-4 text-accent-cyan">Contact</h4>
            <div class="space-y-3">
              <div class="flex items-center space-x-3">
                <svg class="w-4 h-4 text-accent-orange" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 4h16v16H4z"/><path d="M22 6l-10 7L2 6"/></svg>
                <span class="text-text-light text-sm">contact@programmefutur.ci</span>
              </div>
              <div class="flex items-center space-x-3">
                <svg class="w-4 h-4 text-accent-orange" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 16.92V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2.09"/><path d="M16 2h6v6"/><path d="M23 1l-6 6"/></svg>
                <span class="text-text-light text-sm">+225 01 02 03 04 05</span>
              </div>
              <div class="flex items-start space-x-3">
                <svg class="w-4 h-4 text-accent-orange mt-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 10.5a8.38 8.38 0 0 1-1.9 5.4l-7.1 7.1a2 2 0 0 1-2.8 0l-7.1-7.1A8.38 8.38 0 0 1 3 10.5C3 6.36 6.36 3 10.5 3S18 6.36 18 10.5z"/></svg>
                <span class="text-text-light text-sm">Abidjan, Cocody<br />Côte d'Ivoire</span>
              </div>
            </div>
          </div>
          <div>
            <h4 class="text-lg font-semibold mb-4 text-accent-cyan">Liens Utiles</h4>
            <div class="space-y-2">
              <a href="#" class="block text-text-light hover:text-accent-cyan transition-colors text-sm">Nos Formations</a>
              <a href="#" class="block text-text-light hover:text-accent-cyan transition-colors text-sm">Vérifier un Certificat</a>
              <a href="#" class="block text-text-light hover:text-accent-cyan transition-colors text-sm">Politique de Confidentialité</a>
              <a href="#" class="block text-text-light hover:text-accent-cyan transition-colors text-sm">Conditions d'Utilisation</a>
              <a href="#" class="block text-text-light hover:text-accent-cyan transition-colors text-sm">Support</a>
            </div>
          </div>
        </div>
        <div class="border-t border-accent-cyan/20 mt-8 pt-6">
          <div class="flex flex-col md:flex-row justify-between items-center">
            <p class="text-text-light text-sm mb-4 md:mb-0">© 2025 Programme FUTUR. Tous droits réservés.</p>
            <p class="text-accent-cyan text-sm font-medium">Authentification sécurisée des certificats</p>
          </div>
        </div>
      </div>
    </footer>
  `;
}

// --- Gestion de l’état de la page ---
let foundStudent = null;
let showNoResults = false;
let showAdminModal = false;
let showAdminDashboard = false;
let adminMessage = null;

function renderAdminModal() {
  if (!showAdminModal) return '';
  return `
    <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div class="bg-card-bg rounded-2xl p-8 max-w-md w-full shadow-2xl border border-accent-cyan/20">
        <div class="text-center mb-6">
          <div class="w-16 h-16 bg-accent-orange rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="text-primary-bg w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <h2 class="text-2xl font-bold">Accès Administrateur</h2>
          <p class="text-text-light mt-2">Entrez le mot de passe pour continuer</p>
        </div>
        <form id="admin-login-form">
          <div class="mb-6">
            <input type="password" id="admin-password" placeholder="Mot de passe..." class="w-full px-4 py-3 bg-primary-bg border border-accent-cyan/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-cyan focus:ring-2 focus:ring-accent-cyan/20 transition-all" required />
          </div>
          <div class="flex gap-3">
            <button type="button" id="admin-cancel" class="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold transition-colors">Annuler</button>
            <button type="submit" class="flex-1 bg-accent-cyan hover:bg-cyan-400 text-primary-bg py-3 rounded-lg font-semibold transition-colors">Connexion</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function renderAdminDashboard() {
  if (!showAdminDashboard) return '';
  const studentsList = loadStudents().map(student => `
    <div class="bg-primary-bg rounded-lg p-4 border border-accent-cyan/20 flex items-center space-x-4">
      <div class="w-16 h-16 rounded-full overflow-hidden border-2 border-accent-cyan/30 flex-shrink-0">
        <img src="${student.photo}" alt="Photo de ${student.firstName} ${student.name}" class="w-full h-full object-cover" onerror="this.src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300'" />
      </div>
      <div class="flex-1">
        <h4 class="font-semibold text-white">${student.firstName} ${student.name}</h4>
        <p class="text-accent-cyan text-sm font-mono">${student.matricule}</p>
        <p class="text-text-light text-sm">${student.filiere}</p>
      </div>
      <div class="text-green-400">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>
      </div>
    </div>
  `).join('');
  return `
    <section class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div class="bg-card-bg rounded-2xl p-8 max-w-4xl w-full shadow-2xl border border-accent-cyan/20 relative">
        <div class="flex justify-between items-center mb-8">
          <div>
            <h2 class="text-3xl font-bold flex items-center space-x-3">
              <svg class="text-accent-cyan w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>
              <span>Tableau de Bord Admin</span>
            </h2>
            <p class="text-text-light mt-2">Gestion des étudiants et certificats</p>
          </div>
          <button id="admin-logout" class="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7"/></svg>
            <span>Déconnexion</span>
          </button>
        </div>
        <div class="bg-card-bg rounded-2xl p-8 shadow-2xl border border-accent-cyan/20 mb-8">
          <h3 class="text-2xl font-semibold mb-6 flex items-center space-x-3">
            <svg class="text-accent-orange w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
            <span>Ajouter un Étudiant</span>
          </h3>
          <form id="add-student-form" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-semibold mb-2 text-text-light">Nom</label>
              <input type="text" id="student-name" placeholder="Entrez le nom..." class="w-full px-4 py-3 bg-primary-bg border border-accent-cyan/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-cyan focus:ring-2 focus:ring-accent-cyan/20 transition-all" required />
            </div>
            <div>
              <label class="block text-sm font-semibold mb-2 text-text-light">Prénom</label>
              <input type="text" id="student-firstname" placeholder="Entrez le prénom..." class="w-full px-4 py-3 bg-primary-bg border border-accent-cyan/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-cyan focus:ring-2 focus:ring-accent-cyan/20 transition-all" required />
            </div>
            <div>
              <label class="block text-sm font-semibold mb-2 text-text-light">Matricule</label>
              <input type="text" id="student-matricule" placeholder="Ex: FUT2024001" class="w-full px-4 py-3 bg-primary-bg border border-accent-cyan/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-cyan focus:ring-2 focus:ring-accent-cyan/20 transition-all" required />
            </div>
            <div>
              <label class="block text-sm font-semibold mb-2 text-text-light">Filière</label>
              <select id="student-filiere" class="w-full px-4 py-3 bg-primary-bg border border-accent-cyan/30 rounded-lg text-white focus:outline-none focus:border-accent-cyan focus:ring-2 focus:ring-accent-cyan/20 transition-all" required>
                <option value="">Sélectionnez une filière...</option>
                <option value="Informatique">Informatique</option>
                <option value="Marketing Digital">Marketing Digital</option>
                <option value="Comptabilité">Comptabilité</option>
                <option value="Gestion">Gestion</option>
                <option value="Communication">Communication</option>
              </select>
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-semibold mb-2 text-text-light">Photo de l'étudiant (URL)</label>
              <input type="url" id="student-photo" placeholder="Collez l'URL de la photo..." class="w-full px-4 py-3 bg-primary-bg border border-accent-cyan/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-cyan focus:ring-2 focus:ring-accent-cyan/20 transition-all" required />
            </div>
            <div class="md:col-span-2">
              <button type="submit" class="w-full bg-accent-cyan hover:bg-cyan-400 text-primary-bg font-semibold py-3 rounded-lg transition-all transform hover:scale-[1.02] flex items-center justify-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
                <span>Ajouter l'Étudiant</span>
              </button>
            </div>
          </form>
        </div>
        <div class="bg-card-bg rounded-2xl p-8 shadow-2xl border border-accent-cyan/20">
          <h3 class="text-2xl font-semibold mb-6 flex items-center space-x-3">
            <svg class="text-accent-cyan w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>
            <span>Liste des Étudiants</span>
          </h3>
          <div class="space-y-4">
            ${studentsList.length === 0 ? `<div class="text-center text-text-light py-8"><svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg><p>Aucun étudiant enregistré</p></div>` : studentsList}
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderMessage() {
  if (!adminMessage) return '';
  return `<div class="fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2 ${adminMessage.type === 'success' ? 'bg-green-600' : 'bg-red-600'} text-white">
    <span>${adminMessage.text}</span>
  </div>`;
}

function renderApp() {
  const app = document.getElementById('app');
  if (!app) return;
  app.innerHTML = `
    ${renderHeader()}
    <main>
      ${showAdminDashboard ? renderAdminDashboard() : `
        ${renderHeroSection()}
        ${foundStudent ? renderCertificateCard(foundStudent) : ''}
        ${showNoResults ? renderNoResults() : ''}
      `}
    </main>
    ${renderFooter()}
    ${renderAdminModal()}
    ${renderMessage()}
  `;

  // Listeners recherche
  if (!showAdminDashboard) {
    document.getElementById('search-btn').addEventListener('click', handleSearch);
    document.getElementById('search-input').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') handleSearch();
    });
  }

  // Listener bouton admin
  if (!showAdminDashboard) {
    document.getElementById('admin-btn').addEventListener('click', () => {
      showAdminModal = true;
      renderApp();
    });
  }

  // Modal admin
  if (showAdminModal) {
    document.getElementById('admin-cancel').addEventListener('click', (e) => {
      e.preventDefault();
      showAdminModal = false;
      renderApp();
    });
    document.getElementById('admin-login-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const pwd = document.getElementById('admin-password').value;
      if (pwd === 'futur2025') {
        showAdminModal = false;
        showAdminDashboard = true;
        adminMessage = { type: 'success', text: 'Connexion réussie !' };
        setTimeout(() => { adminMessage = null; renderApp(); }, 2000);
        renderApp();
      } else {
        adminMessage = { type: 'error', text: 'Mot de passe incorrect' };
        setTimeout(() => { adminMessage = null; renderApp(); }, 2000);
        renderApp();
      }
    });
  }

  // Dashboard admin
  if (showAdminDashboard) {
    document.getElementById('admin-logout').addEventListener('click', () => {
      showAdminDashboard = false;
      renderApp();
    });
    document.getElementById('add-student-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('student-name').value.trim().toUpperCase();
      const firstName = document.getElementById('student-firstname').value.trim();
      const matricule = document.getElementById('student-matricule').value.trim().toUpperCase();
      const filiere = document.getElementById('student-filiere').value;
      const photo = document.getElementById('student-photo').value.trim();
      if (!name || !firstName || !matricule || !filiere || !photo) {
        adminMessage = { type: 'error', text: 'Tous les champs sont requis' };
        setTimeout(() => { adminMessage = null; renderApp(); }, 2000);
        renderApp();
        return;
      }
      if (studentMatriculeExists(matricule)) {
        adminMessage = { type: 'error', text: 'Ce matricule existe déjà' };
        setTimeout(() => { adminMessage = null; renderApp(); }, 2000);
        renderApp();
        return;
      }
      addStudent({ name, firstName, matricule, filiere, photo });
      adminMessage = { type: 'success', text: 'Étudiant ajouté avec succès !' };
      setTimeout(() => { adminMessage = null; renderApp(); }, 2000);
      renderApp();
    });
  }
}

function handleSearch() {
  const input = document.getElementById('search-input');
  if (!input) return;
  const value = input.value.trim().toUpperCase();
  if (!value) {
    showNoResults = false;
    foundStudent = null;
    renderApp();
    return;
  }
  const student = findStudentByMatricule(value);
  if (student) {
    foundStudent = student;
    showNoResults = false;
  } else {
    foundStudent = null;
    showNoResults = true;
  }
  renderApp();
}

// --- Initialisation ---
document.addEventListener('DOMContentLoaded', () => {
  renderApp();
}); 