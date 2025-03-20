import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import boardAPI from "../api/board";
import { useAuth } from "../contexts/AuthContext";

const Board = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    type: "GENERAL",
  });
  const [selectedPost, setSelectedPost] = useState(null);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetchPosts();
  }, [id]);

  const fetchPosts = async () => {
    try {
      const data = await boardAPI.getPosts(id);
      setPosts(data);
      setLoading(false);
    } catch (err) {
      setError("게시글 목록을 불러오는데 실패했습니다.");
      setLoading(false);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      await boardAPI.createPost(id, newPost);
      setShowCreateModal(false);
      setNewPost({
        title: "",
        content: "",
        type: "GENERAL",
      });
      fetchPosts();
    } catch (err) {
      setError("게시글 작성에 실패했습니다.");
    }
  };

  const handleAddComment = async (postId) => {
    if (!newComment.trim()) return;
    try {
      await boardAPI.addComment(id, postId, {
        content: newComment,
        authorId: user.id,
      });
      setNewComment("");
      fetchPosts();
    } catch (err) {
      setError("댓글 작성에 실패했습니다.");
    }
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      try {
        await boardAPI.deletePost(id, postId);
        fetchPosts();
      } catch (err) {
        setError("게시글 삭제에 실패했습니다.");
      }
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    if (window.confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
      try {
        await boardAPI.deleteComment(id, postId, commentId);
        fetchPosts();
      } catch (err) {
        setError("댓글 삭제에 실패했습니다.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">게시판</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          새 게시글
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white shadow rounded-lg">
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-gray-600">{post.content}</p>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <span>{post.author.name}</span>
                    <span className="mx-2">•</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                {post.author.id === user.id && (
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    삭제
                  </button>
                )}
              </div>

              <div className="mt-4 border-t pt-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">댓글</h3>
                <div className="space-y-4">
                  {post.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="flex justify-between items-start"
                    >
                      <div>
                        <p className="text-gray-600">{comment.content}</p>
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <span>{comment.author.name}</span>
                          <span className="mx-2">•</span>
                          <span>
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      {comment.author.id === user.id && (
                        <button
                          onClick={() =>
                            handleDeleteComment(post.id, comment.id)
                          }
                          className="text-red-600 hover:text-red-800"
                        >
                          삭제
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex space-x-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="댓글을 입력하세요"
                    className="flex-1 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <button
                    onClick={() => handleAddComment(post.id)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                  >
                    댓글 작성
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">새 게시글 작성</h2>
            <form onSubmit={handleCreatePost}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  제목
                </label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) =>
                    setNewPost({ ...newPost, title: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  내용
                </label>
                <textarea
                  value={newPost.content}
                  onChange={(e) =>
                    setNewPost({ ...newPost, content: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows="5"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  유형
                </label>
                <select
                  value={newPost.type}
                  onChange={(e) =>
                    setNewPost({ ...newPost, type: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="GENERAL">일반</option>
                  <option value="QUESTION">질문</option>
                  <option value="NOTICE">공지</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                  작성
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Board;
