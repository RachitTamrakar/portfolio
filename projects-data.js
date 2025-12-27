// Project data - single source of truth for all project cards
const PROJECTS = {
    visionSystem: {
        id: 'vision-system',
        title: 'High-Speed Inspection System',
        organization: 'Bosch Australia',
        timeframe: '2024-2025',
        impact: 'Built a multithreaded C#/.NET vision system for a <strong>~$8M</strong> manufacturing line, integrating <strong>40+ cameras</strong>, PLC handshakes, SQL logging, and an operator HMI.',
        tags: ['C#/.NET', 'HALCON', 'ProfiNet', 'SQL'],
        image: 'images/vision_system.png',
        imageAlt: 'Vision System',
        link: 'vision-inspection-system.html',
        tier: 'flagship',
        categories: ['featured', 'industrial']
    },
    
    solarisMk2: {
        id: 'solaris-mk2',
        title: 'Solaris Mk II & GSE Electronics',
        organization: 'Monash HPR',
        timeframe: '2023-2025',
        impact: 'Built and operated avionics and ground systems for a 4 kN hybrid engine, owning control software, ground electronics and test preparation for hot-fire campaigns.',
        tags: ['Python', 'STM32', 'MQTT', 'Award Winner'],
        image: 'images/solaris_showcase.png',
        imageAlt: 'Solaris Mk II Showcase',
        link: 'solaris-mk-ii.html',
        tier: 'flagship',
        categories: ['featured', 'rocketry']
    },

    irec2025: {
        id: 'irec-2025',
        title: 'IREC 2025: Project Zenith',
        organization: 'Monash HPR',
        timeframe: '2025',
        impact: 'Performed pad operations and technical presentation at IREC 2025 for Project Zenith, contributing to a successful flight and the Jim Furfaro Technical Excellence Award.', 
        tags: ['Launch Operations', 'Systems Integration', 'Test Readiness', 'Award Winner'],
        image: 'images/irec_pad_photo.png',
        imageAlt: 'IREC Pad Operations',
        link: 'irec-2025-zenith.html',
        tier: 'flagship',
        categories: ['featured', 'robotics']
    },
    
    fruitRobot: {
        id: 'fruit-robot',
        title: 'Autonomous Fruit Robot',
        organization: 'Monash University',
        timeframe: '2025',
        impact: 'Programmed autonomous mobile robot integrating YOLO perception, EKF SLAM, navigation and path planning to collect fruit autonomously.',
        tags: ['Python', 'YOLO', 'EKF SLAM', 'OpenCV'],
        image: 'images/penguin_pi.png',
        imageAlt: 'Autonomous fruit robot',
        link: 'autonomous-fruit-robot.html',
        tier: 'flagship',
        categories: ['robotics']
    },
    
    yoloDetection: {
        id: 'yolo-detection',
        title: 'Real-Time YOLO Detection',
        organization: 'Bosch Australia',
        timeframe: '2024',
        impact: 'Built a real-time YOLO detection pipeline for a live manufacturing line, using dataset automation and transfer learning to achieve <strong>2x faster development</strong> and <strong>1.5x faster inference</strong>.',
        tags: ['Python', 'PyTorch', 'YOLO', 'OpenCV'],
        image: 'images/water_bottle_yolo.png',
        imageAlt: 'YOLO Detection',
        tier: 'supporting',
        categories: ['industrial']
    },
    
    digitalTwin: {
        id: 'digital-twin',
        title: 'Robotic Palletizer Digital Twin',
        organization: 'Bosch Australia',
        timeframe: '2024',
        impact: 'Built a Siemens NX MCD digital twin with Python and Excel automation, enabling Software-In-The-Loop testing and reducing setup time by <strong>~50%</strong>',
        tags: ['Siemens NX', 'Python', 'Excel VBA'],
        image: 'images/bams_simulation.png',
        imageAlt: 'Palletizer digital twin simulation',
        tier: 'supporting',
        categories: ['industrial']
    },
    
    imageStitching: {
        id: 'image-stitching',
        title: 'Image Stitching Algorithm',
        organization: 'Bosch Australia',
        timeframe: '2024',
        impact: 'Replaced commercial vision software with a custom image-stitching algorithm, successfully stitching 100% of the test image set and eliminating contractor costs.',
        tags: ['C++', 'OpenCV', 'Computer Vision'],
        image: 'images/stitching_algo.png',
        imageAlt: 'Image stitching algorithm',
        tier: 'supporting',
        categories: ['industrial']
    },
    
    arcPyro: {
        id: 'arc-pyro',
        title: 'Arc-Pyro 14 kV Ignitor',
        organization: 'Monash HPR',
        timeframe: '2025',
        impact: 'Designed and tested a 14 kV arc-ignition system for hybrid rockets, including safety interlocks and documentation required for university safety approval.',
        tags: ['High Voltage', 'Electrical Safety', 'CAD'],
        image: 'images/arc_pyro_bench.png',
        imageAlt: 'Arc-Pyro Ignitor',
        link: 'arc-pyro-ignitor.html',
        tier: 'notable',
        categories: ['rocketry']
    },
    
    solarisMk3: {
        id: 'solaris-mk3',
        title: 'Solaris Mk III Hot-Fire Support',
        organization: 'Monash HPR',
        timeframe: '2023-2025',
        impact: 'Supported R2S competition hot-fire of a 10 kN LOX-paraffin hybrid engine, then worked on early LOX feed system architectures, P&IDs, and informal failure analyses.',
        tags: ['LOX', 'Testing', 'Feed Systems'],
        image: 'images/solaris_mk3_hotfire.png',
        imageAlt: 'Solaris Mk III',
        link: 'solaris-mk-iii.html',
        tier: 'notable',
        categories: ['rocketry']
    },
    
    fillStation: {
        id: 'fill-station',
        title: 'N₂O Fill Station',
        organization: 'Monash HPR / Design Methods',
        timeframe: '2025',
        impact: 'Developed a nitrous oxide fill station with remote valve control and real-time pressure monitoring to improve accessibility and safety for hobby-grade hybrid rockets.',
        tags: ['Fluid Systems', 'LoRa', 'Arduino'],
        image: 'images/hobby_fill_station.png',
        imageAlt: 'Fill Station',
        tier: 'supporting',
        categories: ['rocketry']
    },
    
    chameleonLogger: {
        id: 'chameleon-logger',
        title: 'L1 Flight Data Logger',
        organization: 'Monash HPR',
        timeframe: '2023',
        impact: 'Built a 1 kHz Arduino-based flight data logger capturing acceleration and altitude data, flown to approximately 1,200 ft.',
        tags: ['Arduino', 'Embedded C', 'Data Logging'],
        image: 'images/chamelion_launch.png',
        imageAlt: 'Chameleon Flight',
        tier: 'supporting',
        categories: ['rocketry']
    },
    
    robotCompetitions: {
        id: 'robot-competitions',
        title: 'Robotics Hackathons',
        organization: 'Monash University',
        timeframe: '2023-2025',
        impact: 'Achieved multiple podium finishes in 30+ team robotics competitions through rapid prototyping and efficient teamwork.',
        tags: ['Arduino', 'Motor Control', 'Rapid Prototyping'],
        image: 'images/rbc_2024_bot.png',
        imageAlt: 'Robotics competition arena',
        tier: 'supporting',
        categories: ['robotics']
    },
    
    terminalAI: {
        id: 'terminal-ai',
        title: 'Terminal APAC AI Challenge',
        organization: 'Terminal (Citadel)',
        timeframe: '2023',
        impact: 'Implemented real-time strategy logic as a solo entrant, placing top five out of 33 teams in the Terminal APAC AI competition.',
        tags: ['Python', 'Algorithms', 'Real-time Systems'],
        image: 'images/terminal.png',
        imageAlt: 'Terminal APAC competition',
        tier: 'supporting',
        categories: ['robotics']
    },
    
    // avionicsAdvisor: {
    //     id: 'avionics-advisor',
    //     title: 'Avionics Advisor',
    //     organization: 'Monash HPR',
    //     timeframe: '2025-Present',
    //     impact: 'Mentored avionics teams on system architecture, safety, and debugging during design, focusing on reliability and integration issues.',
    //     tags: ['Mentoring', 'Architecture', 'Reliability'],
    //     image: null,
    //     placeholder: 'Advisory',
    //     tier: 'supporting',
    //     categories: ['rocketry']
    // }
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
        altBg: true
    },
    robotics: {
        title: 'Robotics & Competitions',
        altBg: true
    }
};
