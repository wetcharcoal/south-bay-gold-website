import { toast } from 'sonner';

export const CONTACT_EMAIL = 'info@southbaygold.com';
export const TORRANCE_PHONE = '+1 (310) 791-5431';
export const TORRANCE_PHONE_TEL = '+13107915431';
export const MANHATTAN_BEACH_PHONE = '+1 (310) 796-1800';
export const MANHATTAN_BEACH_PHONE_TEL = '+13107961800';
export const REDONDO_BEACH_PHONE = '+1 (310) 791-3052';
export const REDONDO_BEACH_PHONE_TEL = '+13107913052';

const contactToastClass = '!border-gold-dark !bg-gold-dark !text-white';

export async function copyToClipboard(value: string) {
    try {
        if (navigator.clipboard?.writeText && document.hasFocus()) {
            await navigator.clipboard.writeText(value);
            return;
        }
    } catch {
        // Some browsers block the async clipboard API. Fall back below.
    }

    const textarea = document.createElement('textarea');
    textarea.value = value;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    const selection = document.getSelection();
    const previousRange = selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
    textarea.select();
    const copied = document.execCommand('copy');
    document.body.removeChild(textarea);
    if (previousRange && selection) {
        selection.removeAllRanges();
        selection.addRange(previousRange);
    }
    if (!copied) {
        throw new Error('Unable to copy');
    }
}

export function showContactToast(message: string) {
    toast(message, {
        duration: 3000,
        className: contactToastClass,
    });
}

export function deviceCanPlaceCall() {
    const ua = navigator.userAgent;
    if (/Android|iPhone|iPad|iPod|Mobile/i.test(ua)) return true;
    return navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
}

export async function handleCallClick() {
    if (deviceCanPlaceCall()) {
        window.location.assign(`tel:${TORRANCE_PHONE_TEL}`);
        return;
    }

    try {
        await copyToClipboard(TORRANCE_PHONE);
        showContactToast('number copied to clipboard');
    } catch {
        // Leave the popup open when the browser blocks clipboard access.
    }
}
