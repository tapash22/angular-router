import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";

export type ToastType = "success" | "error" | "info" | "warning";

@Injectable({
  providedIn: "root",
})
export class ToasterService {
  private toastSubject = new Subject<{
    message: string;
    type: ToastType;
    duration: number;
  }>();
  toast$ = this.toastSubject.asObservable();

  showToast(message: string, type: ToastType = "info") {
    const clean = message?.trim();
    if (!clean || clean.replace(/\s/g, "").length < 2) return;

    // const duration = Math.max(clean.length * 2000, 1000); 
    const duration = clean.length * 50


    this.toastSubject.next({ message: clean, type, duration });
  }
}
