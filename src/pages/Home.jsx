import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import boardAPI from "../api/board";

const Home = () => {
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const postsData = await boardAPI.getPosts();
      setRecentPosts(postsData.slice(0, 5));
      setLoading(false);
    } catch (error) {
      console.error("데이터 로딩 실패:", error);
      setError("데이터를 불러오는데 실패했습니다.");
      setLoading(false);
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
    <div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* 프로젝트 단계 섹션 */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-6">
          프로젝트 단계
        </h2>
        <div className="flex flex-wrap justify-between gap-4">
          <div className="flex items-center">
            <div className="relative">
              <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                1
              </div>
              <div className="absolute top-1/2 left-full h-0.5 w-24 bg-indigo-600 hidden md:block"></div>
            </div>
            <div className="ml-4">
              <h3 className="font-semibold text-gray-900">기획</h3>
              <div className="mt-1 inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                진행중
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <div className="relative">
              <div className="w-12 h-12 bg-gray-300 text-white rounded-full flex items-center justify-center font-bold text-lg">
                2
              </div>
              <div className="absolute top-1/2 left-full h-0.5 w-24 bg-gray-300 hidden md:block"></div>
            </div>
            <div className="ml-4">
              <h3 className="font-semibold text-gray-900">디자인</h3>
              <div className="mt-1 inline-block px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                대기중
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <div className="relative">
              <div className="w-12 h-12 bg-gray-300 text-white rounded-full flex items-center justify-center font-bold text-lg">
                3
              </div>
              <div className="absolute top-1/2 left-full h-0.5 w-24 bg-gray-300 hidden md:block"></div>
            </div>
            <div className="ml-4">
              <h3 className="font-semibold text-gray-900">이행</h3>
              <div className="mt-1 inline-block px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                대기중
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <div className="relative">
              <div className="w-12 h-12 bg-gray-300 text-white rounded-full flex items-center justify-center font-bold text-lg">
                4
              </div>
            </div>
            <div className="ml-4">
              <h3 className="font-semibold text-gray-900">테스트</h3>
              <div className="mt-1 inline-block px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                대기중
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 게시판 섹션 */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">게시판</h2>
            <Link
              to="/board"
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              더보기
            </Link>
          </div>
        </div>
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                번호
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                제목
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                작성자
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                작성일
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recentPosts.map((post, index) => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    to={`/board/${post.id}`}
                    className="text-sm font-medium text-gray-900 hover:text-indigo-600"
                  >
                    {post.title}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {post.author.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-6 py-4 flex justify-center border-t border-gray-200">
          <nav className="flex items-center space-x-2">
            <button className="px-3 py-1 rounded text-sm text-gray-700 hover:bg-gray-100">
              1
            </button>
            <button className="px-3 py-1 rounded text-sm text-gray-400">
              2
            </button>
            <button className="px-3 py-1 rounded text-sm text-gray-400">
              3
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Home;
