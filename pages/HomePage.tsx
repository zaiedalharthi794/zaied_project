
import React, { useState, useRef } from 'react';
import { PortfolioData, Translation } from '../types';
import EditableSection from '../components/EditableSection';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
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

        setIsUploading(true);
        try {
            const storageRef = ref(storage, `avatars/avatar_${Date.now()}`);
            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);
            
            setData(prevData => ({
                ...prevData,
                studentInfo: {
                    ...prevData.studentInfo,
                    avatarUrl: downloadURL
                }
            }));
        } catch (error) {
            console.error("Error uploading avatar: ", error);
            alert("Failed to upload image.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <header className="text-center mb-16 py-10 bg-white dark:bg-gray-800/50 rounded-2xl shadow-sm">
                <div className={`relative inline-block p-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full ${isAdmin ? 'cursor-pointer' : ''}`} onClick={handleAvatarClick}>
                  <img src={data.studentInfo.avatarUrl} alt="Graduate Avatar" className="h-40 w-40 rounded-full object-cover border-4 border-white dark:border-gray-800" />
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
                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mt-4">{t.home.welcome}</h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mt-2">{t.home.student}: {data.studentInfo.name}</p>
                 <div className="mt-4 text-gray-500 dark:text-gray-400 flex justify-center items-center gap-4 flex-wrap">
                    <span>{data.studentInfo.grade} - {data.studentInfo.school}</span>
                    <span className="text-gray-300 dark:text-gray-600 hidden sm:inline">•</span>
                    <a href={`mailto:${data.studentInfo.email}`} className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">{data.studentInfo.email}</a>
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