import { Injectable } from '@angular/core';
import { RegistrationPayload, User } from '../interfaces/user';
import { MOCK_USERS } from '../localStore/user-data';
import { StorageService } from './storage.service';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersSubject =new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<User | null>(null)
  currentUser$ = this.currentUserSubject.asObservable();

  //declear use role wish page view permission
  private roleAccessMap: Record<string, string[]> = {
    admin: ['admin'],
    manager: ['manager'],
    officer: ['officer'],
    employee: ['admin', 'manager', 'officer', 'user'],
    performance: ['admin', 'manager'],
    work: ['admin', 'manager', 'officer'],
  };

  constructor(private storage: StorageService) {
    this.initUsers();
    this.initCurrentUser();
  }

  //check user
  private initUsers(): void {
    const storedUsers = this.storage.get<User[]>('users');

    if (storedUsers?.length) {
      this.usersSubject.next(storedUsers)
    } else {
      this.usersSubject.next(MOCK_USERS);
      this.storage.set('users', MOCK_USERS);
    }
  }

  private initCurrentUser(): void {
    const storedUser = this.storage.get<User>('currentUser');
    this.currentUserSubject.next(storedUser ?? null);
  }

  getAllUsers(): User[] {
    return this.usersSubject.getValue()
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.getValue();
  }

  setCurrentUser(user: User): void {
    this.currentUserSubject.next(user)
    this.storage.set('currentUser', user);
  }

  clearCurrentUser(): void {
    this.currentUserSubject.next(null);
    this.storage.remove('currentUser');
    this.storage.remove('userEmail');
    this.storage.remove('users');
  }

  addUser(newUser: RegistrationPayload): Observable<boolean> {
    const users = this.usersSubject.getValue();
    const exists = users.some((u) => u.email === newUser.email);
    if (exists) return of(false);

    const userToSave: User = {
      id: users.length ? users.length + 1 : 1,
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      role: 'user',
    };

    const updateUsers =[...users, userToSave];
    this.usersSubject.next(updateUsers);
    this.storage.set('users', users);
    return of(true);
  }

  updateCurrentUserFields(fields: Partial<User>): Observable<boolean> {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return of(false);

    const users = this.usersSubject.getValue();
    const index = users.findIndex((u) => u.id === currentUser.id);
    if (index === -1) return of(false);

    const updatedUser = {
      ...users[index],
      ...fields,
    };

    const updateUsers = [...users];
    updateUsers[index]=updatedUser;

    this.usersSubject.next(updateUsers);
    this.setCurrentUser(updatedUser);
    this.storage.set('users', updateUsers);
    return of(true);
  }

  updateUserProfile(updatedData: Partial<User>): Observable<boolean> {
    return this.updateCurrentUserFields(updatedData);
  }

  //reset password
  resetPassword(newPassword: string): Observable<boolean> {
    return this.updateCurrentUserFields({ password: newPassword });
  }

    // create method for implement role and use
  // into component for show or hide
  hasAccessTo(link: string): boolean {
    const role = this.getCurrentUser()?.role;
    const allowedRoles = this.roleAccessMap[link];
    return !!role && allowedRoles?.includes(role);
  }
}
