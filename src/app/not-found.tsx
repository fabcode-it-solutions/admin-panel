'use client';

import React from 'react';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container, Heading, Text } from '@/components/typography';
import { Anchor } from '@/components/ui/Anchor';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background  transition-colors duration-300">
      <Container className='text-center'>
        <Heading as='h1' weight={'bold'} className='text-center text-8xl!' >
          404
        </Heading>
        <Heading as='h3'>
          Page Not Found
        </Heading>
        <Text className='my-4' align={'center'} size='sm' >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </Text>
         <Anchor href='/dashboard' leftIcon={<Home className="h-4 w-4" />}>
              Back to Dashboard
            </Anchor>
      </Container>
    </div>
  );
}
