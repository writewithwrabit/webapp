import { useState } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import Plain from 'slate-plain-serializer';

import Auth from '../components/Auth';
import withLayout from '../components/Layout';

const emptyDocument = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
      },
    ],
  },
});

const Write = () => {
  const goalWords = 1000;
  const [value, setValue] = useState(emptyDocument);
  const [remainingWords, setRemainingWords] = useState(goalWords);

  const handleChange = ({ value }) => {
    const serializedWords = Plain.serialize(value);
    const splitWords = serializedWords.split(' ').length - 1;

    // Don't force the user to hit space before you count the first word
    const wordCount = serializedWords && splitWords === 0 ? 1 : splitWords;

    setValue(value);
    setRemainingWords(goalWords - wordCount);
  }

  return (
    <Auth>
      {remainingWords}
      <Editor
        placeholder={`Hope you're having a great day, time to write!`}
        value={value}
        onChange={handleChange}
        autoFocus={true}
        autoCorrect={true}
      />
    </Auth>
  );
};

export default withLayout(Write);
