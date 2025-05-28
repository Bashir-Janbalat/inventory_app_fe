import axiosInstance from './AxiosInstance.ts';
import {UserDTO} from "../types/UserDTO.ts";
import {RoleDTO} from "../types/RoleDTO.ts";
import {getDetailedApiError} from "../utils/ErrorUtils.ts";
import {PagedResponseDTO} from "../types/PagedResponseDTO.ts";


export const getUsers = async (page?: number, size?: number): Promise<PagedResponseDTO<UserDTO>> => {
    try {
        const response = await axiosInstance.get('/users', {
            params: {
                page,
                size
            }
        });
        return response.data as PagedResponseDTO<UserDTO>;
    } catch (error) {
        throw getDetailedApiError(error);
    }
};

export const getRoles = async (): Promise<RoleDTO[]> => {
    try {
        const response = await axiosInstance.get('/users/roles');
        return response.data;
    } catch (error) {
        throw getDetailedApiError(error);
    }
};

export const assignRole = async (userId: number, role: RoleDTO): Promise<number> => {
    try {
        const response = await axiosInstance.post(`/users/${userId}/roles`, role);
        return response.status;
    } catch (error) {
        throw getDetailedApiError(error);
    }
};

export const addRole = async (roleName: string): Promise<RoleDTO> => {
    try {
        const response = await axiosInstance.post(`/users/roles`, {name: roleName});
        return response.data;
    } catch (error) {
        throw getDetailedApiError(error);
    }
};

export const removeRoleFromUser = async (userId: number, roleId: number): Promise<number> => {
    try {
        const response = await axiosInstance.delete(`/users/${userId}/roles/${roleId}`);
        return response.status;
    } catch (error) {
        throw getDetailedApiError(error);
    }
};

export const deleteRole = async (roleId: number): Promise<number> => {
    try {
        const response = await axiosInstance.delete(`/users/roles/${roleId}`);
        return response.status;
    } catch (error) {
        throw getDetailedApiError(error);
    }
}

export const setUserActive = async (userId: number): Promise<number> => {
    try {
        const response = await axiosInstance.post(`/users/activate/${userId}`);
        return response.status;
    } catch (error) {
        throw getDetailedApiError(error);
    }
}
