'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #ff9a3c 0%, #ffcc02 50%, #ff6b35 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'sans-serif'
    }}>
      {/* Decorative blobs */}
      <div style={{position:'fixed',top:'-80px',left:'-80px',width:'300px',height:'300px',borderRadius:'50%',background:'rgba(255,255,255,0.1)',zIndex:0}}/>
      <div style={{position:'fixed',bottom:'-60px',right:'-60px',width:'250px',height:'250px',borderRadius:'50%',background:'rgba(255,255,255,0.1)',zIndex:0}}/>

      <div style={{
        background: 'white',
        borderRadius: '28px',
        padding: '48px 40px',
        width: '100%',
        maxWidth: '420px',
        boxShadow: '0 25px 60px rgba(0,0,0,0.15)',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Header */}
        <div style={{textAlign:'center', marginBottom:'32px'}}>
          <div style={{fontSize:'52px', marginBottom:'8px'}}>🌞</div>
          <h1 style={{fontSize:'28px', fontWeight:'800', color:'#ea580c', margin:'0 0 6px'}}>Welcome Back!</h1>
          <p style={{color:'#9ca3af', margin:0, fontSize:'14px'}}>Sign in to your SunCart account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} style={{display:'flex', flexDirection:'column', gap:'16px'}}>
          <div>
            <label style={{display:'block', fontWeight:'600', color:'#374151', marginBottom:'6px', fontSize:'14px'}}>Email Address</label>
            <input
              type="email" name="email" required
              value={form.email} onChange={handleChange}
              placeholder="you@example.com"
              style={{
                width:'100%', padding:'14px 16px', borderRadius:'12px',
                border:'2px solid #fed7aa', outline:'none', fontSize:'15px',
                transition:'border-color 0.2s', boxSizing:'border-box'
              }}
              onFocus={e => e.target.style.borderColor='#f97316'}
              onBlur={e => e.target.style.borderColor='#fed7aa'}
            />
          </div>

          <div>
            <label style={{display:'block', fontWeight:'600', color:'#374151', marginBottom:'6px', fontSize:'14px'}}>Password</label>
            <input
              type="password" name="password" required
              value={form.password} onChange={handleChange}
              placeholder="Enter your password"
              style={{
                width:'100%', padding:'14px 16px', borderRadius:'12px',
                border:'2px solid #fed7aa', outline:'none', fontSize:'15px',
                boxSizing:'border-box'
              }}
              onFocus={e => e.target.style.borderColor='#f97316'}
              onBlur={e => e.target.style.borderColor='#fed7aa'}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width:'100%', padding:'15px',
              background: loading ? '#fdba74' : 'linear-gradient(135deg, #f97316, #eab308)',
              color:'white', border:'none', borderRadius:'12px',
              fontSize:'16px', fontWeight:'700', cursor:'pointer',
              marginTop:'4px', transition:'opacity 0.2s'
            }}
          >
            {loading ? '⏳ Signing in...' : '🔑 Login to SunCart'}
          </button>
        </form>

        {/* Divider */}
        <div style={{display:'flex', alignItems:'center', gap:'12px', margin:'20px 0'}}>
          <div style={{flex:1, height:'1px', background:'#e5e7eb'}}/>
          <span style={{color:'#9ca3af', fontSize:'13px', fontWeight:'500'}}>OR</span>
          <div style={{flex:1, height:'1px', background:'#e5e7eb'}}/>
        </div>

        {/* Google Button */}
        <button
          onClick={() => {}}
          style={{
            width:'100%', padding:'14px',
            background:'white', border:'2px solid #e5e7eb',
            borderRadius:'12px', fontSize:'15px', fontWeight:'600',
            color:'#374151', cursor:'pointer', display:'flex',
            alignItems:'center', justifyContent:'center', gap:'10px',
            transition:'border-color 0.2s, background 0.2s'
          }}
          onMouseEnter={e => { e.target.style.borderColor='#f97316'; e.target.style.background='#fff7ed'; }}
          onMouseLeave={e => { e.target.style.borderColor='#e5e7eb'; e.target.style.background='white'; }}
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" style={{width:'20px', height:'20px'}} alt="G"/>
          Continue with Google
        </button>

        {/* Footer */}
        <p style={{textAlign:'center', color:'#6b7280', marginTop:'24px', fontSize:'14px'}}>
          Don't have an account?{' '}
          <Link href="/register" style={{color:'#f97316', fontWeight:'700', textDecoration:'none'}}>
            Register Free →
          </Link>
        </p>
      </div>
    </div>
  );
}