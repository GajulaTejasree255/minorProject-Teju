import * as React from 'react';
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import { useNavigate } from 'react-router-dom';


export default function Login() {

    const naviagte = useNavigate();
    const [email , setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');

    const handleLogin = () => {
        if(!email || !password){
            setError('please enter both email and passowrd');
            return;
        }

        setError('');
        naviagte('StudentSearch');
    }

    return (
        <main>
        <CssBaseline/>
        <Sheet
            sx={{
            width: 400,
            mx: 'auto', // margin left & right
            my: 15, // margin top & bottom
            py: 3, // padding top & bottom
            px: 2, // padding left & right
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            borderRadius: 'sm',
            boxShadow: 'md',
            }}
            variant="outlined"
        >
            <div>
            <Typography level="h4" component="h1">
                <b>Welcome!</b>
            </Typography>
            <Typography level="body-sm">Sign in to continue.</Typography>
            </div>
            <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
                // html input attribute
                name="email"
                type="email"
                placeholder="Tejasree@email.com"
                value = {email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            </FormControl>
            <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
                // html input attribute
                name="password"
                type="password"
                placeholder="password"
                value = {password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            </FormControl>
            {error && (
                    <Typography level="body-sm" color="danger">
                        {error}
                    </Typography>
            )}
            <Button onClick={(handleLogin)} sx={{ mt: 1 /* margin top */ }}>Log in</Button>
            <Typography
            //endDecorator={<Link href="/sign-up">Sign up</Link>}
            sx={{ fontSize: 'sm', alignSelf: 'center' }}
            >
            Don&apos;t have an account?
            </Typography>
        </Sheet>
        </main>
    );
}
