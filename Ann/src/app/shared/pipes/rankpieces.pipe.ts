import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rankpieces'
})
export class RankpiecesPipe implements PipeTransform {

  transform(value: any, ranktype: string): any {
    if(ranktype == 'name'){
      value.sort((a, b) => {
        if(a.name > b.name){
          return 1;
        } else if(a.name < b.name){
          return -1;
        } else {
          return 0;
        }
      });
    } else if(ranktype == 'pieces'){
      value.sort((a, b) => {
        if(a.sheetname > b.sheetname){
          return 1;
        } else if(a.sheetname < b.sheetname){
          return -1;
        } else {
          return 0;
        }
      });
    }
    return value;
  }

}
