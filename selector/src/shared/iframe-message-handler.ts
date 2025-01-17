import type { IResizeMessage, IScrollMessage } from './iframe-message-emitter';

const notebooksSelectorElement = document.getElementById('notebooks-selector') as HTMLIFrameElement;

if (!notebooksSelectorElement) {
  throw new Error('Unable to find notebooks selector iframe element.');
}

function setIframeHeight(iframeElement: HTMLIFrameElement, heightPx: number): void {
  iframeElement.style.height = `${heightPx}px`;
}

function setInitialIframeHeight(iframeElement: HTMLIFrameElement): void {
  const iframeBodyHeight = iframeElement.contentDocument?.body?.offsetHeight;
  if (iframeBodyHeight) {
    setIframeHeight(iframeElement, iframeBodyHeight);
  }
}

window.onmessage = (message: MessageEvent<IResizeMessage | IScrollMessage>) => {
  if (message.origin !== window.origin) {
    return;
  }

  if (message.data.type === 'resize' && message.data.height) {
    notebooksSelectorElement.style.height = message.data.height + 'px';
    return;
  }

  if (message.data.type === 'scroll') {
    notebooksSelectorElement.scrollIntoView({ behavior: 'smooth' });
    return;
  }
};

setInitialIframeHeight(notebooksSelectorElement);

export {};
