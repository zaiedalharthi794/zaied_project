import React, { useState, useRef, useEffect } from 'react';
import { PortfolioData, Translation } from '../types';
import EditableSection from '../components/EditableSection';
import { EditIcon } from '../components/Icons';

interface HomePageProps {
    data: PortfolioData;
    setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
    isAdmin: boolean;
    t: Translation;
}

const HomePage: React.FC<HomePageProps> = ({ data, setData, isAdmin, t }) => {
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const handleSave = (key: keyof PortfolioData, content: string | string[]) => {
        setData(prevData => ({ ...prevData, [key]: content }));
    };

    const handleAvatarClick = () => {
        if (isAdmin) {
            fileInputRef.current?.click();
        }
    };

    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        
        if (file.size > 500 * 1024) { // 500 KB limit
            alert(t.admin.imageTooLargeError || "Image is too large. Please upload an image smaller than 500KB.");
            return;
        }

        setIsUploading(true);
        const reader = new FileReader();
        reader.onloadend = () => {
            setData(prevData => ({
                ...prevData,
                studentInfo: {
                    ...prevData.studentInfo,
                    avatarUrl: reader.result as string
                }
            }));
            setIsUploading(false);
        };
        reader.onerror = () => {
            console.error("Error reading file");
            alert(t.admin.imageReadError || "Failed to read the image file.");
            setIsUploading(false);
        };
        reader.readAsDataURL(file);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                    }
                });
            },
            {
                threshold: 0.1,
            }
        );

        const elements = document.querySelectorAll('.scroll-animate');
        elements.forEach((el) => observer.observe(el));

        return () => {
            elements.forEach((el) => observer.unobserve(el));
        };
    }, []);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <header className="text-center mb-16 py-10 bg-card/50 rounded-2xl shadow-sm">
                <div
                    className={`relative inline-block w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-primary shadow-lg ${isAdmin ? 'cursor-pointer group' : ''}`}
                    onClick={handleAvatarClick}
                >
                    <img
                        src={data.studentInfo.avatarUrl}
                        alt={data.studentInfo.name}
                        className="w-full h-full object-cover"
                    />
                    {isAdmin && (
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center rounded-full transition-opacity">
                            <EditIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100" />
                        </div>
                    )}
                    {isUploading && (
                        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center rounded-full">
                            <div className="w-8 h-8 border-2 border-dashed rounded-full animate-spin border-white"></div>
                        </div>
                    )}
                </div>
                {isAdmin && <input type="file" ref={fileInputRef} onChange={handleAvatarChange} accept="image/*" className="hidden" />}
                <p className="text-xl text-muted-foreground mt-6">{t.home.welcome}</p>
                <h1 className="text-4xl md:text-6xl font-extrabold text-primary py-2">
                    {data.studentInfo.name}
                </h1>
                <div className="mt-2 text-muted-foreground flex justify-center items-center gap-4 flex-wrap">
                    <span>{data.studentInfo.grade} - {data.studentInfo.school}</span>
                    <span className="text-border hidden sm:inline">•</span>
                    <a href={`mailto:${data.studentInfo.email}`} className="hover:text-primary transition-colors">{data.studentInfo.email}</a>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2 scroll-animate scroll-animate-up">
                    <EditableSection title={t.home.aboutMe} content={data.aboutMe} onSave={(content) => handleSave('aboutMe', content)} isAdmin={isAdmin} t={t} />
                </div>
                <div className="scroll-animate scroll-animate-up" style={{ transitionDelay: '100ms' }}>
                    <EditableSection title={t.home.skills} content={data.skills} onSave={(content) => handleSave('skills', content)} isAdmin={isAdmin} isList={true} t={t} />
                </div>
                <div className="scroll-animate scroll-animate-up" style={{ transitionDelay: '200ms' }}>
                    <EditableSection title={t.home.hobbies} content={data.hobbies} onSave={(content) => handleSave('hobbies', content)} isAdmin={isAdmin} isList={true} t={t} />
                </div>
                <div className="md:col-span-2 scroll-animate scroll-animate-up" style={{ transitionDelay: '300ms' }}>
                     <EditableSection title={t.home.goals} content={data.goals} onSave={(content) => handleSave('goals', content)} isAdmin={isAdmin} isList={true} t={t} />
                </div>
            </div>
        </div>
    );
};

export default HomePage;