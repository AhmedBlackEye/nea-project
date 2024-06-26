import UnauthorizedNavbar from "@/components/shared/navigation/unauthorized-navbar";

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <>
      <UnauthorizedNavbar />
      <main className="mt-10">{children}</main>
    </>
  );
}

export default Layout;
