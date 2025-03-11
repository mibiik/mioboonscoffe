import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Reservation() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to Google Forms URL
    window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSfltdzatCq4MIYw3tj7LVZHzGlJskWDQbCKFxhcHrD67qlvNg/viewform?usp=header';
  }, []);

  return null; // No need to render anything as we're redirecting
}