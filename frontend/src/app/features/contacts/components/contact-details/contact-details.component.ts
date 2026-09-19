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

  readonly messageWhiteIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAtUlEQVR4AcyQwQ3CMAxFv0ObiFtHgAmADWATRoENWKGTwCYwRE8JyDgRrsKhpeHUr3w1jvys7xr/5LsPzFPcdbxFJgPGChO1cGiQyWT34msxHALv04qybjHcx5N1/4dlygxgZrQv4DBkz9gta7pJ2v6k2BF0lo6VPA/ZEZr4p6V3I23pGCnaCMaKgesvg3DBR0bBVBMeKFCKrf22orWticYsyc7a/wXr49jX1XTSAcVwHKwD3gAAAP//akwrbgAAAAZJREFUAwATyW2SpOLZUgAAAABJRU5ErkJggg==';
  readonly phoneGreyIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAABGElEQVR4AYxS0VHDMAx9cZr/jtBOQNmAEdoBWq4b0H8KyqXMkXAN3x2BY4J2A7IBHcCOkMzFnK/Qsy8vlqz3ZMm2oV37SdWeA6ieIWEYME8iXo4xEoZBlnURj/PkHU+R0OAm8v9xtNSPEMu4g3Vl8K8YBr1rQty6BdE6Lj0EY8MI8SxLrwLAFPd+TvgZz3GWAD4j44dy1yaJvVB27cDYaBJmbuRO52oPIKrHisHX2QvVoKeV9joczKGs9s9+neoJRsUR+eiLqvYoSd/p5W0WhJ60XUrJ8GIGSF8V8uLw+0hY7/gO1s4jYRA7O5V+ux+BJ2sowoVQo9ozPa6mIlyLfxJcfH8KB5b2TdvlLbQCYCGJNuj7Etw33wAAAP//CMMDTQAAAAZJREFUAwAc53PHARI4SgAAAABJRU5ErkJggg==';
  readonly calendarIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAOCAYAAADJ7fe0AAAA10lEQVR4nJ2TIQ7CQBBFXxtOgMSiUQgSLoDlAnsAEgwHmGSStUg4wRokQVVgEQgUSAgSxxVAMG02TSm0o2Ymf192f/4mWKkPU5rVVcVdABIDnIBuQwjAWMU9UhvaAABGAJ1ocQOuDQCTvIkhKxW3/ZegPtzzPq0Tmrj3S1MLUR/2wEF9GLSCGKBv464OVAmxzGR8zAZYExlZrk7VMjdYfXgBcxW3/Ab4epOmFUPaBq54zhMQ9UFszlTcLBaasbvS+WMBUXHD0gfMk7vBzFVxZ/VhUUCjYL4BwL8+WM1Bp88AAAAASUVORK5CYII=';

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
