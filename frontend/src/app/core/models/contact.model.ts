export interface PhoneNumber {
  number: string;
  is_primary?: boolean;
  isPrimary?: boolean;
}

export interface SocialLinks {
  facebook?: string;
  pinterest?: string;
  twitter?: string;
  linkedin?: string;
  google?: string;
}

export interface Contact {
  id: string;
  first_name: string;
  last_name: string;
  name?: string;
  address: string;
  phone: string;
  company: string;
  job_title: string;
  avatar: string;
  avatarUrl?: string;
  status: 'online' | 'offline' | 'away' | 'busy' | string;
  bio?: string;
  dial?: string;
  meeting_url?: string;
  meetingUrl?: string;
  phone_numbers?: PhoneNumber[];
  phoneNumbers?: PhoneNumber[];
  social_links?: SocialLinks;
  socialLinks?: SocialLinks;
}
