import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, MapPin, Shield, Bell, Globe } from 'lucide-react';

const Profile = () => {
    const { currentUser, updateProfile, updatePreferences } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        name: currentUser.name,
        email: currentUser.email,
        phone: currentUser.phone,
        address: currentUser.address
    });
    const [preferences, setPreferences] = useState(currentUser.preferences);

    const handleProfileUpdate = () => {
        if (updateProfile(profileData)) {
            setIsEditing(false);
        }
    };

    const handlePreferencesUpdate = (key, value) => {
        const updatedPreferences = { ...preferences, [key]: value };
        if (updatePreferences(updatedPreferences)) {
            setPreferences(updatedPreferences);
        }
    };

    return (
        <div className="grid gap-6">
            <h2 className="text-3xl font-bold">Profile</h2>

            <div className="grid gap-6">
                {/* Personal Information */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <User className="mr-2" /> Personal Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {isEditing ? (
                                <>
                                    <div>
                                        <Label>Full Name</Label>
                                        <Input
                                            value={profileData.name}
                                            onChange={(e) => setProfileData({
                                                ...profileData,
                                                name: e.target.value
                                            })}
                                        />
                                    </div>
                                    <div>
                                        <Label>Email</Label>
                                        <Input
                                            value={profileData.email}
                                            onChange={(e) => setProfileData({
                                                ...profileData,
                                                email: e.target.value
                                            })}
                                        />
                                    </div>
                                    <div>
                                        <Label>Phone</Label>
                                        <Input
                                            value={profileData.phone}
                                            onChange={(e) => setProfileData({
                                                ...profileData,
                                                phone: e.target.value
                                            })}
                                        />
                                    </div>
                                    <div>
                                        <Label>Address</Label>
                                        <Input
                                            value={profileData.address}
                                            onChange={(e) => setProfileData({
                                                ...profileData,
                                                address: e.target.value
                                            })}
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex items-center">
                                        <User className="w-5 h-5 mr-2 text-gray-500" />
                                        <div>
                                            <div className="font-medium">{currentUser.name}</div>
                                            <div className="text-sm text-gray-500">Full Name</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <Mail className="w-5 h-5 mr-2 text-gray-500" />
                                        <div>
                                            <div className="font-medium">{currentUser.email}</div>
                                            <div className="text-sm text-gray-500">Email</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <Phone className="w-5 h-5 mr-2 text-gray-500" />
                                        <div>
                                            <div className="font-medium">{currentUser.phone}</div>
                                            <div className="text-sm text-gray-500">Phone</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <MapPin className="w-5 h-5 mr-2 text-gray-500" />
                                        <div>
                                            <div className="font-medium">{currentUser.address}</div>
                                            <div className="text-sm text-gray-500">Address</div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter>
                        {isEditing ? (
                            <div className="space-x-2">
                                <Button onClick={handleProfileUpdate}>Save Changes</Button>
                                <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                            </div>
                        ) : (
                            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                        )}
                    </CardFooter>
                </Card>

                {/* Preferences */}
                <Card>
                    <CardHeader>
                        <CardTitle>Preferences</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <Bell className="w-5 h-5 mr-2 text-gray-500" />
                                    <div>
                                        <div className="font-medium">Notifications</div>
                                        <div className="text-sm text-gray-500">Receive email notifications</div>
                                    </div>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={preferences.notifications}
                                    onChange={(e) => handlePreferencesUpdate('notifications', e.target.checked)}
                                    className="toggle"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <Shield className="w-5 h-5 mr-2 text-gray-500" />
                                    <div>
                                        <div className="font-medium">Two-Factor Auth</div>
                                        <div className="text-sm text-gray-500">Enhanced account security</div>
                                    </div>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={preferences.twoFactorAuth}
                                    onChange={(e) => handlePreferencesUpdate('twoFactorAuth', e.target.checked)}
                                    className="toggle"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <Globe className="w-5 h-5 mr-2 text-gray-500" />
                                    <div>
                                        <div className="font-medium">Language</div>
                                        <select
                                            value={preferences.language}
                                            onChange={(e) => handlePreferencesUpdate('language', e.target.value)}
                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        >
                                            <option value="English">English</option>
                                            <option value="Spanish">Spanish</option>
                                            <option value="French">French</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Profile; 