import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datetransform'
})
export class DatetransformPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if(value.length === 8){
      return value;
    } else {
      const year = value.split('T')[0].split('-')[0].substring(2);
      const month = value.split('T')[0].split('-')[1];
      const day = value.split('T')[0].split('-')[2];
      const transformdate = `${year}/${month}/${day}`
      return transformdate;
    }
  }

}
