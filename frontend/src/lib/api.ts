import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({
    baseURL: API_BASE_URL,
});

export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
    children?: Category[];
}

export interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    stockQuantity: number;
    images: string[];
    attributes: any;
    category: Category;
}

export const getProducts = async (params?: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
}) => {
    const { data } = await api.get<Product[]>('/catalog/products', { params });
    return data;
};

export const getProductBySlug = async (slug: string) => {
    const { data } = await api.get<Product>(`/catalog/products/${slug}`);
    return data;
};

export const getCategories = async () => {
    const { data } = await api.get<Category[]>('/catalog/categories');
    return data;
};

export default api;
