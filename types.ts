

export interface StudentInfo {
    name: string;
    grade: string;
    school: string;
    email: string;
    semester: string;
    avatarUrl?: string;
}

export interface Evaluation {
    teacher: string;
    text: string;
}

export interface PortfolioData {
    studentInfo: StudentInfo;
    aboutMe: string;
    education: string;
    selfReflection: string; // Added this line
    achievements: string[];
    skills: string[];
    projects: string[];
    volunteerWork: string[];
    hobbies: string[];
    goals: string[];
    evaluations: Evaluation[];
    gallery: { id: number; imageUrl: string; caption: string }[];
}

export type Language = string;

export interface GameQuestion {
    question: string;
    options: string[];
    answer: string;
}

export interface GameLevel {
    title: string;
    questions: GameQuestion[];
}

export interface IconGameQuestion {
    iconName: string;
    questionText: string;
    correctAnswer: string;
    options: string[];
}


export interface Translation {
    appName: string;
    nav: {
        home: string;
        journey: string;
        evaluation: string;
        game: string;
    };
    footer: {
        rights: string;
    };
    login: {
        title: string;
        password: string;
        enter: string;
        close: string;
    };
    home: {
        welcome: string;
        student: string;
        aboutMe: string;
        skills: string;
        hobbies: string;
        goals: string;
    };
    journey: {
        title: string;
        education: string;
        selfReflection: string; // Added this line
        achievements: string;
        projects: string;
        volunteer: string;
        gallery: string;
        captionPrompt: string;
    };
    evaluation: {
        title: string;
        prompt: string;
        teacherName: string;
        placeholder: string;
        submit: string;
        success: string;
        previousEvaluations: string;
    };
    game: {
        title: string;
        welcome: string;
        start: string;
        next: string;
        submit: string;
        correct: string;
        incorrect: string;
        finalScore: string;
        congrats: string;
        hint: string;
        playAgain: string;
        levels: GameLevel[];
        // New keys for Game Hub
        quizTitle: string;
        quizDescription: string;
        memoryTitle: string;
        memoryDescription: string;
        iconGameTitle: string;
        iconGameDescription: string;
        iconGameQuestions: IconGameQuestion[];
        backToGames: string;
    };
    theme: {
        select: string;
        light: string;
        dark: string;
        system: string;
        language: string;
        font: string;
    };
    admin: {
        edit: string;
        save: string;
        addItem: string;
        removeItem: string;
        upload: string;
        change: string;
        deleteItem: string;
        uploadError: string;
        deleteConfirm: string;
        deleteError: string;
        avatarUploadError: string;
        imageTooLargeError: string;
        imageReadError: string;
        deleteEvaluation: string;
        deleteEvaluationConfirm: string;
    };
    chatbot: {
        title: string;
        placeholder: string;
        close: string;
        initialMessage: string;
        connectionError: string;
    };
}

export interface EditableSectionProps {
    title: string;
    content: string | string[];
    onSave: (newContent: string | string[]) => void;
    isAdmin: boolean;
    isList?: boolean;
    t: Translation;
}

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}