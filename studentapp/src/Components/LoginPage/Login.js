import * as React from 'react';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/joy/Card';
import Box from '@mui/joy/Box';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [emailError, setEmailError] = React.useState('');
    const [passwordError, setPasswordError] = React.useState('');

    const validateEmail = (email: string) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailPattern.test(email);
    };

    const validatePassword = (password: string) => {
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        return passwordPattern.test(password);
    };

    const handleLogin = () => {
        setEmailError('');
        setPasswordError('');

        if (!email || !validateEmail(email)) {
            setEmailError('Please enter a valid email address');
            return;
        }

        if (!password || !validatePassword(password)) {
            setPasswordError('Password must be at least 6 characters long and contain at least one number');
            return;
        }

        setError('');
        navigate('StudentSearch');
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'background.surface',
                p: 2,
            }}
        >
            <CssBaseline />
            <Card
                variant="outlined"
                sx={{
                    width: '100%',
                    maxWidth: 450,
                    p: 4,
                    background: 'linear-gradient(to right bottom, #ffffff, #f8f9fa)',
                    boxShadow: 'lg',
                    borderRadius: 'xl',
                    transition: 'transform 0.2s',
                    '&:hover': {
                        transform: 'translateY(-5px)',
                    },
                }}
            >
                <Box
                    sx={{
                        mb: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 1,
                    }}
                >
                    <PersonIcon 
                        sx={{ 
                            fontSize: '3rem',
                            color: 'primary.500',
                            p: 1,
                            borderRadius: '50%',
                            backgroundColor: 'primary.100',
                        }}
                    />
                    <Typography
                        level="h2"
                        sx={{
                            color: 'primary.600',
                            fontWeight: 'bold',
                            textAlign: 'center',
                        }}
                    >
                        Welcome Back!
                    </Typography>
                    <Typography 
                        level="body-md"
                        sx={{
                            color: 'neutral.600',
                            textAlign: 'center',
                        }}
                    >
                        Sign in to continue to your account
                    </Typography>
                </Box>

                <FormControl
                    sx={{
                        mb: 2,
                    }}
                >
                    <FormLabel sx={{ color: 'primary.600' }}>Email</FormLabel>
                    <Input
                        name="email"
                        type="email"
                        placeholder="Tejasree@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        startDecorator={<EmailIcon />}
                        sx={{
                            '--Input-focusedThickness': '2px',
                            '&:hover': { borderColor: 'neutral.400' },
                        }}
                    />
                    {emailError && (
                        <Typography 
                            level="body-sm" 
                            color="danger" 
                            sx={{ mt: 0.5 }}
                        >
                            {emailError}
                        </Typography>
                    )}
                </FormControl>

                <FormControl
                    sx={{
                        mb: 2,
                    }}
                >
                    <FormLabel sx={{ color: 'primary.600' }}>Password</FormLabel>
                    <Input
                        name="password"
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        startDecorator={<LockIcon />}
                        sx={{
                            '--Input-focusedThickness': '2px',
                            '&:hover': { borderColor: 'neutral.400' },
                        }}
                    />
                    {passwordError && (
                        <Typography 
                            level="body-sm" 
                            color="danger"
                            sx={{ mt: 0.5 }}
                        >
                            {passwordError}
                        </Typography>
                    )}
                </FormControl>

                {error && (
                    <Typography 
                        level="body-sm" 
                        color="danger"
                        sx={{ mb: 2 }}
                    >
                        {error}
                    </Typography>
                )}

                <Button
                    onClick={handleLogin}
                    size="lg"
                    variant="solid"
                    sx={{
                        mt: 2,
                        mb: 3,
                        fontWeight: 600,
                        transition: 'transform 0.2s',
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: 'md',
                        },
                    }}
                >
                    Sign In
                </Button>

                <Typography 
                    sx={{ 
                        fontSize: 'sm', 
                        textAlign: 'center',
                        color: 'neutral.600',
                    }}
                >
                    Don't have an account yet?
                </Typography>
            </Card>
        </Box>
    );
}