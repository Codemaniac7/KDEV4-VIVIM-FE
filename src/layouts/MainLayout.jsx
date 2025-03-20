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
    <div className="flex flex-col min-h-screen">
      {/* 헤더 */}
      <header className="header">
        <div className="container">
          <div className="nav">
            {/* 로고 및 메인 네비게이션 */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Link to="/" className="logo">
                  VIVIM
                </Link>
              </div>
              <nav className="nav-menu">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* 사용자 메뉴 */}
            <div style={{ display: "flex", alignItems: "center" }}>
              {user ? (
                <div style={{ position: "relative" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <button
                      style={{
                        backgroundColor: "#f3f4f6",
                        padding: "0.25rem",
                        borderRadius: "50%",
                        color: "#9ca3af",
                        marginRight: "0.75rem",
                      }}
                    >
                      <svg
                        style={{ width: "1.5rem", height: "1.5rem" }}
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
                      style={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#f3f4f6",
                        borderRadius: "9999px",
                        padding: "0.25rem",
                      }}
                    >
                      <div
                        style={{
                          width: "2rem",
                          height: "2rem",
                          borderRadius: "50%",
                          backgroundColor: "#4f46e5",
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {user.name?.[0] || "U"}
                      </div>
                      <span style={{ marginLeft: "0.5rem", color: "#4b5563" }}>
                        {user.name}
                      </span>
                      <svg
                        style={{
                          marginLeft: "0.25rem",
                          width: "1.25rem",
                          height: "1.25rem",
                          color: "#9ca3af",
                        }}
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
                    <div
                      style={{
                        position: "absolute",
                        top: "100%",
                        right: 0,
                        marginTop: "0.5rem",
                        width: "12rem",
                        backgroundColor: "white",
                        borderRadius: "0.375rem",
                        boxShadow:
                          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                        border: "1px solid rgba(0, 0, 0, 0.05)",
                        zIndex: 10,
                      }}
                    >
                      <div
                        style={{
                          padding: "0.5rem 1rem",
                          color: "#4b5563",
                          fontSize: "0.875rem",
                          borderBottom: "1px solid #e5e7eb",
                        }}
                      >
                        {user.name}
                      </div>
                      <Link
                        to="/profile"
                        style={{
                          display: "block",
                          padding: "0.5rem 1rem",
                          color: "#4b5563",
                          fontSize: "0.875rem",
                          textDecoration: "none",
                        }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.backgroundColor = "#f3f4f6")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "transparent")
                        }
                      >
                        프로필
                      </Link>
                      <Link
                        to="/account"
                        style={{
                          display: "block",
                          padding: "0.5rem 1rem",
                          color: "#4b5563",
                          fontSize: "0.875rem",
                          textDecoration: "none",
                        }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.backgroundColor = "#f3f4f6")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "transparent")
                        }
                      >
                        계정 설정
                      </Link>
                      <button
                        onClick={logout}
                        style={{
                          display: "block",
                          width: "100%",
                          textAlign: "left",
                          padding: "0.5rem 1rem",
                          color: "#4b5563",
                          fontSize: "0.875rem",
                          border: "none",
                          background: "none",
                          cursor: "pointer",
                        }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.backgroundColor = "#f3f4f6")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "transparent")
                        }
                      >
                        로그아웃
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "0.5rem 1rem",
                    backgroundColor: "#4f46e5",
                    color: "white",
                    borderRadius: "0.375rem",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    textDecoration: "none",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#4338ca")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "#4f46e5")
                  }
                >
                  로그인
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* 사이드바 */}
        <aside className="sidebar">
          <div style={{ padding: "1rem" }}>
            <h2
              style={{
                fontSize: "1.125rem",
                fontWeight: "500",
                color: "#111827",
                marginBottom: "1rem",
              }}
            >
              프로젝트
            </h2>

            <div style={{ marginBottom: "1.5rem" }}>
              <h3
                style={{
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: "#6b7280",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "0.5rem",
                }}
              >
                진행 중인 프로젝트
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.25rem",
                }}
              >
                {loading ? (
                  <li
                    style={{
                      padding: "0.5rem",
                      fontSize: "0.875rem",
                      color: "#6b7280",
                    }}
                  >
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
                          style={{
                            display: "block",
                            padding: "0.5rem 0.75rem",
                            borderRadius: "0.375rem",
                            fontSize: "0.875rem",
                            fontWeight: "500",
                            color:
                              location.pathname === `/projects/${project.id}`
                                ? "#111827"
                                : "#4b5563",
                            backgroundColor:
                              location.pathname === `/projects/${project.id}`
                                ? "#f3f4f6"
                                : "transparent",
                            textDecoration: "none",
                          }}
                          onMouseOver={(e) => {
                            if (
                              location.pathname !== `/projects/${project.id}`
                            ) {
                              e.currentTarget.style.backgroundColor = "#f9fafb";
                              e.currentTarget.style.color = "#111827";
                            }
                          }}
                          onMouseOut={(e) => {
                            if (
                              location.pathname !== `/projects/${project.id}`
                            ) {
                              e.currentTarget.style.backgroundColor =
                                "transparent";
                              e.currentTarget.style.color = "#4b5563";
                            }
                          }}
                        >
                          {project.name}
                        </Link>
                      </li>
                    ))
                ) : (
                  <li
                    style={{
                      padding: "0.5rem",
                      fontSize: "0.875rem",
                      color: "#6b7280",
                    }}
                  >
                    진행중인 프로젝트가 없습니다
                  </li>
                )}
              </ul>
            </div>

            <div>
              <h3
                style={{
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: "#6b7280",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "0.5rem",
                }}
              >
                완료된 프로젝트
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.25rem",
                }}
              >
                {loading ? (
                  <li
                    style={{
                      padding: "0.5rem",
                      fontSize: "0.875rem",
                      color: "#6b7280",
                    }}
                  >
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
                          style={{
                            display: "block",
                            padding: "0.5rem 0.75rem",
                            borderRadius: "0.375rem",
                            fontSize: "0.875rem",
                            fontWeight: "500",
                            color:
                              location.pathname === `/projects/${project.id}`
                                ? "#111827"
                                : "#4b5563",
                            backgroundColor:
                              location.pathname === `/projects/${project.id}`
                                ? "#f3f4f6"
                                : "transparent",
                            textDecoration: "none",
                          }}
                          onMouseOver={(e) => {
                            if (
                              location.pathname !== `/projects/${project.id}`
                            ) {
                              e.currentTarget.style.backgroundColor = "#f9fafb";
                              e.currentTarget.style.color = "#111827";
                            }
                          }}
                          onMouseOut={(e) => {
                            if (
                              location.pathname !== `/projects/${project.id}`
                            ) {
                              e.currentTarget.style.backgroundColor =
                                "transparent";
                              e.currentTarget.style.color = "#4b5563";
                            }
                          }}
                        >
                          {project.name}
                        </Link>
                      </li>
                    ))
                ) : (
                  <li
                    style={{
                      padding: "0.5rem",
                      fontSize: "0.875rem",
                      color: "#6b7280",
                    }}
                  >
                    완료된 프로젝트가 없습니다
                  </li>
                )}
              </ul>
            </div>
          </div>
        </aside>

        {/* 메인 콘텐츠 */}
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
