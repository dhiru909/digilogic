import { useState } from 'react';
import { Plus } from 'lucide-react';
import JobList from './JobList';
import JobForm from './JobForm';
import { useJobs } from '../../../hooks/useJobs';
import { Job } from '@/types/career';

export default function JobManagement() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job|null>(null);
  const { jobs, loading, error, refetch } = useJobs();

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingJob(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Job Management</h2>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Job
        </button>
      </div>

      <JobList
        jobs={jobs!}
        loading={loading}
        // @ts-ignore
        error={error}
        onEdit={(job) => {
          setEditingJob(job);
          setIsFormOpen(true);
        }}
        // onEdit={setEditingJob}
        onRefetch={refetch}
      />

      {isFormOpen && (
        <JobForm
          job={editingJob}
          onClose={handleFormClose}
          onSuccess={() => {
            handleFormClose();
            refetch();
          }}
        />
      )}
    </div>
  );
}