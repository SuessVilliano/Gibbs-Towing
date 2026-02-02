
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Trash2, Edit2, Save, Lock, Eye, EyeOff, GripVertical } from 'lucide-react';
import { GalleryImage } from '../types';

interface AdminPanelProps {
    isOpen: boolean;
    onClose: () => void;
    onUpdate: (images: GalleryImage[]) => void;
    currentImages: GalleryImage[];
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose, onUpdate, currentImages }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [images, setImages] = useState<GalleryImage[]>(currentImages);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editUrl, setEditUrl] = useState('');
    const [editTitle, setEditTitle] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        setImages(currentImages);
    }, [currentImages]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            setAuthenticated(false);
            setPassword('');
            setError('');
            setSuccess('');
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleLogin = () => {
        // Password check with user's specified password
        const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || '$R1yamahar1$';
        if (password === adminPassword) {
            setAuthenticated(true);
            setError('');
        } else {
            setError('Invalid password');
        }
    };

    const handleAddImage = () => {
        const newImage: GalleryImage = {
            url: 'https://images.unsplash.com/photo-1605218427368-35b0185e4d2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            title: 'New Fleet Image'
        };
        setImages([...images, newImage]);
        setEditingIndex(images.length);
        setEditUrl(newImage.url);
        setEditTitle(newImage.title);
    };

    const handleDeleteImage = (index: number) => {
        if (confirm('Are you sure you want to delete this image?')) {
            const newImages = images.filter((_, i) => i !== index);
            setImages(newImages);
            setSuccess('Image deleted');
            setTimeout(() => setSuccess(''), 3000);
        }
    };

    const handleEditImage = (index: number) => {
        setEditingIndex(index);
        setEditUrl(images[index].url);
        setEditTitle(images[index].title);
    };

    const handleSaveEdit = () => {
        if (editingIndex !== null) {
            const newImages = [...images];
            newImages[editingIndex] = { url: editUrl, title: editTitle };
            setImages(newImages);
            setEditingIndex(null);
            setSuccess('Image updated');
            setTimeout(() => setSuccess(''), 3000);
        }
    };

    const handleSaveAll = async () => {
        try {
            // In a real implementation, this would save to a backend
            // For now, we'll just update the parent component
            onUpdate(images);
            setSuccess('All changes saved! Refresh the page to see updates.');
            setTimeout(() => setSuccess(''), 5000);
        } catch (err) {
            setError('Failed to save changes');
        }
    };

    const moveImage = (fromIndex: number, toIndex: number) => {
        const newImages = [...images];
        const [movedItem] = newImages.splice(fromIndex, 1);
        newImages.splice(toIndex, 0, movedItem);
        setImages(newImages);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[300] flex items-center justify-center bg-black/95 backdrop-blur-md overflow-hidden"
            >
                <div className="absolute inset-0" onClick={onClose} />

                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="relative z-10 w-full max-w-6xl max-h-[90vh] bg-zinc-900 rounded-lg shadow-2xl overflow-hidden"
                >
                    {/* Header */}
                    <div className="bg-red-700 p-6 flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-brand font-black text-white uppercase italic">Fleet Admin Panel</h2>
                            <p className="text-white/70 text-xs uppercase tracking-widest mt-1">Manage Fleet Gallery Images</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <X className="text-white" size={24} />
                        </button>
                    </div>

                    {!authenticated ? (
                        // Login Screen
                        <div className="p-12 flex flex-col items-center justify-center min-h-[400px]">
                            <Lock className="text-red-600 mb-6" size={64} />
                            <h3 className="text-2xl font-brand font-bold text-white mb-2">Admin Access Required</h3>
                            <p className="text-zinc-400 mb-8 text-center max-w-md">
                                Enter the admin password to manage fleet gallery images
                            </p>

                            <div className="w-full max-w-md space-y-4">
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                                        placeholder="Enter admin password"
                                        className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-red-600"
                                    />
                                    <button
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>

                                {error && (
                                    <p className="text-red-500 text-sm text-center">{error}</p>
                                )}

                                <button
                                    onClick={handleLogin}
                                    className="w-full bg-red-700 hover:bg-red-600 text-white py-3 rounded-lg font-bold uppercase tracking-wider transition-colors"
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                    ) : (
                        // Admin Interface
                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-88px)]">
                            {/* Success/Error Messages */}
                            {success && (
                                <div className="mb-4 p-4 bg-green-900/50 border border-green-600 rounded-lg text-green-400">
                                    {success}
                                </div>
                            )}
                            {error && (
                                <div className="mb-4 p-4 bg-red-900/50 border border-red-600 rounded-lg text-red-400">
                                    {error}
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex gap-4 mb-6">
                                <button
                                    onClick={handleAddImage}
                                    className="flex items-center gap-2 px-6 py-3 bg-red-700 hover:bg-red-600 text-white rounded-lg font-bold uppercase tracking-wider transition-colors"
                                >
                                    <Plus size={20} /> Add New Image
                                </button>
                                <button
                                    onClick={handleSaveAll}
                                    className="flex items-center gap-2 px-6 py-3 bg-green-700 hover:bg-green-600 text-white rounded-lg font-bold uppercase tracking-wider transition-colors"
                                >
                                    <Save size={20} /> Save All Changes
                                </button>
                            </div>

                            {/* Images List */}
                            <div className="space-y-4">
                                {images.map((image, index) => (
                                    <div
                                        key={index}
                                        className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 hover:border-red-600/50 transition-colors"
                                    >
                                        {editingIndex === index ? (
                                            // Edit Mode
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-zinc-400 text-sm mb-2 uppercase tracking-wider">Image URL</label>
                                                    <input
                                                        type="text"
                                                        value={editUrl}
                                                        onChange={(e) => setEditUrl(e.target.value)}
                                                        className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded text-white focus:outline-none focus:border-red-600"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-zinc-400 text-sm mb-2 uppercase tracking-wider">Image Title</label>
                                                    <input
                                                        type="text"
                                                        value={editTitle}
                                                        onChange={(e) => setEditTitle(e.target.value)}
                                                        className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded text-white focus:outline-none focus:border-red-600"
                                                    />
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={handleSaveEdit}
                                                        className="flex items-center gap-2 px-4 py-2 bg-green-700 hover:bg-green-600 text-white rounded font-bold transition-colors"
                                                    >
                                                        <Save size={16} /> Save
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingIndex(null)}
                                                        className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded font-bold transition-colors"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            // View Mode
                                            <div className="flex items-center gap-4">
                                                <div className="cursor-move text-zinc-600 hover:text-zinc-400">
                                                    <GripVertical size={20} />
                                                </div>
                                                <img
                                                    src={image.url}
                                                    alt={image.title}
                                                    className="w-32 h-20 object-cover rounded"
                                                />
                                                <div className="flex-1">
                                                    <h4 className="text-white font-bold">{image.title}</h4>
                                                    <p className="text-zinc-500 text-sm truncate">{image.url}</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleEditImage(index)}
                                                        className="p-2 bg-blue-700 hover:bg-blue-600 text-white rounded transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit2 size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteImage(index)}
                                                        className="p-2 bg-red-700 hover:bg-red-600 text-white rounded transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {images.length === 0 && (
                                <div className="text-center py-12 text-zinc-500">
                                    <p className="text-lg">No images yet. Click "Add New Image" to get started.</p>
                                </div>
                            )}
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default AdminPanel;
