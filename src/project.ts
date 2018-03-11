import { SafeStyle } from '@angular/platform-browser/src/security/dom_sanitization_service';

export class Project {
    id: number;
    text: string;
    title: string;
    images: [SafeStyle];
    coverurl: string;
    createdon: string;
    category: string;
}
