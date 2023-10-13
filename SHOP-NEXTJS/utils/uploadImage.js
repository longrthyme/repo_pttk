import { API_URL } from "@/config";

export const handleImageUpload = async (payload) => {
  console.log("Chuan bi upload anh");
  const formData = new FormData();
  formData.append("file", payload);

  try {
    const response = await fetch(`${API_URL}/upload/image`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Lỗi upload ảnh vui lòng thử lại");
    }

    const data = response.text();
    console.log("Url anh " + data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error.message;
  }
};
