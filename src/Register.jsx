import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import React, { useState } from 'react';
import { Form, Link } from 'react-router-dom';
import auth from './emakilauthentication';
import { FaRegEyeSlash,FaRegEye } from 'react-icons/fa';



const Register = () => {

    const [error,seterror]=useState('')
    const [success,setsuccess]=useState('')
    const [showpass,setpass]=useState(false)

    const handle=e=>{
        e.preventDefault()
        const email=e.target.email.value ;
        const password=e.target.password.value;
        const checkbox=e.target.terms.checked;
        console.log(email,password,checkbox);

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
        else if (!checkbox) {
            seterror("Please accepted our terms and condition ")
            return;
        }


        // authentication intzation on firebase
        createUserWithEmailAndPassword(auth,email,password)
        .then(result=>{
            const user=result.user
            setsuccess("You have registed successfully")
             // send verification email: 
           sendEmailVerification(auth.currentUser)
           .then( () =>{
               alert('Please check your email and verify your account')
           })

        })
       .catch(error => {
           console.error(error);
           seterror(error.message);
       })
       
        .catch(error=>{
           seterror(error.message);
           
        })

          
    }
    return (
        <div>
            <div className="hero min-h-screen bg-pink-100">
  <div className="hero-content flex-col lg:flex-row">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Register now!</h1>
      <p className="py-6">Provident cupiditate voluptatem et in.  Quaerat fugiat ut assumenda excepturi <br /> exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    </div>
    <div className="card flex-shrink-0 w-96 h-[420px] max-w-sm shadow-2xl bg-base-100">
      <Form onSubmit={handle}>
      <div className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name='email' required placeholder="email" className="input input-bordered" />
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
            <span className='absolute -mt-16 ml-72 hover:cursor-pointer' onClick={()=>setpass(!showpass)}>{ showpass ?  <FaRegEyeSlash></FaRegEyeSlash> : <FaRegEye></FaRegEye> }</span>
          
        
     
          </label>

          <div>
          <input type="checkbox" name='terms' id='terms' />
        <label htmlFor="terms"> Accecpt our terms and condition </label>
          </div>
         
        </div>
       
        <div className="form-control mt-6">
          <button className="btn btn-primary bg-pink-500 border-none text-white">Register</button>
        </div>
      </div>
      </Form>
      <p className='ml-9'>You already an account ! Please <Link to={"/login"}>Log in</Link> </p>
 
      {
        error && <h1 className='font-semibold text-red-500 ml-7 mb-5'>{error}</h1>
      }
      <div>
      {
        success && <h1 className='font-semibold text-green-500 ml-20'>{success}</h1>
      }


      </div>
    </div>
  </div>
</div>
        </div>
    );
};

export default Register;