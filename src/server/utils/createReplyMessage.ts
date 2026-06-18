export function createReplyMessage({
  to,
  subject,
  body,
}: {
  to: string;

  subject: string;

  body: string;
}) {

  const mime = [

    `To: ${to}`,

    `Subject: Re: ${subject}`,

    'Content-Type: text/html; charset=UTF-8',

    '',

    body,

  ].join('\r\n');

  return Buffer

    .from(mime)

    .toString('base64')

    .replace(/\+/g, '-')

    .replace(/\//g, '_')

    .replace(/=+$/, '');

}