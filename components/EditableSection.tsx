
import React, { useState, useEffect } from 'react';
import { Translation } from '../types';
import { EditIcon, SaveIcon, PlusIcon, TrashIcon } from './Icons';

interface EditableSectionProps {
    title: string;
    content: string | string[];
    onSave: (newContent: string | string[]) => void;
    isAdmin: boolean;
    isList?: boolean;
    t: Translation;
}

const EditableSection: React.FC<EditableSectionProps> = ({ title, content, onSave, isAdmin, isList = false, t }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [currentContent, setCurrentContent] = useState(content);

    useEffect(() => {
        setCurrentContent(content);
    }, [content]);

    const handleSave = () => {
        onSave(currentContent);
        setIsEditing(false);
    };

    const handleAddItem = () => {
        if (Array.isArray(currentContent)) {
            setCurrentContent([...currentContent, '']);
        }
    };

    const handleRemoveItem = (index: number) => {
        if (Array.isArray(currentContent)) {
            setCurrentContent(currentContent.filter((_, i) => i !== index));
        }
    };

    const handleItemChange = (index: number, value: string) => {
        if (Array.isArray(currentContent)) {
            const updatedList = [...currentContent];
            updatedList[index] = value;
            setCurrentContent(updatedList);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200/80 dark:border-gray-700/60 hover:shadow-amber-500/10 dark:hover:shadow-amber-400/10 transition-shadow duration-300 relative">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{title}</h3>
            {isAdmin && !isEditing && (
                <button onClick={() => setIsEditing(true)} className="absolute top-4 ltr:right-4 rtl:left-4 p-2 rounded-full text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-amber-100 dark:hover:bg-amber-800 transition-colors" title={t.admin.edit}>
                    <EditIcon className="w-5 h-5" />
                    <span className="sr-only">{t.admin.edit}</span>
                </button>
            )}
            {isAdmin && isEditing && (
                <button onClick={handleSave} className="absolute top-4 ltr:right-4 rtl:left-4 p-2 rounded-full bg-green-600 hover:bg-green-700 text-white transition-colors" title={t.admin.save}>
                    <SaveIcon className="w-5 h-5" />
                    <span className="sr-only">{t.admin.save}</span>
                </button>
            )}

            {isEditing ? (
                isList && Array.isArray(currentContent) ? (
                    <div className="space-y-3">
                        {currentContent.map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={item}
                                    onChange={(e) => handleItemChange(index, e.target.value)}
                                    className="w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 rounded border border-gray-300 dark:border-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                />
                                <button onClick={() => handleRemoveItem(index)} className="p-2 bg-red-600 rounded hover:bg-red-700 text-white" title={t.admin.removeItem}>
                                    <TrashIcon className="w-5 h-5" />
                                    <span className="sr-only">{t.admin.removeItem}</span>
                                </button>
                            </div>
                        ))}
                        <button onClick={handleAddItem} className="mt-2 flex items-center gap-2 px-3 py-1 bg-amber-600 dark:bg-amber-700 text-white rounded hover:bg-amber-700 dark:hover:bg-amber-600 transition-colors">
                            <PlusIcon className="w-5 h-5" />
                            {t.admin.addItem}
                        </button>
                    </div>
                ) : (
                    <textarea
                        value={currentContent as string}
                        onChange={(e) => setCurrentContent(e.target.value)}
                        className="w-full h-40 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 rounded border border-gray-300 dark:border-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                )
            ) : (
                isList && Array.isArray(content) ? (
                    <ul className="list-disc ltr:pl-5 rtl:pr-5 space-y-2 text-gray-600 dark:text-gray-300 marker:text-amber-500">
                        {content.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                ) : (
                    <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">{content}</p>
                )
            )}
        </div>
    );
};

export default EditableSection;
