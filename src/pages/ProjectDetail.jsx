import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import projectsAPI from "../api/projects";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProject, setEditProject] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      const data = await projectsAPI.getProject(id);
      setProject(data);
      setEditProject({
        name: data.name,
        description: data.description,
        startDate: data.startDate,
        endDate: data.endDate,
      });
      setLoading(false);
    } catch (err) {
      setError("프로젝트 정보를 불러오는데 실패했습니다.");
      setLoading(false);
    }
  };

  const handleUpdateProject = async (e) => {
    e.preventDefault();
    try {
      await projectsAPI.updateProject(id, editProject);
      setShowEditModal(false);
      fetchProject();
    } catch (err) {
      setError("프로젝트 수정에 실패했습니다.");
    }
  };

  const handleDeleteProject = async () => {
    if (window.confirm("정말로 이 프로젝트를 삭제하시겠습니까?")) {
      try {
        await projectsAPI.deleteProject(id);
        navigate("/projects");
      } catch (err) {
        setError("프로젝트 삭제에 실패했습니다.");
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

  if (!project) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold text-gray-900">
          프로젝트를 찾을 수 없습니다.
        </h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
        <div className="space-x-2">
          <button
            onClick={() => setShowEditModal(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            수정
          </button>
          <button
            onClick={handleDeleteProject}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            삭제
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              프로젝트 정보
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  설명
                </label>
                <p className="mt-1 text-gray-900">{project.description}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  시작일
                </label>
                <p className="mt-1 text-gray-900">
                  {new Date(project.startDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  종료일
                </label>
                <p className="mt-1 text-gray-900">
                  {new Date(project.endDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              빠른 링크
            </h2>
            <div className="space-y-4">
              <button
                onClick={() => navigate(`/projects/${id}/checklist`)}
                className="w-full bg-white border border-gray-300 rounded-md px-4 py-2 text-gray-700 hover:bg-gray-50"
              >
                체크리스트 보기
              </button>
              <button
                onClick={() => navigate(`/projects/${id}/board`)}
                className="w-full bg-white border border-gray-300 rounded-md px-4 py-2 text-gray-700 hover:bg-gray-50"
              >
                게시판 보기
              </button>
            </div>
          </div>
        </div>
      </div>

      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">프로젝트 수정</h2>
            <form onSubmit={handleUpdateProject}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  프로젝트명
                </label>
                <input
                  type="text"
                  value={editProject.name}
                  onChange={(e) =>
                    setEditProject({ ...editProject, name: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  설명
                </label>
                <textarea
                  value={editProject.description}
                  onChange={(e) =>
                    setEditProject({
                      ...editProject,
                      description: e.target.value,
                    })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows="3"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  시작일
                </label>
                <input
                  type="date"
                  value={editProject.startDate}
                  onChange={(e) =>
                    setEditProject({
                      ...editProject,
                      startDate: e.target.value,
                    })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  종료일
                </label>
                <input
                  type="date"
                  value={editProject.endDate}
                  onChange={(e) =>
                    setEditProject({ ...editProject, endDate: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                  저장
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
