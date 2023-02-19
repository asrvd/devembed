import { DevIcon } from "@/components/icons";

export default function TriggerButton() {
  return (
    <button className="px-4 py-4 w-[10.5rem] h-[2.64rem] text-center bg-zinc-200 border hover:bg-zinc-300 transition rounded-xl shadow-lg flex items-center justify-center gap-2 font-semibold">
      <DevIcon />
      Dev Profile
    </button>
  );
}
