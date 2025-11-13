
import React from 'react';
import { PortfolioData, Translation } from '../types';
import EditableSection from '../components/EditableSection';

interface HomePageProps {
    data: PortfolioData;
    setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
    isAdmin: boolean;
    t: Translation;
}

const HomePage: React.FC<HomePageProps> = ({ data, setData, isAdmin, t }) => {
    
    const handleSave = (key: keyof PortfolioData, content: string | string[]) => {
        setData(prevData => ({ ...prevData, [key]: content }));
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <header className="text-center mb-12">
                <div className="inline-block p-1 bg-gradient-to-r from-red-700 to-red-900 rounded-full">
                  <img src="https://i.ibb.co/68v0Kk1/graduate-avatar.png" alt="Graduate Avatar" className="h-40 w-40 rounded-full object-cover border-4 border-gray-800" />
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-4">{t.home.welcome}</h1>
                <p className="text-xl text-gray-400 mt-2">{t.home.student}: {data.studentInfo.name}</p>
                 <div className="mt-4 text-gray-400 flex justify-center items-center gap-4">
                    <span>{data.studentInfo.grade} - {data.studentInfo.school}</span>
                    <span className="text-red-500">•</span>
                    <a href={`mailto:${data.studentInfo.email}`} className="hover:text-red-500 transition-colors">{data.studentInfo.email}</a>
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
