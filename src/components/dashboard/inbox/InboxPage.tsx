// "use client";
// import { useMemo, useState } from "react";
// import EmailList from "./list/EmailList";
// import EmailPreview from "./preview/EmailPreview";
// interface InboxPageProps {
// 	emails: any[];
// }
// export default function InboxPage({
// 	emails,
// }: InboxPageProps) {
// 	const [
// 		selectedEmail,
// 		setSelectedEmail,
// 	] = useState<any>(
// 		null
// 	);
// 	const gridTemplate = useMemo(() => {
// 		return selectedEmail
// 			? "minmax(0,1fr) minmax(0,1fr)"
// 			: "minmax(0,1fr)";
// 	},
// 		[
// 			selectedEmail,
// 		]);
// 	return (
// 		<div
// 			className="h-full grid overflow-hidden transition-all duration-300"
// 			style={{
// 				gridTemplateColumns:
// 					gridTemplate,
// 			}}
// 		>
// 			{/* Email List */}
// 			<EmailList
// 				emails={emails}
// 				onSelect={
// 					setSelectedEmail
// 				}
// 			/>
// 			{/* Preview */}
// 			{
// 				selectedEmail && (
// 					<EmailPreview
// 						email={
// 							selectedEmail
// 						}
// 					/>
// 				)
// 			}
// 		</div>
// 	);
// }

'use client';

import { useState } from 'react';

import EmailList from './list/EmailList';

import EmailPreview from './preview/EmailPreview';

interface InboxPageProps {
  emails: any[];
}

export default function InboxPage({ emails }: InboxPageProps) {
  const [selectedEmail, setSelectedEmail] = useState<any>(null);

  return (
    <div
      className="h-full grid overflow-hidden "
      style={{
        gridTemplateColumns: selectedEmail
          ? '380px minmax(0,1fr)'
          : 'minmax(0,1fr)',
      }}
    >
      {/* Email List */}

      <div
        className={`${selectedEmail ? 'hidden lg:block' : 'block'} h-full overflow-hidden border-r border-[var(--border)]`}
      >
        <EmailList emails={emails} onSelect={setSelectedEmail} />
      </div>

      {/* Preview */}

      {selectedEmail && (
        <div className="h-full overflow-hidden hidden lg:block">
          <EmailPreview
            email={selectedEmail}
            onClose={() => setSelectedEmail(null)}
          />
        </div>
		
	  
      )}

      {/* Mobile Preview */}

      {selectedEmail && (
        <div className="lg:hidden h-full overflow-hidden">
          <EmailPreview
            email={selectedEmail}
            onClose={() => setSelectedEmail(null)}
          />
        </div>
      )}
    </div>
  );
}
