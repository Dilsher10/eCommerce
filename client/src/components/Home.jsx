import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    const [product, setProduct] = useState([])

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }

        axios.get('http://localhost:3001/get-products')
        .then((res)=>{
            console.log(res.data.data);
            setProduct(res.data.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }, [])

    return (
        <div>
            home
            <button onClick={() => {
                localStorage.clear();
                navigate('/login');
            }}>LOGOUT</button>

            <h1>PRODUCT LIST</h1>

            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {product.map((item, index) => {
                    return <div style={{
                        margin: '50px 30px',
                        background: '#eee',
                        width: '25%',
                        padding: '20px'
                    }}>
                        <img src={item.url} style={{ width: '100%', height: '300px' }} alt="" />
                        <p>{item.name} | {item.category}</p>
                        <p>By {item.seller}</p>
                        <p>PRICE: {item.price} Only/=</p>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Home;