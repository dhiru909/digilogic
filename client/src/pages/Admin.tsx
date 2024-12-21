import { useState } from 'react';
import AdminHeader from '../components/admin/AdminHeader';
import ProductManagement from '../components/admin/products/ProductManagement';
import EnquiryManagement from '../components/admin/enquiries/EnquiryManagement';

type ActiveSection = 'products' | 'enquiries';

export default function Admin() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('products');

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeSection === 'products' ? <ProductManagement /> : <EnquiryManagement />}
      </main>
    </div>
  );
}