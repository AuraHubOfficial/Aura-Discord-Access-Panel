import React, { useState, useEffect } from 'react';
import { Disc as Discord } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';

function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const CLIENT_ID = 'Add Your Bot Client Here';
  const REDIRECT_URI = encodeURIComponent('http://localhost:5174/auth/discord/callback');
  const DISCORD_AUTH_URL = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${encodeURIComponent('identify guilds.join guilds')}`;

  useEffect(() => {
    // Check for auth status in URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');

    if (code) {
      // Exchange code for token and join server
      fetch('http://localhost:3000/auth/discord/callback?' + urlParams.toString())
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            toast.success(
              'Login successful! You have been added to the server with your role.',
              { duration: 4000 }
            );
            setTimeout(() => {
              window.close();
            }, 5000);
          } else {
            throw new Error(data.error || 'Failed to authenticate');
          }
        })
        .catch(err => {
          toast.error(
            err.message || 'Failed to authenticate. Please try again.',
            { duration: 4000 }
          );
        });
    } else if (error) {
      toast.error(
        'Login failed. Please try again.',
        { duration: 4000 }
      );
    }

    // Create stars
    const createStars = () => {
      const starsContainer = document.querySelector('.stars');
      if (!starsContainer) return;

      for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.setProperty('--duration', `${2 + Math.random() * 4}s`);
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.width = `${1 + Math.random() * 2}px`;
        star.style.height = star.style.width;
        starsContainer.appendChild(star);
      }
    };

    createStars();

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    // Disable right click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('contextmenu', handleContextMenu);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  const handleDiscordLogin = () => {
    window.open(DISCORD_AUTH_URL, '_self');
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] overflow-hidden">
      <Toaster position="top-center" toastOptions={{
        style: {
          background: 'rgba(17, 24, 39, 0.9)',
          color: '#fff',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      }} />
      <div className="stars" />
      <div
        className="cursor-glow"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
        }}
      />
      
      <div className="content-wrapper min-h-screen flex items-center justify-center">
        <div className="glass-morphism rounded-2xl p-8 w-full max-w-md mx-4">
          <div className="flex flex-col items-center mb-8">
            <Discord className="w-16 h-16 text-blue-500 mb-4" />
            <h1 className="text-3xl font-bold text-white">Welcome to Aura Auth</h1>
            <p className="text-blue-200 mt-2 text-center">
              Click below to authenticate with Discord and receive your role
            </p>
          </div>

          <button
            onClick={handleDiscordLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all hover-glow flex items-center justify-center space-x-2"
          >
            <Discord className="w-5 h-5" />
            <span>Login with Discord</span>
          </button>

          <p className="text-center text-blue-200 text-sm mt-6">
            Don't have Discord?{' '}
            <a href="https://discord.com" className="text-blue-400 hover:text-blue-300 transition-colors">
              Create an account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;