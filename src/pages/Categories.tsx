import React, {useEffect, useState} from 'react';
import {CategoryDTO} from '../types/CategoryDTO';
import {getCategories} from '../api/CategoryApi.ts';
import Loading from "../components/LoadingProps.tsx";
import CategoryList from '../components/categories/CategoryList.tsx';

const Categories: React.FC = () => {
    const [categories, setCategories] = useState<CategoryDTO[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const data = await getCategories();
                setCategories(data.content);
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) {
        return <Loading fullScreen message="Loading Categories..."/>;
    }

    return (<CategoryList categories={categories}/>
    );
};

export default Categories;
