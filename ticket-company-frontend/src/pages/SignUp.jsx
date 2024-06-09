import React, { useState } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Checkbox,
} from '@chakra-ui/react';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    isAdmin: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add the logic to send the form data to the backend here
    console.log(formData);
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
