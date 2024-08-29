import React from 'react';

// Define the props interface
interface GreetingProps {
  name: string;
}

// Define the functional component
const Greeting: React.FC<GreetingProps> = ({ name }) => {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Welcome to the React TypeScript example.</p>
    </div>
  );
};

// Export the component as default
export default Greeting;
