import SectionPanel from '../components/SectionPanel';
import ChatLink from '../components/ChatLink';

const EditorSettings = () => (
  <div className="w-4/5">
    <SectionPanel>
      <h2 className="text-3xl font-extrabold text-gray-800 mb-5 tracking-wide">
        Editor
      </h2>

      <p>
        Soon you'll be able to customize your editor. Want to hide the tool bar? No problem. Want to show writing prompts? We got you covered.
      </p>

      <p>
        Is there anyting you'd like to see? <ChatLink>Let us know in the chat!</ChatLink>
      </p>
    </SectionPanel>
  </div>
);

export default EditorSettings;
