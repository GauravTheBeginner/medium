import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import sanitizeHtml from "sanitize-html";

interface BlogCardProps {
    id: string;
    authorname: string;
    title: string;
    content: string;
    publishedDate: string;
}

function BlogCard({ authorname, publishedDate, title, content, id }: BlogCardProps) {
    const truncatedContent = content.slice(0, 200) + "...";
    const sanitizedContent = sanitizeHtml(truncatedContent, {
        allowedTags: ['p', 'a', 'b', 'i', 'em', 'strong'],
        allowedAttributes: {}
    });

    return (
        <Link className="px-5 max-w-[60rem] w-[100%]" to={`/blog/${id}`}>
            <div className="border border-slate-200 mb-6 mt-6 cursor-pointer pb-4 border-l-0 border-t-0 border-r-0">
                <div className="flex items-center mb-2">
                    <Avatar name={authorname} />
                    <div className="flex justify-center items-center">
                        <p className="text-gray-800 text-sm font-semibold pl-1">{authorname || "Anonymous"}</p>
                        <div className="flex justify-center pl-1 items-center">
                            <Circle />
                        </div>
                        <p className="text-gray-500 pl-1 text-sm">{publishedDate}</p>
                    </div>
                </div>
                <h2 className="text-xl font-bold pb-2 text-gray-900">{title}</h2>
                <div className=" text-md font-thin pb-1 truncate" dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
                <p className="text-slate-400 text-sm">{`${Math.ceil(content.length / 100)} minute(s) to read.`}</p>
            </div>
        </Link>
    );
}

function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-200"></div>;
}

export default BlogCard;
