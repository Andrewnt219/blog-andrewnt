import { ErrorWithMessage } from '$common';
import { isEmptyString } from './validate-js-utils';

export function createError(message: string): ErrorWithMessage {
  return { message };
}

export type ShareLink = {
  title?: string;
  summary?: string;
  url: string;
};

export function createFaccebookShareLink(link: ShareLink) {
  const query = createUrlParams({
    u: link.url,
  });
  return `https://www.facebook.com/sharer/sharer.php?${query}`;
}

export function createTwitterShareLink(link: ShareLink) {
  const query = createUrlParams({
    url: link.url,
    title: link.title,
  });

  return `https://twitter.com/intent/tweet/?${query}`;
}

export function createLinkedInShareLink(link: ShareLink) {
  const query = createUrlParams({
    mini: true,
    ...link,
  });

  return `https://linkedin.com/shareArticle?${query}`;
}

export function createUrlParams(
  params: Record<string, string | number | boolean | undefined>
): string {
  return Object.entries(params)
    .map(([key, value]) => {
      if (!value) return '';
      return `${encodeURIComponent(key)}=${encodeURIComponent(
        value.toString()
      )}`;
    })
    .filter((pair) => !isEmptyString(pair))
    .join('&');
}

// <!-- Sharingbutton Facebook -->
// <a class="resp-sharing-button__link" href="https://facebook.com/sharer/sharer.php?u=http%3A%2F%2Fsharingbuttons.io" target="_blank" rel="noopener" aria-label="Share on Facebook">
//   <div class="resp-sharing-button resp-sharing-button--facebook resp-sharing-button--large"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--circle">
//     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11.5"/><path d="M15.84 9.5H13.5V8.48c0-.53.35-.65.6-.65h1.4v-2.3h-2.35c-2.3 0-2.65 1.7-2.65 2.8V9.5h-2v2h2v7h3v-7h2.1l.24-2z"/></svg>
//     </div>Share on Facebook</div>
// </a>

// <!-- Sharingbutton Twitter -->
// <a class="resp-sharing-button__link" href="https://twitter.com/intent/tweet/?text=Super%20fast%20and%20easy%20Social%20Media%20Sharing%20Buttons.%20No%20JavaScript.%20No%20tracking.&amp;url=http%3A%2F%2Fsharingbuttons.io" target="_blank" rel="noopener" aria-label="Share on Twitter">
//   <div class="resp-sharing-button resp-sharing-button--twitter resp-sharing-button--large"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--circle">
//     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.5 7.4l-2 .2c-.4-.5-1-.8-2-.8C13.3 6.8 12 8 12 9.4v.6c-2 0-4-1-5.4-2.7-.2.4-.3.8-.3 1.3 0 1 .4 1.7 1.2 2.2-.5 0-1 0-1.2-.3 0 1.3 1 2.3 2 2.6-.3.4-.7.4-1 0 .2 1.4 1.2 2 2.3 2-1 1-2.5 1.4-4 1 1.3 1 2.7 1.4 4.2 1.4 4.8 0 7.5-4 7.5-7.5v-.4c.5-.4.8-1.5 1.2-2z"/><circle cx="12" cy="12" r="11.5"/></svg>
//     </div>Share on Twitter</div>
// </a>

// <!-- Sharingbutton LinkedIn -->
// <a class="resp-sharing-button__link" href="https://www.linkedin.com/shareArticle?mini=true&amp;url=http%3A%2F%2Fsharingbuttons.io&amp;title=Super%20fast%20and%20easy%20Social%20Media%20Sharing%20Buttons.%20No%20JavaScript.%20No%20tracking.&amp;summary=Super%20fast%20and%20easy%20Social%20Media%20Sharing%20Buttons.%20No%20JavaScript.%20No%20tracking.&amp;source=http%3A%2F%2Fsharingbuttons.io" target="_blank" rel="noopener" aria-label="Share on LinkedIn">
//   <div class="resp-sharing-button resp-sharing-button--linkedin resp-sharing-button--large"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--circle">
//     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11.5"/><path d="M15 12.5c-.28 0-.5.22-.5.5v3.5h-3s.03-6.48 0-7h3v.83s.46-.75 1.7-.75c1.56 0 2.3 1.12 2.3 3.3v3.62h-3V13c0-.28-.23-.5-.5-.5zm-7.5-3h2v7h-2z"/><circle cx="8.5" cy="6.5" r="1"/></svg>
//     </div>Share on LinkedIn</div>
// </a>
