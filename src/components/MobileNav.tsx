import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AlignJustify } from "lucide-react";

import Nav from "./Nav";
import Logo from "./Logo";
import Socials from "./Socials";

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <AlignJustify className="cursor-pointer" />
      </SheetTrigger>
      <SheetContent side="left">
        <div className="flex flex-col items-center justify-between h-full gap-y-8">
          <div className="flex flex-col items-center gap-y-32">
            <Logo />
            <Nav
              containerStyles="flex flex-col items-center gap-y-8"
              linkStyles="text-2xl hover:text-primary hover:border-b-2 hover:border-primary transition-all"
              underlineStyles=""
            />
          </div>
          <Socials
            containerStyles="flex gap-x-4"
            iconStyles="text-2xl hover:text-primary transition-all"
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
