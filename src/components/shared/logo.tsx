import { Rocket, RocketIcon } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Rocket size={32} className="stroke-primary" />
      <span className="text-xl font-semibold tracking-wide text-primary">
        Waitlytics
      </span>
    </div>
  );
}
