import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { logout } from '../../services/auth';
import { useAuth } from '../../hooks/useAuth';

export default function LogoutButton() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
    >
      <LogOut className="w-4 h-4 mr-2" />
      Logout
    </button>
  );
}