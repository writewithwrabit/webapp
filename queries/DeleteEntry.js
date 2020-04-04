import { graphql } from 'relay-runtime';

const DeleteEntry = graphql`
  mutation DeleteEntryMutation($id: ID!) {
    deleteEntry(id: $id) {
      id
    }
  }
`;

export default DeleteEntry;
