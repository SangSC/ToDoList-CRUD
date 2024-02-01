import Socials from "./Socials";

const Footer = () => {
  return (
    <footer className="bg-secondary dark:bg-secondary-foreground py-12">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-between">
          {/* socials */}
          <Socials
            containerStyles="flex gap-x-6 mx-auto xl:mx-0 mb-4"
            iconStyles="text-primary text-[30px] hover:text-primary-foreground transition-all"
          />
          {/* copyright */}
          <div>
            <div className="text-muted-foreground">
              Copyright &copy; Sang Chao. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
