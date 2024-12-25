import { User } from '@/types';

interface ProfileHeaderProps {
  profile: User;
}

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <div className="bg-background border text-center  rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center space-x-6">
        <div>
          <h1 className="text-2xl font-bold">{profile.name}</h1>
          <p className="text-gray-600">{profile.email}</p>
          {/* {profile.location && (
            <div className="flex items-center text-gray-600 mt-2">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{profile.location}</span>
            </div>
          )} */}
          {/* <div className="flex items-center text-gray-600 mt-1">
            <Calendar className="w-4 h-4 mr-1" />
            <span>Joined {new Date(profile.joinedDate).toLocaleDateString()}</span>
          </div> */}
        </div>
      </div>
      {/* {profile.bio && (
        <p className="mt-4 text-gray-700">{profile.bio}</p>
      )} */}
    </div>
  );
}