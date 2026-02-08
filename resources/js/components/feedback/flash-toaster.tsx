import { usePage } from '@inertiajs/react';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { type SharedData } from '@/types';

export default function FlashToaster() {
    const { flash } = usePage<SharedData>().props;

    useEffect(() => {
        if (flash && flash.message && flash.level) {
            const { message, level } = flash;

            switch (level) {
                case 'success':
                    toast.success(message);
                    break;
                case 'error':
                    toast.error(message);
                    break;
                case 'warning':
                    toast.warning(message);
                    break;
                case 'info':
                    toast.info(message);
                    break;
                default:
                    toast(message);
            }
        }
    }, [flash]);

    return null;
}

