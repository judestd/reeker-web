import { useLocation, useNavigate } from 'react-router-dom';

function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    // Get redirect path from URL params or location state
    const params = new URLSearchParams(location.search);
    const redirectPath = params.get('redirect') || location.state?.from?.pathname || '/dashboard';
    
    navigate(redirectPath, { replace: true });
  };

  // Rest of your login page code...
} 