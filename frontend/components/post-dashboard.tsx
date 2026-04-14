'use client';

import { FormEvent, useEffect, useState, useTransition } from 'react';
import { createPost, getApiBaseUrl, type Post } from '@/lib/api';

type PostDashboardProps = {
  initialPosts: Post[];
};

export function PostDashboard({ initialPosts }: PostDashboardProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setError('Please enter a title before submitting.');
      setStatus(null);
      return;
    }

    setError(null);
    setStatus('Saving post...');

    startTransition(async () => {
      try {
        const newPost = await createPost(trimmedTitle);
        setPosts((currentPosts) => [newPost, ...currentPosts]);
        setTitle('');
        setStatus('Post created successfully.');
      } catch (submissionError) {
        setError(
          submissionError instanceof Error
            ? submissionError.message
            : 'Something went wrong while creating the post.',
        );
        setStatus(null);
      }
    });
  }

  return (
    <main className="page-shell">
      <section className="hero">
        <p className="eyebrow">Next.js + Laravel</p>
        <h1>Posts dashboard wired to your API.</h1>
        <p>
          This frontend reads the latest posts from Laravel and lets you create
          a new one without leaving the page. Update the API URL with
          <code> NEXT_PUBLIC_API_BASE_URL </code>
          if your backend runs somewhere else.
        </p>
      </section>

      <section className="grid">
        <article className="card panel">
          <h2 className="section-title">Latest posts</h2>
          <p className="section-copy">
            Data is loaded from the Laravel endpoint at
            <code> {getApiBaseUrl()}/posts</code>.
          </p>

          {posts.length === 0 ? (
            <div className="empty-state">
              No posts yet. Create the first one from the form.
            </div>
          ) : (
            <ul className="post-list">
              {posts.map((post) => (
                <li key={post.id} className="post-item">
                  <strong>{post.title}</strong>
                  <span className="post-meta">
                    Created {new Date(post.created_at).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </article>

        <aside className="card panel">
          <h2 className="section-title">Create a post</h2>
          <p className="section-copy">
            Submit a title and the frontend will send a JSON request to the
            Laravel API.
          </p>

          <form className="form" onSubmit={handleSubmit}>
            <label className="label" htmlFor="title">
              Post title
              <input
                id="title"
                className="input"
                name="title"
                placeholder="Write something short and clear"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                disabled={isPending}
              />
            </label>

            <button className="button" type="submit" disabled={isPending}>
              {isPending ? 'Saving...' : 'Add post'}
            </button>
          </form>

          <p
            className={[
              'status',
              error ? 'status-error' : '',
              status ? 'status-success' : '',
            ]
              .join(' ')
              .trim()}
          >
            {error ?? status}
          </p>

          <p className="api-note">
            Backend expected at <code>http://127.0.0.1:8000</code> by default.
          </p>
        </aside>
      </section>
    </main>
  );
}
