import React, { useState } from 'react';
import { Box, Heading, Button, Textarea } from '@chakra-ui/react';

const Consultation = () => {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePrepareDocuments = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch('http://localhost:8000/chatbot/lawyer_up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      console.log('API call response:', data);

      if (!response.ok) {
        throw new Error(data.detail || 'An error occurred');
      }

      console.log('Setting response state with:', data.write_up);
      setResponse(data.write_up);
    } catch (error) {
      console.error('Error preparing documents:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h2" size="xl" mb={6}>
        Consultation
      </Heading>
      <Button
        colorScheme="teal"
        bg="teal.400"
        rounded={'full'}
        px={6}
        _hover={{
          bg: 'teal.500',
        }}
        onClick={handlePrepareDocuments}
        isLoading={loading}
      >
        Prepare Your Documents
      </Button>
      {error && <Box color="red.500" mt={4}>{error}</Box>}
      {response && (
        <Textarea
          mt={6}
          value={response}
          isReadOnly
          rows={10}
          placeholder="Your document will appear here..."
        />
      )}
    </Box>
  );
};

export default Consultation;
