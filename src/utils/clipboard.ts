import { ToastType } from '@/context/ToastContext';

interface CopyToClipboardResult {
  success: boolean;
  toastType: ToastType;
  message: string;
}

export const copyToClipboard = async (text: string): Promise<CopyToClipboardResult> => {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return {
        success: true,
        toastType: 'success',
        message: 'Copied to clipboard!'
      };
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
          return {
            success: true,
            toastType: 'success',
            message: 'Copied to clipboard!'
          };
        } else {
          return {
            success: false,
            toastType: 'error',
            message: 'Failed to copy text'
          };
        }
      } catch (err) {
        document.body.removeChild(textArea);
        return {
          success: false,
          toastType: 'error',
          message: 'Failed to copy text'
        };
      }
    }
  } catch (err) {
    return {
      success: false,
      toastType: 'error',
      message: 'Failed to copy text'
    };
  }
}; 