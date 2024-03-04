import { TooltipProvider } from "@/components/ui/tooltip";

type LayoutProps = {
  children: React.ReactNode;
};
function Layout({ children }: LayoutProps) {
  return <TooltipProvider delayDuration={0}>{children}</TooltipProvider>;
}

export default Layout;
