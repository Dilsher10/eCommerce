import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {

    const navigate = useNavigate()

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [type, setType] = useState('')

    const handleSignup = () => {
        const data = { name: userName, password: password, type }
        axios.post("http://localhost:3001/signup", data)
            .then((res) => {
                if(res.data.code == 200){
                    navigate('/login');
                }
            })
            .catch((err) => {
                console.log(err, 20)
            })
    }

    return (
        <div>
            <h1>SIGNUP PAGE</h1>
            USERNAME-
            <input type="text" value={userName} onChange={(e) => { setUserName(e.target.value) }} /> <br /> <br />

            PASSWORD-
            <input type="text" value={password} onChange={(e) => { setPassword(e.target.value) }} /> <br /> <br />

            TYPE-
            <input type="text" value={type} onChange={(e) => { setType(e.target.value) }} /> <br /> <br />

            <button onClick={handleSignup}>SUBMIT</button>
        </div>
    )
}

export default Signup;