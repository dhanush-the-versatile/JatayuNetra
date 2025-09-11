// Smart Tourist Safety System - Utility Functions
// Northeast India - Supporting Functions and Helpers

// ===== UTILITY CONSTANTS =====
const EMERGENCY_NUMBERS = {
    police: '100',
    medical: '102',
    fire: '101',
    tourist: '1363',
    disaster: '108',
    women: '1091',
    child: '1098'
};

const NORTHEAST_STATES_DATA = {
    arunachal: {
        name: 'Arunachal Pradesh',
        capital: 'Itanagar',
        code: 'AR',
        requiresPermit: true,
        emergencyNumbers: {
            police: '+91-360-2212100',
            tourism: '+91-360-2244475',
            disaster: '+91-360-2244355'
        },
        languages: ['English', 'Hindi', 'Local Dialects'],
        climate: 'Subtropical to Alpine',
        bestTime: 'October to April'
    },
    assam: {
        name: 'Assam',
        capital: 'Guwahati',
        code: 'AS',
        requiresPermit: false,
        emergencyNumbers: {
            police: '+91-361-2237728',
            tourism: '+91-361-2230925',
            disaster: '+91-361-2233316'
        },
        languages: ['Assamese', 'Bengali', 'Hindi', 'English'],
        climate: 'Subtropical',
        bestTime: 'October to March'
    },
    manipur: {
        name: 'Manipur',
        capital: 'Imphal',
        code: 'MN',
        requiresPermit: true,
        emergencyNumbers: {
            police: '+91-385-2414977',
            tourism: '+91-385-2414630',
            disaster: '+91-385-2451070'
        },
        languages: ['Manipuri', 'English', 'Hindi'],
        climate: 'Temperate',
        bestTime: 'October to March'
    },
    meghalaya: {
        name: 'Meghalaya',
        capital: 'Shillong',
        code: 'ML',
        requiresPermit: false,
        emergencyNumbers: {
            police: '+91-364-2226618',
            tourism: '+91-364-2223960',
            disaster: '+91-364-2501664'
        },
        languages: ['Khasi', 'Garo', 'English', 'Hindi'],
        climate: 'Temperate',
        bestTime: 'October to June'
    },
    mizoram: {
        name: 'Mizoram',
        capital: 'Aizawl',
        code: 'MZ',
        requiresPermit: true,
        emergencyNumbers: {
            police: '+91-389-2322560',
            tourism: '+91-389-2322647',
            disaster: '+91-389-2318070'
        },
        languages: ['Mizo', 'English', 'Hindi'],
        climate: 'Temperate',
        bestTime: 'October to March'
    },
    nagaland: {
        name: 'Nagaland',
        capital: 'Kohima',
        code: 'NL',
        requiresPermit: true,
        emergencyNumbers: {
            police: '+91-370-2290241',
            tourism: '+91-370-2290214',
            disaster: '+91-370-2290998'
        },
        languages: ['English', 'Nagamese', 'Hindi'],
        climate: 'Temperate',
        bestTime: 'October to May'
    },
    sikkim: {
        name: 'Sikkim',
        capital: 'Gangtok',
        code: 'SK',
        requiresPermit: true,
        emergencyNumbers: {
            police: '+91-3592-280688',
            tourism: '+91-3592-221634',
            rescue: '+91-3592-202843'
        },
        languages: ['Nepali', 'English', 'Hindi', 'Sikkimese'],
        climate: 'Temperate to Alpine',
        bestTime: 'March to June, September to November'
    },
    tripura: {
        name: 'Tripura',
        capital: 'Agartala',
        code: 'TR',
        requiresPermit: false,
        emergencyNumbers: {
            police: '+91-381-2324571',
            tourism: '+91-381-2325960',
            disaster: '+91-381-2322592'
        },
        languages: ['Bengali', 'Tripuri', 'English', 'Hindi'],
        climate: 'Tropical',
        bestTime: 'October to March'
    }
};

const LANGUAGE_TRANSLATIONS = {
    emergency: {
        en: 'Emergency',
        hi: 'आपातकाल',
        as: 'জৰুৰীকালীন',
        bn: 'জরুরি',
        mni: 'ꯏꯟꯊꯪ',
        kha: 'Ka jingïaid'
    },
    help: {
        en: 'Help',
        hi: 'मदद',
        as: 'সহায়',
        bn: 'সাহায্য',
        mni: 'ꯃꯇꯦꯡ',
        kha: 'Jingshai'
    },
    location: {
        en: 'Location',
        hi: 'स्थान',
        as: 'স্থান',
        bn: 'স্থান',
        mni: 'ꯃꯐꯝ',
        kha: 'Ka sthan'
    },
    safe: {
        en: 'Safe',
        hi: 'सुरक्षित',
        as: 'নিৰাপদ',
        bn: 'নিরাপদ',
        mni: 'ꯅꯤꯡꯊꯤꯖꯅꯥ',
        kha: 'Ka khlam'
    }
};

// ===== GEOLOCATION UTILITIES =====
class LocationTracker {
    constructor() {
        this.watchId = null;
        this.currentPosition = null;
        this.accuracy = null;
        this.isTracking = false;
    }

    startTracking(options = {}) {
        if (!navigator.geolocation) {
            throw new Error('Geolocation is not supported by this browser');
        }

        const defaultOptions = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 60000
        };

        const settings = { ...defaultOptions, ...options };

        this.isTracking = true;
        this.watchId = navigator.geolocation.watchPosition(
            (position) => this.handlePosition(position),
            (error) => this.handleError(error),
            settings
        );

        console.log('📍 Location tracking started');
        return this.watchId;
    }

    stopTracking() {
        if (this.watchId !== null) {
            navigator.geolocation.clearWatch(this.watchId);
            this.watchId = null;
            this.isTracking = false;
            console.log('📍 Location tracking stopped');
        }
    }

    handlePosition(position) {
        this.currentPosition = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            altitude: position.coords.altitude,
            heading: position.coords.heading,
            speed: position.coords.speed,
            timestamp: position.timestamp
        };
        
        this.accuracy = position.coords.accuracy;

        // Trigger location update event
        this.onLocationUpdate(this.currentPosition);
    }

    handleError(error) {
        let errorMessage = 'Unknown location error';
        
        switch (error.code) {
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

        console.error('📍 Location error:', errorMessage);
        this.onLocationError(error);
    }

    getCurrentPosition() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation not supported'));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.handlePosition(position);
                    resolve(this.currentPosition);
                },
                (error) => {
                    this.handleError(error);
                    reject(error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 30000
                }
            );
        });
    }

    onLocationUpdate(position) {
        // Override this method to handle location updates
        console.log('📍 Location updated:', position);
    }

    onLocationError(error) {
        // Override this method to handle location errors
        console.error('📍 Location error:', error);
    }

    formatCoordinates(decimals = 4) {
        if (!this.currentPosition) return null;
        
        return {
            lat: this.currentPosition.latitude.toFixed(decimals),
            lng: this.currentPosition.longitude.toFixed(decimals),
            formatted: `${this.currentPosition.latitude.toFixed(decimals)}°N, ${this.currentPosition.longitude.toFixed(decimals)}°E`
        };
    }

    calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radius of Earth in kilometers
        const dLat = this.toRadians(lat2 - lat1);
        const dLon = this.toRadians(lon2 - lon1);
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c; // Distance in kilometers
    }

    toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }
}

// ===== EMERGENCY UTILITIES =====
class EmergencyManager {
    constructor() {
        this.emergencyContacts = [];
        this.emergencyProfile = null;
        this.isEmergencyActive = false;
        this.emergencyId = null;
    }

    setEmergencyProfile(profile) {
        this.emergencyProfile = {
            name: profile.name,
            age: profile.age,
            bloodGroup: profile.bloodGroup,
            medicalConditions: profile.medicalConditions || [],
            allergies: profile.allergies || [],
            medications: profile.medications || [],
            digitalId: profile.digitalId,
            nationality: profile.nationality,
            languages: profile.languages || ['English']
        };
        
        this.saveToStorage();
        console.log('🏥 Emergency profile updated');
    }

    addEmergencyContact(contact) {
        const emergencyContact = {
            id: Date.now().toString(),
            name: contact.name,
            relationship: contact.relationship,
            phone: contact.phone,
            email: contact.email || null,
            priority: contact.priority || 'secondary',
            verified: contact.verified || false,
            location: contact.location || null
        };

        this.emergencyContacts.push(emergencyContact);
        this.saveToStorage();
        console.log('📞 Emergency contact added:', emergencyContact.name);
        return emergencyContact.id;
    }

    removeEmergencyContact(contactId) {
        this.emergencyContacts = this.emergencyContacts.filter(
            contact => contact.id !== contactId
        );
        this.saveToStorage();
        console.log('📞 Emergency contact removed');
    }

    activateEmergency(type = 'general', location = null) {
        this.isEmergencyActive = true;
        this.emergencyId = 'EMG-' + Date.now().toString().substr(-8);
        
        const emergencyData = {
            id: this.emergencyId,
            type: type,
            timestamp: new Date().toISOString(),
            location: location,
            profile: this.emergencyProfile,
            contacts: this.emergencyContacts.filter(c => c.priority === 'primary'),
            status: 'active'
        };

        // Simulate emergency activation
        this.notifyEmergencyServices(emergencyData);
        this.notifyEmergencyContacts(emergencyData);
        
        console.log('🚨 Emergency activated:', this.emergencyId);
        return this.emergencyId;
    }

    deactivateEmergency(reason = 'resolved') {
        if (this.isEmergencyActive) {
            this.isEmergencyActive = false;
            const emergencyId = this.emergencyId;
            this.emergencyId = null;
            
            console.log('✅ Emergency deactivated:', emergencyId, '- Reason:', reason);
            return true;
        }
        return false;
    }

    notifyEmergencyServices(emergencyData) {
        // Simulate notification to emergency services
        console.log('🚨 Notifying emergency services:', emergencyData);
        
        // In a real implementation, this would:
        // 1. Send data to emergency dispatch system
        // 2. Provide location coordinates
        // 3. Share medical profile
        // 4. Establish communication channel
    }

    notifyEmergencyContacts(emergencyData) {
        // Simulate notification to emergency contacts
        const priorityContacts = this.emergencyContacts
            .filter(contact => contact.priority === 'primary')
            .slice(0, 3); // Notify top 3 priority contacts

        priorityContacts.forEach(contact => {
            console.log(`📱 Notifying emergency contact: ${contact.name} (${contact.phone})`);
            // In a real implementation, this would send SMS/call/email
        });
    }

    generateEmergencyMessage(location = null) {
        const coords = location ? `${location.latitude}, ${location.longitude}` : 'Location unavailable';
        
        return `🚨 EMERGENCY ALERT

Tourist: ${this.emergencyProfile?.name || 'Unknown'}
Digital ID: ${this.emergencyProfile?.digitalId || 'N/A'}
Emergency ID: ${this.emergencyId}

Status: EMERGENCY - Immediate assistance required
Location: ${coords}
Time: ${new Date().toLocaleString()}

Medical Info:
- Blood Group: ${this.emergencyProfile?.bloodGroup || 'Unknown'}
- Allergies: ${this.emergencyProfile?.allergies?.join(', ') || 'None listed'}
- Medical Conditions: ${this.emergencyProfile?.medicalConditions?.join(', ') || 'None listed'}

This is an automated emergency alert from Smart Tourist Safety System.
Emergency services have been notified.

Do not reply to this automated message.`;
    }

    saveToStorage() {
        try {
            localStorage.setItem('emergencyProfile', JSON.stringify(this.emergencyProfile));
            localStorage.setItem('emergencyContacts', JSON.stringify(this.emergencyContacts));
        } catch (error) {
            console.error('Failed to save emergency data:', error);
        }
    }

    loadFromStorage() {
        try {
            const profile = localStorage.getItem('emergencyProfile');
            const contacts = localStorage.getItem('emergencyContacts');
            
            if (profile) {
                this.emergencyProfile = JSON.parse(profile);
            }
            
            if (contacts) {
                this.emergencyContacts = JSON.parse(contacts);
            }
        } catch (error) {
            console.error('Failed to load emergency data:', error);
        }
    }
}

// ===== AI MONITORING UTILITIES =====
class AIMonitor {
    constructor() {
        this.behaviorPattern = 'normal';
        this.anomalies = [];
        this.confidence = 95;
        this.isActive = true;
        this.travelType = 'cultural';
        this.riskLevel = 'low';
    }

    analyzeBehavior(locationData, timeData, activityData) {
        // Simulate AI behavior analysis
        const analysis = {
            pattern: this.determineBehaviorPattern(locationData, activityData),
            confidence: this.calculateConfidence(locationData, timeData),
            anomalies: this.detectAnomalies(locationData, timeData, activityData),
            riskLevel: this.assessRisk(locationData, activityData),
            recommendations: this.generateRecommendations(locationData, activityData)
        };

        this.updateInternalState(analysis);
        return analysis;
    }

    determineBehaviorPattern(locationData, activityData) {
        // Simulate pattern recognition
        if (activityData?.includes('temple') || activityData?.includes('museum')) {
            return 'cultural_tourism';
        } else if (activityData?.includes('trek') || activityData?.includes('adventure')) {
            return 'adventure_tourism';
        } else if (locationData?.speed > 50) {
            return 'rapid_transit';
        }
        return 'normal_tourism';
    }

    calculateConfidence(locationData, timeData) {
        let confidence = 95;
        
        if (locationData?.accuracy > 50) confidence -= 10;
        if (!timeData?.withinNormalHours) confidence -= 5;
        
        return Math.max(confidence, 70);
    }

    detectAnomalies(locationData, timeData, activityData) {
        const anomalies = [];
        
        // Check for unusual timing
        if (timeData?.hour < 5 || timeData?.hour > 23) {
            anomalies.push({
                type: 'unusual_hours',
                severity: 'medium',
                description: 'Activity detected during unusual hours'
            });
        }

        // Check for rapid location changes
        if (locationData?.speed > 100) {
            anomalies.push({
                type: 'rapid_movement',
                severity: 'high',
                description: 'Unusually rapid movement detected'
            });
        }

        // Check for staying in one place too long
        if (locationData?.stationaryDuration > 8) {
            anomalies.push({
                type: 'prolonged_stationary',
                severity: 'medium',
                description: 'No movement detected for extended period'
            });
        }

        return anomalies;
    }

    assessRisk(locationData, activityData) {
        let risk = 0;
        
        if (locationData?.isRestrictedArea) risk += 30;
        if (locationData?.weatherAlert) risk += 20;
        if (activityData?.isDangerous) risk += 25;
        if (!locationData?.hasNetworkCoverage) risk += 15;
        
        if (risk < 20) return 'low';
        if (risk < 50) return 'medium';
        return 'high';
    }

    generateRecommendations(locationData, activityData) {
        const recommendations = [];
        
        if (locationData?.weatherAlert) {
            recommendations.push('Weather alert active - consider indoor activities');
        }
        
        if (!locationData?.hasNetworkCoverage) {
            recommendations.push('Limited network coverage - inform contacts of location');
        }
        
        if (locationData?.isRestrictedArea) {
            recommendations.push('Entering restricted area - ensure proper permits');
        }

        return recommendations;
    }

    updateInternalState(analysis) {
        this.behaviorPattern = analysis.pattern;
        this.confidence = analysis.confidence;
        this.anomalies = analysis.anomalies;
        this.riskLevel = analysis.riskLevel;
    }

    getStatus() {
        return {
            isActive: this.isActive,
            pattern: this.behaviorPattern,
            confidence: this.confidence,
            anomaliesCount: this.anomalies.length,
            riskLevel: this.riskLevel,
            lastUpdate: new Date().toISOString()
        };
    }
}

// ===== BLOCKCHAIN UTILITIES =====
class BlockchainIdentity {
    constructor() {
        this.blockNumber = null;
        this.transactionHash = null;
        this.verified = false;
        this.digitalId = null;
    }

    createDigitalIdentity(userData) {
        // Simulate blockchain identity creation
        const timestamp = Date.now();
        const randomHash = this.generateHash(userData, timestamp);
        
        this.digitalId = userData.digitalId;
        this.blockNumber = Math.floor(Math.random() * 1000000) + 2800000;
        this.transactionHash = randomHash;
        this.verified = true;

        const identityData = {
            digitalId: this.digitalId,
            blockNumber: this.blockNumber,
            transactionHash: this.transactionHash,
            verified: this.verified,
            createdAt: new Date(timestamp).toISOString(),
            userData: {
                name: userData.name,
                nationality: userData.nationality,
                documentHash: this.hashDocument(userData.document)
            }
        };

        this.saveToStorage(identityData);
        console.log('🔗 Blockchain identity created:', this.digitalId);
        return identityData;
    }

    verifyIdentity(digitalId) {
        // Simulate blockchain verification
        const stored = this.loadFromStorage();
        
        if (stored && stored.digitalId === digitalId && stored.verified) {
            console.log('✅ Blockchain identity verified:', digitalId);
            return {
                verified: true,
                blockNumber: stored.blockNumber,
                transactionHash: stored.transactionHash,
                createdAt: stored.createdAt
            };
        }

        console.log('❌ Blockchain identity verification failed:', digitalId);
        return { verified: false };
    }

    generateHash(data, timestamp) {
        const input = JSON.stringify(data) + timestamp;
        let hash = 0;
        
        for (let i = 0; i < input.length; i++) {
            const char = input.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        
        const hexHash = Math.abs(hash).toString(16);
        return '0x' + hexHash.padStart(8, '0') + '...' + hexHash.substr(-4);
    }

    hashDocument(document) {
        // Simulate document hashing
        return this.generateHash(document, Date.now());
    }

    saveToStorage(identityData) {
        try {
            localStorage.setItem('blockchainIdentity', JSON.stringify(identityData));
        } catch (error) {
            console.error('Failed to save blockchain identity:', error);
        }
    }

    loadFromStorage() {
        try {
            const data = localStorage.getItem('blockchainIdentity');
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Failed to load blockchain identity:', error);
            return null;
        }
    }
}

// ===== GEO-FENCING UTILITIES =====
class GeofenceManager {
    constructor() {
        this.geofences = [];
        this.activeAlerts = [];
        this.checkInterval = null;
    }

    addGeofence(geofence) {
        const fence = {
            id: geofence.id || Date.now().toString(),
            name: geofence.name,
            type: geofence.type || 'safe', // 'safe', 'restricted', 'warning'
            center: geofence.center, // { lat, lng }
            radius: geofence.radius, // in meters
            state: geofence.state,
            requiresPermit: geofence.requiresPermit || false,
            active: true,
            createdAt: new Date().toISOString()
        };

        this.geofences.push(fence);
        console.log('🗺️ Geofence added:', fence.name);
        return fence.id;
    }

    removeGeofence(fenceId) {
        this.geofences = this.geofences.filter(fence => fence.id !== fenceId);
        console.log('🗺️ Geofence removed:', fenceId);
    }

    checkPosition(currentLocation) {
        if (!currentLocation) return [];

        const alerts = [];
        const { latitude, longitude } = currentLocation;

        this.geofences.forEach(fence => {
            if (!fence.active) return;

            const distance = this.calculateDistance(
                latitude, longitude,
                fence.center.lat, fence.center.lng
            );

            const isInside = distance <= fence.radius;
            const wasInside = this.wasInside(fence.id);

            // Check for entry/exit
            if (isInside && !wasInside) {
                alerts.push({
                    type: 'entry',
                    fence: fence,
                    distance: distance,
                    message: this.getEntryMessage(fence)
                });
            } else if (!isInside && wasInside) {
                alerts.push({
                    type: 'exit',
                    fence: fence,
                    distance: distance,
                    message: this.getExitMessage(fence)
                });
            }

            // Update inside status
            this.updateInsideStatus(fence.id, isInside);
        });

        if (alerts.length > 0) {
            this.processAlerts(alerts);
        }

        return alerts;
    }

    getEntryMessage(fence) {
        switch (fence.type) {
            case 'restricted':
                return `⚠️ Entering restricted area: ${fence.name}. ${fence.requiresPermit ? 'Valid permit required.' : ''}`;
            case 'warning':
                return `🚨 Caution: Entering ${fence.name}. Exercise extra safety measures.`;
            case 'safe':
                return `✅ Entering safe zone: ${fence.name}`;
            default:
                return `📍 Entering: ${fence.name}`;
        }
    }

    getExitMessage(fence) {
        switch (fence.type) {
            case 'safe':
                return `🚨 Leaving safe zone: ${fence.name}. Stay alert.`;
            case 'restricted':
                return `✅ Exiting restricted area: ${fence.name}`;
            default:
                return `📍 Exiting: ${fence.name}`;
        }
    }

    calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371000; // Radius of Earth in meters
        const dLat = this.toRadians(lat2 - lat1);
        const dLon = this.toRadians(lon2 - lon1);
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }

    toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    wasInside(fenceId) {
        const key = `geofence_inside_${fenceId}`;
        return localStorage.getItem(key) === 'true';
    }

    updateInsideStatus(fenceId, isInside) {
        const key = `geofence_inside_${fenceId}`;
        localStorage.setItem(key, isInside.toString());
    }

    processAlerts(alerts) {
        alerts.forEach(alert => {
            console.log('🗺️ Geofence alert:', alert.message);
            this.activeAlerts.push({
                ...alert,
                timestamp: new Date().toISOString()
            });
        });

        // Trigger alert notifications
        this.notifyAlerts(alerts);
    }

    notifyAlerts(alerts) {
        // This would trigger UI notifications
        alerts.forEach(alert => {
            if (typeof showToast === 'function') {
                const type = alert.fence.type === 'restricted' ? 'warning' : 'info';
                showToast(alert.message, type);
            }
        });
    }

    initializeNortheastGeofences() {
        // Add geofences for all Northeast Indian states
        Object.values(NORTHEAST_STATES_DATA).forEach(state => {
            // This would be loaded from a comprehensive database
            // For demo purposes, adding sample geofences
            if (state.code === 'AS') {
                this.addGeofence({
                    name: `${state.name} - Guwahati Safe Zone`,
                    type: 'safe',
                    center: { lat: 26.1445, lng: 91.7362 },
                    radius: 10000, // 10km
                    state: state.code,
                    requiresPermit: false
                });
            }
        });
    }
}

// ===== IOT DEVICE UTILITIES =====
class IoTDeviceManager {
    constructor() {
        this.devices = [];
        this.connectionStatus = {};
    }

    registerDevice(device) {
        const iotDevice = {
            id: device.id || Date.now().toString(),
            name: device.name,
            type: device.type, // 'wearable', 'beacon', 'sensor'
            model: device.model,
            batteryLevel: device.batteryLevel || 100,
            connected: false,
            lastSeen: null,
            location: device.location || null,
            data: {},
            capabilities: device.capabilities || []
        };

        this.devices.push(iotDevice);
        console.log('⌚ IoT device registered:', iotDevice.name);
        return iotDevice.id;
    }

    connectDevice(deviceId) {
        const device = this.devices.find(d => d.id === deviceId);
        if (device) {
            device.connected = true;
            device.lastSeen = new Date().toISOString();
            this.connectionStatus[deviceId] = 'connected';
            console.log('⌚ IoT device connected:', device.name);
            return true;
        }
        return false;
    }

    disconnectDevice(deviceId) {
        const device = this.devices.find(d => d.id === deviceId);
        if (device) {
            device.connected = false;
            this.connectionStatus[deviceId] = 'disconnected';
            console.log('⌚ IoT device disconnected:', device.name);
            return true;
        }
        return false;
    }

    updateDeviceData(deviceId, data) {
        const device = this.devices.find(d => d.id === deviceId);
        if (device && device.connected) {
            device.data = { ...device.data, ...data };
            device.lastSeen = new Date().toISOString();
            
            if (data.batteryLevel !== undefined) {
                device.batteryLevel = data.batteryLevel;
            }

            // Check for alerts
            this.checkDeviceAlerts(device);
            return true;
        }
        return false;
    }

    checkDeviceAlerts(device) {
        // Battery level alerts
        if (device.batteryLevel < 20 && device.batteryLevel >= 10) {
            console.log(`🔋 Low battery warning: ${device.name} (${device.batteryLevel}%)`);
        } else if (device.batteryLevel < 10) {
            console.log(`🔋 Critical battery: ${device.name} (${device.batteryLevel}%)`);
        }

        // Health alerts for wearables
        if (device.type === 'wearable' && device.data.heartRate) {
            if (device.data.heartRate > 120 || device.data.heartRate < 50) {
                console.log(`💓 Heart rate alert: ${device.name} (${device.data.heartRate} bpm)`);
            }
        }

        // Movement alerts for beacons
        if (device.type === 'beacon' && device.data.movement === false) {
            const lastMovement = new Date(device.data.lastMovement);
            const now = new Date();
            const hoursSinceMovement = (now - lastMovement) / (1000 * 60 * 60);
            
            if (hoursSinceMovement > 4) {
                console.log(`⚠️ No movement detected: ${device.name} (${hoursSinceMovement.toFixed(1)}h)`);
            }
        }
    }

    getDeviceStatus() {
        return this.devices.map(device => ({
            id: device.id,
            name: device.name,
            type: device.type,
            connected: device.connected,
            batteryLevel: device.batteryLevel,
            signalStrength: this.getSignalStrength(device),
            lastSeen: device.lastSeen,
            status: this.getDeviceHealthStatus(device)
        }));
    }

    getSignalStrength(device) {
        if (!device.connected) return 0;
        
        // Simulate signal strength based on last seen time
        const lastSeen = new Date(device.lastSeen);
        const now = new Date();
        const minutesSinceContact = (now - lastSeen) / (1000 * 60);
        
        if (minutesSinceContact < 1) return 4; // Excellent
        if (minutesSinceContact < 5) return 3; // Good
        if (minutesSinceContact < 15) return 2; // Fair
        if (minutesSinceContact < 30) return 1; // Poor
        return 0; // No signal
    }

    getDeviceHealthStatus(device) {
        if (!device.connected) return 'disconnected';
        if (device.batteryLevel < 10) return 'critical';
        if (device.batteryLevel < 20) return 'warning';
        
        const signalStrength = this.getSignalStrength(device);
        if (signalStrength === 0) return 'no_signal';
        if (signalStrength <= 2) return 'weak_signal';
        
        return 'healthy';
    }

    simulateDeviceData() {
        // Simulate data from connected devices
        this.devices.forEach(device => {
            if (!device.connected) return;

            const data = {};

            if (device.type === 'wearable') {
                data.heartRate = 70 + Math.floor(Math.random() * 20);
                data.steps = Math.floor(Math.random() * 1000) + 5000;
                data.temperature = 36.5 + (Math.random() * 2 - 1);
            } else if (device.type === 'beacon') {
                data.movement = Math.random() > 0.1; // 90% chance of movement
                data.altitude = 100 + Math.floor(Math.random() * 50);
            } else if (device.type === 'sensor') {
                data.temperature = 25 + (Math.random() * 10 - 5);
                data.humidity = 60 + Math.floor(Math.random() * 30);
                data.pressure = 1013 + Math.floor(Math.random() * 20 - 10);
            }

            // Simulate battery drain
            if (Math.random() < 0.1) {
                device.batteryLevel = Math.max(0, device.batteryLevel - 1);
            }

            this.updateDeviceData(device.id, data);
        });
    }
}

// ===== SYSTEM UTILITIES =====
function formatDigitalId(state, year, sequence) {
    const stateCode = state.toUpperCase().substring(0, 2);
    return `TST-${stateCode}-${year}-${sequence.toString().padStart(6, '0')}`;
}

function validateDigitalId(digitalId) {
    const pattern = /^TST-[A-Z]{2}-\d{4}-\d{6}$/;
    return pattern.test(digitalId);
}

function formatPhoneNumber(phone, country = 'IN') {
    if (country === 'IN' && phone.startsWith('91')) {
        return `+91-${phone.substring(2, 7)}-${phone.substring(7)}`;
    }
    return phone;
}

function validatePhoneNumber(phone) {
    // Indian mobile number validation
    const pattern = /^(\+91[-\s]?)?[6-9]\d{9}$/;
    return pattern.test(phone.replace(/[-\s]/g, ''));
}

function formatEmergencyMessage(profile, location, emergencyId) {
    return `🚨 EMERGENCY ALERT

Tourist: ${profile.name}
Digital ID: ${profile.digitalId}
Emergency ID: ${emergencyId}

Status: EMERGENCY ASSISTANCE REQUIRED
Location: ${location.formatted || 'Location unavailable'}
Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

Medical Information:
- Blood Group: ${profile.bloodGroup || 'Not specified'}
- Allergies: ${profile.allergies?.join(', ') || 'None listed'}
- Medical Conditions: ${profile.medicalConditions?.join(', ') || 'None listed'}

This is an automated emergency alert from Smart Tourist Safety System.
Emergency services have been notified automatically.`;
}

function generateTouristReport(profile, tripData, safetyData) {
    return {
        reportId: `RPT-${Date.now()}`,
        generatedAt: new Date().toISOString(),
        tourist: {
            name: profile.name,
            digitalId: profile.digitalId,
            nationality: profile.nationality
        },
        tripSummary: {
            startDate: tripData.startDate,
            endDate: tripData.endDate,
            duration: tripData.duration,
            statesVisited: tripData.statesVisited,
            locationsVisited: tripData.locationsVisited,
            totalDistance: tripData.totalDistance
        },
        safetyMetrics: {
            overallScore: safetyData.overallScore,
            incidentCount: safetyData.incidentCount,
            riskEvents: safetyData.riskEvents,
            emergencyActivations: safetyData.emergencyActivations
        },
        systemPerformance: {
            gpsAccuracy: safetyData.gpsAccuracy,
            aiConfidence: safetyData.aiConfidence,
            deviceConnectivity: safetyData.deviceConnectivity,
            responseTime: safetyData.responseTime
        }
    };
}

// ===== EXPORT UTILITIES =====
if (typeof module !== 'undefined' && module.exports) {
    // Node.js environment
    module.exports = {
        LocationTracker,
        EmergencyManager,
        AIMonitor,
        BlockchainIdentity,
        GeofenceManager,
        IoTDeviceManager,
        EMERGENCY_NUMBERS,
        NORTHEAST_STATES_DATA,
        LANGUAGE_TRANSLATIONS,
        formatDigitalId,
        validateDigitalId,
        formatPhoneNumber,
        validatePhoneNumber,
        formatEmergencyMessage,
        generateTouristReport
    };
} else {
    // Browser environment - attach to window
    window.SmartTouristUtils = {
        LocationTracker,
        EmergencyManager,
        AIMonitor,
        BlockchainIdentity,
        GeofenceManager,
        IoTDeviceManager,
        EMERGENCY_NUMBERS,
        NORTHEAST_STATES_DATA,
        LANGUAGE_TRANSLATIONS,
        formatDigitalId,
        validateDigitalId,
        formatPhoneNumber,
        validatePhoneNumber,
        formatEmergencyMessage,
        generateTouristReport
    };
}

console.log('✅ Smart Tourist Safety System - Utilities Loaded Successfully');