import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { DialogTrigger } from "./ui/dialog";

export default function ButtonFormTrigger({ name }: { name: string }) {
  return (
    <DialogTrigger asChild>
      <Button>
        <Plus className="w-4 h-4 mr-2" />
        {name}
      </Button>
    </DialogTrigger>
  );
}
