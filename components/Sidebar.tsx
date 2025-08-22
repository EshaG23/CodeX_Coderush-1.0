
import React from 'react';
import type { Patient } from '../types';
import { UserIcon } from './icons/UserIcon';

interface SidebarProps {
  patients: Patient[];
  selectedPatient: Patient | null;
  onSelectPatient: (patient: Patient) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ patients, selectedPatient, onSelectPatient }) => {
  const getStatusColor = (status: Patient['status']) => {
    switch (status) {
      case 'Stable': return 'bg-green-500';
      case 'At Risk': return 'bg-yellow-500';
      case 'Needs Review': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <aside className="w-80 bg-brand-dark text-white flex flex-col shadow-lg">
      <div className="p-4 border-b border-brand-dark/50">
        <h2 className="text-xl font-semibold">Patient Cohort</h2>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul>
          {patients.map((patient) => (
            <li key={patient.id}>
              <button
                onClick={() => onSelectPatient(patient)}
                className={`w-full text-left p-4 flex items-center transition-colors duration-200 ${
                  selectedPatient?.id === patient.id
                    ? 'bg-brand-secondary'
                    : 'hover:bg-brand-dark/60'
                }`}
              >
                <UserIcon className="w-6 h-6 mr-3 text-brand-light/70" />
                <div className="flex-1">
                  <p className="font-semibold">{patient.name}</p>
                  <p className="text-sm text-brand-light/80">{patient.age}, {patient.gender}</p>
                </div>
                <div className="flex items-center">
                  <span className={`w-3 h-3 rounded-full ${getStatusColor(patient.status)}`} title={patient.status}></span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-brand-dark/50 text-center text-xs text-brand-light/60">
        AuraMind v1.0.0
      </div>
    </aside>
  );
};
