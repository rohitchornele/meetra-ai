export function getEmailBody(payload: any) {
  function decode(data?: string) {
    if (!data) {
      return '';
    }

    try {
      const base64 = data.replace(/-/g, '+').replace(/_/g, '/');

      return decodeURIComponent(escape(atob(base64)));
    } catch {
      return '';
    }
  }

  function findPart(
    part: any,

    mimeType: string
  ): any {
    if (!part) {
      return null;
    }

    if (part.mimeType === mimeType) {
      return part;
    }

    if (part.parts?.length) {
      for (const child of part.parts) {
        const found = findPart(
          child,

          mimeType
        );

        if (found) {
          return found;
        }
      }
    }

    return null;
  }

  /* text/plain */

  const plainText = findPart(
    payload,

    'text/plain'
  );

  const text = plainText?.body?.data ? decode(plainText.body.data) : '';

  /* text/html */

  const htmlPart = findPart(
    payload,

    'text/html'
  );

  const html = htmlPart?.body?.data ? decode(htmlPart.body.data) : '';

  return {
    text,

    html,
  };
}
