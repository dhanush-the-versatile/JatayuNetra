// Smart Tourist Safety System - Main JavaScript
// Northeast India - Complete Application Logic

// ===== GLOBAL VARIABLES =====
let currentUser = null;
let currentPage = 'loading';
let systemStatus = {
    gps: false,
    ai: false,
    blockchain: false,
    emergency: false,
    iot: false
};

// Sample users for demo
const DEMO_USERS = {
    tourist: {
        username: 'tourist_demo',
        password: 'northeast123',
        data: {
            id: 'TST-AS-2025-001234',
            name: 'Rajesh Kumar',
            email: 'rajesh@email.com',
            mobile: '+91-9876543210',
            type: 'tourist',
            safetyScore: 95,
            location: {
                state: 'assam',
                city: 'Guwahati',
                coordinates: { lat: 26.1445, lng: 91.7362 }
            }
        }
    },
    authority: {
        username: 'POLICE001',
        password: 'admin123',
        data: {
            id: 'AUTH-AS-2025-001',
            name: 'Officer Johnson',
            unit: 'Assam Police Tourism Wing',
            type: 'authority'
        }
    }
};

// Northeast India states data
const NORTHEAST_STATES = {
    arunachal: { name: 'Arunachal Pradesh', capital: 'Itanagar', permit: true },
    assam: { name: 'Assam', capital: 'Guwahati', permit: false },
    manipur: { name: 'Manipur', capital: 'Imphal', permit: true },
    meghalaya: { name: 'Meghalaya', capital: 'Shillong', permit: false },
    mizoram: { name: 'Mizoram', capital: 'Aizawl', permit: true },
    nagaland: { name: 'Nagaland', capital: 'Kohima', permit: true },
    sikkim: { name: 'Sikkim', capital: 'Gangtok', permit: true },
    tripura: { name: 'Tripura', capital: 'Agartala', permit: false }
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🏔️ Smart Tourist Safety System initializing...');
    initializeApplication();
});

function initializeApplication() {
    showLoadingScreen();
    
    // Simulate system initialization
    setTimeout(() => {
        checkExistingSession();
    }, 2000);
    
    // Setup global event listeners
    setupEventListeners();
    
    // Initialize services
    initializeServices();
}

function showLoadingScreen() {
    const messages = [
        'Connecting to Blockchain Network...',
        'Initializing AI Monitoring Systems...',
        'Loading Geo-fencing Data...',
        'Connecting Emergency Services...',
        'Verifying IoT Devices...',
        'System Ready!'
    ];
    
    const loadingText = document.querySelector('.loading-text');
    let messageIndex = 0;
    
    const interval = setInterval(() => {
        if (loadingText && messageIndex < messages.length) {
            loadingText.textContent = messages[messageIndex];
            messageIndex++;
        } else {
            clearInterval(interval);
        }
    }, 400);
}

function checkExistingSession() {
    const savedUser = localStorage.getItem('smartTouristUser');
    
    if (savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
            showDashboard();
        } catch (error) {
            console.error('Error loading saved session:', error);
            showLoginScreen();
        }
    } else {
        showLoginScreen();
    }
}

function showLoginScreen() {
    hideAllScreens();
    document.getElementById('login-screen').classList.remove('hidden');
    currentPage = 'login';
    
    // Add smooth transition
    setTimeout(() => {
        document.getElementById('login-screen').style.opacity = '1';
        document.getElementById('login-screen').style.transform = 'translateY(0)';
    }, 100);
}

function showRegistrationScreen() {
    hideAllScreens();
    document.getElementById('register-screen').classList.remove('hidden');
    currentPage = 'register';
    
    // Add smooth transition
    setTimeout(() => {
        document.getElementById('register-screen').style.opacity = '1';
        document.getElementById('register-screen').style.transform = 'translateY(0)';
    }, 100);
}

function showDashboard() {
    if (currentUser && currentUser.type === 'tourist') {
        window.location.href = 'dashboard.html';
    } else if (currentUser && currentUser.type === 'authority') {
        window.location.href = 'authority-dashboard.html';
    }
}

function hideAllScreens() {
    const screens = document.querySelectorAll('.screen, .loading-screen');
    screens.forEach(screen => {
        screen.style.opacity = '0';
        screen.style.transform = 'translateY(20px)';
        setTimeout(() => {
            screen.classList.add('hidden');
        }, 300);
    });
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // User type toggle
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const userType = this.dataset.type;
            switchUserType(userType);
        });
    });

    // Login forms
    const touristForm = document.getElementById('tourist-login-form');
    const authorityForm = document.getElementById('authority-login-form');
    
    if (touristForm) {
        touristForm.addEventListener('submit', handleTouristLogin);
    }
    
    if (authorityForm) {
        authorityForm.addEventListener('submit', handleAuthorityLogin);
    }

    // Registration form
    const registrationForm = document.getElementById('registration-form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', handleRegistration);
    }

    // Show registration button
    const showRegisterBtn = document.getElementById('show-register-btn');
    if (showRegisterBtn) {
        showRegisterBtn.addEventListener('click', showRegistrationScreen);
    }

    // ID type selection
    const idTypeCards = document.querySelectorAll('.id-type-card');
    idTypeCards.forEach(card => {
        card.addEventListener('click', function() {
            const type = this.dataset.type;
            selectIdType(type);
        });
    });

    // Language selection
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.dataset.lang;
            selectLanguage(lang);
        });
    });

    // Proceed to dashboard button
    const proceedBtn = document.getElementById('proceed-to-dashboard');
    if (proceedBtn) {
        proceedBtn.addEventListener('click', showDashboard);
    }

    // Online/offline detection
    window.addEventListener('online', () => updateConnectionStatus(true));
    window.addEventListener('offline', () => updateConnectionStatus(false));
    
    // Update time
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
}

// ===== USER TYPE SWITCHING =====
function switchUserType(type) {
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const touristForm = document.getElementById('tourist-login-form');
    const authorityForm = document.getElementById('authority-login-form');
    
    // Update toggle buttons
    toggleBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.type === type);
    });
    
    // Show appropriate form with animation
    if (type === 'tourist') {
        authorityForm.style.opacity = '0';
        setTimeout(() => {
            authorityForm.classList.add('hidden');
            touristForm.classList.remove('hidden');
            setTimeout(() => {
                touristForm.style.opacity = '1';
            }, 50);
        }, 200);
    } else {
        touristForm.style.opacity = '0';
        setTimeout(() => {
            touristForm.classList.add('hidden');
            authorityForm.classList.remove('hidden');
            setTimeout(() => {
                authorityForm.style.opacity = '1';
            }, 50);
        }, 200);
    }
}

// ===== LOGIN HANDLING =====
function handleTouristLogin(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const username = formData.get('tourist-username') || document.getElementById('tourist-username').value;
    const password = formData.get('tourist-password') || document.getElementById('tourist-password').value;
    
    console.log('Attempting tourist login:', username);
    
    // Check demo credentials
    const demoUser = DEMO_USERS.tourist;
    if (username === demoUser.username && password === demoUser.password) {
        currentUser = demoUser.data;
        saveUserSession();
        showLoginSuccess('tourist');
        return;
    }
    
    // Check if it's a digital ID
    if (username.startsWith('TST-') && password.length >= 6) {
        currentUser = {
            ...DEMO_USERS.tourist.data,
            id: username
        };
        saveUserSession();
        showLoginSuccess('tourist');
        return;
    }
    
    showToast('❌ Invalid credentials. Try demo: tourist_demo / northeast123', 'error');
}

function handleAuthorityLogin(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const authorityId = formData.get('authority-id') || document.getElementById('authority-id').value;
    const password = formData.get('authority-password') || document.getElementById('authority-password').value;
    
    console.log('Attempting authority login:', authorityId);
    
    // Check demo credentials
    const demoUser = DEMO_USERS.authority;
    if (authorityId === demoUser.username && password === demoUser.password) {
        currentUser = demoUser.data;
        saveUserSession();
        showLoginSuccess('authority');
        return;
    }
    
    showToast('❌ Invalid authority credentials. Try demo: POLICE001 / admin123', 'error');
}

function showLoginSuccess(type) {
    showToast('✅ Login successful! Redirecting...', 'success');
    
    setTimeout(() => {
        if (type === 'tourist') {
            window.location.href = 'dashboard.html';
        } else {
            showToast('👮 Authority dashboard coming soon', 'info');
            // window.location.href = 'authority-dashboard.html';
        }
    }, 1500);
}

// ===== REGISTRATION HANDLING =====
function selectIdType(type) {
    const idTypeSection = document.getElementById('id-type-selection');
    const registrationForm = document.getElementById('registration-form');
    
    // Hide selection with animation
    idTypeSection.style.opacity = '0';
    idTypeSection.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        idTypeSection.classList.add('hidden');
        registrationForm.classList.remove('hidden');
        
        // Update form based on type
        const idLabel = document.querySelector('label[for="id-number"]');
        const idInput = document.getElementById('id-number');
        
        if (type === 'domestic') {
            idLabel.textContent = 'Aadhaar Number';
            idInput.placeholder = 'Enter 12-digit Aadhaar number';
        } else {
            idLabel.textContent = 'Passport Number';
            idInput.placeholder = 'Enter passport number';
        }
        
        // Show form with animation
        setTimeout(() => {
            registrationForm.style.opacity = '1';
            registrationForm.style.transform = 'translateY(0)';
        }, 100);
    }, 300);
}

function handleRegistration(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const registrationData = {
        fullName: formData.get('full-name') || document.getElementById('full-name').value,
        username: formData.get('new-username') || document.getElementById('new-username').value,
        password: formData.get('new-password') || document.getElementById('new-password').value,
        confirmPassword: formData.get('confirm-password') || document.getElementById('confirm-password').value,
        mobile: formData.get('mobile') || document.getElementById('mobile').value,
        email: formData.get('email') || document.getElementById('email').value,
        arrivalDate: formData.get('arrival-date') || document.getElementById('arrival-date').value,
        departureDate: formData.get('departure-date') || document.getElementById('departure-date').value,
        destinationState: formData.get('destination-state') || document.getElementById('destination-state').value,
        emergencyName: formData.get('emergency-name') || document.getElementById('emergency-name').value,
        emergencyPhone: formData.get('emergency-phone') || document.getElementById('emergency-phone').value,
        locationConsent: document.getElementById('location-consent').checked,
        dataConsent: document.getElementById('data-consent').checked,
        termsConsent: document.getElementById('terms-consent').checked
    };
    
    // Validate form
    const validation = validateRegistration(registrationData);
    if (!validation.isValid) {
        showToast(`❌ ${validation.error}`, 'error');
        return;
    }
    
    // Show progress
    showRegistrationProgress(registrationData);
}

function validateRegistration(data) {
    if (!data.fullName || data.fullName.length < 2) {
        return { isValid: false, error: 'Please enter your full name' };
    }
    
    if (!data.username || data.username.length < 3) {
        return { isValid: false, error: 'Username must be at least 3 characters' };
    }
    
    if (!data.password || data.password.length < 6) {
        return { isValid: false, error: 'Password must be at least 6 characters' };
    }
    
    if (data.password !== data.confirmPassword) {
        return { isValid: false, error: 'Passwords do not match' };
    }
    
    if (!data.mobile || !data.mobile.match(/^\+?91[6-9]\d{9}$/)) {
        return { isValid: false, error: 'Please enter a valid Indian mobile number' };
    }
    
    if (!data.email || !data.email.includes('@')) {
        return { isValid: false, error: 'Please enter a valid email address' };
    }
    
    if (!data.locationConsent || !data.dataConsent || !data.termsConsent) {
        return { isValid: false, error: 'Please accept all required consents' };
    }
    
    return { isValid: true };
}

function showRegistrationProgress(data) {
    const form = document.getElementById('registration-form');
    const progress = document.getElementById('registration-progress');
    
    // Hide form, show progress
    form.style.opacity = '0';
    setTimeout(() => {
        form.classList.add('hidden');
        progress.classList.remove('hidden');
        progress.style.opacity = '1';
        
        // Simulate progress
        simulateRegistrationProgress(data);
    }, 300);
}

function simulateRegistrationProgress(data) {
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
            completeRegistration(data);
        }
    }, 1000);
}

function completeRegistration(data) {
    const progress = document.getElementById('registration-progress');
    const success = document.getElementById('registration-success');
    
    // Generate digital ID
    const stateCode = data.destinationState ? data.destinationState.substring(0, 2).toUpperCase() : 'NE';
    const year = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 900000) + 100000;
    const digitalId = `TST-${stateCode}-${year}-${randomNum}`;
    
    // Update success screen
    document.getElementById('generated-id').textContent = digitalId;
    document.getElementById('display-name').textContent = data.fullName;
    document.getElementById('display-username').textContent = data.username;
    document.getElementById('display-validity').textContent = data.departureDate;
    
    // Create user object
    currentUser = {
        id: digitalId,
        name: data.fullName,
        username: data.username,
        email: data.email,
        mobile: data.mobile,
        type: 'tourist',
        safetyScore: 95,
        registrationDate: new Date().toISOString()
    };
    
    // Hide progress, show success
    progress.style.opacity = '0';
    setTimeout(() => {
        progress.classList.add('hidden');
        success.classList.remove('hidden');
        success.style.opacity = '1';
    }, 300);
}

// ===== UTILITY FUNCTIONS =====
function saveUserSession() {
    if (currentUser) {
        localStorage.setItem('smartTouristUser', JSON.stringify(currentUser));
        console.log('✅ User session saved');
    }
}

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const btn = input.parentElement.querySelector('.password-toggle');
    
    if (input.type === 'password') {
        input.type = 'text';
        btn.innerHTML = '<span>🙈</span>';
    } else {
        input.type = 'password';
        btn.innerHTML = '<span>👁️</span>';
    }
}

function selectLanguage(lang) {
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    
    localStorage.setItem('selectedLanguage', lang);
    showToast(`🌐 Language changed to ${getLanguageName(lang)}`, 'success');
}

function getLanguageName(code) {
    const languages = {
        'en': 'English',
        'hi': 'हिंदी',
        'as': 'অসমীয়া',
        'bn': 'বাংলা',
        'mni': 'মেইতেই',
        'kha': 'খাসি'
    };
    return languages[code] || 'Unknown';
}

function updateConnectionStatus(isOnline) {
    const statusEl = document.getElementById('connection-status');
    if (statusEl) {
        statusEl.textContent = isOnline ? 'Online' : 'Offline';
        statusEl.className = isOnline ? 'online' : 'offline';
    }
    
    if (!isOnline) {
        showToast('📶 Connection lost - Emergency features still active', 'warning');
    } else {
        showToast('📶 Connection restored', 'success');
    }
}

function updateCurrentTime() {
    const timeEl = document.getElementById('current-time');
    if (timeEl) {
        const now = new Date();
        const time = now.toLocaleTimeString('en-IN', { 
            timeZone: 'Asia/Kolkata',
            hour12: true,
            hour: 'numeric',
            minute: '2-digit'
        });
        timeEl.textContent = time;
    }
}

function initializeServices() {
    // Initialize all system services
    systemStatus.gps = true;
    systemStatus.ai = true;
    systemStatus.blockchain = true;
    systemStatus.emergency = true;
    systemStatus.iot = true;
    
    console.log('✅ All services initialized');
}

// ===== NAVIGATION FUNCTIONS =====
function navigateTo(page) {
    // Add smooth transition
    document.body.style.transition = 'opacity 0.3s ease';
    document.body.style.opacity = '0.7';
    
    setTimeout(() => {
        window.location.href = page;
    }, 200);
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('smartTouristUser');
        currentUser = null;
        showToast('👋 Logged out successfully', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }
}

// ===== EMERGENCY FUNCTIONS =====
function activateEmergencySOS() {
    if (confirm('🚨 EMERGENCY SOS ACTIVATION\n\nThis will alert emergency services and your contacts.\n\nContinue?')) {
        window.location.href = 'sos.html';
    }
}

// ===== TOAST NOTIFICATIONS =====
function showToast(message, type = 'info', duration = 4000) {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    
    toast.innerHTML = `
        <div class="toast-content">
            <span class="toast-icon">${icons[type] || icons.info}</span>
            <span class="toast-message">${message}</span>
            <button class="toast-close" onclick="this.parentNode.parentNode.remove()">×</button>
        </div>
    `;
    
    // Style the toast
    Object.assign(toast.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: 'white',
        border: `2px solid ${getToastColor(type)}`,
        borderRadius: '10px',
        padding: '15px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        zIndex: '10000',
        maxWidth: '400px',
        opacity: '0',
        transform: 'translateX(100%)',
        transition: 'all 0.3s ease'
    });
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(0)';
    }, 100);
    
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

function getToastColor(type) {
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    return colors[type] || colors.info;
}

// ===== GLOBAL ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('Application Error:', e.error);
    showToast('System error - Emergency services remain active', 'error');
});

// ===== PAGE VISIBILITY HANDLING =====
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('🔄 App backgrounded');
    } else {
        console.log('🔄 App foregrounded');
    }
});

console.log('✅ Smart Tourist Safety System - Main Script Loaded');