import{n as u,b9 as p,h as g,j as e,ba as h}from"./index-DWVIrarL.js";import{g as x}from"./helpers-Bya_dLxO.js";import{C as w}from"./index-BwZGRhAa.js";import{F as r,I as m,s as c}from"./index-CL68ldrU.js";import{B as f}from"./button-ZitA0x0c.js";import"./TextArea-ecw0KRlF.js";import"./compact-item-C3Bf5F0_.js";const y={id:x(),name:"Admin User",fullName:"Admin User",email:"admin@example.com",role:"ADMIN",isActive:!0,status:"active",avatarUrl:"https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"},j={login:(s,i)=>new Promise((t,a)=>{setTimeout(()=>{s==="admin@example.com"?t({user:y,token:"mock-jwt-token"}):a(new Error("Invalid credentials"))},500)})},v="auth_token",I=s=>localStorage.setItem(v,s),T=()=>{const s=u(),i=p(),[t,a]=g.useState(!1),d=async o=>{a(!0);try{const{user:n,token:l}=await j.login(o.email,o.password);I(l),s(h({user:n,token:l})),i("/dashboard"),c.success({message:"Welcome",description:"Login successful!"})}catch{c.error({message:"Login Failed",description:"Invalid email or password. Try admin@example.com with any password."})}finally{a(!1)}};return e.jsx("div",{className:"min-h-screen flex items-center justify-center bg-gray-100",children:e.jsx(w,{title:"Admin Login",className:"w-[400px]",children:e.jsxs(r,{name:"login",onFinish:d,layout:"vertical",requiredMark:!1,initialValues:{email:"admin@example.com",password:"123456"},children:[e.jsx(r.Item,{name:"email",label:"Email",rules:[{required:!0,message:"Please input your email!"},{type:"email",message:"Please enter a valid email!"}],children:e.jsx(m,{size:"large",placeholder:"Enter your email"})}),e.jsx(r.Item,{name:"password",label:"Password",rules:[{required:!0,message:"Please input your password!"}],children:e.jsx(m.Password,{size:"large",placeholder:"Enter your password"})}),e.jsx(r.Item,{children:e.jsx(f,{type:"primary",htmlType:"submit",loading:t,className:"w-full",size:"large",children:"Log in"})})]})})})};export{T as default};