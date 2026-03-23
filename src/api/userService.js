import apiClient from "./apiClient";

export const getUserById = async (userId) => {
    const res = await apiClient.get(`/users/${userId}`);
    return res.data;
};

export const updateUser = async (userId, userData) => {
    const res = await apiClient.put(`/users/${userId}`, userData);
    return res.data;
};

export const changePassword = async (userId, currentPassword, newPassword) => {
    const res = await apiClient.put(`/users/${userId}/change-password`, {
        currentPassword,
        newPassword,
    });
    return res.data;
};