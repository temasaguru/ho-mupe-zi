import { ReactNode } from 'react';
import DashboardFooter from './DashboardFooter';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen w-screen flex-col">
      <main className="flex grow flex-col">{children}</main>
      <DashboardFooter />
    </div>
  );
};
export default DashboardLayout;
