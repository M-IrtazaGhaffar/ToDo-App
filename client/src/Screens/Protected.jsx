import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Protected({ Component }) {
  const { login } = useSelector(state => state.r1)
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!login) {
      navigate('/login');
    }
  }, []);

  return (
    <>
      <Component />
    </>
  );
}

export default Protected;
