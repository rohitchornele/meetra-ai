interface EmailSidebarProps {
  className?: string;
}
const emails = [
  {
    sender: "Arjun Mehta",
    preview: "Proposal approved ✓",
  },
  {
    sender: "Team Slack",
    preview: "Meeting moved to 3 PM",
  },
  {
    sender: "Finance Dept",
    preview: "Invoice #4421 received",
  },
  {
    sender: "Rahul Kumar",
    preview: "Re: Tomorrow's sync",
  },
];
const menuItems = [
  {
    label: "Inbox",
    badge: 14,
    active: true,
    badgeColor: "bg-accent",
  },
  {
    label: "Unread",
    badge: 6,
    active: false,
    badgeColor: "bg-accent2",
  },
  {
    label: "Starred",
  },
  {
    label: "Sent",
  },
];
export default function EmailSidebar({
  className = "",
}: EmailSidebarProps) {
  return (
    <div
      className={`
      ${className}
      flex
      flex-col
      bg-card
      border
      border-border
      rounded-[16px]
      shadow-[0_8px_40px_rgba(0,0,0,0.10)]
      overflow-hidden
    `}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-border uppercase tracking-[0.06em] text-[0.72rem] font-bold text-text2"
      >
        Inbox
      </div>
      {/* Menu */}
      <ul className="py-2">
        {menuItems.map((item) => (
          <li key={item.label} className={`mx-1 px-4 py-2 rounded-md flex items-center justify-between text-[0.8rem] font-medium cursor-default transition-all *
            ${ item.active ? "bg-glow1 text-accent font-semibold" : "text-text2 hover:bg-glow2 hover:text-text"}`}
          >
            <span>{item.label}</span>
            {item.badge && (
              <span className={`${item.badgeColor} text-white text-[0.68rem] font-bold px-2 rounded-full`}
              >
                {item.badge}
              </span>
            )}
          </li>
        ))}
      </ul>
      {/* Emails */}
      <div className="flex-1 overflow-y-auto px-2 pb-2">
        {emails.map((email) => (
          <div key={email.sender} className="px-2 py-3 border-b border-border last:border-none"
          >
            <div className="text-[0.72rem] font-semibold text-text mb-[2px]"
            >
              {email.sender}
            </div>
            <div className="text-[0.67rem] text-text2 truncate"
            >
              {email.preview}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}