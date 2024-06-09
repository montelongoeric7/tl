import React from 'react';
import { Box, Image, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import centerImage from '../assets/lawyer.png';
import cartoonlawyer from '../assets/cartoonlawyer.png';

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signup');
  };

  return (
    <Box textAlign="center" py={10} px={6}>
      <Image
        borderRadius="full"
        boxSize="200px"
        src={centerImage}
        alt="Center Image"
        mx="auto"
        mb={6}
      />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Welcome to Ticket Company
      </Heading>
      <Text color={'gray.500'}>
        We fight traffic tickets for you!
      </Text>
      <VStack spacing={4} mt={8}>
        <Image
          borderRadius="lg"
          boxSize="400px"
          src={cartoonlawyer}
          alt="Event Image"
          mb={4}
        />
        <Button
          colorScheme="teal"
          bg="teal.400"
          rounded={'full'}
          px={6}
          _hover={{
            bg: 'teal.500',
          }}
          onClick={handleGetStarted}
        >
          Get Started!
        </Button>
      </VStack>
    </Box>
  );
};

export default Home;
