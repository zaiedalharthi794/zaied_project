
import { PortfolioData, Translation, Language, GameLevel } from '../types';

export const initialData: PortfolioData = {
    studentInfo: {
        name: "زايد محمد الحارثي",
        grade: "الأول متوسط",
        school: "مدرسة الأندلس الأهلية",
        email: "zaied.alharthi794@gmail.com",
        semester: "الفصل الدراسي الأول",
    },
    aboutMe: "طالب شغوف وطموح في مدرسة الأندلس الأهلية، أسعى لتعلم كل ما هو جديد ومفيد كي لا أصبح جاهلاً، وأطمح لتحسين مهاراتي في البرمجة والذكاء الاصطناعي.",
    education: "أدرس حالياً في الصف الأول متوسط.",
    selfReflection: "أرى أن بدايتي في المرحلة المتوسطة كانت قوية ومليئة بالشغف. تعلمت الكثير من المهارات الجديدة وأنا متحمس لمواصلة التطور والتعلم في المستقبل.",
    achievements: [
        "المركز الأول في مسابقة الطباعة السريعة في الصف السادس.",
        "شهادة شكر وتقدير للمشاركة في مسابقة أجمل مطوية علمية.",
        "شهادة شكر وتقدير للمشاركة في مسابقة بلال.",
        "شهادة شكر وتقدير للمشاركة في مسابقة وضوؤك أيها المسلم."
    ],
    skills: [
        "استخدام أدوات الذكاء الاصطناعي",
        "العمل الجماعي",
        "استخدام التقنية الحديثة",
        "إدارة الوقت"
    ],
    projects: [
        "إعداد عروض تقديمية متعددة باستخدام PowerPoint و Word عن شخصيات تاريخية مثل الملك فهد.",
        "تصميم وبناء مجسمين في مادة العلوم عن الفضاء والكواكب."
    ],
    volunteerWork: [
        "المشاركة في توزيع وجبات إفطار الصائمين خلال شهر رمضان."
    ],
    hobbies: [
        "لعب كرة القدم",
        "القراءة",
        "السباحة",
        "لعب الشطرنج",
        "تسلق الجبال",
        "الألعاب الذهنية",
        "التجارة"
    ],
    goals: [
        "جني رأس مال لبدء مشاريعي الخاصة.",
        "بناء وتطوير موقعي الإلكتروني الشخصي.",
        "تحقيق أهدافي الأكاديمية والشخصية.",
        "إكمال دراستي الجامعية في مجال مرموق.",
        "أن أكون شخصية مؤثرة وناجحة في مجتمعي."
    ],
    evaluations: [],
    gallery: [
        { id: 1, imageUrl: 'https://picsum.photos/seed/project1/600/400', caption: 'مجسم عن المجموعة الشمسية' },
        { id: 2, imageUrl: 'https://picsum.photos/seed/award1/600/400', caption: 'صورة من مسابقة الطباعة' },
        { id: 3, imageUrl: 'https://picsum.photos/seed/volunteer1/600/400', caption: 'أثناء العمل التطوعي' },
        { id: 4, imageUrl: 'https://picsum.photos/seed/project2/600/400', caption: 'عرض تقديمي عن الملك فهد' },
    ]
};

export const initialDataEn: PortfolioData = {
    studentInfo: {
        name: "Zayed Mohammed Al-Harthi",
        grade: "First Intermediate Grade",
        school: "Al-Andalus National School",
        email: "zaied.alharthi794@gmail.com",
        semester: "First Semester",
    },
    aboutMe: "A passionate and ambitious student at Al-Andalus National School, I seek to learn everything new and useful so as not to become ignorant, and I aspire to improve my skills in programming and artificial intelligence.",
    education: "Currently studying in the first intermediate grade.",
    selfReflection: "I see my start in the intermediate stage as strong and full of passion. I have learned many new skills and I am excited to continue developing and learning in the future.",
    achievements: [
        "First place in the fast typing competition in sixth grade.",
        "Certificate of thanks and appreciation for participating in the most beautiful scientific brochure competition.",
        "Certificate of thanks and appreciation for participating in the Bilal competition.",
        "Certificate of thanks and appreciation for participating in the 'Your Wudu, O Muslim' competition."
    ],
    skills: [
        "Using artificial intelligence tools",
        "Teamwork",
        "Using modern technology",
        "Time management"
    ],
    projects: [
        "Prepared multiple presentations using PowerPoint and Word about historical figures like King Fahd.",
        "Designed and built two models in science class about space and planets."
    ],
    volunteerWork: [
        "Participated in distributing Iftar meals for fasting people during Ramadan."
    ],
    hobbies: [
        "Playing football",
        "Reading",
        "Swimming",
        "Playing chess",
        "Mountain climbing",
        "Brain games",
        "Trading"
    ],
    goals: [
        "Earn capital to start my own projects.",
        "Build and develop my personal website.",
        "Achieve my academic and personal goals.",
        "Complete my university studies in a prestigious field.",
        "To be an influential and successful person in my community."
    ],
    evaluations: [],
    gallery: [
        { id: 1, imageUrl: 'https://picsum.photos/seed/project1/600/400', caption: 'Model of the Solar System' },
        { id: 2, imageUrl: 'https://picsum.photos/seed/award1/600/400', caption: 'Photo from the typing competition' },
        { id: 3, imageUrl: 'https://picsum.photos/seed/volunteer1/600/400', caption: 'During volunteer work' },
        { id: 4, imageUrl: 'https://picsum.photos/seed/project2/600/400', caption: 'Presentation about King Fahd' },
    ]
};

const arGameLevels: GameLevel[] = [
    {
        title: "المرحلة الأولى: معلومات أساسية",
        questions: [
            {
                question: "ما هي الهواية التي أمارسها وتتطلب تسلق المرتفعات؟",
                options: ["السباحة", "تسلق الجبال", "القراءة", "لعب الشطرنج"],
                answer: "تسلق الجبال"
            },
            {
                question: "في أي مسابقة حققت المركز الأول في الصف السادس؟",
                options: ["أجمل مطوية", "مسابقة بلال", "الطباعة السريعة", "وضوؤك أيها المسلم"],
                answer: "الطباعة السريعة"
            },
            {
                question: "أي من هذه المهارات أمتلكها؟",
                options: ["الطبخ", "العمل الجماعي", "الرسم", "العزف على الجيتار"],
                answer: "العمل الجماعي"
            },
            {
                question: "ما هو أحد المشاريع التي قمت بها في مادة العلوم؟",
                options: ["بركان مصغر", "مجسم عن الفضاء والكواكب", "تشريح ضفدع", "دائرة كهربائية"],
                answer: "مجسم عن الفضاء والكواكب"
            }
        ]
    },
    {
        title: "المرحلة الثانية: إنجازات ومشاريع",
        questions: [
             {
                question: "عن أي شخصية تاريخية قمت بإعداد عرض تقديمي؟",
                options: ["الملك سلمان", "الملك فيصل", "الملك فهد", "الملك عبدالله"],
                answer: "الملك فهد"
            },
            {
                question: "ما هو العمل التطوعي الذي شاركت فيه؟",
                options: ["تنظيف الشاطئ", "زراعة الأشجار", "توزيع وجبات إفطار الصائمين", "مساعدة كبار السن"],
                answer: "توزيع وجبات إفطار الصائمين"
            },
            {
                question: "شهادة شكر حصلت عليها كانت للمشاركة في مسابقة...",
                options: ["الخط العربي", "القرآن الكريم", "وضوؤك أيها المسلم", "الشعر"],
                answer: "وضوؤك أيها المسلم"
            },
            {
                question: "ما هي المادة التي صممت فيها مجسمين؟",
                options: ["الرياضيات", "الفنية", "العلوم", "التاريخ"],
                answer: "العلوم"
            }
        ]
    },
    {
        title: "المرحلة الثالثة: الطموحات المستقبلية",
        questions: [
            {
                question: "ما هو أول هدف مالي لي؟",
                options: ["شراء هاتف جديد", "جني رأس مال لبدء مشاريعي", "الاستثمار في الأسهم", "ادخار المال للسفر"],
                answer: "جني رأس مال لبدء مشاريعي"
            },
            {
                question: "ما هو المجال الذي أطمح لتحسين مهاراتي فيه؟",
                options: ["التصوير الفوتوغرافي", "الطبخ", "البرمجة والذكاء الاصطناعي", "الموسيقى"],
                answer: "البرمجة والذكاء الاصطناعي"
            },
            {
                question: "ما هو أحد أهدافي الأكاديمية الكبرى؟",
                options: ["الحصول على منحة دراسية", "إكمال دراستي الجامعية", "التخرج بمرتبة الشرف", "الدراسة في الخارج"],
                answer: "إكمال دراستي الجامعية"
            },
            {
                question: "أسعى أن أكون شخصية مؤثرة وناجحة في...",
                options: ["مجال الرياضة", "مجتمعي", "مجال الفن", "العالم كله"],
                answer: "مجتمعي"
            }
        ]
    }
];

const enGameLevels: GameLevel[] = [
    {
        title: "Level 1: Basic Information",
        questions: [
            { question: "Which hobby do I practice that involves climbing heights?", options: ["Swimming", "Mountain Climbing", "Reading", "Playing Chess"], answer: "Mountain Climbing" },
            { question: "In which competition did I win first place in the sixth grade?", options: ["Most Beautiful Brochure", "Bilal Competition", "Fast Typing", "Your Wudu, O Muslim"], answer: "Fast Typing" },
            { question: "Which of these skills do I possess?", options: ["Cooking", "Teamwork", "Drawing", "Playing Guitar"], answer: "Teamwork" },
            { question: "What is one of the projects I did in science class?", options: ["Mini Volcano", "Model of Space and Planets", "Frog Dissection", "Electric Circuit"], answer: "Model of Space and Planets" }
        ]
    },
    {
        title: "Level 2: Achievements and Projects",
        questions: [
            { question: "About which historical figure did I prepare a presentation?", options: ["King Salman", "King Faisal", "King Fahd", "King Abdullah"], answer: "King Fahd" },
            { question: "What volunteer work did I participate in?", options: ["Beach Cleaning", "Planting Trees", "Distributing Iftar Meals", "Helping the Elderly"], answer: "Distributing Iftar Meals" },
            { question: "A certificate of thanks I received was for participating in the...", options: ["Arabic Calligraphy", "Holy Quran", "Your Wudu, O Muslim", "Poetry"], answer: "Your Wudu, O Muslim" },
            { question: "In which subject did I design two models?", options: ["Math", "Art", "Science", "History"], answer: "Science" }
        ]
    },
    {
        title: "Level 3: Future Aspirations",
        questions: [
            { question: "What is my first financial goal?", options: ["Buy a new phone", "Earn capital to start my projects", "Invest in stocks", "Save money for travel"], answer: "Earn capital to start my projects" },
            { question: "In which field do I aspire to improve my skills?", options: ["Photography", "Cooking", "Programming and AI", "Music"], answer: "Programming and AI" },
            { question: "What is one of my major academic goals?", options: ["Get a scholarship", "Complete my university studies", "Graduate with honors", "Study abroad"], answer: "Complete my university studies" },
            { question: "I strive to be an influential and successful person in...", options: ["the field of sports", "my community", "the field of art", "the whole world"], answer: "my community" }
        ]
    }
];


const ar: Translation = {
    appName: "انجازات زايد",
    nav: { home: "الرئيسية", journey: "المسيرة الأكاديمية", evaluation: "تقييم المعلمين", game: "لعبة التحدي" },
    footer: { rights: "جميع الحقوق محفوظة لـ" },
    login: { title: "دخول المدير", password: "كلمة المرور", enter: "دخول", close: "إغلاق" },
    home: {
        welcome: "مرحباً بك في ملف إنجازاتي", student: "الطالب", aboutMe: "نبذة عني", skills: "المهارات", hobbies: "الهوايات", goals: "الأهداف"
    },
    journey: { title: "رحلتي الأكاديمية", education: "التعليم", selfReflection: "تأملات حول بدايتي", achievements: "الإنجازات الأكاديمية", projects: "المشاريع والأبحاث", volunteer: "الأعمال التطوعية", gallery: "معرض الأعمال" },
    evaluation: { title: "صفحة تقييم المعلمين", prompt: "قيّم يا معلمي الفاضل", teacherName: "اسم المعلم", placeholder: "اكتب تقييمك هنا...", submit: "إرسال التقييم", success: "تم إرسال تقييمك بنجاح. شكراً لك!", previousEvaluations: "التقييمات السابقة" },
    game: { title: "لعبة معلومات عني", welcome: "اختبر معلوماتك عني في هذه اللعبة!", start: "ابدأ اللعبة", next: "السؤال التالي", submit: "تحقق", correct: "إجابة صحيحة!", incorrect: "إجابة خاطئة، حاول مرة أخرى.", finalScore: "نتيجتك النهائية:", congrats: "تهانينا! لقد أكملت اللعبة بنجاح.", hint: "تلميح عني: شغفي الأكبر هو تعلم البرمجة.", playAgain: "العب مرة أخرى", levels: arGameLevels },
    theme: { light: "فاتح", dark: "داكن", toggle: "تبديل المظهر" },
    admin: { edit: "تعديل", save: "حفظ", addItem: "إضافة عنصر", removeItem: "حذف" },
};

const en: Translation = {
    appName: "Zayed's Achievements",
    nav: { home: "Home", journey: "Academic Journey", evaluation: "Teacher Evaluation", game: "Challenge Game" },
    footer: { rights: "All rights reserved for" },
    login: { title: "Admin Login", password: "Password", enter: "Login", close: "Close" },
    home: {
        welcome: "Welcome to my Portfolio", student: "Student", aboutMe: "About Me", skills: "Skills", hobbies: "Hobbies", goals: "Goals"
    },
    journey: { title: "My Academic Journey", education: "Education", selfReflection: "Reflections on My Start", achievements: "Academic Achievements", projects: "Projects & Research", volunteer: "Volunteer Work", gallery: "Gallery" },
    evaluation: { title: "Teacher Evaluation Page", prompt: "Evaluate, my dear teacher", teacherName: "Teacher's Name", placeholder: "Write your evaluation here...", submit: "Submit Evaluation", success: "Your evaluation has been submitted successfully. Thank you!", previousEvaluations: "Previous Evaluations" },
    game: { title: "Game: Info About Me", welcome: "Test your knowledge about me in this game!", start: "Start Game", next: "Next Question", submit: "Check", correct: "Correct!", incorrect: "Incorrect, try again.", finalScore: "Your final score:", congrats: "Congratulations! You completed the game.", hint: "Hint about me: My biggest passion is learning to code.", playAgain: "Play Again", levels: enGameLevels },
    theme: { light: "Light", dark: "Dark", toggle: "Toggle Theme" },
    admin: { edit: "Edit", save: "Save", addItem: "Add Item", removeItem: "Remove" },
};

export const translations: { [key: string]: Translation } = { ar, en };
