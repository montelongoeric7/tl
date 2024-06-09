import React, { useState } from 'react';
import { Box, Heading, FormControl, FormLabel, Textarea, Input, Button, VStack } from '@chakra-ui/react';

const Information = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    published: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch('http://localhost:8000/information/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail);
      }

      const data = await response.json();
      console.log('Information submitted successfully:', data);
      // Handle successful submission (e.g., clear the text box, show a success message)
    } catch (error) {
      console.error('Error submitting information:', error);
      // Show error message
    }
  };

  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h2" size="xl" mb={6}>
        Submit Your Information
      </Heading>
      <Box as="form" onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="title" isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="content" isRequired>
            <FormLabel>Your Information</FormLabel>
            <Textarea
              placeholder="Write your information here..."
              name="content"
              value={formData.content}
              onChange={handleChange}
              size="lg"
              rows="10"
            />
          </FormControl>
          <FormControl id="published" display="none">
            <Input
              type="hidden"
              name="published"
              value={formData.published}
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
            Submit
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default Information;
