import Link from "next/link";
import { PostMetadata } from "./PostMetadata";

const PostPreview = (props: PostMetadata) => {
  return (
    <div
      className="border border-black p-4 rounded-md shadow-sm
    bg-post transform hover:scale-105 transition-transform duration-300"
    >
      {/* <p className="text-sm text-[#deb887]">{props.date}</p> */}

      <Link href={`/posts/${props.slug}`}>
        <h1 className=" text-[#adff2f] hover:underline mb-4">{props.title}</h1>
      </Link>
      <p className="text-[#deb887]">{props.subtitle}</p>
    </div>
  );
};

export default PostPreview;
