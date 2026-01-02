"use client";

import React, { useState, useEffect } from "react";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit2, 
  Save, 
  X,
  Camera,
  Shield,
  Bell,
  Globe
} from "lucide-react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    address: "",
    dateOfBirth: "",
    bio: "",
    avatar: ""
  });

  const [originalData, setOriginalData] = useState({});

  // Fetch profile data on mount
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      // GET TOKEN FROM LOCALSTORAGE
      const token = localStorage.getItem("token");
      
      const response = await fetch("/api/profile", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
        setOriginalData(data);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      // GET TOKEN FROM LOCALSTORAGE
      const token = localStorage.getItem("token");
      
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(profileData)
      });

      if (response.ok) {
        const updatedData = await response.json();
        setProfileData(updatedData);
        setOriginalData(updatedData);
        setIsEditing(false);
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setProfileData(originalData);
    setIsEditing(false);
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("avatar", file);

      try {
        setLoading(true);
        // GET TOKEN FROM LOCALSTORAGE
        const token = localStorage.getItem("token");
        
        const response = await fetch("/api/profile/avatar", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`
          },
          body: formData
        });

        if (response.ok) {
          const data = await response.json();
          setProfileData(prev => ({ ...prev, avatar: data.avatarUrl }));
          alert("Avatar updated successfully!");
        }
      } catch (error) {
        console.error("Error uploading avatar:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 p-1">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                  {profileData.avatar ? (
                    <img src={profileData.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-16 h-16 text-slate-400" />
                  )}
                </div>
              </div>
              <label className="absolute bottom-0 right-0 bg-emerald-500 p-2 rounded-full cursor-pointer hover:bg-emerald-600 transition-colors">
                <Camera className="w-4 h-4 text-white" />
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleAvatarChange}
                  disabled={loading}
                />
              </label>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-white mb-2">
                {profileData.firstName} {profileData.lastName}
              </h1>
              <p className="text-slate-400 mb-4">{profileData.email}</p>
              <p className="text-slate-300 text-sm">{profileData.bio || "No bio added yet"}</p>
            </div>

            {/* Edit Button */}
            <div>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-all disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-all"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Personal Information</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">First Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleInputChange}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-emerald-500 transition-colors"
                />
              ) : (
                <div className="flex items-center gap-2 text-white">
                  <User className="w-4 h-4 text-slate-400" />
                  {profileData.firstName || "Not set"}
                </div>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Last Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleInputChange}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-emerald-500 transition-colors"
                />
              ) : (
                <div className="flex items-center gap-2 text-white">
                  <User className="w-4 h-4 text-slate-400" />
                  {profileData.lastName || "Not set"}
                </div>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
              <div className="flex items-center gap-2 text-white">
                <Mail className="w-4 h-4 text-slate-400" />
                {profileData.email || "Not set"}
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Phone</label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-emerald-500 transition-colors"
                />
              ) : (
                <div className="flex items-center gap-2 text-white">
                  <Phone className="w-4 h-4 text-slate-400" />
                  {profileData.phone || "Not set"}
                </div>
              )}
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Country</label>
              {isEditing ? (
                <input
                  type="text"
                  name="country"
                  value={profileData.country}
                  onChange={handleInputChange}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-emerald-500 transition-colors"
                />
              ) : (
                <div className="flex items-center gap-2 text-white">
                  <Globe className="w-4 h-4 text-slate-400" />
                  {profileData.country || "Not set"}
                </div>
              )}
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">City</label>
              {isEditing ? (
                <input
                  type="text"
                  name="city"
                  value={profileData.city}
                  onChange={handleInputChange}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-emerald-500 transition-colors"
                />
              ) : (
                <div className="flex items-center gap-2 text-white">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  {profileData.city || "Not set"}
                </div>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Date of Birth</label>
              {isEditing ? (
                <input
                  type="date"
                  name="dateOfBirth"
                  value={profileData.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-emerald-500 transition-colors"
                />
              ) : (
                <div className="flex items-center gap-2 text-white">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  {profileData.dateOfBirth || "Not set"}
                </div>
              )}
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-400 mb-2">Address</label>
              {isEditing ? (
                <input
                  type="text"
                  name="address"
                  value={profileData.address}
                  onChange={handleInputChange}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-emerald-500 transition-colors"
                />
              ) : (
                <div className="flex items-center gap-2 text-white">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  {profileData.address || "Not set"}
                </div>
              )}
            </div>

            {/* Bio */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-400 mb-2">Bio</label>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-emerald-500 transition-colors resize-none"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-white">{profileData.bio || "Not set"}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}