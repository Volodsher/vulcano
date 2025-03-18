import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';

interface Post {
  id: string;
  post_title: string;
  post_title_ua: string;
  post_title_fr: string;
  post_short_text: string;
  post_short_text_ua: string;
  post_short_text_fr: string;
  post_text: string;
  post_text_ua: string;
  post_text_fr: string;
  post_images: Record<string, any>;
  post_status: number;
  post_published_date: Date;
  post_edited_time: Date;
  post_author: string;
}

interface DataContextType {
  posts: Post[] | null;
  loading: boolean;
  fetchPosts: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider = ({ children }: DataProviderProps) => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Failed to fetch posts');
      }

      const data: Post[] = await res.json();

      // Ensure date conversion
      const formattedData = data.map((post: any) => ({
        ...post,
        post_published_date: post.post_published_date
          ? new Date(post.post_published_date)
          : null,
        post_edited_time: post.post_edited_time
          ? new Date(post.post_edited_time)
          : null,
      })) as Post[]; // Type assertion here

      setPosts(formattedData);

      // const result = await response.json();
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <DataContext.Provider value={{ posts, loading, fetchPosts }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
