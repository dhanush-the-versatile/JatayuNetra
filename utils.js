// Smart Tourist Safety System - Utility Functions
// Northeast India - Supporting JavaScript Functions

// ===== UTILITY CONSTANTS ===== 
const UTILITY_CONSTANTS = {
    // Time constants
    MILLISECONDS_PER_SECOND: 1000,
    SECONDS_PER_MINUTE: 60,
    MINUTES_PER_HOUR: 60,
    HOURS_PER_DAY: 24,
    DAYS_PER_WEEK: 7,
    
    // Distance constants
    METERS_PER_KM: 1000,
    KM_PER_MILE: 1.60934,
    
    // Emergency thresholds
    MAX_RESPONSE_TIME: 300, // 5 minutes
    CRITICAL_BATTERY_LEVEL: 15, // 15%
    HIGH_SPEED_THRESHOLD: 100, // 100 km/h
    
    // Geolocation accuracy levels
    GPS_ACCURACY_HIGH: 10, // meters
    GPS_ACCURACY_MEDIUM: 50, // meters
    GPS_ACCURACY_LOW: 100, // meters
    
    // Storage keys
    STORAGE_KEYS: {
        USER_SESSION: 'smartTouristSession',
        PREFERENCES: 'userPreferences',
        EMERGENCY_CONTACTS: 'emergencyContacts',
        TRAVEL_HISTORY: 'travelHistory',
        SETTINGS: 'systemSettings'
    }
};

// ===== DATE AND TIME UTILITIES =====
const DateUtils = {
    /**
     * Get current timestamp in ISO format
     */
    getCurrentTimestamp() {
        return new Date().toISOString();
    },
    
    /**
     * Format date to readable string
     */
    formatDate(date, options = {}) {
        const defaultOptions = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            timeZone: 'Asia/Kolkata'
        };
        
        const formatOptions = { ...defaultOptions, ...options };
        return new Intl.DateTimeFormat('en-IN', formatOptions).format(new Date(date));
    },
    
    /**
     * Format time to readable string
     */
    formatTime(date, options = {}) {
        const defaultOptions = {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Asia/Kolkata',
            hour12: true
        };
        
        const formatOptions = { ...defaultOptions, ...options };
        return new Intl.DateTimeFormat('en-IN', formatOptions).format(new Date(date));
    },
    
    /**
     * Get time ago string (e.g., "2 minutes ago")
     */
    getTimeAgo(date) {
        const now = new Date();
        const then = new Date(date);
        const diffInSeconds = Math.floor((now - then) / UTILITY_CONSTANTS.MILLISECONDS_PER_SECOND);
        
        if (diffInSeconds < 60) {
            return diffInSeconds <= 1 ? 'just now' : `${diffInSeconds} seconds ago`;
        }
        
        const diffInMinutes = Math.floor(diffInSeconds / UTILITY_CONSTANTS.SECONDS_PER_MINUTE);
        if (diffInMinutes < 60) {
            return diffInMinutes === 1 ? '1 minute ago' : `${diffInMinutes} minutes ago`;
        }
        
        const diffInHours = Math.floor(diffInMinutes / UTILITY_CONSTANTS.MINUTES_PER_HOUR);
        if (diffInHours < 24) {
            return diffInHours === 1 ? '1 hour ago' : `${diffInHours} hours ago`;
        }
        
        const diffInDays = Math.floor(diffInHours / UTILITY_CONSTANTS.HOURS_PER_DAY);
        if (diffInDays < 7) {
            return diffInDays === 1 ? '1 day ago' : `${diffInDays} days ago`;
        }
        
        const diffInWeeks = Math.floor(diffInDays / UTILITY_CONSTANTS.DAYS_PER_WEEK);
        return diffInWeeks === 1 ? '1 week ago' : `${diffInWeeks} weeks ago`;
    },
    
    /**
     * Check if date is today
     */
    isToday(date) {
        const today = new Date();
        const checkDate = new Date(date);
        
        return today.toDateString() === checkDate.toDateString();
    },
    
    /**
     * Get days between two dates
     */
    getDaysBetween(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        return Math.ceil(diffTime / (UTILITY_CONSTANTS.MILLISECONDS_PER_SECOND * UTILITY_CONSTANTS.SECONDS_PER_MINUTE * UTILITY_CONSTANTS.MINUTES_PER_HOUR * UTILITY_CONSTANTS.HOURS_PER_DAY));
    }
};

// ===== LOCATION UTILITIES =====
const LocationUtils = {
    /**
     * Calculate distance between two coordinates using Haversine formula
     */
    calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Earth's radius in kilometers
        const dLat = this.toRad(lat2 - lat1);
        const dLon = this.toRad(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
                  Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    },
    
    /**
     * Convert degrees to radians
     */
    toRad(degrees) {
        return degrees * (Math.PI / 180);
    },
    
    /**
     * Format coordinates to display string
     */
    formatCoordinates(lat, lon, precision = 4) {
        const latDir = lat >= 0 ? 'N' : 'S';
        const lonDir = lon >= 0 ? 'E' : 'W';
        
        return `${Math.abs(lat).toFixed(precision)}° ${latDir}, ${Math.abs(lon).toFixed(precision)}° ${lonDir}`;
    },
    
    /**
     * Get accuracy level description
     */
    getAccuracyLevel(accuracy) {
        if (accuracy <= UTILITY_CONSTANTS.GPS_ACCURACY_HIGH) {
            return { level: 'high', description: `High (±${accuracy.toFixed(0)}m)`, color: '#10B981' };
        } else if (accuracy <= UTILITY_CONSTANTS.GPS_ACCURACY_MEDIUM) {
            return { level: 'medium', description: `Medium (±${accuracy.toFixed(0)}m)`, color: '#F59E0B' };
        } else {
            return { level: 'low', description: `Low (±${accuracy.toFixed(0)}m)`, color: '#EF4444' };
        }
    },
    
    /**
     * Validate coordinates
     */
    validateCoordinates(lat, lon) {
        return (
            typeof lat === 'number' && typeof lon === 'number' &&
            lat >= -90 && lat <= 90 &&
            lon >= -180 && lon <= 180 &&
            !isNaN(lat) && !isNaN(lon)
        );
    },
    
    /**
     * Get location bounds for Northeast India
     */
    getNortheastIndiaBounds() {
        return {
            north: 29.5,
            south: 21.5,
            east: 97.5,
            west: 87.5
        };
    },
    
    /**
     * Check if coordinates are within Northeast India
     */
    isInNortheastIndia(lat, lon) {
        const bounds = this.getNortheastIndiaBounds();
        return lat >= bounds.south && lat <= bounds.north && 
               lon >= bounds.west && lon <= bounds.east;
    }
};

// ===== VALIDATION UTILITIES =====
const ValidationUtils = {
    /**
     * Validate email address
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    
    /**
     * Validate Indian mobile number
     */
    isValidIndianMobile(mobile) {
        const mobileRegex = /^(\+91|91)?[6-9]\d{9}$/;
        return mobileRegex.test(mobile.replace(/\s|-/g, ''));
    },
    
    /**
     * Validate Aadhaar number format
     */
    isValidAadhaar(aadhaar) {
        const aadhaarRegex = /^\d{4}\s?\d{4}\s?\d{4}$/;
        return aadhaarRegex.test(aadhaar);
    },
    
    /**
     * Validate passport number format
     */
    isValidPassport(passport) {
        const passportRegex = /^[A-Z]{1,2}\d{6,8}$/;
        return passportRegex.test(passport.toUpperCase());
    },
    
    /**
     * Validate required fields
     */
    validateRequired(value) {
        return value !== null && value !== undefined && value.toString().trim() !== '';
    },
    
    /**
     * Validate form data
     */
    validateFormData(data, rules) {
        const errors = {};
        
        Object.keys(rules).forEach(field => {
            const rule = rules[field];
            const value = data[field];
            
            // Check required
            if (rule.required && !this.validateRequired(value)) {
                errors[field] = `${rule.label || field} is required`;
                return;
            }
            
            // Skip other validations if field is empty and not required
            if (!this.validateRequired(value)) {
                return;
            }
            
            // Check type-specific validations
            if (rule.type === 'email' && !this.isValidEmail(value)) {
                errors[field] = `${rule.label || field} must be a valid email address`;
            }
            
            if (rule.type === 'mobile' && !this.isValidIndianMobile(value)) {
                errors[field] = `${rule.label || field} must be a valid Indian mobile number`;
            }
            
            if (rule.type === 'aadhaar' && !this.isValidAadhaar(value)) {
                errors[field] = `${rule.label || field} must be a valid Aadhaar number`;
            }
            
            if (rule.type === 'passport' && !this.isValidPassport(value)) {
                errors[field] = `${rule.label || field} must be a valid passport number`;
            }
            
            // Check length constraints
            if (rule.minLength && value.toString().length < rule.minLength) {
                errors[field] = `${rule.label || field} must be at least ${rule.minLength} characters long`;
            }
            
            if (rule.maxLength && value.toString().length > rule.maxLength) {
                errors[field] = `${rule.label || field} must not exceed ${rule.maxLength} characters`;
            }
            
            // Check custom validation function
            if (rule.validator && typeof rule.validator === 'function') {
                const customError = rule.validator(value);
                if (customError) {
                    errors[field] = customError;
                }
            }
        });
        
        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }
};

// ===== STORAGE UTILITIES =====
const StorageUtils = {
    /**
     * Set item in localStorage with error handling
     */
    setItem(key, value) {
        try {
            const serializedValue = JSON.stringify(value);
            localStorage.setItem(key, serializedValue);
            return true;
        } catch (error) {
            console.error(`Error setting localStorage item ${key}:`, error);
            return false;
        }
    },
    
    /**
     * Get item from localStorage with error handling
     */
    getItem(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error(`Error getting localStorage item ${key}:`, error);
            return defaultValue;
        }
    },
    
    /**
     * Remove item from localStorage
     */
    removeItem(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error(`Error removing localStorage item ${key}:`, error);
            return false;
        }
    },
    
    /**
     * Clear all localStorage items
     */
    clear() {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Error clearing localStorage:', error);
            return false;
        }
    },
    
    /**
     * Get storage usage information
     */
    getStorageInfo() {
        try {
            const used = JSON.stringify(localStorage).length;
            const quota = 5 * 1024 * 1024; // Approximate 5MB limit
            
            return {
                used: used,
                usedFormatted: this.formatBytes(used),
                available: quota - used,
                availableFormatted: this.formatBytes(quota - used),
                quota: quota,
                quotaFormatted: this.formatBytes(quota),
                usagePercentage: ((used / quota) * 100).toFixed(2)
            };
        } catch (error) {
            console.error('Error getting storage info:', error);
            return null;
        }
    },
    
    /**
     * Format bytes to human readable format
     */
    formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
};

// ===== STRING UTILITIES =====
const StringUtils = {
    /**
     * Capitalize first letter of string
     */
    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    },
    
    /**
     * Convert string to title case
     */
    toTitleCase(str) {
        return str.toLowerCase().split(' ').map(word => this.capitalize(word)).join(' ');
    },
    
    /**
     * Truncate string with ellipsis
     */
    truncate(str, length = 50, suffix = '...') {
        if (str.length <= length) return str;
        return str.substring(0, length).trim() + suffix;
    },
    
    /**
     * Generate random string
     */
    generateRandomString(length = 8, includeNumbers = true, includeSymbols = false) {
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        
        if (includeNumbers) {
            chars += '0123456789';
        }
        
        if (includeSymbols) {
            chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
        }
        
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        return result;
    },
    
    /**
     * Format phone number for display
     */
    formatPhoneNumber(phone) {
        // Remove all non-digits
        const cleaned = phone.replace(/\D/g, '');
        
        // Handle Indian numbers
        if (cleaned.length === 10) {
            return `+91-${cleaned.substring(0, 5)}-${cleaned.substring(5)}`;
        } else if (cleaned.length === 12 && cleaned.startsWith('91')) {
            const number = cleaned.substring(2);
            return `+91-${number.substring(0, 5)}-${number.substring(5)}`;
        } else if (cleaned.length === 13 && cleaned.startsWith('91')) {
            const number = cleaned.substring(2);
            return `+91-${number.substring(0, 5)}-${number.substring(5)}`;
        }
        
        return phone; // Return original if format not recognized
    },
    
    /**
     * Sanitize string for display
     */
    sanitize(str) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            '/': '&#x2F;'
        };
        
        return str.replace(/[&<>"'/]/g, (s) => map[s]);
    },
    
    /**
     * Extract initials from name
     */
    getInitials(name) {
        return name
            .split(' ')
            .map(word => word.charAt(0).toUpperCase())
            .slice(0, 2)
            .join('');
    }
};

// ===== NUMBER UTILITIES =====
const NumberUtils = {
    /**
     * Format number to Indian numbering system
     */
    formatIndianNumber(num) {
        return num.toLocaleString('en-IN');
    },
    
    /**
     * Round number to specified decimal places
     */
    roundTo(num, decimals = 2) {
        return Math.round((num + Number.EPSILON) * Math.pow(10, decimals)) / Math.pow(10, decimals);
    },
    
    /**
     * Clamp number between min and max
     */
    clamp(num, min, max) {
        return Math.min(Math.max(num, min), max);
    },
    
    /**
     * Convert kilometers to miles
     */
    kmToMiles(km) {
        return km / UTILITY_CONSTANTS.KM_PER_MILE;
    },
    
    /**
     * Convert miles to kilometers
     */
    milesToKm(miles) {
        return miles * UTILITY_CONSTANTS.KM_PER_MILE;
    },
    
    /**
     * Format speed with appropriate unit
     */
    formatSpeed(speedKmh) {
        return `${this.roundTo(speedKmh)} km/h`;
    },
    
    /**
     * Format distance with appropriate unit
     */
    formatDistance(distanceKm) {
        if (distanceKm < 1) {
            return `${this.roundTo(distanceKm * UTILITY_CONSTANTS.METERS_PER_KM)} m`;
        }
        return `${this.roundTo(distanceKm)} km`;
    },
    
    /**
     * Generate random number between min and max
     */
    randomBetween(min, max) {
        return Math.random() * (max - min) + min;
    },
    
    /**
     * Check if number is in range
     */
    inRange(num, min, max) {
        return num >= min && num <= max;
    }
};

// ===== ARRAY UTILITIES =====
const ArrayUtils = {
    /**
     * Remove duplicates from array
     */
    unique(arr) {
        return [...new Set(arr)];
    },
    
    /**
     * Group array elements by key
     */
    groupBy(arr, key) {
        return arr.reduce((groups, item) => {
            const group = (groups[item[key]] || []);
            group.push(item);
            groups[item[key]] = group;
            return groups;
        }, {});
    },
    
    /**
     * Sort array by key
     */
    sortBy(arr, key, direction = 'asc') {
        return arr.sort((a, b) => {
            const aVal = a[key];
            const bVal = b[key];
            
            if (direction === 'desc') {
                return bVal > aVal ? 1 : -1;
            }
            return aVal > bVal ? 1 : -1;
        });
    },
    
    /**
     * Get random element from array
     */
    randomElement(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    },
    
    /**
     * Shuffle array
     */
    shuffle(arr) {
        const shuffled = [...arr];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    },
    
    /**
     * Chunk array into smaller arrays
     */
    chunk(arr, size) {
        const chunks = [];
        for (let i = 0; i < arr.length; i += size) {
            chunks.push(arr.slice(i, i + size));
        }
        return chunks;
    }
};

// ===== DEVICE UTILITIES =====
const DeviceUtils = {
    /**
     * Check if device is mobile
     */
    isMobile() {
        return /Mobi|Android/i.test(navigator.userAgent);
    },
    
    /**
     * Check if device is tablet
     */
    isTablet() {
        return /Tablet|iPad/i.test(navigator.userAgent);
    },
    
    /**
     * Check if device is desktop
     */
    isDesktop() {
        return !this.isMobile() && !this.isTablet();
    },
    
    /**
     * Get device type
     */
    getDeviceType() {
        if (this.isMobile()) return 'mobile';
        if (this.isTablet()) return 'tablet';
        return 'desktop';
    },
    
    /**
     * Check if device supports vibration
     */
    supportsVibration() {
        return 'vibrate' in navigator;
    },
    
    /**
     * Trigger device vibration
     */
    vibrate(pattern = [200]) {
        if (this.supportsVibration()) {
            navigator.vibrate(pattern);
            return true;
        }
        return false;
    },
    
    /**
     * Get battery info if available
     */
    async getBatteryInfo() {
        try {
            if ('getBattery' in navigator) {
                const battery = await navigator.getBattery();
                return {
                    level: Math.round(battery.level * 100),
                    charging: battery.charging,
                    chargingTime: battery.chargingTime,
                    dischargingTime: battery.dischargingTime
                };
            }
        } catch (error) {
            console.warn('Battery API not available:', error);
        }
        return null;
    },
    
    /**
     * Get network information
     */
    getNetworkInfo() {
        if ('connection' in navigator) {
            const connection = navigator.connection;
            return {
                effectiveType: connection.effectiveType,
                downlink: connection.downlink,
                rtt: connection.rtt,
                saveData: connection.saveData
            };
        }
        return null;
    },
    
    /**
     * Check if device is online
     */
    isOnline() {
        return navigator.onLine;
    }
};

// ===== EMERGENCY UTILITIES =====
const EmergencyUtils = {
    /**
     * Format emergency contact for display
     */
    formatEmergencyContact(contact) {
        return {
            ...contact,
            phoneFormatted: StringUtils.formatPhoneNumber(contact.phone),
            nameInitials: StringUtils.getInitials(contact.name),
            relationCapitalized: StringUtils.capitalize(contact.relation)
        };
    },
    
    /**
     * Get emergency contact by priority
     */
    getContactsByPriority(contacts) {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return contacts.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    },
    
    /**
     * Validate emergency contact data
     */
    validateEmergencyContact(contact) {
        const rules = {
            name: { required: true, label: 'Contact Name', minLength: 2 },
            phone: { required: true, label: 'Phone Number', type: 'mobile' },
            relation: { required: true, label: 'Relationship' },
            priority: { required: true, label: 'Priority' }
        };
        
        return ValidationUtils.validateFormData(contact, rules);
    },
    
    /**
     * Generate emergency message template
     */
    generateEmergencyMessage(touristData, location) {
        return `🚨 EMERGENCY ALERT 🚨
        
Tourist: ${touristData.name}
ID: ${touristData.digitalId}
Location: ${location.address || 'Unknown'}
Coordinates: ${LocationUtils.formatCoordinates(location.latitude, location.longitude)}
Time: ${DateUtils.formatDate(new Date())} ${DateUtils.formatTime(new Date())}

This is an automated emergency alert from Smart Tourist Safety System - Northeast India.

Emergency services have been notified.`;
    },
    
    /**
     * Calculate emergency response time estimate
     */
    calculateResponseTime(location, serviceType) {
        const baseResponseTimes = {
            police: 180, // 3 minutes
            medical: 300, // 5 minutes
            fire: 480, // 8 minutes
            tourism: 120 // 2 minutes
        };
        
        const baseTime = baseResponseTimes[serviceType] || 300;
        
        // Add variance based on location factors (simplified)
        const locationFactor = Math.random() * 60; // 0-60 seconds variance
        
        return Math.round(baseTime + locationFactor);
    }
};

// ===== SAFETY SCORE UTILITIES =====
const SafetyScoreUtils = {
    /**
     * Calculate safety score based on various factors
     */
    calculateSafetyScore(factors) {
        let score = 100; // Start with perfect score
        
        // Zone safety (0 to -40 points)
        const zonePenalties = {
            safe: 0,
            restricted: -15,
            high_risk: -30,
            border: -25
        };
        score += zonePenalties[factors.currentZone] || 0;
        
        // Route adherence (0 to -20 points)
        if (factors.routeDeviation > 5000) { // 5km
            score -= Math.min(20, Math.floor(factors.routeDeviation / 1000));
        }
        
        // Communication status (0 to -15 points)
        if (!factors.communicationActive) {
            score -= 15;
        }
        
        // Emergency contact availability (0 to -10 points)
        if (!factors.emergencyContactsVerified) {
            score -= 10;
        }
        
        // Travel pattern (0 to -10 points)
        if (factors.behaviorPattern === 'anomalous') {
            score -= 10;
        }
        
        // Weather conditions (0 to -5 points)
        if (factors.weatherRisk === 'high') {
            score -= 5;
        }
        
        // Ensure score is within 0-100 range
        return NumberUtils.clamp(score, 0, 100);
    },
    
    /**
     * Get safety score color
     */
    getSafetyScoreColor(score) {
        if (score >= 80) return '#10B981'; // Green
        if (score >= 60) return '#F59E0B'; // Yellow
        return '#EF4444'; // Red
    },
    
    /**
     * Get safety score description
     */
    getSafetyScoreDescription(score) {
        if (score >= 90) return 'Excellent - Very Safe';
        if (score >= 80) return 'Good - Generally Safe';
        if (score >= 70) return 'Fair - Some Caution Needed';
        if (score >= 60) return 'Poor - Exercise Caution';
        return 'Critical - High Risk';
    },
    
    /**
     * Get recommendations based on safety score
     */
    getSafetyRecommendations(score, factors) {
        const recommendations = [];
        
        if (score < 70) {
            recommendations.push('Consider staying in well-populated areas');
            recommendations.push('Keep emergency contacts readily available');
        }
        
        if (score < 60) {
            recommendations.push('Contact tourism police for escort services');
            recommendations.push('Share your location with family/friends frequently');
        }
        
        if (factors.weatherRisk === 'high') {
            recommendations.push('Monitor weather conditions closely');
            recommendations.push('Avoid outdoor activities during adverse weather');
        }
        
        if (factors.currentZone === 'restricted' || factors.currentZone === 'border') {
            recommendations.push('Ensure you have proper permits');
            recommendations.push('Travel only during daylight hours');
        }
        
        return recommendations;
    }
};

// ===== NOTIFICATION UTILITIES =====
const NotificationUtils = {
    /**
     * Check if notifications are supported
     */
    isSupported() {
        return 'Notification' in window;
    },
    
    /**
     * Request notification permission
     */
    async requestPermission() {
        if (!this.isSupported()) {
            return false;
        }
        
        const permission = await Notification.requestPermission();
        return permission === 'granted';
    },
    
    /**
     * Show notification
     */
    show(title, options = {}) {
        if (!this.isSupported() || Notification.permission !== 'granted') {
            console.warn('Notifications not supported or not permitted');
            return false;
        }
        
        const defaultOptions = {
            icon: '/icon-192.png',
            badge: '/badge-72.png',
            vibrate: [200, 100, 200],
            requireInteraction: false,
            silent: false
        };
        
        const notificationOptions = { ...defaultOptions, ...options };
        
        try {
            const notification = new Notification(title, notificationOptions);
            
            notification.onclick = () => {
                window.focus();
                notification.close();
            };
            
            return notification;
        } catch (error) {
            console.error('Error showing notification:', error);
            return false;
        }
    },
    
    /**
     * Show emergency notification
     */
    showEmergency(message) {
        return this.show('🚨 Emergency Alert', {
            body: message,
            icon: '/emergency-icon.png',
            vibrate: [200, 100, 200, 100, 200],
            requireInteraction: true,
            tag: 'emergency',
            actions: [
                { action: 'confirm', title: 'I am safe' },
                { action: 'help', title: 'Send help' }
            ]
        });
    }
};

// ===== EXPORT ALL UTILITIES =====
window.SmartTouristUtils = {
    DateUtils,
    LocationUtils,
    ValidationUtils,
    StorageUtils,
    StringUtils,
    NumberUtils,
    ArrayUtils,
    DeviceUtils,
    EmergencyUtils,
    SafetyScoreUtils,
    NotificationUtils,
    UTILITY_CONSTANTS
};

// ===== INITIALIZE UTILITIES =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Smart Tourist Safety Utilities Loaded');
    
    // Request notification permission on load
    if (NotificationUtils.isSupported()) {
        NotificationUtils.requestPermission().then(granted => {
            if (granted) {
                console.log('✅ Notification permission granted');
            } else {
                console.log('❌ Notification permission denied');
            }
        });
    }
});

console.log('✅ Smart Tourist Safety System - Utilities Module Loaded Successfully');