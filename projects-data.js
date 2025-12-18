// Project data - single source of truth for all project cards
const PROJECTS = {
    visionSystem: {
        id: 'vision-system',
        title: 'Multi-Station Vision Inspection System',
        organization: 'Bosch Australia',
        timeframe: '2024-2025',
        impact: 'Architected and deployed production vision system for $8M line—managed 40+ cameras, 6 stations, 0.6s cycle time',
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
        impact: 'Avionics Vice Lead—owned test-critical ground station and propulsion controls for Jim Furfaro Award-winning 4kN hybrid engine',
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
        timeframe: '2025',
        impact: 'Autonomous robot using YOLO detection, EKF SLAM, and ray-casting navigation in unknown environments',
        tags: ['Python', 'YOLO', 'EKF SLAM', 'OpenCV'],
        image: 'images/rbc_2024_bot.png',
        imageAlt: 'Autonomous fruit robot',
        link: 'autonomous-fruit-robot.html',
        tier: 'flagship',
        categories: ['featured', 'robotics']
    },
    
    yoloDetection: {
        id: 'yolo-detection',
        title: 'Real-Time YOLO Object Detection',
        organization: 'Bosch Australia',
        timeframe: '2024',
        impact: 'Surgical-grade defect detection system with automated ML pipeline—cut model development time by 2×',
        tags: ['Python', 'PyTorch', 'YOLO', 'OpenCV'],
        image: 'images/water_bottle_yolo.png',
        imageAlt: 'YOLO Detection',
        tier: 'supporting',
        categories: ['industrial']
    },
    
    digitalTwin: {
        id: 'digital-twin',
        title: 'Digital Twin Simulation',
        organization: 'Bosch Australia',
        timeframe: '2024',
        impact: 'Physics-based palletizer simulation—enabled offline commissioning, cut development time 50%',
        tags: ['Siemens NX', 'Python', 'Excel VBA'],
        image: 'images/bams_simulation.png',
        imageAlt: 'Palletizer digital twin simulation',
        tier: 'supporting',
        categories: ['industrial']
    },
    
    heliumLOX: {
        id: 'helium-lox',
        title: 'Helium-Boosted LOX Feed System',
        organization: 'Monash HPR',
        timeframe: '2023-Present',
        impact: 'Contributing feed system design & testing support for 100,000 ft apogee target (Solaris Mk III)',
        tags: ['LOX', 'Feed Systems', 'Helium Pressurization'],
        image: null,
        placeholder: 'LOX',
        tier: 'supporting',
        categories: ['rocketry']
    },
    
    imageStitching: {
        id: 'image-stitching',
        title: 'Novel Image Stitching Algorithm',
        organization: 'Bosch Australia',
        timeframe: '2024',
        impact: 'Proprietary solution replacing commercial software with improved performance and cost savings',
        tags: ['C#', 'Computer Vision', 'Image Processing'],
        image: 'images/stitching_algo.png',
        imageAlt: 'Image stitching algorithm',
        tier: 'supporting',
        categories: ['industrial']
    },
    
    arcPyro: {
        id: 'arc-pyro',
        title: 'Arc-Pyro High Voltage Ignitor',
        organization: 'Monash HPR',
        timeframe: '2025',
        impact: '14 kV ignition system—designed safety interlocks, discharge circuits, and validation procedures',
        tags: ['High Voltage', 'Electrical Safety', 'CAD'],
        image: 'images/arc_pyro_bench.png',
        imageAlt: 'Arc-Pyro Ignitor',
        link: 'arc-pyro-ignitor.html',
        tier: 'notable',
        categories: ['rocketry']
    },
    
    solarisMk3: {
        id: 'solaris-mk3',
        title: 'Solaris Mk III Support',
        organization: 'Monash HPR',
        timeframe: '2025',
        impact: 'Contributing testing support for 12 kN LOX-Paraffin engine (Race2Space UK competition)',
        tags: ['LOX', 'Hybrid Propulsion', 'Testing'],
        image: 'images/solaris_showcase.png',
        imageAlt: 'Solaris Mk III',
        link: 'solaris-mk-iii.html',
        tier: 'notable',
        categories: ['rocketry']
    },
    
    fillStation: {
        id: 'fill-station',
        title: 'Hobby-Grade Hybrid Engine Fill Station',
        organization: 'Monash HPR / Design Methods',
        timeframe: '2025',
        impact: 'Low-cost N₂O fill station with LoRa wireless control and real-time pressure monitoring',
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
        image: 'images/intelligent_robotics_arena.png',
        imageAlt: 'Robotics competition arena',
        tier: 'supporting',
        categories: ['robotics']
    },
    
    terminalAI: {
        id: 'terminal-ai',
        title: 'Terminal APAC Competition',
        organization: 'Terminal (Citadel)',
        timeframe: '2023',
        impact: '5th out of 100+ participants in the Terminal APAC Regional Competition',
        tags: ['Python', 'Algorithms', 'Real-time Systems'],
        image: 'images/terminal.png',
        imageAlt: 'Terminal APAC competition',
        tier: 'supporting',
        categories: ['robotics']
    },
    
    avionicsAdvisor: {
        id: 'avionics-advisor',
        title: 'Avionics Advisor',
        organization: 'Monash HPR',
        timeframe: '2025-Present',
        impact: 'Architecture review, debug support, and test planning mentorship for next-generation avionics team',
        tags: ['Mentoring', 'Architecture', 'Reliability'],
        image: null,
        placeholder: 'Advisory',
        tier: 'supporting',
        categories: ['rocketry']
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
        title: 'Rocketry & Propulsion',
        altBg: false
    },
    robotics: {
        title: 'Robotics',
        altBg: true
    }
};
