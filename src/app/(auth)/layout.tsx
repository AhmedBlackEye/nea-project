import UnauthorizedNavbar from "@/components/shared/navigation/unauthorized-navbar";

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <>
      <UnauthorizedNavbar isNavVisible={false} />
      <main className="flex h-screen items-center justify-center">
        {children}
      </main>
    </>
  );
}

export default Layout;
