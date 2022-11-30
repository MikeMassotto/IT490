import React from "react";
import Axios from "axios";
import Cookies from "universal-cookie";

function Register() {
    const cookies = new Cookies();
    const [user, setUser] = React.useState(null);
    const SignUp = () => {
        Axios.post("http://localhost:3001/register", user).then(res => { 
            const { username, passwordHahsed } = res.data;

            console.log(res.data);
         });
    };
    return (
        <div className="flex flex-col">
            <label>Sign Up</label>
            <input type="text" placeholder="Username" onChange={(event)=>{
                setUser({...user, username: event.target.value});
            }} />
            <input type="password" placeholder="Password" onChange={(event)=>{
                setUser({...user, password: event.target.value});
            }} />
            <button onClick={SignUp}>Register</button>
        </div>
    );
}

export default Register;