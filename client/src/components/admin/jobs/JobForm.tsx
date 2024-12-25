import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Job } from '../../../types/career';
import { createJob, updateJob } from '../../../services/api';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {  SelectLabel } from '@radix-ui/react-select';

interface JobFormProps {
  job?: Job | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function JobForm({ job, onClose, onSuccess }: JobFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'Full-time',
    location: '',
    skills: ''
  });

  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title,
        description: job.description,
        type: job.type,
        location: job.location,
        skills: job.skills.join(', ')
      });
    }
  }, [job]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const jobData = {
        ...formData,
        skills: formData.skills.split(',').map(skill => skill.trim())
      };

      if (job) {
        // @ts-ignore
        await updateJob(job._id, jobData);
      } else {
        // @ts-ignore
        await createJob(jobData);
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving job:', error);
    }
  };

  return (
    <div className="fixed rounded-sm z-20 overflow-auto max-h-[90vh] inset-0 bg-background bg-opacity-50 border  flex items-center w-fit h-fit top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4 justify-center">
      <div className="bg-background rounded-lg p-8 max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {job ? 'Edit Job' : 'Add Job'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-primary">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 ">
          <div>
            <label className="block text-sm font-medium text-primary">Title</label>
            <Input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            //   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="flex  w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm "
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary">Type</label>
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData({ ...formData, type: value })}
              required
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Job type"/>
                {/* <SelectIcon className="ml-auto -rotate-90" /> */}
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                    <SelectLabel>Job type</SelectLabel>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary">Location</label>
            <Input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            //   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary">
              Skills (comma-separated)
            </label>
            <Input
              type="text"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
            //   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="React, TypeScript, Node.js"
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-primary hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {job ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}