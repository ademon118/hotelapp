import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BookingService } from './booking.service';
import { mergeMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CustomValidator } from './validators/custom-validator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@Component({
  selector: 'hinv-booking',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatDatepickerModule, MatNativeDateModule,
    MatButtonModule, MatExpansionModule, MatIconModule, MatCheckboxModule,MatDialogModule,MatSnackBarModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css',
  providers: [provideNativeDateAdapter()]
})
export class BookingComponent implements OnInit {

  bookingForm !: FormGroup;

  get guests() {
    return this.bookingForm.get('guests') as FormArray;
  }

  constructor(private configService: ConfigService, private fb: FormBuilder, private bookingService: BookingService, private router: ActivatedRoute) { }

  ngOnInit(): void {

    const roomId = this.router.snapshot.paramMap.get('roomid');
    this.bookingForm = this.fb.group({
      roomId: new FormControl({ value: roomId, disabled: true }),
      guestEmail: ['', { updateOn: 'blur', validators: [Validators.required, Validators.email], }],
      checkinDate: [''],
      checkoutDate: [''],
      bookingStatus: [''],
      bookingAmount: [''],
      bookingDate: [''],
      mobileNumber: ['', {
        updateOn: 'blur',
      }],
      guestName: ['', [Validators.required, Validators.minLength(5), CustomValidator.ValidateName,
      CustomValidator.ValidateSpecialChar('*')]],
      address: this.fb.group({
        addressLine1: [''],
        addressLine2: [''],
        city: ['', { validators: [Validators.required] }],
        state: ['', { validators: [Validators.required] }],
        country: [''],
        zipCode: [''],
      }),
      guests: this.fb.array([
        this.addGuestControl()]),
      tnc: new FormControl(false, { validators: [Validators.requiredTrue] })
    }, { updateOn: 'blur', validators: [CustomValidator.ValidateDate] });

    this.getBookingData();

    // this.bookingForm.valueChanges.subscribe((data) => {
    //   this.bookingService.bookRoom(data).subscribe((data)=>{
    //   })
    // })

    this.bookingForm.valueChanges.pipe(
      mergeMap((data) => this.bookingService.bookRoom(data))
    ).subscribe((data) => console.log(data))
  }

  getBookingData() {
    this.bookingForm.patchValue({
      guestEmail: 'ade@gmail.com',
      checkinDate: new Date('20-Feb-2025'),
      checkoutDate: new Date('21-Feb-2025'),
      bookingAmount: '',
      bookingDate: '',
      mobileNumber: '',
      guestName: '',
      address: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      },
      guests: [],
      tnc: false
    })
  }

  addBooking() {
    console.log(this.bookingForm.getRawValue());
    // this.bookingService.bookRoom(this.bookingForm.getRawValue()).subscribe((data)=>{
    //   console.log(data);
    // })
    this.bookingForm.reset({
      roomId: '2',
      guestEmail: '',
      checkinDate: '',
      checkoutDate: '',
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: '',
      mobileNumber: '',
      guestName: '',
      address: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      },
      guests: [],
      tnc: false
    });
  }

  addGuest() {
    this.guests.push(this.addGuestControl()
    );
  }

  addGuestControl() {
    return this.fb.group({
      guestName: [''],
      age: new FormControl('')
    })
  }

  addPassport() {
    this.bookingForm.addControl('passport', new FormControl(''));
  }

  deletePassport() {
    if (this.bookingForm.get('passport')) {
      this.bookingForm.removeControl('passport');
    }
  }
  removeGuests(i: number) {
    this.guests.removeAt(i);
  }
}

