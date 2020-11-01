import DOMPurify from 'dompurify';

export function sanitizeProp(content: string) {
  return {
    dangerouslySetInnerHTML: {
      __html: DOMPurify.sanitize(content),
    },
  };
}

export default DOMPurify.sanitize;
