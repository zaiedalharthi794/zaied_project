

import { PortfolioData, Translation, Language, GameLevel, IconGameQuestion } from '../types';

export const initialData: PortfolioData = {
    studentInfo: {
        name: "زايد محمد الحارثي",
        grade: "الأول متوسط",
        school: "مدرسة الأندلس الأهلية",
        email: "zaied.alharthi794@gmail.com",
        semester: "الفصل الدراسي الأول",
        avatarUrl: "https://i.ibb.co/6r1zX1g/image.png",
    },
    aboutMe: "طالب شغوف وطموح في مدرسة الأندلس الأهلية، أسعى لتعلم كل ما هو جديد ومفيد كي لا أصبح جاهلاً، وأطمح لتحسين مهاراتي في البرمجة والذكاء الاصطناعي.",
    education: "بدأت رحلتي التعليمية ببناء أساس قوي في المرحلة الابتدائية، والآن كطالب في الصف الأول المتوسط بمدرسة الأندلس الأهلية، أعيش مرحلة جديدة مليئة بالتحديات والفرص. أجد في بيئة المدرسة المحفزة والدعم المستمر من المعلمين دافعًا قويًا للإبداع والتفوق. أولي اهتمامًا خاصًا بمواد العلوم والرياضيات واللغة الإنجليزية، حيث أرى فيها مفاتيح المستقبل، كما أنني شغوف بتعلم البرمجة وأساسيات الذكاء الاصطناعي التي أخصص لها وقتًا خارج النطاق الدراسي. أحرص على المشاركة الفعالة في الأنشطة المدرسية والمشاريع الجماعية، لأنني أؤمن بأن التعليم الحقيقي يتجاوز جدران الفصل الدراسي ليشمل بناء الشخصية وتنمية مهارات التواصل والقيادة.",
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
        { id: 1, imageUrl: 'https://i.ibb.co/yY1kH9Q/solar-system-project.jpg', caption: 'مجسم عن المجموعة الشمسية' },
        { id: 2, imageUrl: 'https://i.ibb.co/W2z0Wf8/typing-competition.jpg', caption: 'صورة من مسابقة الطباعة' },
        { id: 3, imageUrl: 'https://i.ibb.co/VvZcGF2/volunteer-food.jpg', caption: 'أثناء العمل التطوعي' },
        { id: 4, imageUrl: 'https://i.ibb.co/hK5Xz82/king-fahd-presentation.jpg', caption: 'عرض تقديمي عن الملك فهد' },
    ]
};

export const initialDataEn: PortfolioData = {
    studentInfo: {
        name: "Zaied Mohammed AlHarthi",
        grade: "First Intermediate Grade",
        school: "Al-Andalus National School",
        email: "zaied.alharthi794@gmail.com",
        semester: "First Semester",
        avatarUrl: "https://i.ibb.co/6r1zX1g/image.png",
    },
    aboutMe: "A passionate and ambitious student at Al-Andalus National School, I seek to learn everything new and useful so as not to become ignorant, and I aspire to improve my skills in programming and artificial intelligence.",
    education: "My educational journey began with building a strong foundation in elementary school, and now, as a first-intermediate-grade student at Al-Andalus National School, I am embracing a new stage filled with challenges and opportunities. The stimulating school environment and the continuous support from my teachers provide a strong motivation for creativity and excellence. I have a keen interest in subjects like Science, Mathematics, and English, viewing them as keys to the future. I am also passionate about learning programming and the fundamentals of artificial intelligence, dedicating time to them outside my formal studies. I make sure to actively participate in school activities and group projects, as I believe that true education extends beyond the classroom to build character and develop communication and leadership skills.",
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
        { id: 1, imageUrl: 'https://i.ibb.co/yY1kH9Q/solar-system-project.jpg', caption: 'Model of the Solar System' },
        { id: 2, imageUrl: 'https://i.ibb.co/W2z0Wf8/typing-competition.jpg', caption: 'Photo from the typing competition' },
        { id: 3, imageUrl: 'https://i.ibb.co/VvZcGF2/volunteer-food.jpg', caption: 'During volunteer work' },
        { id: 4, imageUrl: 'https://i.ibb.co/hK5Xz82/king-fahd-presentation.jpg', caption: 'Presentation about King Fahd' },
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

const arIconGameQuestions: IconGameQuestion[] = [
    {
        iconName: 'TrophyIcon',
        questionText: "أي إنجاز يمثله هذا الرمز؟",
        correctAnswer: "المركز الأول في مسابقة الطباعة السريعة في الصف السادس.",
        options: [
            "المركز الأول في مسابقة الطباعة السريعة في الصف السادس.",
            "تصميم وبناء مجسمين في مادة العلوم عن الفضاء والكواكب.",
            "المشاركة في توزيع وجبات إفطار الصائمين خلال شهر رمضان."
        ]
    },
    {
        iconName: 'CodeBracketIcon',
        questionText: "أي مشروع يمثله هذا الرمز؟",
        correctAnswer: "إعداد عروض تقديمية متعددة باستخدام PowerPoint و Word عن شخصيات تاريخية مثل الملك فهد.",
        options: [
            "إعداد عروض تقديمية متعددة باستخدام PowerPoint و Word عن شخصيات تاريخية مثل الملك فهد.",
            "شهادة شكر وتقدير للمشاركة في مسابقة بلال.",
            "لعب كرة القدم"
        ]
    },
    {
        iconName: 'HeartIcon',
        questionText: "أي عمل تطوعي يمثله هذا الرمز؟",
        correctAnswer: "المشاركة في توزيع وجبات إفطار الصائمين خلال شهر رمضان.",
        options: [
            "المشاركة في توزيع وجبات إفطار الصائمين خلال شهر رمضان.",
            "جني رأس مال لبدء مشاريعي الخاصة.",
            "تسلق الجبال"
        ]
    },
    {
        iconName: 'MountainIcon',
        questionText: "أي هواية يمثلها هذا الرمز؟",
        correctAnswer: "تسلق الجبال",
        options: [
            "تسلق الجبال",
            "السباحة",
            "استخدام أدوات الذكاء الاصطناعي"
        ]
    }
];

const enIconGameQuestions: IconGameQuestion[] = [
    {
        iconName: 'TrophyIcon',
        questionText: "Which achievement does this icon represent?",
        correctAnswer: "First place in the fast typing competition in sixth grade.",
        options: [
            "First place in the fast typing competition in sixth grade.",
            "Designed and built two models in science class about space and planets.",
            "Participated in distributing Iftar meals for fasting people during Ramadan."
        ]
    },
    {
        iconName: 'CodeBracketIcon',
        questionText: "Which project does this icon represent?",
        correctAnswer: "Prepared multiple presentations using PowerPoint and Word about historical figures like King Fahd.",
        options: [
            "Prepared multiple presentations using PowerPoint and Word about historical figures like King Fahd.",
            "Certificate of thanks and appreciation for participating in the Bilal competition.",
            "Playing football"
        ]
    },
    {
        iconName: 'HeartIcon',
        questionText: "Which volunteer work does this icon represent?",
        correctAnswer: "Participated in distributing Iftar meals for fasting people during Ramadan.",
        options: [
            "Participated in distributing Iftar meals for fasting people during Ramadan.",
            "Earn capital to start my own projects.",
            "Mountain climbing"
        ]
    },
    {
        iconName: 'MountainIcon',
        questionText: "Which hobby does this icon represent?",
        correctAnswer: "Mountain climbing",
        options: [
            "Mountain climbing",
            "Swimming",
            "Using artificial intelligence tools"
        ]
    }
];


const ar: Translation = {
    appName: "انجازات زايد",
    nav: { home: "الرئيسية", journey: "المسيرة الأكاديمية", evaluation: "تعليقات زايد", game: "شبكة الألعاب" },
    footer: { rights: "جميع الحقوق محفوظة لـ" },
    login: { title: "دخول المدير", password: "كلمة المرور", enter: "دخول", close: "إغلاق" },
    home: {
        welcome: "مرحباً بك في ملف إنجازاتي", student: "الطالب", aboutMe: "نبذة عني", skills: "المهارات", hobbies: "الهوايات", goals: "الأهداف"
    },
    journey: { title: "رحلتي الأكاديمية", education: "التعليم", selfReflection: "تأملات حول بدايتي", achievements: "الإنجازات الأكاديمية", projects: "المشاريع والأبحاث", volunteer: "الأعمال التطوعية", gallery: "معرض الأعمال", captionPrompt: "أدخل وصفًا للصورة الجديدة:" },
    evaluation: { 
        title: "تعليقات المعلمين", 
        prompt: "أضف تعليقاً جديداً", 
        placeholder: "اكتب تعليقك هنا...", 
        submit: "إرسال التعليق", 
        success: "تم إرسال التعليق بنجاح!", 
        previousEvaluations: "التعليقات السابقة",
        namePlaceholder: "الاسم",
        rolePlaceholder: "المادة / الصفة"
    },
    game: { 
        title: "شبكة الألعاب",
        welcome: "اختر لعبة من القائمة أدناه واستمتع بوقتك!",
        start: "ابدأ اللعبة",
        next: "السؤال التالي",
        submit: "تحقق",
        correct: "إجابة صحيحة!",
        incorrect: "إجابة خاطئة، حاول مرة أخرى.",
        finalScore: "نتيجتك النهائية:",
        congrats: "تهانينا! لقد أكملت اللعبة بنجاح.",
        hint: "تلميح عني: شغفي الأكبر هو تعلم البرمجة.",
        playAgain: "العب مرة أخرى",
        levels: arGameLevels,
        quizTitle: "لعبة التحدي",
        quizDescription: "اختبر معلوماتك عن زايد في هذه اللعبة الممتعة.",
        memoryTitle: "لعبة الذاكرة",
        memoryDescription: "طابق البطاقات التي تمثل هوايات زايد ومهاراته.",
        iconGameTitle: "لعبة ربط الرموز",
        iconGameDescription: "اربط الرمز بالمشروع أو الإنجاز الصحيح.",
        iconGameQuestions: arIconGameQuestions,
        backToGames: "العودة إلى الألعاب",
        websiteBuilderTitle: "لعبة بناء الموقع",
        websiteBuilderDescription: "اتبع الخطوات وقم ببناء موقعك الإلكتروني الأول.",
        websiteBuilderSteps: {
            step1_name: {
                title: "المرحلة 1: اسم الموقع",
                prompt: "كل موقع رائع يحتاج إلى اسم. ماذا ستسمي موقعك؟",
                placeholder: "اكتب اسم موقعك هنا...",
            },
            step2_color: {
                title: "المرحلة 2: لوحة الألوان",
                prompt: "اختر لونًا أساسيًا ليعكس هوية موقعك.",
            },
            step3_layout: {
                title: "المرحلة 3: التخطيط",
                prompt: "اختر شكل التخطيط لصفحتك الرئيسية.",
                options: {
                    default: "أساسي",
                    sidebar: "مع شريط جانبي",
                    grid: "شبكي",
                },
            },
            step4_content: {
                title: "المرحلة 4: المحتوى",
                prompt: "اكتب رسالة ترحيبية قصيرة ونبذة عنك.",
                welcomePlaceholder: "مرحباً بكم في موقعي...",
                aboutPlaceholder: "نبذة بسيطة عني...",
            },
            step5_font: {
                title: "المرحلة 5: الخطوط",
                prompt: "اختر زوجًا من الخطوط للعناوين والنصوص.",
                options: {
                    sans: "بسيط",
                    serif: "تقليدي",
                    mono: "تقني",
                },
            },
            step6_feature: {
                title: "المرحلة 6: اللمسات الأخيرة",
                prompt: "اختر ميزة أخيرة لإضافتها إلى موقعك.",
                options: {
                    gallery: "معرض الصور",
                    blog: "آخر الأخبار",
                    contact: "نموذج تواصل",
                },
            },
            finish: {
                title: "اكتمل البناء!",
                congrats: "تهانينا، لقد بنيت موقعك بنجاح.",
                prompt: "لقد أبدعت في بناء موقعك! هل ترغب في بناء واحد آخر؟",
                buildAgain: "بناء موقع آخر",
            },
            preview: "معاينة حية",
            progress: "التقدم",
        },
        puzzleTitle: "لعبة البازل",
    },
    theme: { select: "المظهر", light: "فاتح", dark: "داكن", system: "النظام", language: "اللغة", font: "الخط" },
    admin: { edit: "تعديل", save: "حفظ", addItem: "إضافة عنصر", removeItem: "حذف", upload: "رفع صورة جديدة", change: "تغيير", deleteItem: "حذف الصورة", uploadError: "فشل رفع الصورة.", deleteConfirm: "هل أنت متأكد من حذف هذه الصورة؟", deleteError: "فشل حذف الصورة.", avatarUploadError: "فشل رفع صورة الملف الشخصي.", imageTooLargeError: "الصورة كبيرة جداً. الرجاء رفع صورة أصغر من 500 كيلوبايت.", imageReadError: "فشل قراءة ملف الصورة.", deleteEvaluation: "حذف التعليق", deleteEvaluationConfirm: "هل أنت متأكد من حذف هذا التعليق؟" },
    chatbot: { title: "المساعد الذكي", placeholder: "اسأل أي شيء عن زايد...", close: "إغلاق", initialMessage: "أهلاً بك! أنا مساعدك الذكي. كيف يمكنني مساعدتك اليوم بخصوص ملف زايد؟", connectionError: "عذراً، أواجه مشكلة في الاتصال الآن." },
};

const en: Translation = {
    appName: "Zaied's Achievements",
    nav: { home: "Home", journey: "Academic Journey", evaluation: "Zayed's Comments", game: "Game Arcade" },
    footer: { rights: "All rights reserved for" },
    login: { title: "Admin Login", password: "Password", enter: "Login", close: "Close" },
    home: {
        welcome: "Welcome to my Portfolio", student: "Student", aboutMe: "About Me", skills: "Skills", hobbies: "Hobbies", goals: "Goals"
    },
    journey: { title: "My Academic Journey", education: "Education", selfReflection: "Reflections on My Start", achievements: "Academic Achievements", projects: "Projects & Research", volunteer: "Volunteer Work", gallery: "Gallery", captionPrompt: "Enter a caption for the new image:" },
    evaluation: { 
        title: "Teachers' Comments", 
        prompt: "Add a new comment", 
        placeholder: "Write your comment here...", 
        submit: "Post Comment", 
        success: "Comment posted successfully!", 
        previousEvaluations: "Previous Comments",
        namePlaceholder: "Name",
        rolePlaceholder: "Subject / Role"
    },
    game: { 
        title: "Game Arcade",
        welcome: "Choose a game from the list below and have fun!",
        start: "Start Game",
        next: "Next Question",
        submit: "Check",
        correct: "Correct!",
        incorrect: "Incorrect, try again.",
        finalScore: "Your final score:",
        congrats: "Congratulations! You completed the game.",
        hint: "Hint about me: My biggest passion is learning to code.",
        playAgain: "Play Again",
        levels: enGameLevels,
        quizTitle: "Challenge Quiz",
        quizDescription: "Test your knowledge about Zayed in this fun quiz.",
        memoryTitle: "Memory Game",
        memoryDescription: "Match cards representing Zayed's hobbies and skills.",
        iconGameTitle: "Icon Match Game",
        iconGameDescription: "Match the icon to the correct project or achievement.",
        iconGameQuestions: enIconGameQuestions,
        backToGames: "Back to Games",
        websiteBuilderTitle: "Website Builder Game",
        websiteBuilderDescription: "Follow the steps and build your first website.",
        websiteBuilderSteps: {
            step1_name: {
                title: "Stage 1: Site Name",
                prompt: "Every great website needs a name. What will you call your site?",
                placeholder: "Enter your site name here...",
            },
            step2_color: {
                title: "Stage 2: Color Palette",
                prompt: "Choose a primary color to reflect your site's identity.",
            },
            step3_layout: {
                title: "Stage 3: Layout",
                prompt: "Choose a layout for your main page.",
                options: {
                    default: "Basic",
                    sidebar: "With Sidebar",
                    grid: "Grid",
                },
            },
            step4_content: {
                title: "Stage 4: Content",
                prompt: "Write a short welcome message and an about me section.",
                welcomePlaceholder: "Welcome to my site...",
                aboutPlaceholder: "A little bit about me...",
            },
            step5_font: {
                title: "Stage 5: Fonts",
                prompt: "Choose a font pairing for headings and text.",
                options: {
                    sans: "Simple",
                    serif: "Traditional",
                    mono: "Technical",
                },
            },
            step6_feature: {
                title: "Stage 6: Final Touches",
                prompt: "Choose one last feature to add to your site.",
                options: {
                    gallery: "Photo Gallery",
                    blog: "Latest News",
                    contact: "Contact Form",
                },
            },
            finish: {
                title: "Build Complete!",
                congrats: "Congratulations, you've successfully built your site.",
                prompt: "You did a great job building your site! Want to build another one?",
                buildAgain: "Build Another Site",
            },
            preview: "Live Preview",
            progress: "Progress",
        },
        puzzleTitle: "Puzzle Game",
    },
    theme: { select: "Theme", light: "Light", dark: "Dark", system: "System", language: "Language", font: "Font" },
    admin: { 
        edit: "Edit", 
        save: "Save", 
        addItem: "Add Item", 
        removeItem: "Remove", 
        upload: "Upload New Image", 
        change: "Change", 
        deleteItem: "Delete Image", 
        uploadError: "Failed to upload image.", 
        deleteConfirm: "Are you sure you want to delete this image?", 
        deleteError: "Failed to delete image.", 
        avatarUploadError: "Failed to upload avatar image.", 
        imageTooLargeError: "Image is too large. Please upload an image smaller than 500KB.",
        imageReadError: "Failed to read image file.",
        deleteEvaluation: "Delete Comment",
        deleteEvaluationConfirm: "Are you sure you want to delete this comment?"
    },
    chatbot: { 
        title: "AI Assistant", 
        placeholder: "Ask anything about Zayed...", 
        close: "Close", 
        initialMessage: "Welcome! I am your AI assistant. How can I help you today regarding Zayed's portfolio?", 
        connectionError: "Sorry, I'm having trouble connecting right now." 
    },
};

export const translations: { [key: string]: Translation } = { ar, en };
