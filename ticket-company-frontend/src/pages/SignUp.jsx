import React, { useState } from 'react';
import { Box, Heading, FormControl, FormLabel, Input, Button, VStack, Checkbox } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    isAdmin: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail);
      }

      const data = await response.json();
      console.log('User registered successfully:', data);
      // Store token or handle successful registration
      navigate('/information');
    } catch (error) {
      console.error('Error registering user:', error);
      // Show error message
    }
  };

  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h2" size="xl" mb={6}>
        Sign Up
      </Heading>
      <Box as="form" onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </FormControl>
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
          <FormControl id="isAdmin">
            <Checkbox
              name="isAdmin"
              isChecked={formData.isAdmin}
              onChange={handleChange}
            >
              Admin
            </Checkbox>
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
            Sign Up
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default SignUp;
