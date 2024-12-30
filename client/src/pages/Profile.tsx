import { useProfile } from "../hooks/useProfile";
import ProfileHeader from "../components/profile/ProfileHeader";
import UserApplications from "../components/profile/UserApplications";
import UserEnquiries from "../components/profile/UserEnquiries";
import { AlertCircle, Loader } from "lucide-react";
import LogoutButton from "@/components/profile/LogoutButton";
import UserWorkshops from "@/components/profile/UserWorkshops";

export default function Profile() {
  const { profile, loading, error, refetch } = useProfile();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={refetch}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Profile</h1>
        <LogoutButton />
      </div>
      <ProfileHeader profile={profile?.user!} />
      <div className="grid grid-cols-1 gap-6 mt-6">
      <UserWorkshops registrations={profile?.workshopRegistrations!} />
        <UserApplications applications={profile?.applications!} />
        <UserEnquiries enquiries={profile?.enquiries!} />
      </div>
    </div>
  );
}
