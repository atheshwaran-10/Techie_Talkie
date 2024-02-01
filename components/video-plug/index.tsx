import Image from "next/image"
export default function VideoPlug({ userPicture }: { userPicture: string }) {
  return (
    <div className="relative aspect-video w-96">
      <div className="absolute left-0 top-0 h-full w-full rounded-[12px] border border-gray-500 bg-black/10 backdrop-blur-2xl" />
      <Image
        className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 transform rounded-full"
        src={userPicture}
        height={40}
        width={40}
        alt="User image"
      />
    </div>
  );
}
