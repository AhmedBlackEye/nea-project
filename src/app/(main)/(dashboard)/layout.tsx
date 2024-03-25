import DashboardSidebar from "@/components/shared/navigation/sidebar/dashboard";

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <div className="flex">
      <DashboardSidebar />
      <div className="w-full p-4 md:p-8 md:pt-6">{children}</div>
    </div>
  );
}

export default Layout;
