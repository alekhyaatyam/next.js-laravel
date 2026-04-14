export type Post = {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
};

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://127.0.0.1:8000/api';

export function getApiBaseUrl() {
  return apiBaseUrl.replace(/\/$/, '');
}

export async function getPosts(): Promise<Post[]> {
  const response = await fetch(`${getApiBaseUrl()}/posts`, {
    next: { revalidate: 0 },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch posts from the Laravel API.');
  }

  return response.json();
}

export async function createPost(title: string): Promise<Post> {
  const response = await fetch(`${getApiBaseUrl()}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ title }),
  });

  if (!response.ok) {
    const payload = await response
      .json()
      .catch(() => ({ message: 'Unable to create post.' }));

    throw new Error(payload.message ?? 'Unable to create post.');
  }

  return response.json();
}
