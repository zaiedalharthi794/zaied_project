
export interface StudentInfo {
    name: string;
    grade: string;
    school: string;
    email: string;
    semester: string;
}

export interface PortfolioData {
    studentInfo: StudentInfo;
    aboutMe: string;
    education: string;
    achievements: string[];
    skills: string[];
    projects: string[];
    volunteerWork: string[];
    hobbies: string[];
    goals: string[];
    evaluations: string[];
    gallery: { id: number; imageUrl: string; caption: string }[];
}

export type Language = 'ar' | 'en' | 'fr' | 'es';

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
        achievements: string;
        projects: string;
        volunteer: string;
        gallery: string;
    };
    evaluation: {
        title: string;
        prompt: string;
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
    };
    admin: {
        edit: string;
        save: string;
        addItem: string;
        removeItem: string;
    };
}

export interface EditableSectionProps {
    title: string;
    content: string | string[];
    onSave: (newContent: string | string[]) => void;
    isAdmin: boolean;
    isList?: boolean;
}