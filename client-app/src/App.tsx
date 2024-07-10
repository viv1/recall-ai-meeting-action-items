import './styles/globals.css';

// App.tsx
import React from 'react';
// import MeetingSummarizer from './components/MeetingSummarizer';
import MeetingActionItems from './components/MeetingActionItems';

const App: React.FC = () => {
  return (
    <div>
      <MeetingActionItems />
    </div>
  );
};

export default App;
