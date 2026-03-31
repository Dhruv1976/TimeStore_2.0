import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LoginForm from '../components/features/auth/LoginForm';
import SignupForm from '../components/features/auth/SignupForm';
import Logo from '../components/layout/Logo';

const Auth = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const isInitialized = useSelector((state) => state.auth.isInitialized);

    useEffect(() => {
        if (!isInitialized) return;
        if (user) {
            navigate('/products');
        }
    }, [user, isInitialized, navigate]);

    const [haveAccount, setHaveAccount] = useState(true);
    const toggleForm = () => {
        setHaveAccount(!haveAccount);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="flex flex-col md:flex-row">
                    <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 p-8 md:p-12 flex-col justify-center items-center text-white relative overflow-hidden">
                        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                        <div className="relative z-10 text-center">
                            <div className="mb-8">
                                <Logo />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                Welcome to TimeStore
                            </h1>
                            <p className="text-lg md:text-2xl mb-6 opacity-90">
                                Discover timeless elegance in every piece
                            </p>
                            <p className="text-sm md:text-lg max-w-xs mx-auto opacity-90">
                                Crafted watches, secure shopping, global shipping.
                            </p>
                        </div>
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white bg-opacity-10 rounded-full"></div>
                        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white bg-opacity-10 rounded-full"></div>
                    </div>

                    <div className="w-full md:w-1/2 p-8 md:p-12 flex items-center justify-center">
                        {haveAccount ? <LoginForm onToggle={toggleForm} /> : <SignupForm onToggle={toggleForm} />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth
