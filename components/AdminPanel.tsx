
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Trash2, Edit2, Save, Lock, Eye, EyeOff, GripVertical, Upload, Image, Download, FolderUp } from 'lucide-react';
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
    const [isDragging, setIsDragging] = useState(false);
    const [uploadProgress, setUploadProgress] = useState<number | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            // Load saved images from localStorage, fall back to props
            const savedImages = localStorage.getItem('gibbs-fleet-images');
            if (savedImages) {
                try {
                    const parsed = JSON.parse(savedImages);
                    if (Array.isArray(parsed) && parsed.length > 0) {
                        setImages(parsed);
                        return;
                    }
                } catch (e) {
                    console.log('Using default images');
                }
            }
            setImages(currentImages);
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
        const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || '$R1yamahar1$';
        if (password === adminPassword) {
            setAuthenticated(true);
            setError('');
        } else {
            setError('Invalid password');
        }
    };

    // Compress and resize image to reduce file size
    const compressImage = (file: File, maxWidth = 1200, quality = 0.7): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                const img = new window.Image();
                img.src = e.target?.result as string;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;

                    // Resize if larger than maxWidth
                    if (width > maxWidth) {
                        height = (height * maxWidth) / width;
                        width = maxWidth;
                    }

                    canvas.width = width;
                    canvas.height = height;

                    const ctx = canvas.getContext('2d');
                    if (!ctx) {
                        reject(new Error('Could not get canvas context'));
                        return;
                    }

                    ctx.drawImage(img, 0, 0, width, height);

                    // Convert to JPEG with compression
                    const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
                    resolve(compressedBase64);
                };
                img.onerror = () => reject(new Error('Failed to load image'));
            };
            reader.onerror = () => reject(new Error('Failed to read file'));
        });
    };

    // Handle file upload (single or multiple) with compression
    const handleFileUpload = async (files: FileList | null) => {
        if (!files || files.length === 0) return;

        setUploadProgress(0);
        setError('');
        const newImages: GalleryImage[] = [];
        const totalFiles = files.length;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (!file.type.startsWith('image/')) {
                setError(`${file.name} is not an image file`);
                continue;
            }

            try {
                // Compress image to reduce size (max 1200px wide, 70% quality)
                const compressedBase64 = await compressImage(file, 1200, 0.7);
                const title = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
                newImages.push({
                    url: compressedBase64,
                    title: title.charAt(0).toUpperCase() + title.slice(1)
                });
                setUploadProgress(Math.round(((i + 1) / totalFiles) * 100));
            } catch (err) {
                setError(`Failed to upload ${file.name}`);
            }
        }

        if (newImages.length > 0) {
            setImages(prev => [...prev, ...newImages]);
            setSuccess(`${newImages.length} image${newImages.length > 1 ? 's' : ''} uploaded & compressed!`);
            setTimeout(() => setSuccess(''), 3000);
        }
        setUploadProgress(null);
    };

    // Drag and drop handlers
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        handleFileUpload(e.dataTransfer.files);
    };

    const handleAddImage = () => {
        const newImage: GalleryImage = {
            url: '',
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

    // Handle single image file upload in edit mode (with compression)
    const handleEditFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const compressedBase64 = await compressImage(file, 1200, 0.7);
            setEditUrl(compressedBase64);
            const title = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
            setEditTitle(title.charAt(0).toUpperCase() + title.slice(1));
        } catch (err) {
            setError('Failed to upload image');
        }
    };

    const handleSaveAll = async () => {
        setError('');
        try {
            const jsonData = JSON.stringify(images);

            // Check estimated size (localStorage limit is ~5MB)
            const sizeInMB = new Blob([jsonData]).size / (1024 * 1024);
            if (sizeInMB > 4.5) {
                setError(`Data too large (${sizeInMB.toFixed(1)}MB). Try using smaller images or fewer uploads. Max ~4.5MB.`);
                return;
            }

            // Save to localStorage for persistence
            localStorage.setItem('gibbs-fleet-images', jsonData);

            // Update parent component
            onUpdate(images);

            setSuccess(`Saved! ${images.length} images (${sizeInMB.toFixed(2)}MB). Refresh page to see changes in gallery.`);
            setTimeout(() => setSuccess(''), 5000);
        } catch (err: any) {
            console.error('Save error:', err);
            if (err.name === 'QuotaExceededError') {
                setError('Storage quota exceeded. Try removing some images or using smaller files.');
            } else {
                setError(`Failed to save: ${err.message || 'Unknown error'}`);
            }
        }
    };

    // Export configuration as JSON
    const handleExportConfig = () => {
        const config = {
            images: images.map(img => ({
                url: img.url.startsWith('data:') ? '[BASE64_IMAGE]' : img.url,
                title: img.title
            }))
        };
        const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'fleet-data.json';
        a.click();
        URL.revokeObjectURL(url);
        setSuccess('Configuration exported!');
        setTimeout(() => setSuccess(''), 3000);
    };

    const moveImage = (fromIndex: number, direction: 'up' | 'down') => {
        const toIndex = direction === 'up' ? fromIndex - 1 : fromIndex + 1;
        if (toIndex < 0 || toIndex >= images.length) return;

        const newImages = [...images];
        [newImages[fromIndex], newImages[toIndex]] = [newImages[toIndex], newImages[fromIndex]];
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

                            {/* Upload Progress */}
                            {uploadProgress !== null && (
                                <div className="mb-4 p-4 bg-blue-900/50 border border-blue-600 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1 bg-zinc-700 rounded-full h-2">
                                            <div
                                                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${uploadProgress}%` }}
                                            />
                                        </div>
                                        <span className="text-blue-400 text-sm">{uploadProgress}%</span>
                                    </div>
                                </div>
                            )}

                            {/* Drag & Drop Upload Zone */}
                            <div
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                                className={`mb-6 border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
                                    isDragging
                                        ? 'border-red-500 bg-red-900/20'
                                        : 'border-zinc-700 hover:border-red-600 hover:bg-zinc-800/50'
                                }`}
                            >
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={(e) => handleFileUpload(e.target.files)}
                                    className="hidden"
                                />
                                <FolderUp className="mx-auto text-zinc-500 mb-4" size={48} />
                                <p className="text-white font-bold text-lg mb-2">
                                    {isDragging ? 'Drop images here!' : 'Drag & Drop Images Here'}
                                </p>
                                <p className="text-zinc-500 text-sm">
                                    or click to select files • Supports JPG, PNG, WebP • Multiple files allowed
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-4 mb-6">
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="flex items-center gap-2 px-6 py-3 bg-blue-700 hover:bg-blue-600 text-white rounded-lg font-bold uppercase tracking-wider transition-colors"
                                >
                                    <Upload size={20} /> Upload Images
                                </button>
                                <button
                                    onClick={handleAddImage}
                                    className="flex items-center gap-2 px-6 py-3 bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg font-bold uppercase tracking-wider transition-colors"
                                >
                                    <Plus size={20} /> Add URL
                                </button>
                                <button
                                    onClick={handleSaveAll}
                                    className="flex items-center gap-2 px-6 py-3 bg-green-700 hover:bg-green-600 text-white rounded-lg font-bold uppercase tracking-wider transition-colors"
                                >
                                    <Save size={20} /> Save All
                                </button>
                                <button
                                    onClick={handleExportConfig}
                                    className="flex items-center gap-2 px-6 py-3 bg-purple-700 hover:bg-purple-600 text-white rounded-lg font-bold uppercase tracking-wider transition-colors"
                                >
                                    <Download size={20} /> Export Config
                                </button>
                            </div>

                            {/* Images Count */}
                            <div className="mb-4 text-zinc-400 text-sm">
                                {images.length} image{images.length !== 1 ? 's' : ''} in gallery
                            </div>

                            {/* Images Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {images.map((image, index) => (
                                    <div
                                        key={index}
                                        className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 hover:border-red-600/50 transition-colors"
                                    >
                                        {editingIndex === index ? (
                                            // Edit Mode
                                            <div className="space-y-4">
                                                <div className="flex gap-4">
                                                    <div className="w-32 h-24 bg-zinc-700 rounded overflow-hidden flex-shrink-0">
                                                        {editUrl ? (
                                                            <img src={editUrl} alt="Preview" className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center">
                                                                <Image className="text-zinc-600" size={32} />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 space-y-2">
                                                        <label className="block">
                                                            <span className="text-zinc-400 text-xs uppercase tracking-wider">Upload New Image</span>
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={handleEditFileUpload}
                                                                className="mt-1 block w-full text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-red-700 file:text-white hover:file:bg-red-600 cursor-pointer"
                                                            />
                                                        </label>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-zinc-400 text-xs mb-1 uppercase tracking-wider">Or Enter URL</label>
                                                    <input
                                                        type="text"
                                                        value={editUrl}
                                                        onChange={(e) => setEditUrl(e.target.value)}
                                                        placeholder="https://example.com/image.jpg or /images/truck.jpg"
                                                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded text-white text-sm focus:outline-none focus:border-red-600"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-zinc-400 text-xs mb-1 uppercase tracking-wider">Image Title</label>
                                                    <input
                                                        type="text"
                                                        value={editTitle}
                                                        onChange={(e) => setEditTitle(e.target.value)}
                                                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded text-white text-sm focus:outline-none focus:border-red-600"
                                                    />
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={handleSaveEdit}
                                                        className="flex items-center gap-2 px-4 py-2 bg-green-700 hover:bg-green-600 text-white rounded font-bold text-sm transition-colors"
                                                    >
                                                        <Save size={14} /> Save
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingIndex(null)}
                                                        className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded font-bold text-sm transition-colors"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            // View Mode
                                            <div className="flex items-center gap-4">
                                                <div className="flex flex-col gap-1">
                                                    <button
                                                        onClick={() => moveImage(index, 'up')}
                                                        disabled={index === 0}
                                                        className="p-1 text-zinc-600 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                                                    >
                                                        ▲
                                                    </button>
                                                    <button
                                                        onClick={() => moveImage(index, 'down')}
                                                        disabled={index === images.length - 1}
                                                        className="p-1 text-zinc-600 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                                                    >
                                                        ▼
                                                    </button>
                                                </div>
                                                <div className="w-24 h-16 bg-zinc-700 rounded overflow-hidden flex-shrink-0">
                                                    {image.url ? (
                                                        <img
                                                            src={image.url}
                                                            alt={image.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center">
                                                            <Image className="text-zinc-600" size={24} />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-white font-bold text-sm truncate">{image.title}</h4>
                                                    <p className="text-zinc-500 text-xs truncate">
                                                        {image.url.startsWith('data:') ? '[Uploaded Image]' : image.url}
                                                    </p>
                                                </div>
                                                <div className="flex gap-2 flex-shrink-0">
                                                    <button
                                                        onClick={() => handleEditImage(index)}
                                                        className="p-2 bg-blue-700 hover:bg-blue-600 text-white rounded transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit2 size={14} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteImage(index)}
                                                        className="p-2 bg-red-700 hover:bg-red-600 text-white rounded transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {images.length === 0 && (
                                <div className="text-center py-12 text-zinc-500">
                                    <Image className="mx-auto mb-4" size={48} />
                                    <p className="text-lg">No images yet.</p>
                                    <p className="text-sm">Drag & drop images above or click "Upload Images" to get started.</p>
                                </div>
                            )}

                            {/* Instructions */}
                            <div className="mt-8 p-4 bg-zinc-800/50 rounded-lg border border-zinc-700">
                                <h4 className="text-white font-bold mb-2">Quick Tips:</h4>
                                <ul className="text-zinc-400 text-sm space-y-1">
                                    <li>• <strong>Drag & drop</strong> multiple images at once for bulk upload</li>
                                    <li>• <strong>Uploaded images</strong> are saved in your browser and persist across refreshes</li>
                                    <li>• <strong>Reorder</strong> images using the up/down arrows</li>
                                    <li>• <strong>Export Config</strong> to backup your gallery configuration</li>
                                    <li>• For permanent hosting, upload images to your GitHub repo's <code className="bg-zinc-900 px-1 rounded">/public/images/</code> folder</li>
                                </ul>
                            </div>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default AdminPanel;
