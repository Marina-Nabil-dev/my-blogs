"use client";
import { useState } from 'react';
import { formatDate } from '@/lib/utils';
import { Comment } from '@/app/types/comments';

interface CommentsProps {
  postSlug: string;
  comments: Comment[];
}

export function Comments({ postSlug, comments }: CommentsProps) {
  const [newComment, setNewComment] = useState({
    name: '',
    email: '',
    content: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement comment submission
    console.log('Submitting comment:', newComment);
  };
  
  return (
    <section className="w-full max-w-4xl px-4 py-8 mx-auto">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Comments ({comments?.length})
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={newComment.name}
                onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={newComment.email}
                onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Comment
            </label>
            <textarea
              id="comment"
              rows={4}
              value={newComment.content}
              onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary"
              required
            />
          </div>
          <button
            type="submit"
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Post Comment
          </button>
        </form>

        <div className="space-y-6">
          {comments?.map((comment) => (
            <div key={comment.id} className="p-6 bg-white rounded-lg shadow-sm dark:bg-gray-800">
              <div className="flex items-start space-x-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {comment.user.name}
                    </p>
                    <time className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(comment.timestamp)}
                    </time>
                  </div>
                  <p className="mt-2 text-gray-700 dark:text-gray-300">{comment.text}</p>
                  <button
                    className="mt-2 text-sm text-primary hover:text-primary/80"
                    onClick={() => {
                      // TODO: Implement reply functionality
                      console.log('Reply to comment:', comment.id);
                    }}
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 