import { Button, Carousel, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import CommentSection from '../components/CommentSection';
import PostCard from '../components/PostCard';
import { useSelector } from 'react-redux';
import SmallAbout from '../components/SmallAbout';
import SliderCard from '../components/SliderCard';
import ClipboardJS from 'clipboard';


const addCopyButtonToCodeBlocks = () => {
    document.querySelectorAll('pre').forEach(function (codeBlock) {
        var button = document.createElement('button');
        button.className = 'copy-code-button';
        button.type = 'button';
        var s = codeBlock.innerText;
        button.setAttribute('data-clipboard-text', s);
        button.innerText = 'Copy';

        codeBlock.classList.add('prettyprint');
        codeBlock.appendChild(button);
    });

    var clipboard = new ClipboardJS('.copy-code-button');

    clipboard.on('success', function (e) {
        e.trigger.textContent = 'Copied';
        window.setTimeout(function () {
            e.trigger.textContent = 'Copy';
        }, 2000);
        e.clearSelection();

    });

    clipboard.on('error', function (e) {
        e.trigger.textContent = 'Error';
        window.setTimeout(function () {
            e.trigger.textContent = 'Copy';
        }, 2000);
        e.clearSelection();
    });
};


const PostPage = () => {


    const { postslug } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [post, setPost] = useState(null);
    const [recentPosts, setRecentPosts] = useState(null);
    const [relatedPosts, setRelatedPosts] = useState(null);

    const { auth_token } = useSelector((state) => state.user || 'null');

    useEffect(() => {
        addCopyButtonToCodeBlocks();
    }, [post]);

    function readingTime(text) {
        const wpm = 225;
        const words = text.trim().split(/\s+/).length;
        const time = Math.ceil(words / wpm);
        return time;
    }
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
        return formattedDate;
    }

    // fetch post
    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/post/${postslug}`,
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${auth_token}`
                        }
                    }
                );
                const data = await res.json();
                if (!res.ok) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                if (res.ok) {
                    setPost(data);
                    setLoading(false);
                    setError(false);
                }
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        fetchPost();
    }, [postslug]);

    // fetch recent posts
    useEffect(() => {
        try {
            const fetchRecentPosts = async () => {
                const res = await fetch(`/api/posts/recent`,
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${auth_token}`
                        }
                    }
                );

                const data = await res.json();
                if (res.ok) {
                    setRecentPosts(data.recentposts);
                }
            };
            fetchRecentPosts();
        } catch (error) {
            console.log(error.message);
        }
    }, []);

    // fetch related posts
    useEffect(() => {
        try {
            const fetchRelatedPosts = async () => {
                const res = await fetch(`/api/posts/related/${postslug}`,
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${auth_token}`
                        }
                    }
                );

                const data = await res.json();
                if (res.ok) {
                    setRelatedPosts(data.relatedPosts);
                }
            };
            fetchRelatedPosts();
        } catch (error) {
            console.log(error.message);
        }
    }, []);


    if (loading){
        return (
            <div className='flex justify-center items-center min-h-screen'>
                <Spinner size='xl' />
            </div>
        );
    }
    
    return (
        <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
            <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl break-all whitespace-pre-wrap'>
                {post && post.title}
            </h1>
            <Link
                to={`/categories`}
                className='self-center mt-5'
            >
                <Button color='gray' pill size='lg'>
                    {post && post.category}
                </Button>
            </Link>
            <img
                src={post && post.image}
                alt={post && post.title}
                className='mt-10 p-3 max-h-[600px] w-full object-cover'
            />
            <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-5xl text-xs'>
                <span>{post && formatDate(post.created_at)}</span>
                <span className='italic'>
                    {post && readingTime(post.content)} mins
                </span>
            </div>
            <div
                className='p-3 max-w-5xl mx-auto w-full post-content break-all whitespace-pre-wrap'
                dangerouslySetInnerHTML={{ __html: post && post.content }}
            >
            </div>

            {/* comments section */}
            <div className='mx-auto w-full max-w-2xl lg:max-w-7xl my-10'>
                <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
                    <h2 className="text-3xl font-medium sm:text-3xl lg:text-[30px]">Comments</h2>

                </div>
                <CommentSection postId={post.id} />

            </div>


            {post.premium === 1 ?
                <div className='max-w-4xl mx-auto w-full'>
                    <CallToAction />
                </div>
                :
                <SmallAbout />
            }
            {/* related posts */}
            <div className='mx-auto w-full max-w-2xl px-6 lg:max-w-7xl my-10'>
                <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
                    <h2 className="text-3xl font-medium sm:text-3xl lg:text-[30px]">Related articles</h2>
                    <Link className="inline-flex rounded-sm transition duration-300 leading-none focus:outline-none focus-visible:ring-2"
                        to={`/all-posts`}>
                        View all →
                    </Link>
                </div>
                <div className='mt-12'>
                    <Carousel
                        leftControl={<Button as={"div"} gradientDuoTone='purpleToPink' pill size="sm">«</Button>}
                        rightControl={<Button as={"div"} gradientDuoTone='purpleToPink' pill size="sm">»</Button>}
                        indicators={false}
                    >
                        {relatedPosts &&
                            relatedPosts.map((post) =>
                                <SliderCard key={post.id} post={post} />
                            )}

                    </Carousel>
                </div>
            </div>

            {/* recent posts */}
            <div className='mx-auto w-full max-w-2xl px-6 lg:max-w-7xl my-10 mb-20'>
                <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
                    <h2 className="text-3xl font-medium sm:text-3xl lg:text-[30px]">Recent articles</h2>
                    <Link className="inline-flex rounded-sm transition duration-300 leading-none focus:outline-none focus-visible:ring-2"
                        to="/all-posts">
                        View all →
                    </Link>
                </div>
                <div className='mt-12 grid gap-x-8 gap-y-12 lg:grid-cols-3'>
                    {recentPosts &&
                        recentPosts.map((post) =>
                            <PostCard key={post.id} post={post} />
                        )}
                </div>

            </div>
        </main>
    );
}

export default PostPage