import React, { useState, MouseEventHandler } from 'react';
import { Calendar, Users } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = process.env.BACKEND_URL || 'http://localhost:3002'; // Your backend API base URL

const Input = ({ ...props }) => (
  <input
    className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    {...props}
  />
);

const Button: React.FC<{
  children: React.ReactNode,
  onClick?: MouseEventHandler,
  isLoading?: boolean,
  disabled?: boolean
}> = ({ children, onClick, isLoading, disabled, ...props }) => (
  <button
    className={`px-4 py-2 font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
      disabled ?  'bg-gray-400 cursor-not-allowed' : isLoading ? 'bg-green-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
    }`}
    onClick={onClick}
    disabled={disabled || isLoading}
    {...props}
  >
    {isLoading ? (
      <span className="flex items-center">
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Listening
      </span>
    ) : (
      children
    )}
  </button>
);
  
interface ActionItem {
    name: string;
    action: string;
  }

  
  interface ActionItemsListProps {
    actionItems: ActionItem[];
  }
  
  const ActionItemsList: React.FC<ActionItemsListProps> = ({ actionItems }) => (
    <div className="bg-gray-50 mt-4">
      <h2 className="text-lg font-semibold mb-2">Meeting Action Items</h2>
      <div className="flex items-center text-gray-500 text-sm mb-4">
        <Calendar className="w-4 h-4 mr-2" />
        <span className="mr-4">{new Date().toLocaleString()}</span>
        <Users className="w-4 h-4 mr-2" />
        <span>{actionItems.length}</span>
      </div>
      {actionItems.map((item: any, index: number) => (
        <div key={index} className="mb-4">
          <h3 className="font-medium">{item.name}</h3>
          <p className="text-gray-600 ml-4">{item.action}</p>
        </div>
      ))}
    </div>
  );

const POLLING_INTERVAL = 5000; // Poll every 5 seconds

const MeetingActionItems = () => {
  const [meetingLink, setMeetingLink] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState('');
  const [actionItems, setActionItems] = useState([]);

  let intervalId: NodeJS.Timeout; // Store the interval ID

  const onSubmit = async () => {
    setIsRecording(true);
    setError('');
    setActionItems([]);
    try {
      const response = await axios.post(`${API_BASE_URL}/create_bot`, { meetingLink });
    //   const x = [
    //     { Alex: 'Take care of the portal.' },
    //     { Alex: 'Take care of the webinar.' },
    //     { Alex: 'Go to the city and take care of all stuff there.' },
    //     { 'Vivek Sahu': 'Take care of all the remaining bits.' }
    //   ]

    //   const transformedArray: ActionItem[] = response.data.action_items.map((item:ActionItem) => {
    //     const name = Object.keys(item)[0]; // Get the name (key)
    //     const action = (item as any)[name]; // Get the action (value)
    //     return { name, action };
    //   });
    //   setActionItems(transformedArray as any);

        await getActionItems(response.data.botId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setIsRecording(false);
    }
  }

  const getActionItems = async (botId: string) => {

    const fetchData = async () => {

      if (botId.length === 0) return;
      try {
        const response = await axios.post(`${API_BASE_URL}/action_items`, { botId });
        if (response.status === 204) return;
        clearInterval(intervalId); // Stop polling
        if (response.data) { // Check if there's actual data in the response
            const transformedArray: ActionItem[] = response.data.action_items.map((item:ActionItem) => {
                const name = Object.keys(item)[0]; // Get the name (key)
                const action = (item as any)[name]; // Get the action (value)
                return { name, action };
              });
              setActionItems(transformedArray as any);
              setIsRecording(false);
        }
        // else {
        //   setError('No data received from the API');
        // }
      } catch (err) {
        setError('Error fetching data: ' + (err as Error).message);
        setIsRecording(false);
      }
    };

    await fetchData(); // Initial fetch

    intervalId = setInterval(fetchData, POLLING_INTERVAL);
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-2">Get action items from your meeting</h1>
      <p className="text-gray-500 mb-6">
        Enter your current meeting link and get a list of action items at the end of your meeting.
      </p>
      
      <div className="flex mb-4 gap-2">
        <Input
          type="text"
          placeholder="https://zoom.us"
          value={meetingLink}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMeetingLink(e.target.value)}
        />
        <Button 
          onClick={onSubmit} 
          isLoading={isRecording} 
          disabled={!meetingLink.trim()}
        >
          Start recording
        </Button>
      </div>
      <div className="border rounded-lg p-2 bg-gray-50">
      
        {actionItems.length > 0 ? (
            <ActionItemsList actionItems={actionItems} />
        ) : (
            <>
                <div className="flex items-center text-gray-400 mb-4">
                    <Calendar className="w-5 h-5 mr-2" />
                    <span className="mr-4">-</span>
                    <Users className="w-5 h-5 mr-2" />
                    <span>-</span>
                </div>
                
                <div className={`h-40 flex items-center justify-center ${error ? 'text-red-500' : 'text-gray-400'}`}>
                    {isRecording ? "Meeting recording in progress..." : error || "Please enter a meeting link."}
                </div>
            </>
        )}
        </div>

    </div>
  );
};

export default MeetingActionItems;