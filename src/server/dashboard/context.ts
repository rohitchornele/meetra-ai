import { getMessages, getMessage, mapEmail } from '@/server/integrations/gmail';

import { getEvents } from '@/server/integrations/googleCalendar';

export async function getContextData(tenantId: string) {
  const [gmail, calendar] = await Promise.all([
    getMessages(
      tenantId,

      10
    ),

    getEvents(tenantId),
  ]);

  // console.log(
  //   'gmail =', gmail
  // );

  const importantEmails = await Promise.all(
    (gmail.messages ?? [])

      .slice(0, 3)

      .map(async (message) => {
        const email = await getMessage(
          tenantId,

          message.id!
        );

        return mapEmail(email);
      })
  );

  const todaysAgenda = buildTodaysAgenda(calendar);

  const suggestions = buildSuggestions(
    gmail,

    calendar
  );

  return {
    importantEmails,

    todaysAgenda,

    suggestions,
  };
}

function buildImportantEmails(gmail: any) {
  return (gmail.messages ?? []).slice(0, 3);
}

function buildTodaysAgenda(events: any[]) {
  const today = new Date();

  return events
    .filter((event) => {
      if (!event.start) {
        return false;
      }

      const eventDate = new Date(event.start);

      console.log(
        'EVENT START',

        event.start
      );

      console.log(
        'EVENT DATE',

        new Date(event.start)
      );

      console.log(
        'TODAY',

        new Date()
      );

      return eventDate.toDateString() === today.toDateString();
    })

    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())

    .slice(0, 5);
}

function buildSuggestions(
  gmail: any,

  calendar: any[]
) {
  const suggestions: {
    text: string;
  }[] = [];

  const unread = gmail.messages?.length ?? 0;

  if (unread > 5) {
    suggestions.push({
      text: `You have ${unread} unread emails.`,
    });
  }

  const upcomingEvents = calendar.filter(
    (event) => new Date(event.start) > new Date()
  );

  if (upcomingEvents.length > 0) {
    suggestions.push({
      text: `You have ${upcomingEvents.length} upcoming meetings.`,
    });
  }

  return suggestions;
}
