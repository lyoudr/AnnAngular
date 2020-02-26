import { Component, OnInit, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, ValidatorFn,FormGroup, FormControl, ValidationErrors} from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  selectedId : string;
  sheets$: Observable<any>;
  pieces : any;
  ranktype: string = 'name';
  currencyCode: string = 'TWD';
  showForm: boolean = false;
  // Reactive Forms
  sheetForm = this.fb.group({
    cardnumber : ['', [Validators.required, cardnumberValidate()]],
    cw : ['', [Validators.required]],
    cardholder: [''],
    validdate: this.fb.group({
      month : ['', [Validators.required]],
      year: ['', [Validators.required]]
    }, {validators: validatedate }),
  });
  nameChangeLog : string[] = [];

  constructor(
    private route: ActivatedRoute,
    private fb : FormBuilder
  ) { }

  ngOnInit() {
    // subscribe to formControl
    this.subScribeForm()
  }
  
  rankPieces(ranktype){
    this.ranktype = ranktype;
  }
  setCurrency(currency){
    this.currencyCode = currency;
  }
  addPieces(){
    console.log('child');
  }
  onSubmit(){
    console.log('form value is =>', this.sheetForm.value);
  }
  /* property binding to the area which varifying error in template.*/
  get cardnumber(){
    return this.sheetForm.get('cardnumber');
  }

  get cw(){
    return this.sheetForm.get('cw');
  }

  get cardholder(){
    return this.sheetForm.get('cardholder');
  }

  get validdate(){
    return this.sheetForm.get('validdate');
  }

  get month(){
    return this.sheetForm.get('validdate').get('month');
  }

  get year(){
    return this.sheetForm.get('validdate').get('year');
  }

  subScribeForm(){
    const nameControl = this.sheetForm.get('name');
    nameControl.valueChanges.forEach(
      (value: string) => this.nameChangeLog.push(value)
    );
  }
}

const cardnumberValidate = () : ValidatorFn => {
  // if returned value is null, then pass the validation.
  return (control: FormControl) : ValidationErrors | null => {
    const cardno = /^(?:3[47][0-9]{13})$/;
    const forbidden = cardno.test(control.value);
    return forbidden ? null : {'forbiddenCardNo': {value : control.value}}; 
  }
}
const validatedate : ValidatorFn = (control: 
  FormGroup) : ValidationErrors | null => {
  const expMonth = control.get('month').value;
  const expYear = control.get('year').value;
  const today  = new Date();
  const expDate = new Date();
  if(expYear.length >= 4 && expMonth.length >= 2 ){
    expDate.setFullYear(expYear, expMonth, 1);
    console.log('expDate is =>', expDate);
  }
  return expDate < today ? {'forbiddenexpDate': true} : null; 
  
};

// Can not contain number in the string;
const forbiddenNameValidator = (): ValidatorFn => {
  // if returned value is null, then pass the validation.
  return (control: FormControl): ValidationErrors | null => {
    const forbidden = /\d/.test(control.value);
    return forbidden ? {'forbiddenName': {value: control.value}} : null;
  };
}

// Verify that link is an url link
const urlValidation = () : ValidatorFn => {
  return(control : FormControl): ValidationErrors | null => {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    const varifyresult = pattern.test(control.value);
    console.log('varifyresult is =>',varifyresult);
    return varifyresult ? null : {'forbiddenUrl': {value: control.value}};
  }
}

// Cross field validation 
// => To evaluate both controls in a single custom validator, we should perform the validation in a common ancestor control: the FormGroup. That way, we can query the FormGroup for the child controls which will allow us to compare their values.
const identityRevealedValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const composer = control.get('composer');
  const link = control.get('link');
  return composer && link && composer.value === link.value ? { 'identityRevealed': true } : null;
};
