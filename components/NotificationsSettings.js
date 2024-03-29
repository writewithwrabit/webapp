import SectionPanel from '../components/SectionPanel';
import ChatLink from '../components/ChatLink';

const NotificationsSettings = () => (
  <div className="w-4/5">
    <SectionPanel>
      <h2 className="text-3xl font-extrabold text-gray-800 mb-5 tracking-wide">
        Notifications
      </h2>

      <p>
        Do you want a friendly reminder to build your daily habit? What about encouragement when you haven't been around for a while?
      </p>

      <p>
        We have plenty in store for you but would love to hear what you want. <ChatLink>Let us know in the chat!</ChatLink>
      </p>
    </SectionPanel>
  </div>
);

export default NotificationsSettings;
