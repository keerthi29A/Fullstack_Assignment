import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const App = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const loader = useRef(null);

    useEffect(() => {
        const loadPosts = async () => {
            setLoading(true);
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`);
            const data = await res.json();
            setPosts((prev) => [...prev, ...data]);
            setLoading(false);
        };

        loadPosts();
    }, [page]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setPage((prev) => prev + 1);
                }
            },
            { rootMargin: '100px' }
        );
        if (loader.current) {
            observer.observe(loader.current);
        }

        return () => {
            if (loader.current) {
                observer.unobserve(loader.current);
            }
        };
    }, [loader.current]);

    return (
        <div className="feed-container">
            {posts.map((post) => (
                <div key={post.id} className="post">
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </div>
            ))}
            {loading && (
                <div className="spinner">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            )}
            <div ref={loader}></div>
        </div>
    );
};

export default App;
