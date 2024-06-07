import { Badge } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const PostCard = ({ post }) => {
    const { t } = useTranslation();
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
        return formattedDate;
    }

    function readingTime(text) {
        const wpm = 225;
        const words = text.trim().split(/\s+/).length;
        const time = Math.ceil(words / wpm);
        return time;
    }

    return (
        <>
            <div className="group relative mb-6 border-2 p-10 bg-white dark:bg-inherit md:p-5 rounded-lg border-teal-500">
                <div className="aspect-[2/1] w-full rounded-lg bg-gray-100 shadow-card transition group-hover:opacity-80">
                    <img src={post.image}
                        className="h-full w-full rounded-lg object-cover"
                        alt='post cover'
                        loading="lazy" />
                </div>
                <div className="mt-8 flex flex-row justify-between">
                    <time>{new Date(post.updated_at).toLocaleDateString()} </time>
                    <span>🕒 {readingTime(post.content)} {t("mins")}</span>
                    <Badge color="warning">{post.category}</Badge>

                </div>
                <h3 className="mt-4 text-xl font-bold transition group-hover:text-teal-600 sm:text-2xl break-all whitespace-pre-wrap">
                    {post.title}
                </h3>
                <Link className="inline-flex rounded-sm transition duration-300 leading-none focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600/80 absolute inset-0 h-full w-full "
                    to={`/post/${post.slug}`} >
                    <span className="sr-only">Read article</span>
                </Link>
            </div>
        </>
    )
}

export default PostCard