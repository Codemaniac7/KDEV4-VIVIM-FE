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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <div
          style={{
            animation: "spin 1s linear infinite",
            width: "3rem",
            height: "3rem",
            borderRadius: "50%",
            borderBottom: "2px solid #4f46e5",
          }}
        ></div>
      </div>
    );
  }

  return (
    <div>
      {error && (
        <div
          style={{
            backgroundColor: "#fee2e2",
            border: "1px solid #ef4444",
            color: "#b91c1c",
            padding: "0.75rem 1rem",
            borderRadius: "0.25rem",
            marginBottom: "1rem",
          }}
        >
          {error}
        </div>
      )}

      {/* 프로젝트 단계 섹션 */}
      <div className="board" style={{ marginBottom: "2rem" }}>
        <div className="board-header">
          <h2 className="board-title">프로젝트 단계</h2>
        </div>
        <div className="project-stages" style={{ padding: "1.5rem" }}>
          <div className="stage">
            <div className="stage-number">1</div>
            <div className="stage-info">
              <h3 className="stage-title">기획</h3>
              <div className="stage-status status-active">진행중</div>
            </div>
          </div>

          <div className="stage stage-inactive">
            <div className="stage-number">2</div>
            <div className="stage-info">
              <h3 className="stage-title">디자인</h3>
              <div className="stage-status status-waiting">대기중</div>
            </div>
          </div>

          <div className="stage stage-inactive">
            <div className="stage-number">3</div>
            <div className="stage-info">
              <h3 className="stage-title">이행</h3>
              <div className="stage-status status-waiting">대기중</div>
            </div>
          </div>

          <div className="stage stage-inactive">
            <div className="stage-number">4</div>
            <div className="stage-info">
              <h3 className="stage-title">테스트</h3>
              <div className="stage-status status-waiting">대기중</div>
            </div>
          </div>
        </div>
      </div>

      {/* 게시판 섹션 */}
      <div className="board">
        <div className="board-header">
          <h2 className="board-title">게시판</h2>
          <Link
            to="/board"
            style={{
              color: "#4f46e5",
              fontSize: "0.875rem",
              textDecoration: "none",
            }}
          >
            더보기
          </Link>
        </div>
        <table className="board-table">
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {recentPosts.map((post, index) => (
              <tr key={post.id}>
                <td>{index + 1}</td>
                <td>
                  <Link
                    to={`/board/${post.id}`}
                    style={{
                      color: "#111827",
                      textDecoration: "none",
                      fontWeight: "500",
                    }}
                  >
                    {post.title}
                  </Link>
                </td>
                <td>{post.author.name}</td>
                <td>{new Date(post.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <button className="page-button active">1</button>
          <button className="page-button inactive">2</button>
          <button className="page-button inactive">3</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
