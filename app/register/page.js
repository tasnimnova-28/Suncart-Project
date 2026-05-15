'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', image: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  const inputStyle = {
    width:'100%', padding:'14px 16px', borderRadius:'12px',
    border:'2px solid #fed7aa', outline:'none', fontSize:'15px',
    boxSizing:'border-box', fontFamily:'sans-serif'
  };

  return (
    <div style={{
      minHeight:'100vh',
      background:'linear-gradient(135deg, #f97316 0%, #facc15 50%, #ef4444 100%)',
      display:'flex', alignItems:'center', justifyContent:'center',
      padding:'20px', fontFamily:'sans-serif'
    }}>
      <div style={{
        background:'white', borderRadius:'28px', padding:'48px 40px',
        width:'100%', maxWidth:'440px',
        boxShadow:'0 25px 60px rgba(0,0,0,0.15)'
      }}>
        <div style={{textAlign:'center', marginBottom:'28px'}}>
          <div style={{fontSize:'52px', marginBottom:'8px'}}>🌴</div>
          <h1 style={{fontSize:'28px', fontWeight:'800', color:'#ea580c', margin:'0 0 6px'}}>Join SunCart!</h1>
          <p style={{color:'#9ca3af', margin:0, fontSize:'14px'}}>Create your free account today</p>
        </div>

        <form onSubmit={handleRegister} style={{display:'flex', flexDirection:'column', gap:'14px'}}>
          {[
            {label:'Full Name', name:'name', type:'text', placeholder:'Your full name'},
            {label:'Email Address', name:'email', type:'email', placeholder:'you@example.com'},
            {label:'Photo URL (optional)', name:'image', type:'url', placeholder:'https://...'},
            {label:'Password', name:'password', type:'password', placeholder:'Min. 8 characters'},
          ].map(field => (
            <div key={field.name}>
              <label style={{display:'block', fontWeight:'600', color:'#374151', marginBottom:'6px', fontSize:'14px'}}>
                {field.label}
              </label>
              <input
                type={field.type} name={field.name} placeholder={field.placeholder}
                required={field.name !== 'image'}
                value={form[field.name]} onChange={handleChange}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor='#f97316'}
                onBlur={e => e.target.style.borderColor='#fed7aa'}
              />
            </div>
          ))}

          {form.image && (
            <div style={{textAlign:'center'}}>
              <img src={form.image} alt="preview"
                style={{width:'60px', height:'60px', borderRadius:'50%', objectFit:'cover', border:'3px solid #f97316'}}
              />
            </div>
          )}

          <button
            type="submit" disabled={loading}
            style={{
              width:'100%', padding:'15px',
              background: loading ? '#fdba74' : 'linear-gradient(135deg, #f97316, #eab308)',
              color:'white', border:'none', borderRadius:'12px',
              fontSize:'16px', fontWeight:'700', cursor:'pointer', marginTop:'4px'
            }}
          >
            {loading ? '⏳ Creating account...' : '🚀 Create My Account'}
          </button>
        </form>

        <div style={{display:'flex', alignItems:'center', gap:'12px', margin:'20px 0'}}>
          <div style={{flex:1, height:'1px', background:'#e5e7eb'}}/>
          <span style={{color:'#9ca3af', fontSize:'13px'}}>OR</span>
          <div style={{flex:1, height:'1px', background:'#e5e7eb'}}/>
        </div>

        <button style={{
          width:'100%', padding:'14px', background:'white',
          border:'2px solid #e5e7eb', borderRadius:'12px',
          fontSize:'15px', fontWeight:'600', color:'#374151',
          cursor:'pointer', display:'flex', alignItems:'center',
          justifyContent:'center', gap:'10px'
        }}>
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" style={{width:'20px', height:'20px'}} alt="G"/>
          Continue with Google
        </button>

        <p style={{textAlign:'center', color:'#6b7280', marginTop:'24px', fontSize:'14px'}}>
          Already have an account?{' '}
          <Link href="/login" style={{color:'#f97316', fontWeight:'700', textDecoration:'none'}}>Login →</Link>
        </p>
      </div>
    </div>
  );
}