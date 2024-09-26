import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setProducts } from '../../reduxStore/productSlice';

const useFetchProducts = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get("https://prod-shop-v2.onrender.com/api/v1/products/get",{withCredentials:true});
                if(res.data.success){
                    dispatch(setProducts(res.data.products));
                console.log("Fetched products", res.data);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        
        fetchProducts();
    }, [dispatch]);
};

export default useFetchProducts;
