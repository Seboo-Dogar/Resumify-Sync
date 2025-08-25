import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

export const uploadImage = async (image) => {
    try {
        const formData = new FormData();
        formData.append('image', image);
        
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGES, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }); 
        return response.data;
    } catch (error) {
        console.log("Error uploading image", error);
        throw error;
    }
};