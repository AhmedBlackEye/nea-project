import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface NavProps {
  items: { title: string; label?: string; Icon: LucideIcon; href: string }[];
}

// export function Nav({ links}: NavProps) {
//   return (
//     <div className="group flex flex-col py-2">
//       <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
//         {links.map((link, index) => (
//           <Link
//             key={index}
//             href="#"
//             className={cn(
//               buttonVariants({ variant: link.variant, size: "sm" }),
//               link.variant === "default" &&
//                 "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
//               "justify-start ",
//             )}
//           >
//             <link.icon className="mr-2 h-6 w-6" />
//             {link.title}
//             {link.label && (
//               <span
//                 className={cn(
//                   "ml-auto",
//                   link.variant === "default" &&
//                     "text-background dark:text-white",
//                 )}
//               >
//                 {link.label}
//               </span>
//             )}
//           </Link>
//         ))}
//       </nav>
//     </div>
//   );
// }

// export function Nav() {
//   return (
//     <div className="group flex flex-col py-2">
//       <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
//         {links.map((link, index) => (

//         ))}
//       </nav>
//     </div>
//   );
// }
