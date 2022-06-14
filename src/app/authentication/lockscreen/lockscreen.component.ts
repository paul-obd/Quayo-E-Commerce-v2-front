import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { LanguageService } from '../../shared/services/common/toolbar.service';

@Component({
  selector: 'app-lockscreen',
  templateUrl: './lockscreen.component.html',
  styleUrls: ['./lockscreen.component.scss']
})
export class LockscreenComponent implements OnInit {
  public form: FormGroup;
  dir =  this.languageService.lang == 'en'? 'ltr': this.languageService.lang == 'fr'? 'ltr' : 'rtl'
  constructor(private fb: FormBuilder, private router: Router,
    private languageService: LanguageService) {}

  ngOnInit() {
    this.form = this.fb.group({
      uname: [null, Validators.compose([Validators.required])]
    });
  }

  onSubmit() {
    this.router.navigate(['/']);
  }
}
