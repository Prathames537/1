import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// TODO: Connect to Firestore or notification service
const NotificationsPage = () => {
  // Placeholder notifications
  const notifications = [
    { id: 1, message: "Your appointment is tomorrow at 10:00 AM." },
    { id: 2, message: "Time to refill your medicine prescription." },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto py-12">
        <h1 className="text-3xl font-bold mb-6">Notifications</h1>
        <ul className="space-y-4 max-w-lg">
          {notifications.map(n => (
            <li key={n.id} className="bg-white p-4 rounded shadow">
              {n.message}
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
};

export default NotificationsPage;
