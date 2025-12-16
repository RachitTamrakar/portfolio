// Project data - single source of truth for all project cards
const PROJECTS = {
    visionSystem: {
        id: 'vision-system',
        title: 'Multi-Station Vision Inspection System',
        organization: 'Bosch Australia',
        timeframe: '2024-Present',
        impact: 'Built production system for $8M line with 40+ cameras achieving sub-second cycle times',
        tags: ['C#/.NET', 'HALCON', 'ProfiNet', 'SQL'],
        image: 'images/vision_system.png',
        imageAlt: 'Vision System',
        link: 'vision-inspection-system.html',
        tier: 'flagship',
        categories: ['featured', 'industrial']
    },
    
    solarisMk2: {
        id: 'solaris-mk2',
        title: 'Solaris Mk II Hybrid Engine & Ground Station',
        organization: 'Monash HPR',
        timeframe: '2023-2025',
        impact: 'Won Jim Furfaro Award at IREC 2025 for 4kN hybrid rocket engine with custom ground station',
        tags: ['Python', 'STM32', 'MQTT', 'Award Winner'],
        image: 'images/zenith_launch.png',
        imageAlt: 'Project Zenith Launch',
        link: 'solaris-mk-ii.html',
        tier: 'flagship',
        categories: ['featured', 'rocketry']
    },
    
    fruitRobot: {
        id: 'fruit-robot',
        title: 'Fruit Navigation & Mapping Robot',
        organization: 'Monash University',
        timeframe: '2024',
        impact: 'Autonomous robot using YOLO detection, EKF SLAM, and ray-casting navigation in unknown environments',
        tags: ['Python', 'YOLO', 'EKF SLAM', 'OpenCV'],
        image: null,
        placeholder: 'Robot',
        link: 'autonomous-fruit-robot.html',
        tier: 'flagship',
        categories: ['featured', 'robotics']
    },
    
    yoloDetection: {
        id: 'yolo-detection',
        title: 'Real-Time YOLO Object Detection',
        organization: 'Bosch Australia',
        timeframe: '2024',
        impact: 'High-reliability vision system for surgical-grade product detection with automated ML pipeline cutting training time 2×',
        tags: ['Python', 'PyTorch', 'YOLO', 'OpenCV'],
        image: 'images/water_bottle_yolo.png',
        imageAlt: 'YOLO Detection',
        tier: 'featured',
        categories: ['industrial']
    },
    
    digitalTwin: {
        id: 'digital-twin',
        title: 'Digital Twin Simulation',
        organization: 'Bosch Australia',
        timeframe: '2024',
        impact: 'Physics-based palletizer simulation reducing development time by ~50%',
        tags: ['Siemens NX', 'Python', 'Excel VBA'],
        image: null,
        placeholder: 'Sim',
        tier: 'featured',
        categories: ['industrial']
    },
    
    imageStitching: {
        id: 'image-stitching',
        title: 'Novel Image Stitching Algorithm',
        organization: 'Bosch Australia',
        timeframe: '2024',
        impact: 'Proprietary solution replacing commercial software with improved performance and cost savings',
        tags: ['C#', 'Computer Vision', 'Image Processing'],
        image: null,
        placeholder: 'CV',
        tier: 'featured',
        categories: ['industrial']
    },
    
    arcPyro: {
        id: 'arc-pyro',
        title: 'Arc-Pyro High Voltage Ignitor',
        organization: 'Monash HPR',
        timeframe: '2024',
        impact: '14 kV ignition system with comprehensive safety interlocks for ABS pyrolysis',
        tags: ['High Voltage', 'Electrical Safety', 'CAD'],
        image: 'images/arc_pyro_bench.png',
        imageAlt: 'Arc-Pyro Ignitor',
        link: 'arc-pyro-ignitor.html',
        tier: 'featured',
        categories: ['rocketry']
    },
    
    solarisMk3: {
        id: 'solaris-mk3',
        title: 'Solaris Mk III Support',
        organization: 'Monash HPR',
        timeframe: '2024-2025',
        impact: '12 kN LOX-Paraffin engine for Race2Space UK competition',
        tags: ['LOX', 'Hybrid Propulsion', 'Testing'],
        image: 'images/solaris_showcase.png',
        imageAlt: 'Solaris Mk III',
        link: 'solaris-mk-iii.html',
        tier: 'featured',
        categories: ['rocketry']
    },
    
    fillStation: {
        id: 'fill-station',
        title: 'Hobby-Grade Hybrid Engine Fill Station',
        organization: 'Monash HPR / Design Methods',
        timeframe: '2023',
        impact: 'Low-cost N₂O fill station with LoRa wireless remote operation and safety monitoring',
        tags: ['Fluid Systems', 'LoRa', 'Arduino'],
        image: 'images/hobby_fill_station.png',
        imageAlt: 'Fill Station',
        tier: 'supporting',
        categories: ['rocketry']
    },
    
    chameleonLogger: {
        id: 'chameleon-logger',
        title: 'Arduino Flight Data Logger',
        organization: 'Monash HPR',
        timeframe: '2023',
        impact: '1 kHz data logger successfully flown to 1,200 ft on Chameleon rocket',
        tags: ['Arduino', 'Embedded C', 'Data Logging'],
        image: 'images/chamelion_launch.png',
        imageAlt: 'Chameleon Flight',
        tier: 'supporting',
        categories: ['rocketry']
    },
    
    robotCompetitions: {
        id: 'robot-competitions',
        title: 'Robot Building Competitions',
        organization: 'Monash University',
        timeframe: '2023-2025',
        impact: '3 years of podium finishes: 1st place (2025), 3rd place (2024), 2nd place (2023) in 100+ participant field',
        tags: ['Arduino', 'Motor Control', 'Rapid Prototyping'],
        image: null,
        placeholder: 'Robot',
        tier: 'supporting',
        categories: ['robotics']
    },
    
    terminalAI: {
        id: 'terminal-ai',
        title: 'Terminal APAC Competition',
        organization: 'Terminal (Citadel)',
        timeframe: '2023',
        impact: '5th of 33 teams in AI tower defense strategy challenge',
        tags: ['Python', 'Algorithms', 'Real-time Systems'],
        image: null,
        placeholder: 'AI',
        tier: 'supporting',
        categories: ['robotics']
    }
};

// Category metadata
const CATEGORIES = {
    featured: {
        title: 'Featured Work',
        showOnIndex: true
    },
    industrial: {
        title: 'Industrial Automation & Computer Vision',
        altBg: true
    },
    rocketry: {
        title: 'Rocketry Projects',
        altBg: false
    },
    robotics: {
        title: 'Robotics & Automation',
        altBg: true
    }
};
