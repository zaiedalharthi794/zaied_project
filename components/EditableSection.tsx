
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
        <div className="bg-card text-card-foreground p-6 rounded-xl shadow-lg border border-border hover:shadow-primary/10 transition-shadow duration-300 relative">
            <h3 className="text-2xl font-bold text-foreground mb-4">{title}</h3>
            {isAdmin && !isEditing && (
                <button onClick={() => setIsEditing(true)} className="absolute top-4 ltr:right-4 rtl:left-4 p-2 rounded-full text-muted-foreground bg-secondary hover:bg-primary/10 transition-colors" title={t.admin.edit}>
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
                                    className="w-full bg-secondary text-foreground p-2 rounded border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                                />
                                <button onClick={() => handleRemoveItem(index)} className="p-2 bg-destructive rounded hover:bg-destructive/90 text-destructive-foreground" title={t.admin.removeItem}>
                                    <TrashIcon className="w-5 h-5" />
                                    <span className="sr-only">{t.admin.removeItem}</span>
                                </button>
                            </div>
                        ))}
                        <button onClick={handleAddItem} className="mt-2 flex items-center gap-2 px-3 py-1 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">
                            <PlusIcon className="w-5 h-5" />
                            {t.admin.addItem}
                        </button>
                    </div>
                ) : (
                    <textarea
                        value={currentContent as string}
                        onChange={(e) => setCurrentContent(e.target.value)}
                        className="w-full h-40 bg-secondary text-foreground p-2 rounded border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                )
            ) : (
                isList && Array.isArray(content) ? (
                    <ul className="list-disc ltr:pl-5 rtl:pr-5 space-y-2 text-muted-foreground marker:text-primary">
                        {content.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                ) : (
                    <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">{content}</p>
                )
            )}
        </div>
    );
};

export default EditableSection;