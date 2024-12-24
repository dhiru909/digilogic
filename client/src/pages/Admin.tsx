import { useState } from 'react';
import AdminHeader from '../components/admin/AdminHeader';
import ProductManagement from '../components/admin/products/ProductManagement';
import EnquiryManagement from '../components/admin/enquiries/EnquiryManagement';
import JobManagement from '../components/admin/jobs/JobManagement';
import ApplicationManagement from '@/components/admin/applications/ApplicationManagement';

type ActiveSection = 'products' | 'enquiries' | 'jobs'| 'applications';

export default function Admin() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('products');

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeSection === 'products' && <ProductManagement />}
        {activeSection === 'enquiries' && <EnquiryManagement />}
        {activeSection === 'jobs' && <JobManagement />}
        {activeSection === 'applications' && <ApplicationManagement />}
      </main>
    </div>
  );
}