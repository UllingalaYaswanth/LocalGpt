import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const [uid, setUid] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.post('http://localhost:8081/login', { uid, password })
            .then(response => {
                console.log(response.data);
                if (response.data.status === "success") {
                    const { role } = response.data;
                    switch (role) {
                        case "user":
                            navigate('/user');
                            break;
                        case "admin":
                            navigate('/admin');
                            break;
                        case "developer":
                            navigate('/developer');
                            break;
                        default:
                            alert('Unknown role. Please contact support.');
                            break;
                    }
                } else {
                    alert('Login failed. Please check your credentials.');
                }
            })
            .catch(error => {
                console.error('Error logging in:', error);
                alert('Error logging in. Please try again later.');
            });
    };

    return (
        <div className="d-flex vh-100 justify-content-center align-items-center text-white bg-dark">
            <div className="card p-4 col-md-3 bg-secondary" style={{ minWidth: "300px" }}>
                <div className="card-body">
                    <h1 className="card-title text-center mb-4">Login</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-2">
                            <input
                                type="text"
                                className="form-control"
                                id="uid"
                                placeholder="UID"
                                value={uid}
                                onChange={(e) => setUid(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <a href="#" className="fpwd mb-4 text-white">Forgot password ?</a>
                        <button type="submit" className="btn btn-primary w-100 mt-3">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
