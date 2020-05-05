import React from 'react'


const Link = ({ active, children, onClick }) => (
  <button
    onClick={onClick}
    disabled={active}
    style={{
      marginLeft: '4px',
      marginTop: '20px',
      width: '32%',
      height: '40px',
      fontSize: '18px',
      background: 'linear-gradient(#8e9eab, #eef2f3)',
    }}
  >
    {children}
  </button>
)

export default Link