import { commitMutation } from 'react-relay';

import createRelayEnvironment from '../lib/createRelayEnvironment';
const environment = createRelayEnvironment();

import DeleteEntry from '../queries/DeleteEntry';

const DeleteEntryButton = ({ entryID }) => {
  const deleteEntry = () => {
    commitMutation(environment, {
      mutation: DeleteEntry,
      variables: {
        id: entryID,
      },
      configs: [{
        type: 'NODE_DELETE',
        deletedIDFieldName: 'id',
      }],
      onError: err => {}, // TODO: Handle error
    });
  }

  return (
    <button
      className="delete-entry hidden font-semibold py-2 px-4 border rounded bg-primary hover:bg-primary-dark text-white border-primary"
      onClick={deleteEntry}
    >
      Delete
    </button>
  )
}

export default DeleteEntryButton;