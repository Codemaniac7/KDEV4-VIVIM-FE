import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import projectsAPI from "../api/projects";

const MainLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = [
    { name: "대시보드", path: "/" },
    { name: "프로젝트", path: "/projects" },
    { name: "일정관리", path: "/schedule" },
    { name: "리소스", path: "/resources" },
    { name: "설정", path: "/settings" },
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectsAPI.getProjects();
        setProjects(data);
        setLoading(false);
      } catch (err) {
        console.error("프로젝트 목록을 불러오는데 실패했습니다:", err);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* 헤더 */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* 로고 및 메인 네비게이션 */}
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="text-xl font-bold text-indigo-600">
                  VIVIM
                </Link>
              </div>
              <nav className="hidden md:ml-8 md:flex space-x-8">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) =>
                      `border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                        isActive ? "border-indigo-500 text-indigo-600" : ""
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* 사용자 메뉴 */}
            <div className="flex items-center">
              {user ? (
                <div className="relative">
                  <div className="flex items-center">
                    <button className="bg-gray-100 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none mr-3">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center max-w-xs bg-gray-100 rounded-full text-sm focus:outline-none p-1"
                    >
                      <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                        {user.name?.[0] || "U"}
                      </div>
                      <span className="ml-2 text-gray-700">{user.name}</span>
                      <svg
                        className="ml-1 h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 20 20"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>
                  {showUserMenu && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-10">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b">
                        {user.name}
                      </div>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        프로필
                      </Link>
                      <Link
                        to="/account"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        계정 설정
                      </Link>
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        로그아웃
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  로그인
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* 사이드바 */}
        <aside className="w-64 bg-white border-r border-gray-200">
          <div className="p-4">
            <h2 className="text-lg font-medium text-gray-900 mb-4">프로젝트</h2>

            <div className="mb-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                진행 중인 프로젝트
              </h3>
              <ul className="space-y-1">
                {loading ? (
                  <li className="px-2 py-1 text-sm text-gray-500">
                    로딩 중...
                  </li>
                ) : projects.filter(
                    (project) => project.status === "IN_PROGRESS"
                  ).length > 0 ? (
                  projects
                    .filter((project) => project.status === "IN_PROGRESS")
                    .map((project) => (
                      <li key={project.id}>
                        <Link
                          to={`/projects/${project.id}`}
                          className={`block px-3 py-2 rounded-md text-sm font-medium ${
                            location.pathname === `/projects/${project.id}`
                              ? "bg-gray-200 text-gray-900"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          }`}
                        >
                          {project.name}
                        </Link>
                      </li>
                    ))
                ) : (
                  <li className="px-2 py-1 text-sm text-gray-500">
                    진행중인 프로젝트가 없습니다
                  </li>
                )}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                완료된 프로젝트
              </h3>
              <ul className="space-y-1">
                {loading ? (
                  <li className="px-2 py-1 text-sm text-gray-500">
                    로딩 중...
                  </li>
                ) : projects.filter((project) => project.status === "COMPLETED")
                    .length > 0 ? (
                  projects
                    .filter((project) => project.status === "COMPLETED")
                    .map((project) => (
                      <li key={project.id}>
                        <Link
                          to={`/projects/${project.id}`}
                          className={`block px-3 py-2 rounded-md text-sm font-medium ${
                            location.pathname === `/projects/${project.id}`
                              ? "bg-gray-200 text-gray-900"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          }`}
                        >
                          {project.name}
                        </Link>
                      </li>
                    ))
                ) : (
                  <li className="px-2 py-1 text-sm text-gray-500">
                    완료된 프로젝트가 없습니다
                  </li>
                )}
              </ul>
            </div>
          </div>
        </aside>

        {/* 메인 콘텐츠 */}
        <main className="flex-1 overflow-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
