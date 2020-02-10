import { graphql } from 'react-relay/hooks';

const DeleteEntry = graphql`
  mutation DeleteEntryMutation($id: ID!) {
    deleteEntry(id: $id) {
      id
    }
  }
`;

export default DeleteEntry;
