export interface ProjectItem {
    id: number;
    title: string;
    category: string;
    technologies: string;
    image: string;
    description: string;
    link?: string;
    downloadUrl?: string;
    githubUrl?: string;
}

export const config: {
    developer: {
        name: string;
        fullName: string;
        title: string;
        description: string;
    };
    social: {
        github: string;
        email: string;
        location: string;
    };
    about: {
        title: string;
        description: string;
    };
    experiences: Array<{
        position: string;
        company: string;
        period: string;
        location: string;
        description: string;
        responsibilities: string[];
        technologies: string[];
    }>;
    projects: ProjectItem[];
    contact: {
        email: string;
        github: string;
        linkedin: string;
        twitter: string;
        facebook: string;
        instagram: string;
        youtube: string;
    };
    skills: {
        develop: {
            title: string;
            description: string;
            details: string;
            tools: string[];
        };
        design: {
            title: string;
            description: string;
            details: string;
            tools: string[];
        };
    };
} = {
    developer: {
        name: "Dilip",
        fullName: "Dilip Kumar",
        title: "Electronics Engineer | AI & Software Enthusiast",
        description: "Electronics Engineering student exploring Electronics, AI, and Software Development. I enjoy building practical projects, learning new technologies, and creating digital content."
    },
    social: {
        github: "dk2017044",
        email: "dk2017044@hotmail.com",
        location: "Patna, India"
    },
    about: {
        title: "About Me",
        description: "I am a 2nd-year Electronics Engineering student at Government Polytechnic Patna-7. I am learning programming, AI, and software development. I enjoy building practical electronics and coding projects, especially with Python. I am also interested in video editing and creative digital content."
    },
    experiences: [
        {
            position: "Diploma in Electronics Engineering",
            company: "Government Polytechnic Patna-7",
            period: "2025 - Present",
            location: "Patna, Bihar, India",
            description: "Currently studying Electronics Engineering and learning programming, AI, software development, and practical electronics.",
            responsibilities: [
                "Studying core electronics, circuit design, and electronic components",
                "Learning programming in Python, C, C++, Kotlin, and Java",
                "Building practical electronics toolkits and software applications",
                "Exploring Generative AI, prompt engineering, and modern developer tools"
            ],
            technologies: ["Electronics", "Python", "Kotlin", "C", "C++", "Circuit Design", "AI Basics"]
        },
        {
            position: "Secondary Education (10th)",
            company: "R.S.L.N. Vidya Mandir, Balua Bazar, Supaul, Bihar",
            period: "Completed",
            location: "Supaul, Bihar, India",
            description: "Completed secondary education with a strong foundation in science, mathematics, and foundational computer skills.",
            responsibilities: [
                "Built strong academic foundation in science, physics, and mathematics",
                "Developed early curiosity and passion for technology and electronics",
                "Participated in school academic, digital, and creative activities"
            ],
            technologies: ["Science", "Mathematics", "Computer Basics"]
        }
    ],
    projects: [
        {
            id: 1,
            title: "ElectroKit – Electronics Toolkit",
            category: "Android / Electronics",
            technologies: "Android, Kotlin, Firebase, Material Design",
            image: "/images/electrokit.jpg",
            description: "An all-in-one electronics toolkit for students featuring number system conversion, resistor color code, SMD resistor code, capacitor and inductor codes, Ohm's Law, power, LED resistor, and series/parallel calculators.",
            link: "https://github.com/dk2017044/ElectroKit/raw/main/Build_Releases_APK/ElectroKit_v4.0.2.apk",
            downloadUrl: "https://github.com/dk2017044/ElectroKit/raw/main/Build_Releases_APK/ElectroKit_v4.0.2.apk",
            githubUrl: "https://github.com/dk2017044/ElectroKit"
        },
        {
            id: 2,
            title: "Python Turtle Projects",
            category: "Python / Graphics",
            technologies: "Python, Turtle Graphics, Algorithms, Math",
            image: "/images/python_turtle.jpg",
            description: "Creative graphics, algorithmic patterns, and interactive programming experiments created while learning Python programming fundamentals.",
            link: "https://github.com/dk2017044"
        },
        {
            id: 3,
            title: "Practical Electronics & Circuits",
            category: "Electronics / Hardware",
            technologies: "Analog & Digital Circuits, Sensors, Hardware Testing",
            image: "/images/electronics_circuits.jpg",
            description: "Hands-on electronics engineering experiments focusing on circuit prototyping, component testing, sensor interfacing, and practical hardware design.",
            link: "https://github.com/dk2017044"
        },
        {
            id: 4,
            title: "AI & Software Development Lab",
            category: "AI / Development",
            technologies: "Generative AI, Prompt Engineering, Python, VS Code, Git",
            image: "/images/ai_lab.jpg",
            description: "Explorations in Generative AI, AI-assisted software development, and prompt engineering workflows to build practical solutions and accelerate learning.",
            link: "https://github.com/dk2017044"
        }
    ],
    contact: {
        email: "dk2017044@hotmail.com",
        github: "https://github.com/dk2017044/",
        linkedin: "https://www.linkedin.com/in/di7xu",
        twitter: "",
        facebook: "",
        instagram: "https://www.instagram.com/di7xu",
        youtube: "https://www.youtube.com/@di7xu"
    },
    skills: {
        develop: {
            title: "ELECTRONICS & CODE",
            description: "Electronics engineering, Python & software development",
            details: "Studying electronics engineering while developing strong programming fundamentals across Python, Kotlin, C, C++, Java, HTML/CSS, and Rust. Built Android tools like ElectroKit and practical electronics projects.",
            tools: ["Python", "Java", "C", "C++", "Kotlin", "Rust", "HTML", "CSS", "Android Studio", "VS Code"]
        },
        design: {
            title: "AI & CREATIVE TECH",
            description: "Generative AI, video editing & digital content creation",
            details: "Leveraging Generative AI, AI-assisted development, and prompt engineering alongside video editing with CapCut and VN, and visual design in Canva.",
            tools: ["Generative AI", "AI-assisted Dev", "Prompt Engineering", "Video Editing", "CapCut", "VN", "Canva", "Git", "GitHub"]
        }
    }
};
