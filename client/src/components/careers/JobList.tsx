import { useJobs } from '../../hooks/useJobs';
import { Job } from '../../types/career';
import { Briefcase, MapPin, Clock } from 'lucide-react';

interface JobListProps {
  onSelectJob: (job: Job) => void;
}

export default function JobList({ onSelectJob }: JobListProps) {
  const { jobs, loading, error } = useJobs();

  if (loading) {
    return <div className="animate-pulse">Loading jobs...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="space-y-6 border">
      {jobs?.map((job) => (
        <div
          key={job._id}
          className="bg-background rounded-lg m-3 border shadow-md p-5   cursor-pointer active:bg-muted visited:bg-muted checked:bg-muted hover:shadow-lg transition-shadow"
          onClick={() => onSelectJob(job)}
        >
          <h3 className="text-xl font-semibold mb-2">{job?.title}</h3>
          <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
            <div className="flex items-center">
              <Briefcase className="w-4 h-4 mr-2" />
              {job?.type}
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              {job?.location}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Posted {new Date(job.postedDate).toLocaleDateString()}
            </div>
          </div>
          <p className="text-gray-600 mb-4">{job.description}</p>
          <div className="flex flex-wrap gap-2">
            {job?.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}