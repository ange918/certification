// Données des étudiants
const students = [
    {
        id: '1',
        name: 'KOUAKOU',
        firstName: 'Jean',
        matricule: 'FUT2024001',
        filiere: 'Informatique',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300'
    },
    {
        id: '2',
        name: 'DIABATE',
        firstName: 'Marie',
        matricule: 'FUT2024002',
        filiere: 'Marketing Digital',
        photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300'
    },
    {
        id: '3',
        name: 'TRAORE',
        firstName: 'Amadou',
        matricule: 'FUT2024003',
        filiere: 'Comptabilité',
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300'
    }
];

let isAdminLoggedIn = false;

// Fonctions utilitaires
function showNotification(type, message) {
    const notification = document.getElementById('notification');
    const icon = document.getElementById('notification-icon');
    const text = document.getElementById('notification-text');

    notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2 ${
        type === 'success' ? 'bg-green-600' : 'bg-red-600'
    } text-white`;

    icon.innerHTML = type === 'success' 
        ? '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>'
        : '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" /></svg>';

    text.textContent = message;
    notification.classList.remove('hidden');

    setTimeout(() => {
        notification.classList.add('hidden');
    }, 3000);
}

function findStudentByMatricule(matricule) {
    return students.find(s => s.matricule.toUpperCase() === matricule.toUpperCase()) || null;
}

// Fonctions de recherche
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        handleSearch();
    }
}

function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    const matricule = searchInput.value.trim().toUpperCase();
    
    if (!matricule) {
        showNotification('error', 'Veuillez entrer un numéro matricule');
        return;
    }

    const student = findStudentByMatricule(matricule);
    const resultsSection = document.getElementById('results');
    
    if (student) {
        displayCertificate(student);
        resultsSection.classList.remove('hidden');
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        displayNoResults();
        resultsSection.classList.remove('hidden');
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function displayCertificate(student) {
    const resultsSection = document.getElementById('results');
    resultsSection.innerHTML = `
        <div class="max-w-2xl mx-auto bg-card-bg rounded-2xl p-8 shadow-2xl border border-accent-cyan/20">
            <div class="text-center mb-6">
                <div class="w-24 h-24 bg-gradient-to-br from-accent-cyan to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="text-primary-bg text-3xl w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd" />
                    </svg>
                </div>
                <h2 class="text-2xl font-bold text-accent-cyan mb-2">Certificat Authentifié</h2>
                <div class="w-16 h-1 bg-accent-cyan mx-auto"></div>
            </div>
            
            <div class="flex flex-col md:flex-row items-center gap-6">
                <div class="w-32 h-32 rounded-full overflow-hidden border-4 border-accent-cyan/30 flex-shrink-0">
                    <img 
                        src="${student.photo}" 
                        alt="Photo de ${student.firstName} ${student.name}" 
                        class="w-full h-full object-cover"
                        onerror="this.src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300'"
                    />
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
                    <svg class="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    <span class="text-green-400 font-semibold text-lg">Certificat Validé</span>
                </div>
                <p class="text-green-300">Ce certificat a été délivré avec succès par le Programme FUTUR et est authentique.</p>
            </div>
        </div>
    `;
}

function displayNoResults() {
    const resultsSection = document.getElementById('results');
    resultsSection.innerHTML = `
        <div class="max-w-md mx-auto text-center bg-red-900/20 border border-red-500/30 rounded-2xl p-8">
            <svg class="w-16 h-16 mx-auto mb-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            <h3 class="text-xl font-semibold mb-2 text-red-400">Certificat non trouvé</h3>
            <p class="text-gray-300">Aucun certificat trouvé pour ce numéro matricule.</p>
        </div>
    `;
}

// Fonctions Admin
function openAdminModal() {
    document.getElementById('adminModal').classList.remove('hidden');
    document.getElementById('adminPassword').focus();
}

function closeAdminModal() {
    document.getElementById('adminModal').classList.add('hidden');
    document.getElementById('adminPassword').value = '';
}

function handleAdminLogin(event) {
    event.preventDefault();
    const password = document.getElementById('adminPassword').value;
    
    if (password === 'futur2025') {
        isAdminLoggedIn = true;
        closeAdminModal();
        showAdminDashboard();
        showNotification('success', 'Connexion réussie');
    } else {
        showNotification('error', 'Mot de passe incorrect');
    }
}

function showAdminDashboard() {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = `
        <section class="container mx-auto px-4 py-8">
            <div class="max-w-4xl mx-auto">
                <div class="flex justify-between items-center mb-8">
                    <div>
                        <h2 class="text-3xl font-bold flex items-center space-x-3">
                            <svg class="w-8 h-8 text-accent-cyan" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Tableau de Bord Admin</span>
                        </h2>
                        <p class="text-text-light mt-2">Gestion des étudiants et certificats</p>
                    </div>
                    <button
                        onclick="logout()"
                        class="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-2"
                    >
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd" />
                        </svg>
                        <span>Déconnexion</span>
                    </button>
                </div>

                <!-- Formulaire d'ajout d'étudiant -->
                <div class="bg-card-bg rounded-2xl p-8 shadow-2xl border border-accent-cyan/20 mb-8">
                    <h3 class="text-2xl font-semibold mb-6 flex items-center space-x-3">
                        <svg class="w-6 h-6 text-accent-orange" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                        </svg>
                        <span>Ajouter un Étudiant</span>
                    </h3>
                    <form onsubmit="handleAddStudent(event)" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-semibold mb-2 text-text-light">Nom</label>
                            <input
                                type="text"
                                id="studentName"
                                placeholder="Entrez le nom..."
                                class="w-full px-4 py-3 bg-primary-bg border border-accent-cyan/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-cyan focus:ring-2 focus:ring-accent-cyan/20 transition-all"
                                required
                            />
                        </div>
                        <div>
                            <label class="block text-sm font-semibold mb-2 text-text-light">Prénom</label>
                            <input
                                type="text"
                                id="studentFirstName"
                                placeholder="Entrez le prénom..."
                                class="w-full px-4 py-3 bg-primary-bg border border-accent-cyan/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-cyan focus:ring-2 focus:ring-accent-cyan/20 transition-all"
                                required
                            />
                        </div>
                        <div>
                            <label class="block text-sm font-semibold mb-2 text-text-light">Matricule</label>
                            <input
                                type="text"
                                id="studentMatricule"
                                placeholder="Ex: FUT2024001"
                                class="w-full px-4 py-3 bg-primary-bg border border-accent-cyan/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-cyan focus:ring-2 focus:ring-accent-cyan/20 transition-all"
                                required
                            />
                        </div>
                        <div>
                            <label class="block text-sm font-semibold mb-2 text-text-light">Filière</label>
                            <select
                                id="studentFiliere"
                                class="w-full px-4 py-3 bg-primary-bg border border-accent-cyan/30 rounded-lg text-white focus:outline-none focus:border-accent-cyan focus:ring-2 focus:ring-accent-cyan/20 transition-all"
                                required
                            >
                                <option value="">Sélectionnez une filière...</option>
                                <option value="Informatique">Informatique</option>
                                <option value="Marketing Digital">Marketing Digital</option>
                                <option value="Comptabilité">Comptabilité</option>
                                <option value="Gestion">Gestion</option>
                                <option value="Communication">Communication</option>
                            </select>
                        </div>
                        <div class="md:col-span-2">
                            <label class="block text-sm font-semibold mb-2 text-text-light">Photo de l'étudiant</label>
                            <div class="relative">
                                <input
                                    type="file"
                                    id="studentPhoto"
                                    accept="image/*"
                                    onchange="handlePhotoUpload(event)"
                                    class="w-full px-4 py-3 bg-primary-bg border border-accent-cyan/30 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent-cyan file:text-primary-bg hover:file:bg-cyan-400 transition-all"
                                    required
                                />
                                <div id="photoPreview" class="mt-4 flex justify-center hidden">
                                    <div class="w-24 h-24 rounded-full overflow-hidden border-2 border-accent-cyan/30">
                                        <img id="previewImage" alt="Aperçu" class="w-full h-full object-cover" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="md:col-span-2">
                            <button
                                type="submit"
                                class="w-full bg-accent-cyan hover:bg-cyan-400 text-primary-bg font-semibold py-3 rounded-lg transition-all transform hover:scale-[1.02] flex items-center justify-center space-x-2"
                            >
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                                </svg>
                                <span>Ajouter l'Étudiant</span>
                            </button>
                        </div>
                    </form>
                </div>

                <!-- Liste des étudiants -->
                <div class="bg-card-bg rounded-2xl p-8 shadow-2xl border border-accent-cyan/20">
                    <h3 class="text-2xl font-semibold mb-6 flex items-center space-x-3">
                        <svg class="w-6 h-6 text-accent-cyan" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                        </svg>
                        <span>Liste des Étudiants</span>
                    </h3>
                    <div id="studentsList" class="space-y-4">
                        <!-- La liste sera générée dynamiquement -->
                    </div>
                </div>
            </div>
        </section>
    `;
    
    updateStudentsList();
}

function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('previewImage').src = e.target.result;
            document.getElementById('photoPreview').classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    }
}

function handleAddStudent(event) {
    event.preventDefault();
    
    const name = document.getElementById('studentName').value.trim().toUpperCase();
    const firstName = document.getElementById('studentFirstName').value.trim();
    const matricule = document.getElementById('studentMatricule').value.trim().toUpperCase();
    const filiere = document.getElementById('studentFiliere').value;
    const photoFile = document.getElementById('studentPhoto').files[0];
    
    // Vérifier si le matricule existe déjà
    if (findStudentByMatricule(matricule)) {
        showNotification('error', 'Ce matricule existe déjà');
        return;
    }
    
    if (photoFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const newStudent = {
                id: Date.now().toString(),
                name,
                firstName,
                matricule,
                filiere,
                photo: e.target.result
            };
            
            students.push(newStudent);
            updateStudentsList();
            
            // Réinitialiser le formulaire
            document.getElementById('studentName').value = '';
            document.getElementById('studentFirstName').value = '';
            document.getElementById('studentMatricule').value = '';
            document.getElementById('studentFiliere').value = '';
            document.getElementById('studentPhoto').value = '';
            document.getElementById('photoPreview').classList.add('hidden');
            
            showNotification('success', 'Étudiant ajouté avec succès!');
        };
        reader.readAsDataURL(photoFile);
    }
}

function updateStudentsList() {
    const studentsList = document.getElementById('studentsList');
    if (!studentsList) return;
    
    if (students.length === 0) {
        studentsList.innerHTML = `
            <div class="text-center text-text-light py-8">
                <svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                <p>Aucun étudiant enregistré</p>
            </div>
        `;
    } else {
        studentsList.innerHTML = students.map(student => `
            <div class="bg-primary-bg rounded-lg p-4 border border-accent-cyan/20 flex items-center space-x-4">
                <div class="w-16 h-16 rounded-full overflow-hidden border-2 border-accent-cyan/30 flex-shrink-0">
                    <img
                        src="${student.photo}"
                        alt="Photo de ${student.firstName} ${student.name}"
                        class="w-full h-full object-cover"
                        onerror="this.src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300'"
                    />
                </div>
                <div class="flex-1">
                    <h4 class="font-semibold text-white">${student.firstName} ${student.name}</h4>
                    <p class="text-accent-cyan text-sm font-mono">${student.matricule}</p>
                    <p class="text-text-light text-sm">${student.filiere}</p>
                </div>
                <div class="text-green-400">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                </div>
            </div>
        `).join('');
    }
}

function logout() {
    isAdminLoggedIn = false;
    location.reload();
}