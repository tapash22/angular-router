import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ToasterService {
  private toastSubject = new Subject<{ message: string; type: 'success' | 'error' | 'info' | 'warning' }>();
  toast$ = this.toastSubject.asObservable();

  showToast(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') {
    const clean = message?.trim();
    if (!clean || clean.replace(/\s/g, '').length < 2) return;
    this.toastSubject.next({ message: clean, type });
  }
}
