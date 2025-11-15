import React, { useState, useRef } from 'react';
import { PortfolioData, Translation } from '../types';
import EditableSection from '../components/EditableSection';
import { EditIcon } from '../components/Icons';

interface HomePageProps {
    data: PortfolioData;
    setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
    isAdmin: boolean;
    t: Translation;
}

const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
};

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

        setIsUploading(true);
        try {
            const base64String = await convertToBase64(file);
            setData(prevData => ({
                ...prevData,
                studentInfo: {
                    ...prevData.studentInfo,
                    avatarUrl: base64String
                }
            }));
        } catch (error) {
            console.error("Error converting image to Base64: ", error);
            alert("Failed to upload image.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <header className="text-center mb-16 py-10 bg-card/50 rounded-2xl shadow-sm">
                <div className={`relative inline-block p-1 bg-gradient-to-r from-primary/80 to-primary rounded-full ${isAdmin ? 'cursor-pointer' : ''}`} onClick={handleAvatarClick}>
                  <img src={data.studentInfo.avatarUrl} alt="Graduate Avatar" className="h-40 w-40 rounded-full object-cover border-4 border-background" />
                   {isAdmin && (
                     <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 flex items-center justify-center rounded-full transition-opacity">
                         <EditIcon className="w-8 h-8 text-white opacity-0 hover:opacity-100" />
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
                <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-500 py-2">
                    {data.studentInfo.name}
                </h1>
                 <div className="mt-2 text-muted-foreground flex justify-center items-center gap-4 flex-wrap">
                    <span>{data.studentInfo.grade} - {data.studentInfo.school}</span>
                    <span className="text-border hidden sm:inline">•</span>
                    <a href={`mailto:${data.studentInfo.email}`} className="hover:text-primary transition-colors">{data.studentInfo.email}</a>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2">
                    <EditableSection title={t.home.aboutMe} content={data.aboutMe} onSave={(content) => handleSave('aboutMe', content)} isAdmin={isAdmin} t={t} />
                </div>
                <EditableSection title={t.home.skills} content={data.skills} onSave={(content) => handleSave('skills', content)} isAdmin={isAdmin} isList={true} t={t} />
                <EditableSection title={t.home.hobbies} content={data.hobbies} onSave={(content) => handleSave('hobbies', content)} isAdmin={isAdmin} isList={true} t={t} />
                <div className="md:col-span-2">
                     <EditableSection title={t.home.goals} content={data.goals} onSave={(content) => handleSave('goals', content)} isAdmin={isAdmin} isList={true} t={t} />
                </div>
            </div>
        </div>
    );
};

export default HomePage;