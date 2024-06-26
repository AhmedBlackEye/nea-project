import UnauthorizedNavbar from "@/components/shared/navigation/unauthorized-navbar";
import { createServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

type LayoutProps = {
  children: React.ReactNode;
};

async function Layout({ children }: LayoutProps) {
  const supabase = createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) return redirect("/projects");
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
