// JatayuNetra - Smart Tourist Safety Monitoring & Incident Response System

class JatayuNetra {
    constructor() {
        this.currentUser = null;
        this.currentLanguage = 'en';
        this.currentTheme = 'light';
        this.currentLocation = null;
        this.sosActive = false;
        this.monitoringChart = null;
        this.anomalyChart = null;
        
        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(() => this.init(), 100);
            });
        } else {
            setTimeout(() => this.init(), 100);
        }
    }

    init() {
        console.log('Initializing JatayuNetra...');
        this.loadTheme();
        this.loadLanguage();
        this.setupEventListeners();
        this.checkAuthentication();
        this.startLocationTracking();
        this.startRealTimeUpdates();
        console.log('JatayuNetra initialized successfully');
    }

    // Translation system
    translations = {
        en: {
            'dashboard': 'Dashboard',
            'tourist-id': 'Tourist ID',
            'geo-fencing': 'Geo-Fencing',
            'ai-monitoring': 'AI Monitoring',
            'services': 'Services',
            'emergency': 'Emergency',
            'logout': 'Logout',
            'login': 'Login',
            'username': 'Username',
            'password': 'Password',
            'tagline': 'Smart Tourist Safety Monitoring & Incident Response System',
            'online': 'Online',
            'active-tourists': 'Active Tourists',
            'active-alerts': 'Active Alerts',
            'safety-score': 'Safety Score',
            'secure-zones': 'Secure Zones',
            'real-time-monitoring': 'Real-time Monitoring',
            'nearby-services': 'Nearby Services',
            'recent-activities': 'Recent Activities',
            'digital-tourist-id': 'Digital Tourist ID Generation',
            'id-description': 'Generate secure blockchain-based digital identification for tourists',
            'full-name': 'Full Name',
            'age': 'Age',
            'nationality': 'Nationality',
            'id-type': 'ID Type',
            'id-number': 'ID Number',
            'trip-duration': 'Trip Duration (Days)',
            'travel-purpose': 'Travel Purpose',
            'emergency-contact': 'Emergency Contact',
            'generate-id': 'Generate Digital ID',
            'id-preview': 'ID Preview',
            'name': 'Name',
            'id': 'ID',
            'validity': 'Valid Until',
            'qr-code': 'QR Code',
            'geo-fencing': 'Geo-Fencing & Zone Management',
            'geo-description': 'Monitor safe and restricted zones with real-time alerts',
            'zone-management': 'Zone Management',
            'tourist-spots': 'Tourist Spots',
            'caution-areas': 'Caution Areas',
            'restricted-zones': 'Restricted Zones',
            'alert-settings': 'Alert Settings',
            'zone-entry-alerts': 'Zone Entry Alerts',
            'zone-exit-alerts': 'Zone Exit Alerts',
            'proximity-alerts': 'Proximity Alerts',
            'ai-anomaly-detection': 'AI Anomaly Detection',
            'ai-description': 'Real-time behavior analysis and predictive alerts',
            'detection-patterns': 'Detection Patterns',
            'active-anomalies': 'Active Anomalies',
            'detection-settings': 'Detection Settings',
            'speed-threshold': 'Speed Drop Threshold',
            'inactivity-threshold': 'Inactivity Time',
            'deviation-threshold': 'Route Deviation',
            'emergency-services': 'Emergency Services',
            'services-description': 'Quick access to nearby emergency services and assistance',
            'medical-services': '🏥 Medical Services',
            'police-services': '🚔 Police Services',
            'other-services': '🔧 Other Services',
            'emergency-alert': '🚨 EMERGENCY ALERT',
            'sos-activated': 'SOS has been activated. Help is on the way!',
            'location-shared': '📍 Location shared with:',
            'nearest-police': 'Nearest Police Station',
            'emergency-contacts': 'Emergency Contacts',
            'tourism-dept': 'Tourism Department',
            'response-time': 'Expected response time:',
            'cancel-sos': 'Cancel SOS',
            'call-emergency': '📞 Call Emergency'
        },
        hi: {
            'dashboard': 'डैशबोर्ड',
            'tourist-id': 'पर्यटक ID',
            'geo-fencing': 'जियो-फेंसिंग',
            'ai-monitoring': 'AI निगरानी',
            'services': 'सेवाएं',
            'emergency': 'आपातकाल',
            'logout': 'लॉगआउट',
            'login': 'लॉगिन',
            'username': 'उपयोगकर्ता नाम',
            'password': 'पासवर्ड',
            'tagline': 'स्मार्ट पर्यटक सुरक्षा निगरानी और घटना प्रतिक्रिया प्रणाली',
            'online': 'ऑनलाइन',
            'active-tourists': 'सक्रिय पर्यटक',
            'active-alerts': 'सक्रिय अलर्ट',
            'safety-score': 'सुरक्षा स्कोर',
            'secure-zones': 'सुरक्षित क्षेत्र'
        },
        ta: {
            'dashboard': 'டாஷ்போர்டு',
            'tourist-id': 'சுற்றுலா ID',
            'geo-fencing': 'ஜியோ-ஃபென்சிங்',
            'ai-monitoring': 'AI கண்காணிப்பு',
            'services': 'சேவைகள்',
            'emergency': 'அவசரநிலை',
            'logout': 'வெளியேறு',
            'login': 'உள்நுழைய',
            'username': 'பயனர்பெயர்',
            'password': 'கடவுச்சொல்',
            'tagline': 'ஸ்மார்ட் சுற்றுலா பாதுகாப்பு கண்காணிப்பு மற்றும் சம்பவ பதில் அமைப்பு',
            'online': 'ஆன்லைன்',
            'active-tourists': 'செயலில் உள்ள சுற்றுலாப் பயணிகள்',
            'active-alerts': 'செயலில் உள்ள எச்சரிக்கைகள்',
            'safety-score': 'பாதுகாப்பு மதிப்பெண்',
            'secure-zones': 'பாதுகாப்பான மண்டலங்கள்'
        },
        bn: {
            'dashboard': 'ড্যাশবোর্ড',
            'tourist-id': 'পর্যটক ID',
            'geo-fencing': 'জিও-ফেন্সিং',
            'ai-monitoring': 'AI পর্যবেক্ষণ',
            'services': 'সেবা',
            'emergency': 'জরুরি',
            'logout': 'লগআউট',
            'login': 'লগইন',
            'username': 'ব্যবহারকারীর নাম',
            'password': 'পাসওয়ার্ড',
            'tagline': 'স্মার্ট পর্যটক নিরাপত্তা পর্যবেক্ষণ ও ঘটনা প্রতিক্রিয়া সিস্টেম',
            'online': 'অনলাইন',
            'active-tourists': 'সক্রিয় পর্যটক',
            'active-alerts': 'সক্রিয় সতর্কতা',
            'safety-score': 'নিরাপত্তা স্কোর',
            'secure-zones': 'নিরাপদ এলাকা'
        }
    };

    // Sample data
    sampleData = {
        credentials: { username: 'admin', password: 'admin123' },
        userProfile: {
            name: 'Rajesh Kumar',
            age: 28,
            phone: '+91-9876543210',
            email: 'rajesh.kumar@email.com',
            address: '123 Main Street, Vizianagaram, Andhra Pradesh, India'
        },
        nearbyServices: {
            medical: [
                { name: 'City General Hospital', distance: '2.1 km', phone: '+91-9876543230', type: 'Hospital' },
                { name: 'Trauma Care Center', distance: '2.8 km', phone: '+91-9876543232', type: 'Emergency' },
                { name: 'HealthCare Clinic', distance: '1.5 km', phone: '+91-9876543233', type: 'Clinic' }
            ],
            police: [
                { name: 'Highway Police Station', distance: '1.3 km', phone: '+91-9876543240', type: 'Police Station' },
                { name: 'City Police Station', distance: '2.2 km', phone: '+91-9876543241', type: 'Police Station' },
                { name: 'Tourist Police Unit', distance: '0.8 km', phone: '+91-9876543242', type: 'Tourist Police' }
            ],
            others: [
                { name: 'Auto Repair Shop', distance: '1.0 km', phone: '+91-9876543250', type: 'Mechanic' },
                { name: 'Fuel Station', distance: '0.7 km', phone: '+91-9876543251', type: 'Fuel' },
                { name: 'Tourist Information', distance: '1.2 km', phone: '+91-9876543252', type: 'Information' }
            ]
        },
        activities: [
            { icon: '🚨', title: 'SOS Alert Resolved', description: 'Tourist ID #TJ2024001 - False alarm', time: '2 minutes ago' },
            { icon: '📍', title: 'Zone Entry Alert', description: 'Tourist entered restricted area', time: '5 minutes ago' },
            { icon: '🔍', title: 'AI Anomaly Detected', description: 'Unusual movement pattern detected', time: '8 minutes ago' },
            { icon: '✅', title: 'ID Verification Complete', description: 'New tourist registration approved', time: '12 minutes ago' },
            { icon: '📞', title: 'Emergency Contact Updated', description: 'Tourist ID #TJ2024002', time: '18 minutes ago' }
        ]
    };

    setupEventListeners() {
        console.log('Setting up event listeners...');
        
        // Login form - Use more robust event binding
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            console.log('Login form found, adding event listener');
            loginForm.addEventListener('submit', (e) => {
                console.log('Login form submitted');
                this.handleLogin(e);
            });
            
            // Also add click listener to the submit button directly
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.addEventListener('click', (e) => {
                    console.log('Login button clicked');
                    if (e.target.type === 'submit') {
                        // Let form submission handle it
                        return;
                    }
                    e.preventDefault();
                    this.handleLoginDirect();
                });
            }
        } else {
            console.log('Login form not found');
        }
        
        // Navigation buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Navigation clicked:', e.target.dataset.section);
                this.navigate(e.target.dataset.section);
            });
        });

        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleTheme();
            });
        }
        
        // Language selector
        const languageSelector = document.getElementById('language-selector');
        if (languageSelector) {
            languageSelector.addEventListener('change', (e) => {
                this.changeLanguage(e.target.value);
            });
        }
        
        // SOS button
        const sosButton = document.getElementById('sos-button');
        if (sosButton) {
            sosButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.activateSOS();
            });
        }
        
        // Logout
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.logout();
            });
        }
        
        // Tourist ID form
        const touristIdForm = document.getElementById('tourist-id-form');
        if (touristIdForm) {
            touristIdForm.addEventListener('submit', (e) => this.generateTouristId(e));
        }
        
        // SOS modal actions
        const cancelSos = document.getElementById('cancel-sos');
        const callEmergency = document.getElementById('call-emergency');
        if (cancelSos) {
            cancelSos.addEventListener('click', (e) => {
                e.preventDefault();
                this.cancelSOS();
            });
        }
        if (callEmergency) {
            callEmergency.addEventListener('click', (e) => {
                e.preventDefault();
                this.callEmergency();
            });
        }
        
        // AI settings sliders
        const speedThreshold = document.getElementById('speed-threshold');
        const inactivityThreshold = document.getElementById('inactivity-threshold');
        const deviationThreshold = document.getElementById('deviation-threshold');
        
        if (speedThreshold) {
            speedThreshold.addEventListener('input', (e) => this.updateThreshold('speed', e.target.value));
        }
        if (inactivityThreshold) {
            inactivityThreshold.addEventListener('input', (e) => this.updateThreshold('inactivity', e.target.value));
        }
        if (deviationThreshold) {
            deviationThreshold.addEventListener('input', (e) => this.updateThreshold('deviation', e.target.value));
        }
        
        console.log('Event listeners setup complete');
    }

    handleLoginDirect() {
        const usernameField = document.getElementById('username');
        const passwordField = document.getElementById('password');
        
        if (!usernameField || !passwordField) {
            console.error('Login form fields not found');
            this.showNotification('Login form error', 'error');
            return;
        }
        
        const username = usernameField.value.trim();
        const password = passwordField.value.trim();
        
        this.performLogin(username, password);
    }

    handleLogin(e) {
        e.preventDefault();
        console.log('Handling login...');
        
        const usernameField = document.getElementById('username');
        const passwordField = document.getElementById('password');
        
        if (!usernameField || !passwordField) {
            console.error('Login form fields not found');
            this.showNotification('Login form error', 'error');
            return;
        }
        
        const username = usernameField.value.trim();
        const password = passwordField.value.trim();
        
        console.log('Login attempt:', { username, password: '***' });
        
        this.performLogin(username, password);
    }

    performLogin(username, password) {
        console.log('Performing login validation...');
        
        // Show loading state
        const submitBtn = document.querySelector('#login-form button[type="submit"]');
        const originalText = submitBtn ? submitBtn.textContent : '';
        if (submitBtn) {
            submitBtn.textContent = 'Logging in...';
            submitBtn.disabled = true;
        }
        
        // Simulate network delay
        setTimeout(() => {
            console.log('Checking credentials...');
            
            if (username === this.sampleData.credentials.username && password === this.sampleData.credentials.password) {
                console.log('Login successful');
                this.currentUser = { username };
                
                // Hide login section and show header
                const loginSection = document.getElementById('login-section');
                const header = document.getElementById('header');
                
                if (loginSection) {
                    loginSection.classList.remove('active');
                    loginSection.style.display = 'none';
                    console.log('Login section hidden');
                }
                if (header) {
                    header.style.display = 'block';
                    console.log('Header shown');
                }
                
                // Show dashboard
                this.showSection('dashboard-section');
                this.navigate('dashboard');
                this.showNotification('Login successful! Welcome to JatayuNetra', 'success');
                
                // Clear form
                document.getElementById('username').value = '';
                document.getElementById('password').value = '';
            } else {
                console.log('Login failed');
                this.showNotification('Invalid credentials. Use admin/admin123', 'error');
            }
            
            // Reset button state
            if (submitBtn) {
                submitBtn.textContent = originalText || 'Login';
                submitBtn.disabled = false;
            }
        }, 800);
    }

    logout() {
        console.log('Logging out...');
        this.currentUser = null;
        
        const header = document.getElementById('header');
        const loginSection = document.getElementById('login-section');
        
        if (header) {
            header.style.display = 'none';
        }
        if (loginSection) {
            loginSection.style.display = 'flex';
            loginSection.classList.add('active');
        }
        
        this.showSection('login-section');
        this.showNotification('Logged out successfully', 'info');
    }

    navigate(section) {
        console.log('Navigating to:', section);
        
        // Update active nav button
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.querySelector(`[data-section="${section}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
        
        // Show section
        this.showSection(`${section}-section`);
        
        // Initialize section-specific functionality
        setTimeout(() => {
            switch(section) {
                case 'dashboard':
                    this.initializeDashboard();
                    break;
                case 'tourist-id':
                    this.initializeTouristId();
                    break;
                case 'geo-fencing':
                    this.initializeGeoFencing();
                    break;
                case 'ai-monitoring':
                    this.initializeAiMonitoring();
                    break;
                case 'services':
                    this.initializeServices();
                    break;
            }
        }, 100);
    }

    showSection(sectionId) {
        console.log('Showing section:', sectionId);
        
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        } else {
            console.error('Section not found:', sectionId);
        }
    }

    // Theme management
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-color-scheme', this.currentTheme);
        
        const themeBtn = document.getElementById('theme-toggle');
        if (themeBtn) {
            themeBtn.textContent = this.currentTheme === 'light' ? '🌙' : '☀️';
        }
        
        localStorage.setItem('theme', this.currentTheme);
        this.showNotification(`Switched to ${this.currentTheme} mode`, 'info');
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.currentTheme = savedTheme;
        document.documentElement.setAttribute('data-color-scheme', savedTheme);
        
        const themeBtn = document.getElementById('theme-toggle');
        if (themeBtn) {
            themeBtn.textContent = savedTheme === 'light' ? '🌙' : '☀️';
        }
    }

    // Language management
    changeLanguage(lang) {
        this.currentLanguage = lang;
        this.updateTranslations();
        localStorage.setItem('language', lang);
        
        const langNames = {
            'en': 'English',
            'hi': 'हिंदी',
            'ta': 'தமிழ்',
            'bn': 'বাংলা'
        };
        
        this.showNotification(`Language changed to ${langNames[lang] || lang}`, 'info');
    }

    loadLanguage() {
        const savedLang = localStorage.getItem('language') || 'en';
        this.currentLanguage = savedLang;
        
        const langSelect = document.getElementById('language-selector');
        if (langSelect) {
            langSelect.value = savedLang;
        }
        
        this.updateTranslations();
    }

    updateTranslations() {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.translations[this.currentLanguage]?.[key] || this.translations.en[key] || key;
            
            if (element.tagName === 'INPUT' && element.type === 'submit') {
                element.value = translation;
            } else if (element.tagName === 'BUTTON') {
                // Preserve emoji/icons at the start
                const currentText = element.textContent;
                const emojiMatch = currentText.match(/^[\u{1F300}-\u{1F9FF}][\s]*|^[🚨📞🦅]/u);
                const emoji = emojiMatch ? emojiMatch[0] : '';
                element.textContent = emoji + translation;
            } else {
                element.textContent = translation;
            }
        });
    }

    checkAuthentication() {
        if (!this.currentUser) {
            const loginSection = document.getElementById('login-section');
            if (loginSection) {
                loginSection.style.display = 'flex';
                loginSection.classList.add('active');
            }
        }
    }

    // Location tracking
    startLocationTracking() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.currentLocation = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy
                    };
                    this.updateLocationDisplay();
                    this.updateNearbyServices();
                },
                () => {
                    // Simulate location for demo
                    this.currentLocation = {
                        latitude: 18.1124,
                        longitude: 83.3956,
                        accuracy: 10
                    };
                    this.updateLocationDisplay();
                    this.updateNearbyServices();
                }
            );
        } else {
            // Fallback location
            this.currentLocation = {
                latitude: 18.1124,
                longitude: 83.3956,
                accuracy: 10
            };
            this.updateLocationDisplay();
        }
        
        // Update location every 30 seconds
        setInterval(() => {
            this.simulateLocationUpdate();
        }, 30000);
    }

    updateLocationDisplay() {
        const locationElement = document.getElementById('current-location');
        if (locationElement && this.currentLocation) {
            locationElement.textContent = `📍 Lat: ${this.currentLocation.latitude.toFixed(4)}, Lng: ${this.currentLocation.longitude.toFixed(4)}`;
        }
    }

    simulateLocationUpdate() {
        if (this.currentLocation) {
            // Simulate small location changes
            this.currentLocation.latitude += (Math.random() - 0.5) * 0.001;
            this.currentLocation.longitude += (Math.random() - 0.5) * 0.001;
            this.updateLocationDisplay();
        }
    }

    // Dashboard initialization
    initializeDashboard() {
        console.log('Initializing dashboard...');
        this.createMonitoringChart();
        this.updateServiceRecommendations();
        this.updateActivityFeed();
        this.updateStats();
    }

    createMonitoringChart() {
        const ctx = document.getElementById('monitoring-chart');
        if (!ctx) return;

        if (this.monitoringChart) {
            this.monitoringChart.destroy();
        }

        const data = {
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
            datasets: [
                {
                    label: 'Active Tourists',
                    data: [120, 95, 180, 247, 210, 165],
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    fill: true
                },
                {
                    label: 'Safety Incidents',
                    data: [2, 1, 0, 3, 1, 0],
                    borderColor: '#B4413C',
                    backgroundColor: 'rgba(180, 65, 60, 0.1)',
                    fill: true
                }
            ]
        };

        this.monitoringChart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        position: 'top'
                    }
                }
            }
        });
    }

    updateServiceRecommendations() {
        const container = document.getElementById('service-recommendations');
        if (!container) return;

        const allServices = [
            ...this.sampleData.nearbyServices.medical.slice(0, 2),
            ...this.sampleData.nearbyServices.police.slice(0, 1),
            ...this.sampleData.nearbyServices.others.slice(0, 1)
        ];

        container.innerHTML = allServices.map(service => `
            <div class="service-item">
                <div class="service-info">
                    <h4>${service.name}</h4>
                    <p>${service.type} • ${service.distance}</p>
                </div>
                <div class="service-actions">
                    <button class="btn btn--sm btn--outline" onclick="app.callService('${service.phone}')">📞</button>
                    <button class="btn btn--sm btn--primary" onclick="app.navigateToService('${service.name}')">📍</button>
                </div>
            </div>
        `).join('');
    }

    updateActivityFeed() {
        const container = document.getElementById('activity-feed');
        if (!container) return;

        container.innerHTML = this.sampleData.activities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon">${activity.icon}</div>
                <div class="activity-content">
                    <h4>${activity.title}</h4>
                    <p>${activity.description}</p>
                </div>
                <div class="activity-time">${activity.time}</div>
            </div>
        `).join('');
    }

    updateStats() {
        // Simulate real-time stat updates
        const stats = {
            tourists: Math.floor(Math.random() * 50) + 200,
            alerts: Math.floor(Math.random() * 5),
            safetyScore: Math.floor(Math.random() * 10) + 85,
            secureZones: 15
        };

        const totalTouristsEl = document.getElementById('total-tourists');
        const activeAlertsEl = document.getElementById('active-alerts');
        const safetyScoreEl = document.getElementById('safety-score');
        const secureZonesEl = document.getElementById('secure-zones');

        if (totalTouristsEl) totalTouristsEl.textContent = stats.tourists;
        if (activeAlertsEl) activeAlertsEl.textContent = stats.alerts;
        if (safetyScoreEl) safetyScoreEl.textContent = stats.safetyScore + '%';
        if (secureZonesEl) secureZonesEl.textContent = stats.secureZones;
    }

    // Tourist ID Generation
    initializeTouristId() {
        // Reset form and preview
        const form = document.getElementById('tourist-id-form');
        if (form) form.reset();
        
        const preview = document.getElementById('generated-id');
        if (preview) preview.style.display = 'none';
    }

    generateTouristId(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('tourist-name')?.value || '',
            age: document.getElementById('tourist-age')?.value || '',
            nationality: document.getElementById('tourist-nationality')?.value || '',
            idType: document.getElementById('id-type')?.value || '',
            idNumber: document.getElementById('id-number')?.value || '',
            tripDuration: document.getElementById('trip-duration')?.value || '',
            travelPurpose: document.getElementById('travel-purpose')?.value || '',
            emergencyContact: document.getElementById('emergency-contact')?.value || ''
        };

        // Generate unique ID
        const touristId = `TJ${new Date().getFullYear()}${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;
        
        // Calculate validity date
        const validityDate = new Date();
        validityDate.setDate(validityDate.getDate() + parseInt(formData.tripDuration || '7'));

        // Update preview
        const previewName = document.getElementById('preview-name');
        const previewId = document.getElementById('preview-id');
        const previewValidity = document.getElementById('preview-validity');
        
        if (previewName) previewName.textContent = formData.name;
        if (previewId) previewId.textContent = touristId;
        if (previewValidity) previewValidity.textContent = validityDate.toLocaleDateString();

        // Show preview with animation
        const preview = document.getElementById('generated-id');
        if (preview) {
            preview.style.display = 'block';
            preview.classList.add('success-animation');
            
            // Remove animation class after animation completes
            setTimeout(() => {
                preview.classList.remove('success-animation');
            }, 600);
        }

        this.showNotification('Digital Tourist ID generated successfully!', 'success');
        
        // Store in localStorage for demo purposes
        const touristData = { ...formData, id: touristId, validityDate: validityDate.toISOString() };
        localStorage.setItem('currentTouristId', JSON.stringify(touristData));
    }

    // Geo-fencing
    initializeGeoFencing() {
        this.updateZoneAlerts();
    }

    updateZoneAlerts() {
        // Simulate zone entry/exit alerts
        setTimeout(() => {
            if (Math.random() > 0.7) {
                this.showNotification('⚠️ Approaching restricted zone', 'warning');
            }
        }, 3000);
    }

    // AI Monitoring
    initializeAiMonitoring() {
        this.createAnomalyChart();
        this.updateAnomalyAlerts();
        this.initializeThresholds();
    }

    createAnomalyChart() {
        const ctx = document.getElementById('anomaly-chart');
        if (!ctx) return;

        if (this.anomalyChart) {
            this.anomalyChart.destroy();
        }

        const data = {
            labels: ['Speed Drop', 'Route Deviation', 'Inactivity', 'Signal Loss'],
            datasets: [{
                label: 'Detection Count',
                data: [12, 8, 15, 3],
                backgroundColor: ['#FFC185', '#B4413C', '#5D878F', '#D2BA4C']
            }]
        };

        this.anomalyChart = new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    updateAnomalyAlerts() {
        const container = document.getElementById('anomaly-alerts');
        if (!container) return;

        const alerts = [
            { type: 'Speed Drop', description: 'Tourist ID #TJ2024005 - Sudden speed decrease', critical: false },
            { type: 'Route Deviation', description: 'Tourist ID #TJ2024012 - Off planned route', critical: true },
            { type: 'Inactivity', description: 'Tourist ID #TJ2024008 - No movement for 15 min', critical: false }
        ];

        container.innerHTML = alerts.map(alert => `
            <div class="anomaly-alert ${alert.critical ? 'critical' : ''}">
                <h4>${alert.type}</h4>
                <p>${alert.description}</p>
            </div>
        `).join('');
    }

    initializeThresholds() {
        // Initialize threshold display values
        this.updateThreshold('speed', 30);
        this.updateThreshold('inactivity', 300);
        this.updateThreshold('deviation', 500);
    }

    updateThreshold(type, value) {
        const displayMap = {
            'speed': { element: 'speed-value', suffix: ' km/h' },
            'inactivity': { element: 'inactivity-value', suffix: ' min', transform: (v) => Math.floor(v / 60) },
            'deviation': { element: 'deviation-value', suffix: 'm' }
        };

        const config = displayMap[type];
        if (config) {
            const displayValue = config.transform ? config.transform(value) : value;
            const element = document.getElementById(config.element);
            if (element) {
                element.textContent = displayValue + config.suffix;
            }
        }
    }

    // Services
    initializeServices() {
        this.populateServices();
    }

    populateServices() {
        this.populateServiceCategory('medical-services', this.sampleData.nearbyServices.medical);
        this.populateServiceCategory('police-services', this.sampleData.nearbyServices.police);
        this.populateServiceCategory('other-services', this.sampleData.nearbyServices.others);
    }

    populateServiceCategory(containerId, services) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = services.map(service => `
            <div class="service-card">
                <div class="service-header">
                    <div>
                        <h4>${service.name}</h4>
                        <p>${service.type}</p>
                    </div>
                    <span class="service-distance">${service.distance}</span>
                </div>
                <div class="service-details">
                    <p>Available 24/7 • Emergency services</p>
                </div>
                <div class="service-actions">
                    <button class="btn btn--outline" onclick="app.callService('${service.phone}')">📞 Call</button>
                    <button class="btn btn--primary" onclick="app.navigateToService('${service.name}')">📍 Navigate</button>
                </div>
            </div>
        `).join('');
    }

    callService(phone) {
        this.showNotification(`Calling ${phone}...`, 'info');
        // In a real app, this would initiate a phone call
    }

    navigateToService(serviceName) {
        this.showNotification(`Opening navigation to ${serviceName}...`, 'info');
        // In a real app, this would open maps/navigation
    }

    // SOS System
    activateSOS() {
        this.sosActive = true;
        const modal = document.getElementById('sos-modal');
        if (modal) {
            modal.classList.remove('hidden');
        }
        
        this.startSOSCountdown();
        this.showNotification('🚨 SOS ACTIVATED - Emergency services notified!', 'error');
        
        // Simulate emergency protocol
        this.executeEmergencyProtocol();
    }

    cancelSOS() {
        this.sosActive = false;
        const modal = document.getElementById('sos-modal');
        if (modal) {
            modal.classList.add('hidden');
        }
        this.showNotification('SOS cancelled', 'info');
    }

    callEmergency() {
        this.showNotification('Calling emergency services...', 'info');
        // In a real app, this would dial emergency number
    }

    startSOSCountdown() {
        let timeLeft = 300; // 5 minutes
        const countdown = document.getElementById('response-countdown');
        
        const timer = setInterval(() => {
            if (!this.sosActive) {
                clearInterval(timer);
                return;
            }
            
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            if (countdown) {
                countdown.textContent = `${minutes}:${String(seconds).padStart(2, '0')}`;
            }
            
            timeLeft--;
            if (timeLeft < 0) {
                clearInterval(timer);
                if (countdown) {
                    countdown.textContent = 'Help should arrive soon!';
                }
            }
        }, 1000);
    }

    executeEmergencyProtocol() {
        // Simulate automated emergency response
        setTimeout(() => {
            if (this.sosActive) {
                this.showNotification('📍 Location shared with emergency services', 'info');
            }
        }, 2000);
        
        setTimeout(() => {
            if (this.sosActive) {
                this.showNotification('📞 Emergency contacts notified', 'info');
            }
        }, 4000);
        
        setTimeout(() => {
            if (this.sosActive) {
                this.showNotification('🚔 Nearest police unit dispatched', 'info');
            }
        }, 6000);
    }

    // Real-time updates
    startRealTimeUpdates() {
        // Update dashboard stats every 30 seconds
        setInterval(() => {
            const dashboardSection = document.getElementById('dashboard-section');
            if (dashboardSection && dashboardSection.classList.contains('active')) {
                this.updateStats();
            }
        }, 30000);

        // Simulate random alerts
        setInterval(() => {
            if (Math.random() > 0.8) {
                this.generateRandomAlert();
            }
        }, 45000);
    }

    generateRandomAlert() {
        const alerts = [
            '🔍 AI detected unusual behavior pattern',
            '📍 Tourist entered caution zone',
            '✅ Emergency drill completed successfully',
            '📊 Safety score updated',
            '🚨 False alarm resolved'
        ];
        
        const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
        this.showNotification(randomAlert, 'info');
    }

    // Utility functions
    updateNearbyServices() {
        // This would normally fetch real nearby services based on location
        // For demo, we'll use the sample data
        if (this.currentUser) {
            this.updateServiceRecommendations();
        }
    }

    showNotification(message, type = 'info') {
        console.log('Notification:', message, type);
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 16px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        `;
        
        // Set background color based on type
        const colors = {
            success: '#22c55e',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6'
        };
        notification.style.backgroundColor = colors[type] || colors.info;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Add CSS animation if not already present
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Remove notification after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }
}

// Initialize the application when DOM is ready
let app;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        app = new JatayuNetra();
        window.app = app;
    });
} else {
    app = new JatayuNetra();
    window.app = app;
}

console.log('JatayuNetra script loaded');