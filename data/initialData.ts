
import { PortfolioData, Translation, Language } from '../types';

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

const ar: Translation = {
    appName: "انجازات زايد",
    nav: { home: "الرئيسية", journey: "المسيرة الأكاديمية", evaluation: "تقييم المعلمين", game: "لعبة التحدي" },
    footer: { rights: "جميع الحقوق محفوظة لـ" },
    login: { title: "دخول المدير", password: "كلمة المرور", enter: "دخول", close: "إغلاق" },
    home: {
        welcome: "مرحباً بك في ملف إنجازاتي", student: "الطالب", aboutMe: "نبذة عني", skills: "المهارات", hobbies: "الهوايات", goals: "الأهداف"
    },
    journey: { title: "رحلتي الأكاديمية", education: "التعليم", achievements: "الإنجازات الأكاديمية", projects: "المشاريع والأبحاث", volunteer: "الأعمال التطوعية", gallery: "معرض الأعمال" },
    evaluation: { title: "صفحة تقييم المعلمين", prompt: "قيّم يا معلمي الفاضل", placeholder: "اكتب تقييمك هنا...", submit: "إرسال التقييم", success: "تم إرسال تقييمك بنجاح. شكراً لك!", previousEvaluations: "التقييمات السابقة" },
    game: { title: "لعبة معلومات عني", welcome: "اختبر معلوماتك عني في هذه اللعبة!", start: "ابدأ اللعبة", next: "السؤال التالي", submit: "تحقق", correct: "إجابة صحيحة!", incorrect: "إجابة خاطئة، حاول مرة أخرى.", finalScore: "نتيجتك النهائية:", congrats: "تهانينا! لقد أكملت اللعبة بنجاح.", hint: "تلميح عني: شغفي الأكبر هو تعلم البرمجة.", playAgain: "العب مرة أخرى" },
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
    journey: { title: "My Academic Journey", education: "Education", achievements: "Academic Achievements", projects: "Projects & Research", volunteer: "Volunteer Work", gallery: "Gallery" },
    evaluation: { title: "Teacher Evaluation Page", prompt: "Evaluate, my dear teacher", placeholder: "Write your evaluation here...", submit: "Submit Evaluation", success: "Your evaluation has been submitted successfully. Thank you!", previousEvaluations: "Previous Evaluations" },
    game: { title: "Game: Info About Me", welcome: "Test your knowledge about me in this game!", start: "Start Game", next: "Next Question", submit: "Check", correct: "Correct!", incorrect: "Incorrect, try again.", finalScore: "Your final score:", congrats: "Congratulations! You completed the game.", hint: "Hint about me: My biggest passion is learning to code.", playAgain: "Play Again" },
    admin: { edit: "Edit", save: "Save", addItem: "Add Item", removeItem: "Remove" },
};

const fr: Translation = {
    appName: "Les Réalisations de Zayed",
    nav: { home: "Accueil", journey: "Parcours Académique", evaluation: "Évaluation des Enseignants", game: "Jeu Défi" },
    footer: { rights: "Tous droits réservés pour" },
    login: { title: "Connexion Admin", password: "Mot de passe", enter: "Connexion", close: "Fermer" },
    home: { welcome: "Bienvenue sur mon Portfolio", student: "Étudiant", aboutMe: "À propos de moi", skills: "Compétences", hobbies: "Loisirs", goals: "Objectifs" },
    journey: { title: "Mon Parcours Académique", education: "Éducation", achievements: "Réalisations Académiques", projects: "Projets et Recherches", volunteer: "Bénévolat", gallery: "Galerie" },
    evaluation: { title: "Page d'Évaluation des Enseignants", prompt: "Évaluez, mon cher professeur", placeholder: "Écrivez votre évaluation ici...", submit: "Soumettre l'Évaluation", success: "Votre évaluation a été soumise avec succès. Merci!", previousEvaluations: "Évaluations Précédentes" },
    game: { title: "Jeu : Infos sur moi", welcome: "Testez vos connaissances sur moi dans ce jeu !", start: "Commencer le jeu", next: "Question suivante", submit: "Vérifier", correct: "Correct !", incorrect: "Incorrect, réessayez.", finalScore: "Votre score final :", congrats: "Félicitations ! Vous avez terminé le jeu.", hint: "Indice sur moi : Ma plus grande passion est d'apprendre à coder.", playAgain: "Rejouer" },
    admin: { edit: "Modifier", save: "Enregistrer", addItem: "Ajouter un élément", removeItem: "Supprimer" },
};

const es: Translation = {
    appName: "Logros de Zayed",
    nav: { home: "Inicio", journey: "Trayectoria Académica", evaluation: "Evaluación de Profesores", game: "Juego de Desafío" },
    footer: { rights: "Todos los derechos reservados para" },
    login: { title: "Acceso de Administrador", password: "Contraseña", enter: "Acceder", close: "Cerrar" },
    home: { welcome: "Bienvenido a mi Portafolio", student: "Estudiante", aboutMe: "Sobre Mí", skills: "Habilidades", hobbies: "Aficiones", goals: "Metas" },
    journey: { title: "Mi Trayectoria Académica", education: "Educación", achievements: "Logros Académicos", projects: "Proyectos e Investigación", volunteer: "Voluntariado", gallery: "Galería" },
    evaluation: { title: "Página de Evaluación de Profesores", prompt: "Evalúe, mi querido profesor", placeholder: "Escriba su evaluación aquí...", submit: "Enviar Evaluación", success: "Su evaluación ha sido enviada con éxito. ¡Gracias!", previousEvaluations: "Evaluaciones Anteriores" },
    game: { title: "Juego: Información sobre mí", welcome: "¡Pon a prueba tus conocimientos sobre mí en este juego!", start: "Empezar Juego", next: "Siguiente Pregunta", submit: "Comprobar", correct: "¡Correcto!", incorrect: "Incorrecto, inténtalo de nuevo.", finalScore: "Tu puntuación final:", congrats: "¡Felicidades! Has completado el juego.", hint: "Pista sobre mí: Mi mayor pasión es aprender a programar.", playAgain: "Jugar de Nuevo" },
    admin: { edit: "Editar", save: "Guardar", addItem: "Añadir Elemento", removeItem: "Eliminar" },
};


export const translations: Record<Language, Translation> = { ar, en, fr, es };