import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FaGithub, FaGoogle } from "react-icons/fa";

type authCardProps = {
  children: React.ReactNode;
  header: string;
  footerTitle: string;
  footerURL: string;
  footerText: string;
};

function AuthCard({
  children,
  header,
  footerTitle,
  footerURL,
  footerText,
}: authCardProps) {
  return (
    <div className="bg-background w-96 flex flex-col gap-1 p-3 items-center rounded shadow-slate-300 shadow-md">
      <h2 className="text-primary text-2xl font-medium">{header}</h2>
      {children}
      <div className="flex gap-3 justify-center w-full mt-3">
        <Button className="w-2/5">
          <FaGoogle className="size-5" /> <p className="ml-3">Google</p>
        </Button>
        <Button className="w-2/5">
          <FaGithub className="size-6" /> <p className="ml-3">Github</p>
        </Button>
      </div>
      <Separator className="mt-4 mb-1" />
      <p className="text-primary text-sm m-0 p-0">
        {footerTitle}
        <Link href={footerURL} className="text-primary text-sm ml-0">
          <Button variant={"link"} size={"sm"}>
            {footerText}
          </Button>
        </Link>
      </p>
    </div>
  );
}

export default AuthCard;
