import { JobApplicationDetails } from '@/types';
import { JobApplication } from '../../types/career';
import { Briefcase, Calendar } from 'lucide-react';

interface UserApplicationsProps {
  applications: JobApplicationDetails[];
}

export default function UserApplications({ applications }: UserApplicationsProps) {
  const getStatusColor = (status: JobApplication['status']) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      reviewed: 'bg-blue-100 text-blue-800',
      accepted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return colors[status];
  };

  if (applications.length === 0) {
    return (
      <div className="bg-background rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">My Applications</h2>
        <p className="text-gray-600">No job applications yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-background rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">My Applications</h2>
      <div className="space-y-4">
        {applications.map((application) => (
          <div key={application._id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Briefcase className="w-5 h-5 text-gray-600" />
                <span className="font-medium">{application.jobId.title}</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(application.status)}`}>
                {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-1" />
              <span>Applied on {new Date(application.appliedDate).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}