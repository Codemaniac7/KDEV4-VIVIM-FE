import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import projectsAPI from "../api/projects";

const Checklist = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [checklist, setChecklist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "MEDIUM",
  });

  useEffect(() => {
    fetchChecklist();
  }, [id]);

  const fetchChecklist = async () => {
    try {
      const data = await projectsAPI.getProjectChecklist(id);
      setChecklist(data);
      setLoading(false);
    } catch (err) {
      setError("체크리스트를 불러오는데 실패했습니다.");
      setLoading(false);
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      await projectsAPI.createChecklistItem(id, newItem);
      setShowAddModal(false);
      setNewItem({
        title: "",
        description: "",
        dueDate: "",
        priority: "MEDIUM",
      });
      fetchChecklist();
    } catch (err) {
      setError("체크리스트 항목 추가에 실패했습니다.");
    }
  };

  const handleToggleStatus = async (itemId, currentStatus) => {
    try {
      await projectsAPI.updateChecklistItem(id, itemId, {
        status: currentStatus === "COMPLETED" ? "PENDING" : "COMPLETED",
      });
      fetchChecklist();
    } catch (err) {
      setError("상태 업데이트에 실패했습니다.");
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "HIGH":
        return "bg-red-100 text-red-800";
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-800";
      case "LOW":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
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
        <h1 className="text-2xl font-bold text-gray-900">체크리스트</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          새 항목 추가
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white shadow rounded-lg">
        <ul className="divide-y divide-gray-200">
          {checklist.map((item) => (
            <li key={item.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <input
                    type="checkbox"
                    checked={item.status === "COMPLETED"}
                    onChange={() => handleToggleStatus(item.id, item.status)}
                    className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <div>
                    <h3
                      className={`text-lg font-medium ${
                        item.status === "COMPLETED"
                          ? "text-gray-500 line-through"
                          : "text-gray-900"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(
                      item.priority
                    )}`}
                  >
                    {item.priority}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(item.dueDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">새 체크리스트 항목</h2>
            <form onSubmit={handleAddItem}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  제목
                </label>
                <input
                  type="text"
                  value={newItem.title}
                  onChange={(e) =>
                    setNewItem({ ...newItem, title: e.target.value })
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
                  value={newItem.description}
                  onChange={(e) =>
                    setNewItem({ ...newItem, description: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows="3"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  마감일
                </label>
                <input
                  type="date"
                  value={newItem.dueDate}
                  onChange={(e) =>
                    setNewItem({ ...newItem, dueDate: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  우선순위
                </label>
                <select
                  value={newItem.priority}
                  onChange={(e) =>
                    setNewItem({ ...newItem, priority: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="LOW">낮음</option>
                  <option value="MEDIUM">중간</option>
                  <option value="HIGH">높음</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                  추가
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checklist;
