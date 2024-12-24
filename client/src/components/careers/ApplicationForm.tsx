import { useState } from 'react';
import { Upload, Loader2 } from 'lucide-react';
import { Job } from '../../types/career';
import { submitApplication } from '../../services/api';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface ApplicationFormProps {
  selectedJob: Job | null;
}

export default function ApplicationForm({ selectedJob }: ApplicationFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    coverLetter: ''
  });
  const [resume, setResume] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (!resume || !selectedJob) return;

    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('resume', resume!);
      formDataToSend.append('jobId', selectedJob!._id);
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      await submitApplication(formDataToSend);
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', coverLetter: '' });
      setResume(null);
    } catch (err) {
      setError('Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-background rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Apply Now</h2>
      
      {success && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
          Application submitted successfully!
        </div>
      )}

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 max-h-[74svh] md:min-w-80 h-fit">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <Input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            // className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <Input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            // className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <Input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cover Letter
          </label>
          <textarea
            required
            value={formData.coverLetter}
            onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
            rows={4}
            className="w-full rounded-lg bg-background border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Resume
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                  <span>Upload a file</span>
                  <input
                    type="file"
                    required
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setResume(e.target.files?.[0] || null)}
                    className="sr-only"
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500">PDF, DOC up to 10MB</p>
            </div>
          </div>
          {resume && (
            <p className="mt-2 text-sm text-gray-600">
              Selected file: {resume.name}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={submitting || !selectedJob}
        //   className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm "
        >
          {submitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            'Submit Application'
          )}
        </Button>
      </form>
    </div>
  );
}