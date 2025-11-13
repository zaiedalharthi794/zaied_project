
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
        <div className="bg-gray-800/50 p-6 rounded-lg shadow-lg border border-gray-700 relative">
            <h3 className="text-2xl font-bold text-red-500 mb-4">{title}</h3>
            {isAdmin && !isEditing && (
                <button onClick={() => setIsEditing(true)} className="absolute top-4 ltr:right-4 rtl:left-4 p-2 rounded-full bg-gray-700 hover:bg-red-800 transition-colors">
                    <EditIcon className="w-5 h-5" />
                    <span className="sr-only">{t.admin.edit}</span>
                </button>
            )}
            {isAdmin && isEditing && (
                <button onClick={handleSave} className="absolute top-4 ltr:right-4 rtl:left-4 p-2 rounded-full bg-green-700 hover:bg-green-600 transition-colors">
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
                                    className="w-full bg-gray-700 text-gray-200 p-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                                <button onClick={() => handleRemoveItem(index)} className="p-2 bg-red-800 rounded hover:bg-red-700">
                                    <TrashIcon className="w-5 h-5" />
                                    <span className="sr-only">{t.admin.removeItem}</span>
                                </button>
                            </div>
                        ))}
                        <button onClick={handleAddItem} className="mt-2 flex items-center gap-2 px-3 py-1 bg-blue-700 rounded hover:bg-blue-600 transition-colors">
                            <PlusIcon className="w-5 h-5" />
                            {t.admin.addItem}
                        </button>
                    </div>
                ) : (
                    <textarea
                        value={currentContent as string}
                        onChange={(e) => setCurrentContent(e.target.value)}
                        className="w-full h-40 bg-gray-700 text-gray-200 p-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                )
            ) : (
                isList && Array.isArray(content) ? (
                    <ul className="list-disc ltr:pl-5 rtl:pr-5 space-y-2 text-gray-300">
                        {content.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                ) : (
                    <p className="text-gray-300 whitespace-pre-wrap">{content}</p>
                )
            )}
        </div>
    );
};

export default EditableSection;
