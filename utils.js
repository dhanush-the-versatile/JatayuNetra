// Shared Utility Functions for Smart Tourist Safety System
// SIH-2025 - Available to all team members

// Date and Time Utilities
const DateTimeUtils = {
    // Get current time in different formats
    getCurrentTime: function(format = '12hour') {
        const now = new Date();
        if (format === '24hour') {
            return now.toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit'
            });
        }
        return now.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    },

    // Format date for display
    formatDate: function(date, format = 'short') {
        const d = new Date(date);
        if (format === 'long') {
            return d.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
        return d.toLocaleDateString('en-US');
    },

    // Get timezone-aware greeting
    getTimeBasedGreeting: function() {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) return 'Good Morning';
        if (hour >= 12 && hour < 17) return 'Good Afternoon';
        if (hour >= 17 && hour < 21) return 'Good Evening';
        return 'Good Night';
    }
};

// Local Storage Utilities
const StorageUtils = {
    // Set item in localStorage with error handling
    setItem: function(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return false;
        }
    },

    // Get item from localStorage with error handling
    getItem: function(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return null;
        }
    },

    // Remove item from localStorage
    removeItem: function(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing from localStorage:', error);
            return false;
        }
    }
};

// Navigation Utilities
const NavigationUtils = {
    // Smooth navigation with transition
    navigateToPage: function(url, delay = 0) {
        if (delay > 0) {
            document.body.style.transition = 'opacity 0.3s ease';
            document.body.style.opacity = '0.8';
            setTimeout(() => {
                window.location.href = url;
            }, delay);
        } else {
            window.location.href = url;
        }
    },

    // Go back with fallback
    goBack: function(fallbackUrl = 'dashboard.html') {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = fallbackUrl;
        }
    }
};

// Form Validation Utilities
const ValidationUtils = {
    // Validate email format
    isValidEmail: function(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    // Validate phone number (basic)
    isValidPhone: function(phone) {
        const phoneRegex = /^[\+]?[1-9][\d\s\-\(\)]{7,}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    },

    // Check password strength
    getPasswordStrength: function(password) {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        return {
            score: strength,
            level: ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'][strength]
        };
    }
};

// Notification Utilities
const NotificationUtils = {
    // Show toast notification
    showToast: function(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <span>${message}</span>
            <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
        `;
        
        // Style the toast
        Object.assign(toast.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 24px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '9999',
            opacity: '0',
            transform: 'translateX(100%)',
            transition: 'all 0.3s ease',
            fontFamily: '"Times New Roman", Times, serif',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        });

        // Set background color based on type
        const colors = {
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FF9800',
            error: '#f44336'
        };
        toast.style.backgroundColor = colors[type] || colors.info;

        document.body.appendChild(toast);

        // Animate in
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(0)';
        }, 10);

        // Animate out and remove
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
};

// Device Detection Utilities
const DeviceUtils = {
    // Check if mobile device
    isMobile: function() {
        return window.innerWidth <= 768 || 
               /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },

    // Check if touch device
    isTouchDevice: function() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    },

    // Get device orientation
    getOrientation: function() {
        return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
    }
};

// Emergency Utilities (for SOS and emergency functions)
const EmergencyUtils = {
    // Format emergency contact number
    formatEmergencyNumber: function(number) {
        // Remove all non-digits
        const cleaned = number.replace(/\D/g, '');
        
        // Format based on length
        if (cleaned.length === 10) {
            return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
        }
        return number; // Return original if can't format
    },

    // Generate incident ID
    generateIncidentId: function() {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        return `INC-${timestamp}-${random}`;
    },

    // Get current location (simulation for demo)
    getCurrentLocation: function() {
        return new Promise((resolve) => {
            // Try to get actual location
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        resolve({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            accuracy: position.coords.accuracy,
                            address: 'Current Location'
                        });
                    },
                    () => {
                        // Fallback to demo coordinates if geolocation fails
                        resolve({
                            latitude: 28.6139,
                            longitude: 77.2090,
                            accuracy: 10,
                            address: 'New Delhi, India (Demo)'
                        });
                    }
                );
            } else {
                // Simulate GPS coordinates for demo
                resolve({
                    latitude: 28.6139,
                    longitude: 77.2090,
                    accuracy: 10,
                    address: 'New Delhi, India (Demo)'
                });
            }
        });
    }
};

// Animation Utilities
const AnimationUtils = {
    // Fade in element
    fadeIn: function(element, duration = 300) {
        element.style.opacity = '0';
        element.style.display = 'block';
        
        const fadeEffect = setInterval(() => {
            if (!element.style.opacity) {
                element.style.opacity = 0;
            }
            if (element.style.opacity < 1) {
                element.style.opacity = parseFloat(element.style.opacity) + 0.1;
            } else {
                clearInterval(fadeEffect);
            }
        }, duration / 10);
    },

    // Fade out element
    fadeOut: function(element, duration = 300) {
        const fadeEffect = setInterval(() => {
            if (!element.style.opacity) {
                element.style.opacity = 1;
            }
            if (element.style.opacity > 0) {
                element.style.opacity -= 0.1;
            } else {
                clearInterval(fadeEffect);
                element.style.display = 'none';
            }
        }, duration / 10);
    },

    // Slide in element
    slideIn: function(element, direction = 'left', duration = 300) {
        element.style.transition = `transform ${duration}ms ease`;
        element.style.transform = `translateX(${direction === 'left' ? '-' : ''}100%)`;
        element.style.display = 'block';
        
        setTimeout(() => {
            element.style.transform = 'translateX(0)';
        }, 10);
    }
};

// Data Processing Utilities
const DataUtils = {
    // Format currency
    formatCurrency: function(amount, currency = 'INR') {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: currency
        }).format(amount);
    },

    // Format distance
    formatDistance: function(distance) {
        if (distance < 1000) {
            return `${distance.toFixed(0)}m`;
        } else {
            return `${(distance / 1000).toFixed(1)}km`;
        }
    },

    // Calculate time ago
    timeAgo: function(date) {
        const now = new Date();
        const past = new Date(date);
        const diffTime = Math.abs(now - past);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
        return `${Math.ceil(diffDays / 30)} months ago`;
    },

    // Debounce function
    debounce: function(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    },

    // Throttle function
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// Audio Utilities
const AudioUtils = {
    // Play notification sound
    playNotificationSound: function() {
        // Create audio context for notification beep
        if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
            const audioContext = new (AudioContext || webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        }
    },

    // Play emergency sound
    playEmergencySound: function() {
        if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
            const audioContext = new (AudioContext || webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 1000;
            oscillator.type = 'square';
            
            gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
            
            // Create siren effect
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.linearRampToValueAtTime(1200, audioContext.currentTime + 0.5);
            oscillator.frequency.linearRampToValueAtTime(800, audioContext.currentTime + 1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 1);
        }
    }
};

// Performance Utilities
const PerformanceUtils = {
    // Measure execution time
    measureTime: function(func, label = 'Function') {
        const start = performance.now();
        const result = func();
        const end = performance.now();
        console.log(`${label} executed in ${(end - start).toFixed(2)} milliseconds`);
        return result;
    },

    // Check if element is in viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Lazy load images
    lazyLoadImages: function() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
};

// Security Utilities
const SecurityUtils = {
    // Sanitize HTML input
    sanitizeHTML: function(str) {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    },

    // Generate random ID
    generateId: function(length = 8) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    },

    // Basic XSS protection
    escapeHtml: function(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }
};

// Export utilities to global scope for team member access
window.Utils = {
    DateTime: DateTimeUtils,
    Storage: StorageUtils,
    Navigation: NavigationUtils,
    Validation: ValidationUtils,
    Notification: NotificationUtils,
    Device: DeviceUtils,
    Emergency: EmergencyUtils,
    Animation: AnimationUtils,
    Data: DataUtils,
    Audio: AudioUtils,
    Performance: PerformanceUtils,
    Security: SecurityUtils
};

// Shared constants
window.Constants = {
    EMERGENCY_NUMBERS: {
        POLICE: '100',
        FIRE: '101',
        AMBULANCE: '102',
        DISASTER: '108'
    },
    
    STATUS_TYPES: {
        ACTIVE: 'active',
        INACTIVE: 'inactive',
        PENDING: 'pending',
        COMPLETED: 'completed',
        CANCELLED: 'cancelled'
    },
    
    NOTIFICATION_TYPES: {
        INFO: 'info',
        SUCCESS: 'success',
        WARNING: 'warning',
        ERROR: 'error'
    },
    
    USER_ROLES: {
        ADMIN: 'admin',
        USER: 'user',
        EMERGENCY_RESPONDER: 'emergency_responder'
    }
};

// Initialize utilities on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Smart Tourist Safety System Utilities loaded successfully');
    
    // Initialize lazy loading if images with data-src exist
    if (document.querySelectorAll('img[data-src]').length > 0) {
        Utils.Performance.lazyLoadImages();
    }
    
    // Set up global error handling
    window.addEventListener('error', function(e) {
        console.error('Global JavaScript Error:', e.error);
        Utils.Notification.showToast('An unexpected error occurred. Please try again.', 'error');
    });
    
    // Set up unhandled promise rejection handling
    window.addEventListener('unhandledrejection', function(e) {
        console.error('Unhandled Promise Rejection:', e.reason);
        Utils.Notification.showToast('A system error occurred. Please refresh the page.', 'error');
    });
});

// Service Worker registration for offline capabilities
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('✅ Service Worker registered successfully:', registration);
        }).catch(function(error) {
            console.log('❌ Service Worker registration failed:', error);
        });
    });
}

// Export for modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Utils, Constants };
}

console.log('🔧 Utilities module loaded and ready');