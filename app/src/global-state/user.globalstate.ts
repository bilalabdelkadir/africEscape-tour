import { signal } from '@preact/signals-react';
import { ITourist } from '@/types/tourist.type';

export const user = signal<ITourist | null>(null);

export const isUserLoggedIn = signal<boolean>(false);
