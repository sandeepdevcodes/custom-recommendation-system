import { Card } from "@/components/ui/card";
import Link from "next/link";

interface VideoCardProps {
  title: string;
  description: string;
  thumbnail: string;
}
export default function VideoCard({
  title,
  description,
  thumbnail,
}: VideoCardProps) {
  return (
    <Card className="w-full max-w-md flex bg-slate-800 items-start gap-4 p-4 border-2 border-muted-foreground/30">
      <Link
        href="#"
        className="flex-shrink-0 relative block w-[120px] h-[90px] rounded-md overflow-hidden"
        prefetch={false}
      >
        <img
          src={thumbnail}
          alt="Video Thumbnail"
          width={120}
          height={90}
          className="object-cover w-full h-full"
          style={{ aspectRatio: "120/90", objectFit: "cover" }}
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <PlayIcon className="w-8 h-8 text-white" />
        </div>
      </Link>
      <div className="space-y-2">
        <h3 className="text-lg font-medium line-clamp-2 text-white">{title}</h3>
        <p className="text-muted/50 text-sm line-clamp-2">{description}</p>
      </div>
    </Card>
  );
}

function PlayIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  );
}
