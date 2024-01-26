import { User } from "@prisma/client";
import Link from "next/link";
import placeholder from "@/public/images/placeholder.png"
import Image from "next/image";
import logo from "@/public/images/logo2.png";
import { cn } from "@/common/utils/utils";
import Options from "./HeaderOptions"
interface HeaderProps{
  user?:User
}

const Header:React.FC<HeaderProps> = ({user}) => {

  return (
    <div className="border-lg border border-solid">
      <div className="mx-auto pr-5">
        <div className="relative flex items-center justify-between">
          <Link href={"/"}>
            <Image
              className=" mr-auto rounded-full"
              height={70}
              width={70}
              src={logo}
              alt=""
            />
          </Link>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="relative ml-3">
              <Options user={user!} />
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default Header;
