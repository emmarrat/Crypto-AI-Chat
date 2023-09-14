import React, { useState } from 'react';
import { AuthMutation } from '../types';

export const useAuthHandler = () => {
  const [user, setUser] = useState<AuthMutation>({
    email: '',
    password: '',
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  return {
    user,
    inputChangeHandler,
  };
};
