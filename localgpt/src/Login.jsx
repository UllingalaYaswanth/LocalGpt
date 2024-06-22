import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

function Login() {
    return (
        <div className="d-flex vh-100 justify-content-center align-items-center text-white">
            <div className="card p-4 col-md-3" style={{ minWidth: "300px" }}>
                <div className="card-body">
                    <h1 className="card-title text-center mb-4">Login</h1>
                    <form>
                        <div className="mb-4">
                            <input type="id" className="form-control" id="uid" aria-describedby="emailHelp" placeholder="UID" required />
                        </div>
                        <div className="mb-4">
                            <input type="password" className="form-control" id="password" placeholder="Password" required />
                        </div>
                        <a href="#" className="fpwd mb-4">Forgot password ?</a>
                        <button type="submit" className="btn btn-primary w-100 mt-3">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
