import React, { useState } from 'react';
import { Box, Heading, FormControl, FormLabel, Input, Button, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formBody = new URLSearchParams({
      username: formData.email,
      password: formData.password,
    });

    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString(),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail);
      }

      const data = await response.json();
      console.log('Login successful:', data);
      // Store the token
      localStorage.setItem('token', data.access_token);
      navigate('/information');
    } catch (error) {
      console.error('Error logging in:', error);
      // Show error message
    }
  };

  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h2" size="xl" mb={6}>
        Login
      </Heading>
      <Box as="form" onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </FormControl>
          <Button
            colorScheme="teal"
            bg="teal.400"
            rounded={'full'}
            px={6}
            _hover={{
              bg: 'teal.500',
            }}
            type="submit"
          >
            Login
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default Login;
