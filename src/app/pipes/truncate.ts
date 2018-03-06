import {Pipe, PipeTransform} from '@angular/core'

@Pipe({
  name: 'truncate'
})
export class TruncatePipe {
  transform(value: string) : string {
        return value.substring(0, 40);
  }
}