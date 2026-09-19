import { Component, output, input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsService } from '../../services/contacts.service';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { SkeletonComponent } from '../../../../shared/components/skeleton/skeleton.component';
import { ImageFallbackDirective } from '../../../../shared/directives/image-fallback.directive';
import { PhoneFormatPipe } from '../../../../shared/pipes/phone-format.pipe';

@Component({
  selector: 'app-contact-details',
  standalone: true,
  imports: [
    CommonModule,
    IconComponent,
    SkeletonComponent,
    ImageFallbackDirective,
    PhoneFormatPipe
  ],
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss'
})
export class ContactDetailsComponent {
  protected readonly contactsService = inject(ContactsService);

  readonly back = output<void>();
  readonly toggleSidebar = output<void>();
  readonly isSidebarCollapsed = input<boolean>(false);

  onMessage(): void {
    const contact = this.contactsService.selectedContact();
    if (!contact) return;
    const emails = this.contactsService.selectedContactEmails();
    const primaryEmail = emails.find(e => e.is_primary || e.isPrimary)?.email || emails[0]?.email;
    if (primaryEmail) {
      window.open(`mailto:${primaryEmail}`, '_blank');
    }
  }

  onCall(phoneNumber?: string): void {
    const phone = phoneNumber || this.contactsService.selectedContact()?.phone;
    if (phone) {
      window.open(`tel:${phone}`, '_self');
    }
  }

  onMeeting(url?: string): void {
    const meet = url || this.contactsService.selectedContact()?.meeting_url || this.contactsService.selectedContact()?.meetingUrl;
    if (meet) {
      window.open(meet, '_blank');
    }
  }

  onSocial(platform: string, url?: string): void {
    if (url) {
      window.open(url, '_blank');
    }
  }
}
