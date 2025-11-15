
import React, { useState, useRef } from 'react';
import { PortfolioData, Translation } from '../types';
import EditableSection from '../components/EditableSection';
import { storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject, UploadTaskSnapshot } from 'firebase/storage';
import { PlusIcon, TrashIcon, BookOpenIcon, LightbulbIcon, TrophyIcon, CodeBracketIcon, HeartIcon } from '../components/Icons';

interface AcademicJourneyPageProps {
    data: PortfolioData;
    setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
    isAdmin: boolean;
    t: Translation;
}

const AcademicJourneyPage: React.FC<AcademicJourneyPageProps> = ({ data, setData, isAdmin, t }) => {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSave = (key: keyof PortfolioData, content: string | string[]) => {
        setData(prevData => ({ ...prevData, [key]: content }));
    };
    
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const caption = prompt("Enter a caption for the new image:");
        if (caption === null) {
            if(fileInputRef.current) fileInputRef.current.value = "";
            return; 
        };

        const storageRef = ref(storage, `gallery/${file.name}_${Date.now()}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot: UploadTaskSnapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
                if (!isUploading) setIsUploading(true);
            },
            (error) => {
                console.error("Error uploading image: ", error);
                alert("Failed to upload image.");
                setIsUploading(false);
                setUploadProgress(0);
                if(fileInputRef.current) fileInputRef.current.value = "";
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    const newImage = {
                        id: Date.now(),
                        imageUrl: downloadURL,
                        caption: caption || "New Image",
                    };

                    setData(prevData => ({
                        ...prevData,
                        gallery: [...(prevData.gallery || []), newImage]
                    }));

                    setIsUploading(false);
                    setUploadProgress(0);
                    if(fileInputRef.current) fileInputRef.current.value = "";
                });
            }
        );
    };

    const handleImageDelete = async (imageId: number, imageUrl: string) => {
        if (!window.confirm("Are you sure you want to delete this image?")) return;

        try {
            // Delete from Storage
            const imageRef = ref(storage, imageUrl);
            await deleteObject(imageRef);

            // Delete from Firestore (by updating state)
            setData(prevData => ({
                ...prevData,
                gallery: prevData.gallery.filter(item => item.id !== imageId)
            }));
        } catch (error) {
            console.error("Error deleting image: ", error);
            // If it fails because the file does not exist, we can still remove it from the list
             if ((error as any).code === 'storage/object-not-found') {
                setData(prevData => ({
                    ...prevData,
                    gallery: prevData.gallery.filter(item => item.id !== imageId)
                }));
             } else {
                alert("Failed to delete image.");
             }
        }
    };

    const journeyItems = [
        { key: 'education', title: t.journey.education, content: data.education, isList: false, icon: BookOpenIcon },
        { key: 'selfReflection', title: t.journey.selfReflection, content: data.selfReflection, isList: false, icon: LightbulbIcon },
        { key: 'achievements', title: t.journey.achievements, content: data.achievements, isList: true, icon: TrophyIcon },
        { key: 'projects', title: t.journey.projects, content: data.projects, isList: true, icon: CodeBracketIcon },
        { key: 'volunteerWork', title: t.journey.volunteer, content: data.volunteerWork, isList: true, icon: HeartIcon },
    ];

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <header className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">{t.journey.title}</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 mt-2">{data.studentInfo.semester}</p>
            </header>

            <div className="max-w-4xl mx-auto">
                 <div className="relative ltr:border-l-4 rtl:border-r-4 border-amber-200 dark:border-amber-900 space-y-16">
                    {journeyItems.map((item) => (
                        <div key={item.key} className="relative ltr:pl-12 rtl:pr-12">
                            <div className="absolute ltr:-left-7 rtl:-right-7 top-0 flex items-center justify-center w-14 h-14 bg-white dark:bg-gray-800 rounded-full ring-4 ring-amber-500">
                                <item.icon className="w-7 h-7 text-amber-600 dark:text-amber-400" />
                            </div>
                            <div>
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

                <div className="mt-20">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200/80 dark:border-gray-700/60">
                        <div className="flex justify-center items-center mb-6">
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white text-center">{t.journey.gallery}</h3>
                        </div>
                         {isAdmin && (
                            <div className="mb-6 text-center">
                                <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={isUploading}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 dark:bg-amber-700 text-white rounded-lg hover:bg-amber-700 dark:hover:bg-amber-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    <PlusIcon className="w-5 h-5" />
                                    {t.admin.upload}
                                </button>
                                {isUploading && (
                                    <div className="mt-4 w-full max-w-xs mx-auto">
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                            <div 
                                                className="bg-amber-600 h-2.5 rounded-full transition-all duration-150" 
                                                style={{ width: `${uploadProgress}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{Math.round(uploadProgress)}%</p>
                                    </div>
                                )}
                            </div>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {data.gallery.map((item) => (
                                <div key={item.id} className="group relative overflow-hidden rounded-lg shadow-md">
                                    <img src={item.imageUrl} alt={item.caption} className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <p className="text-white font-semibold">{item.caption}</p>
                                    </div>
                                    {isAdmin && (
                                        <button 
                                            onClick={() => handleImageDelete(item.id, item.imageUrl)}
                                            className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                                            title={t.admin.deleteItem}
                                        >
                                           <TrashIcon className="w-5 h-5" />
                                        </button>
                                    )}
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
