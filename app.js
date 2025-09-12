// JatayuNetra Emergency Response System - Main Application JavaScript

// Application Data and Configuration
const APP_DATA = {
  languages: [
    {"code": "en", "name": "English", "nativeName": "English"},
    {"code": "hi", "name": "हिन्दी (Hindi)", "nativeName": "हिन्दी"},
    {"code": "bn", "name": "বাংলা (Bengali)", "nativeName": "বাংলা"},
    {"code": "mr", "name": "मराठी (Marathi)", "nativeName": "मराठी"},
    {"code": "te", "name": "తెలుగు (Telugu)", "nativeName": "తెలుగు"},
    {"code": "ta", "name": "தமிழ் (Tamil)", "nativeName": "தமிழ்"},
    {"code": "gu", "name": "ગુજરાતી (Gujarati)", "nativeName": "ગુજરાતી"},
    {"code": "ur", "name": "اردو (Urdu)", "nativeName": "اردو"},
    {"code": "kn", "name": "ಕನ್ನಡ (Kannada)", "nativeName": "ಕನ್ನಡ"},
    {"code": "or", "name": "ଓଡ଼ିଆ (Odia)", "nativeName": "ଓଡ଼ିଆ"},
    {"code": "ml", "name": "മലയാളം (Malayalam)", "nativeName": "മലയാളം"}
  ],
  emergencyNumbers: {
    unified: "112",
    police: "100",
    fire: "101",
    ambulance: "102",
    women: "1091",
    child: "1098",
    disaster: "108",
    tourist: "1363"
  },
  userTypes: [
    {"id": "tourist", "name": "Tourist/Citizen", "canRegister": true},
    {"id": "tourism", "name": "Tourism Department", "canRegister": false},
    {"id": "police", "name": "Police Department", "canRegister": false},
    {"id": "hospital", "name": "Hospital/Medical", "canRegister": false},
    {"id": "authority", "name": "Government Authority", "canRegister": false}
  ],
  presetUsers: {
    tourism: [
      {"username": "TOUR001", "password": "Tourism@123", "name": "Tourism Officer Delhi", "tokenId": "TOU-DEL-001"},
      {"username": "TOUR002", "password": "Tourism@456", "name": "Tourism Officer Mumbai", "tokenId": "TOU-MUM-002"}
    ],
    police: [
      {"username": "POL001", "password": "Police@123", "name": "Inspector Sharma", "tokenId": "POL-DEL-001"},
      {"username": "POL002", "password": "Police@456", "name": "Inspector Singh", "tokenId": "POL-MUM-002"}
    ],
    hospital: [
      {"username": "HOS001", "password": "Hospital@123", "name": "AIIMS Emergency", "tokenId": "HOS-DEL-001"},
      {"username": "HOS002", "password": "Hospital@456", "name": "Apollo Emergency", "tokenId": "HOS-MUM-002"}
    ],
    authority: [
      {"username": "AUTH001", "password": "Authority@123", "name": "District Collector Delhi", "tokenId": "AUT-DEL-001"},
      {"username": "AUTH002", "password": "Authority@456", "name": "District Collector Mumbai", "tokenId": "AUT-MUM-002"}
    ]
  },
  mockServices: {
    fuelStations: [
      {"name": "HPCL Petrol Pump", "distance": "1.2 km", "lat": 28.6139, "lng": 77.2090},
      {"name": "IOCL Fuel Station", "distance": "2.5 km", "lat": 28.6129, "lng": 77.2295},
      {"name": "BPCL Pump", "distance": "3.1 km", "lat": 28.6169, "lng": 77.2312}
    ],
    hospitals: [
      {"name": "AIIMS Delhi", "distance": "2.1 km", "speciality": "Emergency", "lat": 28.5672, "lng": 77.2070},
      {"name": "Apollo Hospital", "distance": "3.5 km", "speciality": "Multi-speciality", "lat": 28.6692, "lng": 77.2265},
      {"name": "Max Hospital", "distance": "4.2 km", "speciality": "Trauma Center", "lat": 28.5921, "lng": 77.2507}
    ],
    policeStations: [
      {"name": "Parliament Street PS", "distance": "1.8 km", "lat": 28.6230, "lng": 77.2046},
      {"name": "Connaught Place PS", "distance": "2.3 km", "lat": 28.6315, "lng": 77.2167},
      {"name": "Karol Bagh PS", "distance": "3.7 km", "lat": 28.6507, "lng": 77.1900}
    ],
    mechanics: [
      {"name": "Quick Fix Auto", "distance": "0.8 km", "service": "24/7", "lat": 28.6095, "lng": 77.2245},
      {"name": "Roadside Assistance Pro", "distance": "1.5 km", "service": "Towing", "lat": 28.6156, "lng": 77.2134},
      {"name": "Auto Care Center", "distance": "2.2 km", "service": "Repair", "lat": 28.6234, "lng": 77.2167}
    ]
  }
};

// Translation System - Expanded
const TRANSLATIONS = {
  en: {
    welcome_title: "Welcome to JatayuNetra",
    welcome_subtitle: "Emergency Response & Incident Management System",
    user_type: "User Type",
    select_user_type: "Select User Type",
    tourist: "Tourist/Citizen",
    tourism_dept: "Tourism Department",
    police_dept: "Police Department",
    hospital: "Hospital/Medical",
    authority: "Government Authority",
    username: "Username",
    password: "Password",
    login: "Login",
    no_account: "Don't have an account?",
    create_account: "Create Account",
    demo_credentials: "Demo Credentials",
    create_account_title: "Create Tourist Account",
    full_name: "Full Name",
    email: "Email",
    aadhar_id: "Aadhar ID",
    aadhar_help: "12-digit Aadhar number",
    id_proof: "ID Proof (JPG/PNG)",
    confirm_password: "Confirm Password",
    password_requirements: "8+ chars, uppercase, number, special character",
    register: "Register",
    back_to_login: "Back to Login",
    dashboard: "Dashboard",
    welcome: "Welcome",
    logout: "Logout",
    location_status: "Location Status",
    location_disabled: "Location disabled",
    enable_location: "Enable Location",
    emergency_sos: "🚨 EMERGENCY SOS",
    my_profile: "My Profile",
    vehicle_assistance: "Vehicle Assistance",
    medical_assistance: "Medical Assistance",
    police_assistance: "Police Assistance",
    emergency_contacts: "Emergency Contacts",
    plan_trip: "Plan a New Trip",
    tourism_dashboard: "Tourism Department Dashboard",
    police_dashboard: "Police Department Dashboard",
    hospital_dashboard: "Hospital Dashboard",
    authority_dashboard: "Authority Dashboard",
    tourist_monitoring: "Tourist Monitoring",
    active_tourists: "Active Tourists",
    incident_reports: "Incident Reports",
    today: "Today",
    emergency_alerts: "Emergency Alerts",
    active_alerts: "Active",
    sos_triggered: "SOS Triggered - Tourist ID: TOU123",
    accident_reported: "Accident Reported - NH1",
    ambulance_dispatch: "Ambulance Dispatch",
    available: "Available",
    emergency_cases: "Emergency Cases",
    system_status: "System Status",
    operational: "Operational",
    total_users: "Total Users",
    back: "← Back",
    fuel_assistance: "Fuel Assistance",
    air_assistance: "Air Assistance",
    mechanic_assistance: "Mechanic Assistance",
    accident_case: "Accident Case",
    pregnancy_case: "Pregnancy Case",
    other_cases: "Other Cases",
    call_ambulance: "Call Ambulance",
    report_accident: "Report an Accident",
    report_danger: "Report Danger",
    other_assistance: "Other Assistance",
    location_required: "Location permission required for this service",
    emergency_activated: "🚨 Emergency Activated",
    are_you_safe: "Are you safe?",
    seconds_remaining: "seconds remaining",
    im_safe: "I'm Safe",
    need_help: "Need Help"
  },
  hi: {
    welcome_title: "जतायुनेत्र में आपका स्वागत है",
    welcome_subtitle: "आपातकालीन प्रतिक्रिया और घटना प्रबंधन प्रणाली",
    user_type: "उपयोगकर्ता प्रकार",
    select_user_type: "उपयोगकर्ता प्रकार चुनें",
    tourist: "पर्यटक/नागरिक",
    tourism_dept: "पर्यटन विभाग",
    police_dept: "पुलिस विभाग",
    hospital: "अस्पताल/चिकित्सा",
    authority: "सरकारी प्राधिकरण",
    username: "उपयोगकर्ता नाम",
    password: "पासवर्ड",
    login: "लॉगिन",
    no_account: "क्या आपका खाता नहीं है?",
    create_account: "खाता बनाएं",
    demo_credentials: "डेमो क्रेडेंशियल",
    create_account_title: "पर्यटक खाता बनाएं",
    full_name: "पूरा नाम",
    email: "ईमेल",
    aadhar_id: "आधार आईडी",
    aadhar_help: "12-अंकीय आधार संख्या",
    id_proof: "पहचान प्रमाण (JPG/PNG)",
    confirm_password: "पासवर्ड की पुष्टि करें",
    password_requirements: "8+ अक्षर, बड़ा अक्षर, संख्या, विशेष अक्षर",
    register: "रजिस्टर करें",
    back_to_login: "लॉगिन पर वापस जाएं",
    dashboard: "डैशबोर्ड",
    welcome: "स्वागत",
    logout: "लॉगआउट",
    location_status: "स्थान स्थिति",
    location_disabled: "स्थान अक्षम",
    enable_location: "स्थान सक्षम करें",
    emergency_sos: "🚨 आपातकाल SOS",
    my_profile: "मेरी प्रोफ़ाइल",
    vehicle_assistance: "वाहन सहायता",
    medical_assistance: "चिकित्सा सहायता",
    police_assistance: "पुलिस सहायता",
    emergency_contacts: "आपातकालीन संपर्क",
    plan_trip: "नई यात्रा की योजना बनाएं",
    tourism_dashboard: "पर्यटन विभाग डैशबोर्ड",
    police_dashboard: "पुलिस विभाग डैशबोर्ड",
    hospital_dashboard: "अस्पताल डैशबोर्ड",
    authority_dashboard: "प्राधिकरण डैशबोर्ड",
    tourist_monitoring: "पर्यटक निगरानी",
    active_tourists: "सक्रिय पर्यटक",
    incident_reports: "घटना रिपोर्ट",
    today: "आज",
    emergency_alerts: "आपातकालीन अलर्ट",
    active_alerts: "सक्रिय",
    sos_triggered: "SOS सक्रिय - पर्यटक ID: TOU123",
    accident_reported: "दुर्घटना की सूचना - NH1",
    ambulance_dispatch: "एम्बुलेंस डिस्पैच",
    available: "उपलब्ध",
    emergency_cases: "आपातकालीन मामले",
    system_status: "सिस्टम स्थिति",
    operational: "परिचालन",
    total_users: "कुल उपयोगकर्ता",
    back: "← वापस",
    fuel_assistance: "ईंधन सहायता",
    air_assistance: "हवा सहायता",
    mechanic_assistance: "मैकेनिक सहायता",
    accident_case: "दुर्घटना मामला",
    pregnancy_case: "गर्भावस्था मामला",
    other_cases: "अन्य मामले",
    call_ambulance: "एम्बुलेंस बुलाएं",
    report_accident: "दुर्घटना की रिपोर्ट करें",
    report_danger: "खतरे की रिपोर्ट करें",
    other_assistance: "अन्य सहायता",
    location_required: "इस सेवा के लिए स्थान अनुमति आवश्यक है",
    emergency_activated: "🚨 आपातकाल सक्रिय",
    are_you_safe: "क्या आप सुरक्षित हैं?",
    seconds_remaining: "सेकंड शेष",
    im_safe: "मैं सुरक्षित हूं",
    need_help: "मदद चाहिए"
  }
};

// Application State
let currentUser = null;
let currentLanguage = 'en';
let userLocation = null;
let sosTimer = null;

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  // Initialize theme
  initializeTheme();
  
  // Initialize language system
  initializeLanguage();
  
  // Setup event listeners
  setupEventListeners();
  
  // Show login page by default
  showPage('loginPage');
  
  // Check if user is already logged in
  checkExistingSession();
  
  // Initialize location on load
  setTimeout(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          updateLocationStatus(true);
        },
        () => {
          // Silent fail for location
        }
      );
    }
  }, 1000);
}

// Theme Management
function initializeTheme() {
  const savedTheme = localStorage.getItem('jatayunetra-theme') || 'light';
  document.documentElement.setAttribute('data-color-scheme', savedTheme);
  updateThemeToggle(savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-color-scheme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  document.documentElement.setAttribute('data-color-scheme', newTheme);
  localStorage.setItem('jatayunetra-theme', newTheme);
  updateThemeToggle(newTheme);
}

function updateThemeToggle(theme) {
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
  }
}

// Language Management - FIXED
function initializeLanguage() {
  const savedLanguage = localStorage.getItem('jatayunetra-language') || 'en';
  currentLanguage = savedLanguage;
  
  const languageSelector = document.getElementById('languageSelector');
  if (languageSelector) {
    languageSelector.value = savedLanguage;
    updateLanguage(savedLanguage);
  }
}

function updateLanguage(langCode) {
  currentLanguage = langCode;
  localStorage.setItem('jatayunetra-language', langCode);
  
  // Update all translatable elements - FIXED
  setTimeout(() => {
    const translatableElements = document.querySelectorAll('[data-translate]');
    translatableElements.forEach(element => {
      const key = element.getAttribute('data-translate');
      const translation = getTranslation(key);
      
      if (element.tagName === 'INPUT' && (element.type === 'submit' || element.type === 'button')) {
        element.value = translation;
      } else if (element.tagName === 'OPTION') {
        element.textContent = translation;
      } else if (element.tagName === 'BUTTON') {
        // Preserve icons for buttons
        const iconMatch = element.textContent.match(/^(🚨|👤|🚗|🏥|🚔|📞|🗺️|⛽|🛞|🔧|🚑|🤰|📋|⚠️)/);
        const icon = iconMatch ? iconMatch[0] + ' ' : '';
        element.textContent = icon + translation;
      } else {
        element.textContent = translation;
      }
    });
  }, 100);
  
  // Update document direction for RTL languages
  if (langCode === 'ur') {
    document.documentElement.setAttribute('dir', 'rtl');
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
  }
}

function getTranslation(key) {
  return TRANSLATIONS[currentLanguage]?.[key] || TRANSLATIONS['en'][key] || key;
}

// Event Listeners Setup
function setupEventListeners() {
  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
  
  // Language selector - FIXED
  const languageSelector = document.getElementById('languageSelector');
  if (languageSelector) {
    languageSelector.addEventListener('change', (e) => {
      updateLanguage(e.target.value);
    });
  }
  
  // Login form
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
  
  // User type selector
  const userTypeSelector = document.getElementById('userTypeSelector');
  if (userTypeSelector) {
    userTypeSelector.addEventListener('change', handleUserTypeChange);
  }
  
  // Registration
  const showRegister = document.getElementById('showRegister');
  if (showRegister) {
    showRegister.addEventListener('click', () => showPage('registerPage'));
  }
  
  const backToLogin = document.getElementById('backToLogin');
  if (backToLogin) {
    backToLogin.addEventListener('click', () => showPage('loginPage'));
  }
  
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', handleRegistration);
  }
  
  // Dashboard services
  document.addEventListener('click', (e) => {
    if (e.target.closest('.service-card')) {
      const service = e.target.closest('.service-card').getAttribute('data-service');
      handleServiceClick(service);
    }
  });
  
  // Service options
  document.addEventListener('click', (e) => {
    if (e.target.closest('.service-option')) {
      const service = e.target.closest('.service-option').getAttribute('data-service');
      handleServiceOptionClick(service);
    }
  });
  
  // Back buttons
  document.addEventListener('click', (e) => {
    if (e.target.closest('.back-btn')) {
      if (currentUser && currentUser.userType === 'tourist') {
        showPage('touristDashboard');
      }
    }
  });
  
  // Logout buttons - FIXED
  document.addEventListener('click', (e) => {
    if (e.target.matches('[id$="Logout"], #logoutBtn') || e.target.closest('[id$="Logout"], #logoutBtn')) {
      handleLogout();
    }
  });
  
  // SOS button
  document.addEventListener('click', (e) => {
    if (e.target.closest('#sosButton')) {
      triggerSOS();
    }
  });
  
  // Location enable
  document.addEventListener('click', (e) => {
    if (e.target.matches('#enableLocation, #requestLocation')) {
      requestLocationPermission();
    }
  });
  
  // Modal close
  document.addEventListener('click', (e) => {
    if (e.target.closest('.modal-close')) {
      closeModal();
    }
  });
  
  // SOS modal buttons
  document.addEventListener('click', (e) => {
    if (e.target.matches('#imSafe')) {
      handleSOSSafe();
    } else if (e.target.matches('#needHelp')) {
      handleSOSHelp();
    }
  });
  
  // Logo click to go back to login - ADDED
  document.addEventListener('click', (e) => {
    if (e.target.closest('.logo')) {
      if (confirm('Are you sure you want to go back to login?')) {
        handleLogout();
      }
    }
  });
}

// Page Management
function showPage(pageId) {
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => {
    page.classList.remove('active');
  });
  
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add('active');
  }
  
  // Update language after page change
  setTimeout(() => updateLanguage(currentLanguage), 100);
}

// Authentication
function handleUserTypeChange(e) {
  const userType = e.target.value;
  const registerOption = document.getElementById('registerOption');
  
  if (userType === 'tourist') {
    registerOption.classList.remove('hidden');
  } else {
    registerOption.classList.add('hidden');
  }
}

function handleLogin(e) {
  e.preventDefault();
  
  const userType = document.getElementById('userTypeSelector').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  if (!userType || !username || !password) {
    showAlert('Please fill in all fields', 'error');
    return;
  }
  
  // Check tourist registration first
  const registeredTourists = JSON.parse(localStorage.getItem('registeredTourists') || '[]');
  if (userType === 'tourist') {
    const tourist = registeredTourists.find(t => t.username === username && t.password === password);
    if (tourist) {
      loginUser(tourist, userType);
      return;
    }
  }
  
  // Check preset users
  if (APP_DATA.presetUsers[userType]) {
    const user = APP_DATA.presetUsers[userType].find(u => u.username === username && u.password === password);
    if (user) {
      loginUser(user, userType);
      return;
    }
  }
  
  showAlert('Invalid credentials', 'error');
}

function handleRegistration(e) {
  e.preventDefault();
  
  const fullName = document.getElementById('regFullName').value;
  const username = document.getElementById('regUsername').value;
  const email = document.getElementById('regEmail').value;
  const aadharId = document.getElementById('aadharId').value;
  const password = document.getElementById('regPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const idProof = document.getElementById('idProof').files[0];
  
  // Validate all fields
  if (!fullName || !username || !email || !aadharId || !password || !confirmPassword || !idProof) {
    showAlert('Please fill in all fields', 'error');
    return;
  }
  
  // Validate password
  if (!validatePassword(password)) {
    showAlert('Password must have 8+ characters, uppercase, number, and special character', 'error');
    return;
  }
  
  // Validate password confirmation
  if (password !== confirmPassword) {
    showAlert('Passwords do not match', 'error');
    return;
  }
  
  // Validate Aadhar
  if (!/^\d{12}$/.test(aadharId)) {
    showAlert('Aadhar ID must be 12 digits', 'error');
    return;
  }
  
  // Check if username already exists
  const registeredTourists = JSON.parse(localStorage.getItem('registeredTourists') || '[]');
  if (registeredTourists.find(t => t.username === username)) {
    showAlert('Username already exists', 'error');
    return;
  }
  
  // Generate token ID
  const tokenId = `TOU-REG-${Date.now().toString().slice(-6)}`;
  
  // Create new user
  const newUser = {
    fullName,
    username,
    email,
    aadharId,
    password,
    tokenId,
    registeredAt: new Date().toISOString()
  };
  
  // Save user
  registeredTourists.push(newUser);
  localStorage.setItem('registeredTourists', JSON.stringify(registeredTourists));
  
  showAlert('Registration successful! Please login with your credentials', 'success');
  
  // Clear form and go to login
  setTimeout(() => {
    showPage('loginPage');
  }, 2000);
}

function validatePassword(password) {
  const hasLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return hasLength && hasUppercase && hasNumber && hasSpecial;
}

function loginUser(user, userType) {
  currentUser = {
    ...user,
    userType
  };
  
  // Save session
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  
  // Update welcome message
  updateWelcomeMessage();
  
  // Show appropriate dashboard
  const dashboardMap = {
    tourist: 'touristDashboard',
    tourism: 'tourismDashboard',
    police: 'policeDashboard',
    hospital: 'hospitalDashboard',
    authority: 'authorityDashboard'
  };
  
  showPage(dashboardMap[userType]);
  showAlert(`Welcome ${user.name || user.fullName || user.username}!`, 'success');
  
  // Update language after login
  setTimeout(() => updateLanguage(currentLanguage), 200);
}

function updateWelcomeMessage() {
  const userWelcome = document.getElementById('userWelcome');
  if (userWelcome && currentUser) {
    const name = currentUser.name || currentUser.fullName || currentUser.username;
    userWelcome.textContent = `${getTranslation('welcome')} ${name}`;
  }
}

function handleLogout() {
  currentUser = null;
  userLocation = null;
  localStorage.removeItem('currentUser');
  
  // Clear forms
  const loginForm = document.getElementById('loginForm');
  if (loginForm) loginForm.reset();
  
  const registerForm = document.getElementById('registerForm');
  if (registerForm) registerForm.reset();
  
  showPage('loginPage');
  showAlert('Logged out successfully', 'success');
  
  // Update language after logout
  setTimeout(() => updateLanguage(currentLanguage), 100);
}

function checkExistingSession() {
  const savedUser = localStorage.getItem('currentUser');
  if (savedUser) {
    try {
      currentUser = JSON.parse(savedUser);
      updateWelcomeMessage();
      
      const dashboardMap = {
        tourist: 'touristDashboard',
        tourism: 'tourismDashboard',
        police: 'policeDashboard',
        hospital: 'hospitalDashboard',
        authority: 'authorityDashboard'
      };
      
      showPage(dashboardMap[currentUser.userType]);
      setTimeout(() => updateLanguage(currentLanguage), 200);
    } catch (e) {
      localStorage.removeItem('currentUser');
    }
  }
}

// Service Handling
function handleServiceClick(service) {
  switch (service) {
    case 'vehicle':
      showPage('vehicleAssistance');
      break;
    case 'medical':
      showPage('medicalAssistance');
      break;
    case 'police':
      showPage('policeAssistance');
      break;
    case 'profile':
      showUserProfile();
      break;
    case 'contacts':
      showEmergencyContacts();
      break;
    case 'trip':
      showTripPlanner();
      break;
  }
}

function handleServiceOptionClick(service) {
  if (['fuel', 'air', 'mechanic', 'accident', 'ambulance'].includes(service)) {
    if (!userLocation) {
      showLocationRequiredModal(service);
    } else {
      showServiceResults(service);
    }
  } else {
    showServiceModal(service);
  }
}

// Location Services
function requestLocationPermission() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        updateLocationStatus(true);
        showAlert('Location enabled successfully', 'success');
        closeModal();
      },
      (error) => {
        console.error('Location error:', error);
        showAlert('Location permission denied', 'error');
      }
    );
  } else {
    showAlert('Geolocation not supported', 'error');
  }
}

function updateLocationStatus(enabled) {
  const locationDisplay = document.getElementById('locationDisplay');
  const enableLocationBtn = document.getElementById('enableLocation');
  
  if (locationDisplay) {
    if (enabled && userLocation) {
      locationDisplay.textContent = `Location: ${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)}`;
      locationDisplay.className = 'active';
    } else {
      locationDisplay.textContent = getTranslation('location_disabled');
      locationDisplay.className = '';
    }
  }
  
  if (enableLocationBtn) {
    enableLocationBtn.style.display = enabled ? 'none' : 'block';
  }
}

// SOS System
function triggerSOS() {
  showSOSModal();
  startSOSCountdown();
}

function showSOSModal() {
  const sosModal = document.getElementById('sosModal');
  if (sosModal) {
    sosModal.classList.remove('hidden');
  }
}

function startSOSCountdown() {
  let timeLeft = 15;
  const countdownEl = document.getElementById('countdown');
  
  sosTimer = setInterval(() => {
    timeLeft--;
    if (countdownEl) countdownEl.textContent = timeLeft;
    
    if (timeLeft <= 0) {
      clearInterval(sosTimer);
      activateEmergencyDispatch();
    }
  }, 1000);
}

function handleSOSSafe() {
  clearInterval(sosTimer);
  closeModal();
  showAlert('SOS cancelled - Stay safe!', 'success');
}

function handleSOSHelp() {
  clearInterval(sosTimer);
  activateEmergencyDispatch();
}

function activateEmergencyDispatch() {
  closeModal();
  
  const alertData = {
    userId: currentUser?.tokenId || 'UNKNOWN',
    userName: currentUser?.name || currentUser?.fullName || 'Unknown User',
    aadharId: currentUser?.aadharId || 'N/A',
    location: userLocation || { lat: 28.6139, lng: 77.2090 }, // Default Delhi location
    timestamp: new Date().toISOString()
  };
  
  // Simulate emergency dispatch
  showAlert('🚨 EMERGENCY DISPATCH ACTIVATED', 'error');
  setTimeout(() => {
    showAlert('📍 Location shared with Police, Hospital & Emergency Contacts', 'info');
  }, 1500);
  setTimeout(() => {
    showAlert('📱 SMS sent to emergency contacts', 'info');
  }, 3000);
  
  // Log the emergency
  console.log('Emergency Dispatch:', alertData);
}

// Modal Management
function showLocationRequiredModal(service) {
  const modal = document.getElementById('serviceModal');
  const modalTitle = document.getElementById('modalTitle');
  const locationRequired = document.getElementById('locationRequired');
  const serviceList = document.getElementById('serviceList');
  
  if (modalTitle) modalTitle.textContent = getServiceTitle(service);
  if (locationRequired) locationRequired.classList.remove('hidden');
  if (serviceList) serviceList.innerHTML = '';
  
  if (modal) modal.classList.remove('hidden');
}

function showServiceResults(service) {
  const modal = document.getElementById('serviceModal');
  const modalTitle = document.getElementById('modalTitle');
  const locationRequired = document.getElementById('locationRequired');
  const serviceList = document.getElementById('serviceList');
  
  if (modalTitle) modalTitle.textContent = getServiceTitle(service);
  if (locationRequired) locationRequired.classList.add('hidden');
  
  // Get relevant services
  let services = [];
  switch (service) {
    case 'fuel':
      services = APP_DATA.mockServices.fuelStations;
      break;
    case 'air':
    case 'mechanic':
      services = APP_DATA.mockServices.mechanics;
      break;
    case 'accident':
    case 'ambulance':
      services = APP_DATA.mockServices.hospitals;
      break;
  }
  
  if (serviceList) {
    serviceList.innerHTML = services.map(service => `
      <div class="service-item">
        <div class="service-info">
          <h4>${service.name}</h4>
          <p>${service.speciality || service.service || 'Available 24/7'}</p>
        </div>
        <div class="service-distance">${service.distance}</div>
        <button class="get-directions" onclick="getDirections(${service.lat}, ${service.lng})">
          Directions
        </button>
      </div>
    `).join('');
  }
  
  if (modal) modal.classList.remove('hidden');
}

function showServiceModal(service) {
  showAlert(`${getServiceTitle(service)} - Feature coming soon!`, 'info');
}

function getServiceTitle(service) {
  const titles = {
    fuel: 'Fuel Stations',
    air: 'Air Assistance',
    mechanic: 'Mechanic Services',
    accident: 'Emergency Services',
    ambulance: 'Call Ambulance',
    pregnancy: 'Pregnancy Care',
    other: 'Medical Services',
    'report-accident': 'Report Accident',
    'report-danger': 'Report Danger',
    'other-police': 'Police Assistance'
  };
  
  return titles[service] || service;
}

function getDirections(lat, lng) {
  const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  window.open(url, '_blank');
}

function closeModal() {
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    modal.classList.add('hidden');
  });
}

// Additional Features
function showUserProfile() {
  if (!currentUser) return;
  
  showAlert('Profile feature coming soon!', 'info');
}

function showEmergencyContacts() {
  showAlert('Emergency Contacts feature coming soon!', 'info');
}

function showTripPlanner() {
  showAlert('Trip Planner feature coming soon!', 'info');
}

// Utility Functions
function showAlert(message, type = 'info') {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type}`;
  alertDiv.style.cssText = `
    position: fixed;
    top: 80px;
    right: 20px;
    background: var(--color-surface);
    color: var(--color-text);
    padding: 16px 20px;
    border-radius: 8px;
    box-shadow: var(--shadow-lg);
    border-left: 4px solid var(--color-${type === 'error' ? 'error' : type === 'success' ? 'success' : 'info'});
    z-index: 1001;
    max-width: 300px;
    animation: slideIn 0.3s ease;
  `;
  
  alertDiv.textContent = message;
  document.body.appendChild(alertDiv);
  
  setTimeout(() => {
    alertDiv.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      if (alertDiv.parentNode) {
        alertDiv.parentNode.removeChild(alertDiv);
      }
    }, 300);
  }, 3000);
}

// Add CSS for alert animations
const alertStyles = document.createElement('style');
alertStyles.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(alertStyles);

// Export functions for global access
window.getDirections = getDirections;
window.requestLocationPermission = requestLocationPermission;