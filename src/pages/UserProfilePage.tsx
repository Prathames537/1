// import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const UserProfilePage = () => {
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
