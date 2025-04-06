const API_URL = "http://localhost:8000/tasks";

export const getTasks = async (completedOnly = false) => {
  try {
    const url = completedOnly ? `${API_URL}/?is_completed=true` : API_URL;
    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error(`Failed to fetch tasks: ${error.message}`);
  }
};

export const createTask = async (taskData) => {
  try {
    if (!taskData.title_text || !taskData.detail_text) {
      throw new Error("title_text and detail_text are required");
    }

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title_text: taskData.title_text.trim(),
        detail_text: taskData.detail_text.trim()
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating task:", error);
    throw new Error(`Failed to create task: ${error.message}`);
  }
};

export const updateTask = async (id, taskData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title_text: taskData.title_text?.trim(),
        detail_text: taskData.detail_text?.trim(),
        is_completed: taskData.is_completed
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating task:", error);
    throw new Error(`Failed to update task: ${error.message}`);
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }

    return response.status === 204 ? { id } : await response.json();
  } catch (error) {
    console.error("Error deleting task:", error);
    throw new Error(`Failed to delete task: ${error.message}`);
  }
};

export const toggleTaskCompletion = async (id, is_completed) => {
  try {
    const response = await fetch(`${API_URL}/${id}/complete`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        is_completed: is_completed
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error toggling task completion:", error);
    throw error;
  }
};