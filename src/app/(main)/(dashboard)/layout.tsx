import Sidebar from "@/components/shared/sidebar";

type LayoutProps = {
  children: React.ReactNode;
};

function layout({ children }: LayoutProps) {
  return (
    <div className="">
      <Sidebar />

      <div className="ml-60 px-4">{children}</div>
    </div>
  );
}

export default layout;
