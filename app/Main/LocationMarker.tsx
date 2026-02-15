// app/Main/LocationMarker.tsx
'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { writeClient } from '@/sanity/lib/write-client';

const LocationMarker = () => {
    const [status, setStatus] = useState('Tap below to use your current location');
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [name, setName] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false);

    const getLocation = () => {
        if (!navigator.geolocation) {
            setStatus('Geolocation not supported');
            return;
        }

        setStatus('Getting location...');

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
                setStatus('Location captured');
                setShowModal(true);
            },
            (error) => {
                setStatus(`Error: ${error.message}`);
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!latitude || !longitude || !name.trim()) {
            setMessage('Enter name and capture location.');
            return;
        }
        {/**/}

        setIsSubmitting(true);
        setMessage('');

        try {
            let iconReference = undefined;

            if (imageFile) {
                const asset = await writeClient.assets.upload('image', imageFile, {
                    filename: imageFile.name,
                    contentType: imageFile.type,
                });

                iconReference = {
                    _type: 'image',
                    asset: {
                        _type: 'reference',
                        _ref: asset._id,
                    },
                };
            }

            const doc = {
                _type: 'restaurant',
                name: name.trim(),
                latitude,
                longitude,
                ...(iconReference && { icon: iconReference }),
            };

            const result = await writeClient.create(doc);

            setMessage(`Saved successfully`);
            setName('');
            setImageFile(null);
            setLatitude(null);
            setLongitude(null);
            setStatus('Tap below to use your current location');
            setShowModal(false);
        } catch (err: any) {
            setMessage(err.message || 'Something went wrong');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-6">

            {/* Main Screen */}
            <div className="w-full max-w-sm text-center space-y-6">
                <h1 className="text-xl font-semibold text-gray-900">
                    Add Location
                </h1>

                <p className="text-sm text-gray-500">{status}</p>

                <button
                    onClick={getLocation}
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-black text-white font-medium active:scale-[0.98] transition disabled:opacity-50"
                >
                    Use Current Location
                </button>
            </div>

            {/* Bottom Sheet Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/30 flex items-end justify-center">

                    <div className="w-full max-w-md bg-white rounded-t-3xl p-6 space-y-6 animate-slideUp">

                        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto" />

                        <h2 className="text-lg font-medium text-gray-900">
                            Restaurant Details
                        </h2>

                        {latitude && longitude && (
                            <div className="text-center text-xs text-gray-400 font-mono space-y-1">
                                <p>Lat {latitude.toFixed(6)}</p>
                                <p>Lng {longitude.toFixed(6)}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">

                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Restaurant name"
                                className="w-full border-b border-gray-300 focus:border-black outline-none py-3 text-base"
                                required
                            />

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="text-sm text-gray-500"
                            />

                            {imageFile && (
                                <p className="text-xs text-gray-400">
                                    {imageFile.name}
                                </p>
                            )}

                            {message && (
                                <p className="text-sm text-red-500">{message}</p>
                            )}

                            <div className="flex gap-4 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 py-3 rounded-xl bg-black text-white disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Saving...' : 'Save'}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}

            {/* Animation */}
            <style jsx>{`
        .animate-slideUp {
          animation: slideUp 0.25s ease-out;
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>

        </div>
    );
};

export default LocationMarker;
