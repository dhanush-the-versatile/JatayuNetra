// Smart Tourist Safety System - Consolidated JavaScript
// SIH-2025 - All functionality merged

// Global Variables
let currentUser = null;
let currentPage = 'login';
let userTimeZone = null;
let greetingUpdateInterval = null;
let emergencyContacts = [];
let nextContactId = 4;
let isEmergencyActive = false;
let emergencyTimer = null;
let countdownInterval = null;
let backgroundMonitoringInterval = null;
let currentSpeed = 45;
let previousSpeed = 45;
let speedHistory = [];
let emergencyDetectionCounter = 0;

// Sample Credentials and Data
const SAMPLE_CREDENTIALS = {
    username: "admin",
    password: "admin123"
};

const PASSWORD_REQUIREMENTS = {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireSpecialChar: true,
    specialChars: "!@#$%^&*()_+-=[]{}|;:,.<?>"
};

const AGE_RANGE = { min: 13, max: 120 };

// Sample application data
const appData = {
    userProfile: {
        personalInfo: {
            name: "Rajesh Kumar",
            age: 28,
            gender: "Male",
            phone: "+91-9876543210",
            email: "rajesh.kumar@email.com",
            address: "123 Main Street, Vizianagaram, Andhra Pradesh, India",
            profilePicture: "https://via.placeholder.com/150/4f46e5/ffffff?text=RK",
            userSince: "2023-06-15",
            totalRequests: 12,
            emergencyContacts: 5
        },
        vehicleDetails: [
            {
                id: 1,
                type: "Car",
                number: "AP39AB1234",
                brand: "Maruti Suzuki",
                model: "Swift",
                year: "2020",
                insurance: "HDFC ERGO",
                policyNumber: "POL123456789",
                expiryDate: "2025-12-31",
                isPrimary: true
            }
        ]
    },
    nearbyServices: {
        petrolStations: [
            {name: "Shell Petrol Pump", distance: "0.8 km", phone: "+91-9876543210", services: ["Petrol", "Diesel", "Air"]},
            {name: "HP Petrol Station", distance: "1.2 km", phone: "+91-9876543211", services: ["Petrol", "Diesel", "CNG"]},
            {name: "Bharat Petroleum", distance: "1.5 km", phone: "+91-9876543212", services: ["Petrol", "Diesel", "Battery"]}
        ],
        mechanics: [
            {name: "Quick Fix Auto Repair", distance: "0.5 km", phone: "+91-9876543220", speciality: "All vehicles"},
            {name: "Wheel Care Service", distance: "1.1 km", phone: "+91-9876543221", speciality: "Tires & Wheels"},
            {name: "Engine Care Center", distance: "1.8 km", phone: "+91-9876543222", speciality: "Engine Repair"}
        ],
        hospitals: [
            {name: "City General Hospital", distance: "2.1 km", phone: "+91-9876543230", emergency: "24/7", speciality: "General Emergency"},
            {name: "Maternity Care Hospital", distance: "1.7 km", phone: "+91-9876543231", emergency: "24/7", speciality: "Maternity & Pediatrics"},
            {name: "Trauma Care Center", distance: "2.8 km", phone: "+91-9876543232", emergency: "24/7", speciality: "Accident & Trauma"}
        ],
        policeStations: [
            {name: "Highway Police Station", distance: "1.3 km", phone: "+91-9876543240", jurisdiction: "Highway Patrol"},
            {name: "City Police Station", distance: "2.2 km", phone: "+91-9876543241", jurisdiction: "City Area"},
            {name: "Traffic Police Post", distance: "0.9 km", phone: "+91-9876543242", jurisdiction: "Traffic Control"}
        ]
    },
    emergencyContacts: [
        {id: 1, name: "Priya Kumar", relation: "Family", phone: "+91-9876543250", email: "priya@email.com", isPrimary: true},
        {id: 2, name: "Dr. Sharma", relation: "Medical", phone: "+91-9876543251", email: "sharma@hospital.com", isPrimary: false},
        {id: 3, name: "HDFC Insurance", relation: "Insurance", phone: "+91-9876543252", email: "claims@hdfc.com", isPrimary: false}
    ],
    requestHistory: [
        {id: 1, date: "2025-09-08", time: "14:30", type: "Vehicle Assistance", subType: "Fuel Assistance", location: "Highway NH-16, Vizianagaram", status: "Completed", duration: "25 mins", provider: "Shell Petrol Pump"},
        {id: 2, date: "2025-09-05", time: "09:15", type: "Vehicle Assistance", subType: "Mechanic Assistance", location: "Main Road, Vizianagaram", status: "Completed", duration: "45 mins", provider: "Quick Fix Auto Repair"},
        {id: 3, date: "2025-09-01", time: "18:45", type: "Emergency Contact", subType: "Family", location: "Office Complex, Vizianagaram", status: "Completed", duration: "5 mins", provider: "Priya Kumar"}
    ],
    locationData: {
        latitude: 28.6139,
        longitude: 77.2090,
        address: "New Delhi, India",
        accuracy: "GPS: High"
    },
    systemStatus: {
        monitoring: true,
        gpsEnabled: true,
        emergencyMode: false,
        backgroundActive: true
    }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Smart Tourist Safety System Initializing...');
    initializeApp();
});

function initializeApp() {
    // Initialize based on current page
    if (document.getElementById('loginPage')) {
        initializeAuth();
    } else if (document.getElementById('dashboardPage') || document.querySelector('.dashboard-container')) {
        initializeDashboard();
    } else if (document.querySelector('.sos-container')) {
        initializeSOS();
    } else if (document.getElementById('main-services')) {
        initializeServices();
    } else if (document.getElementById('profile-tab')) {
        initializeProfile();
    }
    
    // Setup global event listeners
    setupGlobalEventListeners();
}

// ===============================
// AUTHENTICATION FUNCTIONS
// ===============================

function initializeAuth() {
    console.log('Initializing authentication...');
    
    // Check existing session
    checkExistingSession();
    
    // Setup event listeners
    setupAuthEventListeners();
    
    // Setup password toggles
    setupPasswordToggles();
    
    // Setup real-time validation
    setupRealTimeValidation();
}

function checkExistingSession() {
    const savedUser = localStorage.getItem('currentUser');
    const keepSignedIn = localStorage.getItem('keepSignedIn') === 'true';
    
    if (savedUser && keepSignedIn) {
        try {
            currentUser = JSON.parse(savedUser);
            if (document.getElementById('dashboardPage')) {
                showDashboard();
            } else {
                window.location.href = 'dashboard.html';
            }
            return;
        } catch (e) {
            console.error('Error parsing saved user data:', e);
        }
    }
    
    // Clear any stale data and show login
    localStorage.removeItem('currentUser');
    localStorage.removeItem('keepSignedIn');
    if (document.getElementById('loginPage')) {
        showPage('loginPage');
    }
}

function setupAuthEventListeners() {
    // Navigation links
    const showRegisterLink = document.getElementById('showRegisterLink');
    if (showRegisterLink) {
        showRegisterLink.addEventListener('click', function(e) {
            e.preventDefault();
            showPage('registerPage');
        });
    }
    
    const showLoginLink = document.getElementById('showLoginLink');
    if (showLoginLink) {
        showLoginLink.addEventListener('click', function(e) {
            e.preventDefault();
            showPage('loginPage');
        });
    }
    
    // Form submissions
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    // Logout button
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }
}

function setupPasswordToggles() {
    const toggleButtons = [
        { button: 'loginPasswordToggle', input: 'loginPassword' },
        { button: 'registerPasswordToggle', input: 'registerPassword' }
    ];
    
    toggleButtons.forEach(({ button, input }) => {
        const toggleBtn = document.getElementById(button);
        const passwordInput = document.getElementById(input);
        
        if (toggleBtn && passwordInput) {
            toggleBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const isPassword = passwordInput.type === 'password';
                passwordInput.type = isPassword ? 'text' : 'password';
                const icon = toggleBtn.querySelector('.password-toggle-icon');
                if (icon) {
                    icon.textContent = isPassword ? '🙈' : '👁️';
                }
            });
        }
    });
}

function setupRealTimeValidation() {
    const registerPassword = document.getElementById('registerPassword');
    const confirmPassword = document.getElementById('confirmPassword');
    
    if (registerPassword) {
        registerPassword.addEventListener('input', function() {
            validatePasswordRequirements(registerPassword.value);
            if (confirmPassword && confirmPassword.value) {
                validatePasswordMatch();
            }
        });
    }
    
    if (confirmPassword) {
        confirmPassword.addEventListener('input', validatePasswordMatch);
    }
}

function handleLogin(e) {
    e.preventDefault();
    console.log('Login form submitted');
    
    const formData = new FormData(e.target);
    const username = (formData.get('username') || '').trim();
    const password = formData.get('password') || '';
    const keepSignedIn = formData.get('keepSignedIn') === 'on';
    
    const loginButton = document.getElementById('loginButton');
    const errorElement = document.getElementById('loginError');
    
    if (!loginButton) return;
    
    // Show loading state
    loginButton.classList.add('loading');
    if (errorElement) errorElement.classList.add('hidden');
    
    // Simulate API delay
    setTimeout(function() {
        if (validateCredentials(username, password)) {
            console.log('Login successful');
            
            // Set current user
            currentUser = {
                username: username,
                loginTime: new Date().toISOString(),
                fullName: username === 'admin' ? 'System Administrator' : username
            };
            
            // Save session if requested
            if (keepSignedIn) {
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                localStorage.setItem('keepSignedIn', 'true');
            }
            
            // Clear form
            e.target.reset();
            
            // Show dashboard
            if (document.getElementById('dashboardPage')) {
                showDashboard();
            } else {
                window.location.href = 'dashboard.html';
            }
        } else {
            console.log('Login failed - invalid credentials');
            if (errorElement) {
                errorElement.textContent = 'Invalid username or password. Try admin/admin123';
                errorElement.classList.remove('hidden');
            }
        }
        
        // Remove loading state
        loginButton.classList.remove('loading');
    }, 1000);
}

function validateCredentials(username, password) {
    // Check sample credentials first
    if (username === SAMPLE_CREDENTIALS.username && password === SAMPLE_CREDENTIALS.password) {
        return true;
    }
    
    // Check registered users
    const users = getStoredUsers();
    return users.some(user =>
        (user.username === username || user.email === username) &&
        user.password === password
    );
}

function handleRegister(e) {
    e.preventDefault();
    console.log('Registration form submitted');
    
    const formData = new FormData(e.target);
    const userData = {
        name: (formData.get('name') || '').trim(),
        age: parseInt(formData.get('age')) || 0,
        email: (formData.get('email') || '').trim(),
        password: formData.get('password') || '',
        confirmPassword: formData.get('confirmPassword') || ''
    };
    
    const registerButton = document.getElementById('registerButton');
    const errorElement = document.getElementById('registerError');
    const successElement = document.getElementById('registerSuccess');
    
    // Basic validation
    if (!userData.name || !userData.email || !userData.password) {
        if (errorElement) {
            errorElement.textContent = 'Please fill in all required fields';
            errorElement.classList.remove('hidden');
        }
        return;
    }
    
    if (userData.password !== userData.confirmPassword) {
        if (errorElement) {
            errorElement.textContent = 'Passwords do not match';
            errorElement.classList.remove('hidden');
        }
        return;
    }
    
    // Show loading state
    if (registerButton) registerButton.classList.add('loading');
    if (errorElement) errorElement.classList.add('hidden');
    if (successElement) successElement.classList.add('hidden');
    
    // Simulate API delay
    setTimeout(function() {
        if (userExists(userData.email)) {
            if (errorElement) {
                errorElement.textContent = 'An account with this email already exists';
                errorElement.classList.remove('hidden');
            }
            if (registerButton) registerButton.classList.remove('loading');
            return;
        }
        
        // Create account
        createUserAccount(userData);
        console.log('User account created successfully');
        
        // Show success message
        if (successElement) {
            successElement.textContent = 'Account created successfully! Redirecting to login...';
            successElement.classList.remove('hidden');
        }
        
        // Reset form
        e.target.reset();
        
        // Redirect after delay
        setTimeout(function() {
            showPage('loginPage');
            if (registerButton) registerButton.classList.remove('loading');
        }, 2000);
    }, 1500);
}

function showDashboard() {
    console.log('Showing dashboard');
    
    if (document.getElementById('dashboardPage')) {
        // Update user name
        const userNameElement = document.getElementById('dashboardUserName');
        if (userNameElement && currentUser) {
            userNameElement.textContent = `Welcome, ${currentUser.fullName || currentUser.username}!`;
        }
        showPage('dashboardPage');
    }
}

function handleLogout() {
    console.log('Logging out user');
    
    // Clear session
    currentUser = null;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('keepSignedIn');
    
    // Clear forms
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    if (loginForm) loginForm.reset();
    if (registerForm) registerForm.reset();
    
    // Clear messages
    clearAllMessages();
    
    // Redirect to login
    if (document.getElementById('loginPage')) {
        showPage('loginPage');
    } else {
        window.location.href = 'index.html';
    }
}

function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
        page.classList.add('hidden');
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        targetPage.classList.remove('hidden');
    }
}

// ===============================
// DASHBOARD FUNCTIONS
// ===============================

function initializeDashboard() {
    console.log('Initializing dashboard...');
    
    // Get user timezone
    userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    // Update greeting
    updateTimeGreeting();
    
    // Set up interval to update greeting every minute
    greetingUpdateInterval = setInterval(updateTimeGreeting, 60000);
    
    // Load user data
    loadDashboardData();
    
    // Setup event listeners
    setupDashboardEventListeners();
}

function updateTimeGreeting() {
    const now = new Date();
    const hour = now.getHours();
    const userName = getCurrentUserName();
    
    // Determine greeting based on time
    let timeGreeting = '';
    if (hour >= 5 && hour < 12) {
        timeGreeting = 'Good Morning';
    } else if (hour >= 12 && hour < 17) {
        timeGreeting = 'Good Afternoon';
    } else if (hour >= 17 && hour < 21) {
        timeGreeting = 'Good Evening';
    } else {
        timeGreeting = 'Good Night';
    }
    
    // Update DOM elements
    const timeGreetingElement = document.getElementById('timeGreeting');
    const userGreetingElement = document.getElementById('userGreeting');
    
    if (timeGreetingElement) {
        timeGreetingElement.textContent = `${timeGreeting}!`;
    }
    if (userGreetingElement) {
        userGreetingElement.textContent = userName ? `Welcome, ${userName}` : 'Welcome, User';
    }
}

function getCurrentUserName() {
    // Try to get user from localStorage first
    const userData = localStorage.getItem('currentUser');
    if (userData) {
        try {
            const user = JSON.parse(userData);
            return user.fullName || user.username || 'User';
        } catch (e) {
            console.log('Error parsing user data:', e);
        }
    }
    
    // Default fallback
    return 'Admin';
}

function loadDashboardData() {
    // Load user profile data if on profile page
    if (document.getElementById('user-name')) {
        loadUserProfileData();
    }
}

function setupDashboardEventListeners() {
    // Navigation functions are already set up via onclick attributes in HTML
}

// ===============================
// NAVIGATION FUNCTIONS
// ===============================

function navigateTo(page) {
    // Add transition effect
    document.body.style.transition = 'opacity 0.3s ease';
    document.body.style.opacity = '0.8';
    
    // Navigate after short delay for visual feedback
    setTimeout(() => {
        window.location.href = page;
    }, 150);
}

function goBackToDashboard() {
    showToast('Returning to dashboard...', 'success');
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1000);
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        handleLogout();
    }
}

// ===============================
// SOS EMERGENCY FUNCTIONS
// ===============================

function initializeSOS() {
    console.log('Initializing SOS Emergency System...');
    
    // Load user data
    loadSOSUserData();
    
    // Start background monitoring
    startBackgroundMonitoring();
    
    // Update location display
    updateLocationDisplay();
    
    // Simulate initial speed data
    simulateSpeedData();
    
    // Setup SOS event listeners
    setupSOSEventListeners();
    
    // Force an emergency simulation after 15 seconds for demo
    setTimeout(() => {
        if (!isEmergencyActive) {
            console.log('🎯 Demo: Triggering automatic emergency detection');
            simulateEmergencyBraking();
        }
    }, 15000);
}

function setupSOSEventListeners() {
    const sosButton = document.getElementById('sosButton');
    if (sosButton) {
        sosButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('🆘 SOS Button clicked');
            triggerManualSOS();
        });
    }
    
    const safeButton = document.getElementById('safeButton');
    if (safeButton) {
        safeButton.addEventListener('click', function(e) {
            e.preventDefault();
            handleSafeResponse();
        });
    }
    
    const helpButton = document.getElementById('helpButton');
    if (helpButton) {
        helpButton.addEventListener('click', function(e) {
            e.preventDefault();
            handleHelpResponse();
        });
    }
    
    const returnToDashboard = document.getElementById('returnToDashboard');
    if (returnToDashboard) {
        returnToDashboard.addEventListener('click', function(e) {
            e.preventDefault();
            returnToDashboardView();
        });
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

function loadSOSUserData() {
    const userInfo = appData.userProfile.personalInfo;
    
    // Update user info elements
    const elements = {
        userId: 'TST001',
        userName: userInfo.name,
        bloodGroup: 'O+',
        emergencyContact: userInfo.phone
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
        if (appData.systemStatus.backgroundActive) {
            updateSpeedSimulation();
            checkForEmergency();
            updateLocationTracking();
            emergencyDetectionCounter++;
        }
    }, 1000); // Check every second
    
    console.log('🔄 Background monitoring started');
}

function simulateSpeedData() {
    const baseSpeed = 45;
    const variation = (Math.random() - 0.5) * 10; // ±5 km/h variation
    currentSpeed = Math.max(0, baseSpeed + variation);
    
    // Update display
    const speedElement = document.getElementById('currentSpeed');
    if (speedElement) {
        speedElement.textContent = Math.round(currentSpeed);
    }
    
    updateSpeedStatus();
}

function updateSpeedSimulation() {
    previousSpeed = currentSpeed;
    // Normal speed variation
    const normalVariation = (Math.random() - 0.5) * 4; // ±2 km/h
    currentSpeed = Math.max(0, currentSpeed + normalVariation);
    
    // Add to speed history
    speedHistory.push({
        speed: currentSpeed,
        timestamp: Date.now(),
        previousSpeed: previousSpeed
    });
    
    // Keep only last 10 readings
    if (speedHistory.length > 10) {
        speedHistory.shift();
    }
    
    // Update display
    const speedElement = document.getElementById('currentSpeed');
    if (speedElement) {
        speedElement.textContent = Math.round(currentSpeed);
    }
    updateSpeedStatus();
    
    // Trigger emergency scenario every 25 seconds for demo (if no emergency active)
    if (emergencyDetectionCounter % 25 === 0 && emergencyDetectionCounter > 0 && !isEmergencyActive) {
        console.log('🎯 Auto-triggering emergency for demo');
        simulateEmergencyBraking();
    }
}

function simulateEmergencyBraking() {
    console.log('🚨 Simulating emergency braking scenario');
    
    // Sudden speed reduction
    const reduction = 35 + Math.random() * 20; // 35-55 km/h reduction
    currentSpeed = Math.max(0, currentSpeed - reduction);
    
    // Update display immediately
    const speedElement = document.getElementById('currentSpeed');
    if (speedElement) {
        speedElement.textContent = Math.round(currentSpeed);
    }
    updateSpeedStatus('danger');
    
    // Trigger emergency detection
    setTimeout(() => {
        detectSpeedEmergency();
    }, 500);
}

function checkForEmergency() {
    if (speedHistory.length >= 2 && !isEmergencyActive) {
        const recent = speedHistory.slice(-2);
        const speedDrop = recent[0].speed - recent[1].speed;
        
        if (speedDrop >= 30) { // Emergency threshold
            console.log(`🚨 Speed drop detected: ${speedDrop.toFixed(1)} km/h`);
            detectSpeedEmergency();
        }
    }
}

function detectSpeedEmergency() {
    if (isEmergencyActive) {
        console.log('⚠️ Emergency already active, ignoring new detection');
        return;
    }
    
    console.log('⚠️ Emergency detected - sudden speed reduction');
    isEmergencyActive = true;
    
    // Update status
    updateStatusIndicator('Emergency Detected', 'error');
    
    // Show emergency modal
    showEmergencyModal();
    
    // Start countdown
    startEmergencyCountdown();
}

function showEmergencyModal() {
    console.log('📱 Showing emergency modal');
    const emergencyModal = document.getElementById('emergencyModal');
    if (emergencyModal) {
        emergencyModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Focus on safe button for accessibility
        setTimeout(() => {
            const safeButton = document.getElementById('safeButton');
            if (safeButton) {
                safeButton.focus();
            }
        }, 100);
    }
}

function hideEmergencyModal() {
    console.log('📱 Hiding emergency modal');
    const emergencyModal = document.getElementById('emergencyModal');
    if (emergencyModal) {
        emergencyModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
        clearEmergencyTimer();
    }
}

function startEmergencyCountdown() {
    let timeRemaining = 15;
    const countdownTimer = document.getElementById('countdownTimer');
    const timeLeft = document.getElementById('timeLeft');
    
    if (countdownTimer) countdownTimer.textContent = timeRemaining;
    if (timeLeft) timeLeft.textContent = timeRemaining;
    
    countdownInterval = setInterval(() => {
        timeRemaining--;
        if (countdownTimer) countdownTimer.textContent = timeRemaining;
        if (timeLeft) timeLeft.textContent = timeRemaining;
        
        console.log(`⏰ Countdown: ${timeRemaining} seconds remaining`);
        
        if (timeRemaining <= 0) {
            clearInterval(countdownInterval);
            handleTimeout();
        }
    }, 1000);
}

function clearEmergencyTimer() {
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
        console.log('⏰ Emergency timer cleared');
    }
}

function handleSafeResponse() {
    console.log('✅ User confirmed safety');
    clearEmergencyTimer();
    hideEmergencyModal();
    resetEmergencyState();
    
    showToast('✅ Emergency cleared - returning to normal monitoring', 'success');
}

function handleHelpResponse() {
    console.log('🚨 User requested help');
    clearEmergencyTimer();
    hideEmergencyModal();
    activateEmergencyProtocol();
}

function handleTimeout() {
    console.log('⏰ Emergency timeout - activating protocol');
    hideEmergencyModal();
    activateEmergencyProtocol();
}

function activateEmergencyProtocol() {
    console.log('🚨 EMERGENCY PROTOCOL ACTIVATED');
    
    // Update system status
    appData.systemStatus.emergencyMode = true;
    updateStatusIndicator('Emergency Active', 'error');
    
    // Send emergency data
    sendEmergencyAlerts();
    
    // Show protocol modal
    showEmergencyProtocolModal();
}

function sendEmergencyAlerts() {
    const emergencyData = {
        userId: 'TST001',
        userName: appData.userProfile.personalInfo.name,
        location: appData.locationData,
        medicalInfo: {
            bloodGroup: 'O+',
            emergencyContact: appData.userProfile.personalInfo.phone
        },
        timestamp: new Date().toISOString(),
        speedAtIncident: currentSpeed,
        emergencyType: 'speed_reduction'
    };
    
    console.log('📞 Alerting Police:', appData.nearbyServices.policeStations[0]);
    console.log('🚑 Alerting Hospital:', appData.nearbyServices.hospitals[0]);
    console.log('📍 Emergency Data Sent:', emergencyData);
    
    // Simulate successful delivery
    setTimeout(() => {
        console.log('✅ All emergency services notified successfully');
    }, 2000);
}

function showEmergencyProtocolModal() {
    console.log('📱 Showing emergency protocol modal');
    const emergencyProtocolModal = document.getElementById('emergencyProtocolModal');
    if (emergencyProtocolModal) {
        emergencyProtocolModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Animate protocol items
        setTimeout(() => {
            animateProtocolItems();
        }, 100);
    }
}

function hideEmergencyProtocolModal() {
    console.log('📱 Hiding emergency protocol modal');
    const emergencyProtocolModal = document.getElementById('emergencyProtocolModal');
    if (emergencyProtocolModal) {
        emergencyProtocolModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
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

function triggerManualSOS() {
    console.log('🆘 Manual SOS triggered');
    
    // Haptic feedback (if supported)
    if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200]);
    }
    
    // Visual feedback
    const button = document.getElementById('sosButton');
    if (button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
    }
    
    // Show confirmation dialog first
    if (confirm('🚨 EMERGENCY SOS ACTIVATION 🚨\n\nThis will immediately alert emergency services and your emergency contacts.\n\nAre you sure you want to activate emergency assistance?')) {
        if (!isEmergencyActive) {
            isEmergencyActive = true;
            showEmergencyModal();
            startEmergencyCountdown();
            updateStatusIndicator('Manual SOS Activated', 'error');
        }
    }
}

function returnToDashboardView() {
    console.log('🏠 Returning to dashboard view');
    hideEmergencyProtocolModal();
    hideEmergencyModal();
    resetEmergencyState();
    
    showToast('🏠 Returned to dashboard - monitoring resumed', 'info');
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1000);
}

function resetEmergencyState() {
    console.log('🔄 Resetting emergency state');
    isEmergencyActive = false;
    appData.systemStatus.emergencyMode = false;
    updateStatusIndicator('Monitoring Active', 'success');
    clearEmergencyTimer();
    
    // Reset speed simulation to normal
    setTimeout(() => {
        currentSpeed = 45 + (Math.random() - 0.5) * 10;
        updateSpeedStatus();
    }, 1000);
}

function activateEmergencySOS() {
    // This function is called from dashboard SOS button
    if (confirm('🚨 EMERGENCY SOS ACTIVATION 🚨\n\nThis will immediately alert emergency services and your emergency contacts.\n\nAre you sure you want to activate emergency assistance?')) {
        // Redirect to SOS page or activate emergency protocol
        if (document.querySelector('.sos-container')) {
            triggerManualSOS();
        } else {
            window.location.href = 'sos.html';
        }
    }
}

// ===============================
// SERVICES FUNCTIONS
// ===============================

function initializeServices() {
    console.log('Initializing Emergency Services...');
    
    // Initialize emergency contacts
    emergencyContacts = [...appData.emergencyContacts];
    
    // Setup event listeners
    setupServicesEventListeners();
}

function setupServicesEventListeners() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleAddContact);
    }
}

// Service navigation functions
function showMainServices() {
    hideAllSections();
    const mainServices = document.getElementById('main-services');
    if (mainServices) {
        mainServices.classList.remove('hidden');
    }
}

function showVehicleAssistance() {
    hideAllSections();
    const vehicleSection = document.getElementById('vehicle-assistance');
    if (vehicleSection) {
        vehicleSection.classList.remove('hidden');
    }
    clearResults('fuel-results');
    clearResults('mechanic-results');
    clearResults('air-results');
}

function showMedicalAssistance() {
    hideAllSections();
    const medicalSection = document.getElementById('medical-assistance');
    if (medicalSection) {
        medicalSection.classList.remove('hidden');
    }
    clearResults('hospital-results');
}

function showPoliceAssistance() {
    hideAllSections();
    const policeSection = document.getElementById('police-assistance');
    if (policeSection) {
        policeSection.classList.remove('hidden');
    }
    clearResults('police-results');
}

function showEmergencyContacts() {
    hideAllSections();
    const contactsSection = document.getElementById('emergency-contacts');
    if (contactsSection) {
        contactsSection.classList.remove('hidden');
    }
    loadEmergencyContacts();
}

function hideAllSections() {
    const sections = document.querySelectorAll('.service-section, #main-services');
    sections.forEach(section => section.classList.add('hidden'));
    
    const detailSections = document.querySelectorAll('.detail-section');
    detailSections.forEach(section => section.classList.add('hidden'));
}

// Vehicle assistance functions
function showFuelAssistance() {
    hideDetailSections();
    const fuelDetail = document.getElementById('fuel-detail');
    if (fuelDetail) {
        fuelDetail.classList.remove('hidden');
    }
    clearResults('fuel-results');
}

function showMechanicAssistance() {
    hideDetailSections();
    const mechanicDetail = document.getElementById('mechanic-detail');
    if (mechanicDetail) {
        mechanicDetail.classList.remove('hidden');
    }
    clearResults('mechanic-results');
}

function showAirAssistance() {
    hideDetailSections();
    const airDetail = document.getElementById('air-detail');
    if (airDetail) {
        airDetail.classList.remove('hidden');
    }
    clearResults('air-results');
}

function hideDetailSections() {
    const detailSections = document.querySelectorAll('.detail-section');
    detailSections.forEach(section => section.classList.add('hidden'));
}

function findNearbyService(serviceType) {
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        
        let relevantStations = appData.nearbyServices.petrolStations;
        let filteredStations = [];
        
        switch(serviceType.toLowerCase()) {
            case 'petrol':
                filteredStations = relevantStations.filter(station => 
                    station.services.includes('Petrol'));
                break;
            case 'diesel':
                filteredStations = relevantStations.filter(station => 
                    station.services.includes('Diesel'));
                break;
            case 'cng':
                filteredStations = relevantStations.filter(station => 
                    station.services.includes('CNG'));
                break;
            default:
                filteredStations = relevantStations;
        }
        
        displayServiceResults(filteredStations, 'fuel-results', serviceType);
        showToast(`Found ${filteredStations.length} ${serviceType} services nearby`, 'success');
    }, 1500);
}

function findNearbyMechanics() {
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        displayMechanicResults(appData.nearbyServices.mechanics, 'mechanic-results');
        showToast(`Found ${appData.nearbyServices.mechanics.length} mechanics nearby`, 'success');
    }, 1500);
}

function findAirServices() {
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        const airServices = appData.nearbyServices.petrolStations.filter(station => 
            station.services.includes('Air'));
        displayServiceResults(airServices, 'air-results', 'air');
        showToast(`Found ${airServices.length} air services nearby`, 'success');
    }, 1500);
}

function findHospitals(patientType) {
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        
        let relevantHospitals = appData.nearbyServices.hospitals;
        let prioritizedHospitals = [];
        
        switch(patientType) {
            case 'pregnant':
                prioritizedHospitals = relevantHospitals.filter(hospital => 
                    hospital.speciality.includes('Maternity'));
                prioritizedHospitals = prioritizedHospitals.concat(
                    relevantHospitals.filter(hospital => 
                        !hospital.speciality.includes('Maternity')));
                break;
            case 'accident':
                prioritizedHospitals = relevantHospitals.filter(hospital => 
                    hospital.speciality.includes('Trauma'));
                prioritizedHospitals = prioritizedHospitals.concat(
                    relevantHospitals.filter(hospital => 
                        !hospital.speciality.includes('Trauma')));
                break;
            default:
                prioritizedHospitals = relevantHospitals.sort((a, b) => 
                    parseFloat(a.distance) - parseFloat(b.distance));
        }
        
        displayHospitalResults(prioritizedHospitals, 'hospital-results', patientType);
        showToast(`Found ${prioritizedHospitals.length} hospitals for ${patientType} patient`, 'success');
    }, 1500);
}

function reportAccident() {
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        const policeStations = appData.nearbyServices.policeStations;
        displayPoliceResults(policeStations, 'police-results', 'accident');
        showToast('Emergency services have been notified', 'success');
    }, 1000);
}

function generalPoliceHelp() {
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        const policeStations = appData.nearbyServices.policeStations;
        displayPoliceResults(policeStations, 'police-results', 'general');
        showToast('Finding nearest police assistance', 'success');
    }, 1000);
}

function callPoliceEmergency() {
    if (confirm('This will call emergency police services. Continue?')) {
        showToast('Calling emergency police services...', 'success');
        setTimeout(() => {
            showToast('Connected to police emergency services', 'success');
        }, 2000);
    }
}

function callEmergencyService(serviceType) {
    const services = {
        police: '100',
        medical: '102'
    };
    
    const phoneNumber = services[serviceType];
    if (phoneNumber) {
        if (confirm(`This will call ${serviceType} emergency services (${phoneNumber}). Continue?`)) {
            showToast(`Calling ${serviceType} emergency services...`, 'success');
            // In a real app, this would initiate the call
            setTimeout(() => {
                showToast(`Connected to ${serviceType} emergency services`, 'success');
            }, 2000);
        }
    }
}

// Display results functions
function displayServiceResults(services, containerId, serviceType) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (services.length === 0) {
        container.innerHTML = `<div class="empty-state">
            <p>No ${serviceType} services found nearby</p>
        </div>`;
        return;
    }
    
    container.innerHTML = services.map(service => `
        <div class="result-item">
            <div class="result-info">
                <h4>${service.name}</h4>
                <p>Services: ${service.services.join(', ')}</p>
                <p>${service.distance} away</p>
            </div>
            <div class="result-actions">
                <button class="btn btn-call" onclick="callService('${service.phone}')">Call</button>
            </div>
        </div>
    `).join('');
}

function displayMechanicResults(mechanics, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = mechanics.map(mechanic => `
        <div class="result-item">
            <div class="result-info">
                <h4>${mechanic.name}</h4>
                <p>Speciality: ${mechanic.speciality}</p>
                <p>${mechanic.distance} away</p>
            </div>
            <div class="result-actions">
                <button class="btn btn-call" onclick="callService('${mechanic.phone}')">Call</button>
            </div>
        </div>
    `).join('');
}

function displayHospitalResults(hospitals, containerId, patientType) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = hospitals.map(hospital => `
        <div class="result-item">
            <div class="result-info">
                <h4>${hospital.name}</h4>
                <p>Speciality: ${hospital.speciality}</p>
                <p>Emergency: ${hospital.emergency}</p>
                <p>${hospital.distance} away</p>
            </div>
            <div class="result-actions">
                <button class="btn btn-call" onclick="callService('${hospital.phone}')">Call</button>
            </div>
        </div>
    `).join('');
}

function displayPoliceResults(stations, containerId, type) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = stations.map(station => `
        <div class="result-item">
            <div class="result-info">
                <h4>${station.name}</h4>
                <p>Jurisdiction: ${station.jurisdiction}</p>
                <p>${station.distance} away</p>
            </div>
            <div class="result-actions">
                <button class="btn btn-call" onclick="callService('${station.phone}')">Call</button>
            </div>
        </div>
    `).join('');
}

function callService(phoneNumber) {
    if (confirm(`This will call ${phoneNumber}. Continue?`)) {
        showToast('Initiating call...', 'success');
        // In a real app, this would initiate the call
        setTimeout(() => {
            showToast('Call initiated successfully', 'success');
        }, 1000);
    }
}

// ===============================
// PROFILE FUNCTIONS
// ===============================

function initializeProfile() {
    console.log('Initializing Profile...');
    loadUserProfileData();
    setupProfileEventListeners();
}

function loadUserProfileData() {
    const userInfo = appData.userProfile.personalInfo;
    
    // Update profile elements
    const elements = {
        'user-name': userInfo.name,
        'user-since': formatDate(userInfo.userSince),
        'primary-vehicle': getPrimaryVehicleNumber(),
        'total-requests': userInfo.totalRequests,
        'emergency-contacts-count': userInfo.emergencyContacts,
        'profile-name': userInfo.name,
        'profile-age': userInfo.age,
        'profile-gender': userInfo.gender,
        'profile-phone': userInfo.phone,
        'profile-email': userInfo.email,
        'profile-address': userInfo.address
    };
    
    Object.keys(elements).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.tagName === 'SELECT') {
                element.value = elements[id];
            } else {
                element.textContent = elements[id];
            }
        }
    });
    
    // Update profile picture
    const profileImg = document.getElementById('profile-img');
    if (profileImg) {
        profileImg.src = userInfo.profilePicture;
    }
}

function setupProfileEventListeners() {
    // Tab navigation is handled by showTab function
    
    // History filter
    const historyFilter = document.getElementById('history-filter');
    if (historyFilter) {
        historyFilter.addEventListener('change', filterHistory);
    }
}

function showTab(tabName) {
    // Hide all tab content
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Remove active class from all tab buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => button.classList.remove('active'));
    
    // Show selected tab content
    const targetTab = document.getElementById(`${tabName}-tab`);
    const targetButton = document.querySelector(`[data-tab="${tabName}"]`);
    
    if (targetTab && targetButton) {
        targetTab.classList.add('active');
        targetButton.classList.add('active');
    }
    
    // Load tab-specific data
    switch(tabName) {
        case 'vehicles':
            loadVehicles();
            break;
        case 'contacts':
            loadProfileEmergencyContacts();
            break;
        case 'history':
            loadRequestHistory();
            break;
        case 'settings':
            loadSettings();
            break;
    }
}

function loadVehicles() {
    const vehiclesList = document.getElementById('vehicles-list');
    if (!vehiclesList) return;
    
    const vehicles = appData.userProfile.vehicleDetails;
    
    if (vehicles.length === 0) {
        vehiclesList.innerHTML = `<div class="empty-state">
            <p>No vehicles added yet</p>
        </div>`;
        return;
    }
    
    vehiclesList.innerHTML = vehicles.map(vehicle => `
        <div class="vehicle-item">
            <div class="vehicle-info">
                <h4>${vehicle.brand} ${vehicle.model}</h4>
                <p>${vehicle.number} • ${vehicle.insurance}</p>
                <p>Policy expires: ${formatDateShort(vehicle.expiryDate)}</p>
            </div>
            <div class="vehicle-actions">
                <button class="btn btn-secondary" onclick="editVehicle(${vehicle.id})">Edit</button>
                <button class="btn btn-danger" onclick="removeVehicle(${vehicle.id})">Remove</button>
            </div>
        </div>
    `).join('');
}

function loadProfileEmergencyContacts() {
    const contactsGrid = document.getElementById('contacts-grid');
    if (!contactsGrid) return;
    
    const contacts = appData.emergencyContacts;
    
    if (contacts.length === 0) {
        contactsGrid.innerHTML = `<div class="empty-state">
            <p>Add contacts for quick access during emergencies</p>
        </div>`;
        return;
    }
    
    contactsGrid.innerHTML = contacts.map(contact => `
        <div class="contact-card">
            <div class="contact-info">
                <h4>${contact.name}</h4>
                <p>${contact.relation}</p>
                <p>${contact.phone}</p>
            </div>
            <div class="contact-actions">
                <button class="btn btn-call" onclick="callService('${contact.phone}')">Call</button>
                <button class="btn btn-secondary" onclick="editContact(${contact.id})">Edit</button>
                <button class="btn btn-danger" onclick="removeContact(${contact.id})">Remove</button>
            </div>
        </div>
    `).join('');
}

function loadRequestHistory() {
    const historyList = document.getElementById('history-list');
    if (!historyList) return;
    
    const history = appData.requestHistory;
    
    if (history.length === 0) {
        historyList.innerHTML = `<div class="empty-state">
            <p>Your service requests will appear here</p>
        </div>`;
        return;
    }
    
    historyList.innerHTML = history.map(request => `
        <div class="history-item">
            <div class="history-header">
                <h4>${request.type}</h4>
                <span class="history-date">${request.date} ${request.time}</span>
            </div>
            <div class="history-details">
                <p><strong>Service:</strong> ${request.subType}</p>
                <p><strong>Location:</strong> ${request.location}</p>
                <p><strong>Provider:</strong> ${request.provider}</p>
                <p><strong>Duration:</strong> ${request.duration}</p>
                <span class="status-badge status-${request.status.toLowerCase()}">${request.status}</span>
            </div>
        </div>
    `).join('');
}

function loadSettings() {
    // Settings are loaded via HTML, but we can add dynamic functionality here
    console.log('Settings loaded');
}

function filterHistory() {
    const filter = document.getElementById('history-filter').value;
    const historyItems = document.querySelectorAll('.history-item');
    
    historyItems.forEach(item => {
        const type = item.querySelector('h4').textContent;
        if (filter === 'all' || type === filter) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

function editProfile() {
    // Toggle profile editing mode
    const formControls = document.querySelectorAll('#profile-tab .form-control');
    const editButton = document.querySelector('#profile-tab .btn');
    const isReadonly = formControls[0].hasAttribute('readonly');
    
    if (isReadonly) {
        // Enable editing
        formControls.forEach(control => {
            control.removeAttribute('readonly');
            control.removeAttribute('disabled');
        });
        editButton.innerHTML = '<span>💾</span> Save Changes';
        editButton.onclick = saveProfile;
    } else {
        // Save changes
        saveProfile();
    }
}

function saveProfile() {
    showLoading();
    
    setTimeout(() => {
        // Update user data (in a real app, this would send to server)
        appData.userProfile.personalInfo.name = document.getElementById('profile-name').value;
        appData.userProfile.personalInfo.age = parseInt(document.getElementById('profile-age').value);
        appData.userProfile.personalInfo.gender = document.getElementById('profile-gender').value;
        appData.userProfile.personalInfo.phone = document.getElementById('profile-phone').value;
        appData.userProfile.personalInfo.email = document.getElementById('profile-email').value;
        appData.userProfile.personalInfo.address = document.getElementById('profile-address').value;
        
        // Disable editing
        const formControls = document.querySelectorAll('#profile-tab .form-control');
        const editButton = document.querySelector('#profile-tab .btn');
        
        formControls.forEach(control => {
            control.setAttribute('readonly', true);
            if (control.tagName === 'SELECT') {
                control.setAttribute('disabled', true);
            }
        });
        
        editButton.innerHTML = '<span>✏️</span> Edit';
        editButton.onclick = editProfile;
        
        hideLoading();
        showToast('Profile updated successfully!', 'success');
    }, 1000);
}

// ===============================
// EMERGENCY CONTACTS FUNCTIONS
// ===============================

function loadEmergencyContacts() {
    const contactsList = document.getElementById('contacts-list');
    if (!contactsList) return;
    
    if (emergencyContacts.length === 0) {
        contactsList.innerHTML = `<div class="empty-state">
            <p>No emergency contacts added yet</p>
        </div>`;
        return;
    }
    
    contactsList.innerHTML = emergencyContacts.map(contact => `
        <div class="contact-item">
            <div class="contact-info">
                <h4>${contact.name}</h4>
                <p>${contact.relation} • ${contact.phone}</p>
            </div>
            <div class="contact-actions">
                <button class="btn btn-call" onclick="callService('${contact.phone}')">Call</button>
                <button class="btn btn-secondary" onclick="editContact(${contact.id})">Edit</button>
                <button class="btn btn-danger" onclick="removeContact(${contact.id})">Remove</button>
            </div>
        </div>
    `).join('');
}

function showAddContactModal() {
    const modal = document.getElementById('contact-modal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function hideContactModal() {
    const modal = document.getElementById('contact-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
        
        // Reset form
        const form = document.getElementById('contact-form');
        if (form) form.reset();
    }
}

function handleAddContact(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const contactData = {
        id: nextContactId++,
        name: formData.get('name'),
        relation: formData.get('relation'),
        phone: formData.get('phone'),
        isPrimary: false
    };
    
    // Add to contacts array
    emergencyContacts.push(contactData);
    
    // Update display
    loadEmergencyContacts();
    
    // Hide modal
    hideContactModal();
    
    // Show success message
    showToast('Emergency contact added successfully!', 'success');
}

function removeContact(contactId) {
    if (confirm('Are you sure you want to remove this contact?')) {
        emergencyContacts = emergencyContacts.filter(contact => contact.id !== contactId);
        loadEmergencyContacts();
        showToast('Contact removed successfully!', 'success');
    }
}

function editContact(contactId) {
    // In a full implementation, this would open an edit modal
    showToast('Edit functionality would open here', 'info');
}

// ===============================
// UTILITY FUNCTIONS
// ===============================

function updateLocationDisplay() {
    const locationElements = {
        currentAddress: appData.locationData.address,
        coordinates: `${appData.locationData.latitude}, ${appData.locationData.longitude}`,
        accuracy: appData.locationData.accuracy
    };
    
    Object.keys(locationElements).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = locationElements[id];
        }
    });
}

function updateLocationTracking() {
    // Simulate minor GPS variations
    const latVariation = (Math.random() - 0.5) * 0.001;
    const lngVariation = (Math.random() - 0.5) * 0.001;
    
    appData.locationData.latitude += latVariation;
    appData.locationData.longitude += lngVariation;
    
    // Update display occasionally
    if (Math.random() < 0.1) { // 10% chance
        updateLocationDisplay();
    }
}

function updateSpeedStatus(forceStatus = null) {
    const statusElement = document.getElementById('speedStatus');
    if (!statusElement) return;
    
    let status = 'Normal';
    let className = '';
    
    if (forceStatus === 'danger') {
        status = 'Emergency!';
        className = 'danger';
    } else if (currentSpeed > 80) {
        status = 'High Speed';
        className = 'warning';
    } else if (currentSpeed < 10) {
        status = 'Very Slow';
        className = 'warning';
    }
    
    statusElement.textContent = status;
    statusElement.className = `speed-status ${className}`;
}

function updateStatusIndicator(text, type) {
    const statusText = document.getElementById('statusText');
    const statusDot = document.getElementById('statusDot');
    
    if (statusText) statusText.textContent = text;
    
    if (statusDot) {
        statusDot.className = 'status-dot';
        if (type === 'error') {
            statusDot.style.background = 'var(--danger)';
        } else if (type === 'warning') {
            statusDot.style.background = 'var(--warning)';
        } else {
            statusDot.style.background = 'var(--success)';
        }
    }
}

function showLoading() {
    const loadingModal = document.getElementById('loading-modal');
    if (loadingModal) {
        loadingModal.classList.remove('hidden');
    }
}

function hideLoading() {
    const loadingModal = document.getElementById('loading-modal');
    if (loadingModal) {
        loadingModal.classList.add('hidden');
    }
}

function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    if (toast && toastMessage) {
        // Clear existing classes
        toast.className = 'toast';
        
        // Add type class
        if (type !== 'info') {
            toast.classList.add(type);
        }
        
        // Set message
        toastMessage.textContent = message;
        
        // Show toast
        toast.classList.remove('hidden');
        
        // Auto hide after 4 seconds
        setTimeout(() => {
            hideToast();
        }, 4000);
    }
}

function hideToast() {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.classList.add('hidden');
    }
}

function clearResults(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = '';
    }
}

function clearAllMessages() {
    const messages = document.querySelectorAll('.auth-error, .auth-success, .field-error');
    messages.forEach(msg => {
        msg.classList.add('hidden');
        msg.classList.remove('show');
    });
    
    const inputs = document.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.classList.remove('error', 'success');
    });
}

// Validation functions
function validatePasswordRequirements(password) {
    const requirements = [
        { id: 'req-length', test: password.length >= 8 },
        { id: 'req-uppercase', test: /[A-Z]/.test(password) },
        { id: 'req-lowercase', test: /[a-z]/.test(password) },
        { id: 'req-special', test: /[!@#$%^&*()_+\-=\[\]{}|;:,.<?]/.test(password) }
    ];
    
    requirements.forEach(({ id, test }) => {
        const element = document.getElementById(id);
        if (element) {
            element.classList.toggle('valid', test);
        }
    });
    
    return requirements.every(req => req.test);
}

function validatePasswordMatch() {
    const password = document.getElementById('registerPassword');
    const confirmPassword = document.getElementById('confirmPassword');
    const errorElement = document.getElementById('confirmPasswordError');
    
    if (!password || !confirmPassword || !errorElement) return false;
    
    const passwordValue = password.value;
    const confirmValue = confirmPassword.value;
    
    if (confirmValue && passwordValue !== confirmValue) {
        errorElement.textContent = 'Passwords do not match';
        errorElement.classList.add('show');
        confirmPassword.classList.add('error');
        return false;
    } else {
        errorElement.classList.remove('show');
        confirmPassword.classList.remove('error');
        if (confirmValue) {
            confirmPassword.classList.add('success');
        }
        return true;
    }
}

function userExists(email) {
    const users = getStoredUsers();
    return users.some(user => user.email === email);
}

function createUserAccount(userData) {
    const users = getStoredUsers();
    const newUser = {
        id: Date.now().toString(),
        name: userData.name,
        age: userData.age,
        email: userData.email,
        username: userData.email,
        password: userData.password,
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
}

function getStoredUsers() {
    try {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : [];
    } catch (e) {
        console.error('Error parsing users data:', e);
        return [];
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long' 
    });
}

function formatDateShort(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US');
}

function getPrimaryVehicleNumber() {
    const primaryVehicle = appData.userProfile.vehicleDetails.find(v => v.isPrimary);
    return primaryVehicle ? primaryVehicle.number : 'None';
}

// Global event listeners
function setupGlobalEventListeners() {
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    // Page visibility change
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Before unload warning during emergency
    window.addEventListener('beforeunload', function(e) {
        if (isEmergencyActive) {
            e.preventDefault();
            e.returnValue = '';
            return 'Emergency is active. Are you sure you want to leave?';
        }
    });
    
    // Global error handler
    window.addEventListener('error', function(e) {
        console.error('Global error:', e.error);
    });
}

function handleKeyboardShortcuts(e) {
    // Ctrl/Cmd + S for SOS (for accessibility)
    if ((e.ctrlKey || e.metaKey) && e.key === 's' && !isEmergencyActive) {
        e.preventDefault();
        if (document.querySelector('.sos-container')) {
            triggerManualSOS();
        }
    }
    
    // Escape to close modals
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal:not(.hidden)');
        modals.forEach(modal => {
            if (modal.id === 'emergencyModal') {
                handleSafeResponse(); // Assume safe if escape pressed
            } else {
                modal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Y for Yes, N for No during emergency
    const emergencyModal = document.getElementById('emergencyModal');
    if (emergencyModal && !emergencyModal.classList.contains('hidden')) {
        if (e.key === 'y' || e.key === 'Y') {
            e.preventDefault();
            handleSafeResponse();
        } else if (e.key === 'n' || e.key === 'N') {
            e.preventDefault();
            handleHelpResponse();
        }
    }
}

function handleVisibilityChange() {
    if (document.hidden) {
        console.log('📱 App moved to background - monitoring continues');
    } else {
        console.log('📱 App returned to foreground');
        // Refresh data when returning to foreground
        if (typeof updateTimeGreeting === 'function') {
            updateTimeGreeting();
        }
        if (typeof updateLocationDisplay === 'function') {
            updateLocationDisplay();
        }
    }
}

// Service Worker Registration (for background operation)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
        console.log('🔧 Service Worker registered successfully');
    }).catch(function(error) {
        console.log('Service Worker registration failed:', error);
    });
}

// Battery API for critical situations (if supported)
if ('getBattery' in navigator) {
    navigator.getBattery().then(function(battery) {
        if (battery.level < 0.15) { // Below 15%
            console.log('🔋 Low battery detected - emergency system prioritized');
        }
    });
}

// Cleanup function
window.addEventListener('beforeunload', function() {
    if (backgroundMonitoringInterval) {
        clearInterval(backgroundMonitoringInterval);
    }
    
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
    
    if (greetingUpdateInterval) {
        clearInterval(greetingUpdateInterval);
    }
});

console.log('✅ Smart Tourist Safety System fully loaded and operational');