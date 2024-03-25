import ProjectSidebar from "@/components/shared/navigation/sidebar/project";

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <div className="flex">
      <ProjectSidebar />
      <div className="w-full p-4 md:p-8 md:pt-6">{children}</div>
    </div>
  );
}

export default Layout;
