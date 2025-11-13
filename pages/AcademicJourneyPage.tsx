
import React from 'react';
import { PortfolioData, Translation } from '../types';
import EditableSection from '../components/EditableSection';

interface AcademicJourneyPageProps {
    data: PortfolioData;
    setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
    isAdmin: boolean;
    t: Translation;
}

const AcademicJourneyPage: React.FC<AcademicJourneyPageProps> = ({ data, setData, isAdmin, t }) => {
    
    const handleSave = (key: keyof PortfolioData, content: string | string[]) => {
        setData(prevData => ({ ...prevData, [key]: content }));
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <header className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white">{t.journey.title}</h1>
                <p className="text-xl text-gray-400 mt-2">{data.studentInfo.semester}</p>
            </header>

            <div className="space-y-8">
                <EditableSection title={t.journey.education} content={data.education} onSave={(content) => handleSave('education', content)} isAdmin={isAdmin} t={t} />
                <EditableSection title={t.journey.achievements} content={data.achievements} onSave={(content) => handleSave('achievements', content)} isAdmin={isAdmin} isList={true} t={t} />
                <EditableSection title={t.journey.projects} content={data.projects} onSave={(content) => handleSave('projects', content)} isAdmin={isAdmin} isList={true} t={t} />
                <EditableSection title={t.journey.volunteer} content={data.volunteerWork} onSave={(content) => handleSave('volunteerWork', content)} isAdmin={isAdmin} isList={true} t={t} />

                {/* Gallery Section */}
                <div className="bg-gray-800/50 p-6 rounded-lg shadow-lg border border-gray-700">
                    <h3 className="text-2xl font-bold text-red-500 mb-4">{t.journey.gallery}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.gallery.map((item) => (
                            <div key={item.id} className="group relative overflow-hidden rounded-lg shadow-md">
                                <img src={item.imageUrl} alt={item.caption} className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <p className="text-white font-semibold">{item.caption}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AcademicJourneyPage;
