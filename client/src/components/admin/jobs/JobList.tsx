import { Pencil, Trash2, AlertCircle, Briefcase, MapPin } from "lucide-react";
import { Job } from "../../../types/career";
import { deleteJob } from "../../../services/api";

interface JobListProps {
  jobs: Job[];
  loading: boolean;
  error: string | null;
  onEdit: (job: Job) => void;
  onRefetch: () => void;
}

export default function JobList({
  jobs,
  loading,
  error,
  onEdit,
  onRefetch,
}: JobListProps) {
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this job posting?")) {
      try {
        await deleteJob(id);
        onRefetch();
      } catch (error) {
        console.error("Error deleting job:", error);
      }
    }
  };

  if (loading) {
    return <div className="animate-pulse">Loading jobs...</div>;
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
    <div className="bg-background  rounded-lg shadow-md overflow-y-auto overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-muted">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Position
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Location
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Posted Date
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-background divide-y divide-gray-200">
          {jobs?.map((job) => (
            <tr key={job._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <Briefcase className="h-5 w-5 text-gray-400 mr-2" />
                  <div>
                    <div className="text-sm font-medium text-primary">
                      {job.title}
                    </div>
                    <div className="text-sm text-gray-500 line-clamp-1">
                      {job.description}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  {job.type}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-1" />
                  {job.location}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(job.postedDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onEdit(job)}
                  className="text-blue-600 hover:text-blue-900 mr-4"
                >
                  <Pencil className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(job._id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
