import { UserRole } from '../../types/index';

interface RoleSelectProps {
  value: UserRole;
  onChange: (role: UserRole) => void;
}

export default function RoleSelect({ value, onChange }: RoleSelectProps) {
  return (
    <div className="items-center w-full justify-center flex space-x-4 mb-4">
      <label className="flex items-center">
        <input
          type="radio"
          value="USER"
          checked={value === 'USER'}
          onChange={(e) => onChange(e.target.value as UserRole)}
          className="mr-2"
        />
        User
      </label>
      <label className="flex items-center">
        <input
          type="radio"
          value="ADMIN"
          checked={value === 'ADMIN'}
          onChange={(e) => onChange(e.target.value as UserRole)}
          className="mr-2"
        />
        Admin
      </label>
    </div>
  );
}