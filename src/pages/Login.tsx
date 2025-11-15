// import { useState } from 'react';
// import { FaLock, FaUser, FaWallet } from 'react-icons/fa';
// import { useAuth } from '../contexts/AuthContext';

// export default function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const { login } = useAuth();
// const [isLoading, setIsLoading] = useState(false);

// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   setError('');
//   setIsLoading(true);

//   if (!username || !password) {
//     setError('Please enter both username and password');
//     setIsLoading(false);
//     return;
//   }

//   try {
//     const scriptUrl = "https://script.google.com/macros/s/AKfycbx5dryxS1R5zp6myFfUlP1QPimufTqh5hcPcFMNcAJ-FiC-hyQL9mCkgHSbLkOiWTibeg/exec";
    
//     const response = await fetch(`${scriptUrl}?sheet=Login&action=fetch`);
//     const result = await response.json();
    
//     if (result.success && result.data) {
//       const users = result.data.slice(1); // Skip header row
      
//       // Find user by username and password (Column B = username, Column C = password)
//       const user = users.find((row: any[]) => 
//         row[1] === username && row[2] === password
//       );
      
//       if (user) {
//         const userData = {
//           username: user[1],
//           role: user[3],      // Column D - Role
//           pages: user[4],     // Column E - Pages
//           isAuthenticated: true,
//           loginTime: new Date().toISOString()
//         };
        
//         // Store in localStorage for persistence
//         localStorage.setItem('userSession', JSON.stringify(userData));
        
//         // Call login from AuthContext
//         login(username, password);
//       } else {
//         setError('Invalid username or password');
//       }
//     } else {
//       setError('Failed to authenticate. Please try again.');
//     }
//   } catch (error) {
//     console.error('Login error:', error);
//     setError('Connection error. Please try again.');
//   } finally {
//     setIsLoading(false);
//   }
// };


//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
//           <div className="flex justify-center mb-6">
//             <div className="bg-[#2a5298] p-4 rounded-full">
//               <FaWallet className="text-white text-4xl" />
//             </div>
//           </div>

//           <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
//             Petty Cash System
//           </h1>
//           <p className="text-center text-gray-500 mb-8">
//             Sign in to manage your expenses
//           </p>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Username
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FaUser className="text-gray-400" />
//                 </div>
//                 <input
//                   type="text"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all"
//                   placeholder="Enter your username"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FaLock className="text-gray-400" />
//                 </div>
//                 <input
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all"
//                   placeholder="Enter your password"
//                 />
//               </div>
//             </div>

//             {error && (
//               <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
//                 {error}
//               </div>
//             )}

//            <button
//   type="submit"
//   disabled={isLoading}
//   className="w-full bg-[#2a5298] text-white py-3 rounded-lg font-semibold hover:bg-[#1e3d70] transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
// >
//   {isLoading ? (
//     <>
//       <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//       </svg>
//       Signing In...
//     </>
//   ) : (
//     "Sign In"
//   )}
// </button>

//           </form>

//           <div className="mt-8 pt-6 border-t border-gray-200">
//             <p className="text-center text-sm text-gray-500">
//               Demo credentials: <span className="font-semibold">admin / admin123</span>
//             </p>
//           </div>
//         </div>

//         <div className="text-center mt-6 text-sm text-gray-600">
//           <p>Petty Cash Management System v1.0</p>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useState } from 'react';
import { FaLock, FaUser, FaWallet } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';


export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuth();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!username || !password) {
      setError('Please enter both username and password');
      setIsLoading(false);
      return;
    }

    try {
      const scriptUrl = "https://script.google.com/macros/s/AKfycbx5dryxS1R5zp6myFfUlP1QPimufTqh5hcPcFMNcAJ-FiC-hyQL9mCkgHSbLkOiWTibeg/exec";
      
      const response = await fetch(`${scriptUrl}?sheet=Login&action=fetch`);
      const result = await response.json();
      
      if (result.success && result.data) {
        const users = result.data.slice(1); // Skip header row
        
        // Find user by username and password (Column B = username, Column C = password)
        const user = users.find((row: any[]) => 
          row[1] === username && row[2] === password
        );
        
        if (user) {
          const initials = user[1]
            .split(' ')
            .map((n: string) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2) || 'U';

          const userData = {
            name: user[1],      // Username from Column B
            role: user[3],      // Role from Column D
            pages: user[4],     // Pages from Column E
            initials: initials
          };
          
          // Set user in context (will auto-save to localStorage)
          setUser(userData);
        } else {
          setError('Invalid username or password');
        }
      } else {
        setError('Failed to authenticate. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
          <div className="flex justify-center mb-6">
            <div className="bg-[#2a5298] p-4 rounded-full">
              <FaWallet className="text-white text-4xl" />
            </div>
          </div>


          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Petty Cash System
          </h1>
          <p className="text-center text-gray-500 mb-8">
            Sign in to manage your expenses
          </p>


          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all"
                  placeholder="Enter your username"
                  disabled={isLoading}
                />
              </div>
            </div>


            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all"
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
              </div>
            </div>


            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}


            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#2a5298] text-white py-3 rounded-lg font-semibold hover:bg-[#1e3d70] transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>


          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-500">
              Demo credentials: <span className="font-semibold">admin / admin123</span>
            </p>
          </div>
        </div>


        <div className="text-center mt-6 text-sm text-gray-600">
          <p>Petty Cash Management System v1.0</p>
        </div>
      </div>
    </div>
  );
}
