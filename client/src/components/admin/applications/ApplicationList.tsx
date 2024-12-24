import { AlertCircle, Download, Mail, Phone, Calendar } from 'lucide-react';
import { JobApplication } from '../../../types/career';
interface ApplicationListProps {
  applications: JobApplication[];
  loading: boolean;
  error: string | null;
  onStatusChange: (id: string, status: JobApplication['status']) => void;
  onRefetch: () => void;
}

export default function ApplicationList({
  applications,
  loading,
  error,
  onStatusChange,
  onRefetch
}: ApplicationListProps) {
  const getStatusColor = (status: JobApplication['status']) => {
    switch (status) {
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-background text-primary';
    }
  };

  if (loading) {
    return <div className="animate-pulse">Loading applications...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
        <p className="text-gray-600">{error}</p>
        <button
          onClick={onRefetch}
          className="mt-4 text-blue-600 hover:text-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-background rounded-lg shadow-md w-full overflow-x-auto">
      <div className=" border divide-y-2 rounded-lg">
        {applications.map((application) => (
          <div key={application._id} className="p-6 overflow-scroll">
            <div className="flex flex-col md:flex-row rounded-lg justify-between items-start mb-4">
                <div className='text-wrap '>
                    <h3 className="text-lg font-semibold">{application.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2 mt-1">
                    <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-1" />
                        {application.email}
                    </div>
                    <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-1" />
                        {application.phone}
                    </div>
                    <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(application.appliedDate).toLocaleDateString()}
                    </div>
                    </div>
                </div>
              <div className="flex items-center md:fade-in-15 duration-500 gap-4">
                <a
                  href={application.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-600 hover:text-blue-700"
                >
                  <Download className="w-5 h-5 mr-1" />
                  Resume
                </a>
                <select
                  value={application.status}
                  onChange={(e) => onStatusChange(application._id, e.target.value as JobApplication['status'])}
                  className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(application.status)} border`}
                >
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
            <div className="bg-background border-dashed border rounded-lg p-4 mt-4">
              <h4 className="font-medium mb-2">Cover Letter</h4>
              <p className="text-gray-600 whitespace-pre-wrap">{application.coverLetter}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}