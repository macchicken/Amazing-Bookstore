import React from "react";
import {
    Flex,
    Box,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    Text,
    Image
} from '@chakra-ui/react';
import {
    Link,
    withRouter
} from 'react-router-dom';
import {
    useForm
} from "react-hook-form";
import authCoverCSS from "../css/authcover.module.css";
import logo from '../assets/logo-dark.svg';
import { authenticationService } from "../services/authService";
import { history } from "../utils/history";

class LoginView extends React.Component {
    constructor(props) {
        super();
        // redirect if already logged in
        if (authenticationService.currentUserValue) {
            history.push('/');
        }
    }

    render() {
        return (
            <Flex minH={'100vh'} align={'center'} justify={'center'} bg={'gray.50'}>
                <Flex flex={[0, 0, 0, 1]}>
                    <div className={authCoverCSS.cover_container}>
                        <div className={authCoverCSS.cover_left}></div>
                    </div>
                </Flex>
                <Flex flex={4}>
                    <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                        <LoginHeader />
                        <LoginForm />
                        <LoginFooter />
                    </Stack>
                </Flex>
                <Flex flex={[0, 0, 0, 1]}>
                    <div className={authCoverCSS.cover_container}>
                        <div className={authCoverCSS.cover_right}></div>
                    </div>
                </Flex>
            </Flex>
        )
    }
};

function LoginHeader(props) {
    return (
        <Box>
            <Box align={'center'}>
                <Image w={"40%"} src={ logo } alt={'logo'} />
            </Box>
            <Stack align={'center'}>
                <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                <Text fontSize={'lg'} color={'gray.600'}>
                    Shop more than 500,000+ books ️
                </Text>
            </Stack>
        </Box>
    );
};

function LoginForm(props) {
    // Functions to link form input with submission
    const { handleSubmit, setError, errors, register, formState } = useForm();

    function onSubmit(values) {
        return new Promise(resolve => {
            authenticationService.login(values.username, values.password)
                .then(user => {
                    window.location.reload(true);
                }, e => {
                    setError("username", {
                        type: "server",
                        message: ""
                    });
                    setError("password", {
                        type: "server",
                        message: e.errors[0].message
                    });
                });
            resolve();
        });
    }

    return (
        <Box rounded={'lg'} bg={'white'} boxShadow={'lg'} p={8}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={4}>
                    <FormControl id="username" isInvalid={errors.username}>
                        <FormLabel>Username</FormLabel>
                        <Input
                            name="username"
                            type="username"
                            ref={register()} // Link to onSubmit()
                        />
                        <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl id="password" isInvalid={errors.password}>
                        <FormLabel>Password</FormLabel>
                        <Input
                            name="password"
                            type="password"
                            ref={register()} // Link to onSubmit()
                        />
                        <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                    </FormControl>
                    <Stack spacing={10}>
                        <Stack
                            direction={{ base: 'column', sm: 'row' }}
                            align={'start'}
                            justify={'space-between'}>
                            <Checkbox>Remember me</Checkbox>
                            <Text color={'#00B5D8'}>
                                <Link to={'/error'}>Forgot password?</Link>
                            </Text>
                        </Stack>
                        <Button
                            isLoading={formState.isSubmitting}
                            colorScheme={'facebook'}
                            type={'submit'}
                            _hover={{
                                bg: 'blue.500',
                            }}>
                            Sign in
                        </Button>
                    </Stack>
                </Stack>
            </form>
        </Box>
    );
};

function LoginFooter(props) {
    return (
        <Text align={'center'} fontSize={'lg'} color={'gray.600'}>
            Don't have an account? <Link to={'/register'} style={{ color: '#00B5D8' }}>Create account</Link>
        </Text>
    );
};

export default withRouter(LoginView);