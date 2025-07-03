import { Injectable } from '@angular/core';
import { RegistrationPayload, User } from '../interfaces/user';
import { MOCK_USERS } from '../localStore/user-data';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = MOCK_USERS;
  private currentUser: User | null = null;

  //declear use role wish page view permission
  private roleAccessMap: Record<string, string[]> = {
    admin: ['admin'],
    manager: ['manager'],
    officer: ['officer'],
    employee: ['admin', 'manager', 'officer', 'user'],
    performance: ['admin', 'manager'],
    work: ['admin', 'manager', 'officer'],
  };

  constructor(private storage: StorageService) {}

  // create method for implement role and use
  // into component for show or hide
  hasAccessTo(link: string): boolean {
    const role = this.getCurrentUser()?.role;
    const allowedRoles = this.roleAccessMap[link];
    return !!role && allowedRoles?.includes(role);
  }
  //check user
  initUsers(): void {
    const storedUsers = this.storage.get<User[]>('users');

    if (storedUsers) {
      this.users = storedUsers;
    } else {
      this.users = MOCK_USERS;
      this.storage.set('users', this.users);
    }
  }

  getAllUsers(): User[] {
    return this.users;
  }

  getCurrentUser(): User | null {
    if (!this.currentUser) {
      this.currentUser = this.storage.get<User>('currentUser');
    }
    return this.currentUser;
  }

  setCurrentUser(user: User): void {
    this.currentUser = user;
    this.storage.set('currentUser', user);
  }

  clearCurrentUser(): void {
    this.currentUser = null;
    this.storage.remove('currentUser');
    this.storage.remove('userEmail');
    this.storage.remove('users');
  }

  addUser(newUser: RegistrationPayload): boolean {
    const exists = this.users.some((u) => u.email === newUser.email);
    if (exists) return false;

    const userToSave: User = {
      id: this.users.length ? this.users.length + 1 : 1,
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      role: 'user',
    };

    this.users.push(userToSave);
    this.storage.set('users', this.users);
    return true;
  }

  updateCurrentUserFields(fields: Partial<User>): boolean {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return false;

    const index = this.users.findIndex((u) => u.id === currentUser.id);
    if (index === -1) return false;

    this.users[index] = {
      ...this.users[index],
      ...fields,
    };

    this.storage.set('users', this.users);
    this.setCurrentUser(this.users[index]);
    return true;
  }

  updateUserProfile(updatedData: Partial<User>): boolean {
    return this.updateCurrentUserFields(updatedData);
  }

  //reset password
  resetPassword(newPassword: string): boolean {
    return this.updateCurrentUserFields({ password: newPassword });
  }
}
