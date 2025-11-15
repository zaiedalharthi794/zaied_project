
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

    const journeyItems = [
        { key: 'education', title: t.journey.education, content: data.education, isList: false },
        { key: 'selfReflection', title: t.journey.selfReflection, content: data.selfReflection, isList: false },
        { key: 'achievements', title: t.journey.achievements, content: data.achievements, isList: true },
        { key: 'projects', title: t.journey.projects, content: data.projects, isList: true },
        { key: 'volunteerWork', title: t.journey.volunteer, content: data.volunteerWork, isList: true },
    ];

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <header className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">{t.journey.title}</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 mt-2">{data.studentInfo.semester}</p>
            </header>

            <div className="max-w-3xl mx-auto">
                <div className="relative ltr:border-l-2 rtl:border-r-2 border-gray-200 dark:border-gray-700 ltr:ml-3 rtl:mr-3">
                    {journeyItems.map((item, index) => (
                        <div key={item.key} className={`mb-12 relative ${index === journeyItems.length - 1 ? 'last:mb-0' : ''}`}>
                            <div className="absolute w-6 h-6 bg-gray-50 dark:bg-gray-900 rounded-full ltr:-left-[25px] rtl:-right-[25px] top-1.5 border-4 border-amber-500"></div>
                            <div className="ltr:ml-10 rtl:mr-10">
                                <EditableSection 
                                    title={item.title} 
                                    content={item.content} 
                                    onSave={(content) => handleSave(item.key as keyof PortfolioData, content)} 
                                    isAdmin={isAdmin} 
                                    isList={item.isList} 
                                    t={t} 
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Gallery Section - outside the timeline */}
                <div className="mt-20">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200/80 dark:border-gray-700/60">
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">{t.journey.gallery}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {data.gallery.map((item) => (
                                <div key={item.id} className="group relative overflow-hidden rounded-lg shadow-md">
                                    <img src={item.imageUrl} alt={item.caption} className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <p className="text-white font-semibold">{item.caption}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AcademicJourneyPage;
