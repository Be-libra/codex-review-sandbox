export interface UserProfile {
  displayName: string;
  avatarUrl?: string;
}

export interface UserAsset {
  id: string;
  title: string;
}

export interface User {
  id: string;
  credits: number;
  profile?: UserProfile;
  assets: UserAsset[];
}
