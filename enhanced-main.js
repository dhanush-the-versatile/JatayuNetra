// Smart Tourist Safety Monitoring & Incident Response System
// Northeast India - Enhanced Main JavaScript
// AI, Blockchain, Geo-Fencing & IoT Integration

// Global Variables
let currentUser = null;
let currentScreen = 'loading';
let userTimeZone = null;
let greetingUpdateInterval = null;
let backgroundMonitoringInterval = null;
let geofencingInterval = null;
let currentLocation = null;
let digitalTouristID = null;
let safetyScore = 95;
let emergencyContacts = [];
let isEmergencyActive = false;
let sosActivationTimer = null;
let countdownInterval = null;
let currentSpeed = 0;
let aiMonitoringData = {
    behaviorPattern: 'normal',
    anomaliesDetected: 0,
    lastLocationUpdate: new Date(),
    routeDeviation: 0,
    inactivityDuration: 0
};

// Northeast India States Data
const NORTHEAST_STATES = {
    'arunachal': {
        name: 'Arunachal Pradesh',
        capital: 'Itanagar',
        riskLevel: 'medium',
        requiresPermit: true,
        tourismPolice: '+91-360-2214456',
        languages: ['Hindi', 'English', 'Local dialects']
    },
    'assam': {
        name: 'Assam',
        capital: 'Guwahati',
        riskLevel: 'low',
        requiresPermit: false,
        tourismPolice: '+91-361-2237728',
        languages: ['Assamese', 'Bengali', 'Hindi', 'English']
    },
    'manipur': {
        name: 'Manipur',
        capital: 'Imphal',
        riskLevel: 'medium',
        requiresPermit: true,
        tourismPolice: '+91-385-2414555',
        languages: ['Manipuri', 'Hindi', 'English']
    },
    'meghalaya': {
        name: 'Meghalaya',
        capital: 'Shillong',
        riskLevel: 'low',
        requiresPermit: false,
        tourismPolice: '+91-364-2226618',
        languages: ['Khasi', 'Garo', 'English', 'Hindi']
    },
    'mizoram': {
        name: 'Mizoram',
        capital: 'Aizawl',
        riskLevel: 'medium',
        requiresPermit: true,
        tourismPolice: '+91-389-2323333',
        languages: ['Mizo', 'Hindi', 'English']
    },
    'nagaland': {
        name: 'Nagaland',
        capital: 'Kohima',
        riskLevel: 'medium',
        requiresPermit: true,
        tourismPolice: '+91-370-2290632',
        languages: ['Nagamese', 'English', 'Hindi']
    },
    'sikkim': {
        name: 'Sikkim',
        capital: 'Gangtok',
        riskLevel: 'low',
        requiresPermit: true,
        tourismPolice: '+91-3592-280688',
        languages: ['Nepali', 'Hindi', 'English']
    },
    'tripura': {
        name: 'Tripura',
        capital: 'Agartala',
        riskLevel: 'low',
        requiresPermit: false,
        tourismPolice: '+91-381-2315347',
        languages: ['Bengali', 'Hindi', 'English']
    }
};

// Geo-fencing Zones
const GEOFENCE_ZONES = {
    safe: {
        color: '#10B981',
        message: 'You are in a safe tourist zone',
        restrictions: []
    },
    restricted: {
        color: '#F59E0B',
        message: 'Special permit required for this area',
        restrictions: ['permit_required', 'escort_recommended']
    },
    high_risk: {
        color: '#EF4444',
        message: 'High-risk area - exercise extreme caution',
        restrictions: ['permit_required', 'escort_mandatory', 'daylight_only']
    },
    border: {
        color: '#8B5CF6',
        message: 'Approaching international border - restricted access',
        restrictions: ['permit_required', 'escort_mandatory', 'no_photography']
    }
};

// Emergency Response Configuration
const EMERGENCY_CONFIG = {
    responseTime: {
        police: 180, // 3 minutes
        medical: 300, // 5 minutes
        tourism: 120  // 2 minutes
    },
    contactNumbers: {
        police: '100',
        medical: '102',
        fire: '101',
        disaster: '108'
    },
    aiThresholds: {
        routeDeviation: 5000, // 5km
        inactivityTimeout: 3600, // 1 hour
        speedAnomaly: 150, // 150 km/h
        panicPattern: 3 // consecutive panic signals
    }
};

// Sample Data
const sampleTouristData = {
    personalInfo: {
        name: "Rajesh Kumar",
        age: 28,
        gender: "Male",
        phone: "+91-9876543210",
        email: "rajesh.kumar@email.com",
        bloodGroup: "O+",
        nationality: "Indian",
        idType: "aadhaar",
        idNumber: "XXXX-XXXX-1234"
    },
    tripDetails: {
        digitalId: "TST-AS-2025-001234",
        arrivalDate: "2025-09-11",
        departureDate: "2025-09-18",
        duration: 7,
        primaryState: "assam",
        itinerary: [
            { day: 1, location: "Guwahati", state: "assam" },
            { day: 2, location: "Guwahati", state: "assam" },
            { day: 3, location: "Shillong", state: "meghalaya" },
            { day: 4, location: "Shillong", state: "meghalaya" },
            { day: 5, location: "Gangtok", state: "sikkim" },
            { day: 6, location: "Gangtok", state: "sikkim" },
            { day: 7, location: "Guwahati", state: "assam" }
        ]
    },
    emergencyContacts: [
        { id: 1, name: "Priya Kumar", relation: "family", phone: "+91-9876543250", email: "priya@email.com", priority: "high" },
        { id: 2, name: "Dr. Sharma", relation: "medical", phone: "+91-9876543251", email: "sharma@hospital.com", priority: "high" },
        { id: 3, name: "HDFC Insurance", relation: "insurance", phone: "+91-9876543252", email: "claims@hdfc.com", priority: "medium" }
    ],
    location: {
        latitude: 26.1445,
        longitude: 91.7362,
        address: "Guwahati City Center, Assam",
        accuracy: "High (±3m)",
        lastUpdate: new Date()
    }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    console.log('🏔️ Smart Tourist Safety System - Northeast India Initializing...');
    initializeApp();
});

function initializeApp() {
    showLoadingScreen();
    
    // Simulate system initialization
    setTimeout(() => {
        hideLoadingScreen();
        checkUserSession();
    }, 3000);
    
    // Setup global event listeners
    setupGlobalEventListeners();
    
    // Initialize AI monitoring
    initializeAIMonitoring();
    
    // Initialize geofencing
    initializeGeofencing();
    
    // Setup emergency detection
    setupEmergencyDetection();
}

// Screen Management
function showLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.remove('hidden');
        
        // Update loading messages
        const messages = [
            'Connecting to Blockchain Network...',
            'Initializing AI Monitoring Systems...',
            'Loading Geo-fencing Data...',
            'Connecting to Emergency Services...',
            'Verifying IoT Device Connections...',
            'System Ready!'
        ];
        
        let messageIndex = 0;
        const loadingText = document.querySelector('.loading-text');
        
        const messageInterval = setInterval(() => {
            if (loadingText && messageIndex < messages.length) {
                loadingText.textContent = messages[messageIndex];
                messageIndex++;
            } else {
                clearInterval(messageInterval);
            }
        }, 500);
    }
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
    }
}

function checkUserSession() {
    const savedSession = localStorage.getItem('smartTouristSession');
    
    if (savedSession) {
        try {
            const session = JSON.parse(savedSession);
            currentUser = session;
            digitalTouristID = session.digitalId;
            showDashboard();
        } catch (error) {
            console.error('Error parsing saved session:', error);
            showRegistrationScreen();
        }
    } else {
        showRegistrationScreen();
    }
}

function showRegistrationScreen() {
    currentScreen = 'registration';
    hideAllScreens();
    
    const registrationScreen = document.getElementById('digital-id-screen');
    if (registrationScreen) {
        registrationScreen.classList.remove('hidden');
    }
    
    setupRegistrationEventListeners();
}

function showLoginScreen() {
    currentScreen = 'login';
    hideAllScreens();
    
    const loginScreen = document.getElementById('login-screen');
    if (loginScreen) {
        loginScreen.classList.remove('hidden');
    }
    
    setupLoginEventListeners();
}

function showDashboard() {
    currentScreen = 'dashboard';
    
    // Load dashboard content
    if (window.location.pathname.includes('dashboard.html') || 
        document.getElementById('tourist-dashboard')) {
        initializeDashboard();
    } else {
        window.location.href = 'enhanced-dashboard.html';
    }
}

function hideAllScreens() {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.add('hidden'));
}

// Registration Functions
function setupRegistrationEventListeners() {
    // ID type selector
    const idTypeBtns = document.querySelectorAll('.id-type-btn');
    idTypeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const idType = this.dataset.type;
            selectIDType(idType);
        });
    });
    
    // Registration form
    const registrationForm = document.getElementById('digital-id-form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', handleRegistration);
    }
    
    // Proceed button
    const proceedBtn = document.getElementById('proceed-to-app');
    if (proceedBtn) {
        proceedBtn.addEventListener('click', () => {
            saveUserSession();
            showDashboard();
        });
    }
    
    // Register link
    const registerLink = document.getElementById('register-link');
    if (registerLink) {
        registerLink.addEventListener('click', (e) => {
            e.preventDefault();
            showRegistrationScreen();
        });
    }
}

function selectIDType(type) {
    const idTypeBtns = document.querySelectorAll('.id-type-btn');
    idTypeBtns.forEach(btn => btn.classList.remove('active'));
    
    event.target.classList.add('active');
    
    const registrationForm = document.getElementById('digital-id-form');
    const selector = document.querySelector('.id-type-selector');
    
    if (registrationForm && selector) {
        selector.classList.add('hidden');
        registrationForm.classList.remove('hidden');
        
        // Update form fields based on ID type
        const idLabel = document.querySelector('label[for="id-number"]');
        const idInput = document.getElementById('id-number');
        
        if (type === 'domestic') {
            idLabel.textContent = 'Aadhaar Number';
            idInput.placeholder = 'Enter 12-digit Aadhaar number';
        } else {
            idLabel.textContent = 'Passport Number';
            idInput.placeholder = 'Enter passport number';
        }
    }
}

function handleRegistration(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const registrationData = {
        name: formData.get('tourist-name'),
        idNumber: formData.get('id-number'),
        mobile: formData.get('mobile-number'),
        arrivalDate: formData.get('arrival-date'),
        departureDate: formData.get('departure-date'),
        destinationState: formData.get('destination-state'),
        itinerary: formData.get('planned-itinerary'),
        emergencyName: formData.get('emergency-name'),
        emergencyPhone: formData.get('emergency-phone'),
        emergencyRelation: formData.get('emergency-relation'),
        locationConsent: formData.get('location-consent') === 'on',
        dataConsent: formData.get('data-consent') === 'on',
        termsConsent: formData.get('terms-consent') === 'on'
    };
    
    // Validate required fields
    if (!registrationData.name || !registrationData.mobile || !registrationData.arrivalDate) {
        showToast('Please fill in all required fields', 'error');
        return;
    }
    
    // Validate consent checkboxes
    if (!registrationData.locationConsent || !registrationData.dataConsent || !registrationData.termsConsent) {
        showToast('Please accept all required consents', 'error');
        return;
    }
    
    // Show ID generation progress
    showIDGenerationProgress(registrationData);
}

function showIDGenerationProgress(data) {
    const form = document.getElementById('digital-id-form');
    const progress = document.getElementById('id-generation-progress');
    
    if (form && progress) {
        form.classList.add('hidden');
        progress.classList.remove('hidden');
        
        // Simulate blockchain ID generation
        simulateIDGeneration(data);
    }
}

function simulateIDGeneration(data) {
    const steps = document.querySelectorAll('.progress-step');
    const progressFill = document.querySelector('.progress-fill');
    let currentStep = 0;
    
    const stepInterval = setInterval(() => {
        if (currentStep < steps.length) {
            steps[currentStep].classList.add('active');
            progressFill.style.width = `${((currentStep + 1) / steps.length) * 100}%`;
            currentStep++;
        } else {
            clearInterval(stepInterval);
            completeIDGeneration(data);
        }
    }, 1500);
}

function completeIDGeneration(data) {
    // Generate digital tourist ID
    const stateCode = data.destinationState.substring(0, 2).toUpperCase();
    const year = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 900000) + 100000;
    digitalTouristID = `TST-${stateCode}-${year}-${randomNum}`;
    
    // Create user object
    currentUser = {
        digitalId: digitalTouristID,
        name: data.name,
        mobile: data.mobile,
        arrivalDate: data.arrivalDate,
        departureDate: data.departureDate,
        destinationState: data.destinationState,
        emergencyContacts: [{
            name: data.emergencyName,
            phone: data.emergencyPhone,
            relation: data.emergencyRelation
        }],
        registrationDate: new Date().toISOString(),
        safetyScore: 95,
        blockchainHash: generateBlockchainHash()
    };
    
    // Show success screen
    showIDSuccessScreen();
}

function generateBlockchainHash() {
    // Simulate blockchain hash generation
    const chars = '0123456789abcdef';
    let hash = '0x';
    for (let i = 0; i < 64; i++) {
        hash += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return hash;
}

function showIDSuccessScreen() {
    const progress = document.getElementById('id-generation-progress');
    const success = document.getElementById('id-success-screen');
    
    if (progress && success) {
        progress.classList.add('hidden');
        success.classList.remove('hidden');
        
        // Update success screen with user data
        updateIDSuccessScreen();
    }
}

function updateIDSuccessScreen() {
    const elements = {
        'generated-id-number': digitalTouristID,
        'display-name': currentUser.name,
        'display-validity': currentUser.departureDate
    };
    
    Object.keys(elements).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = elements[id];
        }
    });
}

function saveUserSession() {
    if (currentUser) {
        localStorage.setItem('smartTouristSession', JSON.stringify(currentUser));
        console.log('✅ User session saved');
    }
}

// Login Functions
function setupLoginEventListeners() {
    // User type selector
    const userTypeBtns = document.querySelectorAll('.user-type-btn');
    userTypeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const userType = this.dataset.type;
            selectUserType(userType);
        });
    });
    
    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Language selector
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.dataset.lang;
            selectLanguage(lang);
        });
    });
}

function selectUserType(type) {
    const userTypeBtns = document.querySelectorAll('.user-type-btn');
    userTypeBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    const touristLogin = document.getElementById('tourist-login');
    const authorityLogin = document.getElementById('authority-login');
    
    if (type === 'tourist') {
        touristLogin.classList.remove('hidden');
        authorityLogin.classList.add('hidden');
    } else {
        touristLogin.classList.add('hidden');
        authorityLogin.classList.remove('hidden');
    }
}

function selectLanguage(lang) {
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Store selected language
    localStorage.setItem('selectedLanguage', lang);
    
    // Update UI language (implementation would go here)
    showToast(`Language changed to ${event.target.textContent}`, 'success');
}

function handleLogin(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const userType = document.querySelector('.user-type-btn.active').dataset.type;
    
    if (userType === 'tourist') {
        const digitalId = formData.get('digital-id') || '';
        const otp = formData.get('mobile-otp') || '';
        
        if (!digitalId || !otp) {
            showToast('Please enter both Digital ID and OTP', 'error');
            return;
        }
        
        // Simulate OTP verification
        if (otp === '123456' || digitalId === 'TST-AS-2025-001234') {
            // Load sample tourist data
            currentUser = {
                ...sampleTouristData.personalInfo,
                ...sampleTouristData.tripDetails,
                emergencyContacts: sampleTouristData.emergencyContacts,
                userType: 'tourist'
            };
            digitalTouristID = currentUser.digitalId;
            saveUserSession();
            showDashboard();
        } else {
            showToast('Invalid Digital ID or OTP', 'error');
        }
    } else {
        const authorityId = formData.get('authority-id') || '';
        const password = formData.get('authority-password') || '';
        
        if (authorityId === 'POLICE001' && password === 'northeast123') {
            currentUser = {
                authorityId: authorityId,
                name: 'Officer Johnson',
                unit: 'Assam Police - Tourism Wing',
                badge: 'AS-TPW-2025',
                userType: 'authority'
            };
            saveUserSession();
            showAuthorityDashboard();
        } else {
            showToast('Invalid Authority credentials', 'error');
        }
    }
}

// Dashboard Functions
function initializeDashboard() {
    console.log('🏠 Initializing Tourist Dashboard...');
    
    if (!currentUser) {
        showLoginScreen();
        return;
    }
    
    // Update user interface
    updateDashboardUI();
    
    // Start background services
    startBackgroundMonitoring();
    startLocationTracking();
    
    // Update time greeting
    updateTimeGreeting();
    setInterval(updateTimeGreeting, 60000);
    
    // Setup SOS button
    setupSOSButton();
    
    // Load user data
    loadUserDashboardData();
}

function updateDashboardUI() {
    // Update user greeting
    const timeGreeting = document.getElementById('time-greeting');
    const userGreeting = document.getElementById('user-greeting');
    const digitalIdDisplay = document.getElementById('user-digital-id');
    const safetyScoreDisplay = document.getElementById('current-safety-score');
    
    if (timeGreeting) timeGreeting.textContent = getTimeBasedGreeting();
    if (userGreeting) userGreeting.textContent = `Welcome, ${currentUser.name || 'Tourist'}`;
    if (digitalIdDisplay) digitalIdDisplay.textContent = digitalTouristID || 'TST-XX-2025-000000';
    if (safetyScoreDisplay) safetyScoreDisplay.textContent = safetyScore;
}

function getTimeBasedGreeting() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Good Morning!';
    if (hour >= 12 && hour < 17) return 'Good Afternoon!';
    if (hour >= 17 && hour < 21) return 'Good Evening!';
    return 'Good Night!';
}

function loadUserDashboardData() {
    // Update dashboard with user-specific data
    if (currentUser && currentUser.userType === 'tourist') {
        updateTouristDashboard();
    } else if (currentUser && currentUser.userType === 'authority') {
        updateAuthorityDashboard();
    }
}

function updateTouristDashboard() {
    // Update safety status
    updateSafetyStatusBar();
    
    // Update location info
    updateLocationInfo();
    
    // Update AI insights
    updateAIInsights();
    
    // Update IoT device status
    updateIoTDeviceStatus();
}

function updateSafetyStatusBar() {
    const statusItems = document.querySelectorAll('.status-item .status-value');
    if (statusItems.length >= 4) {
        statusItems[0].textContent = 'Safe Zone - Guwahati';
        statusItems[1].textContent = 'Assam, Northeast India';
        statusItems[2].textContent = 'Active - Normal Behavior';
        statusItems[3].textContent = '127 Nodes Connected';
        
        if (statusItems.length > 4) {
            statusItems[4].textContent = '2 Connected';
            statusItems[5].textContent = '< 3 mins';
        }
    }
}

function updateLocationInfo() {
    const locationElements = {
        'current-location': 'Guwahati City Center, Assam',
        'coordinates': '26.1445° N, 91.7362° E',
        'gps-accuracy': 'High (±3m)',
        'zone-status': 'Safe Zone'
    };
    
    Object.keys(locationElements).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = locationElements[id];
        }
    });
}

// AI Monitoring Functions
function initializeAIMonitoring() {
    console.log('🤖 Initializing AI Monitoring Systems...');
    
    // Start behavior analysis
    setInterval(analyzeBehaviorPattern, 30000); // Every 30 seconds
    
    // Start anomaly detection
    setInterval(detectAnomalies, 15000); // Every 15 seconds
    
    // Start route monitoring
    setInterval(monitorRouteDeviation, 60000); // Every minute
    
    console.log('✅ AI Monitoring Systems Active');
}

function analyzeBehaviorPattern() {
    // Simulate AI behavior analysis
    const patterns = ['normal', 'tourist_exploration', 'resting', 'transit'];
    const currentPattern = patterns[Math.floor(Math.random() * patterns.length)];
    
    aiMonitoringData.behaviorPattern = currentPattern;
    
    // Update UI if available
    const behaviorStatus = document.querySelector('[data-behavior-status]');
    if (behaviorStatus) {
        behaviorStatus.textContent = currentPattern.replace('_', ' ');
    }
}

function detectAnomalies() {
    // Check for various anomaly types
    const anomalies = [];
    
    // Location drop-off detection
    const timeSinceLastUpdate = Date.now() - aiMonitoringData.lastLocationUpdate.getTime();
    if (timeSinceLastUpdate > 300000) { // 5 minutes
        anomalies.push({
            type: 'location_dropout',
            severity: 'medium',
            message: 'GPS signal lost for extended period'
        });
    }
    
    // Route deviation detection
    if (aiMonitoringData.routeDeviation > EMERGENCY_CONFIG.aiThresholds.routeDeviation) {
        anomalies.push({
            type: 'route_deviation',
            severity: 'high',
            message: `Significant route deviation detected: ${aiMonitoringData.routeDeviation}m`
        });
    }
    
    // Inactivity detection
    if (aiMonitoringData.inactivityDuration > EMERGENCY_CONFIG.aiThresholds.inactivityTimeout) {
        anomalies.push({
            type: 'prolonged_inactivity',
            severity: 'medium',
            message: 'No movement detected for extended period'
        });
    }
    
    // Process anomalies
    if (anomalies.length > 0) {
        processAnomalies(anomalies);
    }
    
    aiMonitoringData.anomaliesDetected = anomalies.length;
}

function processAnomalies(anomalies) {
    console.log('⚠️ Anomalies detected:', anomalies);
    
    anomalies.forEach(anomaly => {
        // Log to authority dashboard
        if (anomaly.severity === 'high') {
            triggerEmergencyAlert(anomaly);
        } else {
            triggerWarningAlert(anomaly);
        }
    });
}

function triggerEmergencyAlert(anomaly) {
    console.log('🚨 Emergency Alert:', anomaly);
    
    // Would send alert to authority dashboard
    // Implementation would include API calls to emergency services
    
    showToast(`Emergency Alert: ${anomaly.message}`, 'error');
}

function triggerWarningAlert(anomaly) {
    console.log('⚠️ Warning Alert:', anomaly);
    
    showToast(`Warning: ${anomaly.message}`, 'warning');
}

// Geofencing Functions
function initializeGeofencing() {
    console.log('🗺️ Initializing Geofencing Systems...');
    
    // Start geofence monitoring
    setInterval(checkGeofenceStatus, 10000); // Every 10 seconds
    
    console.log('✅ Geofencing Active');
}

function checkGeofenceStatus() {
    if (!currentLocation) return;
    
    // Simulate geofence checking
    const currentZone = determineCurrentZone(currentLocation);
    
    // Check for zone changes
    if (currentZone !== aiMonitoringData.currentZone) {
        handleZoneChange(currentZone, aiMonitoringData.currentZone);
        aiMonitoringData.currentZone = currentZone;
    }
}

function determineCurrentZone(location) {
    // Simulate zone determination based on coordinates
    // In real implementation, this would check against actual geofence boundaries
    
    const zones = ['safe', 'restricted', 'high_risk', 'border'];
    const weights = [0.7, 0.2, 0.08, 0.02]; // Probabilities
    
    const random = Math.random();
    let cumulativeWeight = 0;
    
    for (let i = 0; i < zones.length; i++) {
        cumulativeWeight += weights[i];
        if (random <= cumulativeWeight) {
            return zones[i];
        }
    }
    
    return 'safe';
}

function handleZoneChange(newZone, oldZone) {
    console.log(`🗺️ Zone change: ${oldZone} → ${newZone}`);
    
    const zoneConfig = GEOFENCE_ZONES[newZone];
    if (zoneConfig) {
        // Show zone notification
        showZoneNotification(newZone, zoneConfig);
        
        // Update safety score based on zone
        updateSafetyScoreForZone(newZone);
        
        // Check if special actions are required
        if (zoneConfig.restrictions.includes('permit_required')) {
            checkTravelPermits(newZone);
        }
        
        if (zoneConfig.restrictions.includes('escort_mandatory')) {
            suggestPoliceEscort();
        }
    }
}

function showZoneNotification(zone, config) {
    const notification = {
        safe: { type: 'success', message: '✅ Safe Zone - Normal tourist activity' },
        restricted: { type: 'warning', message: '⚠️ Restricted Zone - Special permit may be required' },
        high_risk: { type: 'error', message: '🚨 High Risk Zone - Exercise extreme caution' },
        border: { type: 'error', message: '🚨 Border Area - Restricted access' }
    };
    
    const notif = notification[zone];
    if (notif) {
        showToast(notif.message, notif.type);
    }
}

function updateSafetyScoreForZone(zone) {
    const scoreChanges = {
        safe: +5,
        restricted: -15,
        high_risk: -30,
        border: -25
    };
    
    const change = scoreChanges[zone] || 0;
    safetyScore = Math.max(0, Math.min(100, safetyScore + change));
    
    // Update UI
    const scoreElement = document.getElementById('current-safety-score');
    if (scoreElement) {
        scoreElement.textContent = safetyScore;
        
        // Update color based on score
        const scoreCircle = scoreElement.closest('.score-circle');
        if (scoreCircle) {
            scoreCircle.className = 'score-circle ' + (safetyScore >= 80 ? 'high-score' : 
                                                       safetyScore >= 60 ? 'medium-score' : 'low-score');
        }
    }
}

// Emergency Functions
function setupEmergencyDetection() {
    console.log('🚨 Setting up Emergency Detection...');
    
    // Setup device shake detection
    if ('DeviceMotionEvent' in window) {
        window.addEventListener('devicemotion', handleDeviceMotion);
    }
    
    // Setup voice command detection (simplified)
    if ('webkitSpeechRecognition' in window) {
        setupVoiceEmergencyDetection();
    }
    
    // Setup emergency keyboard shortcuts
    document.addEventListener('keydown', handleEmergencyKeyboard);
    
    console.log('✅ Emergency Detection Active');
}

let shakeCount = 0;
let lastShakeTime = 0;

function handleDeviceMotion(event) {
    const acceleration = event.accelerationIncludingGravity;
    if (!acceleration) return;
    
    const magnitude = Math.sqrt(
        Math.pow(acceleration.x, 2) +
        Math.pow(acceleration.y, 2) +
        Math.pow(acceleration.z, 2)
    );
    
    const now = Date.now();
    
    if (magnitude > 20 && (now - lastShakeTime) > 500) {
        shakeCount++;
        lastShakeTime = now;
        
        if (shakeCount >= 5) {
            console.log('📱 Emergency shake detected!');
            triggerEmergencySOSShake();
            shakeCount = 0;
        }
        
        // Reset counter after 3 seconds
        setTimeout(() => {
            if ((Date.now() - lastShakeTime) > 3000) {
                shakeCount = 0;
            }
        }, 3000);
    }
}

function setupVoiceEmergencyDetection() {
    // Simplified voice detection setup
    // In production, this would be more sophisticated
    console.log('🗣️ Voice emergency detection ready');
}

function handleEmergencyKeyboard(event) {
    // Emergency keyboard shortcuts
    if (event.ctrlKey && event.shiftKey && event.key === 'E') {
        event.preventDefault();
        triggerEmergencySOSKeyboard();
    }
}

// SOS Functions
function setupSOSButton() {
    const sosButton = document.getElementById('main-sos-button');
    if (sosButton) {
        // Mouse events
        sosButton.addEventListener('mousedown', startSOSActivation);
        sosButton.addEventListener('mouseup', cancelSOSActivation);
        sosButton.addEventListener('mouseleave', cancelSOSActivation);
        
        // Touch events for mobile
        sosButton.addEventListener('touchstart', startSOSActivation);
        sosButton.addEventListener('touchend', cancelSOSActivation);
        
        // Click event as fallback
        sosButton.addEventListener('click', function(e) {
            e.preventDefault();
            if (!isEmergencyActive) {
                activateEmergencySOSClick();
            }
        });
    }
}

let sosHoldTimer = null;
let sosHoldStartTime = 0;

function startSOSActivation(event) {
    event.preventDefault();
    
    if (isEmergencyActive) return;
    
    sosHoldStartTime = Date.now();
    const sosButton = event.currentTarget;
    const progressRing = sosButton.querySelector('.sos-progress');
    
    // Start progress animation
    if (progressRing) {
        progressRing.style.display = 'block';
        progressRing.style.animationDuration = '3s';
    }
    
    // Haptic feedback if available
    if (navigator.vibrate) {
        navigator.vibrate(100);
    }
    
    // Audio feedback
    playEmergencyTone();
    
    sosHoldTimer = setTimeout(() => {
        triggerEmergencySOSHold();
    }, 3000);
    
    console.log('🆘 SOS activation started...');
}

function cancelSOSActivation(event) {
    if (sosHoldTimer) {
        clearTimeout(sosHoldTimer);
        sosHoldTimer = null;
    }
    
    const sosButton = event.currentTarget;
    const progressRing = sosButton.querySelector('.sos-progress');
    
    if (progressRing) {
        progressRing.style.display = 'none';
    }
    
    const holdDuration = Date.now() - sosHoldStartTime;
    if (holdDuration < 3000) {
        console.log('🆘 SOS activation cancelled');
    }
}

function activateEmergencySOSClick() {
    // Quick SOS activation for single click
    if (confirm('🚨 EMERGENCY SOS ACTIVATION\n\nThis will immediately alert emergency services and your contacts.\n\nActivate Emergency Response?')) {
        triggerEmergencySOSClick();
    }
}

function triggerEmergencySOSHold() {
    console.log('🚨 SOS Emergency Triggered (Hold)');
    startEmergencyProtocol('sos_hold');
}

function triggerEmergencySOSClick() {
    console.log('🚨 SOS Emergency Triggered (Click)');
    startEmergencyProtocol('sos_click');
}

function triggerEmergencySOSShake() {
    console.log('🚨 SOS Emergency Triggered (Shake)');
    startEmergencyProtocol('sos_shake');
}

function triggerEmergencySOSKeyboard() {
    console.log('🚨 SOS Emergency Triggered (Keyboard)');
    startEmergencyProtocol('sos_keyboard');
}

function startEmergencyProtocol(trigger) {
    if (isEmergencyActive) {
        console.log('⚠️ Emergency already active');
        return;
    }
    
    isEmergencyActive = true;
    
    // Play emergency sound
    playEmergencyAlarm();
    
    // Vibrate device
    if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200, 100, 200]);
    }
    
    // Show emergency confirmation modal
    showEmergencyConfirmationModal();
    
    // Start countdown
    startEmergencyCountdown();
    
    // Log emergency event
    logEmergencyEvent(trigger);
    
    console.log('🚨 EMERGENCY PROTOCOL ACTIVATED');
}

function showEmergencyConfirmationModal() {
    const modal = document.getElementById('sos-confirmation-modal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Focus on safe button
        setTimeout(() => {
            const safeButton = document.getElementById('safe-button');
            if (safeButton) safeButton.focus();
        }, 100);
    }
}

function startEmergencyCountdown() {
    let timeLeft = 15;
    const countdownTimer = document.getElementById('countdown-timer');
    const countdownText = document.getElementById('countdown-text');
    
    // Update initial display
    if (countdownTimer) countdownTimer.textContent = timeLeft;
    if (countdownText) countdownText.textContent = timeLeft;
    
    countdownInterval = setInterval(() => {
        timeLeft--;
        
        if (countdownTimer) countdownTimer.textContent = timeLeft;
        if (countdownText) countdownText.textContent = timeLeft;
        
        // Play countdown beep
        if (timeLeft <= 5) {
            playCountdownBeep();
        }
        
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            handleEmergencyTimeout();
        }
    }, 1000);
}

function confirmSafety() {
    console.log('✅ User confirmed safety');
    
    clearEmergencyState();
    hideEmergencyModal();
    
    showToast('✅ Emergency cancelled - You marked yourself as safe', 'success');
    
    // Log safety confirmation
    logEmergencyEvent('safety_confirmed');
}

function requestEmergencyHelp() {
    console.log('🚨 User requested emergency help');
    
    clearEmergencyState();
    hideEmergencyModal();
    
    // Activate full emergency protocol
    activateFullEmergencyResponse();
}

function handleEmergencyTimeout() {
    console.log('⏰ Emergency timeout - activating full response');
    
    clearEmergencyState();
    hideEmergencyModal();
    
    // Activate full emergency protocol
    activateFullEmergencyResponse();
}

function activateFullEmergencyResponse() {
    // Send emergency alerts
    sendEmergencyAlerts();
    
    // Show emergency protocol modal
    showEmergencyProtocolModal();
    
    // Update system status
    updateSystemEmergencyStatus();
    
    console.log('🚨 FULL EMERGENCY RESPONSE ACTIVATED');
}

function sendEmergencyAlerts() {
    const emergencyData = {
        touristId: digitalTouristID,
        name: currentUser?.name || 'Unknown Tourist',
        location: currentLocation || sampleTouristData.location,
        timestamp: new Date().toISOString(),
        emergencyType: 'sos_activation',
        safetyScore: safetyScore,
        aiInsights: aiMonitoringData
    };
    
    console.log('📞 Emergency alerts sent:', emergencyData);
    
    // Simulate API calls to emergency services
    setTimeout(() => {
        console.log('✅ Police notified');
        showToast('🚔 Police have been notified', 'info');
    }, 1000);
    
    setTimeout(() => {
        console.log('✅ Medical services alerted');
        showToast('🚑 Medical services alerted', 'info');
    }, 1500);
    
    setTimeout(() => {
        console.log('✅ Emergency contacts notified');
        showToast('📞 Emergency contacts notified', 'info');
    }, 2000);
    
    setTimeout(() => {
        console.log('✅ Tourism authorities informed');
        showToast('🏛️ Tourism police informed', 'info');
    }, 2500);
}

function showEmergencyProtocolModal() {
    const modal = document.getElementById('emergency-protocol-modal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Animate protocol items
        setTimeout(() => {
            animateProtocolItems();
        }, 100);
    }
}

function animateProtocolItems() {
    const items = document.querySelectorAll('.protocol-item');
    items.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 300);
    });
}

function clearEmergencyState() {
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }
    
    if (sosHoldTimer) {
        clearTimeout(sosHoldTimer);
        sosHoldTimer = null;
    }
    
    isEmergencyActive = false;
}

function hideEmergencyModal() {
    const modals = ['sos-confirmation-modal', 'emergency-protocol-modal'];
    modals.forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
        }
    });
    
    document.body.style.overflow = 'auto';
}

// Audio Functions
function playEmergencyTone() {
    if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
        const audioContext = new (AudioContext || webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
    }
}

function playEmergencyAlarm() {
    if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
        const audioContext = new (AudioContext || webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 1000;
        oscillator.type = 'square';
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        
        // Create alternating alarm sound
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.linearRampToValueAtTime(1200, audioContext.currentTime + 0.5);
        oscillator.frequency.linearRampToValueAtTime(800, audioContext.currentTime + 1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 1);
    }
}

function playCountdownBeep() {
    if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
        const audioContext = new (AudioContext || webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 1500;
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }
}

// Location and Monitoring Functions
function startLocationTracking() {
    if (!navigator.geolocation) {
        console.log('❌ Geolocation not supported');
        return;
    }
    
    const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
    };
    
    // Get initial position
    navigator.geolocation.getCurrentPosition(
        handleLocationSuccess,
        handleLocationError,
        options
    );
    
    // Watch position changes
    const watchId = navigator.geolocation.watchPosition(
        handleLocationSuccess,
        handleLocationError,
        options
    );
    
    console.log('📍 Location tracking started');
}

function handleLocationSuccess(position) {
    currentLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timestamp: new Date(position.timestamp)
    };
    
    aiMonitoringData.lastLocationUpdate = currentLocation.timestamp;
    
    // Update UI
    updateLocationDisplay();
    
    console.log('📍 Location updated:', currentLocation);
}

function handleLocationError(error) {
    console.error('❌ Location error:', error);
    
    // Use fallback location (Guwahati)
    currentLocation = sampleTouristData.location;
    
    showToast('⚠️ Using approximate location - enable GPS for better accuracy', 'warning');
}

function updateLocationDisplay() {
    if (!currentLocation) return;
    
    // Reverse geocoding simulation
    const address = `${currentLocation.latitude.toFixed(4)}°N, ${currentLocation.longitude.toFixed(4)}°E`;
    
    const elements = {
        'current-location': 'Guwahati City Center, Assam',
        'coordinates': address,
        'location-update': 'Just now'
    };
    
    Object.keys(elements).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = elements[id];
        }
    });
}

function startBackgroundMonitoring() {
    backgroundMonitoringInterval = setInterval(() => {
        // Update monitoring status
        updateMonitoringIndicator();
        
        // Simulate speed updates
        updateSpeedMonitoring();
        
        // Check system health
        checkSystemHealth();
    }, 5000);
    
    console.log('🔄 Background monitoring started');
}

function updateMonitoringIndicator() {
    const indicator = document.getElementById('monitoring-indicator');
    const lastCheckTime = document.getElementById('last-check-time');
    
    if (lastCheckTime) {
        lastCheckTime.textContent = 'now';
    }
    
    if (indicator) {
        // Update indicator status
        const dot = indicator.querySelector('.indicator-pulse, .indicator-dot');
        if (dot) {
            dot.style.backgroundColor = '#10B981'; // Green for active
        }
    }
}

function updateSpeedMonitoring() {
    // Simulate speed data
    const baseSpeed = 0; // Stationary for demo
    const variation = Math.random() * 5; // Small variation
    currentSpeed = Math.max(0, baseSpeed + variation);
    
    // Update speed display
    const speedElement = document.getElementById('current-speed');
    if (speedElement) {
        speedElement.textContent = Math.round(currentSpeed);
    }
    
    // Update speed status
    const speedStatus = document.getElementById('speed-status');
    if (speedStatus) {
        if (currentSpeed < 1) {
            speedStatus.textContent = 'Stationary';
            speedStatus.className = 'speed-status safe';
        } else if (currentSpeed < 30) {
            speedStatus.textContent = 'Walking/Cycling';
            speedStatus.className = 'speed-status normal';
        } else if (currentSpeed < 80) {
            speedStatus.textContent = 'Normal Travel';
            speedStatus.className = 'speed-status normal';
        } else {
            speedStatus.textContent = 'High Speed';
            speedStatus.className = 'speed-status warning';
        }
    }
}

function checkSystemHealth() {
    // Check various system components
    const health = {
        gps: currentLocation ? 'active' : 'inactive',
        ai: 'active',
        blockchain: 'active',
        emergency: 'active',
        iot: 'active'
    };
    
    // Update system status displays
    updateSystemStatus(health);
}

function updateSystemStatus(health) {
    // Update any system status indicators
    const statusElements = document.querySelectorAll('[data-system-status]');
    statusElements.forEach(element => {
        const system = element.dataset.systemStatus;
        if (health[system]) {
            element.textContent = health[system];
            element.className = `system-status ${health[system]}`;
        }
    });
}

// Utility Functions
function showToast(message, type = 'info', duration = 4000) {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    // Toast icons
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    
    toast.innerHTML = `
        <span class="toast-icon">${icons[type] || icons.info}</span>
        <span class="toast-message">${message}</span>
        <button class="toast-close" onclick="this.parentNode.remove()">&times;</button>
    `;
    
    // Style the toast
    Object.assign(toast.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '12px 16px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '10000',
        maxWidth: '400px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        opacity: '0',
        transform: 'translateX(100%)',
        transition: 'all 0.3s ease'
    });
    
    // Set background color based on type
    const colors = {
        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',
        info: '#3B82F6'
    };
    toast.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, duration);
}

function logEmergencyEvent(eventType) {
    const event = {
        type: eventType,
        timestamp: new Date().toISOString(),
        touristId: digitalTouristID,
        location: currentLocation,
        safetyScore: safetyScore,
        userAgent: navigator.userAgent
    };
    
    console.log('📋 Emergency Event Logged:', event);
    
    // In production, this would send to logging service
}

function updateTimeGreeting() {
    const timeGreeting = document.getElementById('time-greeting');
    const userGreeting = document.getElementById('user-greeting');
    
    if (timeGreeting) {
        timeGreeting.textContent = getTimeBasedGreeting();
    }
    
    if (userGreeting && currentUser) {
        userGreeting.textContent = `Welcome, ${currentUser.name || 'Tourist'}`;
    }
}

// Navigation Functions
function navigateTo(page) {
    // Add transition effect
    document.body.style.transition = 'opacity 0.3s ease';
    document.body.style.opacity = '0.8';
    
    setTimeout(() => {
        window.location.href = page;
    }, 150);
}

function goBackToDashboard() {
    navigateTo('enhanced-dashboard.html');
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        // Clear session
        localStorage.removeItem('smartTouristSession');
        currentUser = null;
        digitalTouristID = null;
        
        // Clear intervals
        if (backgroundMonitoringInterval) {
            clearInterval(backgroundMonitoringInterval);
        }
        if (geofencingInterval) {
            clearInterval(geofencingInterval);
        }
        
        // Redirect to login
        window.location.href = 'index.html';
    }
}

// Global Event Listeners
function setupGlobalEventListeners() {
    // Handle page visibility changes
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            console.log('📱 App backgrounded - continuing monitoring');
        } else {
            console.log('📱 App foregrounded - updating displays');
            updateDashboardUI();
        }
    });
    
    // Handle connection changes
    window.addEventListener('online', function() {
        showToast('📶 Connection restored', 'success');
    });
    
    window.addEventListener('offline', function() {
        showToast('📶 Connection lost - emergency features still active', 'warning');
    });
    
    // Handle errors
    window.addEventListener('error', function(e) {
        console.error('💥 Application Error:', e.error);
        showToast('System error detected - emergency services remain active', 'error');
    });
}

// Export functions for global access
window.SmartTouristSafety = {
    navigateTo,
    goBackToDashboard,
    logout,
    activateEmergencySOSClick: activateEmergencySOSClick,
    showToast,
    currentUser: () => currentUser,
    currentLocation: () => currentLocation,
    safetyScore: () => safetyScore
};

console.log('✅ Smart Tourist Safety System - Northeast India Loaded Successfully');
console.log('🏔️ AI • Blockchain • Geo-Fencing • IoT Integration Active');