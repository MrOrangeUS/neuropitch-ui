import { Link, useLocation } from 'react-router-dom';
import { 
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  MicrophoneIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';

const navigation = [
  {
    name: 'SmartLead Scorer',
    href: '/lead-scorer',
    icon: ChartBarIcon,
  },
  {
    name: 'VoiceBuddy Copilot',
    href: '/voice-buddy',
    icon: MicrophoneIcon,
  },
  {
    name: 'LeadFlow Chatbot',
    href: '/lead-flow',
    icon: ChatBubbleLeftRightIcon,
  },
  {
    name: 'CallGuard Compliance',
    href: '/call-guard',
    icon: ShieldCheckIcon,
  },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex h-full w-64 flex-col bg-white border-r border-gray-200">
      <div className="flex h-16 shrink-0 items-center px-6 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-900">NeuroPitch AI</h1>
      </div>
      <nav className="flex flex-1 flex-col p-4">
        <ul className="flex flex-1 flex-col gap-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={twMerge(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100',
                    isActive && 'bg-primary-50 text-primary-600 hover:bg-primary-50'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
} 