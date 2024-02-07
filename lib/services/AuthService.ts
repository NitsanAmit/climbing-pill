import { User } from '@/lib/types/users';
import { UserProfile } from '@/lib/repositories/User';

export interface IAuthService {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithGoogle: () => Promise<void>;
  getAuthenticatedUser: () => Promise<User | null>;
  getProfile: () => Promise<UserProfile | null>;
  uploadUserProfileImage: (file: File, userId: string) => Promise<string | null>;
  getUserProfileImage: (userId: string) => Promise<string | null>;
}

export class AuthService {

  constructor(private readonly service: IAuthService) {
  }

  async login(email: string, password: string): Promise<void> {
    return this.service.login(email, password);
  }

  async logout(): Promise<void> {
    return this.service.logout();
  }

  async signUpWithEmail(email: string, password: string): Promise<void> {
    return this.service.signUpWithEmail(email, password);
  }

  async signUpWithGoogle(): Promise<void> {
    return this.service.signUpWithGoogle();
  }

  async getAuthenticatedUser(): Promise<User | null> {
    try {
      return await this.service.getAuthenticatedUser();
    } catch (error) {
      // TODO log error
      return null;
    }
  }

  async getProfile(): Promise<UserProfile | null> {
    try {
      return await this.service.getProfile();
    } catch (error) {
      // TODO log error
      return null;
    }
  }

  async isUserAuthenticated(): Promise<boolean> {
    return !!await this.getAuthenticatedUser();
  }

  async profileSetupComplete(): Promise<boolean> {
    return !!await this.getProfile();
  }

  async uploadUserProfileImage(file: File, userId: string): Promise<string | null> {
    try {
      return await this.service.uploadUserProfileImage(file, userId);
    } catch (error) {
      // TODO log error
      return null;
    }
  }

  async getUserProfileImage(userId: string): Promise<string | null> {
    try {
      return await this.service.getUserProfileImage(userId);
    } catch (error) {
      // TODO log error
      return null;
    }
  }
}

export class UserAlreadyExists extends Error {
  constructor ( ){
    super('User already exists');
  }
}
