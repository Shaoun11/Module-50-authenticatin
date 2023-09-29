import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';

import React, { useRef, useState } from 'react';
import { Form, Link } from 'react-router-dom';
import auth from './emakilauthentication';
import { FaRegEyeSlash,FaRegEye } from 'react-icons/fa';

const Login = () => {

    const [error,seterror]=useState('')
    const [success,setsuccess]=useState('')
    const [showpass,setpass]=useState(false)
    const emailref=useRef(null);

 
    const handle=e=>{
        e.preventDefault()
        const email=e.target.email.value ;
        const password=e.target.password.value;
        console.log(email,password);

        seterror('');
        setsuccess('');
        
        if (password.length < 6) {
            seterror("Password should be at least 6 characters ")
            return;
        }
        else if (!/[A-Z]+[a-z]/.test(password)) {
            seterror("Invalid Password Input for Uppercase and Lowercase ")
            return;
        }
      
       

        // authentication intzation on firebase
        signInWithEmailAndPassword(auth,email,password)
        .then(result=>{
            const user=result.user
            setsuccess("Log in successfully")
        })
        .catch(error=>{
           seterror(error.message);
           
        })
        
    }

    const resetpasswordhandle=()=>{
        const email=emailref.current.value;

        seterror('');
        // setsuccess('');

        if (!email) {
            console.log("email not  found");
            seterror("please provide an email")
            return;  
        }

        else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
              seterror("invalid email")
            console.log(email);
            return;

        }

        // send for reset password
        sendPasswordResetEmail(auth,email)
        .then(()=>{
            alert("Please your email check")
        })
        .catch(error=>{
            console.log(error);
        })

        
    

    }

    return (
        <div>
        <div className="hero min-h-screen bg-green-100">
<div className="hero-content flex-col lg:flex-row-reverse">
<div className="text-center lg:text-left">
  <h1 className="text-5xl font-bold">Log in now!</h1>
  <p className="py-6">Provident cupiditate voluptatem et in.  Quaerat fugiat ut assumenda excepturi <br /> exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
</div>
<div className="card flex-shrink-0 w-96 h-[430px] max-w-sm shadow-2xl bg-base-100">
  <Form onSubmit={handle}>
  <div className="card-body">
    <div className="form-control">
      <label className="label">
        <span className="label-text">Email</span>
      </label>
      <input type="email"
      ref={emailref}
      name='email' required placeholder="email" className="input input-bordered" />
    </div>
    <div className="form-control">
      <label className="label">
        <span className="label-text">Password</span>
      </label>
      <input type={
        showpass? "text" : "password"
      }
      placeholder="password" name='password' required className="input input-bordered" />
      <label className="label">
        <span className='absolute -mt-24 ml-72 hover:cursor-pointer' onClick={()=>setpass(!showpass)}>{ showpass ?  <FaRegEyeSlash></FaRegEyeSlash> : <FaRegEye></FaRegEye> }</span>
        <a  onClick={resetpasswordhandle} className="label-text-alt link mt-4 link-hover">Forgot password?</a>
      </label>
    </div>
    <div className="form-control mt-6">
      <button className="btn btn-primary bg-pink-500 border-none text-white">Log in</button>
    </div>
  </div>
  </Form>
  <p className='ml-9'>You have no account ! Please <Link to={"/register"}>Register</Link> </p>
 
  {
    error && <h1 className='font-semibold text-red-500 ml-7'>{error}</h1>
  }
  <div>
  {
    success && <h1 className='font-semibold text-green-500 ml-24'>{success}</h1>
  }
   </div>
</div>
</div>
</div>
    </div>
    );
};

export default Login;