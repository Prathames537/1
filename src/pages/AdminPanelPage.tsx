import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// TODO: Add real admin features and authentication checks
const AdminPanelPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto py-12">
        <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
        <div className="space-y-4 max-w-lg">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Manage Tutorials</h2>
            <p>Feature coming soon: Add/Edit/Delete tutorial content.</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Manage Users</h2>
            <p>Feature coming soon: View and manage user accounts.</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Manage Appointments</h2>
            <p>Feature coming soon: View and manage appointments.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPanelPage;
