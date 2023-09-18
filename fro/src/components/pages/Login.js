import React, { useState } from 'react';
import { useDispatch } from "react-redux";
// import { Login } from "../../redux/reducers/users";
import { Login as LoginAc } from '../../redux/reducers/users';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };
  const dispatch = useDispatch();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Нэвтрэх</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">Нэвтрэх нэр</label>
            <input
       
              id="email"
              className="border rounded-md px-3 py-2 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">Нууц үг</label>
            <input
              type="password"
              id="password"
              className="border rounded-md px-3 py-2 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"  onClick={() => {
                    dispatch(LoginAc({username: email , password}));
                  }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;