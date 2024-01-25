import { User } from "@prisma/client";
import Link from "next/link";
import Image from "next/image"
import placeholder from "@/public/images/placeholder.png"
interface HeaderProps{
  user?:User
}

const Header:React.FC<HeaderProps> = ({user}) => {
  console.log(user)
  return (
    <nav className="border-lg border border-solid">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex font-bold font-xl">
                Techie Talk
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="relative ml-3">
              <button
                type="button"
                className="flex rounded-full  text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                aria-expanded="false"
                aria-haspopup="true"
              >
                <span className="sr-only">Open user menu</span>
                {user?.image ? (
                  <Image
                    className="h-8 w-8 rounded-full"
                    height={40}
                    width={40}
                    src={user.image}
                    alt=""
                  />
                ) : (
                  <Image
                    className="h-8 w-8 rounded-full"
                    height={40}
                    width={40}
                    src={placeholder}
                    alt=""
                  />
                )}
              </button>
            </div>
            <div className="px-3">
              {user ? (
                <Link
                  href={"/api/auth/signout"}
                  className="border-lg cursor-pointer rounded-lg border-solid border-gray-500"
                >
                  <div className="border-lg p-1 border-lg cursor-pointer rounded-lg border border-solid border-gray-500">
                    SignOut
                  </div>
                </Link>
              ) : (
                <Link
                  href={"/api/auth/sigin"}
                  className="border-lg cursor-pointer rounded-lg border-solid border-gray-500"
                >
                  <div className="border-lg p-1 border-lg cursor-pointer rounded-lg border border-solid border-gray-500">
                    Signin
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>{" "}
    </nav>
  );
};

export default Header;
