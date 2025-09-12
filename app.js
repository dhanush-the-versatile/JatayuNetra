// JatayuNetra Emergency Response System - Enhanced Main Application JavaScript

// Application Data and Configuration
const APP_DATA = {
  languages: [
    {"code": "en", "name": "English", "nativeName": "English"},
    {"code": "hi", "name": "हिन्दी (Hindi)", "nativeName": "हिन्दी"},
    {"code": "bn", "name": "বাংলা (Bengali)", "nativeName": "বাংলা"},
    {"code": "mr", "name": "मराठी (Marathi)", "nativeName": "मराठी"},
    {"code": "te", "name": "తెలుగు (Telugu)", "nativeName": "తెলుగు"},
    {"code": "ta", "name": "தமিழ் (Tamil)", "nativeName": "তমিழ்"},
    {"code": "gu", "name": "ગુજરાતી (Gujarati)", "nativeName": "ગુজરાતી"},
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
  relationshipTypes: [
    {"id": "spouse", "name": "Spouse", "priority": 1},
    {"id": "parent", "name": "Parent", "priority": 2},
    {"id": "child", "name": "Child", "priority": 2},
    {"id": "sibling", "name": "Sibling", "priority": 3},
    {"id": "friend", "name": "Friend", "priority": 4},
    {"id": "colleague", "name": "Colleague", "priority": 5},
    {"id": "other", "name": "Other", "priority": 6}
  ],
  mockServiceData: {
    fuelStations: [
      {"name": "HPCL Petrol Pump", "type": "Petrol Station", "fuels": ["Petrol", "Diesel"], "amenities": ["Toilet", "ATM"], "rating": 4.2, "pricePerLiter": 95.67},
      {"name": "IOCL Fuel Station", "type": "Fuel Station", "fuels": ["Petrol", "Diesel", "CNG"], "amenities": ["Toilet", "Food", "ATM"], "rating": 4.5, "pricePerLiter": 96.12},
      {"name": "BPCL Energy Station", "type": "Petrol Pump", "fuels": ["Petrol", "Diesel"], "amenities": ["Toilet", "Car Wash"], "rating": 4.1, "pricePerLiter": 95.45}
    ],
    hospitals: [
      {"name": "City General Hospital", "type": "Multi-speciality", "specialties": ["Emergency", "Cardiology", "Neurology"], "rating": 4.3, "emergencyWard": true},
      {"name": "Apollo Medical Center", "type": "Private Hospital", "specialties": ["Emergency", "Orthopedics", "Gynecology"], "rating": 4.6, "emergencyWard": true},
      {"name": "AIIMS Medical College", "type": "Government Hospital", "specialties": ["Emergency", "Surgery", "Pediatrics"], "rating": 4.4, "emergencyWard": true}
    ],
    policeStations: [
      {"name": "City Police Station", "type": "Local Police", "services": ["Emergency Response", "FIR Registration", "Traffic"], "rating": 4.0, "emergencyResponse": true},
      {"name": "Highway Police Outpost", "type": "Traffic Police", "services": ["Highway Patrol", "Accident Response"], "rating": 4.2, "emergencyResponse": true},
      {"name": "Tourist Police Station", "type": "Tourist Police", "services": ["Tourist Help", "Emergency Response", "Guide Services"], "rating": 4.5, "emergencyResponse": true}
    ],
    mechanicServices: [
      {"name": "Quick Fix Auto Repair", "type": "Auto Repair", "services": ["Engine Repair", "Tire Service", "Towing"], "rating": 4.1, "emergency24x7": true},
      {"name": "Highway Auto Care", "type": "Roadside Assistance", "services": ["Towing", "Jump Start", "Tire Change"], "rating": 4.3, "emergency24x7": true},
      {"name": "Professional Auto Service", "type": "Service Center", "services": ["Repair", "Maintenance", "Parts"], "rating": 4.4, "emergency24x7": false}
    ]
  }
};

// Enhanced Translation System
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
    phone_number: "Phone Number",
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
    location_detected: "Location detected",
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
    pregnancy_case: "Pregnancy Emergency",
    general_medical: "General Medical",
    call_ambulance: "Call Ambulance",
    report_accident: "Report an Accident",
    report_danger: "Report Danger",
    general_police: "General Police Assistance",
    location_required: "Location permission required for this service",
    emergency_activated: "🚨 Emergency Activated",
    are_you_safe: "Are you safe?",
    seconds_remaining: "seconds remaining",
    im_safe: "I'm Safe",
    need_help: "Need Help",
    token_id: "Token ID",
    registration_date: "Registration Date",
    edit_profile: "Edit Profile",
    change_password: "Change Password",
    save_changes: "Save Changes",
    cancel: "Cancel",
    add_contact: "Add Contact",
    add_first_contact: "Add Your First Contact",
    no_contacts: "No emergency contacts added yet"
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
    phone_number: "फ़ोन नंबर",
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
    location_detected: "स्थान का पता लगाया गया",
    enable_location: "स्थान सक्षम करें",
    emergency_sos: "🚨 आपातकाल SOS",
    my_profile: "मेरी प्रोफ़ाइल",
    vehicle_assistance: "वाहन सहायता",
    medical_assistance: "चिकित्सा सहायता",
    police_assistance: "पुलिस सहायता",
    emergency_contacts: "आपातकालीन संपर्क",
    plan_trip: "नई यात्रा की योजना बनाएं",
    fuel_assistance: "ईंधन सहायता",
    air_assistance: "हवा सहायता",
    mechanic_assistance: "मैकेनिक सहायता",
    accident_case: "दुर्घटना मामला",
    pregnancy_case: "गर्भावस्था आपातकाल",
    general_medical: "सामान्य चिकित्सा",
    call_ambulance: "एम्बुलेंस बुलाएं",
    report_accident: "दुर्घटना की रिपोर्ट करें",
    report_danger: "खतरे की रिपोर्ट करें",
    general_police: "सामान्य पुलिस सहायता",
    back: "← वापस",
    location_required: "इस सेवा के लिए स्थान अनुमति आवश्यक है",
    emergency_activated: "🚨 आपातकाल सक्रिय",
    are_you_safe: "क्या आप सुरक्षित हैं?",
    seconds_remaining: "सेकंड शेष",
    im_safe: "मैं सुरक्षित हूं",
    need_help: "मदद चाहिए",
    token_id: "टोकन आईडी",
    registration_date: "पंजीकरण तिथि",
    edit_profile: "प्रोफ़ाइल संपादित करें",
    change_password: "पासवर्ड बदलें",
    save_changes: "परिवर्तन सहेजें",
    cancel: "रद्द करें",
    add_contact: "संपर्क जोड़ें",
    add_first_contact: "अपना पहला संपर्क जोड़ें",
    no_contacts: "अभी तक कोई आपातकालीन संपर्क नहीं जोड़ा गया"
  }
};

// Application State
let currentUser = null;
let currentLanguage = 'en';
let userLocation = null;
let sosTimer = null;
let locationWatchId = null;
let editingContactId = null;
let appInitialized = false;

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM Content Loaded - Starting JatayuNetra initialization...');
  
  // Delay initialization slightly to ensure all elements are ready
  setTimeout(() => {
    initializeApp();
  }, 100);
});

function initializeApp() {
  console.log('Initializing JatayuNetra app...');
  
  if (appInitialized) {
    console.log('App already initialized, skipping...');
    return;
  }
  
  try {
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
    
    // Initialize location services
    initializeLocationServices();
    
    appInitialized = true;
    console.log('JatayuNetra app initialized successfully');
    
    // Show success message
    setTimeout(() => {
      showAlert('JatayuNetra Emergency Response System loaded successfully', 'success');
    }, 500);
    
  } catch (error) {
    console.error('Error initializing app:', error);
    showAlert('Error initializing application. Please refresh the page.', 'error');
  }
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

// Language Management
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
        const iconMatch = element.textContent.match(/^(🚨|👤|🚗|🏥|🚔|📞|🗺️|⛽|🛞|🔧|🚑|🤰|📋|⚠️)/);
        const icon = iconMatch ? iconMatch[0] + ' ' : '';
        element.textContent = icon + translation;
      } else {
        element.textContent = translation;
      }
    });
  }, 100);
  
  if (langCode === 'ur') {
    document.documentElement.setAttribute('dir', 'rtl');
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
  }
}

function getTranslation(key) {
  return TRANSLATIONS[currentLanguage]?.[key] || TRANSLATIONS['en'][key] || key;
}

// Location Services - ENHANCED
function initializeLocationServices() {
  console.log('Initializing location services...');
  
  if ('geolocation' in navigator) {
    // Request location permission immediately with user-friendly prompts
    showAlert('📍 Requesting location permission for emergency services...', 'info');
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy
        };
        updateLocationStatus(true);
        showAlert('✅ Location access granted - Emergency services can now locate you', 'success');
        
        // Start watching location for continuous updates
        locationWatchId = navigator.geolocation.watchPosition(
          (position) => {
            userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              accuracy: position.coords.accuracy
            };
            updateLocationStatus(true);
          },
          (error) => {
            console.warn('Location watch error:', error);
          },
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
        );
      },
      (error) => {
        console.warn('Initial location error:', error);
        updateLocationStatus(false);
        showAlert('⚠️ Location access denied - Some features may be limited', 'warning');
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 300000 }
    );
  } else {
    console.warn('Geolocation not supported');
    updateLocationStatus(false);
    showAlert('❌ Geolocation not supported by your browser', 'error');
  }
}

function updateLocationStatus(enabled) {
  const locationDisplay = document.getElementById('locationDisplay');
  const enableLocationBtn = document.getElementById('enableLocation');
  
  if (locationDisplay) {
    if (enabled && userLocation) {
      locationDisplay.textContent = `📍 ${getTranslation('location_detected')} (±${Math.round(userLocation.accuracy)}m)`;
      locationDisplay.className = 'active';
    } else {
      locationDisplay.textContent = getTranslation('location_disabled');
      locationDisplay.className = '';
    }
  }
  
  if (enableLocationBtn) {
    enableLocationBtn.classList.toggle('hidden', enabled);
  }
}

function requestLocationPermission() {
  console.log('Requesting location permission...');
  
  if ('geolocation' in navigator) {
    showAlert('📍 Requesting location access...', 'info');
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy
        };
        updateLocationStatus(true);
        showAlert('Location enabled successfully', 'success');
      },
      (error) => {
        console.error('Location error:', error);
        let errorMessage = 'Location permission denied or unavailable';
        
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied by user';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out';
            break;
        }
        
        showAlert(errorMessage, 'error');
      },
      { enableHighAccuracy: true, timeout: 15000 }
    );
  } else {
    showAlert('Geolocation not supported by this browser', 'error');
  }
}

// Calculate distance between two coordinates (Haversine formula)
function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  
  return distance < 1 ? `${Math.round(distance * 1000)}m` : `${distance.toFixed(1)}km`;
}

// Generate mock services based on user location
function generateNearbyServices(serviceType, userLat, userLng) {
  const services = [];
  const baseServices = APP_DATA.mockServiceData[serviceType] || [];
  
  // Generate services within 10km radius of user location
  for (let i = 0; i < baseServices.length; i++) {
    const service = baseServices[i];
    // Generate random coordinates within 10km of user location
    const latOffset = (Math.random() - 0.5) * 0.1; // ~±5km
    const lngOffset = (Math.random() - 0.5) * 0.1; // ~±5km
    
    const serviceLat = userLat + latOffset;
    const serviceLng = userLng + lngOffset;
    
    services.push({
      ...service,
      lat: serviceLat,
      lng: serviceLng,
      distance: calculateDistance(userLat, userLng, serviceLat, serviceLng)
    });
  }
  
  // Sort by distance
  services.sort((a, b) => {
    const distanceA = parseFloat(a.distance.replace(/[km]/g, ''));
    const distanceB = parseFloat(b.distance.replace(/[km]/g, ''));
    return distanceA - distanceB;
  });
  
  return services;
}

// Event Listeners Setup - FIXED
function setupEventListeners() {
  console.log('Setting up event listeners...');
  
  try {
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', toggleTheme);
      console.log('Theme toggle listener added');
    }
    
    // Language selector
    const languageSelector = document.getElementById('languageSelector');
    if (languageSelector) {
      languageSelector.addEventListener('change', (e) => {
        updateLanguage(e.target.value);
      });
      console.log('Language selector listener added');
    }
    
    // Login form - FIXED
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', function(e) {
        console.log('Login form submitted');
        handleLogin(e);
      });
      console.log('Login form listener added');
    } else {
      console.error('Login form not found!');
    }
    
    // User type selector - FIXED
    const userTypeSelector = document.getElementById('userTypeSelector');
    if (userTypeSelector) {
      userTypeSelector.addEventListener('change', handleUserTypeChange);
      console.log('User type selector listener added');
    }
    
    // Registration buttons
    const showRegister = document.getElementById('showRegister');
    if (showRegister) {
      showRegister.addEventListener('click', () => {
        console.log('Show register clicked');
        showPage('registerPage');
      });
    }
    
    const backToLogin = document.getElementById('backToLogin');
    if (backToLogin) {
      backToLogin.addEventListener('click', () => {
        console.log('Back to login clicked');
        showPage('loginPage');
      });
    }
    
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
      registerForm.addEventListener('submit', handleRegistration);
    }
    
    // Add click event listeners using event delegation for better reliability
    document.addEventListener('click', function(e) {
      console.log('Document click:', e.target.id, e.target.className);
      
      // Service cards
      if (e.target.closest('.service-card')) {
        const serviceCard = e.target.closest('.service-card');
        const service = serviceCard.getAttribute('data-service');
        console.log('Service card clicked:', service);
        handleServiceClick(service);
        return;
      }
      
      // Service options
      if (e.target.closest('.service-option')) {
        const serviceOption = e.target.closest('.service-option');
        const service = serviceOption.getAttribute('data-service');
        console.log('Service option clicked:', service);
        handleServiceOptionClick(service);
        return;
      }
      
      // Back buttons
      if (e.target.closest('.back-btn')) {
        console.log('Back button clicked');
        if (currentUser && currentUser.userType === 'tourist') {
          showPage('touristDashboard');
        }
        return;
      }
      
      // Logout buttons
      if (e.target.matches('[id$="Logout"], #logoutBtn') || e.target.closest('[id$="Logout"], #logoutBtn')) {
        console.log('Logout button clicked');
        handleLogout();
        return;
      }
      
      // SOS button
      if (e.target.closest('#sosButton')) {
        console.log('SOS button clicked');
        triggerSOS();
        return;
      }
      
      // Location buttons
      if (e.target.matches('#enableLocation, #requestLocation')) {
        console.log('Location button clicked');
        requestLocationPermission();
        return;
      }
      
      // Modal close buttons
      if (e.target.closest('.modal-close')) {
        console.log('Modal close clicked');
        closeModal();
        return;
      }
      
      // SOS modal buttons
      if (e.target.matches('#imSafe')) {
        console.log('I am safe clicked');
        handleSOSSafe();
        return;
      } else if (e.target.matches('#needHelp')) {
        console.log('Need help clicked');
        handleSOSHelp();
        return;
      }
      
      // Logo click
      if (e.target.closest('.logo')) {
        console.log('Logo clicked');
        if (currentUser && confirm('Are you sure you want to go back to login?')) {
          handleLogout();
        }
        return;
      }
      
      // Profile management buttons
      if (e.target.matches('#editProfileBtn')) {
        showProfileEdit();
      } else if (e.target.matches('#cancelEditBtn')) {
        cancelProfileEdit();
      } else if (e.target.matches('#changePasswordBtn')) {
        showModal('passwordModal');
      }
      
      // Emergency contacts buttons
      if (e.target.matches('#addContactBtn, #addFirstContact')) {
        showAddContactModal();
      }
      
      // Emergency action buttons
      if (e.target.matches('#callEmergencyBtn')) {
        handleEmergencyCall();
      } else if (e.target.matches('#reportAccidentBtn')) {
        showPage('reportAccidentPage');
      }
    });
    
    // Form submissions
    const editProfileForm = document.getElementById('editProfileForm');
    if (editProfileForm) {
      editProfileForm.addEventListener('submit', saveProfileChanges);
    }
    
    const passwordForm = document.getElementById('passwordForm');
    if (passwordForm) {
      passwordForm.addEventListener('submit', handlePasswordChange);
    }
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    const tripPlannerForm = document.getElementById('tripPlannerForm');
    if (tripPlannerForm) {
      tripPlannerForm.addEventListener('submit', handleTripSubmit);
    }
    
    const accidentReportForm = document.getElementById('accidentReportForm');
    if (accidentReportForm) {
      accidentReportForm.addEventListener('submit', handleAccidentReport);
    }
    
    console.log('All event listeners set up successfully');
    
  } catch (error) {
    console.error('Error setting up event listeners:', error);
    showAlert('Error setting up application. Please refresh the page.', 'error');
  }
}

// Page Management
function showPage(pageId) {
  console.log('Showing page:', pageId);
  
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => {
    page.classList.remove('active');
  });
  
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add('active');
    console.log('Page shown successfully:', pageId);
  } else {
    console.error('Page not found:', pageId);
    return;
  }
  
  // Initialize page-specific functionality
  switch (pageId) {
    case 'profilePage':
      loadProfileData();
      break;
    case 'emergencyContactsPage':
      loadEmergencyContacts();
      break;
    case 'fuelAssistancePage':
      loadFuelStations();
      break;
    case 'accidentEmergencyPage':
      loadTraumaCenters();
      break;
    case 'reportAccidentPage':
      initializeAccidentReport();
      break;
    case 'tripPlannerPage':
      initializeTripPlanner();
      break;
  }
  
  setTimeout(() => updateLanguage(currentLanguage), 100);
}

// Authentication - FIXED
function handleUserTypeChange(e) {
  console.log('User type changed to:', e.target.value);
  const userType = e.target.value;
  const registerOption = document.getElementById('registerOption');
  
  if (userType === 'tourist') {
    registerOption.classList.remove('hidden');
    console.log('Registration option shown for tourist');
  } else {
    registerOption.classList.add('hidden');
    console.log('Registration option hidden for non-tourist');
  }
}

function handleLogin(e) {
  e.preventDefault();
  console.log('Login attempt started...');
  
  const userType = document.getElementById('userTypeSelector').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  console.log('Login data:', { userType, username, password: password ? '***' : 'empty' });
  
  if (!userType || !username || !password) {
    showAlert('Please fill in all fields', 'error');
    console.log('Login failed: Missing fields');
    return;
  }
  
  // Check tourist registration first
  if (userType === 'tourist') {
    console.log('Checking tourist registration...');
    const registeredTourists = JSON.parse(localStorage.getItem('registeredTourists') || '[]');
    console.log('Registered tourists:', registeredTourists.length);
    
    const tourist = registeredTourists.find(t => t.username === username && t.password === password);
    if (tourist) {
      console.log('Tourist login successful:', tourist.username);
      loginUser(tourist, userType);
      return;
    }
  }
  
  // Check preset users
  if (APP_DATA.presetUsers[userType]) {
    console.log('Checking preset users for:', userType);
    const user = APP_DATA.presetUsers[userType].find(u => u.username === username && u.password === password);
    if (user) {
      console.log('Preset user login successful:', user.username);
      loginUser(user, userType);
      return;
    }
  }
  
  console.log('Login failed: Invalid credentials');
  showAlert('Invalid username or password', 'error');
}

function handleRegistration(e) {
  e.preventDefault();
  console.log('Registration attempt started...');
  
  const fullName = document.getElementById('regFullName').value;
  const username = document.getElementById('regUsername').value;
  const email = document.getElementById('regEmail').value;
  const phoneNumber = document.getElementById('regPhoneNumber').value;
  const aadharId = document.getElementById('aadharId').value;
  const password = document.getElementById('regPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const idProof = document.getElementById('idProof').files[0];
  
  // Validate all fields
  if (!fullName || !username || !email || !phoneNumber || !aadharId || !password || !confirmPassword || !idProof) {
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
  
  // Validate phone number
  if (!/^\d{10}$/.test(phoneNumber)) {
    showAlert('Phone number must be 10 digits', 'error');
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
    phoneNumber,
    aadharId,
    password,
    tokenId,
    registeredAt: new Date().toISOString()
  };
  
  // Save user
  registeredTourists.push(newUser);
  localStorage.setItem('registeredTourists', JSON.stringify(registeredTourists));
  
  console.log('Tourist registered successfully:', username);
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
  console.log('Logging in user:', user.username, 'as', userType);
  
  currentUser = {
    ...user,
    userType
  };
  
  // Save session
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  console.log('User session saved');
  
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
  
  const dashboardPage = dashboardMap[userType];
  console.log('Redirecting to dashboard:', dashboardPage);
  
  showPage(dashboardPage);
  showAlert(`Welcome ${user.name || user.fullName || user.username}!`, 'success');
  
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
  console.log('Logging out user...');
  
  currentUser = null;
  userLocation = null;
  editingContactId = null;
  
  // Stop location watching
  if (locationWatchId) {
    navigator.geolocation.clearWatch(locationWatchId);
    locationWatchId = null;
  }
  
  localStorage.removeItem('currentUser');
  
  // Clear forms
  const loginForm = document.getElementById('loginForm');
  if (loginForm) loginForm.reset();
  
  const registerForm = document.getElementById('registerForm');
  if (registerForm) registerForm.reset();
  
  showPage('loginPage');
  showAlert('Logged out successfully', 'success');
  
  setTimeout(() => updateLanguage(currentLanguage), 100);
}

function checkExistingSession() {
  console.log('Checking existing session...');
  
  const savedUser = localStorage.getItem('currentUser');
  if (savedUser) {
    try {
      currentUser = JSON.parse(savedUser);
      console.log('Existing session found for:', currentUser.username);
      
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
      
      showAlert(`Welcome back, ${currentUser.name || currentUser.fullName || currentUser.username}!`, 'success');
      
    } catch (e) {
      console.error('Error parsing saved user session:', e);
      localStorage.removeItem('currentUser');
    }
  } else {
    console.log('No existing session found');
  }
}

// Profile Management
function loadProfileData() {
  if (!currentUser) return;
  
  const profileName = document.getElementById('profileName');
  const profileEmail = document.getElementById('profileEmail');
  const profileUsername = document.getElementById('profileUsername');
  const profileTokenId = document.getElementById('profileTokenId');
  const profilePhone = document.getElementById('profilePhone');
  const profileAadhar = document.getElementById('profileAadhar');
  const profileRegistered = document.getElementById('profileRegistered');
  
  if (profileName) profileName.textContent = currentUser.fullName || currentUser.name || '-';
  if (profileEmail) profileEmail.textContent = currentUser.email || '-';
  if (profileUsername) profileUsername.textContent = currentUser.username || '-';
  if (profileTokenId) profileTokenId.textContent = currentUser.tokenId || '-';
  if (profilePhone) profilePhone.textContent = currentUser.phoneNumber || '-';
  if (profileAadhar) profileAadhar.textContent = currentUser.aadharId || '-';
  if (profileRegistered && currentUser.registeredAt) {
    const date = new Date(currentUser.registeredAt);
    profileRegistered.textContent = date.toLocaleDateString();
  }
}

function showProfileEdit() {
  const profileView = document.getElementById('profileView');
  const profileEdit = document.getElementById('profileEdit');
  
  if (profileView && profileEdit) {
    profileView.classList.add('hidden');
    profileEdit.classList.remove('hidden');
    
    // Populate form
    const editFullName = document.getElementById('editFullName');
    const editEmail = document.getElementById('editEmail');
    const editPhone = document.getElementById('editPhone');
    
    if (editFullName) editFullName.value = currentUser.fullName || currentUser.name || '';
    if (editEmail) editEmail.value = currentUser.email || '';
    if (editPhone) editPhone.value = currentUser.phoneNumber || '';
  }
}

function cancelProfileEdit() {
  const profileView = document.getElementById('profileView');
  const profileEdit = document.getElementById('profileEdit');
  
  if (profileView && profileEdit) {
    profileView.classList.remove('hidden');
    profileEdit.classList.add('hidden');
  }
}

function saveProfileChanges(e) {
  e.preventDefault();
  
  const editFullName = document.getElementById('editFullName');
  const editEmail = document.getElementById('editEmail');
  const editPhone = document.getElementById('editPhone');
  
  // Validate phone number
  if (editPhone && editPhone.value && !/^\d{10}$/.test(editPhone.value)) {
    showAlert('Phone number must be 10 digits', 'error');
    return;
  }
  
  // Update user data
  if (editFullName) currentUser.fullName = editFullName.value;
  if (editEmail) currentUser.email = editEmail.value;
  if (editPhone) currentUser.phoneNumber = editPhone.value;
  
  // Save to localStorage
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  
  // Update tourist registry if user is tourist
  if (currentUser.userType === 'tourist') {
    const registeredTourists = JSON.parse(localStorage.getItem('registeredTourists') || '[]');
    const userIndex = registeredTourists.findIndex(t => t.username === currentUser.username);
    if (userIndex >= 0) {
      registeredTourists[userIndex] = { ...registeredTourists[userIndex], ...currentUser };
      localStorage.setItem('registeredTourists', JSON.stringify(registeredTourists));
    }
  }
  
  cancelProfileEdit();
  loadProfileData();
  showAlert('Profile updated successfully', 'success');
}

function handlePasswordChange(e) {
  e.preventDefault();
  
  const currentPassword = document.getElementById('currentPassword').value;
  const newPassword = document.getElementById('newPassword').value;
  const confirmNewPassword = document.getElementById('confirmNewPassword').value;
  
  // Verify current password
  if (currentPassword !== currentUser.password) {
    showAlert('Current password is incorrect', 'error');
    return;
  }
  
  // Validate new password
  if (!validatePassword(newPassword)) {
    showAlert('New password must have 8+ characters, uppercase, number, and special character', 'error');
    return;
  }
  
  // Confirm new password
  if (newPassword !== confirmNewPassword) {
    showAlert('New passwords do not match', 'error');
    return;
  }
  
  // Update password
  currentUser.password = newPassword;
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  
  // Update tourist registry if user is tourist
  if (currentUser.userType === 'tourist') {
    const registeredTourists = JSON.parse(localStorage.getItem('registeredTourists') || '[]');
    const userIndex = registeredTourists.findIndex(t => t.username === currentUser.username);
    if (userIndex >= 0) {
      registeredTourists[userIndex].password = newPassword;
      localStorage.setItem('registeredTourists', JSON.stringify(registeredTourists));
    }
  }
  
  closeModal();
  document.getElementById('passwordForm').reset();
  showAlert('Password changed successfully', 'success');
}

// Emergency Contacts Management
function loadEmergencyContacts() {
  if (!currentUser) return;
  
  const contactsList = document.getElementById('contactsList');
  const emptyState = contactsList.querySelector('.empty-state');
  const contacts = getEmergencyContacts();
  
  // Clear existing contacts (except empty state)
  const existingContacts = contactsList.querySelectorAll('.contact-card');
  existingContacts.forEach(card => card.remove());
  
  if (contacts.length === 0) {
    emptyState.classList.remove('hidden');
  } else {
    emptyState.classList.add('hidden');
    
    contacts.forEach(contact => {
      const contactCard = createContactCard(contact);
      contactsList.appendChild(contactCard);
    });
  }
  
  // Update trip planner contact options
  updateTripEmergencyContactOptions();
}

function getEmergencyContacts() {
  if (!currentUser) return [];
  const key = `emergencyContacts_${currentUser.username}`;
  return JSON.parse(localStorage.getItem(key) || '[]');
}

function saveEmergencyContacts(contacts) {
  if (!currentUser) return;
  const key = `emergencyContacts_${currentUser.username}`;
  localStorage.setItem(key, JSON.stringify(contacts));
}

function createContactCard(contact) {
  const card = document.createElement('div');
  card.className = 'contact-card';
  card.innerHTML = `
    <div class="contact-header">
      <div class="contact-info">
        <h4>${contact.name}</h4>
        <p class="contact-phone">${contact.phone}</p>
        <p>${contact.relationship} • <span class="priority-badge ${contact.priority}">${contact.priority}</span></p>
      </div>
      <div class="contact-actions">
        <button class="btn btn--sm btn--outline" onclick="editContact('${contact.id}')">Edit</button>
        <button class="btn btn--sm btn--primary" onclick="testContact('${contact.phone}')">Call</button>
        <button class="btn btn--sm" style="background: var(--color-error); color: white;" onclick="deleteContact('${contact.id}')">Delete</button>
      </div>
    </div>
  `;
  return card;
}

function showAddContactModal(contactId = null) {
  editingContactId = contactId;
  const modal = document.getElementById('contactModal');
  const modalTitle = document.getElementById('contactModalTitle');
  const form = document.getElementById('contactForm');
  
  if (contactId) {
    const contacts = getEmergencyContacts();
    const contact = contacts.find(c => c.id === contactId);
    if (contact) {
      modalTitle.textContent = 'Edit Emergency Contact';
      document.getElementById('contactName').value = contact.name;
      document.getElementById('contactPhone').value = contact.phone;
      document.getElementById('contactRelationship').value = contact.relationship;
      document.getElementById('contactPriority').value = contact.priority;
    }
  } else {
    modalTitle.textContent = 'Add Emergency Contact';
    form.reset();
  }
  
  showModal('contactModal');
}

function handleContactSubmit(e) {
  e.preventDefault();
  
  const name = document.getElementById('contactName').value;
  const phone = document.getElementById('contactPhone').value;
  const relationship = document.getElementById('contactRelationship').value;
  const priority = document.getElementById('contactPriority').value;
  
  // Validate phone number
  if (!/^\d{10}$/.test(phone)) {
    showAlert('Phone number must be 10 digits', 'error');
    return;
  }
  
  const contacts = getEmergencyContacts();
  
  // Check if we're editing or adding
  if (editingContactId) {
    const contactIndex = contacts.findIndex(c => c.id === editingContactId);
    if (contactIndex >= 0) {
      contacts[contactIndex] = {
        ...contacts[contactIndex],
        name,
        phone,
        relationship,
        priority
      };
    }
  } else {
    // Check limit (max 10 contacts)
    if (contacts.length >= 10) {
      showAlert('Maximum 10 emergency contacts allowed', 'error');
      return;
    }
    
    const newContact = {
      id: `contact_${Date.now()}`,
      name,
      phone,
      relationship,
      priority,
      createdAt: new Date().toISOString()
    };
    
    contacts.push(newContact);
  }
  
  saveEmergencyContacts(contacts);
  closeModal();
  loadEmergencyContacts();
  showAlert(editingContactId ? 'Contact updated successfully' : 'Contact added successfully', 'success');
  
  editingContactId = null;
}

// Service Handling
function handleServiceClick(service) {
  console.log('Service clicked:', service);
  
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
      showPage('profilePage');
      break;
    case 'contacts':
      showPage('emergencyContactsPage');
      break;
    case 'trip':
      showPage('tripPlannerPage');
      break;
    default:
      showAlert(`${service} service clicked - Feature coming soon!`, 'info');
  }
}

function handleServiceOptionClick(service) {
  console.log('Service option clicked:', service);
  
  switch (service) {
    case 'fuel':
      showPage('fuelAssistancePage');
      break;
    case 'air':
    case 'mechanic':
      loadMechanicServices();
      break;
    case 'accident':
      showPage('accidentEmergencyPage');
      break;
    case 'pregnancy':
      loadPregnancyServices();
      break;
    case 'general-medical':
      loadGeneralMedicalServices();
      break;
    case 'ambulance':
      handleAmbulanceCall();
      break;
    case 'report-accident':
      showPage('reportAccidentPage');
      break;
    case 'report-danger':
      handleDangerReport();
      break;
    case 'general-police':
      loadPoliceServices();
      break;
    default:
      showAlert(`${service} feature coming soon!`, 'info');
  }
}

// Service Results Loading
function loadFuelStations() {
  if (!userLocation) {
    showAlert('📍 Requesting location for nearby fuel stations...', 'info');
    requestLocationPermission();
    return;
  }
  
  const locationInfo = document.getElementById('fuelLocationInfo');
  const stationsList = document.getElementById('fuelStationsList');
  
  if (locationInfo) {
    locationInfo.textContent = `Finding fuel stations near your location (${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)})`;
  }
  
  // Show loading state
  if (stationsList) {
    stationsList.innerHTML = `
      <div class="loading-state">
        <div class="spinner"></div>
        <p>Loading fuel stations...</p>
      </div>
    `;
  }
  
  // Simulate loading delay
  setTimeout(() => {
    const stations = generateNearbyServices('fuelStations', userLocation.lat, userLocation.lng);
    
    if (stationsList) {
      stationsList.innerHTML = stations.map(station => `
        <div class="result-item">
          <div class="result-header">
            <div class="result-info">
              <h4>${station.name}</h4>
              <p>${station.type} • Rating: ${station.rating}⭐</p>
              <p>₹${station.pricePerLiter}/L</p>
              <div class="service-features">
                ${station.fuels.map(fuel => `<span class="feature-tag">${fuel}</span>`).join('')}
                ${station.amenities.map(amenity => `<span class="feature-tag">${amenity}</span>`).join('')}
              </div>
            </div>
            <div class="result-distance">${station.distance}</div>
          </div>
          <div class="result-actions">
            <button class="btn btn--primary" onclick="getDirections(${station.lat}, ${station.lng})">Get Directions</button>
            <button class="btn btn--outline" onclick="callService('${station.name}', '${station.phone || '+919876543210'}')">Call Station</button>
          </div>
        </div>
      `).join('');
    }
  }, 1500);
}

function loadTraumaCenters() {
  if (!userLocation) {
    showAlert('📍 Requesting location for nearby hospitals...', 'info');
    requestLocationPermission();
    return;
  }
  
  const locationInfo = document.getElementById('accidentLocationInfo');
  const centersList = document.getElementById('traumaCentersList');
  
  if (locationInfo) {
    locationInfo.textContent = `Finding hospitals near your location (${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)})`;
  }
  
  // Show loading state
  if (centersList) {
    centersList.innerHTML = `
      <div class="loading-state">
        <div class="spinner"></div>
        <p>Loading trauma centers...</p>
      </div>
    `;
  }
  
  setTimeout(() => {
    const hospitals = generateNearbyServices('hospitals', userLocation.lat, userLocation.lng);
    
    if (centersList) {
      centersList.innerHTML = hospitals.map(hospital => `
        <div class="result-item">
          <div class="result-header">
            <div class="result-info">
              <h4>${hospital.name}</h4>
              <p>${hospital.type} • Rating: ${hospital.rating}⭐</p>
              <div class="service-features">
                ${hospital.specialties.map(specialty => `<span class="feature-tag">${specialty}</span>`).join('')}
                ${hospital.emergencyWard ? '<span class="feature-tag" style="background: var(--color-success); color: white;">24/7 Emergency</span>' : ''}
              </div>
            </div>
            <div class="result-distance">${hospital.distance}</div>
          </div>
          <div class="result-actions">
            <button class="btn btn--primary" onclick="getDirections(${hospital.lat}, ${hospital.lng})">Get Directions</button>
            <button class="btn emergency-btn" onclick="callService('${hospital.name}', '102')">Call Emergency</button>
          </div>
        </div>
      `).join('');
    }
  }, 1500);
}

function loadMechanicServices() {
  showAlert('🔧 Finding nearby mechanic services...', 'info');
  setTimeout(() => {
    showAlert('Mechanic services loaded - check your area for 24/7 roadside assistance', 'success');
  }, 1500);
}

function loadPregnancyServices() {
  showAlert('🤰 Finding nearby maternity hospitals and emergency services...', 'info');
  setTimeout(() => {
    showAlert('📞 For pregnancy emergencies, call 102 for ambulance or visit nearest maternity hospital', 'info');
  }, 1500);
}

function loadGeneralMedicalServices() {
  showAlert('🏥 Finding general medical services...', 'info');
  setTimeout(() => {
    showAlert('Medical services available - use Emergency or specific service options for faster access', 'success');
  }, 1500);
}

function loadPoliceServices() {
  showAlert('🚔 Finding nearby police stations...', 'info');
  setTimeout(() => {
    showAlert('Police services available - for emergencies, call 100 immediately', 'success');
  }, 1500);
}

// Emergency Handlers
function handleEmergencyCall() {
  showAlert('📞 Calling Emergency Services (112)...', 'error');
  setTimeout(() => {
    showAlert('🚨 Emergency services have been notified of your location', 'info');
  }, 2000);
}

function handleAmbulanceCall() {
  if (!userLocation) {
    requestLocationPermission();
    return;
  }
  
  showAlert('🚑 Dispatching ambulance to your location...', 'error');
  setTimeout(() => {
    showAlert('📍 Ambulance ETA: 8-12 minutes. Stay calm and keep phone accessible.', 'info');
  }, 2000);
}

function handleDangerReport() {
  if (!userLocation) {
    requestLocationPermission();
    return;
  }
  
  showAlert('⚠️ Danger alert sent to police with your location', 'error');
  setTimeout(() => {
    showAlert('🚔 Police have been notified. Stay in a safe location if possible.', 'info');
  }, 2000);
}

// Trip Planner
function initializeTripPlanner() {
  if (!currentUser) return;
  
  // Set current location as starting point
  const tripStartLocation = document.getElementById('tripStartLocation');
  if (tripStartLocation && userLocation) {
    tripStartLocation.value = `${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)} (Current Location)`;
  }
  
  updateTripEmergencyContactOptions();
}

function updateTripEmergencyContactOptions() {
  const contactSelect = document.getElementById('tripEmergencyContact');
  if (!contactSelect) return;
  
  const contacts = getEmergencyContacts();
  
  // Clear existing options except first
  const firstOption = contactSelect.querySelector('option');
  contactSelect.innerHTML = '';
  contactSelect.appendChild(firstOption);
  
  contacts.forEach(contact => {
    const option = document.createElement('option');
    option.value = contact.id;
    option.textContent = `${contact.name} (${contact.relationship}) - ${contact.phone}`;
    contactSelect.appendChild(option);
  });
}

function handleTripSubmit(e) {
  e.preventDefault();
  
  showAlert('🗺️ Trip plan created successfully! Have a safe journey.', 'success');
  e.target.reset();
  
  setTimeout(() => {
    showPage('touristDashboard');
  }, 2000);
}

// Accident Report
function initializeAccidentReport() {
  // Set current location
  const accidentLocation = document.getElementById('accidentLocation');
  if (accidentLocation && userLocation) {
    accidentLocation.innerHTML = `
      <span>📍 ${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)}</span>
      <p style="margin: 4px 0 0 0; font-size: 12px; color: var(--color-text-secondary);">
        Accuracy: ±${Math.round(userLocation.accuracy)}m
      </p>
    `;
  }
}

function handleAccidentReport(e) {
  e.preventDefault();
  
  showAlert('📋 Accident report submitted successfully. Police have been notified.', 'success');
  
  setTimeout(() => {
    showPage('policeAssistance');
  }, 3000);
}

// SOS System
function triggerSOS() {
  console.log('SOS triggered');
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
  
  showAlert('🚨 EMERGENCY DISPATCH ACTIVATED', 'error');
  setTimeout(() => {
    showAlert('📍 Location shared with Police, Hospital & Emergency Services', 'info');
  }, 1500);
  setTimeout(() => {
    showAlert('📱 Emergency contacts notified via SMS', 'info');
  }, 3000);
  setTimeout(() => {
    showAlert('🚑 Emergency services are responding to your location', 'info');
  }, 4500);
}

// Utility Functions
function getDirections(lat, lng) {
  const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  window.open(url, '_blank');
}

function callService(serviceName, phoneNumber) {
  showAlert(`📞 Calling ${serviceName} at ${phoneNumber}...`, 'info');
  setTimeout(() => {
    showAlert('📱 Call connected (Simulated)', 'success');
  }, 2000);
}

function showModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('hidden');
  }
}

function closeModal() {
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    modal.classList.add('hidden');
  });
}

function editContact(contactId) {
  showAddContactModal(contactId);
}

function deleteContact(contactId) {
  if (confirm('Are you sure you want to delete this contact?')) {
    const contacts = getEmergencyContacts();
    const updatedContacts = contacts.filter(c => c.id !== contactId);
    saveEmergencyContacts(updatedContacts);
    loadEmergencyContacts();
    showAlert('Contact deleted successfully', 'success');
  }
}

function testContact(phone) {
  showAlert(`📞 Calling ${phone}... (Simulated call)`, 'info');
}

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
    border-left: 4px solid var(--color-${type === 'error' ? 'error' : type === 'success' ? 'success' : type === 'warning' ? 'warning' : 'info'});
    z-index: 1001;
    max-width: 320px;
    animation: slideIn 0.3s ease;
    line-height: 1.4;
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
  }, 4000);
}

// Add CSS for alert animations
const alertStyles = document.createElement('style');
alertStyles.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
`;
document.head.appendChild(alertStyles);

// Export functions for global access
window.getDirections = getDirections;
window.callService = callService;
window.editContact = editContact;
window.deleteContact = deleteContact;
window.testContact = testContact;
window.showPage = showPage;