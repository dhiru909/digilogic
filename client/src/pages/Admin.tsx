import { useState } from 'react';
import AdminHeader from '../components/admin/AdminHeader';
import ProductManagement from '../components/admin/products/ProductManagement';
import EnquiryManagement from '../components/admin/enquiries/EnquiryManagement';
import JobManagement from '../components/admin/jobs/JobManagement';
import ApplicationManagement from '@/components/admin/applications/ApplicationManagement';
import { useAdminGuard } from '@/hooks/useAdminGuard';
import WorkshopManagement from '@/components/admin/workshops/WorkshopManagement';

type ActiveSection = 'products' | 'enquiries' | 'jobs'| 'applications' | 'workshops';
export default function Admin() {
  const isAdmin = useAdminGuard();
  const [activeSection, setActiveSection] = useState<ActiveSection>('products');
  if (!isAdmin) {
    return null; // The useAdminGuard hook will handle the redirect
  }
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeSection === 'products' && <ProductManagement />}
        {activeSection === 'enquiries' && <EnquiryManagement />}
        {activeSection === 'jobs' && <JobManagement />}
        {activeSection === 'applications' && <ApplicationManagement />}
        {activeSection === 'workshops' && <WorkshopManagement />}

      </main>
    </div>
  );
}