import { Link } from 'react-router-dom';

const SliderCard = ({ post }) => {
    return (
        <div className="group relative px-20 py-20 rounded-lg border-teal-500">
            <div className="border-2 rounded-lg p-2 border-teal-500">
                <div className="aspect-[2/1] w-full rounded-lg bg-gray-100 shadow-card transition group-hover:opacity-80">
                    <img src={post.image}
                        className="h-full w-full rounded-lg object-cover"
                        alt='post cover'
                        loading="lazy" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-center transition group-hover:text-teal-600 sm:text-2xl">
                    {post.title}
                </h3>
                <Link className="inline-flex rounded-sm transition duration-300 leading-none focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600/80 absolute inset-0 h-full w-full "
                    to={`/post/${post.slug}`} >
                    <span className="sr-only">Read article</span>
                </Link>
            </div>
        </div>
    )
}

export default SliderCard
