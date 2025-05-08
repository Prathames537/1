import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getUserProfile, updateUserProfile } from "@/features/user";
import { UserProfile } from "@/features/user/userTypes";

const UserProfilePage = () => {
  // TODO: Replace with real user ID from auth context
  const userId = "demo-user-id";
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [edit, setEdit] = useState<boolean>(false);
  const [form, setForm] = useState<Partial<UserProfile>>({});

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        await getUserProfile();
        setProfile(null);
        setForm({});
      } catch (err: any) {
        setError("Profile not available: " + (err?.message || 'Unknown error'));
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      await updateUserProfile();
      setEdit(false);
    } catch (err: any) {
      setError("Failed to update profile: " + (err?.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto py-12">
        <h1 className="text-3xl font-bold mb-6">User Profile</h1>
        <div className="text-red-600">Profile features are currently unavailable.</div>
      </main>
      <Footer />
    </div>
  );
};

export default UserProfilePage;
