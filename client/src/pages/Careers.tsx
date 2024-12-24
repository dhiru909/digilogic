import { useEffect, useRef, useState } from 'react';
import JobList from '../components/careers/JobList';
import ApplicationForm from '../components/careers/ApplicationForm';
import { Job } from '../types/career';

export default function Careers() {
    const [showForm, setShowForm] = useState<Boolean>(false);
  const showFormHandler = (job:Job) => {
    // localStorage.setItem("jobId",_id);
    // setProductEnquire(_id);
    setSelectedJob(job)
    
    setShowForm(true);
  }
    const menuRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowForm(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  return (
    <div className="min-h-screen bg-background">
        <div ref={menuRef} className={`${showForm?"inline":"hidden"} min-w-72 z-10  fixed top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4  p-1 border rounded-lg overflow-auto min-h-80  bg-background  flex items-center justify-center`}>
     <ApplicationForm selectedJob={selectedJob} />
      </div>
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
          <p className="text-xl">Help us shape the future of digital education</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Job Listings */}
          <div className="lg:col-span-2">
            <JobList onSelectJob={showFormHandler} />
          </div>

          {/* Application Form */}
          {/* <div className="lg:col-span-1">
            <ApplicationForm selectedJob={selectedJob} />
          </div> */}
        </div>
      </div>
    </div>
  );
}