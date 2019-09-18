import { useState } from 'react';
import Link from 'next/link';
import { ApolloConsumer } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import firebase from '../firebase';

import SignupUser from '../components/SignupUser';
import Plans from '../components/Plans';
import CreditCard from '../components/SignupUser';

const Signup = () => {
  const [stage, setStage] = useState('plans');
  const [user, setUser] = useState({});

  const stageComponent = {
    signup: SignupUser,
    plans: Plans,
    creditCard: CreditCard,
  }

  const handleSubmit = (e, client) => {
    e.preventDefault();

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        const { uid: firebaseID } = user;

        client.mutate({
          mutation: gql`
            mutation CreateUser($firebaseID: String!, $firstName: String!, $lastName: String, $email: String!) {
              createUser(input: { firebaseID: $firebaseID, firstName: $firstName, lastName: $lastName, email: $email }) {
                id
              }
            }
          `,
          variables: { firebaseID, firstName, lastName, email },
          update: (cache, { data: { createUser } }) => {
            cache.writeQuery({
              query: gql`
                query GetUser {
                  user
                }
              `,
              data: {
                user: createUser,
              },
            });
          }
        });
      })
      .catch((error) => {
        console.log(error.code, error.message);
    });
  };

  const Component = stageComponent[stage];

  return (
    <ApolloConsumer>
      {
        client => (
          <Component setUser={setUser} setStage={setStage} />
        )
      }
    </ApolloConsumer>
  );
};

export default Signup;
