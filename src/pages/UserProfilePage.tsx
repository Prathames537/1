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
        const data = await getUserProfile(userId);
        if (data) {
          setProfile(data);
          setForm(data);
        }
      } catch (err: any) {
        setError("Failed to load profile: " + (err?.message || 'Unknown error'));
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      await updateUserProfile(userId, form);
      setProfile((prev) => ({ ...prev, ...form } as UserProfile));
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
        {edit ? (
          <div className="space-y-4 max-w-md">
            <input name="name" value={form.name || ""} onChange={handleChange} placeholder="Name" className="input" />
            <input name="email" value={form.email || ""} onChange={handleChange} placeholder="Email" className="input" />
            <input name="phone" value={form.phone || ""} onChange={handleChange} placeholder="Phone" className="input" />
            <button onClick={handleSave} className="btn btn-primary">Save</button>
            <button onClick={() => setEdit(false)} className="btn btn-secondary">Cancel</button>
          </div>
        ) : (
          <div className="space-y-2 max-w-md">
            <div><strong>Name:</strong> {profile?.name}</div>
            <div><strong>Email:</strong> {profile?.email}</div>
            <div><strong>Phone:</strong> {profile?.phone}</div>
            <button onClick={() => setEdit(true)} className="btn btn-primary mt-4">Edit</button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default UserProfilePage;
