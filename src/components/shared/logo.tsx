import { Rocket, RocketIcon } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link className="flex items-center gap-2" href="/">
      <Rocket size={32} className="stroke-primary" />
      <span className="text-xl font-semibold tracking-wide text-primary">
        Waitlytics
      </span>
    </Link>
  );
}
